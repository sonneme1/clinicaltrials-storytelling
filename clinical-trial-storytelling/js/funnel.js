// funnel.js
import { enrollmentFunnel, personas } from '../data/data.js';

const funnelContainer = document.getElementById('funnel-container');
const funnelStages = enrollmentFunnel.map(stage => {
  const stageElement = document.createElement('div');
  stageElement.classList.add('funnel-stage');
  stageElement.setAttribute('data-id', stage.id);
  
  const stageLabel = document.createElement('h3');
  stageLabel.textContent = stage.stage;
  
  const stageCount = document.createElement('p');
  stageCount.textContent = `${stage.count} (${stage.percentage}%)`;
  
  stageElement.appendChild(stageLabel);
  stageElement.appendChild(stageCount);
  
  stageElement.addEventListener('mouseenter', () => {
    if (stage.persona) {
      showPersonaDetails(personas[stage.persona]);
    }
  });

  stageElement.addEventListener('mouseleave', hidePersonaDetails);
  
  return stageElement;
});

function renderFunnel() {
  funnelContainer.innerHTML = '';
  funnelStages.forEach(stage => funnelContainer.appendChild(stage));
}

function showPersonaDetails(persona) {
  const personaContainer = document.getElementById('persona-details');
  personaContainer.innerHTML = `
    <h4>${persona.name}, ${persona.age}</h4>
    <p>${persona.quote}</p>
    <p><strong>Barriers:</strong> ${persona.barriers.join(', ')}</p>
    <p><strong>What Would Help:</strong> ${persona.whatWouldHelp.join(', ')}</p>
  `;
  personaContainer.classList.add('visible');
}

function hidePersonaDetails() {
  const personaContainer = document.getElementById('persona-details');
  personaContainer.classList.remove('visible');
}

renderFunnel();