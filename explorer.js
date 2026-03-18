// ============================================================
// NeuroFlow — Deep Exploration Tools
//
// 1. Pathway Stories — guided step-through of NT edges
// 2. Anatomical region overlays — lobe labels on the 3D graph
// 3. Compare two pathways — side-by-side edge inspector
// ============================================================


// ── SHARED STATE ─────────────────────────────────────────────
function getTransmitters()  { return window._transmitters  || {}; }
function getCurrentNT()     { return window._currentNT     || null; }
function getNodeMeshes()    { return window._nodeMeshes    || []; }
function getEdgeMeshes()    { return window._edgeMeshes    || []; }
function getLabelElements() { return window._labelElements || []; }


// ── 1. PATHWAY STORIES ───────────────────────────────────────

let storyMode    = false;
let storyStep    = 0;
let storySteps   = [];  // array of regionEdge objects for current NT
let storyTimer   = null;
const STORY_AUTO_MS = 0; // 0 = no auto-advance; users go at own pace

// Sentence overlays — one short sentence per edge, keyed "from-to"
const STORY_SENTENCES = {
  // Dopamine
  "VTA-Striatum":    "Reward signal: VTA dopamine floods the nucleus accumbens whenever an outcome beats your prediction.",
  "VTA-PFC":         "Executive tuning: moderate dopamine sharpens PFC focus; too much or too little impairs it.",
  "SNc-Striatum":    "Motor go-signal: SNc dopamine enables smooth voluntary movement — lost in Parkinson's.",
  "VTA-Amygdala":    "Salience tagging: dopamine stamps emotionally charged memories with motivational weight.",
  // Serotonin
  "Raphe-PFC":       "Mood dial: raphe serotonin balances 5-HT1A (calm) and 5-HT2A (alert) tone in the PFC.",
  "Raphe-Amygdala":  "Threat brake: serotonin reduces amygdala over-reactivity — the core target of SSRIs.",
  "Raphe-Hippocampus":"Neurogenesis: serotonin promotes new neuron growth in the hippocampus — explaining SSRI delay.",
  "Raphe-Hypothalamus":"Homeostasis: serotonin suppresses appetite and stabilises sleep-wake cycles.",
  // Glutamate
  "Thalamus-Cortex":  "Sensory relay: every sight, sound, and touch is glutamate-forwarded through the thalamus to cortex.",
  "Cortex-Hippocampus":"Encoding gate: entorhinal cortex funnels context into hippocampus for LTP-based memory formation.",
  "Cortex-Striatum":  "Goal-to-action: cortical glutamate tells the striatum what you want to do and why.",
  "Hippocampus-Cortex":"Consolidation: hippocampus gradually writes new memories into stable cortical networks during sleep.",
  // GABA
  "Cortex-Cortex":    "Local inhibition: cortical interneurons use GABA to sharpen signal-to-noise and generate gamma oscillations.",
  "Thalamus-Thalamus":"Sleep gating: thalamic reticular nucleus uses GABA to block sensory signals during sleep.",
  "Striatum-Thalamus":"Movement permission: striatal GABA disinhibits thalamus through basal ganglia to allow intended movement.",
  "Cerebellum-Cerebellum":"Error correction: Purkinje cells (GABAergic) tune motor output by inhibiting deep cerebellar nuclei.",
  // Noradrenaline
  "Locus Coeruleus-PFC":         "Attention optimiser: LC noradrenaline at α2A receptors sharpens PFC working memory.",
  "Locus Coeruleus-Amygdala":    "Trauma imprinting: β-adrenergic activation during arousal stamps emotional memories deeply.",
  "Locus Coeruleus-Hippocampus": "Novelty gate: LC flags salient experiences for enhanced hippocampal LTP.",
  "Locus Coeruleus-Hypothalamus":"Stress ignition: LC triggers the HPA axis and sympathetic nervous system together.",
  // Acetylcholine
  "Basal Forebrain-Cortex":    "Attention broadcast: NBM ACh raises cortical signal-to-noise during focused attention.",
  "Basal Forebrain-Hippocampus":"Memory rhythm: medial septum drives theta oscillations that gate hippocampal LTP.",
  "Brainstem-Thalamus":        "Arousal switch: brainstem ACh depolarises thalamic relay neurons to enable wakefulness.",
  "Striatum-Striatum":         "Reward integrator: cholinergic interneurons pause on reward cues, modulating dopamine's effect.",
};

function startStory() {
  const nt = getCurrentNT();
  if (!nt) return;
  const ntData = getTransmitters()[nt];
  if (!ntData?.regionEdges?.length) return;

  storySteps = ntData.regionEdges;
  storyStep  = 0;
  storyMode  = true;

  document.getElementById("story-overlay")?.classList.remove("hidden");
  document.getElementById("story-btn")?.classList.add("active");

  renderStoryStep();
}

function endStory() {
  storyMode = false;
  clearTimeout(storyTimer);
  document.getElementById("story-overlay")?.classList.add("hidden");
  document.getElementById("story-btn")?.classList.remove("active");
  if (window.resetView) window.resetView();
}

function renderStoryStep() {
  if (!storyMode || !storySteps.length) return;
  const step  = storySteps[storyStep];
  const total = storySteps.length;
  const key   = `${step.from}-${step.to}`;
  const sentence = STORY_SENTENCES[key] || step.description.split("||")[0].split(" — ")[1] || step.description.split("||")[0];

  // Highlight the edge via existing showEdgeDetail
  if (window.showEdgeDetail) {
    window.showEdgeDetail(step.from, step.to, step.description);
  }

  // Update overlay card
  const overlay = document.getElementById("story-overlay");
  if (!overlay) return;

  overlay.querySelector(".story-step-count").textContent = `${storyStep + 1} / ${total}`;
  overlay.querySelector(".story-route").textContent      = `${step.from} → ${step.to}`;
  overlay.querySelector(".story-sentence").textContent   = sentence;

  const prevBtn = overlay.querySelector(".story-prev");
  const nextBtn = overlay.querySelector(".story-next");
  prevBtn.disabled = storyStep === 0;
  nextBtn.textContent = storyStep === total - 1 ? "Finish" : "Next →";
}

