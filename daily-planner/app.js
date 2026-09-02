(function () {
  const toast = document.querySelector(".toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    const text = toast.querySelector("p");
    if (text) text.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  document.querySelectorAll("[data-open-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.getElementById(button.dataset.openModal);
      if (modal && typeof modal.showModal === "function") modal.showModal();
    });
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) modal.close();
    });
  });

  const focusToggle = document.querySelector("[data-focus-toggle]");
  if (focusToggle) {
    focusToggle.addEventListener("click", () => {
      const enabled = focusToggle.classList.toggle("enabled");
      document
        .querySelector("[data-timeline]")
        ?.classList.toggle("focus-mode", enabled);
      showToast(enabled ? "Focus view enabled" : "Full schedule restored");
    });
  }

  const acceptButton = document.querySelector("[data-accept]");
  if (acceptButton) {
    acceptButton.addEventListener("click", () => {
      const suggestion = acceptButton.closest("[data-suggestion]");
      suggestion?.classList.add("accepted");
      acceptButton.textContent = "Accepted \u2713";
      acceptButton.disabled = true;
      suggestion
        ?.querySelector(".agent-badge")
        ?.replaceChildren(document.createTextNode("\u2713 Scheduled"));
      showToast("Added to today's plan");
    });
  }

  document.querySelectorAll("[data-swap]").forEach((button) => {
    button.addEventListener("click", () => {
      const suggestion = document.querySelector("[data-suggestion]");
      const time = suggestion?.querySelector(".event-time");
      const title = suggestion?.querySelector("h3");
      const reason = suggestion?.querySelector(".why-line span");

      if (button.dataset.swap === "later" && time) {
        time.textContent = "3:00 \u2013 4:30";
        if (reason)
          reason.innerHTML =
            "<strong>Why now:</strong> Moved after your review, leaving the morning open as requested.";
      }
      if (button.dataset.swap === "shorter" && time) {
        time.textContent = "10:00 \u2013 10:45";
        if (reason)
          reason.innerHTML =
            "<strong>Why now:</strong> First half today; I reserved the second half tomorrow at 9:30 AM.";
      }
      if (button.dataset.swap === "different" && title) {
        title.textContent = "Review pricing page copy";
        if (time) time.textContent = "10:00 \u2013 10:30";
        if (reason)
          reason.innerHTML =
            "<strong>Why now:</strong> High-impact, due Friday, and fits this smaller focus window.";
      }
      showToast("Suggestion adjusted");
    });
  });

  document.querySelectorAll(".task-item input").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      showToast(checkbox.checked ? "Task completed" : "Task restored");
    });
  });

  const taskForm = document.querySelector("[data-task-form]");
  document
    .querySelector("[data-submit-task]")
    ?.addEventListener("click", (event) => {
      if (!taskForm?.reportValidity()) {
        event.preventDefault();
        return;
      }
      const formData = new FormData(taskForm);
      const taskList = document.querySelector("[data-task-list]");
      const project = formData.get("project");
      const projectClass =
        project === "Mobile app"
          ? "blue"
          : project === "Personal"
            ? "yellow"
            : "coral";
      if (taskList) {
        const item = document.createElement("label");
        item.className = "task-item";
        item.innerHTML = `
        <input type="checkbox">
        <span class="custom-check"><svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"></path></svg></span>
        <span class="task-copy"><strong>${escapeHtml(formData.get("title"))}</strong><small><i class="project-dot ${projectClass}"></i> ${escapeHtml(project)} &middot; ${escapeHtml(formData.get("estimate"))}</small></span>
        <span class="priority-mark ${escapeHtml(formData.get("priority"))}"></span>`;
        taskList.appendChild(item);
        item
          .querySelector("input")
          .addEventListener("change", () => showToast("Task completed"));
      }
      setTimeout(() => {
        taskForm.reset();
        showToast("Task added to your backlog");
      }, 20);
    });

  const projectTaskForm = document.querySelector("[data-project-task-form]");
  document
    .querySelector("[data-submit-project-task]")
    ?.addEventListener("click", (event) => {
      if (!projectTaskForm?.reportValidity()) {
        event.preventDefault();
        return;
      }
      const data = new FormData(projectTaskForm);
      const firstColumn = document.querySelector(".board-column .board-cards");
      if (firstColumn) {
        const card = document.createElement("article");
        card.className = "task-card";
        card.innerHTML = `<div class="card-top"><span class="tag strategy">New</span><button type="button">&bull;&bull;&bull;</button></div><h4>${escapeHtml(data.get("title"))}</h4><p>Newly captured task, ready to plan.</p><footer><span class="due-date">Unscheduled</span><span class="effort">${escapeHtml(data.get("estimate"))}</span><span class="avatar small">AK</span></footer>`;
        firstColumn.prepend(card);
      }
      setTimeout(() => {
        projectTaskForm.reset();
        showToast("Task added to Website launch");
      }, 20);
    });

  document.querySelectorAll("[data-show-toast]").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.showToast));
  });

  document.querySelectorAll(".view-tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".view-tabs button")
        .forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      if (button.textContent.trim() !== "Board")
        showToast(
          `${button.textContent.trim()} view is ready for the next prototype pass`,
        );
    });
  });

  document.querySelectorAll(".date-cell").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("active")) return;
      showToast(`${button.querySelector("span").textContent} preview selected`);
    });
  });

  function escapeHtml(value) {
    const element = document.createElement("div");
    element.textContent = String(value ?? "");
    return element.innerHTML;
  }
})();
