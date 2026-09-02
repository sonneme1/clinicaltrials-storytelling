/**
 * whatif.js
 * Chapter 6 — Slider that interpolates the funnel visualization between the
 * "current model" and "designed for access" model, revealing interventions
 * progressively as the slider moves right.
 */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof d3 === "undefined" || typeof TRIAL_DATA === "undefined") return;

    renderInterventions();
    renderWhatIfChart(0);

    const slider = document.getElementById("whatifSlider");
    if (slider) {
      slider.addEventListener("input", () => {
        renderWhatIfChart(parseInt(slider.value, 10));
      });
    }

    window.addEventListener("resize", debounce(() => renderWhatIfChart(parseInt(slider ? slider.value : 0, 10)), 200));
  });

  let resizeTimer;
  function debounce(fn, delay) {
    return (...args) => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => fn(...args), delay);
    };
  }

  function renderInterventions() {
    const list = document.getElementById("whatifInterventions");
    if (!list) return;
    list.innerHTML = TRIAL_DATA.whatIf.designed.interventions
      .map(
        (i) => `<li data-lift="${i.liftPercent}"><strong>${i.name}</strong>+${i.liftPercent}% lift to enrollment</li>`
      )
      .join("");
  }

  function renderWhatIfChart(sliderValue) {
    const t = sliderValue / 100; // 0 = current, 1 = designed
    const container = document.getElementById("whatifSvg");
    if (!container) return;
    const wrap = container.parentElement;
    const width = wrap.clientWidth;

    const currentFunnel = TRIAL_DATA.whatIf.current.funnel;
    const designedFunnel = TRIAL_DATA.whatIf.designed.funnel;
    const labels = TRIAL_DATA.funnel.map((f) => f.stage);

    const interpolated = currentFunnel.map((v, i) => v + (designedFunnel[i] - v) * t);

    const rowHeight = 46;
    const height = interpolated.length * rowHeight + 20;
    const margin = { left: Math.min(width * 0.38, 280), right: 20 };
    const maxBarWidth = width - margin.left - margin.right;
    const maxCount = designedFunnel[0];
    const x = d3.scaleLinear().domain([0, maxCount]).range([0, maxBarWidth]);
    const color = d3.interpolateRgb("#E07A5F", "#2EC4B6")(t);

    const svg = d3.select("#whatifSvg");
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const g = svg.append("g").attr("transform", "translate(0, 10)");

    const rows = g
      .selectAll(".whatif-row")
      .data(interpolated)
      .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * rowHeight})`);

    rows
      .append("rect")
      .attr("x", margin.left)
      .attr("width", (d) => x(d))
      .attr("height", rowHeight - 12)
      .attr("rx", 3)
      .attr("fill", color);

    rows
      .append("text")
      .attr("class", "funnel-stage-label")
      .attr("x", margin.left - 16)
      .attr("y", (rowHeight - 12) / 2 + 4)
      .attr("text-anchor", "end")
      .text((d, i) => `${labels[i]} — ${Math.round(d).toLocaleString()}`);

    // Update headline counts
    const leftCount = document.getElementById("whatifCountLeft");
    const rightCount = document.getElementById("whatifCountRight");
    if (leftCount) leftCount.textContent = Math.round(interpolated[interpolated.length - 1]).toLocaleString();
    if (rightCount) rightCount.textContent = TRIAL_DATA.whatIf.designed.enrolled.toLocaleString();

    // Highlight interventions progressively based on slider position
    const items = document.querySelectorAll("#whatifInterventions li");
    const activeCount = Math.ceil((sliderValue / 100) * items.length);
    items.forEach((li, i) => li.classList.toggle("is-active", i < activeCount));
  }
})();
