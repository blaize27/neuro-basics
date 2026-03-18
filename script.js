const transmitters = {
  dopamine: {
    symbol: "DA",
    color: "#6ab0c8",
    description: "Dopamine encodes prediction error, not pleasure. When an outcome is better than predicted, dopamine neurons fire a burst; when worse, they fall silent below baseline; when exactly as predicted, they do not change. This temporal difference signal, computed by neurons in the VTA and SNc, is the cellular engine of reinforcement learning and drives motivation, habit formation, and motor control across three anatomically distinct projections.",
    regions: ["VTA", "SNc", "Striatum", "PFC", "Amygdala"],
    regionEdges: [
      {
        from: "VTA", to: "Striatum",
        description: "The mesolimbic projection carries dopamine from the VTA to the nucleus accumbens in the ventral striatum. Dopamine release here encodes the prediction-error signal that reinforces rewarding behaviours, making those actions more likely to be selected in the future. The nucleus accumbens integrates this dopamine signal with glutamatergic inputs from the prefrontal cortex and hippocampus to drive motivated behaviour.||Cocaine and amphetamines elevate synaptic dopamine in the nucleus accumbens by blocking or reversing the dopamine transporter (DAT), producing a reward signal that far exceeds any natural reinforcer. Repeated drug exposure downregulates D2 receptors and blunts natural reward, driving escalating drug use."
      },
      {
        from: "VTA", to: "PFC",
        description: "The mesocortical projection carries dopamine from the VTA to the prefrontal cortex, where it modulates working memory and executive control. D1 receptor stimulation at moderate levels strengthens the persistent firing of PFC pyramidal neurons that maintains information in working memory. The relationship follows an inverted-U curve: too little or too much dopamine impairs PFC function, while intermediate levels optimise it.||Stimulant medications for ADHD (methylphenidate, amphetamine) act partly by increasing dopamine and noradrenaline in the PFC to restore this optimal level. The mesocortical pathway is also disrupted in schizophrenia, contributing to the working memory and executive function deficits."
      },
      {
        from: "SNc", to: "Striatum",
        description: "The nigrostriatal projection carries dopamine from the substantia nigra pars compacta to the dorsal striatum (caudate and putamen), where it is required for the initiation of voluntary movement. Dopamine facilitates the direct pathway (promoting movement) while suppressing the indirect pathway (inhibiting competing movements), creating a net go signal for intended actions.||Parkinson's disease results from the progressive death of nigrostriatal dopamine neurons. Motor symptoms (tremor at rest, rigidity, bradykinesia) become apparent only after around 60% of striatal dopamine terminals are lost, because compensatory mechanisms mask earlier deficits. L-DOPA replenishes striatal dopamine and remains the most effective treatment, though motor complications develop over years of use."
      },
      {
        from: "VTA", to: "Amygdala",
        description: "Dopamine projections from the VTA reach the basolateral amygdala and modulate how much motivational weight is assigned to emotionally significant stimuli. When a stimulus predicts reward or threat, dopamine release here strengthens the association between that stimulus and its outcome, contributing to the formation of cue-conditioned responses.||This mechanism underlies cue-induced craving in addiction: environmental cues previously paired with drug use acquire the ability to trigger dopamine release independently, driving drug-seeking even after long periods of abstinence. It is also relevant to fear conditioning, where dopamine may contribute to the persistence of threat associations."
      }
    ]
  },
  serotonin: {
    symbol: "5-HT",
    color: "#9b82c4",
    description: "Serotonin from the dorsal raphe nuclei projects diffusely across the brain, modulating rather than transmitting discrete signals. Its primary function appears to be setting the gain on emotional and behavioural systems, influencing how strongly the brain responds to both positive and negative events. Reduced serotonergic tone is consistently associated with heightened threat sensitivity, impulsivity, and dysphoria, though the precise mechanisms remain an active area of research.",
    regions: ["Raphe", "PFC", "Amygdala", "Hippocampus", "Hypothalamus"],
    regionEdges: [
      {
        from: "Raphe", to: "PFC",
        description: "Serotonin from the dorsal raphe reaches the PFC where it acts on multiple receptor subtypes with opposing effects. 5-HT1A receptors on pyramidal neurons reduce excitability, while postsynaptic 5-HT2A receptors increase it. The net effect depends on which receptors predominate in a given context, shaping mood, impulsivity, and cognitive flexibility through interactions with dopaminergic and glutamatergic inputs.||Psilocybin produces its perceptual and cognitive effects primarily through agonism at cortical 5-HT2A receptors. Its potential therapeutic effects in depression and addiction are thought to involve changes in default-mode network activity and increased cortical flexibility, though the precise mechanisms are under active investigation."
      },
      {
        from: "Raphe", to: "Amygdala",
        description: "Serotonergic projections from the raphe nuclei modulate amygdala reactivity to threatening stimuli. Reduced serotonin input is associated with heightened amygdala responses to threat cues, producing the exaggerated fear and anxiety responses characteristic of anxiety disorders and major depression. The interaction is complex: different serotonin receptor subtypes in the basolateral and central amygdala have distinct and sometimes opposing effects.||SSRIs increase synaptic serotonin throughout the brain, including at the raphe-amygdala synapse. Neuroimaging studies show that effective SSRI treatment reduces amygdala hyperreactivity to threatening faces, an effect that develops over weeks of treatment in parallel with clinical improvement."
      },
      {
        from: "Raphe", to: "Hippocampus",
        description: "Serotonergic input to the hippocampus modulates synaptic plasticity and adult neurogenesis in the dentate gyrus. Serotonin facilitates long-term potentiation through 5-HT4 and 5-HT7 receptors and promotes the survival and integration of newborn granule cells. However, neurogenesis is not the sole mechanism of SSRI action; desensitisation of 5-HT1A autoreceptors on raphe neurons, which increases net serotonin output, also plays a key role in the delayed therapeutic response.||The 2-4 week therapeutic delay of SSRIs likely reflects the time required for multiple adaptive changes, including autoreceptor desensitisation and synaptic remodelling, rather than any single mechanism."
      },
      {
        from: "Raphe", to: "Hypothalamus",
        description: "Serotonergic projections from the raphe to the hypothalamus regulate appetite, sleep architecture, and circadian timing. Serotonin in the hypothalamus reduces carbohydrate appetite via 5-HT2C receptors and influences the transition between sleep stages. The suprachiasmatic nucleus receives serotonergic input that modulates entrainment to photic cues.||Disruption of this pathway explains adverse effects seen with some psychiatric drugs. Mirtazapine's 5-HT2C antagonism contributes to its weight gain side effect. Certain SSRIs and SNRIs alter REM sleep architecture through hypothalamic serotonin receptors, sometimes producing vivid dreaming during treatment initiation."
      }
    ]
  },
  glutamate: {
    symbol: "Glu",
    color: "#52a87a",
    description: "Glutamate is the principal excitatory neurotransmitter in the central nervous system, mediating the great majority of fast synaptic transmission. Its receptors span two fundamentally different classes: ionotropic channels (AMPA, NMDA, kainate) that open within milliseconds of ligand binding, and metabotropic receptors (mGluR1-8) that act through G-proteins over longer timescales. The unique biophysical properties of the NMDA receptor make glutamate the central molecular mediator of synaptic plasticity.",
    regions: ["Cortex", "Thalamus", "Hippocampus", "Striatum"],
    regionEdges: [
      {
        from: "Thalamus", to: "Cortex",
        description: "The thalamocortical projection carries glutamatergic signals from specific thalamic nuclei to their corresponding cortical areas, constituting the primary ascending pathway for sensory information. Each sensory modality (vision via the lateral geniculate nucleus, audition via the medial geniculate nucleus, somatosensation via the ventral posterior nucleus) has a dedicated thalamocortical relay. The thalamus does not merely forward signals but also gates them, suppressing transmission during sleep.||General anaesthetics produce unconsciousness in part by suppressing thalamocortical transmission, consistent with the view that thalamocortical loops are necessary for conscious awareness. Specific thalamic lesions produce modality-specific sensory losses, while diffuse thalamic damage causes disorders of consciousness including the vegetative state."
      },
      {
        from: "Cortex", to: "Hippocampus",
        description: "Cortical glutamatergic projections reach the hippocampus primarily via the entorhinal cortex, which receives converging input from multimodal association areas and directs it into the hippocampal circuit via the perforant path. Within the hippocampus, this input activates AMPA receptors for fast depolarisation and, when activity is sufficient to relieve the Mg2+ block on NMDA receptors, triggers calcium influx that initiates long-term potentiation.||Ketamine's rapid antidepressant effect is thought to involve blockade of NMDA receptors on GABAergic interneurons in the hippocampus and PFC, which disinhibits pyramidal neurons and triggers a burst of synaptic AMPA receptor insertion and BDNF release. NMDA receptor hypofunction, as produced by ketamine at sub-anaesthetic doses, replicates aspects of schizophrenia and is a leading mechanistic hypothesis for the disorder."
      },
      {
        from: "Cortex", to: "Striatum",
        description: "Corticostriatal glutamatergic projections carry information from virtually every cortical region to the striatum, where they converge on medium spiny neurons alongside dopaminergic input from the substantia nigra and VTA. This convergence allows the striatum to integrate what action is being planned (cortical glutamate) with whether it was previously rewarded (dopamine), selecting and reinforcing successful action sequences.||Dysfunction in corticostriatal circuits is implicated in obsessive-compulsive disorder, where hyperactivity in the orbitofrontal-striatal loop drives intrusive thoughts and compulsive behaviours. In Huntington's disease, striatal medium spiny neurons degenerate, disrupting this circuit and producing a characteristic combination of involuntary movements and cognitive decline."
      },
      {
        from: "Hippocampus", to: "Cortex",
        description: "During sleep, especially NREM slow-wave sleep, hippocampal sharp-wave ripples coordinate the replay of recently encoded memory traces and transmit them to cortical networks via glutamatergic projections. This hippocampal-to-cortical dialogue gradually transfers memories from their initial hippocampus-dependent form into stable, hippocampus-independent cortical representations, a process called systems consolidation.||Sleep deprivation impairs this transfer, reducing memory retention for material learned before the sleep-deprived night. The relative sparing of remote memories early in Alzheimer's disease reflects that these memories are already cortically consolidated and no longer depend on the hippocampus."
      }
    ]
  },
  gaba: {
    symbol: "GABA",
    color: "#b86060",
    description: "Gamma-aminobutyric acid is the principal inhibitory neurotransmitter in the brain, counterbalancing glutamatergic excitation to maintain circuit stability. It operates through two pharmacologically distinct receptor systems: GABA-A, a ligand-gated chloride channel that responds in milliseconds, and GABA-B, a metabotropic Gi-coupled receptor producing slower, prolonged inhibition. GABAergic interneurons also generate the oscillatory activity that coordinates information processing across brain regions.",
    regions: ["Cortex", "Thalamus", "Striatum", "Cerebellum"],
    regionEdges: [
      {
        from: "Cortex", to: "Cortex",
        description: "Local GABAergic interneurons in the cortex provide the inhibitory scaffolding that shapes pyramidal neuron firing. Parvalbumin-positive basket cells and chandelier cells provide fast perisomatic inhibition and generate gamma oscillations (30-80 Hz) by synchronising the excitability of pyramidal neuron populations. Somatostatin-positive interneurons target pyramidal dendrites and provide a slower form of inhibitory control that gates long-range synaptic inputs.||Parvalbumin interneuron dysfunction is among the most replicated findings in post-mortem schizophrenia tissue, and is thought to underlie the gamma oscillation deficits and working memory impairments seen in the disorder. The same interneuron class is implicated in the sensory hypersensitivity observed in some autism models."
      },
      {
        from: "Thalamus", to: "Thalamus",
        description: "The thalamic reticular nucleus (TRN) is a shell of GABAergic projection neurons that receives collaterals from both thalamocortical and corticothalamic fibres and sends inhibitory projections back to the thalamic relay nuclei. By selectively inhibiting specific relay nuclei, the TRN gates the flow of sensory information to the cortex. During NREM sleep, TRN bursting generates sleep spindles (11-15 Hz) that suppress sensory signals and contribute to memory consolidation.||Benzodiazepines and non-benzodiazepine hypnotics (Z-drugs) act at GABA-A receptors to enhance TRN activity, promoting sleep. Abnormal TRN function has been proposed as a mechanism for the sensory gating deficits in schizophrenia and for thalamocortical dysrhythmia in chronic pain and tinnitus."
      },
      {
        from: "Striatum", to: "Thalamus",
        description: "Medium spiny neurons of the striatum constitute the output of the basal ganglia, projecting GABAergic signals through the globus pallidus internus and substantia nigra pars reticulata to the thalamus and brainstem. Under resting conditions this output is tonically inhibitory, suppressing thalamic activity. Dopamine-modulated disinhibition of this pathway releases the thalamus from inhibition at appropriate moments, permitting the initiation of intended movements.||In Huntington's disease, medium spiny neurons degenerate progressively. Early loss preferentially affects neurons of the indirect pathway (which suppresses unwanted movements), causing the characteristic involuntary choreiform movements. Parkinson's disease involves the indirect-pathway equivalent in the other direction: reduced dopamine over-activates the indirect pathway, producing excessive inhibitory output that slows and rigidifies movement."
      },
      {
        from: "Cerebellum", to: "Cerebellum",
        description: "Purkinje cells are the principal output neurons of the cerebellar cortex and use GABA as their sole neurotransmitter. Their axons project to the deep cerebellar nuclei (DCN), which they inhibit tonically. Modulation of Purkinje cell firing by cerebellar circuitry transiently releases the DCN from inhibition, allowing precisely timed excitatory output that corrects ongoing movements and refines motor sequences through error-driven learning.||Purkinje cells are selectively vulnerable to alcohol toxicity. Chronic high-dose alcohol exposure causes Purkinje cell loss, producing a characteristic cerebellar syndrome of gait ataxia, limb dysmetria, and truncal instability. Even acute alcohol intoxication transiently disrupts Purkinje cell function, reproducing these signs clinically."
      }
    ]
  },
  noradrenaline: {
    symbol: "NA",
    color: "#6080b4",
    description: "Noradrenaline (norepinephrine) is synthesised exclusively in a small number of brainstem nuclei, the most important being the locus coeruleus, which projects to nearly every region of the brain and spinal cord. It regulates the global level of cortical arousal and modulates signal-to-noise ratio across brain circuits in response to salient or threatening stimuli. Its effects on prefrontal cortex function are dose-dependent in a manner directly relevant to ADHD pharmacology.",
    regions: ["Locus Coeruleus", "PFC", "Amygdala", "Hippocampus", "Hypothalamus"],
    regionEdges: [
      {
        from: "Locus Coeruleus", to: "PFC",
        description: "Noradrenaline acts on postsynaptic alpha-2A receptors in the PFC to strengthen the persistent firing of pyramidal neurons during working memory tasks. This effect follows an inverted-U relationship with dose: moderate alpha-2A stimulation strengthens PFC function, while higher noradrenaline levels recruit alpha-1 receptors that activate intracellular signalling cascades and impair the same neuronal activity. This switch from enhancing to impairing function as noradrenaline rises is central to understanding why severe stress degrades cognition.||Guanfacine and clonidine, alpha-2 agonists, improve prefrontal attention and working memory in ADHD and PTSD by restoring optimal alpha-2A stimulation. Atomoxetine, a selective noradrenaline reuptake inhibitor, similarly improves ADHD by raising noradrenaline levels in the PFC without the cardiovascular effects of non-selective agents."
      },
      {
        from: "Locus Coeruleus", to: "Amygdala",
        description: "Noradrenaline released in the basolateral amygdala during emotionally arousing events acts on beta-adrenergic receptors to strengthen the consolidation of emotional memories. This mechanism appears to be a key reason traumatic memories are more persistent and vivid than neutral ones. Beta-adrenergic receptor activation in the amygdala engages the cAMP-PKA signalling cascade, which enhances synaptic plasticity at the time of memory formation.||Propranolol (a non-selective beta-blocker) has been investigated as a means of attenuating traumatic memory consolidation when administered within hours of a traumatic event, based on this mechanism. Results from clinical trials have been mixed, and the approach remains investigational rather than established practice. Beta-blockers are, however, widely used for performance anxiety, where they attenuate peripheral symptoms of arousal."
      },
      {
        from: "Locus Coeruleus", to: "Hippocampus",
        description: "Noradrenaline from the locus coeruleus facilitates long-term potentiation in the hippocampus through beta-adrenergic receptor activation, which raises cAMP and enhances the expression of LTP by promoting AMPA receptor insertion and protein synthesis. This provides a mechanism by which novelty and arousal gate what gets encoded into long-term memory, as LC neurons fire preferentially to unexpected or significant stimuli.||The observation that emotionally arousing material is better remembered than neutral material of equal difficulty reflects, in part, this noradrenergic gating of hippocampal plasticity. SNRIs, which block both the serotonin and noradrenaline transporters, may engage this pathway in their antidepressant action."
      },
      {
        from: "Locus Coeruleus", to: "Hypothalamus",
        description: "Noradrenergic projections from the locus coeruleus to the hypothalamus activate the paraventricular nucleus to secrete CRH, triggering the HPA axis and downstream cortisol release. Simultaneously, LC output to the lateral hypothalamus activates the sympathetic nervous system via descending projections, producing the cardiovascular and metabolic changes of the acute stress response.||Chronic activation of this circuit, as seen in PTSD and severe depression, maintains chronically elevated cortisol that damages hippocampal neurons over time. SNRIs and tricyclic antidepressants that increase noradrenergic tone in this pathway are among the treatments used for both depression and anxiety disorders."
      }
    ]
  },
  acetylcholine: {
    symbol: "ACh",
    color: "#c0884a",
    description: "Acetylcholine is released by two anatomically distinct central systems with different targets and functions. The basal forebrain cholinergic system projects to the cortex and hippocampus, regulating attention and memory encoding. The brainstem cholinergic nuclei project to the thalamus, regulating arousal and the sleep-wake cycle. At the neuromuscular junction, acetylcholine is the obligatory transmitter for all voluntary muscle contraction.",
    regions: ["Basal Forebrain", "Brainstem", "Hippocampus", "Cortex", "Striatum", "Thalamus"],
    regionEdges: [
      {
        from: "Basal Forebrain", to: "Cortex",
        description: "The nucleus basalis of Meynert sends widespread cholinergic projections to the neocortex, where acetylcholine acts through muscarinic M1 and nicotinic receptors to increase the responsiveness of cortical neurons to sensory inputs while suppressing spontaneous background firing. This increases the cortical signal-to-noise ratio and is necessary for sustained, directed attention.||The nucleus basalis of Meynert is among the earliest and most severely affected structures in Alzheimer's disease, with 70-90% neuronal loss in late-stage cases. This depletion of cortical acetylcholine is a primary substrate of the attentional and memory deficits that characterise the disease. Acetylcholinesterase inhibitors (donepezil, rivastigmine, galantamine) treat Alzheimer's symptoms by slowing ACh breakdown."
      },
      {
        from: "Basal Forebrain", to: "Hippocampus",
        description: "The medial septal nucleus sends cholinergic and GABAergic projections to the hippocampus that drive the hippocampal theta rhythm (4-10 Hz). Theta oscillations are prominent during active exploration, spatial navigation, and the encoding of new declarative memories, and are thought to create a temporal framework that coordinates the plasticity rules governing LTP. Disrupting this input pharmacologically impairs hippocampal-dependent learning.||Scopolamine, a muscarinic antagonist that blocks septal cholinergic input to the hippocampus, produces a reversible amnestic syndrome in healthy volunteers that closely mimics the memory deficits of early Alzheimer's disease, confirming the importance of this projection for memory formation."
      },
      {
        from: "Brainstem", to: "Thalamus",
        description: "The laterodorsal tegmental (LDT) and pedunculopontine tegmental (PPT) nuclei in the brainstem project cholinergic fibres to the thalamus, where acetylcholine shifts relay neurons from the bursting mode of NREM sleep to the tonic firing mode of wakefulness and REM sleep. This switch enables thalamocortical transmission of sensory information.||During REM sleep, when brainstem cholinergic activity is highest, thalamocortical circuits are active in a pattern resembling wakefulness, generating the vivid perceptual experiences of dreaming. Anticholinergic drugs (scopolamine, diphenhydramine) suppress REM sleep and can cause confusion, particularly in older adults whose baseline cholinergic tone is already reduced."
      },
      {
        from: "Striatum", to: "Striatum",
        description: "Tonically active cholinergic interneurons in the striatum (approximately 1-2% of all striatal cells but with expansive axonal arborisations) modulate the activity of medium spiny neurons and regulate dopamine release from striatal terminals. These interneurons pause their tonic firing briefly in response to conditioned reward cues, and this pause is thought to gate dopamine-dependent synaptic plasticity that underlies habit learning.||The cholinergic-dopaminergic balance in the striatum is disturbed in both Parkinson's disease (dopamine loss with relative cholinergic excess) and Tourette syndrome. Anticholinergic drugs were the primary treatment for Parkinson's before dopamine replacement was available, because reducing cholinergic tone partially compensated for the lost dopamine."
      }
    ]
  }
};

