// map.js
import { mapData } from '../data/data.js';

const map = L.map('map').setView([46.0, -94.0], 6); // Centered on Minnesota

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to plot trial sites on the map
function plotTrialSites() {
    mapData.trialSites.forEach(site => {
        const marker = L.marker(site.coordinates).addTo(map);
        marker.bindPopup(`<b>${site.name}</b><br>City: ${site.city}<br>Enrolled: ${site.enrolled}/${site.capacity}`);
    });
}

// Function to draw drive-time rings
function drawDriveTimeRings() {
    const driveTimeRings = mapData.driveTimeRings;

    Object.keys(driveTimeRings).forEach(key => {
        const ring = L.circle(mapData.trialSites[0].coordinates, {
            radius: driveTimeRings[key].radiusMiles * 1609.34, // Convert miles to meters
            color: driveTimeRings[key].color,
            fillOpacity: driveTimeRings[key].opacity
        }).addTo(map);
    });
}

// Initialize the map with trial sites and drive-time rings
function initMap() {
    plotTrialSites();
    drawDriveTimeRings();
}

// Call the initMap function to render the map
initMap();