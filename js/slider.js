// Photo slider used on custom.html and semi-custom.html.
// Markup: .slider > .slider-main (.slides > .slide, prev/next buttons, .slider-count) + .slider-thumbs
document.querySelectorAll(".slider").forEach((slider) => {
  const track = slider.querySelector(".slides");
  const total = track.children.length;
  const thumbs = [...slider.querySelectorAll(".slider-thumbs button")];
  const count = slider.querySelector(".slider-count");
  let index = 0;

  function go(i) {
    index = (i + total) % total; // wrap around at both ends
    track.style.transform = `translateX(-${index * 100}%)`;
    count.textContent = `${index + 1} / ${total}`;
    thumbs.forEach((t, n) => t.setAttribute("aria-current", n === index));
    // keep the active thumbnail visible inside its own strip (does not scroll the page)
    const strip = slider.querySelector(".slider-thumbs");
    const thumb = thumbs[index].getBoundingClientRect();
    const box = strip.getBoundingClientRect();
    const left = strip.scrollLeft + (thumb.left - box.left) - (box.width - thumb.width) / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }

  slider.querySelector(".slider-prev").addEventListener("click", () => go(index - 1));
  slider.querySelector(".slider-next").addEventListener("click", () => go(index + 1));
  thumbs.forEach((t, n) => t.addEventListener("click", () => go(n)));
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  });

  // swipe on touch screens
  let startX = null;
  const main = slider.querySelector(".slider-main");
  main.addEventListener("pointerdown", (e) => { startX = e.clientX; });
  main.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? index + 1 : index - 1);
  });
  main.addEventListener("pointercancel", () => { startX = null; });

  go(0);
});
