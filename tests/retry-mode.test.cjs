const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

class ElementStub {
  constructor(id = "") {
    this.id = id;
    this.listeners = {};
    this.dataset = {};
    this.style = {};
    this.children = [];
    this.attributes = {};
    this._innerHTML = "";
    this.classNames = new Set();
    this.classList = {
      add: (...names) => names.forEach((name) => this.classNames.add(name)),
      remove: (...names) => names.forEach((name) => this.classNames.delete(name)),
      toggle: (name, force) => {
        const enabled = force === undefined ? !this.classNames.has(name) : Boolean(force);
        if (enabled) this.classNames.add(name); else this.classNames.delete(name);
        return enabled;
      },
      contains: (name) => this.classNames.has(name)
    };
    this.value = "";
    this.textContent = "";
    this.hidden = false;
  }

  addEventListener(type, listener) { this.listeners[type] = listener; }
  appendChild(child) { this.children.push(child); return child; }
  append(...children) { this.children.push(...children); }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  getAttribute(name) { return this.attributes[name]; }
  set innerHTML(value) { this._innerHTML = value; this.children = []; }
  get innerHTML() { return this._innerHTML; }
  focus() { ElementStub.focused = this; }
  animate() {}
  scrollIntoView() {}
  showModal() {}
  close() {}
}

function bootApp(initialState, {
  abState = { current: 99 }, committedPayload, questions, matchingData = {}, dragIds = []
} = {}) {
  const ids = [
    "questionGrid", "questionNumber", "typePill", "caseContext", "questionStem", "choices", "manualNote",
    "answerCard", "answerStatus", "correctAnswer", "explanationText", "pageLink", "prevButton",
    "nextButton", "checkButton", "flagButton", "tipButton", "tipPanel", "tipKeywords", "tipAnswer",
    "tipMnemonic", "tipTraps", "tipUltraShort", "progressText", "progressBar", "scoreText", "timer",
    "timerToggle", "modeSelect", "finishButton", "clearProgress", "themeToggle", "exportProgress",
    "loadProgress", "syncStatus", "sidebarClose", "sidebarBackdrop", "resultDialog",
    "resultScore", "resultCopy", "dialogClose", "continueButton", "reviewWrong", "sidebar", "menuButton"
  ];
  const elements = new Map(ids.map((id) => [id, new ElementStub(id)]));
  const storage = new Map([
    ["ai103-theme", "dark"],
    ["ab100-mock-state-v1", JSON.stringify(abState)]
  ]);
  const downloads = [];
  const blobs = new Map();
  let nextBlobId = 1;
  let lastFetchRequest = null;
  let fetchCount = 0;
  if (initialState !== undefined) storage.set("ai103-mock-state-v1", JSON.stringify(initialState));
  const localStorage = {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); }
  };
  const document = {
    documentElement: new ElementStub("html"),
    body: new ElementStub("body"),
    getElementById(id) { return elements.get(id); },
    createElement(tagName) {
      const element = new ElementStub();
      if (tagName === "a") {
        element.click = () => downloads.push({ filename: element.download, blob: blobs.get(element.href) });
        element.remove = () => {};
      }
      return element;
    },
    querySelectorAll() { return []; },
    addEventListener() {},
    elementFromPoint() { return null; }
  };
  const defaultQuestions = [{
      id: 1,
      stem: "Question",
      choices: [{ label: "A", text: "Wrong" }, { label: "B", text: "Correct" }],
      correct: ["B"],
      answer: "B",
      explanation: "",
      sourcePages: [1],
      gradable: true,
      multiple: false
    }];
  const window = {
    AI103_QUESTIONS: questions || defaultQuestions,
    AI103_MATCHING: matchingData,
    AI103_DRAG_IDS: dragIds,
    AI103_TIPS: Object.fromEntries((questions || defaultQuestions).map((question) => [question.id, {
      keywords: `keyword ${question.id}`,
      answer: question.answer || "answer",
      mnemonic: `mnemonic ${question.id}`,
      traps: [{ label: "A", text: `trap ${question.id}` }],
      ultraShort: `short ${question.id}`
    }])),
    scrollTo() {}
  };
  const context = vm.createContext({
    window,
    document,
    localStorage,
    alert() {},
    confirm() { return true; },
    setInterval() { return 0; },
    setTimeout(callback) { callback(); return 0; },
    Blob,
    URL: {
      createObjectURL(blob) {
        const url = `blob:mock-${nextBlobId++}`;
        blobs.set(url, blob);
        return url;
      },
      revokeObjectURL() {}
    },
    async fetch(url, options) {
      fetchCount += 1;
      lastFetchRequest = { url, options };
      if (committedPayload === undefined) throw new Error("No committed payload configured");
      return {
        ok: true,
        async json() { return committedPayload; }
      };
    },
    console
  });
  const appSource = fs.readFileSync(require.resolve("../app.js"), "utf8");
  vm.runInContext(appSource, context);

  return {
    changeMode(mode) {
      const select = elements.get("modeSelect");
      select.value = mode;
      select.listeners.change();
    },
    toggleFlag() { elements.get("flagButton").listeners.click(); },
    text(id) { return elements.get(id).textContent; },
    state() { return JSON.parse(localStorage.getItem("ai103-mock-state-v1")); },
    rawStorage(key) { return localStorage.getItem(key); },
    async exportProgress() {
      elements.get("exportProgress").listeners.click();
      const download = downloads.at(-1);
      return { filename: download.filename, payload: JSON.parse(await download.blob.text()) };
    },
    async loadCommittedProgress() {
      elements.get("loadProgress").listeners.click();
      await new Promise((resolve) => setImmediate(resolve));
    },
    fetchRequest() { return lastFetchRequest; }
    ,fetchCount() { return fetchCount; }
    ,finish() { elements.get("finishButton").listeners.click(); }
    ,reviewWrong() { elements.get("reviewWrong").listeners.click(); }
    ,clickMenu() { elements.get("menuButton").listeners.click(); }
    ,closeSidebar() { elements.get("sidebarClose").listeners.click(); }
    ,element(id) { return elements.get(id); }
    ,clickTip() { elements.get("tipButton").listeners.click(); }
    ,clickQuestion(position) { elements.get("questionGrid").children[position].listeners.click(); }
    ,focusedId() { return ElementStub.focused?.id || ""; }
};
}

