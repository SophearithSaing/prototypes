(function () {
  const toast = document.querySelector(".toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.querySelector("p").textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  document.querySelectorAll("[data-quiet-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const active = document.body.classList.toggle("quiet-mode");
      document.querySelectorAll("[data-quiet-toggle]").forEach((toggle) => {
        toggle.classList.toggle("active", active);
        toggle.setAttribute("aria-pressed", String(active));
      });
      showToast(active ? "Quiet mode on" : "Everything is visible again");
    });
  });

  const composer = document.querySelector("[data-composer]");
  document.querySelectorAll("[data-compose-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const open = composer.classList.toggle("open");
      composer.setAttribute("aria-hidden", String(!open));
      document
        .querySelectorAll("[data-compose-toggle]")
        .forEach((toggle) =>
          toggle.setAttribute("aria-expanded", String(open)),
        );
      if (open) {
        composer.querySelector("input").focus();
        composer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  document
    .querySelector("[data-quick-form]")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const title = data.get("task").trim();
      if (!title) {
        form.querySelector("input").focus();
        return;
      }
      const item = document.createElement("span");
      item.textContent = title;
      document.querySelector("[data-parking-list]").prepend(item);
      form.reset();
      composer.classList.remove("open");
      composer.setAttribute("aria-hidden", "true");
      showToast("Saved safely for later");
    });

  const energyCopy = {
    low: {
      overview:
        "Three essentials, two meetings, and extra room to recover between them.",
      message:
        "I trimmed the optional work and protected a longer lunch. Only the essentials remain.",
      heading: "We can make this easier.",
    },
    steady: {
      overview:
        "Five tasks, two meetings, and enough space between them to reset.",
      message:
        "I placed the launch proposal at 10:00, then kept smaller work for later when your energy usually dips.",
      heading: "I found a gentler fit.",
    },
    strong: {
      overview:
        "Five tasks, two meetings, and an open hour if you want to use the momentum.",
      message:
        "Your core plan stays balanced. I kept one optional task nearby if you still feel strong after 3 PM.",
      heading: "There is room for momentum.",
    },
  };

  document.querySelectorAll("[data-energy]").forEach((button) => {
    button.addEventListener("click", () => {
      const level = button.dataset.energy;
      document
        .querySelectorAll("[data-energy]")
        .forEach((choice) =>
          choice.classList.toggle("active", choice === button),
        );
      document.querySelector("[data-overview-text]").textContent =
        energyCopy[level].overview;
      document.querySelector("[data-assistant-message]").textContent =
        energyCopy[level].message;
      document.querySelector("[data-assistant-card] h2").textContent =
        energyCopy[level].heading;
      showToast(`Plan adjusted for ${level} energy`);
    });
  });

  const moveTimes = ["11:30 AM", "2:30 PM", "Tomorrow at 9:00 AM"];
  let moveIndex = 0;
  document.querySelector("[data-move-task]").addEventListener("click", () => {
    showToast(`Moved to ${moveTimes[moveIndex]}`);
    moveIndex = (moveIndex + 1) % moveTimes.length;
  });

  document
    .querySelector("[data-replace-task]")
    .addEventListener("click", () => {
      showToast("Looking for a better-fit task");
    });

  const whyButton = document.querySelector("[data-why-toggle]");
  whyButton.addEventListener("click", () => {
    const open = document
      .querySelector("[data-why-panel]")
      .classList.toggle("open");
    whyButton.setAttribute("aria-expanded", String(open));
  });

  const scheduleButton = document.querySelector("[data-collapse-schedule]");
  const scheduleList = document.querySelector("[data-schedule-list]");
  scheduleList.style.maxHeight = `${scheduleList.scrollHeight}px`;
  scheduleButton.addEventListener("click", () => {
    const collapsed = scheduleList.classList.toggle("collapsed");
    scheduleButton.setAttribute("aria-expanded", String(!collapsed));
    scheduleButton.firstChild.textContent = collapsed
      ? "Show details "
      : "Hide details ";
  });

  const recapButton = document.querySelector("[data-recap-toggle]");
  recapButton.addEventListener("click", () => {
    const open = document
      .querySelector("[data-recap-details]")
      .classList.toggle("open");
    recapButton.firstChild.textContent = open
      ? "Hide yesterday details "
      : "See yesterday's changes ";
  });

  document
    .querySelectorAll('.schedule-item input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        checkbox
          .closest(".schedule-item")
          .classList.toggle("is-done", checkbox.checked);
        const completed =
          document.querySelectorAll(".schedule-item input:checked").length + 1;
        document.querySelector("[data-task-progress]").textContent =
          `${completed} of 5`;
        document.querySelector("[data-progress-bar]").style.width =
          `${completed * 20}%`;
        showToast(
          checkbox.checked ? "Task complete. Nicely done." : "Task reopened",
        );
      });
    });
})();