const regionDescriptions = {
  "PFC":
    "The prefrontal cortex occupies the anterior portion of the frontal lobe and represents the most recently evolved region of the human brain. It contains several anatomically and functionally distinct subregions, including the dorsolateral PFC (dlPFC), ventromedial PFC (vmPFC), and orbitofrontal cortex (OFC), each with distinct connectivity and specialisation." +
    "||" +
    "The dlPFC is central to working memory, the ability to hold and manipulate information over seconds while using it to guide behaviour. The vmPFC integrates emotional valuation and reward history into decision-making. The OFC encodes the current value of stimuli and is required for updating behaviour when reward contingencies change. Together these regions provide top-down regulation of subcortical structures, including the amygdala, suppressing reflexive emotional responses in favour of deliberate action." +
    "||" +
    "Prefrontal dysfunction underlies the impulsivity and inattention of ADHD, the disorganised thinking and working memory deficits of schizophrenia, and the impaired inhibitory control that perpetuates addiction. Both dopamine and noradrenaline modulate dlPFC function through an inverted-U dose-response relationship: optimal stimulation enhances cognition, but deviation in either direction impairs it.",

  "Striatum":
    "The striatum is the largest structure of the basal ganglia and serves as its principal input nucleus. It comprises two functionally distinct divisions: the dorsal striatum (caudate nucleus and putamen) and the ventral striatum, which includes the nucleus accumbens." +
    "||" +
    "The dorsal striatum receives convergent glutamatergic input from the cortex and dopaminergic input from the substantia nigra. This integration underlies the selection and reinforcement of motor habits and action sequences. The ventral striatum, particularly the nucleus accumbens, receives dopaminergic input from the VTA and is the primary site of reward prediction-error signalling in the mesolimbic system. When dopamine floods the nucleus accumbens in response to unexpected reward, it signals that an action produced a better-than-predicted outcome, strengthening the behaviour." +
    "||" +
    "In Huntington's disease, medium spiny neurons in the striatum degenerate progressively, producing a combination of involuntary choreiform movements (from early indirect-pathway loss) and later cognitive decline. In addiction, repeated drug-induced dopamine release in the nucleus accumbens drives compulsive drug-seeking by hijacking the normal reinforcement learning circuit.",

  "VTA":
    "The ventral tegmental area is a midbrain structure situated medial to the substantia nigra, containing several groups of dopaminergic and non-dopaminergic neurons. Its dopamine neurons project via the mesolimbic and mesocortical pathways to the ventral striatum, amygdala, hippocampus, and prefrontal cortex." +
    "||" +
    "VTA dopamine neurons encode a teaching signal known as the reward prediction error. They respond with burst firing when outcomes exceed predictions, with inhibition below baseline when outcomes fall short, and with no net change when outcomes match predictions precisely. This pattern, demonstrated by Wolfram Schultz in non-human primates and replicated extensively in humans with fMRI, constitutes the neural substrate of reinforcement learning and is the basis for temporal-difference models of learning in computational neuroscience." +
    "||" +
    "All major drugs of abuse converge on the VTA-accumbens circuit. Opioids disinhibit VTA dopamine neurons by suppressing local GABAergic interneurons. Cocaine and amphetamines block or reverse DAT at the terminal. Nicotine activates nicotinic ACh receptors on VTA neurons directly. This convergence explains why diverse pharmacological agents produce a common phenotype of dependence.",

  "SNc":
    "The substantia nigra pars compacta is a midbrain nucleus whose neurons contain neuromelanin, a pigment formed from dopamine oxidation that gives the structure its characteristic dark appearance on post-mortem examination. It is anatomically adjacent to the substantia nigra pars reticulata, the GABAergic output nucleus of the basal ganglia." +
    "||" +
    "SNc dopamine neurons project via the nigrostriatal pathway to the putamen and caudate, where dopamine facilitates movement initiation by modulating the balance between the direct (go) and indirect (no-go) basal ganglia pathways. Adequate dopamine in the putamen preferentially activates the direct pathway, which through sequential inhibition ultimately disinhibits the thalamus and enables intended movements. Loss of this input creates an imbalance favouring the indirect pathway, producing the movement suppression characteristic of parkinsonism." +
    "||" +
    "Parkinson's disease results from progressive SNc neuron death, with Lewy body pathology (alpha-synuclein aggregates) preceding and accompanying neuronal loss. Motor symptoms become clinically apparent after approximately 60-70% of striatal dopaminergic terminals are lost, because compensatory mechanisms including receptor upregulation mask earlier deficits. L-DOPA, the immediate biosynthetic precursor of dopamine, crosses the blood-brain barrier and is decarboxylated to dopamine in surviving terminals, remaining the most effective treatment despite developing motor complications over years of use.",

  "Amygdala":
    "The amygdala is a collection of nuclei in the anteromedial temporal lobe. Its major subdivisions are the basolateral complex (lateral, basal, and accessory basal nuclei) and the centromedial group (central and medial nuclei), which have distinct connectivity and functions." +
    "||" +
    "The basolateral complex receives highly processed sensory input from the thalamus (rapid, low-fidelity) and cortex (slower, high-fidelity) and performs rapid threat appraisal. When a stimulus is assessed as threatening, the central amygdala coordinates fear responses through projections to the hypothalamus (autonomic activation), brainstem (freezing, startle), and basal forebrain (arousal). The amygdala also assigns emotional salience to memories during encoding, a process dependent on noradrenergic input from the locus coeruleus and modulated by glucocorticoids." +
    "||" +
    "The basolateral amygdala is the site where Pavlovian fear associations are formed and maintained. PTSD is characterised by amygdala hyperreactivity and failure of prefrontal extinction mechanisms. In major depression, amygdala responses to negative stimuli are exaggerated and persist longer than in healthy individuals. SSRIs reduce amygdala reactivity over weeks of treatment, and this normalisation is thought to contribute to their therapeutic efficacy.",

  "Raphe":
    "The raphe nuclei are a series of midline brainstem structures extending from the medulla to the midbrain. The dorsal raphe nucleus, located in the periaqueductal grey of the midbrain, is the largest and is the primary source of forebrain serotonin. The median raphe nucleus projects preferentially to the hippocampus and limbic system." +
    "||" +
    "Serotonin neurons in the dorsal raphe project diffusely to nearly all forebrain structures, where they modulate the activity of local circuits rather than transmitting point-to-point information. Their firing rate is influenced by autoreceptors on their own dendrites (5-HT1A), which provide negative feedback and limit serotonin output. These autoreceptors desensitise during chronic SSRI treatment, a process thought to underlie the delayed therapeutic response by allowing net serotonin output to rise progressively over weeks." +
    "||" +
    "Depletion of serotonin with tryptophan-poor diets reliably increases negative emotional bias in humans, and variants of the serotonin transporter gene (5-HTTLPR) influence amygdala reactivity to threat, supporting a causal role for serotonin in mood regulation. However, the chemical imbalance model of depression as simple serotonin deficiency is an oversimplification; serotonin modulates complex circuits whose dysfunction in depression involves multiple neurotransmitter systems.",

  "Hippocampus":
    "The hippocampus is a paired structure in the medial temporal lobe whose gross anatomy, with its characteristic curving shape, led to its naming after the seahorse. It is composed of the dentate gyrus, CA fields (CA1-CA4), and subiculum, organised in a trisynaptic circuit that is among the most studied in all of neuroscience." +
    "||" +
    "The hippocampus is essential for the initial encoding and subsequent consolidation of declarative memories (episodic and semantic). It operates via long-term potentiation, the activity-dependent strengthening of synapses first described by Bliss and Lomo in 1973, which requires NMDA receptor activation at CA3-CA1 synapses. Place cells in the hippocampus encode the animal's spatial position, forming a cognitive map of the environment that supports spatial navigation. During NREM sleep, hippocampal sharp-wave ripples coordinate the reactivation of recent memory traces and their transfer to neocortical networks." +
    "||" +
    "The hippocampus is among the earliest structures affected in Alzheimer's disease, explaining why new memory formation fails while remote memories consolidated years earlier are relatively spared in early stages. Chronic glucocorticoid exposure, as occurs in severe depression and PTSD, reduces hippocampal volume via multiple mechanisms including suppression of neurogenesis in the dentate gyrus.",

  "Cortex":
    "The cerebral cortex is the thin, highly folded sheet of neurons covering the surface of the cerebral hemispheres. Its folding, which increases surface area approximately threefold compared with a smooth surface, allows the ~16 billion neurons of the human cortex to fit within the cranial vault." +
    "||" +
    "The cortex is organised into six layers with distinct cell types, connectivity, and function. Layers 2-3 primarily contain commissural and associational projection neurons; layer 5 contains large pyramidal cells projecting to subcortical targets; layer 6 provides feedback to the thalamus. Different cortical areas are specialised for sensory processing, motor control, language, spatial reasoning, and executive function, connected to each other and to subcortical structures through extensive white matter tracts. Local GABAergic interneurons in every cortical layer regulate pyramidal neuron excitability and generate oscillations essential for information processing." +
    "||" +
    "Cortical grey matter volume in the PFC and temporal lobe is reduced in schizophrenia, reflecting loss of synaptic neuropil rather than outright neuronal death. Epilepsy represents a pathological imbalance of cortical excitation over inhibition. Cortical spreading depression, a wave of transient neuronal depolarisation followed by sustained suppression, is the neurophysiological correlate of migraine aura.",

  "Thalamus":
    "The thalamus is a paired diencephalic structure situated at the centre of the cerebral hemispheres, connected to the cortex by a massive bidirectional projection system. It is organised into more than 50 distinct nuclei, each with defined cortical targets and afferent inputs." +
    "||" +
    "Sensory relay nuclei forward processed sensory information to primary cortical areas: the lateral geniculate nucleus relays visual input to V1, the medial geniculate nucleus relays auditory input to A1, and the ventral posterior nucleus relays somatosensory input to S1. Motor thalamic nuclei receive input from the basal ganglia and cerebellum and project to motor cortex. The thalamic reticular nucleus, a GABAergic shell, gates thalamocortical transmission and generates sleep spindles during NREM sleep. Higher-order thalamic nuclei (pulvinar, mediodorsal) participate in corticothalamic loops subserving attention and cognition." +
    "||" +
    "Bilateral thalamic damage causes severe disorders of consciousness, reflecting the thalamus's role in maintaining thalamocortical loops necessary for awareness. Thalamic infarcts produce modality-specific sensory losses corresponding to the affected relay nucleus. Thalamic deep brain stimulation is used for essential tremor and is under investigation for disorders of consciousness.",

  "Cerebellum":
    "Despite comprising only approximately 10% of total brain volume, the cerebellum contains roughly half of all neurons in the central nervous system, owing to the extremely dense packing of cerebellar granule cells. It is located in the posterior cranial fossa, posterior to the brainstem, with which it communicates via three pairs of cerebellar peduncles." +
    "||" +
    "The cerebellum receives a copy of every motor command issued by the cortex (efference copy) via the cortico-ponto-cerebellar pathway, and simultaneously receives sensory feedback about actual body position via the spinocerebellar tracts. It compares the intended with the actual movement, computing an error signal that is used to correct ongoing and future movements. Purkinje cells, the sole output neurons of the cerebellar cortex, project to the deep cerebellar nuclei, which issue corrective signals to motor cortex via the thalamus. The cerebellum also plays a central role in motor learning, gradually refining movements through repeated error signals encoded by climbing fibre inputs from the inferior olive." +
    "||" +
    "Cerebellar lesions produce a characteristic syndrome of ipsilateral limb ataxia, intention tremor, dysmetria, and dysdiadochokinesia. Alcohol preferentially damages Purkinje cells, producing the cerebellar syndrome of chronic alcoholism. There is converging evidence that the cerebellum also participates in language, working memory, and affective processing, consistent with its extensive connectivity with prefrontal and limbic regions.",

  "Locus Coeruleus":
    "The locus coeruleus is a bilateral nucleus in the pontine tegmentum containing approximately 15,000-20,000 neurons per side in humans, yet projecting noradrenaline to virtually every region of the brain and spinal cord. Its name derives from the blue-grey pigmentation of neuromelanin visible in fresh post-mortem tissue." +
    "||" +
    "LC neurons fire phasically in response to salient, novel, or threatening stimuli and tonically at low rates during quiet wakefulness. Phasic LC activity is thought to promote flexible, exploratory behaviour and enhance the neural gain of responses to relevant stimuli. Tonic LC activity is inversely related to prefrontal performance: too low produces inattention; too high, during acute stress, impairs PFC function by recruiting alpha-1 rather than alpha-2 adrenergic receptors. Opioid receptors on LC neurons mediate the sedating and analgesic effects of opioids; abrupt opioid withdrawal precipitates a noradrenergic storm as LC neurons disinhibit." +
    "||" +
    "The LC is among the first regions to show Lewy body pathology in Parkinson's disease, even before SNc involvement. Its degeneration contributes to the depression, anxiety, and autonomic dysfunction that frequently accompany motor symptoms. In PTSD, LC hyperactivity may underlie the hyperarousal and exaggerated startle that characterise the disorder.",

  "Hypothalamus":
    "The hypothalamus is a small diencephalic structure situated below the thalamus and above the pituitary stalk, weighing approximately 4 grams in humans. Despite its modest size, it contains more than 20 discrete nuclei that collectively regulate the majority of the body's homeostatic systems." +
    "||" +
    "The hypothalamus controls energy balance through the arcuate nucleus (integrating leptin, ghrelin, and other metabolic signals), circadian timing through the suprachiasmatic nucleus (synchronised by retinal light input via the retinohypothalamic tract), temperature regulation through the preoptic area, fluid balance through osmoreceptors that regulate vasopressin release, and reproduction through GnRH-secreting neurons. It controls the anterior pituitary through releasing hormones (CRH, TRH, GnRH, GHRH) delivered via the portal blood supply, and controls the posterior pituitary directly through neuronal axons that secrete vasopressin and oxytocin." +
    "||" +
    "The HPA axis, initiated by hypothalamic CRH secretion, is chronically dysregulated in major depression and PTSD. Sustained cortisol elevation from HPA hyperactivity damages hippocampal neurons through glucocorticoid receptor-mediated mechanisms. Hypothalamic dysfunction underlies several psychiatric manifestations of endocrine disease, including the depression of hypothyroidism and the mood and cognitive effects of hypercortisolaemia.",

  "Basal Forebrain":
    "The basal forebrain refers to a collection of structures at the base of the cerebral hemispheres, including the nucleus basalis of Meynert, the medial septum, the diagonal band of Broca, and the nucleus accumbens. The cholinergic neurons of the nucleus basalis and medial septum constitute the primary source of acetylcholine to the neocortex and hippocampus, respectively." +
    "||" +
    "Cholinergic projections from the nucleus basalis of Meynert innervate virtually all of the neocortex, releasing acetylcholine to enhance the signal-to-noise ratio during attentive states by facilitating responses to relevant stimuli and suppressing spontaneous background activity. The medial septum drives the hippocampal theta rhythm through a combination of cholinergic and GABAergic projections. Both systems are critically required for the encoding of new declarative memories." +
    "||" +
    "Basal forebrain cholinergic neurons are among the earliest and most severely affected in Alzheimer's disease. Post-mortem studies consistently show 70-90% neuronal loss in the nucleus basalis in late-stage cases. This loss of cholinergic innervation directly contributes to the attentional failures and inability to form new memories that characterise the clinical syndrome. All approved symptomatic treatments for Alzheimer's dementia (donepezil, rivastigmine, galantamine) act by inhibiting acetylcholinesterase, thereby prolonging the effect of acetylcholine released by surviving neurons.",

  "Brainstem":
    "The brainstem is the most phylogenetically ancient part of the brain, comprising the midbrain, pons, and medulla oblongata in continuity with the spinal cord. It contains the cell bodies of cranial nerves III-XII, the ascending arousal system, the critical autonomic centres for respiration and cardiovascular regulation, and the origin nuclei of several major neuromodulatory systems." +
    "||" +
    "The medulla contains the pre-Botzinger complex, which generates the respiratory rhythm, and cardiovascular centres that regulate heart rate and blood pressure. The pons contains the locus coeruleus (noradrenaline), the raphe nuclei (serotonin), and the pontine nuclei that relay cortical signals to the cerebellum. The midbrain contains the VTA and SNc (dopamine), the superior and inferior colliculi (sensorimotor integration), and the periaqueductal grey (pain modulation and defensive behaviour). The reticular formation, running through all three brainstem levels, integrates sensory inputs and regulates arousal via the ascending reticular activating system." +
    "||" +
    "Opioid overdose kills by suppressing respiratory rhythm generators in the brainstem medulla, a mechanism reversed by naloxone. Even small haemorrhages in the brainstem can be life-threatening owing to the density of critical structures within a compact volume. Brainstem death, defined as the irreversible loss of all brainstem reflexes with confirmed apnoea, is the neurological criterion for death in most jurisdictions."
};

