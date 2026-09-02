// representation.js
import { representationGap } from '../data/data.js';

const representationContainer = document.getElementById('representation-container');

// Function to render the representation gap visualization
function renderRepresentationGap() {
    representationContainer.innerHTML = ''; // Clear previous content

    representationGap.forEach(group => {
        const groupElement = document.createElement('div');
        groupElement.classList.add('representation-group');

        const groupTitle = document.createElement('h3');
        groupTitle.textContent = group.group;

        const enrolledStat = document.createElement('p');
        enrolledStat.textContent = `Enrolled: ${group.enrolled}%`;

        const affectedStat = document.createElement('p');
        affectedStat.textContent = `Affected: ${group.affected}%`;

        const gapStat = document.createElement('p');
        gapStat.textContent = `Gap: ${group.gap}% (${group.multiplier})`;

        groupElement.appendChild(groupTitle);
        groupElement.appendChild(enrolledStat);
        groupElement.appendChild(affectedStat);
        groupElement.appendChild(gapStat);

        representationContainer.appendChild(groupElement);
    });
}

// Initialize the representation gap visualization
function initRepresentation() {
    renderRepresentationGap();
}

// Export the initialization function
export { initRepresentation };