// ============================================================
// NeuroFlow — Unified Glossary
// Single source of truth shared by script.js and synapse.js.
// Keys are lowercase; matching is case-insensitive.
// ============================================================

window.NEURO_GLOSSARY = {
  // ── Receptor types ─────────────────────────────────────────────────────
  "gpcr":
    "G protein-coupled receptor — a seven-transmembrane receptor that activates " +
    "an intracellular G protein (Gα, Gβ, Gγ) on binding a neurotransmitter. The G " +
    "protein then modulates second messengers like cAMP or IP3. GPCRs produce " +
    "slower, longer-lasting effects than ionotropic receptors (100s of ms vs. ms).",

  "ionotropic":
    "A receptor that is itself an ion channel. Neurotransmitter binding directly " +
    "opens the gate, allowing ions to flow within milliseconds. Examples: AMPA, " +
    "NMDA, GABA-A, nAChR, 5-HT3. Speed makes them ideal for fast synaptic signalling.",

  "metabotropic":
    "A receptor (such as a GPCR) that works through intracellular signalling cascades " +
    "rather than opening an ion channel directly. Effects are slower (100–500 ms) but " +
    "more diverse — modulating gene expression, channel phosphorylation, and long-term " +
    "synaptic strength.",

  "ampa":
    "α-amino-3-hydroxy-5-methyl-4-isoxazolepropionic acid receptor — a fast ionotropic " +
    "glutamate receptor. Glutamate binding opens a Na⁺/K⁺ channel within milliseconds, " +
    "producing rapid depolarisation (EPSP). During LTP, more AMPA receptors are inserted " +
    "into the postsynaptic membrane, making the synapse stronger.",

  "nmda":
    "N-methyl-D-aspartate receptor — a glutamate-gated Ca²⁺ channel with a critical " +
    "voltage-dependent Mg²⁺ block. At resting potential, Mg²⁺ physically plugs the pore. " +
    "The block only lifts when the membrane is sufficiently depolarised (by AMPA activity). " +
    "This means NMDA requires BOTH glutamate binding AND postsynaptic depolarisation " +
    "simultaneously — making it a molecular coincidence detector and the key trigger for LTP.",

  "coincidence detector":
    "A receptor or circuit element that only responds when two inputs arrive at the same " +
    "time. The NMDA receptor is the canonical molecular coincidence detector: it requires " +
    "presynaptic glutamate release (ligand binding) AND postsynaptic depolarisation (voltage " +
    "requirement) to open. This makes it the ideal trigger for Hebbian plasticity — 'cells " +
    "that fire together, wire together.'",

  "nachr":
    "Nicotinic acetylcholine receptor — a pentameric ionotropic receptor permeable to " +
    "Na⁺, K⁺, and (in α7 subtypes) Ca²⁺. The main receptor at the neuromuscular junction " +
    "and in autonomic ganglia. Named because nicotine activates it, explaining cigarette " +
    "addiction's link to arousal and attention.",

  "machr":
    "Muscarinic acetylcholine receptor — a GPCR for acetylcholine (M1–M5 subtypes). " +
    "M1 (Gq) mediates cortical and hippocampal memory effects. M2 (Gi) slows heart rate " +
    "and provides inhibitory autoreceptor feedback. Named because muscarine (from fly " +
    "agaric mushroom) activates it.",

  "gaba-a":
    "An ionotropic GABA receptor — a pentameric Cl⁻ channel. GABA binding opens the " +
    "pore, Cl⁻ flows in, and the cell hyperpolarises rapidly (fast IPSP, <10 ms). " +
    "Benzodiazepines bind an allosteric site, increasing channel opening frequency. " +
    "General anaesthetics also potentiate GABA-A conductance.",

  "gaba-b":
    "A metabotropic GABA receptor — a Gi-coupled GPCR. Activation reduces cAMP and " +
    "opens GIRK K⁺ channels, producing a slow, prolonged IPSP (100–200 ms). " +
    "GABA-B autoreceptors on presynaptic terminals suppress GABA release. " +
    "Baclofen is a GABA-B agonist used to treat muscle spasticity.",

  // ── Membrane physiology ────────────────────────────────────────────────
  "action potential":
    "A brief, all-or-nothing electrical impulse that travels along the axon. When " +
    "membrane voltage crosses threshold (~−55 mV), voltage-gated Na⁺ channels open " +
    "in a self-amplifying cascade, producing a rapid +40 mV spike. Na⁺ channels then " +
    "inactivate, K⁺ channels open for repolarisation, and a brief refractory period " +
    "prevents immediate re-firing.",

  "depolarisation":
    "When the inside of a neuron becomes less negative — moving from resting potential " +
    "(−70 mV) toward and above 0 mV. Caused by Na⁺ or Ca²⁺ influx, or K⁺ efflux " +
    "reduction. Sufficient depolarisation triggers an action potential.",

  "hyperpolarisation":
    "When the membrane voltage becomes more negative than resting potential (below " +
    "−70 mV). Caused by K⁺ efflux or Cl⁻ influx. Makes the cell harder to fire — " +
    "the basis of synaptic inhibition.",

  "resting potential":
    "The baseline membrane voltage of an unstimulated neuron: approximately −70 mV. " +
    "Maintained by the Na⁺/K⁺-ATPase pump (3 Na⁺ out, 2 K⁺ in per ATP) and the " +
    "selective permeability of leak channels.",

  "epsp":
    "Excitatory postsynaptic potential — a transient depolarisation of the postsynaptic " +
    "membrane. Caused by the opening of excitatory channels (e.g. AMPA). A single EPSP " +
    "is usually too small to fire a neuron; temporal and spatial summation of many EPSPs " +
    "is required to reach threshold.",

  "ipsp":
    "Inhibitory postsynaptic potential — a hyperpolarisation of the postsynaptic membrane. " +
    "Caused by Cl⁻ influx (GABA-A) or K⁺ efflux (GABA-B, 5-HT1A, GIRK channels). " +
    "Reduces the probability that excitatory inputs will trigger an action potential.",

  "synaptic plasticity":
    "The ability of synapses to change their strength over time in response to activity. " +
    "Long-term potentiation (LTP) strengthens synapses; long-term depression (LTD) " +
    "weakens them. These changes are the cellular basis of learning and memory.",

  // ── Plasticity ─────────────────────────────────────────────────────────
  "ltp":
    "Long-term potentiation — a persistent strengthening of a synapse following " +
    "repeated high-frequency stimulation. Requires NMDA receptor activation and Ca²⁺ " +
    "influx, which activates CaMKII → inserts more AMPA receptors into the postsynaptic " +
    "membrane. LTP is the primary cellular mechanism of learning and memory.",

  "long-term potentiation":
    "A persistent strengthening of a synapse produced by repeated stimulation. Requires " +
    "NMDA receptor activation and Ca²⁺ influx, triggering CaMKII activation and " +
    "AMPA receptor insertion. The cellular basis of learning and memory.",

  "camkii":
    "Ca²⁺/calmodulin-dependent protein kinase II — a key enzyme activated by Ca²⁺ " +
    "influx through NMDA receptors. CaMKII phosphorylates AMPA receptors (increasing " +
    "conductance) and triggers insertion of new AMPA receptors, physically strengthening " +
    "the synapse. It is a molecular 'switch' for LTP.",

  // ── Second messengers & signalling ────────────────────────────────────
  "camp":
    "Cyclic AMP (adenosine monophosphate) — a second messenger produced by adenylyl " +
    "cyclase when Gs-coupled GPCRs are activated. cAMP activates PKA, which " +
    "phosphorylates ion channels, receptors, and transcription factors (via CREB), " +
    "linking neurotransmitter signals to gene expression.",

  "ip3":
    "Inositol trisphosphate — a second messenger produced when Gq-coupled GPCRs " +
    "activate phospholipase C (PLCβ). IP3 binds receptors on the endoplasmic reticulum, " +
    "triggering Ca²⁺ release into the cytoplasm. Often acts alongside DAG to activate PKC.",

  "pka":
    "Protein kinase A — an enzyme activated by cAMP. PKA phosphorylates target proteins " +
    "including AMPA receptors (increasing conductance), voltage-gated channels, and the " +
    "transcription factor CREB. The D1 dopamine receptor pathway acts largely through PKA.",

  "girk":
    "G protein-coupled inwardly rectifying K⁺ channel — opened directly by the Gβγ " +
    "subunit of Gi-coupled GPCRs (e.g. GABA-B, 5-HT1A, α2 adrenoreceptors, M2 mAChR). " +
    "K⁺ flows out, hyperpolarising the cell. This is the ionic mechanism of slow " +
    "inhibitory postsynaptic potentials.",

  // ── Presynaptic machinery ──────────────────────────────────────────────
  "vesicle":
    "A membrane-enclosed sac (~40 nm diameter) that stores neurotransmitter molecules " +
    "in the presynaptic terminal. On Ca²⁺ influx, SNARE proteins (synaptobrevin, " +
    "syntaxin, SNAP-25) catalyse vesicle fusion with the terminal membrane, releasing " +
    "contents into the synaptic cleft by exocytosis.",

  "snare":
    "Soluble NSF attachment protein receptor — a family of proteins (synaptobrevin, " +
    "syntaxin, SNAP-25) that mediate vesicle fusion with the presynaptic membrane. " +
    "They form a tight four-helix bundle that physically pulls the membranes together. " +
    "Botulinum toxin and tetanus toxin cleave SNARE proteins, blocking neurotransmitter release.",

  // ── Reuptake transporters ──────────────────────────────────────────────
  "reuptake":
    "The recapture of a neurotransmitter from the synaptic cleft back into the " +
    "presynaptic terminal via transporter proteins (DAT, SERT, NET, GAT). Reuptake " +
    "is the primary mechanism for terminating neurotransmitter signalling and recycling " +
    "molecules for future release.",

  "dat":
    "Dopamine transporter — a plasma membrane monoamine transporter (SLC6A3) on " +
    "dopaminergic terminals. Clears dopamine from the synapse by reuptake into the " +
    "presynaptic neuron. Cocaine blocks DAT, flooding the synapse with dopamine. " +
    "Amphetamine reverses DAT, actively pumping dopamine out.",

  "sert":
    "Serotonin transporter (SLC6A4) — clears serotonin from the synapse via reuptake. " +
    "The primary target of SSRIs (fluoxetine, sertraline, escitalopram), which block " +
    "SERT to increase synaptic serotonin. Polymorphisms in the SERT gene are associated " +
    "with depression and anxiety vulnerability.",

  "net":
    "Noradrenaline transporter (SLC6A2) — clears noradrenaline from the synapse. " +
    "Blocked by SNRIs (venlafaxine, duloxetine) and tricyclic antidepressants (TCAs). " +
    "Also blocked by cocaine (less potently than DAT). Stimulants like atomoxetine " +
    "selectively block NET and are used for ADHD.",

  "eaats":
    "Excitatory amino acid transporters — a family of glutamate transporters (GLT-1/EAAT2, " +
    "GLAST/EAAT1) primarily on astrocytes. They rapidly remove glutamate from the cleft, " +
    "preventing excitotoxicity (neuronal death from excessive Ca²⁺ influx). Loss of " +
    "EAAT2 is implicated in ALS (motor neuron disease).",

  // ── Drugs & clinical ───────────────────────────────────────────────────
  "ssri":
    "Selective serotonin reuptake inhibitor — antidepressants (fluoxetine, sertraline, " +
    "escitalopram) that block SERT, increasing synaptic serotonin. Therapeutic effects " +
    "take 2–4 weeks, suggesting the mechanism involves downstream changes (e.g. " +
    "hippocampal neurogenesis) beyond immediate SERT blockade.",

  "l-dopa":
    "L-3,4-dihydroxyphenylalanine — the direct precursor to dopamine that crosses the " +
    "blood-brain barrier (dopamine itself cannot). The cornerstone of Parkinson's " +
    "disease treatment, replenishing dopamine in the depleted nigrostriatal pathway. " +
    "Effectiveness declines as more dopaminergic neurons are lost.",

  "benzodiazepine":
    "A class of drugs (diazepam, lorazepam, alprazolam) that bind an allosteric site " +
    "on GABA-A receptors, increasing the frequency of Cl⁻ channel opening. Produces " +
    "anxiolytic, sedative, anticonvulsant, and muscle-relaxant effects. Tolerance " +
    "develops via GABA-A receptor downregulation. High risk of dependence.",

  // ── Pathways & systems ─────────────────────────────────────────────────
  "prediction error":
    "The difference between an expected and actual outcome. Dopamine neurons fire " +
    "faster than baseline when an outcome is better than predicted (positive error) " +
    "and dip below baseline when worse (negative error). This signal drives " +
    "reinforcement learning — it is the brain's 'this was surprising, update your model' signal.",

  "working memory":
    "The capacity to hold and manipulate a small amount of information in mind over " +
    "seconds (~7 items, ~15–30 s). Dependent on persistent neural firing in the PFC, " +
    "modulated by both dopamine (D1 receptors) and noradrenaline (α2A receptors). " +
    "Impaired in ADHD, schizophrenia, and during acute stress.",

  "hpa axis":
    "Hypothalamic-pituitary-adrenal axis — the hormonal stress-response system. " +
    "Stress → hypothalamus releases CRH → anterior pituitary releases ACTH → " +
    "adrenal cortex releases cortisol. Cortisol mobilises energy and modulates " +
    "immunity. Chronic HPA activation contributes to hippocampal atrophy in PTSD " +
    "and depression.",

  "nucleus accumbens":
    "The core reward structure within the ventral striatum. Dopamine release here — " +
    "from VTA neurons — signals 'this outcome was better than expected' and reinforces " +
    "the behaviour that caused it. Addictive drugs produce dopamine surges in the " +
    "nucleus accumbens far exceeding any natural reward, overriding normal learning.",

  "neurogenesis":
    "The birth of new neurons in the adult brain, primarily in the hippocampal dentate " +
    "gyrus. Promoted by serotonin, BDNF, exercise, and antidepressants. Suppressed by " +
    "chronic stress and corticosteroids. Thought to contribute to the 2–4 week delay " +
    "before SSRIs produce therapeutic effects.",

  "theta oscillations":
    "4–8 Hz rhythmic electrical activity in the hippocampus, driven by cholinergic " +
    "and GABAergic inputs from the medial septum. Theta rhythm is the hippocampus's " +
    "'encoding mode': it times synaptic plasticity, making some synapses more likely " +
    "to undergo LTP. Disrupted by anticholinergic drugs (e.g. scopolamine), producing " +
    "amnesia.",

  "basal ganglia":
    "A collection of subcortical nuclei (striatum, globus pallidus, subthalamic nucleus, " +
    "substantia nigra) involved in motor control, habit learning, and reward. Operates " +
    "via two competing pathways: the direct pathway facilitates movement, the indirect " +
    "pathway suppresses it. Dopamine tips the balance toward movement via D1 (direct) " +
    "and D2 (indirect) receptors.",

  "gamma oscillations":
    "30–80 Hz rhythmic neural activity generated by interactions between excitatory " +
    "pyramidal cells and inhibitory parvalbumin-positive interneurons. Associated with " +
    "conscious perception, attention, and working memory. Reduced gamma power in " +
    "schizophrenia may reflect parvalbumin interneuron dysfunction.",

  "d1":
    "D1 dopamine receptor — a Gs-coupled GPCR. Activation increases cAMP → PKA → " +
    "phosphorylation of AMPA receptors and CREB. Expressed heavily in the striatum " +
    "and PFC. Part of the 'direct pathway' in the basal ganglia, facilitating movement.",

  "d2":
    "D2 dopamine receptor — a Gi-coupled GPCR. Activation decreases cAMP and opens " +
    "GIRK channels. Target of all antipsychotic medications. Part of the 'indirect " +
    "pathway' in the basal ganglia, suppressing unwanted movements. Also functions as " +
    "a presynaptic autoreceptor, reducing dopamine release.",

  "synaptobrevin":
    "A SNARE protein on the vesicle membrane (v-SNARE) essential for vesicle fusion. " +
    "Cleaved by botulinum toxin type B, blocking neurotransmitter release. Forms a " +
    "helical bundle with syntaxin and SNAP-25 that mechanically pulls the vesicle and " +
    "plasma membranes together.",
};

