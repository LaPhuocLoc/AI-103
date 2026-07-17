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
    this.classList = { add() {}, remove() {}, toggle() {} };
    this.value = "";
    this.textContent = "";
    this.hidden = false;
  }

  addEventListener(type, listener) { this.listeners[type] = listener; }
  appendChild() {}
  append() {}
  setAttribute() {}
  animate() {}
  scrollIntoView() {}
  showModal() {}
  close() {}
}

function bootApp(initialState, { abState = { current: 99 }, committedPayload } = {}) {
  const ids = [
    "questionGrid", "questionNumber", "typePill", "questionStem", "choices", "manualNote",
    "answerCard", "answerStatus", "correctAnswer", "explanationText", "pageLink", "prevButton",
    "nextButton", "checkButton", "flagButton", "progressText", "progressBar", "scoreText", "timer",
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
  const window = {
    AI103_QUESTIONS: [{
      id: 1,
      stem: "Question",
      choices: [{ label: "A", text: "Wrong" }, { label: "B", text: "Correct" }],
      correct: ["B"],
      answer: "B",
      explanation: "",
      sourcePages: [1],
      gradable: true,
      multiple: false
    }],
    AI103_MATCHING: {},
    AI103_DRAG_IDS: [],
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
      if (committedPayload === undefined) throw new Error("No committed payload configured");
      lastFetchRequest = { url, options };
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
  };
}

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
  assert.deepEqual(download.payload.state, initialState);
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
    retryQueue: [],
    retryAnswers: {},
    retryChecked: {}
  });
  assert.equal(app.text("progressText"), "1 / 1");
  assert.equal(app.text("scoreText"), "1 / 1");
  assert.equal(app.rawStorage("ab100-mock-state-v1"), serializedAbState);
});
