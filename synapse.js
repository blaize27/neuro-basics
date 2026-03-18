// ============================================================
// NeuroFlow — Synaptic Transmission v3
// ============================================================

const ION = {
  naIn:  { symbol:"Na⁺",  direction:"in",  color:"#c49a50", effect:"depolarises" },
  kOut:  { symbol:"K⁺",   direction:"out", color:"#9b82c4", effect:"repolarises" },
  ca2In: { symbol:"Ca²⁺", direction:"in",  color:"#b86060", effect:"plasticity" },
  clIn:  { symbol:"Cl⁻",  direction:"in",  color:"#52a87a", effect:"hyperpolarises" },
};

const synapseData = {
  // ── Dopamine: only metabotropic (D1/D2 GPCRs) ─────────────────────────
  dopamine: {
    color:"#6ab0c8", vesicleColor:"#6ab0c8",
    receptorClass:"gpcr", effect:"modulatory", effectLabel:"Modulatory",
    postEffect:"Depolarisation (cAMP / PKA-mediated)", receptor:"D1/D2 GPCRs",
    cascade:"D1→Gs→AC→↑cAMP→PKA", cascadeEffect:"PKA phosphorylates Na⁺ channels → opens",
    ions:[
      {symbol:"Na⁺",direction:"in",  color:"#c49a50", effect:"depolarises"},
      {symbol:"K⁺", direction:"out", color:"#9b82c4", effect:"modulated"}
    ],
    mechanism:"Dopamine acts exclusively through metabotropic receptors, not ion channels. D1-class receptors (D1, D5) couple to Gs proteins, activating adenylyl cyclase to raise intracellular cAMP. Elevated cAMP activates protein kinase A (PKA), which phosphorylates multiple target proteins including voltage-gated sodium and calcium channels, AMPA receptors, and DARPP-32. D2-class receptors (D2, D3, D4) couple to Gi, suppressing adenylyl cyclase and reducing cAMP. The net effect on membrane potential depends on which receptor subtypes are expressed and their downstream targets in a given neuron.",
    presynaptic:"An action potential invades the presynaptic terminal and activates voltage-gated calcium channels (VGCCs). Calcium influx triggers fusion of dopamine-containing dense-core vesicles with the presynaptic membrane via SNARE proteins, releasing dopamine into the synaptic cleft. Presynaptic D2 autoreceptors on the terminal membrane detect accumulated extracellular dopamine and, through Gi-mediated signalling, reduce further vesicle fusion and dopamine synthesis, providing negative feedback regulation of release.",
    postsynaptic:"Dopamine binding to D1 receptors activates the Gs-cAMP-PKA cascade, which modulates ion channel phosphorylation and increases excitability. In the prefrontal cortex, moderate D1 stimulation strengthens the persistent firing of pyramidal neurons required for working memory. D2 receptor activation via Gi reduces cAMP and can activate GIRK channels, generally reducing excitability. In the striatum, D1-expressing medium spiny neurons facilitate the direct pathway, while D2-expressing neurons are inhibited, shifting the balance toward movement initiation.",
    reuptake:"Dopamine is cleared from the synapse primarily by the dopamine transporter (DAT), a Na⁺/Cl⁻-dependent secondary active transporter that returns dopamine into the presynaptic terminal for repackaging. Within the terminal, monoamine oxidase B (MAO-B) catabolises excess dopamine to DOPAC. In the prefrontal cortex, where DAT expression is lower, catechol-O-methyltransferase (COMT) plays a more prominent role in dopamine inactivation.",
    potentialShape:"plateau",
    clinicalNote:"Cocaine and amphetamines both elevate synaptic dopamine in the nucleus accumbens, but by different mechanisms: cocaine blocks DAT competitively, while amphetamines are DAT substrates that reverse transporter direction and trigger non-exocytotic dopamine efflux. D2 receptor blockade is the shared mechanism of all approved antipsychotics; atypical antipsychotics (clozapine, risperidone) additionally antagonise 5-HT2A receptors. L-DOPA, the biosynthetic precursor of dopamine, crosses the blood-brain barrier and is decarboxylated to dopamine by aromatic amino acid decarboxylase in surviving nigrostriatal terminals.",
    conceptNote:{
      title: "Dopamine encodes prediction error, not pleasure",
      body:  "A persistent misconception frames dopamine as a pleasure or reward signal. The evidence is more precise: dopamine neurons encode the difference between predicted and actual outcomes. When an outcome exceeds prediction, they fire a brief burst (positive prediction error). When an outcome is worse than predicted, firing falls below tonic baseline (negative prediction error). When the outcome exactly matches prediction, there is no net change. This temporal difference signal was first characterised by Wolfram Schultz in macaque experiments and is the biological implementation of reinforcement learning algorithms used in machine learning. It explains why the anticipation of reward, not just the reward itself, activates dopamine circuits, and why predictable rewards lose their motivational potency over time. Addictive drugs that produce supraphysiological dopamine release generate an unrealistically strong prediction-error signal that progressively biases behaviour toward drug-seeking."
    }
  },

  // ── Serotonin: ionotropic 5-HT3 + metabotropic 5-HT1A ─────────────────
  serotonin:{
    color:"#9b82c4", vesicleColor:"#9b82c4",
    receptorClass:"gpcr", effect:"mixed", effectLabel:"Mixed",
    effectBadgeHtml:`<span class="info-effect-badge effect-excitatory" style="font-size:0.62rem">↑ 5-HT3 excitatory</span><span class="info-effect-badge effect-inhibitory" style="font-size:0.62rem">↓ 5-HT1A inhibitory</span>`,
    postEffect:"5-HT3: fast EPSP · 5-HT1A: GIRK hyperpolarisation",
    receptor:"5-HT3 (iGluR) + 5-HT1A (GPCR)",
    cascade:"5-HT1A→Gi→↓cAMP→GIRK opens", cascadeEffect:"GIRK K⁺ channel opens → K⁺ efflux",
    ions:[
      {symbol:"K⁺", direction:"out", color:"#9b82c4", effect:"hyperpolarises"},
      {symbol:"Na⁺",direction:"in",  color:"#c49a50", effect:"5-HT3 only"}
    ],
    receptorGroups:[
      {
        class:"ionotropic", label:"5-HT3",
        receptor:"5-HT3 (Na⁺/K⁺ ligand-gated channel)",
        effect:"excitatory", potentialShape:"excitatory",
        ions:[
          {symbol:"Na⁺", direction:"in",  color:"#c49a50", effect:"fast EPSP"},
          {symbol:"K⁺",  direction:"out", color:"#9b82c4", effect:"repolarises"}
        ]
      },
      {
        class:"gpcr", label:"5-HT1A",
        receptor:"5-HT1A (Gi-coupled GPCR)",
        effect:"inhibitory",
        cascade:"5-HT1A→Gi→↓cAMP→GIRK opens",
        cascadeEffect:"GIRK K⁺ channel opens → K⁺ efflux",
        ions:[
          {symbol:"K⁺", direction:"out", color:"#9b82c4", effect:"hyperpolarises"}
        ]
      }
    ],
    mechanism:"Serotonin acts on two pharmacologically distinct receptor classes at this synapse. The 5-HT3 receptor is a pentameric ligand-gated ion channel permeable to Na⁺ and K⁺. Serotonin binding opens the channel within milliseconds, producing a fast excitatory postsynaptic potential. The 5-HT1A receptor is a Gi-coupled GPCR that, upon activation, suppresses adenylyl cyclase activity and opens inwardly rectifying potassium (GIRK) channels through direct Gβγ subunit interaction, causing K⁺ efflux and membrane hyperpolarisation over hundreds of milliseconds.",
    presynaptic:"An action potential depolarises the raphe terminal and calcium enters through voltage-gated channels, triggering serotonin vesicle fusion. On the soma and dendrites of raphe neurons, 5-HT1A autoreceptors tonically regulate firing rate: when extracellular serotonin accumulates, autoreceptor activation reduces raphe neuron excitability and limits further release. This negative feedback is clinically significant because newly initiated SSRI treatment increases extracellular serotonin but also activates these autoreceptors, partially blunting the net increase in serotonin output until desensitisation occurs over 2-4 weeks.",
    postsynaptic:"At 5-HT3 receptors, serotonin binding opens the Na⁺/K⁺ channel directly, generating a fast excitatory postsynaptic potential. At 5-HT1A receptors, the Gi protein dissociates and its Gβγ subunit opens GIRK channels, producing a slower, sustained hyperpolarisation. These opposing effects on excitability can coexist in the same neuron, with the balance determined by relative receptor expression and the pattern of serotonin release.",
    reuptake:"The serotonin transporter (SERT, SLC6A4) is the primary mechanism for serotonin clearance, returning serotonin into the presynaptic terminal by coupling its transport to Na⁺ and Cl⁻ co-entry. Intraterminal monoamine oxidase A (MAO-A) then converts excess serotonin to 5-hydroxyindoleacetic acid (5-HIAA). SERT is the molecular target of SSRIs (fluoxetine, sertraline, escitalopram) and SNRIs. Genetic variants in the SERT promoter region (5-HTTLPR) have been associated with amygdala reactivity and stress sensitivity, though the clinical significance of individual variants is modest and context-dependent.",
    potentialShape:"inhibitory",
    clinicalNote:"SSRIs block SERT competitively, increasing the synaptic half-life of serotonin. Therapeutic benefit in depression and anxiety disorders typically requires 2-4 weeks, reflecting the time needed for 5-HT1A autoreceptor desensitisation and downstream synaptic remodelling. Psilocybin produces its perceptual effects through agonism at 5-HT2A receptors in the cortex. Ondansetron and other 5-HT3 antagonists are used as antiemetics because the 5-HT3 receptor mediates chemotherapy-induced nausea via vagal afferents.",
    conceptNote:{
      title: "Serotonin as a modulator of emotional gain",
      body:  "The popular characterisation of serotonin as a happiness chemical misrepresents its function. More accurately, serotonin modulates the gain of the emotional system: the magnitude of neural responses to both positive and negative stimuli. Under conditions of adequate serotonergic tone, emotional responses are proportionate to the significance of the triggering event. When serotonergic transmission is reduced, the same stimuli produce exaggerated responses, particularly to threats. This is why low serotonin activity is consistently associated with heightened anxiety, increased amygdala reactivity, and vulnerability to depression. The therapeutic mechanism of SSRIs is therefore not the creation of happiness but the normalisation of threat sensitivity. The delay before clinical benefit emerges reflects the time required for adaptive changes: desensitisation of 5-HT1A autoreceptors on raphe neurons restores normal serotonin output, while downstream circuit changes in the amygdala and prefrontal cortex are required for sustained improvement."
    }
  },

  // ── Glutamate: ionotropic AMPA/NMDA + metabotropic mGluR ───────────────
  glutamate:{
    color:"#52a87a", vesicleColor:"#52a87a",
    receptorClass:"ionotropic", effect:"excitatory", effectLabel:"Excitatory",
    postEffect:"AMPA: fast EPSP · NMDA: LTP · mGluR: Ca²⁺ cascade",
    receptor:"AMPA / NMDA (iGluR) + mGluR (GPCR)",
    cascade:"mGluR1→Gq→PLCβ→IP3/DAG", cascadeEffect:"IP3→ER Ca²⁺ release + PKC",
    ions:[
      {symbol:"Na⁺", direction:"in",  color:"#c49a50", effect:"AMPA fast depol."},
      {symbol:"Ca²⁺",direction:"in",  color:"#b86060", effect:"NMDA plasticity"},
      {symbol:"K⁺",  direction:"out", color:"#9b82c4", effect:"repolarises"}
    ],
    receptorGroups:[
      {
        class:"ionotropic", label:"AMPA / NMDA",
        receptor:"AMPA / NMDA (iGluR)",
        effect:"excitatory", potentialShape:"excitatory",
        ions:[
          {symbol:"Na⁺", direction:"in",  color:"#c49a50", effect:"AMPA fast depol.", isAMPA: true},
          {symbol:"Ca²⁺",direction:"in",  color:"#b86060", effect:"NMDA → LTP",       isNMDA: true},
          {symbol:"K⁺",  direction:"out", color:"#9b82c4", effect:"repolarises"}
        ]
      },
      {
        class:"gpcr", label:"mGluR",
        receptor:"mGluR1/5 (Group I — Gq GPCR)",
        effect:"modulatory",
        cascade:"mGluR1→Gq→PLCβ→IP3/DAG",
        cascadeEffect:"IP3→ER Ca²⁺ release + PKC activation",
        ions:[
          {symbol:"Ca²⁺",direction:"in", color:"#b86060", effect:"intracellular release"}
        ]
      }
    ],
    mechanism:"Glutamate acts on three receptor classes at cortical and hippocampal synapses. AMPA receptors are tetrameric Na⁺/K⁺ channels that open within 1-2 ms of glutamate binding, generating a fast EPSP. NMDA receptors are Ca²⁺-permeable channels with a unique dual requirement for activation: ligand binding (glutamate plus the co-agonist glycine or D-serine) and simultaneous postsynaptic depolarisation to relieve a voltage-dependent Mg²⁺ block of the channel pore. This coincidence-detection property makes NMDA receptors the molecular substrate of Hebbian synaptic plasticity. Group I metabotropic glutamate receptors (mGluR1 and mGluR5) couple to Gq, activating phospholipase C to produce IP3 and DAG, mobilising intracellular calcium and activating PKC.",
    presynaptic:"High-frequency bursts of action potentials produce large calcium transients in the presynaptic terminal, triggering fusion of the readily releasable pool of glutamate vesicles. At high release rates, vesicle depletion causes short-term synaptic depression. Presynaptic mGluR2/3 (Group II) and mGluR4/6/7/8 (Group III) act as autoreceptors, coupling to Gi to reduce Ca²⁺ channel opening and vesicle release probability when glutamate accumulates in the cleft, providing negative feedback.",
    postsynaptic:"AMPA receptor activation produces a fast inward Na⁺ current that depolarises the postsynaptic membrane within milliseconds. If this depolarisation is sufficient to relieve the Mg²⁺ block from NMDA channels (typically requiring sustained or coincident presynaptic activity), Ca²⁺ enters the NMDA receptor. Calcium activates CaMKII, which phosphorylates and recruits additional AMPA receptors to the synapse, increasing synaptic strength. This sequence constitutes long-term potentiation (LTP). mGluR1/5 activation releases IP3-sensitive calcium from endoplasmic reticulum stores and activates PKC, modulating synaptic transmission over longer timescales.",
    reuptake:"Glutamate clearance relies on high-affinity excitatory amino acid transporters (EAATs). GLT-1 (EAAT2) on astrocytes is responsible for the majority of synaptic glutamate uptake and is essential for preventing excitotoxicity. GLAST (EAAT1) also contributes, particularly in the cerebellum. Within astrocytes, glutamate is converted to glutamine by glutamine synthetase; glutamine is then transported back to neurons and reconverted to glutamate by phosphate-activated glutaminase, completing the glutamate-glutamine cycle.",
    potentialShape:"excitatory",
    clinicalNote:"Ketamine, memantine, and phencyclidine are NMDA receptor open-channel blockers with different affinities and clinical profiles. Ketamine at sub-anaesthetic doses produces rapid antidepressant effects in treatment-resistant depression, thought to involve disinhibition of pyramidal neurons and mTORC1-dependent synaptic protein synthesis. Memantine's lower affinity and voltage-dependent block make it better tolerated and useful in moderate-to-severe Alzheimer's disease. NMDA receptor hypofunction, modelled by sub-anaesthetic ketamine, reproduces aspects of schizophrenia's positive, negative, and cognitive symptoms in healthy volunteers.",
    conceptNote:{
      title: "The NMDA receptor as a coincidence detector",
      body:  "The NMDA receptor is the molecular implementation of a rule proposed by Donald Hebb in 1949: that synapses are strengthened when the pre- and postsynaptic neurons are active simultaneously. The NMDA receptor achieves this computationally because it requires both glutamate binding (reporting presynaptic activity) and postsynaptic depolarisation sufficient to displace the Mg²⁺ ion blocking its pore. Postsynaptic depolarisation is typically provided by AMPA receptor activation from the same or neighbouring synapses. When both conditions are met simultaneously, Ca²⁺ enters the NMDA receptor and activates the kinase cascade that strengthens the synapse. This makes the NMDA receptor a molecular AND-gate that only opens when pre- and postsynaptic neurons are co-active. The resulting Ca²⁺-dependent potentiation is long-term potentiation (LTP), the leading cellular model of memory formation. Its discovery by Bliss and Lomo in 1973 and the subsequent elucidation of its NMDA dependence by Collingridge and colleagues transformed our understanding of how experience modifies neural circuits."
    }
  },

  // ── GABA: ionotropic GABA-A + metabotropic GABA-B ──────────────────────
  gaba:{
    color:"#b86060", vesicleColor:"#b86060",
    receptorClass:"ionotropic", effect:"inhibitory", effectLabel:"Inhibitory",
    postEffect:"GABA-A: fast Cl⁻ IPSP · GABA-B: slow K⁺ IPSP",
    receptor:"GABA-A (Cl⁻ channel) + GABA-B (GPCR)",
    cascade:"GABA-B→Gi→↓cAMP→GIRK", cascadeEffect:"GIRK K⁺ channel opens → slow IPSP",
    ions:[
      {symbol:"Cl⁻",direction:"in",  color:"#52a87a", effect:"hyperpolarises"},
      {symbol:"K⁺", direction:"out", color:"#9b82c4", effect:"GABA-B"}
    ],
    receptorGroups:[
      {
        class:"ionotropic", label:"GABA-A",
        receptor:"GABA-A (pentameric Cl⁻ channel)",
        effect:"inhibitory", potentialShape:"inhibitory",
        ions:[
          {symbol:"Cl⁻",direction:"in",  color:"#52a87a", effect:"fast IPSP"}
        ]
      },
      {
        class:"gpcr", label:"GABA-B",
        receptor:"GABA-B (Gi-coupled GPCR)",
        effect:"inhibitory",
        cascade:"GABA-B→Gi→↓cAMP→GIRK opens",
        cascadeEffect:"GIRK K⁺ channel → slow prolonged IPSP",
        ions:[
          {symbol:"K⁺", direction:"out", color:"#9b82c4", effect:"slow IPSP"}
        ]
      }
    ],
    mechanism:"GABA-A receptors are pentameric ligand-gated chloride channels assembled from combinations of α, β, γ, δ, ε, and other subunits. GABA binding to sites at the α-β subunit interfaces opens the central chloride-selective pore within 1-2 ms. Chloride influx (or, in depolarised cells, efflux) shifts the membrane potential toward the chloride equilibrium potential, typically producing hyperpolarisation and a reduction in excitability. GABA-B receptors are obligate heterodimers of GABA-B1 and GABA-B2 subunits that couple to Gi/Go proteins. Gi activation reduces adenylyl cyclase activity and, through Gβγ subunit release, opens GIRK channels and reduces voltage-gated calcium channel activity, producing a slower, more prolonged inhibitory postsynaptic potential.",
    presynaptic:"Action potential invasion of the GABAergic terminal triggers Ca²⁺ entry through VGCCs, driving vesicle fusion and GABA release. Presynaptic GABA-B autoreceptors on the terminal detect accumulated extracellular GABA and reduce further Ca²⁺ entry through Gβγ-mediated voltage-gated calcium channel inhibition, limiting release at high frequencies. This autoreceptor feedback is exploited clinically: baclofen, a GABA-B agonist, reduces spasticity and, in high doses, reduces alcohol craving through presynaptic inhibition at multiple synapses.",
    postsynaptic:"GABA-A receptor activation produces a fast IPSP that peaks within 10-20 ms and decays within 50-100 ms. GABA-B receptor activation produces a slow IPSP with an onset of 50-100 ms and a duration of several hundred milliseconds, mediated by GIRK channel opening. The slow, prolonged GABA-B IPSP is particularly important in shaping repetitive firing patterns and burst termination in thalamic and hippocampal circuits. Benzodiazepines bind allosterically to the α-γ subunit interface of GABA-A receptors and increase the frequency of channel opening without activating the receptor in the absence of GABA.",
    reuptake:"GABA is cleared from the synapse by the GABA transporter family (GAT-1, GAT-2, GAT-3), Na⁺-coupled secondary active transporters expressed on presynaptic terminals and astrocytes. Astrocytic uptake is followed by conversion of GABA to succinate semialdehyde by GABA transaminase (GABA-T), entering the tricarboxylic acid cycle. Astrocytes also convert GABA to glutamine via glutamine synthetase, which is transported to GABAergic neurons and reconverted to GABA. Vigabatrin, an irreversible GABA-T inhibitor, raises synaptic GABA by blocking this catabolic pathway and is used as an anticonvulsant.",
    potentialShape:"inhibitory",
    clinicalNote:"Benzodiazepines are positive allosteric modulators of GABA-A that increase chloride channel opening frequency in response to GABA. Tolerance develops through homeostatic receptor downregulation, and abrupt withdrawal can precipitate life-threatening seizures. Baclofen, a GABA-B agonist, is used for spasticity and is under investigation for alcohol use disorder. General anaesthetics including propofol and etomidate act primarily by enhancing GABA-A function, contributing to anaesthetic immobility and unconsciousness.",
    conceptNote:{
      title: "Excitation-inhibition balance in neural computation",
      body:  "GABAergic inhibition is not simply the antagonist of excitation but an active participant in neural computation. The ratio of excitatory to inhibitory (E/I) drive to a network determines its operating regime: moderate inhibition sharpens neuronal selectivity, generates oscillations, and coordinates timing across cell populations, while deficient inhibition produces uncontrolled excitation and seizures. GABAergic interneuron subtypes have distinct computational roles. Parvalbumin-positive basket and chandelier cells provide perisomatic inhibition with fast kinetics, generating gamma oscillations (30-80 Hz) that bind together the activity of pyramidal neurons encoding the same object or concept. Somatostatin-positive dendrite-targeting interneurons gate long-range synaptic inputs arriving at apical dendrites. The selective loss of parvalbumin interneurons in post-mortem schizophrenia tissue, and the replication of this finding in animal models of early-life adversity and genetic risk, suggests that GABAergic interneuron dysfunction is a core pathophysiological mechanism in psychotic disorders, not merely a secondary consequence."
    }
  },

  noradrenaline:{
    color:"#6080b4", vesicleColor:"#6080b4",
    receptorClass:"gpcr", effect:"excitatory", effectLabel:"Excitatory",
    postEffect:"Depolarisation (α1/β) or hyperpol. (α2)", receptor:"α1, α2, β1/β2 GPCRs",
    cascade:"α1→Gq→PLCβ→IP3/DAG", cascadeEffect:"IP3→Ca²⁺ release + PKC activation",
    ions:[
      {symbol:"Na⁺", direction:"in",  color:"#c49a50", effect:"α1 depolarises"},
      {symbol:"K⁺",  direction:"out", color:"#9b82c4", effect:"α2 hyperpol."},
      {symbol:"Ca²⁺",direction:"in",  color:"#b86060", effect:"β-PKA cascade"}
    ],
    mechanism:"Noradrenaline acts on three receptor families with opposing effects. Alpha-1 receptors couple to Gq, activating phospholipase C to produce IP3 and DAG; IP3 mobilises calcium from endoplasmic reticulum stores while DAG activates PKC, producing excitation. Alpha-2 receptors couple to Gi, reducing cAMP and opening GIRK channels through Gβγ subunit release, producing inhibition. When located on presynaptic terminals, alpha-2 autoreceptors reduce noradrenaline release through Ca²⁺ channel inhibition. Beta-1 and beta-2 receptors couple to Gs, raising cAMP and activating PKA, modulating ion channel phosphorylation and neuronal excitability.",
    presynaptic:"An action potential in the locus coeruleus terminal depolarises the membrane and opens VGCCs, triggering noradrenaline release from large dense-core vesicles and small synaptic vesicles. Alpha-2A autoreceptors on the terminal and on the LC soma and dendrites detect released noradrenaline and, via Gi-mediated GIRK channel opening, hyperpolarise the cell and reduce further release. This autoreceptor system is the molecular target of alpha-2 agonists (clonidine, guanfacine) used clinically to reduce noradrenergic tone.",
    postsynaptic:"At alpha-1 receptors, noradrenaline activates Gq-PLCβ signalling to mobilise intracellular calcium and activate PKC, generally increasing neuronal excitability. In the PFC, moderate alpha-2A stimulation via Gi strengthens pyramidal neuron persistent firing through a mechanism involving reduced cAMP-dependent inhibition of HCN channels. At beta receptors, cAMP-PKA signalling phosphorylates multiple targets including AMPA receptors and calcium channels, modulating synaptic strength. The PFC effect is bimodal: low noradrenaline preferentially engages alpha-2A to enhance signal processing, while high concentrations recruit alpha-1 receptors that degrade prefrontal function.",
    reuptake:"Noradrenaline is cleared primarily by the noradrenaline transporter (NET, SLC6A2), a Na⁺/Cl⁻-dependent co-transporter that also has high affinity for dopamine in brain regions with low DAT expression, such as the PFC. Within the terminal, MAO-A converts noradrenaline to DHPG. Extracellularly, COMT methylates noradrenaline to normetanephrine. SNRIs (venlafaxine, duloxetine, desvenlafaxine) and tricyclic antidepressants block NET; atomoxetine is a selective NET inhibitor used for ADHD.",
    potentialShape:"plateau",
    clinicalNote:"SNRIs and tricyclic antidepressants raise synaptic noradrenaline and serotonin by blocking their respective transporters. Guanfacine and clonidine, alpha-2A agonists, improve prefrontal attention and reduce hyperarousal in ADHD and PTSD by restoring optimal alpha-2A stimulation in the PFC and reducing LC firing. Propranolol, a non-selective beta-blocker, is widely used for performance anxiety and has been investigated as a means of attenuating fear memory consolidation shortly after traumatic events, though evidence for the latter indication remains inconclusive.",
    conceptNote:{
      title: "The inverted-U dose-response and the neurobiology of stress",
      body:  "The relationship between noradrenaline concentration and prefrontal cognitive function follows an inverted-U shape, a principle with direct implications for understanding both ADHD and stress-related disorders. At low noradrenaline levels, as in the inattentive, under-aroused state, alpha-2A receptor stimulation in the PFC is insufficient to suppress the cAMP-HCN channel activity that disrupts persistent pyramidal neuron firing. Working memory is impaired because PFC neurons cannot sustain representations through the delay period. At moderate levels, optimal alpha-2A stimulation strengthens persistent firing, improving working memory and top-down attentional control. At high levels, as in acute stress or PTSD, noradrenaline recruits alpha-1 receptors that activate Gq and disrupt the same persistent firing through PKC-mediated channel phosphorylation. The brain shifts from prefrontally-guided goal-directed behaviour toward faster, more reflexive stimulus-driven responses. This architecture explains why moderate arousal enhances performance while severe stress causes cognitive disorganisation, and why alpha-2A agonists reduce hyperarousal in PTSD without the sedation of alpha-1 antagonists."
    }
  },

  acetylcholine:{
    color:"#c0884a", vesicleColor:"#c0884a",
    receptorClass:"ionotropic", effect:"excitatory", effectLabel:"Excitatory",
    postEffect:"nAChR: fast EPSP · mAChR: Ca²⁺ cascade or K⁺ IPSP",
    receptor:"nAChR (ionotropic) + mAChR (GPCR)",
    cascade:"M1→Gq→PLCβ→IP3/DAG", cascadeEffect:"IP3→Ca²⁺ release + DAG→PKC",
    ions:[
      {symbol:"Na⁺", direction:"in",  color:"#c49a50", effect:"fast depol."},
      {symbol:"Ca²⁺",direction:"in",  color:"#b86060", effect:"α7 nAChR"},
      {symbol:"K⁺",  direction:"out", color:"#9b82c4", effect:"mAChR M2"}
    ],
    receptorGroups:[
      {
        class:"ionotropic", label:"nAChR",
        receptor:"nAChR (pentameric Na⁺/Ca²⁺/K⁺ channel)",
        effect:"excitatory", potentialShape:"excitatory",
        ions:[
          {symbol:"Na⁺", direction:"in",  color:"#c49a50", effect:"fast depol."},
          {symbol:"Ca²⁺",direction:"in",  color:"#b86060", effect:"α7 nAChR"}
        ]
      },
      {
        class:"gpcr", label:"mAChR",
        receptor:"mAChR M1 (Gq) / M2 (Gi)",
        effect:"modulatory",
        cascade:"M1→Gq→PLCβ→IP3/DAG",
        cascadeEffect:"IP3→Ca²⁺ release + DAG→PKC activation",
        ions:[
          {symbol:"K⁺", direction:"out", color:"#9b82c4", effect:"M2 Gi→GIRK"}
        ]
      }
    ],
    mechanism:"Nicotinic acetylcholine receptors are pentameric ligand-gated cation channels permeable to Na⁺, K⁺, and, in the case of α7-containing receptors, substantially to Ca²⁺. Two molecules of acetylcholine bind to the receptor's extracellular domain, producing channel opening within milliseconds and a fast excitatory postsynaptic potential. Muscarinic receptors are GPCRs with five subtypes. M1, M3, and M5 couple to Gq, activating phospholipase C and raising intracellular calcium. M2 and M4 couple to Gi, reducing cAMP, activating GIRK channels, and inhibiting voltage-gated calcium channels. M2 receptors are the primary cardiac muscarinic receptor, mediating vagal slowing of heart rate.",
    presynaptic:"Acetylcholine is synthesised in the presynaptic terminal from choline and acetyl-CoA by choline acetyltransferase (ChAT), packaged into synaptic vesicles by the vesicular acetylcholine transporter (VAChT), and released by calcium-triggered exocytosis following action potential invasion. Unlike monoamine terminals, ACh terminals do not express reuptake transporters; clearance is enzymatic. High-affinity choline transporters (CHT1) recover the choline produced by acetylcholinesterase cleavage for resynthesis. Release probability at individual terminals is high, making ACh synapses reliable transmitters at the neuromuscular junction.",
    postsynaptic:"At nicotinic receptors, ACh binding produces rapid channel opening and membrane depolarisation within 1-2 ms. At M1 receptors in the cortex and hippocampus, Gq-PLCβ activation raises IP3 and DAG, mobilising intracellular Ca²⁺ and activating PKC. In the hippocampus, M1 receptor activation suppresses the M-current (KCNQ channels), reducing the afterhyperpolarisation and increasing pyramidal neuron excitability. At M2 receptors on cardiac muscle and presynaptic terminals, Gi-GIRK activation reduces heart rate and limits neurotransmitter release.",
    reuptake:"Acetylcholine is inactivated at the synapse by acetylcholinesterase (AChE), a serine hydrolase with one of the highest catalytic turnover rates of any enzyme, capable of hydrolyzing approximately 25,000 ACh molecules per second per active site. Hydrolysis yields choline and acetate; choline is recovered by CHT1 on the presynaptic terminal. This enzymatic rather than transporter-based clearance mechanism means that acetylcholinesterase inhibitors are effective at prolonging ACh action, which is the basis of treatment for both myasthenia gravis (pyridostigmine) and Alzheimer's disease (donepezil, rivastigmine, galantamine).",
    potentialShape:"excitatory",
    clinicalNote:"Acetylcholinesterase inhibitors increase synaptic ACh by slowing its enzymatic breakdown and provide modest symptomatic benefit in Alzheimer's disease and Lewy body dementia. Botulinum toxin cleaves SNARE proteins required for vesicle fusion, blocking ACh release at neuromuscular junctions and producing localised muscle paralysis used therapeutically for dystonia, spasticity, and cosmetically. Atropine, a non-selective muscarinic antagonist, reverses organophosphate poisoning (which causes AChE inhibition) and is used as a mydriatic. Succinylcholine, a nicotinic agonist that produces prolonged depolarisation block, is a neuromuscular blocking agent used in anaesthesia.",
    conceptNote:{
      title: "Acetylcholine as a cortical signal-to-noise amplifier",
      body:  "The basal forebrain cholinergic projection to the cortex does not simply activate cortical neurons but selectively modulates the ratio of stimulus-evoked to spontaneous activity. In its absence, cortical neurons continue to fire but no longer distinguish relevant from irrelevant inputs effectively. Acetylcholine achieves this through two complementary mechanisms: at muscarinic M1 receptors, it reduces the slow afterhyperpolarisation that follows bursts of activity (by suppressing KCNQ channels), allowing sustained responses to ongoing stimuli; simultaneously, it reduces lateral excitatory transmission between pyramidal neurons via presynaptic muscarinic inhibition, reducing the spread of activity from spontaneously active cells and thereby lowering background noise. The net result is a sharper cortical representation in which neurons respond strongly to their preferred inputs and weakly to everything else. This is why acetylcholine is necessary for selective attention. In the hippocampus, the medial septal cholinergic input generates the theta rhythm (4-10 Hz) that times the windows of LTP induction, effectively determining which synapses are eligible for strengthening during any given cycle of hippocampal activity."
    }
  }
};

