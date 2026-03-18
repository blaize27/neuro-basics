// ============================================================
// NeuroFlow — Reference & Assessment Tools
//
// 1. Key Concepts drawer — aggregates all conceptNotes
// 2. Comparison table export — PDF (print) + CSV download
// 3. Glossary index page — full alphabetical browse
// 4. Compare table row panels + column navigation
// ============================================================

// ── ROW PANEL DATA ───────────────────────────────────────────
// One entry per row-label text. Each has: title, body, and
// optional scenarioLinks (array of scenario IDs from scenariosData).

const ROW_PANELS = {
  "Primary effect": {
    title: "What does 'primary effect' mean?",
    body: "Neurotransmitters are classified as excitatory (they make the postsynaptic neuron more likely to fire), inhibitory (they make it less likely to fire), or modulatory (they don't directly drive firing but change how the neuron responds to other inputs). Most NTs are modulatory at a systems level — even 'excitatory' glutamate is really a fast point-to-point signal, while dopamine and noradrenaline tune entire circuits over longer timescales.",
    scenarioLinks: []
  },
  "Receptor class": {
    title: "Ionotropic vs. metabotropic receptors",
    body: "Ionotropic receptors are ligand-gated ion channels — the neurotransmitter binds and the channel opens within milliseconds. Metabotropic receptors (GPCRs) work through a cascade of intracellular signals: binding activates a G-protein, which modulates enzymes or other channels. Ionotropic = fast and brief; metabotropic = slow, sustained, and amplifiable. Many NTs use both types simultaneously — serotonin, glutamate, GABA, and ACh each have at least one receptor from each class.",
    scenarioLinks: ["ketamine", "benzos"]
  },
  "Speed of action": {
    title: "Why transmission speed matters",
    body: "Fast ionotropic transmission (milliseconds) underlies sensory processing, motor commands, and moment-to-moment computation. Slow metabotropic transmission (100ms–seconds) underlies mood, arousal, and learning. A key clinical insight: drugs that target fast channels (benzodiazepines on GABA-A, ketamine on NMDA) produce immediate effects, while drugs targeting slow GPCR systems (SSRIs on SERT → 5-HT1A) take weeks — because they require receptor adaptation, not just receptor occupancy.",
    scenarioLinks: ["ketamine", "benzos", "ssri"]
  },
  "Key ions": {
    title: "Ion movements and membrane potential",
    body: "The neuron's electrical state is set by the balance of ions across its membrane. Na⁺ and Ca²⁺ influx depolarises (excites) the cell; K⁺ efflux or Cl⁻ influx hyperpolarises (inhibits) it. The resting potential of −70 mV reflects the background leak of K⁺ outward. An action potential requires depolarisation to approximately −55 mV (threshold), at which point voltage-gated Na⁺ channels open and firing becomes self-sustaining. The synapse simulator shows these ion movements in real time.",
    scenarioLinks: []
  },
  "Second messenger": {
    title: "Second messengers and signal amplification",
    body: "When a GPCR is activated, it triggers intracellular second messenger cascades — cAMP (via adenylyl cyclase), IP3/DAG (via PLCβ), or direct ion channel gating (via GIRK). These cascades amplify the original signal: one receptor activation can generate thousands of cAMP molecules, each activating multiple PKA enzymes. This amplification makes GPCR-coupled transmission far more powerful per molecule than ionotropic transmission — and far more targeted to specific downstream proteins.",
    scenarioLinks: []
  },
  "Reuptake / clearance": {
    title: "How synapses are terminated",
    body: "Reuptake transporters (DAT, SERT, NET, GAT) are membrane proteins that pump the neurotransmitter back into the presynaptic terminal for recycling. Enzymatic cleavage (AChE for acetylcholine, MAO for monoamines) breaks the NT down in the synapse or inside the terminal. Diffusion also plays a role for volume-transmission NTs. Most psychiatric drugs work by interfering with these clearance mechanisms — SSRIs block SERT, cocaine blocks DAT, donepezil inhibits AChE — to extend the NT's action.",
    scenarioLinks: ["cocaine", "ssri", "alzheimers"]
  },
  "Origin nucleus": {
    title: "Why the origin nucleus matters",
    body: "Most fast neurotransmitters (glutamate, GABA) are released locally by neurons everywhere in the brain. The monoamine systems (dopamine, serotonin, noradrenaline, ACh) are different: they originate from tiny, highly localised nuclei — VTA, raphe, locus coeruleus, basal forebrain — and project diffusely across the entire brain. This architecture means that a small cluster of neurons can regulate the state of the entire cerebral cortex simultaneously. It also explains why diseases targeting these nuclei (Parkinson's, Alzheimer's) are so devastating.",
    scenarioLinks: ["parkinsons", "alzheimers"]
  },
  "Key function": {
    title: "Function overview",
    body: "Each NT's function reflects the circuit it operates in and the receptor it activates. Dopamine encodes prediction error and drives motivation. Serotonin sets the gain on emotional reactivity. Glutamate carries almost all fast excitatory signals. GABA maintains circuit stability and generates oscillations. Noradrenaline controls the brain's overall arousal and alerting level. Acetylcholine gates attention and memory encoding. Dysfunction in any one system produces distinctive cognitive and psychiatric symptoms — but the systems are heavily interconnected, so most clinical disorders involve multiple NTs.",
    scenarioLinks: ["cocaine", "ssri", "alzheimers", "parkinsons", "ketamine", "benzos"]
  },
  "Disorder on loss": {
    title: "Disorders of neurotransmitter loss",
    body: "Loss-of-function disorders reveal what each NT normally does. Dopamine loss in the nigrostriatal pathway → Parkinson's motor symptoms; in the mesolimbic pathway → anhedonia and addiction vulnerability. Serotonin loss → depression and anxiety. Glutamate hypofunction → schizophrenia-like symptoms (NMDA hypofunction model). GABA loss → seizures and anxiety. Noradrenaline loss → ADHD, dysregulated stress response. Acetylcholine loss → Alzheimer's memory failure. These loss-of-function phenotypes are the strongest evidence linking each NT to its circuit function.",
    scenarioLinks: ["parkinsons", "alzheimers", "ssri", "benzos", "cocaine"]
  },
  "Drug acting here": {
    title: "Pharmacology at a glance",
    body: "Drugs act by mimicking (agonists), blocking (antagonists), or prolonging (reuptake inhibitors, enzyme inhibitors) neurotransmitter signalling. The specificity of a drug's effect depends on receptor subtype selectivity and circuit context. L-DOPA replenishes dopamine for Parkinson's. SSRIs block SERT to raise synaptic serotonin. Ketamine blocks NMDA receptors for rapid antidepressant effects. Benzodiazepines potentiate GABA-A. SNRIs block both SERT and NET. Donepezil inhibits AChE to prolong ACh. Understanding the mechanism predicts the side-effect profile.",
    scenarioLinks: ["cocaine", "ssri", "alzheimers", "parkinsons", "ketamine", "benzos"]
  }
};

