// customer-reviews.html: play Vimeo stories in a modal
const storyModal = document.getElementById("story-modal");
const storyFrame = document.getElementById("story-frame");
const storyLink = document.getElementById("story-link");

document.querySelectorAll("[data-vimeo]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.vimeo;
    // the player loads only on click, so the page stays fast
    storyFrame.innerHTML =
      `<iframe src="https://player.vimeo.com/video/${id}?autoplay=1" title="${btn.dataset.title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    storyLink.href = `https://vimeo.com/${id}`;
    storyModal.showModal();
    document.body.style.overflow = "hidden";
  });
});

// removing the iframe on close stops the video and sound
storyModal.addEventListener("close", () => {
  storyFrame.innerHTML = "";
  document.body.style.overflow = "";
});
document.getElementById("story-close").addEventListener("click", () => storyModal.close());
storyModal.addEventListener("click", (e) => {
  if (e.target === storyModal) storyModal.close();
});