// ── Guided Scenarios ──────────────────────────────────────────────────────
// Each scenario loads a specific NT, highlights a region, and adds context
const scenarios = [
  {
    id: "cocaine", nt: "dopamine", focusRegion: "Striatum",
    label: "Cocaine & Dopamine",
    title: "What happens during a cocaine high?",
    summary: "Cocaine is a dopamine reuptake inhibitor that blocks the dopamine transporter (DAT) at presynaptic terminals throughout the brain, most consequentially in the nucleus accumbens. This blockade prevents the normal clearance of dopamine from the synapse, producing sustained high synaptic dopamine concentrations. The resulting supraphysiological prediction-error signal far exceeds anything generated by natural rewards, strongly reinforcing drug-seeking behaviour and, with repeated use, inducing neuroadaptations that leave the reward system hyposensitive to natural stimuli and dependent on the drug to approach normal function.",
    quiz: [
      {
        question: "Which transporter does cocaine block to produce its effects?",
        options: ["SERT", "DAT", "NET"],
        correct: 1,
        explanation: "Cocaine blocks the dopamine transporter (DAT), preventing dopamine reuptake from the synapse. This floods the nucleus accumbens, producing the intense rewarding effect."
      },
      {
        question: "Which brain region receives the dopamine surge responsible for cocaine's reinforcing effect?",
        options: ["Prefrontal cortex", "Amygdala", "Nucleus accumbens (ventral striatum)"],
        correct: 2,
        explanation: "The nucleus accumbens in the ventral striatum is the core reward structure. Dopamine flooding here signals 'better than expected' and drives compulsive repetition of the behaviour."
      },
      {
        question: "Why is cocaine addiction understood as a disorder of learning, not just willpower?",
        options: [
          "Cocaine permanently destroys dopamine neurons",
          "Cocaine hijacks the same dopamine prediction-error signal that normally drives learning, creating overwhelming associations",
          "Cocaine blocks opioid receptors, causing physical dependence"
        ],
        correct: 1,
        explanation: "Cocaine floods the nucleus accumbens with dopamine far beyond any natural reward. This hijacks the brain's reward-learning signal, creating powerful associations between drug cues and expected reward — the same circuitry used for all reinforcement learning."
      }
    ]
  },
  {
    id: "ssri", nt: "serotonin", focusRegion: "Raphe",
    label: "SSRIs & Serotonin",
    title: "How do antidepressants work?",
    summary: "SSRIs selectively block the serotonin transporter (SERT), increasing the half-life of serotonin in the synapse and raising extracellular serotonin levels throughout the brain. Despite this pharmacological effect occurring within hours of the first dose, clinical improvement in depression typically requires 2-4 weeks. The delay reflects the time needed for adaptive changes: desensitisation of 5-HT1A autoreceptors on raphe neurons (which initially suppress serotonin output in response to SERT blockade), changes in postsynaptic receptor sensitivity, and possibly neuroplastic changes in limbic circuits.",
    quiz: [
      {
        question: "What is the primary mechanism of SSRIs?",
        options: [
          "They stimulate serotonin synthesis in the raphe nuclei",
          "They block SERT, preventing serotonin reuptake from the synapse",
          "They activate 5-HT1A receptors directly"
        ],
        correct: 1,
        explanation: "SSRIs selectively inhibit SERT (the serotonin transporter), which is responsible for clearing serotonin from the synapse. Blocking SERT increases the time serotonin is available to act on postsynaptic receptors."
      },
      {
        question: "Why do SSRIs take 2–4 weeks to produce antidepressant effects even though SERT is blocked within hours?",
        options: [
          "SERT requires weeks to be fully blocked at therapeutic doses",
          "Downstream changes — such as hippocampal neurogenesis and receptor desensitisation — take weeks to develop",
          "Serotonin levels take weeks to reach effective concentrations"
        ],
        correct: 1,
        explanation: "SERT is blocked within hours, but therapeutic benefit requires slower downstream adaptations: desensitisation of 5-HT1A autoreceptors (allowing greater serotonin output), normalisation of amygdala reactivity, and possibly hippocampal neurogenesis — all taking 2–4 weeks."
      },
      {
        question: "Which raphe projection is most important for SSRIs' anxiolytic (anti-anxiety) effect?",
        options: [
          "Raphe → Hypothalamus (appetite/sleep regulation)",
          "Raphe → Amygdala (threat dampening)",
          "Raphe → Striatum (motor control)"
        ],
        correct: 1,
        explanation: "The Raphe–Amygdala projection is critical for anxiety. Serotonin dampens amygdala reactivity to threatening stimuli. When serotonin signalling is low, the amygdala over-responds, producing anxiety. SSRIs normalise this pathway over weeks."
      }
    ]
  },
  {
    id: "alzheimers", nt: "acetylcholine", focusRegion: "Basal Forebrain",
    label: "Alzheimer's & ACh",
    title: "Why does Alzheimer's cause memory loss?",
    summary: "Alzheimer's disease is characterised by progressive cortical and subcortical neurodegeneration driven by amyloid-beta plaques and neurofibrillary tau tangles. Among the earliest and most severe neuronal losses is the basal forebrain cholinergic system, particularly the nucleus basalis of Meynert. Loss of cholinergic innervation to the cortex and hippocampus directly impairs attention and the encoding of new declarative memories. Acetylcholinesterase inhibitors (donepezil, rivastigmine, galantamine) provide modest symptomatic benefit by slowing ACh degradation, but do not modify the underlying disease course.",
    quiz: [
      {
        question: "Which nucleus is among the first and most severely affected in Alzheimer's disease?",
        options: [
          "Raphe dorsalis",
          "Locus coeruleus",
          "Nucleus basalis of Meynert"
        ],
        correct: 2,
        explanation: "The nucleus basalis of Meynert is the main source of acetylcholine to the cortex and hippocampus. It is devastated early in Alzheimer's — up to 90% of neurons are lost in late stages — directly causing the attentional and memory deficits that define the disease."
      },
      {
        question: "How does donepezil work to treat Alzheimer's symptoms?",
        options: [
          "It stimulates ACh synthesis in remaining neurons",
          "It inhibits acetylcholinesterase, prolonging ACh action at the synapse",
          "It blocks NMDA receptors to reduce excitotoxic damage"
        ],
        correct: 1,
        explanation: "Donepezil inhibits acetylcholinesterase (AChE), the enzyme that breaks down ACh in the synapse. By slowing degradation, it prolongs the effect of whatever ACh is still being released by surviving neurons. It doesn't cure the disease — it compensates for lost neurons."
      },
      {
        question: "Why does Alzheimer's impair new memory formation more severely than recall of distant memories, early in the disease?",
        options: [
          "Old memories are stored in the brainstem, which is spared early",
          "New memory formation requires active cholinergic input; old memories are already consolidated in cortical networks",
          "Acetylcholine is only needed for encoding, not for recall at any time point"
        ],
        correct: 1,
        explanation: "Forming new memories requires active cholinergic input from the basal forebrain to drive hippocampal encoding. Old memories have already undergone systems consolidation — they're stored as cortical synaptic patterns that don't need ongoing cholinergic support, so they survive longer."
      }
    ]
  },
  {
    id: "parkinsons", nt: "dopamine", focusRegion: "SNc",
    label: "Parkinson's & Dopamine",
    title: "What causes Parkinson's disease?",
    summary: "Parkinson's disease is a progressive neurodegenerative disorder defined by the death of dopaminergic neurons in the substantia nigra pars compacta, with Lewy body pathology (misfolded alpha-synuclein) present in surviving neurons. The consequent loss of striatal dopamine disrupts the balance between the direct and indirect basal ganglia pathways, producing the cardinal motor features of rest tremor, rigidity, and bradykinesia. Motor symptoms typically emerge only after 60-70% of striatal dopaminergic terminals are lost. L-DOPA, converted to dopamine in residual nigrostriatal terminals, remains the most effective symptomatic treatment, though motor fluctuations and dyskinesias develop with prolonged use as the dopaminergic substrate continues to decline.",
    quiz: [
      {
        question: "Which dopamine pathway degenerates in Parkinson's disease?",
        options: [
          "Mesolimbic pathway (VTA → nucleus accumbens)",
          "Mesocortical pathway (VTA → PFC)",
          "Nigrostriatal pathway (SNc → dorsal striatum)"
        ],
        correct: 2,
        explanation: "Parkinson's is caused by the progressive death of dopaminergic neurons in the substantia nigra pars compacta (SNc). These project via the nigrostriatal pathway to the dorsal striatum (putamen/caudate), where dopamine enables smooth voluntary movement."
      },
      {
        question: "Why is dopamine itself not given as a treatment for Parkinson's?",
        options: [
          "Dopamine causes too much reward activation in the nucleus accumbens",
          "Dopamine cannot cross the blood-brain barrier",
          "Dopamine is broken down too quickly in the bloodstream to be useful"
        ],
        correct: 1,
        explanation: "Dopamine is a polar, charged molecule that cannot cross the blood-brain barrier. L-DOPA (levodopa) is the amino acid precursor to dopamine that does cross the barrier, then is converted to dopamine inside the brain by DOPA decarboxylase."
      },
      {
        question: "Symptoms of Parkinson's only appear after approximately what proportion of SNc neurons have been lost?",
        options: ["20%", "50%", "80%"],
        correct: 2,
        explanation: "Because the brain compensates for dopamine loss through upregulation of remaining neurons and receptors, motor symptoms (tremor, rigidity, bradykinesia) typically don't appear until ~80% of SNc dopamine neurons have already degenerated. This large 'silent' phase makes early intervention and neuroprotection difficult."
      }
    ]
  },
  {
    id: "ketamine", nt: "glutamate", focusRegion: "PFC",
    label: "Ketamine & Glutamate",
    title: "Why does ketamine treat depression rapidly?",
    summary: "Ketamine, a non-competitive NMDA receptor antagonist, produces rapid antidepressant effects within hours in patients with treatment-resistant depression. The most widely accepted mechanistic hypothesis holds that ketamine preferentially blocks NMDA receptors on GABAergic interneurons at rest, disinhibiting pyramidal glutamate output and triggering a rapid increase in AMPA receptor-mediated synaptic activity. This is followed by BDNF release and mTORC1-dependent synaptic protein synthesis, rapidly restoring synaptic density in prefrontal circuits that chronic stress and depression have depleted. The rapidity of this effect has reframed thinking about the neurobiology of depression beyond simple monoamine deficiency.",
    quiz: [
      {
        question: "Which glutamate receptor does ketamine block?",
        options: ["AMPA receptor", "NMDA receptor", "mGluR (metabotropic glutamate receptor)"],
        correct: 1,
        explanation: "Ketamine is an NMDA receptor antagonist — it blocks the ion channel by entering the pore when it opens (an 'open-channel blocker'). This is the same mechanism that gives it anaesthetic and dissociative properties at higher doses."
      },
      {
        question: "Why does ketamine produce antidepressant effects within hours, while SSRIs take weeks?",
        options: [
          "Ketamine directly raises serotonin levels faster than SSRIs can",
          "Ketamine disinhibits glutamate release, triggering a rapid burst of synaptic plasticity and AMPA receptor insertion",
          "Ketamine crosses the blood-brain barrier faster than SSRIs"
        ],
        correct: 1,
        explanation: "By blocking NMDA receptors on GABAergic interneurons, ketamine briefly disinhibits glutamate output from pyramidal cells in the PFC. The resulting burst of synaptic activity triggers AMPA receptor insertion and BDNF release — rapidly rebuilding the prefrontal synaptic connections that chronic depression erodes."
      },
      {
        question: "What does ketamine's rapid antidepressant effect suggest about the nature of depression?",
        options: [
          "That depression is primarily a serotonin deficiency disease",
          "That depression involves disrupted synaptic connectivity in the PFC, not just monoamine levels",
          "That all effective antidepressants must act on glutamate receptors"
        ],
        correct: 1,
        explanation: "Ketamine's rapid efficacy (hours, not weeks) demonstrated that depression can be rapidly reversed by rebuilding synaptic connections — reframing it as a disorder of prefrontal synaptic connectivity rather than simply a serotonin or noradrenaline deficiency. This has driven a new generation of synaptogenic antidepressants."
      }
    ]
  },
  {
    id: "benzos", nt: "gaba", focusRegion: "Cortex",
    label: "Benzodiazepines & GABA",
    title: "How do benzodiazepines reduce anxiety?",
    summary: "Benzodiazepines are positive allosteric modulators of the GABA-A receptor. They bind to the interface between alpha and gamma subunits and increase the frequency of chloride channel opening in response to GABA, without activating the receptor in the absence of GABA. This enhancement of GABAergic inhibition throughout the brain produces anxiolytic, sedative, anticonvulsant, and muscle-relaxant effects. Tolerance and dependence develop with prolonged use through homeostatic downregulation of GABA-A receptor density and altered subunit composition, so that abrupt withdrawal precipitates a state of reduced GABAergic inhibition that can manifest as seizures.",
    quiz: [
      {
        question: "Benzodiazepines act on which GABA receptor subtype?",
        options: ["GABA-B (Gi-coupled GPCR)", "GABA-A (Cl⁻ ionotropic channel)", "Both GABA-A and GABA-B equally"],
        correct: 1,
        explanation: "Benzodiazepines bind to an allosteric site between the α and γ subunits of the GABA-A receptor — a pentameric Cl⁻ channel. They have no direct effect on GABA-B receptors. GABA-B is targeted by baclofen, a structurally different drug."
      },
      {
        question: "What exactly do benzodiazepines do to GABA-A channel behaviour?",
        options: [
          "They increase the conductance (size) of the Cl⁻ current",
          "They increase the frequency of Cl⁻ channel opening",
          "They increase the duration of each channel opening"
        ],
        correct: 1,
        explanation: "Benzodiazepines are positive allosteric modulators that increase the frequency of Cl⁻ channel opening in response to GABA. This is distinct from barbiturates, which increase the duration of channel opening. Benzodiazepines require GABA to be present — they only potentiate existing GABA signalling, they don't activate the channel alone."
      },
      {
        question: "Why does tolerance develop with long-term benzodiazepine use?",
        options: [
          "The liver metabolises benzodiazepines progressively faster over time",
          "The brain reduces GABA-A receptor density and expression to compensate for the enhanced inhibition",
          "Benzodiazepine binding sites become permanently occupied"
        ],
        correct: 1,
        explanation: "With chronic use, the brain compensates for enhanced GABAergic inhibition by downregulating GABA-A receptor expression and altering subunit composition. This reduces the receptor's sensitivity — meaning more drug is needed for the same effect. Abrupt withdrawal is dangerous because the inhibitory compensation is suddenly removed, risking seizures."
      }
    ]
  }
];

