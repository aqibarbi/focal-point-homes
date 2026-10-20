// Shared by every sub page: theme, menu, header shadow, newsletter, footer year, contact form.
// (The homepage keeps its own js/main.js.)

// ---------- 1. DARK / LIGHT THEME ----------
const root = document.documentElement;
const themeBtn = document.getElementById("theme-btn");
let theme = null;
try { theme = localStorage.getItem("theme"); } catch (e) {} // storage can be blocked
if (!theme) theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
  menu.classList.toggle("is-open", open);
  menuBtn.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
  if (open) menu.querySelector("a").focus();
  else menuBtn.focus();
}
menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
});

// ---------- 3. HEADER SHADOW AFTER SCROLL ----------
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 10));

// ---------- 4. NEWSLETTER FORM CHECK ----------
const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const newsletter = document.getElementById("newsletter");
const newsMsg = document.getElementById("form-msg");

newsletter.addEventListener("submit", (e) => {
  e.preventDefault(); // no backend yet, so we only check the fields
  const email = document.getElementById("email");
  if (!emailOk(email.value)) {
    newsMsg.textContent = "Please enter a valid email address.";
    newsMsg.className = "form-msg error";
    email.focus();
    return;
  }
  if (!document.getElementById("consent").checked) {
    newsMsg.textContent = "Please tick the consent box to subscribe.";
    newsMsg.className = "form-msg error";
    return;
  }
  newsMsg.textContent = "Thank you for subscribing (demo form).";
  newsMsg.className = "form-msg ok";
  newsletter.reset();
});

// ---------- 5. FOOTER YEAR ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- 6. CONTACT FORM CHECK (only on pages that have #inquiry) ----------
const inquiry = document.getElementById("inquiry");
if (inquiry) {
  const out = document.getElementById("inquiry-msg");
  inquiry.addEventListener("submit", (e) => {
    e.preventDefault();
    // required fields in order; first empty one gets the message and focus
    const checks = [
      ["inq-name", "Please enter your name."],
      ["inq-phone", "Please enter a phone number."],
      ["inq-topic", "Please choose what you are interested in."],
      ["inq-text", "Please write a message."],
    ];
    inquiry.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
    for (const [id, text] of checks) {
      const field = document.getElementById(id);
      if (!field.value.trim()) {
        field.setAttribute("aria-invalid", "true");
        out.textContent = text;
        out.className = "form-msg error";
        field.focus();
        return;
      }
    }
    const mail = document.getElementById("inq-email");
    if (mail.value && !emailOk(mail.value)) { // email is optional, but must be valid if filled
      mail.setAttribute("aria-invalid", "true");
      out.textContent = "That email address does not look right.";
      out.className = "form-msg error";
      mail.focus();
      return;
    }
    out.textContent = "Thank you! We will be in touch soon (demo form).";
    out.className = "form-msg ok";
    inquiry.reset();
  });
}
