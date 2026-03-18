// ============================================================
// NeuroFlow — Learning & Guidance
// Three systems:
//   1. Guided tour  — first-visit overlay, 4 steps
//   2. Micro-guides — collapsible "how to read this" panels
//   3. Quiz modal   — scenario-linked multiple-choice
// ============================================================

// ── 1. GUIDED TOUR ──────────────────────────────────────────

const TOUR_KEY = "neuroflow_tour_v2"; // bumped — v1 completions no longer block

const tourSteps = [
  {
    targetId: "feature-network",
    title:    "Pathway Explorer",
    body:     "Choose any of the six neurotransmitters to open a 3D graph of its brain circuits. Click nodes for region details, edges for pathway mechanisms.",
    arrow:    "bottom"
  },
  {
    targetId: "feature-synapse",
    title:    "Synaptic Transmission",
    body:     "Watch a neuron fire in real time. Press 'Fire Neuron' to trigger an action potential and observe vesicle release, receptor binding, and the membrane potential trace.",
    arrow:    "bottom"
  },
  {
    targetId: "scenarios-section",
    title:    "Guided Scenarios",
    body:     "Start from a clinical question — cocaine, Alzheimer's, ketamine — and follow the neuroscience. Each scenario opens the relevant pathway with context. Test yourself with the quiz.",
    arrow:    "top"
  },
  {
    targetId: "go-compare-btn",
    title:    "Comparison Table",
    body:     "Side-by-side reference across all six neurotransmitters: receptor class, speed of action, key ions, reuptake, disorders, and drugs — useful for exam preparation.",
    arrow:    "top"
  }
];

let currentTourStep = 0;

function initTour() {
  if (localStorage.getItem(TOUR_KEY)) return;
  setTimeout(_startTour, 700);
}

function _startTour() {
  const overlay = document.getElementById("tour-overlay");
  if (!overlay) return;
  currentTourStep = 0;
  overlay.classList.remove("hidden");
  renderTourStep(currentTourStep);
}

// Public — button onclick and console use this
window.startTour = function() {
  localStorage.removeItem(TOUR_KEY);
  _startTour();
};
function renderTourStep(idx) {
  const step     = tourSteps[idx];
  const total    = tourSteps.length;
  const overlay  = document.getElementById("tour-overlay");
  const callout  = document.getElementById("tour-callout");
  const target   = document.getElementById(step.targetId) ||
                   document.querySelector("." + step.targetId);

  if (!callout || !target) { endTour(); return; }

  // Update text
  callout.querySelector(".tour-step-num").textContent  = `${idx + 1} of ${total}`;
  callout.querySelector(".tour-title").textContent     = step.title;
  callout.querySelector(".tour-body").textContent      = step.body;
  callout.querySelector(".tour-dots").innerHTML        =
    tourSteps.map((_, i) =>
      `<span class="tour-dot${i === idx ? " active" : ""}"></span>`
    ).join("");

  const isLast = idx === total - 1;
  const nextBtn = callout.querySelector(".tour-next");
  nextBtn.textContent = isLast ? "Done" : "Next →";

  // Scroll target into view BEFORE measuring — element may be below the fold.
  // Use instant scroll so layout is settled synchronously, then RAF to measure.
  target.scrollIntoView({ behavior: "instant", block: "center" });

  // Position callout and spotlight after the browser has committed the scroll
  requestAnimationFrame(() => {
    const tRect    = target.getBoundingClientRect();
    const vw       = window.innerWidth;
    const vh       = window.innerHeight;
    const calloutW = Math.min(300, vw - 32);
    callout.style.width = calloutW + "px";

    // Read callout height now that text is set
    const calloutH = callout.offsetHeight || 180;
    const margin   = 16;

    let top, arrowDir;

    if (step.arrow === "bottom") {
      // Prefer above the target
      top      = tRect.top - calloutH - margin;
      arrowDir = "bottom";
      // Not enough room above — flip below
      if (top < margin) {
        top      = tRect.bottom + margin;
        arrowDir = "top";
      }
    } else {
      // Prefer below the target
      top      = tRect.bottom + margin;
      arrowDir = "top";
      // Not enough room below — flip above
      if (top + calloutH > vh - margin) {
        top      = tRect.top - calloutH - margin;
        arrowDir = "bottom";
      }
    }

    // Final clamp — never go off top or bottom
    top = Math.max(margin, Math.min(top, vh - calloutH - margin));

    let left = tRect.left + tRect.width / 2 - calloutW / 2;
    left = Math.max(margin, Math.min(left, vw - calloutW - margin));

    callout.style.top    = top  + "px";
    callout.style.left   = left + "px";
    callout.dataset.arrow = arrowDir;

    const spotlight = document.getElementById("tour-spotlight");
    if (spotlight) {
      const pad = 10;
      spotlight.style.top    = (tRect.top    - pad) + "px";
      spotlight.style.left   = (tRect.left   - pad) + "px";
      spotlight.style.width  = (tRect.width  + pad * 2) + "px";
      spotlight.style.height = (tRect.height + pad * 2) + "px";
    }
  });
}

