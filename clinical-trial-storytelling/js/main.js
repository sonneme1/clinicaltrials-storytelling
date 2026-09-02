// main.js
import { enrollmentFunnel, barrierBreakdown, representationGap, whatIfComparison, mapData, personas, keyMetrics } from '../data/data.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    renderKeyMetrics();
    renderEnrollmentFunnel();
    // Additional initialization functions can be called here
}

function setupEventListeners() {
    // Set up scroll event listeners, button clicks, etc.
}

function renderKeyMetrics() {
    const metricsContainer = document.getElementById('key-metrics');
    keyMetrics.forEach(metric => {
        const metricElement = document.createElement('div');
        metricElement.innerHTML = `<strong>${metric.stat}</strong> ${metric.label}`;
        metricsContainer.appendChild(metricElement);
    });
}

function renderEnrollmentFunnel() {
    const funnelContainer = document.getElementById('enrollment-funnel');
    enrollmentFunnel.forEach(stage => {
        const stageElement = document.createElement('div');
        stageElement.innerHTML = `<h3>${stage.stage}</h3><p>${stage.count} (${stage.percentage}%)</p>`;
        funnelContainer.appendChild(stageElement);
    });
}

// Additional functions for rendering other components can be added here