// Expose for learning.js quiz system
window.scenariosData = scenarios;

function glossifyGraphText(text){
  if(!text) return "";
  try {
    return window.glossifyText ? window.glossifyText(text, "graph-gloss-term") : text;
  } catch(e) {
    return text;
  }
}

function attachGraphGlossaryTooltips(container){
  window.attachGlossaryTooltips(
    container,
    "graph-gloss-tooltip",
    document.getElementById("graph-sidebar")
  );
}

let currentTransmitter = null;
let scene, camera, renderer, raycaster, mouse, controls;
let nodeMeshes = [], edgeMeshes = [], labelElements = [];
let animFrameId = null;
let isDragging = false;
let activeNodeId = null;
let activeEdgeId = null;

// Track if user actually moved camera so we don't trigger click on drag end
let pointerDownPos = { x: 0, y: 0 };

// Throttle raycaster checks to avoid excessive calculations
let lastRaycastTime = 0;
const RAYCAST_THROTTLE = 16; // ~60fps

const transmitterTaglines = {
  dopamine:      "Reward prediction · motor control",
  serotonin:     "Mood · threat regulation",
  glutamate:     "Excitation · memory (LTP)",
  gaba:          "Inhibition · network stability",
  noradrenaline: "Arousal · stress · attention",
  acetylcholine: "Attention · memory encoding"
};

