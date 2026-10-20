// quick-delivery.html: filter homes by status
const filterBtns = document.querySelectorAll(".filter [data-filter]");
const homes = document.querySelectorAll(".home");
const countText = document.getElementById("home-count");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter; // all | available | contract
    let shown = 0;
    homes.forEach((home) => {
      const match = filter === "all" || home.dataset.status === filter;
      home.hidden = !match;
      if (match) shown++;
    });
    filterBtns.forEach((b) => b.setAttribute("aria-pressed", b === btn));
    countText.textContent = `${shown} ${shown === 1 ? "home" : "homes"}`;
  });
});
