/**
 * map.js
 * Chapter 3 — Leaflet map of fictional MN trial sites vs. patient population
 * centers, with toggleable 30/60/90-minute drive-time rings.
 */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof L === "undefined" || typeof TRIAL_DATA === "undefined") return;
    const mapEl = document.getElementById("trialMap");
    if (!mapEl) return;

    const map = L.map("trialMap", {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([46.0, -94.2], 6);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: "abcd",
      maxZoom: 12,
    }).addTo(map);

    // Approx miles-per-minute-drive-time for ring radius conversion (rural highway avg ~45mph)
    const milesPerMinute = 45 / 60;
    const ringMinutes = [30, 60, 90];
    const ringColors = { 30: "#2EC4B6", 60: "#8DA9C4", 90: "#E07A5F" };
    const ringLayers = {}; // minutes -> array of layers

    ringMinutes.forEach((min) => (ringLayers[min] = []));

    TRIAL_DATA.trialSites.forEach((site) => {
      L.marker([site.lat, site.lng], {
        icon: L.divIcon({
          className: "",
          html: `<div style="width:10px;height:10px;border-radius:50%;background:#2EC4B6;border:2px solid #F4F1DE;"></div>`,
          iconSize: [10, 10],
        }),
      })
        .addTo(map)
        .bindPopup(`<strong>${site.name}</strong><br/>${site.city}`);

      ringMinutes.forEach((min) => {
        const radiusMiles = min * milesPerMinute;
        const radiusMeters = radiusMiles * 1609.34;
        const circle = L.circle([site.lat, site.lng], {
          radius: radiusMeters,
          color: ringColors[min],
          weight: 1,
          fillColor: ringColors[min],
          fillOpacity: 0.06,
          dashArray: min === 30 ? null : "4 4",
        });
        ringLayers[min].push(circle);
      });
    });

    ringMinutes.forEach((min) => ringLayers[min].forEach((layer) => layer.addTo(map)));

    TRIAL_DATA.patientPopulationCenters.forEach((center) => {
      const radius = Math.max(4, Math.sqrt(center.patients) / 3);
      L.circleMarker([center.lat, center.lng], {
        radius,
        color: "#F4F1DE",
        weight: 1,
        fillColor: "#8DA9C4",
        fillOpacity: 0.7,
      })
        .addTo(map)
        .bindPopup(
          `<strong>${center.name}</strong><br/>${center.patients.toLocaleString()} eligible patients<br/>${center.driveMinutes} min drive to nearest site`
        );
    });

    // Toggle buttons control ring visibility per drive-time band.
    document.querySelectorAll(".toggle-btn[data-minutes]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const min = parseInt(btn.dataset.minutes, 10);
        const isActive = btn.classList.toggle("active");
        ringLayers[min].forEach((layer) => {
          if (isActive) {
            layer.addTo(map);
          } else {
            map.removeLayer(layer);
          }
        });
      });
    });
  });
})();
