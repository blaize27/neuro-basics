// Simple data structure for your explanations
const data = {
  dopamine: {
    title: "Dopamine – reward & motivation",
    intro: "Dopamine does not equal 'pleasure'. It signals prediction and motivation in specific circuits.",
    cards: [
      {
        title: "Striatum (nucleus accumbens)",
        text: "Dopamine release here reinforces actions that lead to rewards, helping habits form."
      },
      {
        title: "Prefrontal cortex",
        text: "Moderate dopamine supports working memory and planning; too much or too little can impair control."
      }
    ],
    highlightRegions: ["striatum", "pfc"]
  },
  serotonin: {
    title: "Serotonin – mood & modulation",
    intro: "Serotonin broadly tunes brain circuits involved in mood, sleep, and anxiety.",
    cards: [
      {
        title: "Cortex & limbic system",
        text: "Serotonin helps stabilise mood and reduce impulsive responding in emotional circuits."
      }
    ],
    highlightRegions: ["pfc", "hippocampus"]
  },
  gaba: {
    title: "GABA – inhibition",
    intro: "GABA is the main inhibitory neurotransmitter, balancing excitation in the brain.",
    cards: [
      {
        title: "Throughout cortex & limbic areas",
        text: "GABAergic interneurons prevent runaway excitation and shape precise timing of spikes."
      }
    ],
    highlightRegions: ["pfc", "hippocampus", "striatum"]
  },
  glutamate: {
    title: "Glutamate – excitation & plasticity",
    intro: "Glutamate is the main excitatory transmitter, crucial for synaptic plasticity and learning.",
    cards: [
      {
        title: "Hippocampus",
        text: "Glutamatergic synapses and NMDA receptors are key for long-term potentiation and memory formation."
      }
    ],
    highlightRegions: ["hippocampus"]
  }
};

const buttons = document.querySelectorAll(".nt-buttons button");
const infoTitle = document.getElementById("info-title");
const infoIntro = document.getElementById("info-intro");
const cardsContainer = document.getElementById("cards-container");
const regions = document.querySelectorAll(".region");

function clearHighlights() {
  regions.forEach(r => r.classList.remove("active-region"));
}

function setHighlights(regionNames) {
  clearHighlights();
  regions.forEach(r => {
    if (regionNames.includes(r.dataset.region)) {
      r.classList.add("active-region");
    }
  });
}

function renderNeurotransmitter(key) {
  const nt = data[key];
  if (!nt) return;

  infoTitle.textContent = nt.title;
  infoIntro.textContent = nt.intro;

  // Clear previous cards
  cardsContainer.innerHTML = "";

  nt.cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${card.title}</h3><p>${card.text}</p>`;
    cardsContainer.appendChild(div);
  });

  setHighlights(nt.highlightRegions);
}

// Button click listeners
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.nt;
    renderNeurotransmitter(key);
  });
});
