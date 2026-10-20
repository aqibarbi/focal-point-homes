// blog.html: "Load more articles" button (all articles stay visible if JS is off)
const STEP = 10;
const postItems = [...document.querySelectorAll(".post-list li")];
const moreBtn = document.getElementById("load-more");
let visible = STEP;

function render() {
  postItems.forEach((item, i) => { item.hidden = i >= visible; });
  moreBtn.hidden = visible >= postItems.length;
}
moreBtn.addEventListener("click", () => {
  visible += STEP;
  render();
});
render();