document.addEventListener("DOMContentLoaded", () => {
  // Inject taglines into landing cards
  document.querySelectorAll(".transmitter").forEach(el => {
    const type = el.dataset.type;
    if (type && transmitterTaglines[type]) {
      const tag = document.createElement("span");
      tag.className = "tagline";
      tag.textContent = transmitterTaglines[type];
      el.appendChild(tag);
    }
    el.addEventListener("click", () => {
      if (!type) return;
      el.classList.add("is-loading");
      document.querySelector(".landing").classList.add("hidden");
      document.getElementById("graph-page").classList.remove("hidden");
      loadGraph(type);
      setActivePill(type);
      el.classList.remove("is-loading");
    });
  });

  // Scenario cards
  document.querySelectorAll(".scenario-card[data-scenario]").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.scenario;
      const sc = scenarios.find(s => s.id === id);
      if (!sc) return;
      document.querySelector(".landing").classList.add("hidden");
      document.getElementById("graph-page").classList.remove("hidden");
      loadGraph(sc.nt, sc);
      setActivePill(sc.nt);
    });
  });

  document.getElementById("back-btn").addEventListener("click", () => {
    cleanup();
    document.getElementById("graph-page").classList.add("hidden");
    document.querySelector(".landing").classList.remove("hidden");
  });

  // Expose for reference.js (compare table navigation)
  window.loadGraph     = loadGraph;
  window.setActivePill = setActivePill;

  // Expose for explorer.js (story mode + compare edges)
  window.showEdgeDetail = showEdgeDetail;
  window.showRegionDetail = showRegionDetail;
  window.resetView      = resetView;

  // NT switcher pills
  document.querySelectorAll(".nt-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const type = pill.dataset.type;
      if (!type || type === currentTransmitter) return;
      cleanup();
      loadGraph(type);
      setActivePill(type);
    });
  });

  // Comparison table page
  const goCompare = document.getElementById("go-compare-btn");
  const backCompare = document.getElementById("compare-back-btn");
  if(goCompare) {
    goCompare.addEventListener("click", () => {
      document.querySelector(".landing").classList.add("hidden");
      document.getElementById("compare-page").classList.remove("hidden");
    });
    goCompare.addEventListener("keydown", e => {
      if(e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        document.querySelector(".landing").classList.add("hidden");
        document.getElementById("compare-page").classList.remove("hidden");
      }
    });
  }
  if(backCompare) backCompare.addEventListener("click", () => {
    document.getElementById("compare-page").classList.add("hidden");
    document.querySelector(".landing").classList.remove("hidden");
  });
});

