// ---------- 1. DARK / LIGHT THEME ----------
const root = document.documentElement;
const themeBtn = document.getElementById("theme-btn");

// use saved choice, or the system setting
let theme = null;
try { theme = localStorage.getItem("theme"); } catch (e) {} // storage can be blocked
if (!theme) {
  theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
root.dataset.theme = theme;

themeBtn.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  root.dataset.theme = theme;
  try { localStorage.setItem("theme", theme); } catch (e) {}
});

// ---------- 2. FULL SCREEN MENU ----------
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");

function setMenu(open) {
  menu.classList.toggle("is-open", open); // CSS does the drop down animation
  menuBtn.classList.toggle("is-open", open); // burger icon turns into X
  menuBtn.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : ""; // stop page scrolling behind menu
  if (open) menu.querySelector("a").focus(); // keyboard users land inside the menu
  else menuBtn.focus();
}

menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
});

// ---------- 3. HEADER SHADOW AFTER SCROLL ----------
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
});

// ---------- 4. GALLERY (built here so the HTML stays short) ----------
const photos = []; // every photo, used by the lightbox

function buildRow(rowId, prefix) {
  const row = document.getElementById(rowId);
  // add the 10 photos twice, so the scrolling loop has no gap
  for (let round = 0; round < 2; round++) {
    for (let i = 1; i <= 10; i++) {
      const src = `images/${prefix}-${i}.webp`;
      const btn = document.createElement("button");
      btn.className = "thumb";
      btn.type = "button";
      btn.setAttribute("aria-label", `Open photo ${i}`);
      if (round === 1) {
        btn.tabIndex = -1; // copy is only for the loop
        btn.setAttribute("aria-hidden", "true");
      }
      btn.innerHTML = `<img src="${src}" alt="Completed Focal Point Homes project, photo ${i}" width="900" height="600" loading="lazy">`;
      btn.addEventListener("click", () => openLightbox(src));
      row.appendChild(btn);
      if (round === 0) photos.push(src);
    }
  }
}
buildRow("row1", "g1");
buildRow("row2", "g2");

// ---------- 5. LIGHTBOX ----------
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
let current = 0;

function showPhoto(index) {
  // wrap around: after last photo go to first
  current = (index + photos.length) % photos.length;
  lbImg.src = photos[current];
}
function openLightbox(src) {
  showPhoto(photos.indexOf(src));
  lightbox.showModal(); // <dialog> handles Esc key and focus for us
  document.body.style.overflow = "hidden";
}
lightbox.addEventListener("close", () => {
  document.body.style.overflow = "";
});

document.getElementById("lb-close").addEventListener("click", () => lightbox.close());
document.getElementById("lb-prev").addEventListener("click", () => showPhoto(current - 1));
document.getElementById("lb-next").addEventListener("click", () => showPhoto(current + 1));
lightbox.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") showPhoto(current - 1);
  if (e.key === "ArrowRight") showPhoto(current + 1);
});
// click on the dark area closes it
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.close();
});

// ---------- 6. MARK PAST OPEN HOUSES ----------
const today = new Date();
let upcoming = 0;
document.querySelectorAll(".open-house").forEach((house) => {
  const date = new Date(house.dataset.date + "T23:59:59");
  if (date < today) house.classList.add("is-past");
  else upcoming++;
});
// nothing upcoming: change the title and tell people what to do
if (upcoming === 0) {
  const section = document.getElementById("open-houses");
  section.querySelector(".section-title").textContent = "Recent open houses";
  const note = document.createElement("p");
  note.className = "no-events";
  note.innerHTML = 'No open houses are scheduled right now. <a href="tel:+17033561231">Call (703) 356-1231</a> to book a private tour.';
  section.appendChild(note);
}

// ---------- 7. NEWSLETTER FORM CHECK ----------
const form = document.getElementById("newsletter");
const emailInput = document.getElementById("email");
const message = document.getElementById("form-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // no backend yet, so we only check the email
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  if (!emailOk) {
    message.textContent = "Please enter a valid email address.";
    message.className = "form-msg error";
    emailInput.focus();
    return;
  }
  // consent box must be ticked (same as the original site)
  if (!document.getElementById("consent").checked) {
    message.textContent = "Please tick the consent box to subscribe.";
    message.className = "form-msg error";
    return;
  }
  message.textContent = "Thank you for subscribing (demo form).";
  message.className = "form-msg ok";
  form.reset();
});

// ---------- 8. FOOTER YEAR ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- 9. INTRO VIDEO (Vimeo, same video as the original site) ----------
const introModal = document.getElementById("intro-modal");
const videoFrame = document.getElementById("video-frame");

document.getElementById("intro-btn").addEventListener("click", () => {
  // the player loads only when the button is clicked, so the page stays fast
  videoFrame.innerHTML =
    '<iframe src="https://player.vimeo.com/video/1133629204?autoplay=1" title="Focal Point Homes intro video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
  introModal.showModal();
  document.body.style.overflow = "hidden";
});

// removing the iframe on close stops the video and sound
introModal.addEventListener("close", () => {
  videoFrame.innerHTML = "";
  document.body.style.overflow = "";
});
document.getElementById("intro-close").addEventListener("click", () => introModal.close());
introModal.addEventListener("click", (e) => {
  if (e.target === introModal) introModal.close();
});


// ---------- 10. PLAY VIDEOS ONLY WHEN VISIBLE (saves battery and data) ----------
const videoPairs = [
  [document.querySelector(".hero-video"), document.querySelector(".hero")],
  [document.querySelector(".review-video"), document.querySelector(".review-frame")],
];
videoPairs.forEach(([video, box]) => {
  // we watch the box, not the video: a fixed video always counts as "on screen"
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) video.play().catch(() => {}); // autoplay can be blocked, ignore
    else video.pause();
  }).observe(box);
});
