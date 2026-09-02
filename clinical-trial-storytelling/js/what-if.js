export const whatIfSlider = document.getElementById('what-if-slider');
export const currentModelDisplay = document.getElementById('current-model');
export const designedModelDisplay = document.getElementById('designed-model');
export const enrollmentFunnelContainer = document.getElementById('enrollment-funnel');

import { whatIfFunnel } from '../data/data.js';

let currentIndex = 0;

function updateDisplay() {
    const currentData = whatIfFunnel[currentIndex];
    const designedData = whatIfFunnel[currentIndex];

    currentModelDisplay.innerText = currentData.current;
    designedModelDisplay.innerText = designedData.designed;

    renderFunnel(currentData, designedData);
}

function renderFunnel(currentData, designedData) {
    enrollmentFunnelContainer.innerHTML = '';

    const stages = ['Aware of Trial', 'Meets Eligibility Criteria', 'Can Reach Trial Site', 'Has Reliable Transportation', 'Can Take Time Off Work', 'Has Internet & Device Access', 'Speaks Language of Trial Materials', 'Enrolled'];

    stages.forEach((stage, index) => {
        const currentCount = currentData.current;
        const designedCount = designedData.designed;

        const funnelStage = document.createElement('div');
        funnelStage.classList.add('funnel-stage');

        funnelStage.innerHTML = `
            <h3>${stage}</h3>
            <p>Current: ${currentCount}</p>
            <p>Designed: ${designedCount}</p>
        `;

        enrollmentFunnelContainer.appendChild(funnelStage);
    });
}

whatIfSlider.addEventListener('input', (event) => {
    currentIndex = event.target.value;
    updateDisplay();
});

// Initial display
updateDisplay();