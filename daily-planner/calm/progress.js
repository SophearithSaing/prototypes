(function () {
  const toast = document.querySelector(".toast");
  let toastTimer;

  function showToast(message) {
    toast.querySelector("p").textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  document.querySelectorAll("[data-share]").forEach((button) => {
    button.addEventListener("click", () => showToast("Weekly summary copied"));
  });

  const periods = ["Last week", "This week", "Last 4 weeks"];
  let periodIndex = 1;
  document.querySelector("[data-period]").addEventListener("click", (event) => {
    const clickedRight = event.offsetX > event.currentTarget.offsetWidth / 2;
    periodIndex =
      (periodIndex + (clickedRight ? 1 : periods.length - 1)) % periods.length;
    event.currentTarget.querySelector("span").textContent =
      periods[periodIndex];
    showToast(`${periods[periodIndex]} selected`);
  });
})();
