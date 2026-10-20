// customer-care.html: search the guide list
const guideSearch = document.getElementById("guide-search");
const guideItems = document.querySelectorAll(".guides li");
const guideEmpty = document.getElementById("guide-empty");

guideSearch.addEventListener("input", () => {
  const term = guideSearch.value.trim().toLowerCase();
  let shown = 0;
  guideItems.forEach((item) => {
    const match = item.textContent.toLowerCase().includes(term);
    item.hidden = !match;
    if (match) shown++;
  });
  guideEmpty.hidden = shown > 0;
});
