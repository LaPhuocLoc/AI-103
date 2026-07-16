(() => {
  const questions = window.AI103_QUESTIONS || [];
  const matchingData = window.AI103_MATCHING || {};
  const dragQuestionIds = new Set(window.AI103_DRAG_IDS || []);
  const STORAGE_KEY = "ai103-mock-state-v1";
  const THEME_KEY = "ai103-theme";
  const PDF_FILE = "AI-103.pdf";
  const STATE_FILE = "ai103-progress-state.json";
  const $ = (id) => document.getElementById(id);
  const els = {
    grid: $("questionGrid"), number: $("questionNumber"), type: $("typePill"), stem: $("questionStem"),
    choices: $("choices"), manual: $("manualNote"), answerCard: $("answerCard"), answerStatus: $("answerStatus"),
    correctAnswer: $("correctAnswer"), explanation: $("explanationText"), pageLink: $("pageLink"),
    prev: $("prevButton"), next: $("nextButton"), check: $("checkButton"), flag: $("flagButton"),
    progressText: $("progressText"), progressBar: $("progressBar"), scoreText: $("scoreText"), timer: $("timer"),
    timerToggle: $("timerToggle"), mode: $("modeSelect"), finish: $("finishButton"), clear: $("clearProgress"), theme: $("themeToggle"),
    exportProgress: $("exportProgress"), loadProgress: $("loadProgress"), syncStatus: $("syncStatus"),
    dialog: $("resultDialog"), resultScore: $("resultScore"), resultCopy: $("resultCopy"),
    close: $("dialogClose"), continue: $("continueButton"), reviewWrong: $("reviewWrong"), sidebar: $("sidebar"), menu: $("menuButton"),
    sidebarClose: $("sidebarClose"), sidebarBackdrop: $("sidebarBackdrop")
  };

  const blankState = () => ({
    current: 0,
    answers: {},
    checked: {},
    flags: {},
    elapsed: 0,
    paused: false,
    mode: "practice",
    retryQueue: [],
    retryAnswers: {},
    retryChecked: {}
  });
  const hadLocalState = localStorage.getItem(STORAGE_KEY) !== null;
  let state = loadState();
  let lastTick = Date.now();
  let activeDragOption = null;
  let pointerDragState = null;

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
    els.theme.textContent = theme === "dark" ? "☀ Chế độ sáng" : "☾ Chế độ tối";
    els.theme.title = theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối";
  }

  function loadState() {
    try { return normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
    catch { return blankState(); }
  }
  function normalizeState(value) {
    const raw = value && typeof value === "object" ? value : {};
    const objectOrEmpty = (candidate) => candidate && typeof candidate === "object" && !Array.isArray(candidate) ? candidate : {};
    const allowedModes = new Set(["practice", "exam", "retry"]);
    return {
      ...blankState(),
      current: Number.isInteger(raw.current) ? Math.max(0, Math.min(raw.current, Math.max(questions.length - 1, 0))) : 0,
      answers: objectOrEmpty(raw.answers),
      checked: objectOrEmpty(raw.checked),
      flags: objectOrEmpty(raw.flags),
      elapsed: Number.isFinite(raw.elapsed) && raw.elapsed >= 0 ? raw.elapsed : 0,
      paused: Boolean(raw.paused),
      mode: allowedModes.has(raw.mode) ? raw.mode : "practice",
      retryQueue: Array.isArray(raw.retryQueue) ? raw.retryQueue.filter((id) => Number.isInteger(id)) : [],
      retryAnswers: objectOrEmpty(raw.retryAnswers),
      retryChecked: objectOrEmpty(raw.retryChecked)
    };
  }
  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function hasMeaningfulProgress(value) {
    return [value.answers, value.checked, value.flags, value.retryAnswers, value.retryChecked]
      .some((group) => Object.keys(group || {}).length > 0) || value.retryQueue.length > 0;
  }
  function setSyncStatus(message) { els.syncStatus.textContent = message; }
  function exportProgress() {
    saveState();
    const payload = { schemaVersion: 1, exportedAt: new Date().toISOString(), state };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = STATE_FILE;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setSyncStatus(`Đã xuất ${STATE_FILE} — thay file trong repo rồi commit.`);
  }
  async function loadCommittedProgress({ force = false } = {}) {
    if (force && !confirm(`Nạp ${STATE_FILE} từ Git và ghi đè state trên thiết bị này?`)) return;
    setSyncStatus(`Đang nạp ${STATE_FILE}…`);
    try {
      const response = await fetch(`${STATE_FILE}?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      state = normalizeState(payload?.state || payload);
      if (state.mode === "retry" && !state.retryQueue.length) state.mode = "practice";
      saveState();
      els.mode.value = state.mode;
      renderQuestion();
      setSyncStatus(payload?.exportedAt ? `Đã nạp state Git: ${new Date(payload.exportedAt).toLocaleString("vi-VN")}` : "Đã nạp state từ Git.");
    } catch {
      const localHint = window.location?.protocol === "file:" ? " Hãy mở web qua GitHub Pages hoặc localhost." : "";
      setSyncStatus(`Không nạp được file state.${localHint}`);
    }
  }
  function currentQuestion() { return questions[state.current]; }
  function answerStore() { return state.mode === "retry" ? state.retryAnswers : state.answers; }
  function checkedStore() { return state.mode === "retry" ? state.retryChecked : state.checked; }
  function scopedQuestions() {
    if (state.mode !== "retry") return questions;
    const ids = new Set(Array.isArray(state.retryQueue) ? state.retryQueue : []);
    return questions.filter((q) => ids.has(q.id));
  }
  function scopedPosition() {
    const q = currentQuestion();
    return scopedQuestions().findIndex((item) => item.id === q?.id);
  }
  function matching(q) { return matchingData[q.id] || null; }
  function isDragQuestion(q) { return dragQuestionIds.has(q.id); }
  function isGradable(q) { return q.gradable || Boolean(matching(q)); }
  function selected(id, answers = answerStore()) { return Array.isArray(answers[id]) ? answers[id] : []; }
  function matchingSelected(id, answers = answerStore()) {
    const value = answers[id];
    return value && !Array.isArray(value) && typeof value === "object" ? value : {};
  }
  function sameSet(a, b) { return a.length === b.length && a.every((x) => b.includes(x)); }
  function isCorrect(q, answers = answerStore()) {
    const groups = matching(q);
    if (groups) return groups.every((group, index) => matchingSelected(q.id, answers)[index] === group.correct);
    return q.gradable && sameSet(selected(q.id, answers), q.correct);
  }
  function answered(q, answers = answerStore(), checked = checkedStore()) {
    const groups = matching(q);
    if (groups) return groups.every((_, index) => Boolean(matchingSelected(q.id, answers)[index]));
    return q.gradable ? selected(q.id, answers).length > 0 : Boolean(checked[q.id]);
  }

  function renderNav() {
    els.grid.innerHTML = "";
    const checked = checkedStore();
    scopedQuestions().forEach((q) => {
      const index = questions.findIndex((item) => item.id === q.id);
      const button = document.createElement("button");
      button.className = "nav-item";
      button.textContent = q.id;
      button.title = `Câu ${q.id}`;
      if (index === state.current) button.classList.add("active");
      if (answered(q)) button.classList.add("answered");
      if (checked[q.id] && isGradable(q)) button.classList.add(isCorrect(q) ? "correct" : "wrong");
      if (state.flags[q.id]) button.classList.add("flagged");
      button.addEventListener("click", () => goTo(index));
      els.grid.appendChild(button);
    });
  }

  function renderQuestion() {
    const q = currentQuestion();
    if (!q) return;
    const groups = matching(q);
    const dragMode = Boolean(groups && isDragQuestion(q));
    const checked = checkedStore();
    const reveal = Boolean(checked[q.id]) && state.mode !== "exam";
    const scope = scopedQuestions();
    const position = scopedPosition();
    els.number.textContent = state.mode === "retry"
      ? `Câu ${q.id} · ${position + 1} / ${scope.length} câu cần làm lại`
      : `Câu ${q.id} / ${questions.length}`;
    els.type.textContent = groups ? `${dragMode ? "Kéo thả" : "Ghép cặp"} · ${groups.length} ô` : (q.gradable ? (q.multiple ? "Chọn nhiều đáp án" : "Chọn một đáp án") : "Tình huống");
    els.stem.textContent = q.stem || q.rawQuestion;
    els.choices.innerHTML = "";
    els.choices.classList.toggle("matching-groups", Boolean(groups));
    els.choices.classList.toggle("drag-board", dragMode);
    els.manual.hidden = Boolean(groups) || q.gradable;
    if (!els.manual.hidden) els.manual.textContent = "Câu này không có lựa chọn tương tác trong tài liệu. Hãy tự trả lời rồi mở đáp án để đối chiếu.";

    if (dragMode) renderDragQuestion(q, groups, reveal);
    else if (groups) groups.forEach((group, groupIndex) => renderMatchingGroup(q, group, groupIndex, reveal));
    else q.choices.forEach((choice) => {
      const button = document.createElement("button");
      const chosen = selected(q.id).includes(choice.label);
      button.className = `choice${chosen ? " selected" : ""}`;
      if (reveal && q.correct.includes(choice.label)) button.classList.add("correct");
      if (reveal && chosen && !q.correct.includes(choice.label)) button.classList.add("wrong");
      button.innerHTML = `<span class="choice-label">${choice.label}</span><span>${escapeHtml(choice.text)}</span>`;
      button.disabled = reveal;
      button.addEventListener("click", () => choose(q, choice.label));
      els.choices.appendChild(button);
    });

    els.prev.disabled = position <= 0;
    els.next.disabled = position < 0 || position === scope.length - 1;
    els.flag.classList.toggle("active", Boolean(state.flags[q.id]));
    els.flag.setAttribute("aria-pressed", String(Boolean(state.flags[q.id])));
    els.flag.textContent = state.flags[q.id] ? "★ Đã đánh dấu" : "☆ Đánh dấu";
    els.check.textContent = checked[q.id] ? "Ẩn / hiện đáp án" : (isGradable(q) ? "Kiểm tra đáp án" : "Xem đáp án");
    renderAnswer(reveal);
    updateStats();
    renderNav();
  }

  function renderDragQuestion(q, groups, reveal) {
    cleanupPointerDrag();
    activeDragOption = null;
    const bank = document.createElement("section");
    bank.className = "drag-bank";
    bank.innerHTML = `<div class="drag-bank-title"><strong>Ngân hàng đáp án</strong><span>Kéo đáp án vào ô tương ứng</span></div>`;
    const chips = document.createElement("div");
    chips.className = "drag-chips";
    const options = [...new Set(groups.flatMap((group) => group.options))];

    options.forEach((option) => {
      const chip = document.createElement("button");
      chip.className = "drag-chip";
      chip.type = "button";
      chip.draggable = !reveal;
      chip.disabled = reveal;
      chip.textContent = option;
      chip.dataset.option = option;
      chip.addEventListener("click", (event) => {
        if (event.detail === 0) selectDragOption(option);
      });
      chip.addEventListener("dragstart", (event) => event.preventDefault());
      chip.addEventListener("pointerdown", (event) => startPointerDrag(event, q, option, chip));
      chip.addEventListener("pointermove", movePointerDrag);
      chip.addEventListener("pointerup", finishPointerDrag);
      chip.addEventListener("pointercancel", cancelPointerDrag);
      chips.appendChild(chip);
    });
    bank.appendChild(chips);
    els.choices.appendChild(bank);

    const targets = document.createElement("section");
    targets.className = "drop-targets";
    groups.forEach((group, groupIndex) => {
      const chosen = matchingSelected(q.id)[groupIndex];
      const row = document.createElement("div");
      row.className = "drop-row";
      const prompt = document.createElement("div");
      prompt.className = "drop-prompt";
      prompt.textContent = `${groupIndex + 1}. ${group.prompt}`;
      const zone = document.createElement("div");
      zone.className = `drop-zone${chosen ? " filled" : ""}`;
      zone.dataset.groupIndex = String(groupIndex);
      zone.tabIndex = reveal ? -1 : 0;
      zone.setAttribute("role", "button");
      zone.setAttribute("aria-label", `${group.prompt}: ${chosen || "chưa chọn"}`);
      if (reveal) zone.classList.add(chosen === group.correct ? "correct" : "wrong");
      const value = document.createElement("span");
      value.className = "drop-value";
      value.textContent = chosen || "Thả đáp án vào đây";
      zone.appendChild(value);

      if (chosen && !reveal) {
        const clear = document.createElement("button");
        clear.className = "drop-clear";
        clear.type = "button";
        clear.setAttribute("aria-label", `Xóa đáp án cho ${group.prompt}`);
        clear.textContent = "×";
        clear.addEventListener("click", (event) => {
          event.stopPropagation();
          clearMatchingAnswer(q, groupIndex);
        });
        zone.appendChild(clear);
      }

      if (!reveal) {
        zone.addEventListener("dragover", (event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
          zone.classList.add("drag-over");
        });
        zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
        zone.addEventListener("drop", (event) => {
          event.preventDefault();
          const option = event.dataTransfer.getData("text/plain") || activeDragOption;
          if (option && group.options.includes(option)) chooseMatching(q, groupIndex, option);
        });
        zone.addEventListener("click", () => {
          if (activeDragOption && group.options.includes(activeDragOption)) chooseMatching(q, groupIndex, activeDragOption);
        });
        zone.addEventListener("keydown", (event) => {
          if ((event.key === "Enter" || event.key === " ") && activeDragOption && group.options.includes(activeDragOption)) {
            event.preventDefault();
            chooseMatching(q, groupIndex, activeDragOption);
          }
        });
      }
      row.append(prompt, zone);
      targets.appendChild(row);
    });
    els.choices.appendChild(targets);

    const mobileHint = document.createElement("p");
    mobileHint.className = "drag-hint";
    mobileHint.textContent = "Trên điện thoại: chạm một đáp án, sau đó chạm vào ô đích.";
    els.choices.appendChild(mobileHint);
  }

  function selectDragOption(option) {
    activeDragOption = activeDragOption === option ? null : option;
    document.querySelectorAll(".drag-chip").forEach((chip) => {
      const selected = chip.dataset.option === activeDragOption;
      chip.classList.toggle("active", selected);
      chip.setAttribute("aria-pressed", String(selected));
    });
  }

  function startPointerDrag(event, q, option, chip) {
    if (event.button !== 0 || chip.disabled) return;
    pointerDragState = {
      pointerId: event.pointerId,
      q,
      option,
      chip,
      startX: event.clientX,
      startY: event.clientY,
      dragging: false,
      ghost: null,
      overZone: null
    };
    chip.setPointerCapture?.(event.pointerId);
  }

  function movePointerDrag(event) {
    const drag = pointerDragState;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
    if (!drag.dragging && distance < 7) return;
    if (!drag.dragging) {
      drag.dragging = true;
      drag.chip.classList.add("dragging");
      drag.ghost = drag.chip.cloneNode(true);
      drag.ghost.className = "drag-ghost";
      document.body.appendChild(drag.ghost);
    }
    event.preventDefault();
    drag.ghost.style.left = `${event.clientX + 12}px`;
    drag.ghost.style.top = `${event.clientY + 12}px`;
    const zone = document.elementFromPoint(event.clientX, event.clientY)?.closest(".drop-zone");
    if (drag.overZone !== zone) {
      drag.overZone?.classList.remove("drag-over");
      drag.overZone = zone;
      drag.overZone?.classList.add("drag-over");
    }
  }

  function finishPointerDrag(event) {
    const drag = pointerDragState;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const wasDragging = drag.dragging;
    const zone = document.elementFromPoint(event.clientX, event.clientY)?.closest(".drop-zone") || drag.overZone;
    const groupIndex = zone ? Number(zone.dataset.groupIndex) : -1;
    const group = matching(drag.q)?.[groupIndex];
    cleanupPointerDrag();
    if (wasDragging && group && group.options.includes(drag.option)) {
      chooseMatching(drag.q, groupIndex, drag.option);
    } else if (!wasDragging) {
      selectDragOption(drag.option);
    }
  }

  function cancelPointerDrag() {
    cleanupPointerDrag();
  }

  function cleanupPointerDrag() {
    const drag = pointerDragState;
    if (!drag) return;
    drag.overZone?.classList.remove("drag-over");
    drag.chip?.classList.remove("dragging");
    drag.ghost?.remove();
    pointerDragState = null;
  }

  function renderMatchingGroup(q, group, groupIndex, reveal) {
    const wrap = document.createElement("section");
    wrap.className = "matching-group";
    const title = document.createElement("div");
    title.className = "matching-prompt";
    title.textContent = `${groupIndex + 1}. ${group.prompt}`;
    const options = document.createElement("div");
    options.className = "matching-options";
    const chosen = matchingSelected(q.id)[groupIndex];
    group.options.forEach((option) => {
      const button = document.createElement("button");
      button.className = `match-option${chosen === option ? " selected" : ""}`;
      if (reveal && option === group.correct) button.classList.add("correct");
      if (reveal && chosen === option && option !== group.correct) button.classList.add("wrong");
      button.textContent = option;
      button.disabled = reveal;
      button.addEventListener("click", () => chooseMatching(q, groupIndex, option));
      options.appendChild(button);
    });
    wrap.append(title, options);
    els.choices.appendChild(wrap);
  }

  function renderAnswer(reveal) {
    const q = currentQuestion();
    const show = state.mode !== "exam" && checkedStore()[q.id];
    els.answerCard.hidden = !show;
    if (!show) return;
    els.answerStatus.textContent = isGradable(q) ? (isCorrect(q) ? "Chính xác" : "Đáp án đúng") : "Đáp án tham khảo";
    const groups = matching(q);
    els.correctAnswer.textContent = groups ? groups.map((group, index) => `${index + 1}. ${group.prompt}: ${group.correct}`).join("\n") : q.answer;
    els.explanation.textContent = q.explanation || "Không có giải thích bổ sung trong tài liệu.";
    const page = q.sourcePages[0] || 1;
    els.pageLink.href = `${PDF_FILE}#page=${page}`;
    els.pageLink.textContent = `Trang ${q.sourcePages.join("–")} ↗`;
    if (reveal) setTimeout(() => els.answerCard.scrollIntoView({ behavior: "smooth", block: "nearest" }), 30);
  }

  function choose(q, label) {
    const checked = checkedStore();
    const answers = answerStore();
    if (checked[q.id] && state.mode !== "exam") return;
    let values = selected(q.id).slice();
    if (q.multiple) values = values.includes(label) ? values.filter((x) => x !== label) : [...values, label];
    else values = [label];
    answers[q.id] = values;
    saveState();
    renderQuestion();
  }

  function chooseMatching(q, groupIndex, option) {
    const checked = checkedStore();
    const answers = answerStore();
    if (checked[q.id] && state.mode !== "exam") return;
    answers[q.id] = { ...matchingSelected(q.id), [groupIndex]: option };
    saveState();
    renderQuestion();
  }

  function clearMatchingAnswer(q, groupIndex) {
    const answers = answerStore();
    const values = { ...matchingSelected(q.id) };
    delete values[groupIndex];
    answers[q.id] = values;
    saveState();
    renderQuestion();
  }

  function checkCurrent() {
    const q = currentQuestion();
    if (state.mode === "exam") { goRelative(1); return; }
    const checked = checkedStore();
    if (!checked[q.id]) {
      if (isGradable(q) && !answered(q)) {
        els.check.animate([{ transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "none" }], { duration: 180 });
        return;
      }
      checked[q.id] = true;
    } else {
      checked[q.id] = !checked[q.id];
    }
    saveState();
    renderQuestion();
  }

  function goTo(index) {
    state.current = Math.max(0, Math.min(index, questions.length - 1));
    saveState();
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSidebarOpen(false);
  }

  function setSidebarOpen(open) {
    els.sidebar.classList.toggle("open", open);
    els.sidebarBackdrop.classList.toggle("open", open);
    document.body.classList.toggle("sidebar-open", open);
    els.menu.setAttribute("aria-expanded", String(open));
  }

  function goRelative(offset) {
    const scope = scopedQuestions();
    const position = scopedPosition();
    if (!scope.length || position < 0) return;
    const target = scope[Math.max(0, Math.min(position + offset, scope.length - 1))];
    const index = questions.findIndex((q) => q.id === target.id);
    if (index >= 0) goTo(index);
  }

  function wrongAnsweredQuestions() {
    return questions.filter((q) => isGradable(q) && answered(q, state.answers, state.checked) && !isCorrect(q, state.answers));
  }

  function enterRetryMode() {
    const previousMode = state.mode;
    const existingQueue = Array.isArray(state.retryQueue) ? state.retryQueue : [];
    const retryAnswers = state.retryAnswers || (state.retryAnswers = {});
    const retryChecked = state.retryChecked || (state.retryChecked = {});
    const unfinishedExisting = existingQueue.filter((id) => {
      const q = questions.find((item) => item.id === id);
      return q && (!answered(q, retryAnswers, retryChecked) || !isCorrect(q, retryAnswers));
    });
    const unfinishedIds = new Set(unfinishedExisting);
    const wrongIds = wrongAnsweredQuestions().map((q) => q.id);
    const flaggedIds = questions.filter((q) => Boolean(state.flags[q.id])).map((q) => q.id);
    const retryQueue = [...new Set([...unfinishedExisting, ...wrongIds, ...flaggedIds])];

    if (!retryQueue.length) {
      els.mode.value = previousMode;
      alert("Chưa có câu sai hoặc câu được đánh dấu để làm lại.");
      return;
    }

    retryQueue.forEach((id) => {
      if (unfinishedIds.has(id)) return;
      delete retryAnswers[id];
      delete retryChecked[id];
    });

    state.retryQueue = retryQueue;
    state.mode = "retry";
    const firstIndex = questions.findIndex((q) => q.id === retryQueue[0]);
    if (firstIndex >= 0) state.current = firstIndex;
    els.mode.value = state.mode;
    saveState();
    renderQuestion();
  }

  function changeMode(mode) {
    if (mode === "retry") {
      enterRetryMode();
      return;
    }
    state.mode = mode;
    els.mode.value = mode;
    saveState();
    renderQuestion();
  }

  function updateStats() {
    const scope = scopedQuestions();
    const done = scope.filter((q) => answered(q)).length;
    const graded = scope.filter((q) => isGradable(q) && answered(q));
    const correct = graded.filter((q) => isCorrect(q)).length;
    els.progressText.textContent = `${done} / ${scope.length}`;
    els.progressBar.style.width = `${scope.length ? done / scope.length * 100 : 0}%`;
    els.scoreText.textContent = `${correct} / ${graded.length}`;
  }

  function showResults() {
    const scope = scopedQuestions();
    const graded = scope.filter((q) => isGradable(q) && answered(q));
    const correct = graded.filter((q) => isCorrect(q)).length;
    const percent = graded.length ? Math.round(correct / graded.length * 100) : 0;
    els.resultScore.textContent = `${percent}%`;
    els.resultCopy.textContent = state.mode === "retry"
      ? `Đúng ${correct}/${graded.length} câu đã trả lời. Đã làm lại ${scope.filter((q) => answered(q)).length}/${scope.length} câu sai hoặc được đánh dấu.`
      : `Đúng ${correct}/${graded.length} câu có thể chấm tự động. Đã xử lý ${scope.filter((q) => answered(q)).length}/${scope.length} câu toàn bộ đề.`;
    els.dialog.showModal();
  }

  function reviewWrong() {
    const target = scopedQuestions().find((q) => !answered(q) || (isGradable(q) && !isCorrect(q)));
    const index = target ? questions.findIndex((q) => q.id === target.id) : -1;
    els.dialog.close();
    goTo(index < 0 ? 0 : index);
  }

  function tick() {
    const now = Date.now();
    if (!state.paused) state.elapsed += Math.floor((now - lastTick) / 1000);
    lastTick = now;
    const h = String(Math.floor(state.elapsed / 3600)).padStart(2, "0");
    const m = String(Math.floor(state.elapsed % 3600 / 60)).padStart(2, "0");
    const s = String(state.elapsed % 60).padStart(2, "0");
    els.timer.textContent = `${h}:${m}:${s}`;
    if (state.elapsed % 10 === 0) saveState();
  }

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  els.prev.addEventListener("click", () => goRelative(-1));
  els.next.addEventListener("click", () => goRelative(1));
  els.check.addEventListener("click", checkCurrent);
  els.flag.addEventListener("click", () => { const q = currentQuestion(); state.flags[q.id] = !state.flags[q.id]; saveState(); renderQuestion(); });
  els.finish.addEventListener("click", showResults);
  els.close.addEventListener("click", () => els.dialog.close());
  els.continue.addEventListener("click", () => els.dialog.close());
  els.reviewWrong.addEventListener("click", reviewWrong);
  els.menu.addEventListener("click", () => setSidebarOpen(!els.sidebar.classList.contains("open")));
  els.sidebarClose.addEventListener("click", () => setSidebarOpen(false));
  els.sidebarBackdrop.addEventListener("click", () => setSidebarOpen(false));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setSidebarOpen(false); });
  els.theme.addEventListener("click", () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
  els.timerToggle.addEventListener("click", () => { state.paused = !state.paused; els.timerToggle.textContent = state.paused ? "Tiếp tục" : "Tạm dừng"; saveState(); });
  els.exportProgress.addEventListener("click", exportProgress);
  els.loadProgress.addEventListener("click", () => loadCommittedProgress({ force: true }));
  document.addEventListener("pointerup", finishPointerDrag);
  document.addEventListener("pointercancel", cancelPointerDrag);
  if (state.mode === "retry" && !state.retryQueue.length) state.mode = "practice";
  els.mode.value = state.mode;
  els.mode.addEventListener("change", () => changeMode(els.mode.value));
  els.clear.addEventListener("click", () => {
    if (!confirm("Xóa toàn bộ câu trả lời và làm lại từ đầu?")) return;
    state = blankState(); saveState(); els.mode.value = state.mode; renderQuestion();
  });

  setInterval(tick, 1000);
  applyTheme(document.documentElement.dataset.theme || "dark");
  tick();
  renderQuestion();
  if (!hadLocalState || !hasMeaningfulProgress(state)) loadCommittedProgress();
})();