function setActivePill(type) {
  document.querySelectorAll(".nt-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.type === type);
  });
}

let resizeHandler = null; // stored so we can remove it on cleanup

function cleanup() {
  if (animFrameId) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }

  // Dispose all mesh geometry and materials
  nodeMeshes.forEach(m => {
    scene && scene.remove(m);
    m.geometry && m.geometry.dispose();
    if(m.material){
      Array.isArray(m.material)
        ? m.material.forEach(mat => mat.dispose())
        : m.material.dispose();
    }
    m.children.forEach(c => {
      c.geometry && c.geometry.dispose();
      c.material && c.material.dispose();
    });
  });

  edgeMeshes.forEach(m => {
    const grp = m.userData.parentGroup;
    if(grp){
      scene && scene.remove(grp);
      grp.children.forEach(c => {
        c.geometry && c.geometry.dispose();
        if(c.material){
          Array.isArray(c.material)
            ? c.material.forEach(mat => mat.dispose())
            : c.material.dispose();
        }
      });
    }
  });

  labelElements.forEach(l => {
    if(l.el && l.el.parentNode) l.el.parentNode.removeChild(l.el);
  });

  nodeMeshes = [];
  edgeMeshes = [];
  labelElements = [];
  currentTransmitter = null;
  activeNodeId = null;
  activeEdgeId = null;

  // Remove resize listener to prevent stale closures accumulating
  if(resizeHandler){
    window.removeEventListener("resize", resizeHandler);
    resizeHandler = null;
  }

  // Dispose controls
  if(controls){
    controls.dispose();
    controls = null;
  }

  // Dispose renderer and remove its canvas from the DOM
  if(renderer){
    renderer.renderLists.dispose();
    renderer.dispose();
    if(renderer.domElement && renderer.domElement.parentNode){
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
    renderer = null;
  }

  // Clear scene
  if(scene){
    while(scene.children.length > 0){
      const obj = scene.children[0];
      scene.remove(obj);
    }
    scene = null;
  }

  camera = null;
  raycaster = null;
}

// -----------------------------------------------------
// HELPER FUNCTIONS FOR HIGHLIGHTING
// -----------------------------------------------------
function showRegionDetail(regionId) {
  activeNodeId = regionId;
  activeEdgeId = null;
  const desc = regionDescriptions[regionId];
  if (!desc) return;

  const detail = document.getElementById("detail-block");
  if (!detail) return;

  // Split on explicit section markers — deterministic, handles abbreviations safely
  const parts = desc.split("||").map(s => s.trim());
  const what = parts[0] || "";
  const func = parts[1] || "";
  const clin = parts[2] || "";

  const nt = transmitters[currentTransmitter];
  // Find connected pathways for this region
  const pathways = nt.regionEdges.filter(e => e.from === regionId || e.to === regionId);

  detail.innerHTML = `
    <div class="detail-enter">
      <div class="detail-region-header">
        <div class="detail-region-name">${regionId}</div>
        <div class="detail-region-type">Brain region</div>
      </div>

      ${what ? `<div class="detail-section">
        <div class="detail-section-label">What it is</div>
        <p class="detail-section-body">${glossifyGraphText(what)}</p>
      </div>` : ''}

      ${func ? `<div class="detail-section">
        <div class="detail-section-label">Function</div>
        <p class="detail-section-body">${glossifyGraphText(func)}</p>
      </div>` : ''}

      ${clin ? `<div class="detail-section detail-section--clinical">
        <div class="detail-section-label">Clinical relevance</div>
        <p class="detail-section-body">${glossifyGraphText(clin)}</p>
      </div>` : ''}

      ${pathways.length ? `<div class="detail-section">
        <div class="detail-section-label">Connected pathways</div>
        <div class="detail-pathway-list">
          ${pathways.map(p => `
            <div class="detail-pathway-chip">
              ${p.from === regionId
                ? `${regionId} <span class="pathway-arrow">→</span> ${p.to}`
                : `${p.from} <span class="pathway-arrow">→</span> ${regionId}`}
            </div>`).join("")}
        </div>
      </div>` : ''}

      <button class="reset-btn" id="reset-detail">Clear selection</button>
    </div>
  `;

  attachGraphGlossaryTooltips(detail);

  const nt2 = transmitters[currentTransmitter];
  const connectedNodes = new Set([regionId]);
  nt2.regionEdges.forEach(edge => {
    if (edge.from === regionId) connectedNodes.add(edge.to);
    if (edge.to === regionId) connectedNodes.add(edge.from);
  });

  nodeMeshes.forEach(m => {
    const isConnected = connectedNodes.has(m.userData.id);
    m.material.opacity = isConnected ? 1 : 0.2;
    if(m.children[0]) m.children[0].material.opacity = isConnected ? 0.4 : 0.05;
  });
  labelElements.forEach(l => {
    l.el.style.opacity = connectedNodes.has(l.id) ? "1" : "0.2";
  });
  edgeMeshes.forEach(clickMesh => {
    const visualMesh = clickMesh.userData.parentGroup.children[0];
    const isConnected = clickMesh.userData.from === regionId || clickMesh.userData.to === regionId;
    visualMesh.material.opacity = isConnected ? 1.0 : 0.05;
  });
  document.querySelectorAll("#graph-regions li").forEach(li => {
    li.classList.toggle("active", li.dataset.region === regionId);
  });
  document.getElementById("reset-detail").onclick = resetView;
}

function showEdgeDetail(fromId, toId, description) {
  activeEdgeId = `${fromId}-${toId}`;
  activeNodeId = null;

  const detail = document.getElementById("detail-block");
  if (!detail) return;

  // Split on explicit || marker — same pattern as regionDescriptions
  const parts = description.split("||").map(s => s.trim());
  const mech = parts[0] || "";
  const clin = parts[1] || "";

  detail.innerHTML = `
    <div class="detail-enter">
      <div class="detail-region-header">
        <div class="detail-region-name">${fromId} → ${toId}</div>
        <div class="detail-region-type">Pathway</div>
      </div>

      <div class="detail-section">
        <div class="detail-section-label">Mechanism</div>
        <p class="detail-section-body">${glossifyGraphText(mech)}</p>
      </div>

      ${clin ? `<div class="detail-section detail-section--clinical">
        <div class="detail-section-label">Clinical relevance</div>
        <p class="detail-section-body">${glossifyGraphText(clin)}</p>
      </div>` : ''}

      <button class="reset-btn" id="reset-detail">Clear selection</button>
    </div>
  `;

  attachGraphGlossaryTooltips(detail);

  document.querySelectorAll("#graph-regions li").forEach(li => li.classList.remove("active"));

  nodeMeshes.forEach(m => {
    const isConnected = m.userData.id === fromId || m.userData.id === toId;
    m.material.opacity = isConnected ? 1 : 0.2;
    if(m.children[0]) m.children[0].material.opacity = isConnected ? 0.4 : 0.05;
  });
  labelElements.forEach(l => {
    l.el.style.opacity = (l.id === fromId || l.id === toId) ? "1" : "0.2";
  });
  edgeMeshes.forEach(clickMesh => {
    const visualMesh = clickMesh.userData.parentGroup.children[0];
    visualMesh.material.opacity = (clickMesh.userData.from === fromId && clickMesh.userData.to === toId) ? 1.0 : 0.05;
  });

  document.getElementById("reset-detail").onclick = resetView;
}