test("tip toggle is state-neutral and closes when the question changes", () => {
  const questions = [
    { id: 1, stem: "Q1", choices: [{ label: "A", text: "One" }], correct: ["A"], answer: "A", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 2, stem: "Q2", choices: [{ label: "A", text: "Two" }], correct: ["A"], answer: "A", explanation: "", sourcePages: [2], gradable: true, multiple: false }
  ];
  const app = bootApp(undefined, { questions });
  const before = app.rawStorage("ai103-mock-state-v1");

  app.clickTip();
  assert.equal(app.element("tipPanel").hidden, false);
  assert.equal(app.element("tipButton").getAttribute("aria-expanded"), "true");
  assert.equal(app.text("tipKeywords"), "keyword 1");
  assert.equal(app.rawStorage("ai103-mock-state-v1"), before);

  app.clickQuestion(1);
  assert.equal(app.element("tipPanel").hidden, true);
  assert.equal(app.element("tipButton").getAttribute("aria-expanded"), "false");
});

test("exam tips stay locked until submission", () => {
  const app = bootApp({
    current: 0, answers: {}, checked: {}, flags: {}, elapsed: 0,
    paused: false, mode: "exam", retryQueue: [], retryAnswers: {}, retryChecked: {}
  });

  assert.equal(app.element("tipButton").disabled, true);
  app.finish();
  assert.equal(app.element("tipButton").disabled, false);
  app.clickTip();
  assert.equal(app.element("tipPanel").hidden, false);
});

