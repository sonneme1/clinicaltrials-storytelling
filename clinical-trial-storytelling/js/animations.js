// animations.js
// This file handles all animations used throughout the project,
// including the animated counter on the title screen and scroll-triggered animations for each chapter.

document.addEventListener("DOMContentLoaded", function() {
    const counterElement = document.getElementById("counter");
    let count = 10000;
    const target = 312;
    const duration = 3000; // duration in milliseconds
    const stepTime = Math.abs(Math.floor(duration / (count - target)));

    const animateCounter = () => {
        if (count > target) {
            counterElement.textContent = count;
            count--;
            setTimeout(animateCounter, stepTime);
        } else {
            counterElement.textContent = target;
        }
    };

    animateCounter();

    // Scroll-triggered animations
    const chapters = document.querySelectorAll(".chapter");
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const animateOnScroll = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, options);
    chapters.forEach(chapter => {
        observer.observe(chapter);
    });
});