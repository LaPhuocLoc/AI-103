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

function bootApp(initialState) {
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
    ["ai103-mock-state-v1", JSON.stringify(initialState)],
    ["ai103-theme", "dark"],
    ["ab100-mock-state-v1", JSON.stringify({ current: 99 })]
  ]);
  const localStorage = {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); }
  };
  const document = {
    documentElement: new ElementStub("html"),
    body: new ElementStub("body"),
    getElementById(id) { return elements.get(id); },
    createElement() { return new ElementStub(); },
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
    text(id) { return elements.get(id).textContent; },
    state() { return JSON.parse(localStorage.getItem("ai103-mock-state-v1")); }
  };
}

test("AI-103 state ignores an existing AB-100 state", () => {
  const app = bootApp({ current: 0, answers: {}, checked: {}, flags: {}, retryQueue: [] });
  assert.equal(app.state().current, 0);
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