test("AI-103 state ignores an existing AB-100 state", () => {
  const abState = {
    current: 0,
    answers: { 99: ["B"] },
    checked: { 99: true },
    flags: { 99: true },
    elapsed: 42,
    paused: true,
    mode: "exam",
    retryQueue: []
  };
  const serializedAbState = JSON.stringify(abState);
  const app = bootApp(undefined, { abState });

  app.toggleFlag();

  assert.deepEqual(app.state().answers, {});
  assert.deepEqual(app.state().checked, {});
  assert.deepEqual(app.state().flags, { 1: true });
  assert.equal(app.state().mode, "practice");
  assert.equal(app.rawStorage("ab100-mock-state-v1"), serializedAbState);
});

test("switching to retry mode and back preserves the wrong practice answer", () => {
  const app = bootApp({
    current: 0,
    answers: { 1: ["A"] },
    checked: { 1: true },
    flags: {},
    elapsed: 0,
    paused: false,
    mode: "practice",
    retryQueue: []
  });

  app.changeMode("retry");
  app.changeMode("practice");

  assert.deepEqual(app.state().answers[1], ["A"]);
  assert.equal(app.state().checked[1], true);
});

test("retry mode includes a flagged question even when its practice answer is correct", () => {
  const app = bootApp({
    current: 0,
    answers: { 1: ["B"] },
    checked: { 1: true },
    flags: { 1: true },
    elapsed: 0,
    paused: false,
    mode: "practice",
    retryQueue: []
  });

  app.changeMode("retry");

  assert.equal(app.state().mode, "retry");
  assert.deepEqual(app.state().retryQueue, [1]);
  assert.deepEqual(app.state().answers[1], ["B"]);
  assert.equal(app.state().retryAnswers[1], undefined);
});

test("progress and score count stored answers after loading state", () => {
  const app = bootApp({
    current: 0,
    answers: { 1: ["B"] },
    checked: { 1: true },
    flags: {},
    elapsed: 0,
    paused: false,
    mode: "practice",
    retryQueue: []
  });

  assert.equal(app.text("progressText"), "1 / 1");
  assert.equal(app.text("scoreText"), "1 / 1");
});

test("export handler downloads the current AI-103 state without touching AB-100 storage", async () => {
  const abState = { current: 99, answers: { 99: ["A"] } };
  const serializedAbState = JSON.stringify(abState);
  const initialState = {
    current: 0,
    answers: { 1: ["A"] },
    checked: { 1: true },
    flags: { 1: true },
    elapsed: 12,
    paused: true,
    mode: "practice",
    retryQueue: [],
    retryAnswers: {},
    retryChecked: {}
  };
  const app = bootApp(initialState, { abState });

  const download = await app.exportProgress();

  assert.equal(download.filename, "ai103-progress-state.json");
  assert.equal(download.payload.schemaVersion, 1);
  assert.deepEqual(download.payload.state, { ...initialState, examSubmitted: false, retrySubmitted: false });
  assert.equal(app.rawStorage("ab100-mock-state-v1"), serializedAbState);
});

test("committed load handler fetches, normalizes, persists, and renders AI-103 state only", async () => {
  const abState = { current: 99, answers: { 99: ["A"] } };
  const serializedAbState = JSON.stringify(abState);
  const committedPayload = {
    schemaVersion: 1,
    exportedAt: "2026-07-17T00:00:00.000Z",
    state: {
      current: 0,
      answers: { 1: ["B"] },
      checked: { 1: true },
      flags: { 1: true },
      elapsed: 34,
      paused: true,
      mode: "exam"
    }
  };
  const app = bootApp({ flags: { 1: true } }, { abState, committedPayload });

  await app.loadCommittedProgress();

  assert.match(app.fetchRequest().url, /^ai103-progress-state\.json(?:\?|$)/);
  assert.equal(app.fetchRequest().options.cache, "no-store");
  assert.deepEqual(Object.keys(app.fetchRequest().options), ["cache"]);
  assert.deepEqual(app.state(), {
    ...committedPayload.state,
    examSubmitted: false,
    retrySubmitted: false,
    retryQueue: [],
    retryAnswers: {},
    retryChecked: {}
  });
  assert.equal(app.text("progressText"), "1 / 1");
  assert.equal(app.text("scoreText"), "—");
  assert.equal(app.rawStorage("ab100-mock-state-v1"), serializedAbState);
});

