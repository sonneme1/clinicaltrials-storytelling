/**
 * barriers.js
 * Chapter 4 — Horizontal bar chart of barrier drop-off percentages, filterable
 * by demographic cut (age / income / rural vs. urban).
 */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof d3 === "undefined" || typeof TRIAL_DATA === "undefined") return;

    const select = document.getElementById("demographicSelect");
    renderLegend();
    renderBarrierChart("age", "18-34");
    buildDemographicOptions();

    if (select) {
      select.addEventListener("change", () => {
        const cut = select.value;
        const firstKey = Object.keys(TRIAL_DATA.barriersByDemographic[cut])[0];
        renderBarrierChart(cut, firstKey);
        buildSubFilter(cut);
      });
    }

    buildSubFilter("age");
    window.addEventListener("resize", debounce(() => renderBarrierChart(currentCut, currentKey), 200));
  });

  let currentCut = "age";
  let currentKey = "18-34";
  let resizeTimer;
  function debounce(fn, delay) {
    return (...args) => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => fn(...args), delay);
    };
  }

  function buildDemographicOptions() {
    // The select already has age/income/geography options in the HTML; nothing to build.
  }

  function buildSubFilter(cut) {
    const wrap = document.querySelector(".filter-controls");
    if (!wrap) return;
    let subSelect = document.getElementById("demographicSubSelect");
    const keys = Object.keys(TRIAL_DATA.barriersByDemographic[cut]);
    const labels = {
      "18-34": "18–34", "35-49": "35–49", "50-64": "50–64", "65+": "65+",
      under_40k: "Under $40K", "40k_80k": "$40K–$80K", "80k_120k": "$80K–$120K", over_120k: "Over $120K",
      rural: "Rural", urban: "Urban",
    };

    if (!subSelect) {
      subSelect = document.createElement("select");
      subSelect.id = "demographicSubSelect";
      wrap.appendChild(subSelect);
      subSelect.addEventListener("change", () => {
        renderBarrierChart(currentCut, subSelect.value);
      });
    }

    subSelect.innerHTML = keys.map((k) => `<option value="${k}">${labels[k] || k}</option>`).join("");
    subSelect.value = keys[0];
  }

  function renderLegend() {
    const legend = document.getElementById("barrierLegend");
    if (!legend) return;
    legend.innerHTML = TRIAL_DATA.barriers
      .map(
        (b) => `<span class="barrier-legend-item"><span class="barrier-legend-swatch" style="background:${b.color}"></span>${b.label}</span>`
      )
      .join("");
  }

  function renderBarrierChart(cut, key) {
    currentCut = cut;
    currentKey = key;

    const container = document.getElementById("barrierSvg");
    if (!container) return;
    const wrap = container.parentElement;
    const width = wrap.clientWidth;
    const barrierMap = { geography: "#E07A5F", transportation: "#E8956F", work: "#EFAA7B", digital: "#8DA9C4", language: "#6F93B5", insurance: "#597CA0" };
    const barrierLabels = {
      geography: "Geography / distance",
      transportation: "Transportation",
      work: "Work schedule / lost wages",
      digital: "Digital access",
      language: "Language",
      insurance: "Insurance / cost",
    };

    const raw = TRIAL_DATA.barriersByDemographic[cut][key];
    const data = Object.keys(raw)
      .map((k) => ({ id: k, label: barrierLabels[k], value: raw[k], color: barrierMap[k] }))
      .sort((a, b) => b.value - a.value);

    const rowHeight = 52;
    const height = data.length * rowHeight + 20;
    const margin = { left: 200, right: 60, top: 10, bottom: 10 };
    const chartWidth = Math.max(width - margin.left - margin.right, 100);

    const svg = d3.select("#barrierSvg");
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const x = d3.scaleLinear().domain([0, d3.max(data, (d) => d.value) * 1.15]).range([0, chartWidth]);

    const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    const rows = g
      .selectAll(".barrier-row")
      .data(data)
      .join("g")
      .attr("class", "barrier-row")
      .attr("transform", (d, i) => `translate(0, ${i * rowHeight})`);

    rows
      .append("text")
      .attr("class", "barrier-bar-label")
      .attr("x", -12)
      .attr("y", rowHeight / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .text((d) => d.label);

    rows
      .append("rect")
      .attr("y", rowHeight / 2 - 12)
      .attr("width", 0)
      .attr("height", 24)
      .attr("rx", 3)
      .attr("fill", (d) => d.color)
      .transition()
      .duration(600)
      .attr("width", (d) => x(d.value));

    rows
      .append("text")
      .attr("class", "barrier-bar-value")
      .attr("x", (d) => x(d.value) + 8)
      .attr("y", rowHeight / 2)
      .attr("dominant-baseline", "middle")
      .text((d) => `${d.value}%`);
  }
})();