function endTour() {
  const overlay = document.getElementById("tour-overlay");
  if (overlay) overlay.classList.add("hidden");
  localStorage.setItem(TOUR_KEY, "1");
}

function tourNext() {
  currentTourStep++;
  if (currentTourStep >= tourSteps.length) {
    endTour();
  } else {
    renderTourStep(currentTourStep);
  }
}

// Expose so HTML onclick works
window.tourNext = tourNext;
window.endTour  = endTour;


// ── 2. MICRO-GUIDES ─────────────────────────────────────────

const GUIDE_GRAPH_KEY   = "neuroflow_guide_graph_v1";
const GUIDE_SYNAPSE_KEY = "neuroflow_guide_synapse_v1";

window.injectGraphGuide = function(sidebarEl) {
  if (!sidebarEl) return;
  // Remove any existing guide
  const old = sidebarEl.querySelector(".micro-guide");
  if (old) old.remove();

  const seen = localStorage.getItem(GUIDE_GRAPH_KEY);

  const guide = document.createElement("details");
  guide.className = "micro-guide";
  if (!seen) guide.setAttribute("open", "");
  guide.innerHTML = `
    <summary class="micro-guide-summary">
      <span class="micro-guide-icon">?</span>
      How to read this view
    </summary>
    <div class="micro-guide-body">
      <div class="micro-guide-row">
        <span class="mg-icon-dot" style="background:var(--c-dopamine)"></span>
        <span><strong>Nodes</strong> — brain regions. Click to see what the region is, what it does, and its clinical relevance.</span>
      </div>
      <div class="micro-guide-row">
        <svg width="20" height="8" style="flex-shrink:0"><line x1="0" y1="4" x2="20" y2="4" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/></svg>
        <span><strong>Edges</strong> — pathways between regions. Click to see the mechanism and a specific drug or disorder that acts here.</span>
      </div>
      <div class="micro-guide-row">
        <svg width="20" height="14" style="flex-shrink:0"><rect x="2" y="2" width="16" height="10" rx="2" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.2"/><line x1="5" y1="6" x2="15" y2="6" stroke="rgba(255,255,255,0.25)" stroke-width="1"/><line x1="5" y1="9" x2="12" y2="9" stroke="rgba(255,255,255,0.25)" stroke-width="1"/></svg>
        <span><strong>Sidebar</strong> — region details appear here. Dotted-underlined terms have glossary definitions on hover.</span>
      </div>
      <div class="micro-guide-row">
        <svg width="20" height="14" style="flex-shrink:0"><line x1="10" y1="2" x2="10" y2="12" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/><polyline points="6,6 10,2 14,6" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.2"/><polyline points="6,8 10,12 14,8" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.2"/></svg>
        <span><strong>Navigate</strong> — pan the graph by clicking and dragging. Pinch or scroll to zoom.</span>
      </div>
    </div>
  `;

  guide.addEventListener("toggle", () => {
    if (!guide.open) localStorage.setItem(GUIDE_GRAPH_KEY, "1");
  });

  // Insert at very top of sidebar content, before NT overview
  sidebarEl.prepend(guide);
};

window.buildSynapseGuideHTML = function() {
  return `
    <details class="micro-guide micro-guide--synapse">
      <summary class="micro-guide-summary">
        <span class="micro-guide-icon">?</span>
        How to read this view
      </summary>
      <div class="micro-guide-body">
        <div class="micro-guide-row">
          <svg width="20" height="14" style="flex-shrink:0"><line x1="2" y1="7" x2="18" y2="7" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/><polyline points="13,3 18,7 13,11" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.3"/></svg>
          <span><strong>Fire Neuron</strong> — triggers an action potential. Watch it travel down the axon, trigger Ca²⁺ influx, vesicle fusion, and receptor binding in sequence.</span>
        </div>
        <div class="micro-guide-row">
          <svg width="20" height="14" style="flex-shrink:0"><polyline points="2,12 6,8 10,4 14,7 18,3" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.4"/></svg>
          <span><strong>Membrane potential trace</strong> — the graph below the canvas. The resting line is −70 mV. Excitatory NTs push it upward toward threshold; inhibitory NTs push it down.</span>
        </div>
        <div class="micro-guide-row">
          <svg width="20" height="14" style="flex-shrink:0"><circle cx="10" cy="7" r="5" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.3"/><line x1="10" y1="3" x2="10" y2="11" stroke="rgba(255,255,255,0.2)" stroke-width="1"/></svg>
          <span><strong>Mg²⁺ block in NMDA</strong> — the light ion in the channel pore. It only exits when the membrane depolarises sufficiently, demonstrating the coincidence-detector mechanism.</span>
        </div>
        <div class="micro-guide-row">
          <svg width="20" height="14" style="flex-shrink:0"><line x1="3" y1="7" x2="17" y2="7" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/><polyline points="7,3 3,7 7,11" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.3"/><polyline points="13,3 17,7 13,11" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.3"/></svg>
          <span><strong>Switch neurotransmitter</strong> — use the pills at the top to compare receptor types and voltage responses across all six NTs.</span>
        </div>
      </div>
    </details>
  `;
};