// Column header → NT key mapping
const COL_NT_MAP = {
  "col-da":   "dopamine",
  "col-5ht":  "serotonin",
  "col-glu":  "glutamate",
  "col-gaba": "gaba",
  "col-na":   "noradrenaline",
  "col-ach":  "acetylcholine"
};

// ── PANEL OPEN/CLOSE ─────────────────────────────────────────

function openRowPanel(rowLabel) {
  const data = ROW_PANELS[rowLabel];
  if (!data) return;

  const panel = document.getElementById("compare-row-panel");
  if (!panel) return;

  const scenarios = window.scenariosData || [];
  const links = (data.scenarioLinks || [])
    .map(id => scenarios.find(s => s.id === id))
    .filter(Boolean);

  panel.querySelector(".crp-body").innerHTML = `
    <div class="crp-header">
      <h3 class="crp-title">${data.title}</h3>
      <button class="crp-close" onclick="closeRowPanel()" aria-label="Close">Close</button>
    </div>
    <p class="crp-text">${data.body}</p>
    ${links.length ? `
      <div class="crp-scenarios">
        <div class="crp-scenarios-label">Related scenarios</div>
        <div class="crp-scenario-chips">
          ${links.map(sc => `
            <button class="crp-scenario-chip" data-scenario="${sc.id}"
                    style="border-color:${getNTColor(sc.nt)};color:${getNTColor(sc.nt)}"
                    aria-label="Open scenario: ${sc.label}">
              ${sc.label}
            </button>
          `).join("")}
        </div>
      </div>
    ` : ""}
  `;

  // Wire scenario chips
  panel.querySelectorAll(".crp-scenario-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      closeRowPanel();
      const sc = scenarios.find(s => s.id === btn.dataset.scenario);
      if (!sc) return;
      document.getElementById("compare-page").classList.add("hidden");
      const graphPage = document.getElementById("graph-page");
      graphPage.classList.remove("hidden");
      // loadGraph and setActivePill are defined in script.js — call at click time
      // (not at bind time) so the race with DOMContentLoaded doesn't matter
      if (typeof loadGraph === "function") {
        loadGraph(sc.nt, sc);
        if (typeof setActivePill === "function") setActivePill(sc.nt);
      }
    });
  });

  // Mark active row label
  document.querySelectorAll(".row-label").forEach(el => {
    el.classList.toggle("row-label--active", el.textContent.trim() === rowLabel);
  });

  panel.classList.add("open");
}