// ============================================================
// Layout — fixed logical 900×420 coordinate space
// ============================================================
const LW = 900, LH = 420, MID_Y = 210;
const AXON_END = 70;
const BOUTON_CX = 178;
const BOUTON_RX = 96;
const BOUTON_RY = 124;
const PRE_MEM = BOUTON_CX + BOUTON_RX; // 274
const POST_MEM = 434;
const CLEFT_HH = 134;
const POST_CX = 660;
const POST_RX = 115;
const POST_RY = 155;

// Glossary and tooltip wiring delegated to glossary.js (window.NEURO_GLOSSARY)
// glossifyText and attachGlossaryTooltips are defined there.

// ============================================================
// Event Log — records timestamped events during firing
// ============================================================
let eventLog = [];
let eventLogStartFrame = 0;
const eventLogSeen = new Set();

function logEvent(label, detail){
  if(eventLogSeen.has(label)) return;
  eventLogSeen.add(label);
  const ms = Math.round(((frameCount - eventLogStartFrame) / 60) * 1000);
  eventLog.push({ ms, label, detail });
  renderEventLog();
}

function renderEventLog(){
  const container = document.getElementById("event-log-list");
  if(!container) return;
  container.innerHTML = eventLog.map(e => `
    <div class="event-log-row">
      <span class="event-log-time">${e.ms} ms</span>
      <span class="event-log-label">${e.label}</span>
      ${e.detail ? `<span class="event-log-detail">${e.detail}</span>` : ""}
    </div>
  `).join("");
  container.scrollTop = container.scrollHeight;
}

