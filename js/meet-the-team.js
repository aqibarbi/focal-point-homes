// meet-the-team.html: photo fallback + one open bio at a time

// photos load from the original site; if one fails, show the initials instead
document.querySelectorAll(".member-photo img").forEach((img) => {
  const fallback = () => img.parentElement.classList.add("no-photo");
  img.addEventListener("error", fallback);
  if (img.complete && img.naturalWidth === 0) fallback(); // error fired before this script ran
});

const members = document.querySelectorAll(".member");
members.forEach((member) => {
  member.addEventListener("toggle", () => {
    if (!member.open) return;
    members.forEach((other) => { if (other !== member) other.open = false; });
  });
});