test("exam mode conceals score and correctness until submission, then enables review", () => {
  const app = bootApp({
    current: 0, answers: { 1: ["A"] }, checked: { 1: true }, flags: {}, elapsed: 0,
    paused: false, mode: "exam", retryQueue: [], retryAnswers: {}, retryChecked: {}
  });

  assert.equal(app.text("scoreText"), "—");
  assert.equal(app.element("answerCard").hidden, true);
  assert.equal(app.element("questionGrid").children[0].classNames.has("wrong"), false);

  app.finish();

  assert.equal(app.state().examSubmitted, true);
  assert.equal(app.text("scoreText"), "0 / 1");
  assert.equal(app.element("questionGrid").children[0].classNames.has("wrong"), true);
  const standardChoices = app.element("choices").children;
  assert.equal(standardChoices[0].classNames.has("wrong"), true);
  assert.equal(standardChoices[1].classNames.has("correct"), true);
  assert.equal(standardChoices[0].disabled, true);
  assert.equal(standardChoices[1].disabled, true);
  app.reviewWrong();
  assert.equal(app.element("answerCard").hidden, false);
  assert.match(app.text("correctAnswer"), /B/);
});

test("exam submission reveals matching grading only after submission", () => {
  const questions = [{ id: 1, stem: "Match", choices: [], correct: [], answer: "", explanation: "Why", sourcePages: [2], gradable: false, multiple: false }];
  const matchingData = { 1: [{ prompt: "Service", options: ["A", "B"], correct: "B" }] };
  const app = bootApp({
    current: 0, answers: { 1: { 0: "A" } }, checked: {}, flags: {}, elapsed: 0,
    paused: false, mode: "exam", retryQueue: [], retryAnswers: {}, retryChecked: {}
  }, { questions, matchingData });

  assert.equal(app.text("scoreText"), "—");
  assert.equal(app.element("questionGrid").children[0].classNames.has("wrong"), false);
  app.finish();
  assert.equal(app.text("scoreText"), "0 / 1");
  assert.equal(app.element("answerCard").hidden, false);
  const matchingOptions = app.element("choices").children[0].children[1].children;
  assert.equal(matchingOptions[0].classNames.has("wrong"), true);
  assert.equal(matchingOptions[1].classNames.has("correct"), true);
  assert.equal(matchingOptions[0].disabled, true);
  assert.equal(matchingOptions[1].disabled, true);
});

test("submitted exam scores all gradable questions and marks unanswered as incomplete", () => {
  const questions = [
    { id: 1, stem: "One", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 2, stem: "Two", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false }
  ];
  const app = bootApp({
    current: 0, answers: { 1: ["B"] }, checked: {}, flags: {}, elapsed: 0, paused: false,
    mode: "exam", retryQueue: [], retryAnswers: {}, retryChecked: {}
  }, { questions });

  app.finish();

  assert.equal(app.text("scoreText"), "1 / 2");
  assert.equal(app.text("resultScore"), "50%");
  const unansweredNav = app.element("questionGrid").children[1];
  assert.equal(unansweredNav.classNames.has("wrong"), false);
  assert.equal(unansweredNav.classNames.has("incomplete"), true);
  assert.match(unansweredNav.getAttribute("aria-label"), /chưa trả lời/);
  assert.doesNotMatch(unansweredNav.getAttribute("aria-label"), /sai/);
  assert.match(unansweredNav.children[0].textContent, /○/);
});

test("submitted retry score persists through export and local restore", async () => {
  const questions = [
    { id: 1, stem: "One", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 2, stem: "Two", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false }
  ];
  const app = bootApp({
    current: 0, answers: {}, checked: {}, flags: {}, elapsed: 0, paused: false, mode: "retry",
    retryQueue: [1, 2], retryAnswers: { 1: ["B"] }, retryChecked: {}
  }, { questions });

  app.finish();

  assert.equal(app.text("scoreText"), "1 / 2");
  assert.equal(app.text("resultScore"), "50%");
  assert.match(app.text("resultCopy"), /Đúng 1\/2 câu có thể chấm tự động/);
  const download = await app.exportProgress();
  assert.equal(download.payload.state.retrySubmitted, true);

  const restored = bootApp(download.payload.state, { questions });
  assert.equal(restored.state().retrySubmitted, true);
  assert.equal(restored.text("scoreText"), "1 / 2");
});