function resetView() {
  activeNodeId = null;
  activeEdgeId = null;
  const detail = document.getElementById("detail-block");
  detail.innerHTML = `
    <div class="detail-prompt">
      <p class="detail-prompt-text">Select a brain region or pathway to read a plain-language explanation of what happens there and why it matters.</p>
    </div>
  `;

  nodeMeshes.forEach(m => {
    m.material.opacity = 1;
    if(m.children[0]) m.children[0].material.opacity = 0.4;
  });
  labelElements.forEach(l => l.el.style.opacity = "1");
  edgeMeshes.forEach(clickMesh => {
    const visualMesh = clickMesh.userData.parentGroup.children[0];
    visualMesh.material.opacity = 0.7;
  });
  document.querySelectorAll("#graph-regions li").forEach(li => li.classList.remove("active"));
}

function attachRegionClickHandlers() {
  document.querySelectorAll("#graph-regions .region-item").forEach(li => {
    li.addEventListener("click", () => {
      const regionId = li.dataset.region;
      showRegionDetail(regionId);
      if (window.innerWidth <= 768) {
        document.getElementById("detail-block").scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Pathway key list — keyboard + click
  document.querySelectorAll(".pathway-key-item").forEach(li => {
    const activate = () => {
      const from = li.dataset.from;
      const to   = li.dataset.to;
      const nt   = transmitters[currentTransmitter];
      const edge = nt?.regionEdges.find(e => e.from === from && e.to === to);
      if(edge) showEdgeDetail(from, to, edge.description);
      if(window.innerWidth <= 768) {
        document.getElementById("detail-block")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    li.addEventListener("click", activate);
    li.addEventListener("keydown", e => {
      if(e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
    });
  });
}

// -----------------------------------------------------
// THREE.JS LOGIC
// -----------------------------------------------------
function initThreeJS() {
  if (scene) {
    if (!animFrameId) animate();
    return; 
  }
  
  const container = document.getElementById("graph-scene-container");
  if (!container) return;
  
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0c, 0.022);

  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 15;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableRotate = false; // Disable rotating to keep it flat
  controls.enableZoom = true;
  controls.enablePan = true;
  
  // IMPROVED MOBILE EXPLORATION:
  // Map one finger swipe to panning (moving the camera left/right/up/down) instead of rotating.
  // OrbitControls natively maps one-finger to rotate. We override that here:
  controls.touches = {
    ONE: THREE.TOUCH.PAN,
    TWO: THREE.TOUCH.DOLLY_PAN
  };
  // Also map left-click to pan so desktop users can click and drag to explore easily
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE
  };

  controls.minDistance = 5;
  controls.maxDistance = 50;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(10, 20, 10);
  scene.add(dirLight);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  resizeHandler = () => {
    if (!camera || !renderer || !container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return; // skip degenerate frames
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    const aspect = w / h;
    const baseDistance = 18;
    camera.position.z = aspect < 1 ? baseDistance / aspect : baseDistance;
  };
  window.addEventListener("resize", resizeHandler);

  setupInteractions();

  // Use ResizeObserver to detect when the container gets real dimensions.
  // This is more reliable than RAF because RAF fires before layout is committed
  // when the page has just transitioned from display:none — container.clientWidth
  // can still read as 0. ResizeObserver fires only after the browser has
  // computed and painted the new size.
  const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        ro.disconnect(); // only need first valid size
        resizeHandler();
        if (!animFrameId) {
          perfLastTime   = performance.now();
          perfFrameCount = 0;
          animate();
        }
        return;
      }
    }
  });
  ro.observe(container);

  // Fallback: if container already has dimensions (e.g. page was pre-visible),
  // start immediately without waiting for an observation
  if (container.clientWidth > 0 && container.clientHeight > 0) {
    ro.disconnect();
    resizeHandler();
    if (!animFrameId) {
      perfLastTime   = performance.now();
      perfFrameCount = 0;
      animate();
    }
  }
}

function setupInteractions() {
  const container = document.getElementById("graph-scene-container");
  if (!container) return;

  container.addEventListener("pointermove", (event) => {
    const now = performance.now();
    if (now - lastRaycastTime < RAYCAST_THROTTLE) return;
    lastRaycastTime = now;

    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    
    // Sort intersections so Nodes are ALWAYS prioritized over Edges when hovering/clicking
    const intersects = raycaster.intersectObjects([...nodeMeshes, ...edgeMeshes], false);
    intersects.sort((a, b) => {
      if (a.object.userData.type === 'node' && b.object.userData.type === 'edge') return -1;
      if (a.object.userData.type === 'edge' && b.object.userData.type === 'node') return 1;
      return a.distance - b.distance;
    });

    container.style.cursor = isDragging ? "grabbing" : "grab";

    if (!activeNodeId && !activeEdgeId) {
        nodeMeshes.forEach(m => { m.material.opacity = 1.0; });
        edgeMeshes.forEach(clickMesh => {
          const visualMesh = clickMesh.userData.parentGroup.children[0];
          visualMesh.material.opacity = 0.7;
        });

        if (intersects.length > 0) {
            container.style.cursor = "pointer";
            const hit = intersects[0].object;
            if (hit.userData.type === "node") {
               // Brighten aura on hover using child opacity
               if (hit.children[0]) hit.children[0].material.opacity = 0.75;
            } else if (hit.userData.type === "edge") {
               const visualMesh = hit.userData.parentGroup.children[0];
               visualMesh.material.opacity = 1.0;
            }
        }
    } else {
        if (intersects.length > 0) container.style.cursor = "pointer";
    }
  });

  container.addEventListener("pointerdown", (event) => {
    pointerDownPos = { x: event.clientX, y: event.clientY };
    isDragging = false;
    container.style.cursor = "grabbing";
  });

  container.addEventListener("pointerup", (event) => {
    container.style.cursor = "grab";
    
    // Prevent triggering a click if the user was just swiping to pan the camera
    const dx = Math.abs(event.clientX - pointerDownPos.x);
    const dy = Math.abs(event.clientY - pointerDownPos.y);
    if (dx > 5 || dy > 5) return; 

    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    // Force Nodes to take priority over Edges when clicking
    const intersects = raycaster.intersectObjects([...nodeMeshes, ...edgeMeshes], false);
    intersects.sort((a, b) => {
      if (a.object.userData.type === 'node' && b.object.userData.type === 'edge') return -1;
      if (a.object.userData.type === 'edge' && b.object.userData.type === 'node') return 1;
      return a.distance - b.distance;
    });
    
    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hit.userData.type === "node") {
        showRegionDetail(hit.userData.id);
      } else if (hit.userData.type === "edge") {
        showEdgeDetail(hit.userData.from, hit.userData.to, hit.userData.description);
      }
      
      if (window.innerWidth <= 768) {
        document.getElementById("detail-block").scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (event.target.tagName === 'CANVAS') resetView();
    }
  });

  controls.addEventListener('change', () => {
    isDragging = true;
  });
}

// ── Performance indicator ─────────────────────────────────────
let perfLastTime   = 0;
let perfFrameCount = 0;
let perfFPS        = 60;
let perfPaused     = false;

function updatePerfIndicator(fps, paused) {
  const el = document.getElementById("perf-indicator");
  if (!el) return;

  const dprCapped = window.devicePixelRatio > 2;
  const lowFPS    = fps < 30 && !paused;
  const show      = paused || lowFPS;

  if (!show) { el.classList.remove("visible"); return; }

  el.classList.add("visible");
  if (paused) {
    el.textContent = "Rendering paused — tab not visible";
  } else if (lowFPS) {
    el.textContent = `${Math.round(fps)} fps — graph simplified`;
  }
}

function animate() {
  animFrameId = requestAnimationFrame(animate);

  // FPS measurement — rolling average over 30 frames
  perfFrameCount++;
  const now = performance.now();
  if (perfFrameCount >= 30) {
    perfFPS        = Math.round(30000 / (now - perfLastTime));
    perfLastTime   = now;
    perfFrameCount = 0;
    updatePerfIndicator(perfFPS, false);
  }

  if (controls) controls.update();

  if (camera && labelElements.length > 0) {
    const container = document.getElementById("graph-scene-container");
    if (container) {
      const halfWidth  = container.clientWidth / 2;
      const halfHeight = container.clientHeight / 2;

      labelElements.forEach(({ mesh, el }) => {
        const pos = mesh.position.clone();
        pos.project(camera);

        if (pos.z > 1) { el.style.display = "none"; return; }

        el.style.display = "block";
        const x = (pos.x * halfWidth)  + halfWidth;
        const y = -(pos.y * halfHeight) + halfHeight;
        el.style.left = `${x}px`;
        el.style.top  = `${y - 25}px`;
      });

      // Let explorer.js update anatomy overlay labels
      if (window._onLabelUpdate) window._onLabelUpdate();
    }
  }
  renderer.render(scene, camera);
}

// Pause rendering when tab/page is not visible to save GPU
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
    updatePerfIndicator(0, true);
  } else {
    updatePerfIndicator(60, false);
    const graphVisible = document.getElementById("graph-page") &&
                         !document.getElementById("graph-page").classList.contains("hidden");
    if (graphVisible && scene && !animFrameId) {
      perfLastTime = performance.now();
      perfFrameCount = 0;
      animate();
    }
  }
});

