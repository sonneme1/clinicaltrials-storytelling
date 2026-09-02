/**
 * funnel.js
 * Chapter 2 — D3 funnel visualization. Renders the enrollment funnel as
 * horizontally-centered bars that shrink at each barrier, with hover/focus
 * detail (barrier + patient vignette) shown in the adjacent detail panel.
 */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof d3 === "undefined" || typeof TRIAL_DATA === "undefined") return;
    renderFunnelTable();
    renderFunnel();
    window.addEventListener("resize", debounce(renderFunnel, 200));
  });

  let resizeTimer;
  function debounce(fn, delay) {
    return (...args) => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => fn(...args), delay);
    };
  }

  function renderFunnelTable() {
    const tbody = document.getElementById("funnelTableBody");
    if (!tbody) return;
    tbody.innerHTML = TRIAL_DATA.funnel
      .map(
        (d) => `<tr><td>${d.stage}</td><td>${d.count.toLocaleString()}</td><td>${d.percent}%</td></tr>`
      )
      .join("");
  }

  function renderFunnel() {
    const container = document.getElementById("funnelSvg");
    if (!container) return;
    const wrap = container.parentElement;
    const width = wrap.clientWidth;
    const stages = TRIAL_DATA.funnel;
    const rowHeight = 62;
    const height = stages.length * rowHeight + 20;
    const maxBarWidth = width * 0.9;

    const svg = d3.select("#funnelSvg");
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const maxCount = stages[0].count;
    const scaleWidth = d3.scaleLinear().domain([0, maxCount]).range([0, maxBarWidth]);

    const g = svg.append("g").attr("transform", "translate(0, 10)");

    const groups = g
      .selectAll(".funnel-stage-group")
      .data(stages)
      .join("g")
      .attr("class", "funnel-stage-group")
      .attr("tabindex", 0)
      .attr("role", "button")
      .attr("aria-label", (d) => `${d.stage}: ${d.count.toLocaleString()} people, ${d.percent}% remaining`)
      .attr("transform", (d, i) => `translate(0, ${i * rowHeight})`);

    groups
      .append("rect")
      .attr("class", "funnel-bar")
      .attr("x", (d) => (width - scaleWidth(d.count)) / 2)
      .attr("y", 0)
      .attr("width", (d) => scaleWidth(d.count))
      .attr("height", rowHeight - 14)
      .attr("rx", 4)
      .attr("fill", (d, i) => (i === 0 ? "#2EC4B6" : d3.interpolateRgb("#2EC4B6", "#E07A5F")(i / (stages.length - 1))));

    groups
      .append("text")
      .attr("class", "funnel-stage-label")
      .attr("x", width / 2)
      .attr("y", (rowHeight - 14) / 2 - 6)
      .attr("text-anchor", "middle")
      .text((d) => d.stage);

    groups
      .append("text")
      .attr("class", "funnel-stage-count")
      .attr("x", width / 2)
      .attr("y", (rowHeight - 14) / 2 + 14)
      .attr("text-anchor", "middle")
      .text((d) => `${d.count.toLocaleString()} (${d.percent}%)`);

    groups
      .on("mouseenter focus", function (event, d) {
        setActiveStage(this, d);
      })
      .on("mouseleave", function () {
        // keep last hovered detail visible; no-op on leave for stability
      });

    // Auto-select first stage detail on initial paint, if nothing selected yet.
    if (!document.querySelector(".funnel-stage-group.is-active")) {
      const firstBarrierStage = stages.find((s) => s.barrier);
      if (firstBarrierStage) {
        const idx = stages.indexOf(firstBarrierStage);
        const node = groups.nodes()[idx];
        setActiveStage(node, firstBarrierStage);
      }
    }
  }

  function setActiveStage(node, d) {
    d3.selectAll(".funnel-stage-group").classed("is-active", false);
    d3.select(node).classed("is-active", true);
    renderDetail(d);
  }

  function renderDetail(d) {
    const detail = document.getElementById("funnelDetail");
    if (!detail) return;

    if (!d.barrier) {
      detail.innerHTML = `<p class="funnel-detail-placeholder">${d.stage} — the starting pool, before any barrier is applied.</p>`;
      return;
    }

    const persona = TRIAL_DATA.personas.find((p) => p.linkedStage === d.stage);

    let html = `
      <p class="funnel-detail-barrier">${d.barrier}</p>
      <p class="funnel-detail-reason">${d.reason}</p>
    `;

    if (persona) {
      html += `
        <div class="funnel-detail-persona">
          <p class="funnel-detail-persona-name">${persona.name}, ${persona.age}</p>
          <p class="funnel-detail-persona-meta">${persona.location} · ${persona.condition}</p>
          <p class="funnel-detail-quote">"${persona.quote}"</p>
          <p class="funnel-detail-barrier" style="margin-bottom:0.25rem;">What would have helped</p>
          <ul class="funnel-detail-list">
            ${persona.wouldHaveHelped.map((h) => `<li>${h}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    detail.innerHTML = html;
  }
})();
