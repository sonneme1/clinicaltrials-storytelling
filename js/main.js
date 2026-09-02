/**
 * main.js
 * Core scroll engine: progress rail, chapter reveal-on-scroll, hero counter animation.
 */

document.addEventListener("DOMContentLoaded", () => {
  initProgressRail();
  initChapterReveals();
  initHeroCounter();
});

function initProgressRail() {
  const fill = document.getElementById("progressFill");
  if (!fill) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    fill.style.width = `${pct}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

function initChapterReveals() {
  const chapters = document.querySelectorAll(".chapter");
  chapters.forEach((c) => c.classList.add("is-hidden"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-hidden");
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  chapters.forEach((c) => observer.observe(c));
}

function initHeroCounter() {
  const counterEl = document.getElementById("heroCounter");
  const hookStat = document.getElementById("hookStat");
  if (!counterEl) return;

  const start = parseInt(counterEl.dataset.start, 10);
  const end = parseInt(counterEl.dataset.end, 10);
  let hasRun = false;

  const runCounter = () => {
    if (hasRun) return;
    hasRun = true;

    const duration = 2400;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.round(start - (start - end) * eased);
      counterEl.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else if (hookStat) {
        hookStat.style.transition = "opacity 1s ease";
        hookStat.style.opacity = "1";
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) runCounter();
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(counterEl);
}