function createGraphForTransmitter(nt) {
  nodeMeshes.forEach(m => scene.remove(m));
  edgeMeshes.forEach(m => scene.remove(m.userData.parentGroup));
  labelElements.forEach(l => {
    if (l.el && l.el.parentNode) l.el.parentNode.removeChild(l.el);
  });
  
  nodeMeshes = [];
  edgeMeshes = [];
  labelElements = [];
  scene.rotation.set(0, 0, 0); 
  
  const radius = 6;
  const nodeById = {}; 

  nt.regions.forEach((regionId, index) => {
    const angle = (index / nt.regions.length) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    // 1. Inner solid node
    const innerGeom = new THREE.SphereGeometry(0.3, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({ 
        color: nt.color,
        transparent: true,
        opacity: 0  // Start invisible for entry animation
    });
    const nodeGroup = new THREE.Mesh(innerGeom, innerMat);
    nodeGroup.position.set(x, y, 0);
    nodeGroup.scale.set(0.01, 0.01, 0.01); // Start tiny
    nodeGroup.userData = { type: "node", id: regionId };
    
    // Staggered entry animation
    const delay = index * 80;
    setTimeout(() => {
      let t = 0;
      const entryDuration = 400;
      const startTime = performance.now();
      function entryFrame(now) {
        t = Math.min((now - startTime) / entryDuration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const s = 0.01 + ease * 0.99;
        nodeGroup.scale.set(s, s, s);
        innerMat.opacity = ease;
        if (nodeGroup.children[0]) nodeGroup.children[0].material.opacity = ease * 0.4;
        if (t < 1) requestAnimationFrame(entryFrame);
      }
      requestAnimationFrame(entryFrame);
    }, delay);
    
    // 2. Outer "Aura" ring
    const auraGeom = new THREE.SphereGeometry(0.65, 16, 16);
    const auraMat = new THREE.MeshBasicMaterial({ 
        color: nt.color,
        transparent: true,
        opacity: 0.4,
        depthWrite: false
    });
    const auraMesh = new THREE.Mesh(auraGeom, auraMat);
    nodeGroup.add(auraMesh); 

    scene.add(nodeGroup);
    nodeMeshes.push(nodeGroup);
    nodeById[regionId] = nodeGroup;

    // 3. Text label — keyboard accessible, positioned over node
    const labelEl = document.createElement("div");
    labelEl.className = "node-label";
    labelEl.textContent = regionId;
    labelEl.setAttribute("tabindex", "0");
    labelEl.setAttribute("role", "button");
    labelEl.setAttribute("aria-label", `Brain region: ${regionId}. Press Enter to explore.`);
    // Click is handled by the canvas pointerup — label is aria-hidden for pointer events
    // but keyboard events are wired here directly
    labelEl.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showRegionDetail(regionId);
        if(window.innerWidth <= 768){
          document.getElementById("detail-block")?.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
    labelEl.addEventListener("focus", () => {
      // Highlight the node on focus — same as hover
      nodeMeshes.forEach(m => {
        const active = m.userData.id === regionId;
        if(active && m.children[0]) m.children[0].material.opacity = 0.75;
      });
    });
    labelEl.addEventListener("blur", () => {
      if(!activeNodeId) {
        nodeMeshes.forEach(m => { if(m.children[0]) m.children[0].material.opacity = 0.4; });
      }
    });
    document.getElementById("graph-node-labels").appendChild(labelEl);
    labelElements.push({ mesh: nodeGroup, el: labelEl, id: regionId });
  });

  nt.regionEdges.forEach(edge => {
    const fromMesh = nodeById[edge.from];
    const toMesh = nodeById[edge.to];
    if (!fromMesh || !toMesh) return;

    let curve;
    if (edge.from === edge.to) {
        const p = fromMesh.position;
        curve = new THREE.CubicBezierCurve3(
            p,
            new THREE.Vector3(p.x + 3, p.y + 3, p.z),
            new THREE.Vector3(p.x - 3, p.y + 3, p.z),
            p
        );
    } else {
        const midPoint = new THREE.Vector3().addVectors(fromMesh.position, toMesh.position).multiplyScalar(0.5);
        midPoint.z += 1.5; 
        curve = new THREE.QuadraticBezierCurve3(fromMesh.position.clone(), midPoint, toMesh.position.clone());
    }

    // --- VISUAL LINE (cheap BufferGeometry line — no tube mesh) ---
    const linePoints = curve.getPoints(40);
    const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMat = new THREE.LineBasicMaterial({
      color: nt.color,
      transparent: true,
      opacity: 0.7
    });
    const visualEdge = new THREE.Line(lineGeom, lineMat);

    // --- INVISIBLE CLICK BOX (low-res tube) ---
    const clickGeom = new THREE.TubeGeometry(curve, 16, 0.22, 4, false);
    const clickMat = new THREE.MeshBasicMaterial({
      visible: false
    });
    const clickEdge = new THREE.Mesh(clickGeom, clickMat);

    const edgeGroup = new THREE.Group();
    edgeGroup.add(visualEdge);
    edgeGroup.add(clickEdge);

    clickEdge.userData = {
      type: "edge",
      from: edge.from,
      to: edge.to,
      description: edge.description,
      parentGroup: edgeGroup 
    };

    scene.add(edgeGroup);
    edgeMeshes.push(clickEdge);
  });

  if (camera && controls) {
    const container = document.getElementById("graph-scene-container");
    const aspect = container.clientWidth / container.clientHeight;
    
    const baseDistance = 18; 
    const finalDistance = aspect < 1 ? baseDistance / aspect : baseDistance;

    camera.position.set(0, 0, finalDistance); 
    controls.target.set(0, 0, 0);
    controls.update();
  }
}

function initSidebarScrollAffordance(){
  const sidebar = document.getElementById("graph-sidebar");
  const wrap    = document.getElementById("graph-sidebar-wrap");
  if(!sidebar || !wrap) return;

  const check = () => {
    const atBottom = sidebar.scrollTop + sidebar.clientHeight >= sidebar.scrollHeight - 8;
    wrap.classList.toggle("at-bottom", atBottom);
  };

  sidebar.addEventListener("scroll", check, { passive: true });
  check(); // initial state
}

function sidebarSkeleton() {
  return `
    <div class="sk-block sk-block--title"></div>
    <div class="sk-block sk-block--sub"></div>
    <div class="sk-block sk-block--body"></div>
    <div class="sk-block sk-block--body sk-block--short"></div>
    <div class="sk-divider"></div>
    <div class="sk-block sk-block--label"></div>
    <div class="sk-chips">
      <div class="sk-chip"></div><div class="sk-chip"></div>
      <div class="sk-chip"></div><div class="sk-chip"></div>
    </div>
    <div class="sk-divider"></div>
    <div class="sk-block sk-block--label"></div>
    <div class="sk-block sk-block--body"></div>
    <div class="sk-block sk-block--body sk-block--short"></div>
  `;
}

function loadGraph(key, scenario) {
  currentTransmitter = key;
  const nt = transmitters[key];
  if (!nt) return;

  // Single reference — show skeleton immediately, replace with real content below
  const sidebar = document.getElementById("graph-sidebar");
  sidebar.innerHTML = sidebarSkeleton();

  initThreeJS();

  // Replace skeleton with real sidebar content
  sidebar.innerHTML = `
    ${scenario ? `
    <div class="scenario-context">
      <div class="scenario-context-label">Guided scenario</div>
      <div class="scenario-context-title">${scenario.title}</div>
      <p class="scenario-context-body">${scenario.summary}</p>
      <div class="scenario-deeplinks">
        <span class="scenario-deeplinks-label">You'll see this in</span>
        <div class="scenario-deeplinks-chips">
          <button class="sdl-chip sdl-chip--graph" data-nt="${scenario.nt}" data-region="${scenario.focusRegion || ''}"
                  aria-label="Open ${scenario.focusRegion || scenario.nt} in Pathway Explorer">
            Pathway Explorer
          </button>
          <button class="sdl-chip sdl-chip--synapse" data-nt="${scenario.nt}"
                  aria-label="Open ${scenario.nt} in Synapse view">
            Synapse view
          </button>
        </div>
      </div>
    </div>
    ` : ""}

    <div class="nt-overview">
      <div class="node-type-tag">Neurotransmitter</div>
      <h2 id="graph-nt-name">${key.charAt(0).toUpperCase() + key.slice(1)}</h2>
      <p id="graph-nt-symbol" style="color: ${nt.color}">${nt.symbol}</p>
      <p id="graph-description">${nt.description}</p>
    </div>

    <div class="region-list">
      <div class="region-list-title">Brain regions</div>
      <ul id="graph-regions">
        ${nt.regions.map(r => `
          <li data-region="${r}" class="region-item">
            ${r}
          </li>
        `).join("")}
      </ul>
    </div>

    <div class="pathway-list-section">
      <div class="region-list-title">Pathways</div>
      <ul class="pathway-key-list" aria-label="Pathways — press Enter to explore">
        ${nt.regionEdges.map(e => `
          <li class="pathway-key-item" data-from="${e.from}" data-to="${e.to}" tabindex="0" role="button"
              aria-label="Pathway: ${e.from} to ${e.to}. Press Enter to explore.">
            <span class="pathway-key-from">${e.from}</span>
            <span class="pathway-key-arrow">→</span>
            <span class="pathway-key-to">${e.to}</span>
          </li>
        `).join("")}
      </ul>
    </div>

    <div class="edge-detail" id="detail-block">
      <div class="detail-prompt">
        <p class="detail-prompt-text">Select a brain region or pathway to read a plain-language explanation of what happens there and why it matters.</p>
      </div>
    </div>
  `;

  attachRegionClickHandlers();
  createGraphForTransmitter(nt);
  resetView();
  initSidebarScrollAffordance();

  // Wire scenario deep-link chips
  sidebar.querySelectorAll(".sdl-chip--graph").forEach(btn => {
    btn.addEventListener("click", () => {
      const region = btn.dataset.region;
      if (region) {
        setTimeout(() => showRegionDetail(region), 100);
        // Scroll sidebar to detail block
        const detail = document.getElementById("detail-block");
        if (detail) setTimeout(() => detail.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
      }
    });
  });

  sidebar.querySelectorAll(".sdl-chip--synapse").forEach(btn => {
    btn.addEventListener("click", () => {
      const ntKey = btn.dataset.nt;
      if (!ntKey) return;
      // Navigate to synapse page with correct NT
      document.getElementById("graph-page").classList.add("hidden");
      const synapsePage = document.getElementById("synapse-page");
      synapsePage.classList.remove("hidden");
      // synapse.js exposes navigateSynapseTo for cross-module use
      if (window.navigateSynapseTo) {
        window.navigateSynapseTo(ntKey);
      }
    });
  });

  // Inject micro-guide at top of sidebar
  window.injectGraphGuide && window.injectGraphGuide(
    document.getElementById("graph-sidebar")
  );

  // Inject Key Concepts button into graph header
  window.injectReferenceButtons && window.injectReferenceButtons("graph");

  // Inject explorer buttons (story, anatomy labels, compare)
  window.injectExplorerButtons && window.injectExplorerButtons();

  // Refresh explorer.js live-state refs after each graph rebuild
  window._transmitters  = transmitters;
  window._currentNT     = currentTransmitter;
  window._nodeMeshes    = nodeMeshes;
  window._edgeMeshes    = edgeMeshes;
  window._labelElements = labelElements;

  if (scenario?.focusRegion) {
    setTimeout(() => showRegionDetail(scenario.focusRegion), 800);
  }
}