function storyPrev() {
  if (storyStep > 0) { storyStep--; renderStoryStep(); }
}

function storyNext() {
  if (storyStep < storySteps.length - 1) { storyStep++; renderStoryStep(); }
  else endStory();
}

window.storyPrev = storyPrev;
window.storyNext = storyNext;
window.endStory  = window.endStory || endStory; // don't overwrite tour's endTour


// ── 2. ANATOMICAL REGION OVERLAYS ────────────────────────────

const REGION_LOBE = {
  "PFC":             "Frontal lobe",
  "Cortex":          "Cerebral cortex",
  "Striatum":        "Basal ganglia",
  "Amygdala":        "Temporal lobe",
  "Hippocampus":     "Temporal lobe",
  "Thalamus":        "Diencephalon",
  "Hypothalamus":    "Diencephalon",
  "VTA":             "Midbrain",
  "SNc":             "Midbrain",
  "Raphe":           "Brainstem",
  "Locus Coeruleus": "Pons",
  "Brainstem":       "Brainstem",
  "Cerebellum":      "Cerebellum",
  "Basal Forebrain": "Forebrain",
};

let anatomyLabelsOn = false;

function toggleAnatomyLabels() {
  anatomyLabelsOn = !anatomyLabelsOn;
  const btn = document.getElementById("anatomy-toggle-btn");
  if (btn) {
    btn.classList.toggle("active", anatomyLabelsOn);
    btn.setAttribute("aria-pressed", String(anatomyLabelsOn));
    btn.title = anatomyLabelsOn ? "Hide anatomical labels" : "Show anatomical labels";
  }
  renderAnatomyLabels();
}

function renderAnatomyLabels() {
  // Remove any existing anatomy labels
  document.querySelectorAll(".anatomy-label").forEach(el => el.remove());
  if (!anatomyLabelsOn) return;

  const labels = getLabelElements();
  const container = document.getElementById("graph-node-labels");
  if (!container || !labels.length) return;

  // Group regions by lobe and compute average position for each lobe
  const lobeGroups = {};
  labels.forEach(({ id, el }) => {
    const lobe = REGION_LOBE[id];
    if (!lobe) return;
    if (!lobeGroups[lobe]) lobeGroups[lobe] = { els: [], lobe };
    lobeGroups[lobe].els.push(el);
  });

  Object.values(lobeGroups).forEach(({ els, lobe }) => {
    // Average x/y of member labels — read from their current CSS position
    let sumX = 0, sumY = 0, count = 0;
    els.forEach(el => {
      const x = parseFloat(el.style.left) || 0;
      const y = parseFloat(el.style.top)  || 0;
      if (x || y) { sumX += x; sumY += y; count++; }
    });
    if (!count) return;

    const ax = document.createElement("div");
    ax.className   = "anatomy-label";
    ax.textContent = lobe;
    ax.style.left  = (sumX / count) + "px";
    ax.style.top   = (sumY / count + 22) + "px"; // offset below the node labels
    container.appendChild(ax);
  });
}

// Called every animation frame when labels are on
window._onLabelUpdate = function() {
  if (anatomyLabelsOn) renderAnatomyLabels();
};


// ── BUTTON INJECTION ─────────────────────────────────────────

window.injectExplorerButtons = function() {
  const header = document.querySelector(".graph-header");
  if (!header) return;

  // Story button
  if (!document.getElementById("story-btn")) {
    const btn = document.createElement("button");
    btn.id        = "story-btn";
    btn.className = "ref-btn explorer-btn";
    btn.textContent = "Story";
    btn.title     = "Step through pathways in sequence";
    btn.setAttribute("aria-label", "Start pathway story mode");
    btn.onclick   = () => storyMode ? endStory() : startStory();
    header.appendChild(btn);
  }

  // Anatomy labels toggle
  if (!document.getElementById("anatomy-toggle-btn")) {
    const btn = document.createElement("button");
    btn.id        = "anatomy-toggle-btn";
    btn.className = "ref-btn explorer-btn";
    btn.textContent = "Regions";
    btn.title     = "Show anatomical region labels";
    btn.setAttribute("aria-label", "Toggle anatomical region labels");
    btn.setAttribute("aria-pressed", "false");
    btn.onclick   = toggleAnatomyLabels;
    header.appendChild(btn);
  }

  // Story overlay card (injected into graph-scene-container)
  if (!document.getElementById("story-overlay")) {
    const overlay = document.createElement("div");
    overlay.id        = "story-overlay";
    overlay.className = "story-overlay hidden";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-label", "Pathway story");
    overlay.innerHTML = `
      <div class="story-card">
        <div class="story-card-header">
          <span class="story-step-count"></span>
          <button class="story-close" onclick="endStory()" aria-label="Exit story">Close</button>
        </div>
        <div class="story-route"></div>
        <p class="story-sentence"></p>
        <div class="story-controls">
          <button class="story-prev" onclick="storyPrev()" aria-label="Previous pathway">← Prev</button>
          <button class="story-next" onclick="storyNext()" aria-label="Next pathway">Next →</button>
        </div>
      </div>
    `;
    const container = document.getElementById("graph-scene-container");
    if (container) container.appendChild(overlay);
  }
};


// ── INIT ─────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  // Escape exits active modes
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (storyMode) endStory();
  });
});