// ============================================================
// State
// ============================================================
let synapseCanvas, synapseCtx, potCanvas, potCtx;
let currentNT = "dopamine", animId = null, frameCount = 0;
let canvasScale = 1;
let isFiring = false, fireProgress = 0, apProgress = 0;
let caParticles = [], ntParticles = [], ionParticles = [], receptors = [];
let mpValue = -70, potHistory = new Array(200).fill(-70);
let mpExpanded = false;

// ============================================================
// Init
// ============================================================
function synapsePanelSkeleton() {
  return `
    <div style="padding:var(--sp-3)">
      <div class="sk-block sk-block--title"></div>
      <div class="sk-block sk-block--sub"></div>
      <div class="sk-divider"></div>
      <div class="sk-block sk-block--label"></div>
      <div class="sk-block sk-block--body"></div>
      <div class="sk-block sk-block--body sk-block--short"></div>
      <div class="sk-divider"></div>
      <div class="sk-block sk-block--label"></div>
      <div class="sk-chips">
        <div class="sk-chip"></div><div class="sk-chip"></div><div class="sk-chip"></div>
      </div>
    </div>
  `;
}

function initSynapsePage(){
  synapseCanvas = document.getElementById("synapse-canvas");
  potCanvas     = document.getElementById("potential-canvas");
  if(!synapseCanvas || !potCanvas) return;
  synapseCtx = synapseCanvas.getContext("2d");
  potCtx     = potCanvas.getContext("2d");

  // Show skeleton in info panel while canvas sizes and first frame renders
  const panel = document.getElementById("synapse-info-panel");
  if(panel) panel.innerHTML = synapsePanelSkeleton();

  // Disable fire button until canvas is ready
  const fireBtn = document.getElementById("fire-btn");
  if(fireBtn){ fireBtn.disabled = true; fireBtn.classList.add("is-loading"); }

  resizeSynapseCanvas();
  window.addEventListener("resize", resizeSynapseCanvas);
  document.getElementById("fire-btn").addEventListener("click", triggerFire);
  const expBtn = document.getElementById("mp-expand-btn");
  if(expBtn) expBtn.addEventListener("click", () => {
    mpExpanded = !mpExpanded;
    expBtn.textContent = mpExpanded ? "Collapse" : "Expand";
    document.querySelector(".mp-wrap").classList.toggle("expanded", mpExpanded);
    setTimeout(resizeSynapseCanvas, 0);
  });
  document.querySelectorAll(".synapse-nt-switcher .nt-pill").forEach(p =>
    p.addEventListener("click", () => {
      if(p.dataset.type === currentNT) return;
      currentNT = p.dataset.type;
      setSynapseActivePill(currentNT);
      resetAnim(); renderSynapseInfo();
    })
  );

  // Wait one frame for canvas layout then render — replace skeleton with real content
  requestAnimationFrame(() => {
    renderSynapseInfo();
    setSynapseActivePill(currentNT);
    resetAnim();
    if(fireBtn){ fireBtn.disabled = false; fireBtn.classList.remove("is-loading"); }
    if(animId) cancelAnimationFrame(animId);
    animLoop();
    // Inject Key Concepts button into synapse header
    window.injectReferenceButtons && window.injectReferenceButtons("synapse");
  });
}

