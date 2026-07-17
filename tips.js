(() => {
  const questions = window.AI103_QUESTIONS || [];
  const matching = window.AI103_MATCHING || {};
  const guides = window.AI103_TIP_GUIDES || {};

  function compact(text, limit = 420) {
    const value = String(text || "").replace(/\s+/g, " ").trim();
    if (value.length <= limit) return value;
    return `${value.slice(0, limit - 1).trimEnd()}…`;
  }

  function answerFor(question) {
    const groups = matching[question.id];
    if (groups) return groups.map((group) => `${group.prompt} → ${group.correct}`).join("; ");
    return compact(question.answer);
  }

  const tips = {};
  for (const question of questions) {
    const guide = guides[question.id];
    if (!guide) continue;
    tips[question.id] = {
      keywords: guide.keywords,
      answer: answerFor(question),
      mnemonic: guide.mnemonic,
      traps: Object.entries(guide.trapNotes).map(([label, text]) => ({ label, text })),
      ultraShort: guide.ultraShort,
      sources: guide.sources
    };
  }

  window.AI103_TIPS = tips;
})();