// ── 3. QUIZ MODAL ────────────────────────────────────────────

let quizScenarioId = null;
let quizAnswers    = {};   // questionIdx → chosen option idx
let quizRevealed   = {};   // questionIdx → bool

window.openQuiz = function(scenarioId) {
  quizScenarioId = scenarioId;
  quizAnswers    = {};
  quizRevealed   = {};

  const modal = document.getElementById("quiz-modal");
  if (!modal) return;

  const sc = window.scenariosData && window.scenariosData.find(s => s.id === scenarioId);
  if (!sc || !sc.quiz || !sc.quiz.length) return;

  const inner = modal.querySelector(".quiz-inner");
  inner.innerHTML = `
    <div class="quiz-header">
      <div>
        <div class="quiz-scenario-label">${sc.label}</div>
        <h2 class="quiz-title">Test yourself</h2>
      </div>
      <button class="quiz-close-btn" onclick="closeQuiz()" aria-label="Close quiz">Close</button>
    </div>
    <p class="quiz-intro">${sc.summary}</p>
    <div class="quiz-questions" id="quiz-questions">
      ${sc.quiz.map((q, qi) => renderQuestion(q, qi)).join("")}
    </div>
    <div class="quiz-footer">
      <button class="quiz-reveal-all-btn" onclick="revealAll()">Show all answers</button>
      <button class="quiz-explore-btn" onclick="closeQuizAndExplore('${scenarioId}')">
        Explore in graph →
      </button>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

window.closeQuiz = function() {
  document.getElementById("quiz-modal").classList.add("hidden");
  document.body.style.overflow = "";
};

window.closeQuizAndExplore = function(scenarioId) {
  closeQuiz();
  // Trigger scenario navigation
  const card = document.querySelector(`.scenario-card[data-scenario="${scenarioId}"]`);
  if (card) card.click();
};

function renderQuestion(q, qi) {
  const optionsHtml = q.options.map((opt, oi) => `
    <button class="quiz-option" data-qi="${qi}" data-oi="${oi}"
            onclick="selectOption(${qi}, ${oi})"
            aria-label="${opt}">
      <span class="quiz-option-letter">${String.fromCharCode(65 + oi)}</span>
      <span class="quiz-option-text">${opt}</span>
    </button>
  `).join("");

  return `
    <div class="quiz-question" id="qq-${qi}">
      <p class="quiz-q-text"><span class="quiz-q-num">Q${qi + 1}</span> ${q.question}</p>
      <div class="quiz-options">${optionsHtml}</div>
      <div class="quiz-feedback hidden" id="qf-${qi}"></div>
    </div>
  `;
}

window.selectOption = function(qi, oi) {
  if (quizRevealed[qi]) return; // already answered

  quizAnswers[qi] = oi;
  quizRevealed[qi] = true;

  const sc      = window.scenariosData.find(s => s.id === quizScenarioId);
  const q       = sc.quiz[qi];
  const correct = (oi === q.correct);
  const fb      = document.getElementById(`qf-${qi}`);

  // Style options
  const container = document.getElementById(`qq-${qi}`);
  container.querySelectorAll(".quiz-option").forEach((btn, btnOi) => {
    btn.disabled = true;
    if (btnOi === q.correct) {
      btn.classList.add("quiz-option--correct");
    } else if (btnOi === oi && !correct) {
      btn.classList.add("quiz-option--wrong");
    }
  });

  // Feedback
  if (fb) {
    fb.classList.remove("hidden");
    fb.className = `quiz-feedback ${correct ? "quiz-feedback--correct" : "quiz-feedback--wrong"}`;
    fb.innerHTML = correct
      ? `<span class="qf-icon qf-correct">Correct.</span> ${q.explanation}`
      : `<span class="qf-icon qf-wrong">Incorrect.</span> ${q.explanation}`;
  }
};

window.revealAll = function() {
  const sc = window.scenariosData.find(s => s.id === quizScenarioId);
  if (!sc) return;
  sc.quiz.forEach((q, qi) => {
    if (!quizRevealed[qi]) selectOption(qi, q.correct);
  });
};

// ── Init on DOMContentLoaded ─────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Quiz buttons on scenario cards
  document.querySelectorAll(".scenario-quiz-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      // .scenario-quiz-btn is a sibling of .scenario-card inside .scenario-card-wrap
      // closest() only walks ancestors — use the wrap to find the card sibling
      const wrap = btn.closest(".scenario-card-wrap");
      const card = wrap && wrap.querySelector(".scenario-card[data-scenario]");
      if (!card) return;
      window.openQuiz(card.dataset.scenario);
    });
  });

  // Close on backdrop click
  const modal = document.getElementById("quiz-modal");
  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) window.closeQuiz();
    });
  }

  // Escape key closes quiz or tour
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (modal && !modal.classList.contains("hidden")) window.closeQuiz();
      else endTour();
    }
  });

  // Start tour
  initTour();
});
