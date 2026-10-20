// custom.html and semi-custom.html hero: photos cross-fade and drift on scroll (same idea as the original site).
// Markup: .hero-slideshow > .hero-parallax > img.hero-slide (one has .is-active)
const heroBox = document.querySelector(".hero-slideshow");

if (heroBox) {
  const layer = heroBox.querySelector(".hero-parallax");
  let slides = [...heroBox.querySelectorAll(".hero-slide")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;

  // ---------- 1. DROP PHOTOS THAT FAIL TO LOAD (they come from the original site) ----------
  function dropSlide(img) {
    const wasActive = img.classList.contains("is-active");
    slides = slides.filter((s) => s !== img);
    img.remove();
    current = 0;
    if (wasActive && slides[0]) slides[0].classList.add("is-active");
  }
  slides.forEach((img) => {
    img.addEventListener("error", () => dropSlide(img));
    if (img.complete && img.naturalWidth === 0) dropSlide(img); // error fired before this script ran
  });

  // ---------- 2. CROSS-FADE EVERY 5 SECONDS ----------
  if (!reduceMotion) {
    setInterval(() => {
      if (document.hidden || slides.length < 2) return; // no work in a background tab
      current = (current + 1) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === current));
    }, 5000);
  }

  // ---------- 3. PARALLAX: layer moves slower than the page ----------
  if (!reduceMotion) {
    let waiting = false;
    const drift = () => {
      waiting = false;
      const box = heroBox.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return; // hero is off screen
      const spare = layer.offsetHeight - heroBox.clientHeight; // extra height the layer has
      // 0 when the hero enters at the bottom of the screen, 1 when it leaves at the top
      const t = Math.min(1, Math.max(0, (window.innerHeight - box.top) / (window.innerHeight + box.height)));
      layer.style.transform = `translateY(${(t - 0.5) * spare}px)`;
    };
    const queue = () => {
      if (!waiting) { waiting = true; requestAnimationFrame(drift); } // at most once per frame
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    drift();
  }
}