window.closeRowPanel = function() {
  const panel = document.getElementById("compare-row-panel");
  if (panel) panel.classList.remove("open");
  document.querySelectorAll(".row-label").forEach(el => el.classList.remove("row-label--active"));
};

function getNTColor(key) {
  const colors = {
    dopamine: "#6ab0c8", serotonin: "#9b82c4", glutamate: "#52a87a",
    gaba: "#b86060", noradrenaline: "#6080b4", acetylcholine: "#c0884a"
  };
  return colors[key] || "#888";
}


// ── 1. KEY CONCEPTS DRAWER ──────────────────────────────────

window.openKeyConcepts = function() {
  const drawer = document.getElementById("key-concepts-drawer");
  if (!drawer) return;

  const data = window.synapseData;
  if (!data) return;

  // Build list of all NTs that have a conceptNote
  const concepts = Object.entries(data)
    .filter(([, nt]) => nt.conceptNote)
    .map(([key, nt]) => ({ key, colour: getNTColor(key), ...nt.conceptNote }));

  const inner = drawer.querySelector(".kc-inner");
  inner.innerHTML = `
    <div class="kc-header">
      <div>
        <p class="kc-label">Review</p>
        <h2 class="kc-title">Key Concepts</h2>
      </div>
      <button class="kc-close-btn" onclick="closeKeyConcepts()" aria-label="Close key concepts">Close</button>
    </div>
    <p class="kc-intro">One deeper idea per neurotransmitter — going beyond mechanism to the conceptual principle that unifies it. Useful for exam essays and vivas.</p>
    <div class="kc-list">
      ${concepts.map((c, i) => `
        <div class="kc-card">
          <div class="kc-card-header">
            <span class="kc-nt-badge" style="color:${c.colour};border-color:${c.colour}">${c.key.charAt(0).toUpperCase() + c.key.slice(1)}</span>
          </div>
          <h3 class="kc-card-title">${c.title}</h3>
          <p class="kc-card-body">${c.body}</p>
        </div>
      `).join("")}
    </div>
  `;

  drawer.classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeKeyConcepts = function() {
  const drawer = document.getElementById("key-concepts-drawer");
  if (drawer) drawer.classList.remove("open");
  document.body.style.overflow = "";
};


// ── 2. COMPARISON TABLE EXPORT ──────────────────────────────

window.exportCompareCSV = function() {
  const table = document.querySelector(".compare-table");
  if (!table) return;

  const rows = [];
  const headers = ["Property"];
  table.querySelectorAll("thead th:not(:first-child) .nt-col-name").forEach(el => {
    headers.push(el.textContent.trim());
  });
  rows.push(headers);

  table.querySelectorAll("tbody tr").forEach(tr => {
    const cells = [];
    tr.querySelectorAll("td").forEach(td => {
      const subs = td.querySelectorAll(".row-sub");
      subs.forEach(s => s.insertAdjacentText("beforebegin", " — "));
      cells.push(td.textContent.replace(/\s+/g, " ").trim());
      subs.forEach(s => {
        const prev = s.previousSibling;
        if (prev && prev.nodeType === 3 && prev.textContent === " — ") prev.remove();
      });
    });
    rows.push(cells);
  });

  const csv = rows.map(r =>
    r.map(c => `"${c.replace(/"/g, '""')}"`)
     .join(",")
  ).join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement("a"), { href: url, download: "neuroflow-neurotransmitters.csv" });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

window.printCompareTable = function() {
  document.body.classList.add("print-compare");
  window.print();
  setTimeout(() => document.body.classList.remove("print-compare"), 0);
};


// ── 3. GLOSSARY INDEX PAGE ───────────────────────────────────

window.openGlossaryIndex = function() {
  const page = document.getElementById("glossary-page");
  if (!page) return;

  const dict = window.NEURO_GLOSSARY;
  if (!dict) return;

  const sorted = Object.keys(dict).sort((a, b) => a.localeCompare(b));
  const groups = {};
  sorted.forEach(key => {
    const letter = key[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(key);
  });

  const body = page.querySelector(".glos-body");
  body.innerHTML = `
    <div class="glos-alphajump" role="navigation" aria-label="Jump to letter">
      ${Object.keys(groups).map(l => `<a class="glos-letter-link" href="#glos-${l}">${l}</a>`).join("")}
    </div>
    ${Object.entries(groups).map(([letter, keys]) => `
      <div class="glos-group" id="glos-${letter}">
        <div class="glos-group-letter">${letter}</div>
        ${keys.map(key => `
          <div class="glos-entry">
            <dt class="glos-term">${key.charAt(0).toUpperCase() + key.slice(1)}</dt>
            <dd class="glos-def">${dict[key]}</dd>
          </div>
        `).join("")}
      </div>
    `).join("")}
  `;

  page.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

window.closeGlossaryIndex = function() {
  const page = document.getElementById("glossary-page");
  if (page) page.classList.add("hidden");
  document.body.style.overflow = "";
};


// ── Button injection ─────────────────────────────────────────

window.injectReferenceButtons = function(context) {
  if (context === "graph") {
    if (!document.getElementById("kc-graph-btn")) {
      const btn = document.createElement("button");
      btn.id = "kc-graph-btn";
      btn.className = "ref-btn";
      btn.textContent = "Key concepts";
      btn.setAttribute("aria-label", "Open key concepts drawer");
      btn.onclick = () => window.openKeyConcepts();
      const header = document.querySelector(".graph-header");
      if (header) header.appendChild(btn);
    }
  }
  if (context === "synapse") {
    if (!document.getElementById("kc-synapse-btn")) {
      const btn = document.createElement("button");
      btn.id = "kc-synapse-btn";
      btn.className = "ref-btn";
      btn.textContent = "Key concepts";
      btn.setAttribute("aria-label", "Open key concepts drawer");
      btn.onclick = () => window.openKeyConcepts();
      const header = document.querySelector(".synapse-header");
      if (header) header.appendChild(btn);
    }
  }
};

// ── Init ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Escape closes all panels
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (document.getElementById("key-concepts-drawer")?.classList.contains("open")) window.closeKeyConcepts();
    if (!document.getElementById("glossary-page")?.classList.contains("hidden")) window.closeGlossaryIndex();
    window.closeRowPanel && window.closeRowPanel();
  });

  document.getElementById("key-concepts-drawer")?.addEventListener("click", e => {
    if (e.target.id === "key-concepts-drawer") window.closeKeyConcepts();
  });

  document.querySelectorAll("[data-open='glossary']").forEach(el => {
    el.addEventListener("click", e => { e.preventDefault(); window.openGlossaryIndex(); });
  });

  const csvBtn   = document.getElementById("compare-csv-btn");
  const printBtn = document.getElementById("compare-print-btn");
  if (csvBtn)   csvBtn.addEventListener("click",  window.exportCompareCSV);
  if (printBtn) printBtn.addEventListener("click", window.printCompareTable);

  // ── Row label click handlers ──────────────────────────────
  document.querySelectorAll(".compare-table .row-label").forEach(td => {
    td.setAttribute("tabindex", "0");
    td.setAttribute("role", "button");
    td.setAttribute("aria-label", `${td.textContent.trim()} — click for explanation`);
    td.style.cursor = "pointer";

    const activate = () => openRowPanel(td.textContent.trim());
    td.addEventListener("click", activate);
    td.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
    });
  });

  // ── Column header navigation ──────────────────────────────
  document.querySelectorAll(".col-nt-header").forEach(th => {
    // Determine NT key from class list
    const ntKey = Object.entries(COL_NT_MAP).find(([cls]) => th.classList.contains(cls))?.[1];
    if (!ntKey) return;

    th.style.cursor = "pointer";
    th.setAttribute("tabindex", "0");
    th.setAttribute("title", `Open ${ntKey} in Pathway Explorer`);
    th.setAttribute("aria-label", `${ntKey} — click to open in Pathway Explorer`);

    const navigate = () => {
      document.getElementById("compare-page").classList.add("hidden");
      document.getElementById("graph-page").classList.remove("hidden");
      if (typeof loadGraph === "function") {
        loadGraph(ntKey);
        if (typeof setActivePill === "function") setActivePill(ntKey);
      }
    };
    th.addEventListener("click", navigate);
    th.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigate(); }
    });
  });
});