// ── Shared glossify function ────────────────────────────────────────────────
// Uses lookaheads instead of \b so terms with ², ⁺, α, - are matched correctly.
window.glossifyText = function(text, termClass = "glossary-term"){
  const dict = window.NEURO_GLOSSARY;
  const keys = Object.keys(dict).sort((a, b) => b.length - a.length);

  // Escape special regex chars in each key
  const escaped = keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  // Use lookahead/lookbehind instead of \b:
  //   (?<![A-Za-z0-9]) — not preceded by a letter or digit
  //   (?![A-Za-z0-9])  — not followed by a letter or digit
  // This correctly handles terms like "LTP", "NMDA", "Ca²⁺", "5-HT1A"
  // without breaking on surrounding punctuation or superscript characters.
  const pattern = new RegExp(
    "(?<![A-Za-z0-9])(" + escaped.join("|") + ")(?![A-Za-z0-9])",
    "gi"
  );

  const seen = new Set();
  return text.replace(pattern, (match) => {
    const key = match.toLowerCase();
    if(seen.has(key)) return match;
    seen.add(key);
    const def = dict[key];
    if(!def) return match;
    const safe = def.replace(/"/g, "&quot;");
    return `<span class="${termClass}" tabindex="0" data-def="${safe}">${match}</span>`;
  });
};

// ── Shared tooltip wiring ───────────────────────────────────────────────────
window.attachGlossaryTooltips = function(container, tooltipId, anchorEl){
  const tooltip = document.getElementById(tooltipId);
  if(!tooltip || !container) return;
  container.querySelectorAll(".glossary-term, .graph-gloss-term").forEach(el => {
    const show = () => {
      tooltip.textContent = el.dataset.def;
      tooltip.classList.add("visible");
      const anchorRect = (anchorEl || container).getBoundingClientRect();
      const elRect     = el.getBoundingClientRect();
      const top  = elRect.bottom - anchorRect.top + 6;
      const left = Math.max(0, Math.min(
        elRect.left - anchorRect.left,
        anchorRect.width - 280
      ));
      tooltip.style.top  = top  + "px";
      tooltip.style.left = left + "px";
    };
    const hide = () => tooltip.classList.remove("visible");
    el.addEventListener("mouseenter", show);
    el.addEventListener("focus",      show);
    el.addEventListener("mouseleave", hide);
    el.addEventListener("blur",       hide);
    el.addEventListener("click",      e => { e.stopPropagation(); show(); });
  });
};