test("committed retry submission restores full denominator", async () => {
  const questions = [
    { id: 1, stem: "One", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 2, stem: "Two", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false }
  ];
  const committedPayload = { state: {
    current: 0, answers: {}, checked: {}, flags: {}, elapsed: 0, paused: false, mode: "retry",
    retryQueue: [1, 2], retryAnswers: { 1: ["B"] }, retryChecked: {}, retrySubmitted: true
  } };
  const app = bootApp({ current: 0 }, { questions, committedPayload });

  await app.loadCommittedProgress();

  assert.equal(app.state().retrySubmitted, true);
  assert.equal(app.text("scoreText"), "1 / 2");
});

test("loading a non-submitted retry clears prior submitted scoring", async () => {
  const questions = [
    { id: 1, stem: "One", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 2, stem: "Two", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false }
  ];
  const initial = {
    current: 0, answers: {}, checked: {}, flags: {}, elapsed: 0, paused: false, mode: "retry",
    retryQueue: [1, 2], retryAnswers: { 1: ["B"] }, retryChecked: {}
  };
  const committedPayload = { state: { ...initial, retrySubmitted: false } };
  const app = bootApp(initial, { questions, committedPayload });
  app.finish();
  assert.equal(app.text("scoreText"), "1 / 2");

  await app.loadCommittedProgress();

  assert.equal(app.state().retrySubmitted, false);
  assert.equal(app.text("scoreText"), "1 / 1");
});

test("fresh retry includes answered wrong and flagged questions but excludes incomplete questions", () => {
  const questions = [
    { id: 1, stem: "One", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 2, stem: "Two", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 3, stem: "Three", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false }
  ];
  const app = bootApp({
    current: 0, answers: { 1: ["A"], 3: ["B"] }, checked: { 1: true, 3: true }, flags: { 3: true },
    elapsed: 0, paused: false, mode: "practice", retryQueue: [], retryAnswers: {}, retryChecked: {}
  }, { questions });

  app.changeMode("retry");
  assert.deepEqual(app.state().retryQueue, [1, 3]);
  app.finish();
  assert.doesNotMatch(app.text("resultCopy"), /chưa hoàn thành/);
});

test("retry mode drops stale incomplete question IDs from an existing queue", () => {
  const questions = [
    { id: 1, stem: "Wrong", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 2, stem: "Incomplete", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 3, stem: "Incomplete", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false }
  ];
  const app = bootApp({
    current: 0, answers: { 1: ["A"] }, checked: { 1: true }, flags: {}, elapsed: 0,
    paused: false, mode: "practice", retryQueue: [1, 2, 3], retryAnswers: {}, retryChecked: {}
  }, { questions });

  app.changeMode("retry");

  assert.deepEqual(app.state().retryQueue, [1]);
});

test("state normalization repairs a stale retry queue before the first render", () => {
  const questions = [
    { id: 1, stem: "Wrong", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 2, stem: "Incomplete", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 3, stem: "Incomplete", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false }
  ];
  const app = bootApp({
    current: 2, answers: { 1: ["A"] }, checked: { 1: true }, flags: {}, elapsed: 0,
    paused: false, mode: "retry", retryQueue: [1, 2, 3], retryAnswers: {}, retryChecked: {}
  }, { questions });

  assert.equal(app.state().mode, "retry");
  assert.deepEqual(app.state().retryQueue, [1]);
  assert.equal(app.state().current, 0);
});

test("practice retry ignores selected wrong answers that were never checked", () => {
  const questions = [
    { id: 1, stem: "Selected only", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 2, stem: "Checked wrong", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false }
  ];
  const app = bootApp({
    current: 0, answers: { 1: ["A"], 2: ["A"] }, checked: { 1: false, 2: true }, flags: {}, elapsed: 0,
    paused: false, mode: "practice", retryQueue: [1, 2], retryAnswers: {}, retryChecked: {}
  }, { questions });

  app.changeMode("retry");

  assert.deepEqual(app.state().retryQueue, [2]);
});

