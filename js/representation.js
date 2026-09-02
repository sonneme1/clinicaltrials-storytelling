/**
 * representation.js
 * Chapter 5 — Paired bar comparison: enrolled % vs. affected-in-population %,
 * per demographic group. The visual gap between bars is the point.
 */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof d3 === "undefined" || typeof TRIAL_DATA === "undefined") return;
    renderRepresentationChart();
    window.addEventListener("resize", debounce(renderRepresentationChart, 200));
  });

  let resizeTimer;
  function debounce(fn, delay) {
    return (...args) => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => fn(...args), delay);
    };
  }

  function renderRepresentationChart() {
    const container = document.getElementById("representationSvg");
    if (!container) return;
    const wrap = container.parentElement;
    const width = wrap.clientWidth;
    const data = TRIAL_DATA.representationGap;

    const rowHeight = 64;
    const margin = { left: 190, right: 80, top: 20, bottom: 10 };
    const height = data.length * rowHeight + margin.top + margin.bottom;
    const chartWidth = Math.max(width - margin.left - margin.right, 100);

    const svg = d3.select("#representationSvg");
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const maxVal = d3.max(data, (d) => Math.max(d.enrolledPercent, d.affectedPercent)) * 1.25;
    const x = d3.scaleLinear().domain([0, maxVal]).range([0, chartWidth]);

    const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    const rows = g
      .selectAll(".rep-row")
      .data(data)
      .join("g")
      .attr("class", "rep-row")
      .attr("transform", (d, i) => `translate(0, ${i * rowHeight})`);

    rows
      .append("text")
      .attr("class", "rep-group-label")
      .attr("x", -12)
      .attr("y", rowHeight / 2 - 6)
      .attr("text-anchor", "end")
      .text((d) => d.group);

    rows
      .append("text")
      .attr("class", "rep-gap-label")
      .attr("x", -12)
      .attr("y", rowHeight / 2 + 14)
      .attr("text-anchor", "end")
      .text((d) => `${d.gapMultiplier}x underrepresented`);

    // Affected-in-population bar (background, slate)
    rows
      .append("rect")
      .attr("y", 4)
      .attr("width", 0)
      .attr("height", 14)
      .attr("rx", 3)
      .attr("fill", "#8DA9C4")
      .attr("opacity", 0.55)
      .transition()
      .duration(600)
      .attr("width", (d) => x(d.affectedPercent));

    // Enrolled bar (foreground, teal)
    rows
      .append("rect")
      .attr("y", 24)
      .attr("width", 0)
      .attr("height", 14)
      .attr("rx", 3)
      .attr("fill", "#2EC4B6")
      .transition()
      .duration(600)
      .attr("width", (d) => x(d.enrolledPercent));

    rows
      .append("text")
      .attr("x", (d) => x(d.affectedPercent) + 8)
      .attr("y", 15)
      .attr("dominant-baseline", "middle")
      .attr("class", "barrier-bar-value")
      .text((d) => `${d.affectedPercent}% affected`);

    rows
      .append("text")
      .attr("x", (d) => x(d.enrolledPercent) + 8)
      .attr("y", 31)
      .attr("dominant-baseline", "middle")
      .attr("class", "barrier-bar-value")
      .text((d) => `${d.enrolledPercent}% enrolled`);
  }
})();
