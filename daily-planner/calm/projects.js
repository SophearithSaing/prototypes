(function () {
  const toast = document.querySelector(".toast");
  let toastTimer;

  function showToast(message) {
    toast.querySelector("p").textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  const projectData = {
    website: {
      glyph: "W",
      color: "peach",
      title: "Website launch",
      description:
        "Everything needed to ship the new marketing site by September 11.",
      complete: "67%",
      tasks: "9",
      hours: "14.5h",
      progress: "67%",
      cards: [
        "Finish launch proposal",
        "Build responsive hero",
        "Review pricing page copy",
        "Create social launch assets",
        "Partner feedback round",
        "Connect newsletter form",
        "Polish tablet layouts",
      ],
    },
    mobile: {
      glyph: "M",
      color: "blue",
      title: "Mobile app",
      description:
        "A clearer onboarding experience for the next product release.",
      complete: "42%",
      tasks: "7",
      hours: "21h",
      progress: "42%",
      cards: [
        "QA onboarding flow",
        "Resolve sign-in edge cases",
        "Write empty state notes",
        "Test notification prompts",
        "Prepare beta notes",
        "Add offline states",
        "Review accessibility",
      ],
    },
    personal: {
      glyph: "P",
      color: "yellow",
      title: "Personal",
      description:
        "Small commitments that keep life outside work running smoothly.",
      complete: "58%",
      tasks: "5",
      hours: "4.5h",
      progress: "58%",
      cards: [
        "Book dentist appointment",
        "Plan Saturday groceries",
        "Renew renter insurance",
        "Sort travel photos",
        "Call the repair shop",
        "Review monthly budget",
        "Clear donation box",
      ],
    },
  };

  const taskTitles = Array.from(
    document.querySelectorAll(".calm-task-card:not(.completed-card) h3"),
  );
  document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const data = projectData[button.dataset.project];
      document
        .querySelectorAll("[data-project]")
        .forEach((tab) => tab.classList.toggle("active", tab === button));
      const glyph = document.querySelector("[data-project-glyph]");
      glyph.className = `project-glyph ${data.color} large`;
      glyph.textContent = data.glyph;
      document.querySelector("[data-project-title]").textContent = data.title;
      document.querySelector("[data-project-description]").textContent =
        data.description;
      document.querySelector("[data-project-complete]").textContent =
        data.complete;
      document.querySelector("[data-project-tasks]").textContent = data.tasks;
      document.querySelector("[data-project-hours]").textContent = data.hours;
      document.querySelector("[data-project-progress]").style.width =
        data.progress;
      taskTitles.forEach((title, index) => {
        title.textContent = data.cards[index];
      });
      document
        .querySelector(".calm-board")
        .setAttribute("aria-label", `${data.title} task board`);
      showToast(`${data.title} selected`);
    });
  });

  document.querySelectorAll("[data-board-calm]").forEach((button) => {
    button.addEventListener("click", () => {
      const active = document.body.classList.toggle("board-calm");
      document.querySelectorAll("[data-board-calm]").forEach((toggle) => {
        toggle.classList.toggle("active", active);
        toggle.setAttribute("aria-pressed", String(active));
      });
      showToast(
        active
          ? "Showing only what needs attention now"
          : "Showing the full project",
      );
    });
  });

  const dialog = document.getElementById("task-dialog");
  document.querySelectorAll("[data-open-task]").forEach((button) => {
    button.addEventListener("click", () => dialog.showModal());
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  const form = document.querySelector("[data-task-form]");
  document
    .querySelector("[data-save-task]")
    .addEventListener("click", (event) => {
      if (!form.reportValidity()) {
        event.preventDefault();
        return;
      }
      const data = new FormData(form);
      const card = document.createElement("article");
      card.className = "calm-task-card";
      card.dataset.owner = "me";
      card.innerHTML = `<div class="task-card-top"><span class="task-kind strategy">New</span><button type="button" aria-label="Task menu">&bull;&bull;&bull;</button></div><h3>${escapeHtml(data.get("title"))}</h3><p>Newly captured and ready when you are.</p><footer><span class="gentle-due">Unscheduled</span><span class="workload">${escapeHtml(data.get("estimate"))}</span><span class="mini-avatar">AK</span></footer>`;
      document
        .querySelector(`[data-column="${data.get("column")}"]`)
        .prepend(card);
      setTimeout(() => {
        form.reset();
        showToast("Task added without changing today");
      }, 20);
    });

  const filter = document.querySelector("[data-filter]");
  filter.addEventListener("click", () => {
    const active = filter.classList.toggle("active");
    document.querySelectorAll('[data-owner="other"]').forEach((card) => {
      card.hidden = active;
    });
    showToast(active ? "Showing tasks assigned to you" : "Showing everyone");
  });

  document.querySelectorAll("[data-view-message]").forEach((button) => {
    button.addEventListener("click", () =>
      showToast(
        `${button.dataset.viewMessage} view is ready for a future pass`,
      ),
    );
  });

  function escapeHtml(value) {
    const node = document.createElement("div");
    node.textContent = String(value ?? "");
    return node.innerHTML;
  }
})();
