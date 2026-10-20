// semi-custom.html: sort the plan list (price, size, name)
const planList = document.getElementById("plan-list");
const planSort = document.getElementById("plan-sort");

planSort.addEventListener("change", () => {
  const plans = [...planList.children];
  const by = planSort.value;
  plans.sort((a, b) => {
    if (by === "name") return a.dataset.name.localeCompare(b.dataset.name);
    // plans without a size yet (sqft 0) always go last when sorting by size
    if (by === "size-high") return (+b.dataset.sqft || -1) - (+a.dataset.sqft || -1);
    if (by === "size-low") return (+a.dataset.sqft || 1e9) - (+b.dataset.sqft || 1e9);
    if (by === "price-high") return b.dataset.price - a.dataset.price;
    return a.dataset.price - b.dataset.price; // price-low (default)
  });
  plans.forEach((plan) => planList.appendChild(plan)); // moves existing nodes, no copies
});