test("retry includes wrong exam answers after the exam is submitted", () => {
  const questions = [
    { id: 1, stem: "Exam wrong", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false }
  ];
  const app = bootApp({
    current: 0, answers: { 1: ["A"] }, checked: {}, flags: {}, elapsed: 0,
    paused: false, mode: "exam", examSubmitted: true, retryQueue: [], retryAnswers: {}, retryChecked: {}
  }, { questions });

  app.changeMode("retry");

  assert.deepEqual(app.state().retryQueue, [1]);
});

test("an existing navigation/timer/mode-only local state prevents automatic committed fetch", () => {
  const app = bootApp({
    current: 0, answers: {}, checked: {}, flags: {}, elapsed: 34, paused: true,
    mode: "exam", retryQueue: [], retryAnswers: {}, retryChecked: {}
  }, { committedPayload: { state: { answers: { 1: ["B"] } } } });

  assert.equal(app.fetchCount(), 0);
  assert.equal(app.state().elapsed, 34);
  assert.equal(app.state().paused, true);
  assert.equal(app.state().mode, "exam");
});

test("normalization rejects malformed question keyed state and repairs retry scope", () => {
  const questions = [
    { id: 1, stem: "One", choices: [{ label: "A", text: "A" }, { label: "B", text: "B" }], correct: ["B"], answer: "B", explanation: "", sourcePages: [1], gradable: true, multiple: false },
    { id: 2, stem: "Match", choices: [], correct: [], answer: "", explanation: "", sourcePages: [2], gradable: false, multiple: false }
  ];
  const matchingData = { 2: [{ prompt: "First", options: ["X", "Y"], correct: "X" }] };
  const app = bootApp({
    current: 0,
    answers: { 1: ["B", "B", "Z"], 2: { 0: "Y", 1: "X" }, "01": ["A"], 999: ["A"] },
    checked: { 1: 1, "01": true, 999: true }, flags: { 2: "", 999: true },
    elapsed: 5, paused: 0, mode: "retry", retryQueue: [2, 2, 999],
    retryAnswers: { 2: { 0: "INVALID" }, 999: ["A"] }, retryChecked: { 2: "yes", 999: true }
  }, { questions, matchingData });

  assert.deepEqual(app.state(), {
    current: 0, answers: { 1: ["B"], 2: { 0: "Y" } }, checked: { 1: true }, flags: { 2: false },
    elapsed: 5, paused: false, mode: "practice", retryQueue: [], retryAnswers: {}, retryChecked: { 2: true },
    examSubmitted: false, retrySubmitted: false
  });
});

test("empty normalized retry scope falls back to practice", () => {
  const app = bootApp({ mode: "retry", current: 0, retryQueue: [999, 999] });
  assert.equal(app.state().mode, "practice");
  assert.deepEqual(app.state().retryQueue, []);
});

test("navigation exposes non-color markers and Vietnamese state labels", () => {
  const app = bootApp({
    current: 0, answers: { 1: ["B"] }, checked: { 1: true }, flags: { 1: true }, elapsed: 0,
    paused: false, mode: "practice", retryQueue: [], retryAnswers: {}, retryChecked: {}
  });
  const nav = app.element("questionGrid").children[0];
  assert.equal(nav.getAttribute("aria-current"), "question");
  assert.match(nav.getAttribute("aria-label"), /Câu 1.*hiện tại.*đã trả lời.*đúng.*đánh dấu/i);
  assert.match(String(nav.textContent), /1/);
  assert.ok(nav.children.length > 0, "navigation needs visible state markers, not color alone");
});

test("mobile drawer moves focus on open and restores it on close", () => {
  const app = bootApp({ current: 0 });
  app.clickMenu();
  assert.equal(app.focusedId(), "sidebarClose");
  app.closeSidebar();
  assert.equal(app.focusedId(), "menuButton");
});