function resizeSynapseCanvas(){
  const wrap = document.querySelector(".synapse-canvas-wrap");
  if(!wrap || !synapseCanvas) return;
  const dpr   = window.devicePixelRatio || 1;
  const potH  = mpExpanded ? 170 : 76;
  const rsv   = potH + 52 + 16;
  const avW   = wrap.clientWidth - 8;
  const avH   = Math.max(wrap.clientHeight - rsv, 160);
  canvasScale = Math.max(0.22, Math.min(avW / LW, avH / LH, 1.6));
  const dW = Math.floor(LW * canvasScale);
  const dH = Math.floor(LH * canvasScale);
  synapseCanvas.width  = dW * dpr;
  synapseCanvas.height = dH * dpr;
  synapseCanvas.style.width  = dW + "px";
  synapseCanvas.style.height = dH + "px";
  synapseCtx.setTransform(dpr * canvasScale, 0, 0, dpr * canvasScale, 0, 0);
  const pW = Math.floor(wrap.clientWidth - 8);
  potCanvas.width  = pW * dpr;
  potCanvas.height = potH * dpr;
  potCanvas.style.width  = pW + "px";
  potCanvas.style.height = potH + "px";
  potCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// ============================================================
// Reset
// ============================================================
function resetAnim(){
  isFiring=false; fireProgress=0; apProgress=0;
  caParticles=[]; ntParticles=[]; ionParticles=[];
  mpValue=-70; potHistory=new Array(200).fill(-70);
  buildReceptors();
}

function buildReceptors(){
  const nt = synapseData[currentNT];
  receptors = [];

  const MIN_SPACING   = 58;  // min px between ionotropic channel centres
  const GROUP_PADDING = 80;  // min px between bottom of one group and top of next

  if (nt.receptorGroups) {
    const numGroups = nt.receptorGroups.length;

    // Work out how tall each group needs to be
    const groupHeights = nt.receptorGroups.map(g =>
      g.ions.length <= 1 ? 0 : (g.ions.length - 1) * MIN_SPACING
    );
    const totalNeeded = groupHeights.reduce((a,b)=>a+b,0)
                      + (numGroups - 1) * GROUP_PADDING;
    const totalAvail  = CLEFT_HH * 1.8;
    const scale       = Math.min(1, totalAvail / Math.max(totalNeeded, 1));

    // Stagger group centres so they don't bleed into each other
    let cursor = MID_Y - (totalNeeded * scale) / 2;
    nt.receptorGroups.forEach((group, gi) => {
      const groupH  = groupHeights[gi] * scale;
      const centerY = cursor + groupH / 2;
      cursor += groupH + GROUP_PADDING * scale;

      const n = group.ions.length;
      const span = n <= 1 ? 0 : (n - 1) * MIN_SPACING * scale;

      group.ions.forEach((ion, i) => {
        receptors.push({
          y: centerY + (n === 1 ? 0 : -span/2 + (span/(n-1)) * i),
          open: 0, bindFlash: 0, activated: 0,
          cascadePhase: "closed", cascadeHoldTimer: 0, cascadeStepT: 0,
          ion,
          groupClass: group.class,
          groupIdx: gi,
          group
        });
      });
    });
  } else {
    // Single receptor type — spread across full cleft height
    const n    = nt.ions.length;
    const span = n <= 1 ? 0 : Math.max((n-1) * MIN_SPACING, CLEFT_HH * 1.2);
    receptors  = nt.ions.map((ion, i) => ({
      y: MID_Y + (n === 1 ? 0 : -span/2 + (span/(n-1)) * i),
      open: 0, bindFlash: 0, activated: 0,
      cascadePhase: "closed", cascadeHoldTimer: 0, cascadeStepT: 0,
      ion,
      groupClass: nt.receptorClass,
      groupIdx: 0,
      group: {
        class: nt.receptorClass,
        cascade: nt.cascade,
        cascadeEffect: nt.cascadeEffect,
        effect: nt.effect
      }
    }));
  }
}

// ============================================================
// Fire
// ============================================================
function triggerFire(){
  if(isFiring) return;
  isFiring=true; fireProgress=0; apProgress=0;
  caParticles=[]; ntParticles=[]; ionParticles=[];
  eventLog = [];
  eventLogSeen.clear();
  eventLogStartFrame = frameCount;
  receptors.forEach(r=>{
    r.open=0; r.bindFlash=0; r.activated=0;
    r.cascadePhase="closed"; r.cascadeHoldTimer=0; r.cascadeStepT=0;
  });
  logEvent("Action potential initiated", "Voltage-gated Na⁺ channels open in a self-amplifying cascade — membrane spikes from −55 mV to +40 mV in under 1 ms");
}

function updateFireBtn(){} // no-op
// ============================================================
function animLoop(){
  animId = requestAnimationFrame(animLoop);
  frameCount++;
  const dpr = window.devicePixelRatio || 1;
  synapseCtx.setTransform(dpr*canvasScale,0,0,dpr*canvasScale,0,0);
  synapseCtx.clearRect(0,0,LW,LH);
  update();
  drawAll(synapseCtx);
  potCtx.setTransform(dpr,0,0,dpr,0,0);
  potCtx.clearRect(0,0,potCanvas.clientWidth, mpExpanded?170:76);
  drawMP(potCtx, potCanvas.clientWidth, mpExpanded?170:76);
}

// ============================================================
// Update
// ============================================================
function update(){
  if(isFiring){
    fireProgress = Math.min(fireProgress+0.0022, 1.0);
    apProgress   = Math.min(apProgress + (fireProgress < 0.35 ? 0.012 : 0.001), 1.0);

    if(apProgress >= 0.85 && caParticles.length < 8){
      spawnCa();
      if(caParticles.length === 1) logEvent("Ca²⁺ influx", "Voltage-gated Ca²⁺ channels (VGCCs) open at the axon terminal — Ca²⁺ is the critical trigger that couples electrical activity to vesicle release");
    }
    if(fireProgress >= 0.35 && ntParticles.length === 0){
      spawnNT();
      logEvent("Vesicle fusion", "Ca²⁺ binds synaptotagmin → SNARE proteins pull vesicle membrane to terminal membrane → neurotransmitter released by exocytosis");
    }

    updateCa();
    updateNT();
    updateReceptors();
    updateIonFlow();
    updateMP_val();

    if(fireProgress >= 1.0) isFiring = false;

  } else {
    updateCa();
    updateNT();
    updateReceptors();
    updateIonFlow();
    mpValue += (-70 - mpValue) * 0.012;
  }

  potHistory.push(mpValue);
  if(potHistory.length>200) potHistory.shift();
}

function spawnCa(){
  if(Math.random()>0.35) return;
  caParticles.push({
    x: PRE_MEM - 6 + (Math.random()-0.5)*8,
    y: MID_Y + (Math.random()-0.5)*CLEFT_HH*1.2,
    vx: -(1.4 + Math.random()*0.8),
    vy: (Math.random()-0.5)*0.6,
    alpha:0.9, life:1.0
  });
}

function updateCa(){
  caParticles.forEach(p=>{
    p.x += p.vx; p.y += p.vy;
    p.life -= 0.012;
    p.alpha = Math.max(0, p.life);
  });
  caParticles = caParticles.filter(p=>p.alpha>0.01);
}

function spawnNT(){
  const nt = synapseData[currentNT];
  // Ensure every receptor gets at least 3 targeted particles
  const minPerReceptor = 3;
  const totalParticles = Math.max(18, receptors.length * minPerReceptor);

  for(let i=0; i<totalParticles; i++){
    const ri  = i % receptors.length;
    const rec = receptors[ri];
    ntParticles.push({
      x: PRE_MEM + 4 + Math.random()*6,
      y: MID_Y + (Math.random()-0.5)*CLEFT_HH*1.3,
      targetX: POST_MEM - 24,
      targetY: rec.y,
      recIdx: ri,
      r: 4.2, alpha: 1.0, color: nt.vesicleColor,
      prog: -(Math.random()*0.22),   // tighter stagger so all bind sooner
      phase: "drift",
      driftX: (Math.random()-0.5)*1.2,
      driftY: (Math.random()-0.5)*0.8,
      driftT: 0, boundFrames: 0
    });
  }
}

function updateNT(){
  const cL = PRE_MEM+2, cR = POST_MEM-10;
  ntParticles.forEach(p=>{
    if(p.phase==="bound"){
      const rec    = receptors[p.recIdx];
      const isGPCR = rec && rec.groupClass === "gpcr";
      let fadeRate;
      if(!isGPCR){
        // Ionotropic: fade normally
        fadeRate = isFiring ? 0.0008 : 0.007;
      } else {
        // GPCR: stay bound during activation and hold, fade once decaying
        const phase = rec ? rec.cascadePhase : "closed";
        if(phase === "hold"){
          fadeRate = 0.0003;       // barely move during hold
        } else if(phase === "decay"){
          fadeRate = 0.004;        // fade with the cascade
        } else if(phase === "closed"){
          fadeRate = 0.015;        // cascade finished — clear quickly
        } else {
          fadeRate = isFiring ? 0.0004 : 0.0008;  // still activating
        }
      }
      p.alpha = Math.max(0, p.alpha - fadeRate);
      return;
    }
    p.prog += 0.007;
    if(p.prog<0) return;
    if(p.phase==="drift"){
      p.driftT++;
      if(p.driftT%22===0){p.driftX=(Math.random()-0.5)*1.3;p.driftY=(Math.random()-0.5)*0.8;}
      p.x += p.driftX+0.32; p.y += p.driftY;
      p.x = Math.max(cL,Math.min(cR+8,p.x));
      p.y = Math.max(MID_Y-CLEFT_HH+4,Math.min(MID_Y+CLEFT_HH-4,p.y));
      if(p.prog>0.38 && p.x>PRE_MEM+60) p.phase="approach";
    } else if(p.phase==="approach"){
      const dx=p.targetX-p.x, dy=p.targetY-p.y;
      p.x+=dx*0.07; p.y+=dy*0.07;
      if(Math.hypot(dx,dy)<5){
        p.x=p.targetX; p.y=p.targetY; p.phase="bound";
        const rec=receptors[p.recIdx];
        rec.bindFlash=1.0;
        if(rec.open<0.05) rec.open=0.02;
        if(rec.open < 0.03){
          const rtype = rec.groupClass === "gpcr" ? "GPCR (slow cascade, 100s ms)" : "ionotropic channel (opens within ms)";
          logEvent("Receptor binding", `NT binds ${rtype} — ligand-receptor complementarity opens the signalling pathway`);
        }
      }
    }
  });
  ntParticles = ntParticles.filter(p=>p.alpha>0.01);
}

// ============================================================
// Receptor update
// Ionotropic: tied to isFiring (fast open, fast close).
// GPCR: fully decoupled from isFiring once NT has bound.
//   Once open > 0, the receptor runs its own lifecycle:
//   opening → hold (GPCR_HOLD_FRAMES) → decay → closed
//   regardless of whether isFiring is still true or not.
// ============================================================
const GPCR_HOLD_FRAMES = 320;   // ~5.3s at 60fps
const GPCR_STEP_SPEED  = 0.015; // step reveal rate (0→1)

function updateReceptors(){
  receptors.forEach(r=>{
    if(r.bindFlash > 0) r.bindFlash -= 0.03;

    if(r.groupClass === "ionotropic"){
      if(isFiring){
        if(r.open > 0.01 && r.open < 1.0) r.open = Math.min(r.open + 0.025, 1.0);
        if(r.open > 0.3){
          r.activated = Math.min(r.activated + 0.02, 1.0);
          if(r.activated > 0.3 && r.activated - 0.02 <= 0.3){
            logEvent("Ion channel opens", `${r.ion.symbol} ${r.ion.direction === "in" ? "influx" : "efflux"} begins — ions flow down their electrochemical gradient through the open pore`);
          }
        }
        if(r.activated > 0.7 && r.activated - 0.02 <= 0.7){
          logEvent("Postsynaptic potential", synapseData[currentNT].effect === "inhibitory"
            ? "IPSP — Cl⁻ influx or K⁺ efflux makes the interior more negative, pushing voltage away from firing threshold"
            : "EPSP — cation influx depolarises the membrane toward threshold (−55 mV); sufficient summation triggers a new action potential");
        }
      } else {
        if(r.open > 0)      r.open      = Math.max(0, r.open      - 0.008);
        if(r.activated > 0) r.activated = Math.max(0, r.activated - 0.006);
      }

    } else {
      // ── GPCR / Metabotropic ────────────────────────────────────────────
      // Phase machine runs independently once the receptor has been bound
      const wasNeverBound = r.open === 0 && r.activated === 0
                         && r.cascadePhase === "closed"
                         && !isFiring;

      if(wasNeverBound){
        // Nothing to do — receptor idle
        return;
      }

      // ① OPENING: build open & activation whenever open > 0
      if(r.open > 0.01 && r.open < 1.0){
        r.open = Math.min(r.open + 0.016, 1.0);
      }
      if(r.open > 0.2 && r.activated < 1.0){
        r.activated = Math.min(r.activated + 0.009, 1.0);
      }

      // ② cascadeStepT advances whenever activation is building
      //    (independent of isFiring — keeps running after fire ends)
      if(r.activated > 0.25 && r.cascadePhase !== "decay"){
        r.cascadeStepT = Math.min(r.cascadeStepT + GPCR_STEP_SPEED, 1.0);
      }

      // ③ Transition: opening → hold once fully activated
      if(r.cascadePhase === "closed" && r.activated >= 0.92){
        r.cascadePhase     = "hold";
        r.cascadeHoldTimer = 0;
      }

      // ④ HOLD: stay at peak, tick timer
      if(r.cascadePhase === "hold"){
        r.cascadeHoldTimer++;
        // ensure stepT reaches 1.0 before hold expires
        r.cascadeStepT = Math.min(r.cascadeStepT + GPCR_STEP_SPEED * 0.4, 1.0);
        if(r.cascadeHoldTimer > GPCR_HOLD_FRAMES){
          r.cascadePhase = "decay";
        }
      }

      // ⑤ DECAY: slow fade back to baseline
      if(r.cascadePhase === "decay"){
        r.activated    = Math.max(0, r.activated    - 0.0025);
        r.open         = Math.max(0, r.open         - 0.003);
        r.cascadeStepT = Math.max(0, r.cascadeStepT - 0.0025);
        if(r.activated <= 0){
          r.cascadePhase = "closed";
          r.open = 0; r.cascadeStepT = 0;
        }
      }

      // ⑥ If receptor got open pushed > 0 but isFiring ended before
      //    activation reached hold, still let it continue to completion.
      //    The only case we hard-close is if open was never seeded.
    }
  });
}

// ============================================================
// FIX 2: Only spawn new ion particles while actively firing
// ============================================================
function updateIonFlow(){
  const avgOpen = receptors.reduce((s,r)=>s+r.open,0)/Math.max(receptors.length,1);

  // Only ionotropic receptors produce direct membrane ion flow
  // GPCR-driven ion changes are represented by the cascade animation
  if(isFiring && avgOpen >= 0.35){
    receptors.forEach((rec,ri)=>{
      if(rec.groupClass === "gpcr") return;  // skip metabotropic
      if(rec.open < 0.35) return;
      if(frameCount%5 !== ri%5) return;

      // NMDA receptor: only spawn Ca²⁺ particles when Mg²⁺ block is cleared
      // block = 1.0 at resting (-70mV), 0.0 at -10mV — mirrors drawNMDA logic
      if(rec.ion.isNMDA){
        const block = Math.max(0, Math.min(1, (-mpValue - 10) / 40));
        const effectiveOpen = rec.open * Math.max(0, 1 - block * 2.2);
        if(effectiveOpen < 0.06) return; // blocked — no particles
      }

      const ion = rec.ion;
      const dir = ion.direction==="in" ? 1 : -1;
      ionParticles.push({
        x: POST_MEM+(dir>0?4:-4),
        y: rec.y+(Math.random()-0.5)*6,
        vx: dir*(2.2+Math.random()*0.5),
        vy: (Math.random()-0.5)*0.6,
        r: 2.8, alpha: 0.88, color: ion.color
      });
    });
  }

  // Always update and fade existing particles
  ionParticles.forEach(p=>{p.x+=p.vx; p.y+=p.vy; p.alpha-=0.013;});
  ionParticles = ionParticles.filter(p=>p.alpha>0.02);
}

function updateMP_val(){
  const nt = synapseData[currentNT];

  // For dual-receptor NTs, base MP shape on ionotropic group
  let potShape  = nt.potentialShape || "plateau";
  let effectType = nt.effect;
  if (nt.receptorGroups) {
    const ig = nt.receptorGroups.find(g => g.class === "ionotropic");
    if (ig) { potShape = ig.potentialShape || "excitatory"; effectType = ig.effect; }
  }

  // Use only ionotropic receptor open-state for potential calculation
  const ionoRecs = receptors.filter(r => r.groupClass === "ionotropic");
  const baseRecs = ionoRecs.length > 0 ? ionoRecs : receptors;
  const avgOpen  = baseRecs.reduce((s,r)=>s+r.open,0)/Math.max(baseRecs.length,1);

  if(avgOpen>0.08){
    const t=Math.min(avgOpen,1);
    if(effectType==="inhibitory"){
      mpValue=-70-16*Math.sin(t*Math.PI);
    } else if(potShape==="excitatory"){
      if(t<0.35)      mpValue=-70+(40+70)*(t/0.35);
      else if(t<0.62) mpValue=40-60*((t-0.35)/0.27);
      else            mpValue=-20+(-70+20)*((t-0.62)/0.38);
    } else {
      mpValue=-70+28*Math.sin(t*Math.PI);
    }
    // Log NMDA unblock when membrane depolarises past threshold
    if(currentNT === "glutamate" && mpValue > -40){
      logEvent("Mg²⁺ block relieved", "NMDA receptor pore opens — Ca²⁺ influx triggers LTP cascade");
    }
  } else {
    mpValue+=(-70-mpValue)*0.04;
  }
}

// ============================================================
// Draw
// ============================================================
function drawAll(ctx){
  const nt=synapseData[currentNT];
  const grd=ctx.createLinearGradient(PRE_MEM-20,0,POST_MEM+40,0);
  grd.addColorStop(0,"rgba(0,0,0,0)");
  grd.addColorStop(0.4,hexA(nt.color,0.04));
  grd.addColorStop(0.7,hexA(nt.color,0.06));
  grd.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=grd; ctx.fillRect(0,0,LW,LH);

  drawAxon(ctx,nt);
  drawPreTerminal(ctx,nt);
  drawCleft(ctx,nt);
  drawPostNeuron(ctx,nt);
  drawReceptors(ctx,nt);
  drawCaParticles(ctx);
  drawNTParticles(ctx);
  drawIonParticles(ctx);
  drawSectionLabels(ctx,nt);
}

// ============================================================
// Axon
// ============================================================
function drawAxon(ctx,nt){
  ctx.save();
  ctx.fillStyle="rgba(22,32,54,0.9)";
  rrect(ctx,0,MID_Y-24,AXON_END,48,6); ctx.fill();
  ctx.strokeStyle=hexA(nt.color,0.22); ctx.lineWidth=1;
  rrect(ctx,0,MID_Y-24,AXON_END,48,6); ctx.stroke();

  if(isFiring && apProgress>0){
    const waveX = AXON_END * Math.min(apProgress/0.38,1);
    if(waveX>4){
      const repol=ctx.createLinearGradient(0,0,waveX,0);
      repol.addColorStop(0,"rgba(0,0,0,0)");
      repol.addColorStop(0.7,hexA(nt.color,0.08));
      repol.addColorStop(1,hexA(nt.color,0.05));
      ctx.fillStyle=repol;
      rrect(ctx,0,MID_Y-24,waveX,48,6); ctx.fill();
    }
    const wfGrd=ctx.createRadialGradient(waveX,MID_Y,0,waveX,MID_Y,36);
    wfGrd.addColorStop(0,hexA(nt.color,0.95));
    wfGrd.addColorStop(0.45,hexA(nt.color,0.4));
    wfGrd.addColorStop(1,"transparent");
    ctx.fillStyle=wfGrd;
    ctx.beginPath(); ctx.arc(waveX,MID_Y,36,0,Math.PI*2); ctx.fill();
    if(waveX>14){
      ctx.fillStyle=hexA(nt.color,0.8);
      ctx.font="bold 9px 'IBM Plex Sans',sans-serif";
      ctx.textAlign="center";
      ctx.fillText("AP",waveX,MID_Y-28);
    }
  }
  ctx.restore();
}

// ============================================================
// Pre-synaptic terminal
// ============================================================
function drawPreTerminal(ctx,nt){
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(BOUTON_CX,MID_Y,BOUTON_RX,BOUTON_RY,0,0,Math.PI*2);
  const bg=ctx.createRadialGradient(BOUTON_CX-18,MID_Y-22,5,BOUTON_CX,MID_Y,BOUTON_RX);
  bg.addColorStop(0,"rgba(42,56,82,0.95)"); bg.addColorStop(1,"rgba(8,14,28,0.92)");
  ctx.fillStyle=bg; ctx.fill();
  ctx.strokeStyle=hexA(nt.color,0.35); ctx.lineWidth=1.5; ctx.stroke();

  ctx.fillStyle=hexA(nt.color,0.25);
  for(let y=MID_Y-CLEFT_HH+12;y<MID_Y+CLEFT_HH-12;y+=18){
    ctx.beginPath();
    ctx.arc(PRE_MEM-8,y,2,0,Math.PI*2);
    ctx.fill();
  }

  if(apProgress>0.8){
    const a=Math.min((apProgress-0.8)/0.15,1);
    ctx.globalAlpha=a;
    ctx.fillStyle="#f87171";
    ctx.font="600 9px 'IBM Plex Sans',sans-serif";
    ctx.textAlign="center";
    ctx.fillText("Ca²⁺",PRE_MEM-18, MID_Y-CLEFT_HH-12);
    drawArrow(ctx,PRE_MEM-18,MID_Y-CLEFT_HH-6,PRE_MEM-18,MID_Y-CLEFT_HH+8,"#f87171");
    ctx.globalAlpha=1;
  }
  ctx.restore();
}

// ============================================================
// Synaptic Cleft
// ============================================================
function drawCleft(ctx,nt){
  const t=MID_Y-CLEFT_HH, b=MID_Y+CLEFT_HH;
  ctx.save();
  ctx.fillStyle="rgba(2,6,18,0.72)";
  ctx.fillRect(PRE_MEM,t,POST_MEM-PRE_MEM,b-t);
  ctx.strokeStyle=hexA(nt.color,0.52); ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(PRE_MEM,t); ctx.lineTo(PRE_MEM,b); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(POST_MEM,t); ctx.lineTo(POST_MEM,b); ctx.stroke();
  ctx.restore();
}

// ============================================================
// Post-synaptic neuron
// ============================================================
function drawPostNeuron(ctx,nt){
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(POST_CX,MID_Y,POST_RX,POST_RY,0,0,Math.PI*2);
  const bg=ctx.createRadialGradient(POST_CX-16,MID_Y-22,6,POST_CX,MID_Y,POST_RX);
  bg.addColorStop(0,"rgba(42,56,82,0.92)"); bg.addColorStop(1,"rgba(8,14,28,0.90)");
  ctx.fillStyle=bg; ctx.fill();
  ctx.strokeStyle=hexA(nt.color,0.32); ctx.lineWidth=1.5; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(POST_CX+10,MID_Y+14,22,17,0.2,0,Math.PI*2);
  ctx.fillStyle="rgba(25,36,58,0.7)"; ctx.fill();
  ctx.strokeStyle=hexA(nt.color,0.1); ctx.lineWidth=1; ctx.stroke();
  ctx.restore();
}

// ============================================================
// Receptors
// ============================================================
function drawReceptors(ctx, nt){
  const dualMode = !!nt.receptorGroups;

  if (dualMode) {
    ctx.save();

    // Faint divider between groups
    ctx.strokeStyle = "rgba(120,130,150,0.10)";
    ctx.lineWidth   = 1;
    ctx.setLineDash([3, 6]);
    ctx.beginPath();
    ctx.moveTo(POST_MEM - 28, MID_Y);
    ctx.lineTo(POST_MEM + 200, MID_Y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Group labels — dark pill, coloured text
    ctx.font      = "500 8px 'IBM Plex Mono',monospace";
    ctx.textAlign = "left";
    nt.receptorGroups.forEach((group, gi) => {
      const groupRecs = receptors.filter(r => r.groupIdx === gi);
      if(groupRecs.length === 0) return;
      const topY     = Math.min(...groupRecs.map(r => r.y));
      const typeTag  = group.class === "ionotropic" ? "ionotropic" : "metabotropic";
      const labelStr = `${group.label}  ·  ${typeTag}`;
      const lx = POST_MEM + 10;
      const ly = topY - 36;  // clear of top slab (ry - halfGap(8) - slabH(10) = topY-18)
      const tw = ctx.measureText(labelStr).width;
      ctx.fillStyle = "rgba(8,10,18,0.88)";
      rrect(ctx, lx - 4, ly - 9, tw + 8, 13, 4);
      ctx.fill();
      ctx.fillStyle = hexA(nt.color, 0.88);
      ctx.fillText(labelStr, lx, ly);
    });

    ctx.restore();
  }

  // Draw each receptor
  receptors.forEach((rec, i) => {
    if (rec.groupClass === "gpcr") drawGPCR(ctx, rec, nt, i);
    else                           drawIonotropic(ctx, rec, i);
  });
}

function drawIonotropic(ctx, rec, idx){
  if(rec.ion.isNMDA){
    drawNMDA(ctx, rec, idx);
    return;
  }
  if(rec.ion.isAMPA){
    drawAMPA(ctx, rec, idx);
    return;
  }
  drawGenericIonChannel(ctx, rec, idx);
}

// ── AMPA receptor — fast Na⁺/K⁺ channel, labelled clearly ──────────────────
function drawAMPA(ctx, rec, idx){
  const mx=POST_MEM, ry=rec.y, op=rec.open, ion=rec.ion;
  const halfGap = 8 + op * 9;
  const slabH=10, ecLen=18, tmLen=12, icLen=8;
  const left  = mx - ecLen - tmLen/2;
  const right = mx + tmLen/2 + icLen;

  ctx.save();
  // Body
  ctx.fillStyle   = hexA(ion.color, 0.12 + op*0.14);
  ctx.strokeStyle = hexA(ion.color, 0.50 + op*0.38);
  ctx.lineWidth   = 1.5;
  rrect(ctx, left, ry-halfGap-slabH, right-left, slabH, 4); ctx.fill(); ctx.stroke();
  rrect(ctx, left, ry+halfGap,       right-left, slabH, 4); ctx.fill(); ctx.stroke();
  ctx.fillStyle = hexA(ion.color, 0.08+op*0.10);
  ctx.fillRect(mx-tmLen/2, ry-halfGap-slabH, tmLen, slabH);
  ctx.fillRect(mx-tmLen/2, ry+halfGap,       tmLen, slabH);

  // Pore glow
  if(op > 0.05){
    const pg = ctx.createLinearGradient(mx-tmLen/2, 0, right, 0);
    pg.addColorStop(0, hexA(ion.color, op*0.28));
    pg.addColorStop(1, hexA(ion.color, 0));
    ctx.fillStyle = pg;
    ctx.fillRect(mx-tmLen/2, ry-halfGap, tmLen+icLen, halfGap*2);
  }

  // Flow arrows
  if(op > 0.42){
    const fa  = (op-0.42)/0.58;
    const dir = 1; // Na⁺ always in
    const off = (frameCount*1.8) % 10;
    ctx.globalAlpha = fa*0.75; ctx.strokeStyle = ion.color; ctx.lineWidth = 1.5;
    for(let i=0;i<2;i++){
      const ax = mx + dir*(off%10 + i*10 - 5);
      drawArrow(ctx, ax-dir*5, ry, ax+dir*5, ry);
    }
    ctx.globalAlpha = 1;
  }

  // Receptor type label
  ctx.fillStyle = hexA(ion.color, 0.45);
  ctx.font = "500 7px 'IBM Plex Mono',monospace"; ctx.textAlign = "center";
  ctx.fillText("AMPA", mx, ry - halfGap - slabH - 5);

  _drawChannelDecorations(ctx, rec, idx, left, right, ry, ion);
  ctx.restore();
}

// ── NMDA receptor — voltage-dependent Mg²⁺ block ───────────────────────────
// block = 1.0 at resting (-70 mV), 0.0 when fully depolarised (above -10 mV)
// Ca²⁺ flow is physically impossible while Mg²⁺ occupies the pore.
function drawNMDA(ctx, rec, idx){
  const mx    = POST_MEM;
  const ry    = rec.y;
  const op    = rec.open;
  const ion   = rec.ion;
  const halfGap = 8 + op * 9;
  const slabH = 10, ecLen = 18, tmLen = 12, icLen = 8;
  const left  = mx - ecLen - tmLen/2;
  const right = mx + tmLen/2 + icLen;
  const poreTop    = ry - halfGap;
  const poreBottom = ry + halfGap;

  // block: 1 = Mg²⁺ fully in pore (≤ −50 mV), 0 = expelled (≥ −10 mV)
  const block        = Math.max(0, Math.min(1, (-mpValue - 10) / 40));
  // Ca²⁺ can only flow when block is low AND channel is bound
  const effectiveOpen = op * Math.max(0, 1 - block * 2.2);

  ctx.save();

  // ── Channel body ─────────────────────────────────────────────────────────
  // When blocked: body is dimmer and slightly grey-tinted to signal inactivity
  const bodyAlpha   = 0.10 + op * 0.10 * (1 - block * 0.6);
  const strokeAlpha = 0.38 + op * 0.28 * (1 - block * 0.4);
  ctx.fillStyle   = hexA(ion.color, bodyAlpha);
  ctx.strokeStyle = hexA(ion.color, strokeAlpha);
  ctx.lineWidth   = 1.5;
  rrect(ctx, left, ry - halfGap - slabH, right - left, slabH, 4); ctx.fill(); ctx.stroke();
  rrect(ctx, left, ry + halfGap,         right - left, slabH, 4); ctx.fill(); ctx.stroke();
  // TM strip
  ctx.fillStyle = hexA(ion.color, 0.06 + op * 0.07);
  ctx.fillRect(mx - tmLen/2, ry - halfGap - slabH, tmLen, slabH);
  ctx.fillRect(mx - tmLen/2, ry + halfGap,         tmLen, slabH);

  // ── Pore interior ────────────────────────────────────────────────────────
  // Draw pore only when channel is bound — colour signals state
  if(op > 0.04){
    const poreColor = block > 0.5
      ? "rgba(140,160,210,0.09)"   // bluish when blocked
      : hexA(ion.color, effectiveOpen * 0.18); // Ca²⁺ colour when open
    ctx.fillStyle = poreColor;
    ctx.fillRect(mx - tmLen/2, poreTop, tmLen, halfGap * 2);
  }

  // ── Mg²⁺ plug ─────────────────────────────────────────────────────────────
  // Present whenever block > 0.05 AND channel has been bound (op > 0)
  // Moves from centre of pore upward and out as block is relieved
  if(op > 0.04 && block > 0.05){
    // Position: at ry when fully blocked, exits through top slab as block lifts
    const mgY = ry - (1 - block) * (halfGap + slabH + 4);
    const mgR = 5;

    // Outer glow
    const mgGlow = ctx.createRadialGradient(mx, mgY, 0, mx, mgY, mgR * 2.8);
    mgGlow.addColorStop(0, `rgba(160,185,255,${block * 0.35})`);
    mgGlow.addColorStop(1, "transparent");
    ctx.fillStyle = mgGlow;
    ctx.beginPath(); ctx.arc(mx, mgY, mgR * 2.8, 0, Math.PI * 2); ctx.fill();

    // Ion body
    ctx.beginPath(); ctx.arc(mx, mgY, mgR, 0, Math.PI * 2);
    ctx.fillStyle   = `rgba(180,200,255,${block * 0.88})`;
    ctx.strokeStyle = `rgba(200,215,255,${block * 0.95})`;
    ctx.lineWidth   = 1.2;
    ctx.fill(); ctx.stroke();

    // ── Mg²⁺ label — drawn to the LEFT of the channel with dark pill ─────
    // Left side is extracellular space — clear of the ion symbol on the right
    const lbX = left - 8;
    const lbY = mgY;
    const lbText = "Mg²⁺";
    ctx.font = "600 8px 'IBM Plex Mono',monospace";
    ctx.textAlign = "right";
    const lbW = ctx.measureText(lbText).width;
    // Dark pill background
    ctx.fillStyle = `rgba(8,10,20,${block * 0.88})`;
    rrect(ctx, lbX - lbW - 6, lbY - 8, lbW + 8, 12, 3); ctx.fill();
    // Label text — always full opacity so it's readable
    ctx.fillStyle = `rgba(200,215,255,${block * 0.95})`;
    ctx.fillText(lbText, lbX, lbY + 2);

    // ── Block state pill — right side ─────────────────────────────────────
    if(block > 0.25){
      const stateText = "Mg²⁺ blocked";
      ctx.font = "500 7px 'IBM Plex Sans',sans-serif";
      ctx.textAlign = "left";
      const stW = ctx.measureText(stateText).width;
      const stX = right + 6;
      const stY = ry - halfGap - 2;
      // Pill
      ctx.fillStyle = `rgba(8,10,20,${block * 0.80})`;
      rrect(ctx, stX - 2, stY - 8, stW + 6, 11, 3); ctx.fill();
      ctx.fillStyle = `rgba(160,185,255,${block * 0.85})`;
      ctx.fillText(stateText, stX, stY + 1);
    }
  }

  // ── Ca²⁺ flow — ONLY when block is truly cleared ────────────────────────
  if(effectiveOpen > 0.06){
    // Pore glow
    const pg = ctx.createLinearGradient(mx - tmLen/2, 0, right, 0);
    pg.addColorStop(0, hexA(ion.color, effectiveOpen * 0.30));
    pg.addColorStop(1, hexA(ion.color, 0));
    ctx.fillStyle = pg;
    ctx.fillRect(mx - tmLen/2, poreTop, tmLen + icLen, halfGap * 2);
  }

  if(effectiveOpen > 0.25){
    const fa  = (effectiveOpen - 0.25) / 0.75;
    const off = (frameCount * 1.4) % 10;
    ctx.globalAlpha = fa * 0.82;
    ctx.strokeStyle = ion.color;
    ctx.lineWidth   = 1.5;
    for(let i = 0; i < 2; i++){
      const ax = mx + (off % 10 + i * 10 - 5);
      drawArrow(ctx, ax - 5, ry, ax + 5, ry);
    }
    ctx.globalAlpha = 1;

    // "Ca²⁺ unblocked" state pill
    const utxt = "Ca²⁺ open";
    ctx.font = "500 7px 'IBM Plex Sans',sans-serif"; ctx.textAlign = "left";
    const utW = ctx.measureText(utxt).width;
    const utX = right + 6;
    const utY = ry - halfGap - 2;
    ctx.fillStyle = `rgba(8,10,20,${fa * 0.80})`;
    rrect(ctx, utX - 2, utY - 8, utW + 6, 11, 3); ctx.fill();
    ctx.fillStyle = hexA(ion.color, fa * 0.88);
    ctx.fillText(utxt, utX, utY + 1);
  }

  // ── NMDA type label ───────────────────────────────────────────────────────
  ctx.fillStyle = hexA(ion.color, 0.42 + (1 - block) * 0.35);
  ctx.font = "500 7px 'IBM Plex Mono',monospace"; ctx.textAlign = "center";
  ctx.fillText("NMDA", mx, ry - halfGap - slabH - 6);

  // ── Ion symbol (Ca²⁺) on right — fades when blocked ─────────────────────
  // Show always so the student knows what WOULD flow; dim when blocked
  const ionAlpha = 0.20 + effectiveOpen * 0.72;
  const labelX   = right + 7;
  ctx.fillStyle  = hexA(ion.color, ionAlpha);
  ctx.font = "600 9px 'IBM Plex Mono',monospace"; ctx.textAlign = "left";
  ctx.fillText(ion.symbol, labelX, ry + 3);
  // Arrow only when actually flowing
  ctx.globalAlpha = effectiveOpen > 0.1 ? (0.3 + effectiveOpen * 0.6) : 0.15;
  ctx.strokeStyle = ion.color; ctx.lineWidth = 1.2;
  drawArrow(ctx, labelX, ry + 13, labelX + 13, ry + 13);
  ctx.globalAlpha = 1;

  // Bind flash
  if(rec.bindFlash > 0){
    ctx.beginPath(); ctx.arc(left + 3, ry, 12 + (1 - rec.bindFlash) * 10, 0, Math.PI * 2);
    ctx.strokeStyle = hexA(ion.color, rec.bindFlash * 0.75); ctx.lineWidth = 2; ctx.stroke();
  }
  // Idle pulse when unbound
  if(!isFiring && op < 0.1){
    const pulse = 0.15 + 0.12 * Math.sin(frameCount * 0.05 + idx * 1.7);
    ctx.beginPath(); ctx.arc(left + 3, ry, 7, 0, Math.PI * 2);
    ctx.strokeStyle = hexA(ion.color, pulse); ctx.lineWidth = 1; ctx.stroke();
  }

  ctx.restore();
}

// ── Generic ionotropic channel (GABA-A, 5-HT3, nAChR etc.) ─────────────────
function drawGenericIonChannel(ctx, rec, idx){
  const mx=POST_MEM, ry=rec.y, op=rec.open, ion=rec.ion;
  const halfGap = 8 + op * 9;
  const slabH=10, ecLen=18, tmLen=12, icLen=8;
  const left  = mx - ecLen - tmLen/2;
  const right = mx + tmLen/2 + icLen;

  ctx.save();
  ctx.fillStyle   = hexA(ion.color, 0.12 + op*0.14);
  ctx.strokeStyle = hexA(ion.color, 0.50 + op*0.38);
  ctx.lineWidth   = 1.5;
  rrect(ctx, left, ry-halfGap-slabH, right-left, slabH, 4); ctx.fill(); ctx.stroke();
  rrect(ctx, left, ry+halfGap,       right-left, slabH, 4); ctx.fill(); ctx.stroke();
  ctx.fillStyle = hexA(ion.color, 0.08+op*0.10);
  ctx.fillRect(mx-tmLen/2, ry-halfGap-slabH, tmLen, slabH);
  ctx.fillRect(mx-tmLen/2, ry+halfGap,       tmLen, slabH);

  if(op > 0.05){
    const pg = ctx.createLinearGradient(mx-tmLen/2, 0, right, 0);
    pg.addColorStop(0, hexA(ion.color, op*0.28));
    pg.addColorStop(1, hexA(ion.color, 0));
    ctx.fillStyle = pg;
    ctx.fillRect(mx-tmLen/2, ry-halfGap, tmLen+icLen, halfGap*2);
  }

  if(op > 0.42){
    const fa  = (op-0.42)/0.58;
    const dir = ion.direction==="in" ? 1 : -1;
    const off = (frameCount*1.8) % 10;
    ctx.globalAlpha = fa*0.75; ctx.strokeStyle = ion.color; ctx.lineWidth = 1.5;
    for(let i=0;i<2;i++){
      const ax = mx + dir*(off%10 + i*10 - 5);
      drawArrow(ctx, ax-dir*5, ry, ax+dir*5, ry);
    }
    ctx.globalAlpha = 1;
  }

  _drawChannelDecorations(ctx, rec, idx, left, right, ry, ion);
  ctx.restore();
}

// ── Shared decorations: bind flash, idle pulse, ion label ───────────────────
function _drawChannelDecorations(ctx, rec, idx, left, right, ry, ion){
  const bsX = left+3;
  if(rec.bindFlash > 0){
    ctx.beginPath(); ctx.arc(bsX, ry, 12+(1-rec.bindFlash)*10, 0, Math.PI*2);
    ctx.strokeStyle = hexA(ion.color, rec.bindFlash*0.75); ctx.lineWidth=2; ctx.stroke();
  }
  if(!isFiring && rec.open < 0.1){
    const pulse = 0.18 + 0.14*Math.sin(frameCount*0.05 + idx*1.7);
    ctx.beginPath(); ctx.arc(bsX, ry, 7, 0, Math.PI*2);
    ctx.strokeStyle = hexA(ion.color, pulse); ctx.lineWidth=1; ctx.stroke();
  }

  const labelX = right + 7;
  ctx.fillStyle = hexA(ion.color, 0.75 + rec.open*0.22);
  ctx.font = `600 9px 'IBM Plex Mono',monospace`; ctx.textAlign = "left";
  ctx.fillText(ion.symbol, labelX, ry + 3);
  ctx.globalAlpha = 0.35 + rec.open*0.55; ctx.strokeStyle = ion.color; ctx.lineWidth = 1.2;
  if(ion.direction==="in") drawArrow(ctx, labelX,    ry + 13, labelX + 13, ry + 13);
  else                     drawArrow(ctx, left - 4,  ry + 13, left - 16,   ry + 13);
  ctx.globalAlpha = 1;
}

function drawGPCR(ctx, rec, nt, idx){
  const cascade       = rec.group?.cascade       || nt.cascade       || "";
  const cascadeEffect = rec.group?.cascadeEffect  || nt.cascadeEffect || "";
  const groupEffect   = rec.group?.effect         || nt.effect;

  const mx  = POST_MEM;  // vertical membrane line
  const ry  = rec.y;
  const op  = rec.open;
  const act = rec.activated;
  const ion = rec.ion;
  const drawAct = (rec.cascadePhase === "hold") ? 1.0 : act;

  ctx.save();

  // ── Geometry ──────────────────────────────────────────────────────────────
  // 3 TM helices drawn as horizontal bars crossing the membrane.
  // Extracellular (left, toward cleft): x < mx
  // Intracellular (right, toward cytoplasm): x > mx
  const nH        = 3;
  const helixSpan = 18;  // half-width — helix runs mx-helixSpan to mx+helixSpan
  const helixH    = 5;
  const vSpacing  = 13;  // vertical gap between helix centres
  const totalH    = (nH - 1) * vSpacing;
  const topY      = ry - totalH / 2;

  const ecFace = mx - helixSpan;  // extracellular face of each helix
  const icFace = mx + helixSpan;  // intracellular face of each helix

  const baseStroke = hexA(ion.color, 0.42 + op * 0.35);
  const baseFill   = hexA(ion.color, 0.10 + op * 0.14);

  // Draw TM helices
  ctx.strokeStyle = baseStroke;
  ctx.fillStyle   = baseFill;
  ctx.lineWidth   = 1.4;
  for(let h = 0; h < nH; h++){
    const hy = topY + h * vSpacing;
    rrect(ctx, ecFace, hy - helixH/2, helixSpan * 2, helixH, 2);
    ctx.fill(); ctx.stroke();
  }

  // ── Extracellular loops — curve LEFT of ecFace ────────────────────────────
  ctx.strokeStyle = hexA(ion.color, 0.38 + op * 0.3);
  ctx.lineWidth   = 1.5;
  for(let h = 0; h < nH - 1; h++){
    const y1 = topY + h * vSpacing;
    const y2 = topY + (h + 1) * vSpacing;
    const bulge = 14 + h * 4; // alternate bulge sizes
    ctx.beginPath();
    ctx.moveTo(ecFace, y1);
    ctx.bezierCurveTo(ecFace - bulge, y1, ecFace - bulge, y2, ecFace, y2);
    ctx.stroke();
  }
  // N-terminus stub (extracellular)
  ctx.beginPath();
  ctx.moveTo(ecFace, topY);
  ctx.lineTo(ecFace - 10, topY - 8);
  ctx.stroke();

  // ── Intracellular loops — curve RIGHT of icFace ───────────────────────────
  ctx.strokeStyle = hexA(ion.color, 0.32 + op * 0.25);
  ctx.lineWidth   = 1.3;
  for(let h = 0; h < nH - 1; h++){
    const y1 = topY + h * vSpacing;
    const y2 = topY + (h + 1) * vSpacing;
    const bulge = 12;
    ctx.beginPath();
    ctx.moveTo(icFace, y1);
    ctx.bezierCurveTo(icFace + bulge, y1, icFace + bulge, y2, icFace, y2);
    ctx.stroke();
  }
  // C-terminus / ICL3 attachment point
  const icl3Y = topY + vSpacing; // bottom IC loop (ICL3 — G-protein coupling site)
  const icl3X = icFace + 12;

  // ── Ligand binding site (extracellular, LEFT of receptor) ────────────────
  const bsX = ecFace - 16;
  const bsY = ry;
  if(rec.bindFlash > 0){
    ctx.beginPath(); ctx.arc(bsX, bsY, 10 + (1 - rec.bindFlash) * 8, 0, Math.PI * 2);
    ctx.strokeStyle = hexA(ion.color, rec.bindFlash * 0.75);
    ctx.lineWidth   = 2; ctx.stroke();
  }
  if(!isFiring && op < 0.1){
    const pulse = 0.22 + 0.18 * Math.sin(frameCount * 0.05 + idx * 1.7);
    ctx.beginPath(); ctx.arc(bsX, bsY, 6, 0, Math.PI * 2);
    ctx.strokeStyle = hexA(ion.color, pulse);
    ctx.lineWidth   = 1; ctx.stroke();
  }

  // ── G-protein (intracellular, RIGHT side) ────────────────────────────────
  const gpX = icFace + 18 + drawAct * 26;
  const gpY = icl3Y + drawAct * 10;

  ctx.fillStyle   = hexA(ion.color, 0.10 + drawAct * 0.12);
  ctx.strokeStyle = hexA(ion.color, 0.44 + drawAct * 0.3);
  ctx.lineWidth   = 1.4;
  ctx.beginPath(); ctx.ellipse(gpX, gpY, 15, 9, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = hexA(ion.color, 0.75 + drawAct * 0.2);
  ctx.font      = "bold 8px 'IBM Plex Sans',sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("G\u03B1", gpX, gpY + 3);

  // Tether from ICL3 to G-protein (breaks as activation builds)
  if(drawAct < 0.6){
    ctx.strokeStyle = hexA(ion.color, (1 - drawAct / 0.6) * 0.35);
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(icl3X, icl3Y);
    ctx.lineTo(gpX - 15, gpY - 5);
    ctx.stroke();
  }

  // ── Cascade steps ──────────────────────────────────────────────────────────
  if(cascade && drawAct > 0.35){
    const stepT    = rec.cascadeStepT ?? 0;
    const holdPh   = rec.cascadePhase === "hold";
    const decayPh  = rec.cascadePhase === "decay";
    const baseAlpha = holdPh ? 1.0
                    : decayPh ? Math.max(0, act / 0.4)
                    : Math.min(1, (drawAct - 0.35) / 0.3);

    const cascadeSteps = cascade.split("→").map(s => s.trim()).filter(Boolean);
    const numExtra     = cascadeSteps.length - 1;

    ctx.font      = "9px 'IBM Plex Mono',monospace";
    ctx.textAlign = "left";
    let cx2 = gpX + 20, cy2 = gpY;

    cascadeSteps.forEach((step, si) => {
      if(si === 0) return;
      const threshold = (si - 1) / Math.max(numExtra, 1);
      if(stepT < threshold) return;
      const stepAlpha = Math.min(1, (stepT - threshold) / (1 / Math.max(numExtra, 1)));
      ctx.globalAlpha = baseAlpha * stepAlpha;
      ctx.fillStyle   = ion.color;
      const label     = "→ " + step;
      ctx.fillText(label, cx2, cy2 + 3);
      cx2 += ctx.measureText(label + " ").width;
      if(cx2 > LW - 36){ cx2 = gpX + 20; cy2 += 14; }
    });

    if(cascadeEffect && stepT > 0.85){
      const ea = Math.min(1, (stepT - 0.85) / 0.15);
      ctx.globalAlpha = baseAlpha * ea;
      ctx.fillStyle   = groupEffect === "inhibitory" ? "#52a87a" : "#c49a2a";
      ctx.font        = "500 9px 'IBM Plex Sans',sans-serif";
      ctx.fillText(cascadeEffect, gpX - 10, cy2 + 16);
    }
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

// ============================================================
// Particle draw functions
// ============================================================
function drawCaParticles(ctx){
  caParticles.forEach(p=>{
    ctx.save(); ctx.globalAlpha=p.alpha;
    ctx.beginPath(); ctx.arc(p.x,p.y,3.5,0,Math.PI*2);
    ctx.fillStyle="#f87171"; ctx.shadowBlur=5; ctx.shadowColor="#f87171"; ctx.fill();
    ctx.shadowBlur=0;
    ctx.fillStyle="#f87171"; ctx.font="bold 8px 'IBM Plex Sans',sans-serif";
    ctx.textAlign="center"; ctx.fillText("Ca²⁺",p.x,p.y-7);
    ctx.restore();
  });
}

function drawNTParticles(ctx){
  ntParticles.forEach(p=>{
    ctx.save(); ctx.globalAlpha=p.alpha;
    const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*3);
    g.addColorStop(0,p.color); g.addColorStop(0.5,hexA(p.color,0.4)); g.addColorStop(1,"transparent");
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r*3,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color; ctx.shadowBlur=7; ctx.shadowColor=p.color; ctx.fill();
    ctx.restore();
  });
}

function drawIonParticles(ctx){
  ionParticles.forEach(p=>{
    ctx.save(); ctx.globalAlpha=p.alpha;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.color; ctx.shadowBlur=4; ctx.shadowColor=p.color; ctx.fill();
    ctx.restore();
  });
}

// ============================================================
// Section labels
// ============================================================
function drawSectionLabels(ctx,nt){
  ctx.save();

  // Section header labels — placed at top of canvas with clear contrast
  ctx.font      = "500 10px 'IBM Plex Sans',sans-serif";
  ctx.textAlign = "center";

  const labelColor = "rgba(180,190,205,0.72)";

  ctx.fillStyle = labelColor;
  ctx.fillText("Pre-synaptic Terminal", BOUTON_CX, 18);

  const cleftCX = (PRE_MEM + POST_MEM) / 2;
  ctx.fillStyle = "rgba(160,175,190,0.55)";
  ctx.fillText("Synaptic Cleft", cleftCX, 18);

  ctx.fillStyle = labelColor;
  ctx.fillText("Post-synaptic Neuron", POST_CX, 18);

  const nt2 = synapseData[currentNT];

  // Single-receptor NT: show receptor name near base of cleft
  if(!nt2.receptorGroups){
    const lstr = nt2.receptor;
    const lx   = POST_MEM + 10;
    const ly   = MID_Y + CLEFT_HH + 16;
    ctx.font      = "500 8px 'IBM Plex Mono',monospace";
    ctx.textAlign = "left";
    const tw = ctx.measureText(lstr).width;
    ctx.fillStyle = "rgba(10,10,16,0.75)";
    rrect(ctx, lx - 4, ly - 9, tw + 8, 13, 4); ctx.fill();
    ctx.fillStyle = hexA(nt2.color, 0.80);
    ctx.fillText(lstr, lx, ly);
  }

  // Effect label — appears on receptor activation
  const avgOpen = receptors.reduce((s,r)=>s+r.open,0) / Math.max(receptors.length,1);
  if(avgOpen > 0.28){
    const a = Math.min((avgOpen - 0.28) / 0.3, 1);
    ctx.globalAlpha = a;
    ctx.fillStyle   = nt2.effect==="inhibitory" ? "#52a87a" : "#c49a2a";
    ctx.font        = "500 10px 'IBM Plex Sans',sans-serif";
    ctx.textAlign   = "center";
    ctx.fillText(nt2.effectLabel, POST_CX, MID_Y - POST_RY + 22);
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

// ============================================================
// Membrane Potential Graph
// ============================================================
function drawMP(ctx, pw, ph){
  const lp = 52;  // left margin — y-axis labels
  const rp = 58;  // right margin — right-side annotations
  const tp = 22;  // top margin — phase label
  const bp = 6;
  const plotW = pw - lp - rp;
  const plotH = ph - tp - bp;

  // Map mV to y in the plot area
  function vy(mv){ return tp + plotH - ((mv + 90) / 140) * plotH; }

  // Background
  ctx.fillStyle = "rgba(6,10,20,0.97)";
  rrect(ctx, 0, 0, pw, ph, 6); ctx.fill();

  ctx.save();

  // ── Y-axis labels (left margin, right-aligned) ──────────────────────────
  const yTicks = ph < 100
    ? [[40], [0], [-70]]
    : [[40], [0], [-55], [-70], [-90]];

  ctx.font      = "9px 'IBM Plex Mono',monospace";
  ctx.textAlign = "right";

  yTicks.forEach(([mv]) => {
    const y = vy(mv);
    // Grid line
    ctx.setLineDash([2, 5]);
    ctx.strokeStyle = mv === 0
      ? "rgba(148,163,184,0.12)"
      : "rgba(51,65,85,0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(lp, y); ctx.lineTo(pw - rp, y); ctx.stroke();
    ctx.setLineDash([]);
    // Label with mV suffix
    const isMajor = mv === -70 || mv === 40 || mv === 0;
    ctx.fillStyle = isMajor
      ? "rgba(190,200,215,0.75)"
      : "rgba(90,105,120,0.55)";
    ctx.fillText(mv + " mV", lp - 5, y + 3);
  });

  // ── Resting potential line (distinct, labelled on right) ─────────────────
  const yRest    = vy(-70);
  const yThresh  = vy(-55);

  ctx.strokeStyle = "rgba(160,175,195,0.28)";
  ctx.lineWidth   = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath(); ctx.moveTo(lp, yRest); ctx.lineTo(pw - rp, yRest); ctx.stroke();
  ctx.setLineDash([]);

  // Right-margin label: "resting" stacked above "−70 mV"
  ctx.textAlign = "left";
  ctx.font      = "500 8px 'IBM Plex Sans',sans-serif";
  ctx.fillStyle = "rgba(160,175,195,0.60)";
  ctx.fillText("resting", pw - rp + 4, yRest - 3);
  ctx.font      = "600 8px 'IBM Plex Mono',monospace";
  ctx.fillStyle = "rgba(160,175,195,0.80)";
  ctx.fillText("−70 mV", pw - rp + 4, yRest + 8);

  // ── Threshold line (labelled on right) ───────────────────────────────────
  if(ph >= 100){
    ctx.strokeStyle = "rgba(192,136,74,0.22)";
    ctx.lineWidth   = 1;
    ctx.setLineDash([3, 6]);
    ctx.beginPath(); ctx.moveTo(lp, yThresh); ctx.lineTo(pw - rp, yThresh); ctx.stroke();
    ctx.setLineDash([]);
    ctx.font      = "500 8px 'IBM Plex Sans',sans-serif";
    ctx.fillStyle = "rgba(192,136,74,0.55)";
    ctx.fillText("threshold", pw - rp + 4, yThresh - 3);
    ctx.font      = "600 8px 'IBM Plex Mono',monospace";
    ctx.fillStyle = "rgba(192,136,74,0.70)";
    ctx.fillText("−55 mV", pw - rp + 4, yThresh + 8);
  }

  // ── Clipped plot area: fill + trace ──────────────────────────────────────
  const nt  = synapseData[currentNT];
  const col = nt.color;
  const step = plotW / (potHistory.length - 1);

  ctx.save();
  ctx.beginPath();
  ctx.rect(lp, tp, plotW, plotH);
  ctx.clip();

  // Area fill between trace and resting line
  ctx.beginPath();
  potHistory.forEach((v, i) => {
    const x = lp + i * step;
    const y = vy(v);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.lineTo(lp + (potHistory.length - 1) * step, yRest);
  ctx.lineTo(lp, yRest);
  ctx.closePath();
  const fillGrad = ctx.createLinearGradient(0, tp, 0, tp + plotH);
  fillGrad.addColorStop(0, hexA(col, 0.20));
  fillGrad.addColorStop(0.5, hexA(col, 0.07));
  fillGrad.addColorStop(1, hexA(col, 0.01));
  ctx.fillStyle = fillGrad;
  ctx.fill();

  // Trace
  ctx.beginPath();
  ctx.strokeStyle = col;
  ctx.lineWidth   = 2;
  ctx.lineJoin    = "round";
  potHistory.forEach((v, i) => {
    const x = lp + i * step;
    const y = vy(v);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.restore(); // remove clip

  // ── Phase label — top-left of plot, large and clear ──────────────────────
  const delta = mpValue - (-70);
  let phaseLabel = "";
  let phaseColor = col;
  if(delta > 6){
    phaseLabel = "Depolarising";
    phaseColor = "#c49a2a";
  } else if(delta < -4){
    phaseLabel = "Hyperpolarising";
    phaseColor = "#52a87a";
  } else if(!isFiring && Math.abs(delta) > 1.5){
    phaseLabel = "Repolarising";
    phaseColor = "rgba(160,175,195,0.80)";
  }

  if(phaseLabel){
    const fadeIn = Math.min(1, Math.abs(delta) / 10);
    ctx.globalAlpha = fadeIn;
    ctx.font        = "600 9px 'IBM Plex Sans',sans-serif";
    ctx.textAlign   = "left";
    ctx.fillStyle   = phaseColor;
    ctx.fillText(phaseLabel, lp + 6, tp + 13);
    ctx.globalAlpha = 1;
  }

  // ── Live mV readout — tracks right end of trace ───────────────────────────
  const liveY = vy(mpValue);
  const readoutY = Math.max(tp + 10, Math.min(tp + plotH - 2, liveY));
  ctx.font      = "600 9px 'IBM Plex Mono',monospace";
  ctx.textAlign = "right";
  ctx.fillStyle = hexA(col, 0.95);
  ctx.fillText(mpValue.toFixed(0) + " mV", pw - rp - 4, readoutY);

  // ── Graph title ───────────────────────────────────────────────────────────
  ctx.font      = "500 8px 'IBM Plex Sans',sans-serif";
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(80,95,115,0.60)";
  ctx.fillText("Membrane Potential", lp, tp - 5);

  ctx.restore();
}

function mapMV(mv, ph){ return ph - ((mv + 90) / 140) * ph; }

function glossifyText(text){
  if(!text) return "";
  try {
    return window.glossifyText ? window.glossifyText(text, "glossary-term") : text;
  } catch(e) {
    return text;
  }
}

// ============================================================
// Info Panel
// ============================================================
function renderSynapseInfo(){
  const panel = document.getElementById("synapse-info-panel");
  if(!panel) return;
  const nt  = synapseData[currentNT];
  const ec  = nt.effect === "inhibitory" ? "effect-inhibitory" : "effect-excitatory";
  const ei  = nt.effect === "inhibitory" ? "↓" : "↑";

  // Build ion rows
  let ionTableHtml = "";
  if(nt.receptorGroups){
    ionTableHtml = nt.receptorGroups.map(group => {
      const tag  = group.class === "ionotropic" ? "Ionotropic" : "Metabotropic";
      const rows = group.ions.map(ion => `
        <div class="ion-row">
          <span class="ion-badge" style="color:${ion.color};border-color:${ion.color}">${ion.symbol}</span>
          <span class="ion-dir ${ion.direction==='in'?'ion-in':'ion-out'}">${ion.direction==='in'?'→ influx':'← efflux'}</span>
          <span class="ion-effect">${ion.effect}</span>
        </div>`).join("");
      return `<div style="margin-bottom:6px">
        <div class="info-label" style="margin-bottom:4px">${group.label} — ${tag}</div>
        ${rows}
      </div>`;
    }).join("");
  } else {
    ionTableHtml = nt.ions.map(ion => `
      <div class="ion-row">
        <span class="ion-badge" style="color:${ion.color};border-color:${ion.color}">${ion.symbol}</span>
        <span class="ion-dir ${ion.direction==='in'?'ion-in':'ion-out'}">${ion.direction==='in'?'→ influx':'← efflux'}</span>
        <span class="ion-effect">${ion.effect}</span>
      </div>`).join("");
  }

  const receptorDisplay = nt.receptorGroups
    ? nt.receptorGroups.map(g => g.receptor).join("<br>")
    : nt.receptor;

  panel.innerHTML = `
    <div class="info-panel-inner">

      <div class="info-nt-header">
        <span class="info-nt-badge" style="color:${nt.color};border-color:${nt.color};background:${hexA(nt.color,0.10)}">${currentNT.charAt(0).toUpperCase()+currentNT.slice(1)}</span>
        ${nt.effectBadgeHtml
          ? nt.effectBadgeHtml
          : `<span class="info-effect-badge ${ec}">${ei} ${nt.effectLabel}</span>`
        }
      </div>

      <div class="info-section">
        <span class="info-label">Post-synaptic effect</span>
        <span class="info-value">${nt.postEffect}</span>
      </div>

      <div class="info-section">
        <span class="info-label">Receptor${nt.receptorGroups ? " types" : ""}</span>
        <span class="info-value" style="line-height:1.6">${receptorDisplay}</span>
      </div>

      <div class="info-section">
        <span class="info-label">Ion movements</span>
        <div class="ion-table">${ionTableHtml}</div>
      </div>

      <div class="info-section">
        <span class="info-label">Mechanism</span>
        <p class="info-body">${glossifyText(nt.mechanism)}</p>
      </div>

      <div class="info-collapsibles">
        <details class="info-detail"><summary>Pre-synaptic events</summary><p>${glossifyText(nt.presynaptic)}</p></details>
        <details class="info-detail"><summary>Post-synaptic cascade</summary><p>${glossifyText(nt.postsynaptic)}</p></details>
        <details class="info-detail"><summary>Reuptake &amp; clearance</summary><p>${glossifyText(nt.reuptake)}</p></details>
        ${nt.conceptNote ? `
        <details class="info-detail info-detail--concept" open>
          <summary>${nt.conceptNote.title}</summary>
          <p>${glossifyText(nt.conceptNote.body)}</p>
        </details>` : ""}
        <details class="info-detail clinical"><summary>Clinical relevance</summary><p>${glossifyText(nt.clinicalNote)}</p></details>
      </div>

      <div class="event-log-section" id="event-log-section">
        <div class="info-label" style="margin-bottom:3px">Event log</div>
        <div class="event-log-note">Timestamps reflect simulation speed, not biological time. In vivo, AP-to-release takes ~1–2 ms; receptor binding within microseconds.</div>
        <div class="event-log-list" id="event-log-list">
          <div class="event-log-empty">Fire a neuron to see the sequence of events.</div>
        </div>
      </div>

    </div>

    <div class="glossary-tooltip" id="glossary-tooltip" role="tooltip" aria-live="polite"></div>
  `;

  // Wire glossary tooltips via shared utility
  window.attachGlossaryTooltips && window.attachGlossaryTooltips(
    panel,
    "glossary-tooltip",
    document.getElementById("synapse-info-panel")
  );

  // Inject synapse micro-guide if learning.js is loaded
  if (window.buildSynapseGuideHTML) {
    const existing = panel.querySelector(".micro-guide--synapse");
    if (!existing) {
      const guideEl = document.createElement("div");
      guideEl.innerHTML = window.buildSynapseGuideHTML();
      const inner = panel.querySelector(".info-panel-inner");
      if (inner) inner.prepend(guideEl.firstElementChild);
    }
  }
}

// ============================================================
// Utilities
// ============================================================
function hexA(hex,a){
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

function rrect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
}

function drawArrow(ctx,x1,y1,x2,y2,color){
  const hl=5.5,ang=Math.atan2(y2-y1,x2-x1),sv=ctx.strokeStyle;
  if(color) ctx.strokeStyle=color;
  ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2,y2); ctx.lineTo(x2-hl*Math.cos(ang-.42),y2-hl*Math.sin(ang-.42));
  ctx.moveTo(x2,y2); ctx.lineTo(x2-hl*Math.cos(ang+.42),y2-hl*Math.sin(ang+.42));
  ctx.stroke();
  if(color) ctx.strokeStyle=sv;
}

function setSynapseActivePill(t){
  document.querySelectorAll(".synapse-nt-switcher .nt-pill").forEach(p=>
    p.classList.toggle("active",p.dataset.type===t));
}

// ============================================================
// Page nav
// ============================================================
// Expose for cross-module navigation (scenario deep-link chips)
window.synapseData = synapseData;

window.navigateSynapseTo = function(ntKey) {
  if (!synapseData[ntKey]) return;
  const synapsePage = document.getElementById("synapse-page");
  if (!synapsePage) return;
  // If synapse page hasn't been initialised yet, init it now
  if (!window._synapseInitialised) {
    currentNT = ntKey;
    initSynapsePage();
    window._synapseInitialised = true;
  } else {
    // Already running — just switch NT
    currentNT = ntKey;
    setSynapseActivePill(ntKey);
    resetAnim();
    renderSynapseInfo();
  }
};

document.addEventListener("DOMContentLoaded",()=>{
  const go=document.getElementById("go-synapse-btn");
  const bk=document.getElementById("synapse-back-btn");
  if(go) go.addEventListener("click",()=>{
    go.classList.add("is-loading");
    go.disabled = true;
    document.querySelector(".landing").classList.add("hidden");
    document.getElementById("synapse-page").classList.remove("hidden");
    currentNT="dopamine";
    // Defer until the browser has laid out the now-visible page
    requestAnimationFrame(() => {
      initSynapsePage();
      window._synapseInitialised = true;
      go.classList.remove("is-loading");
      go.disabled = false;
    });
  });
  if(bk) bk.addEventListener("click",()=>{
    document.getElementById("synapse-page").classList.add("hidden");
    document.querySelector(".landing").classList.remove("hidden");
    if(animId){cancelAnimationFrame(animId);animId=null;}
    window._synapseInitialised = false;
  });
});
