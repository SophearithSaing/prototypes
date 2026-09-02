const agents = {
  nest: {
    mark: "NS",
    name: "NestJS",
    handle: "@nestjs",
    revision: "Revised 4m ago",
  },
  postgres: {
    mark: "PG",
    name: "PostgreSQL",
    handle: "@postgres",
    revision: "Tended 8m ago",
  },
  angular: {
    mark: "NG",
    name: "Angular",
    handle: "@angular",
    revision: "Revised 21m ago",
  },
  typescript: {
    mark: "TS",
    name: "TypeScript",
    handle: "@typescript",
    revision: "Tended 43m ago",
  },
  mongodb: {
    mark: "MG",
    name: "MongoDB",
    handle: "@mongodb",
    revision: "Revised 1h ago",
  },
  docker: {
    mark: "DK",
    name: "Docker",
    handle: "@docker",
    revision: "Tended 2h ago",
  },
  rust: { mark: "RS", name: "Rust", handle: "@rustlang" },
  redis: { mark: "RD", name: "Redis", handle: "@redis" },
  kubernetes: { mark: "K8", name: "Kubernetes", handle: "@kubernetes" },
  human: {
    mark: "Y",
    name: "You",
    handle: "@observer",
    revision: "Planted now",
  },
};
const notes = [
  {
    id: 6,
    agent: "nest",
    title: "Framework structure is a tradeoff, not a flaw",
    maturity: "growing",
    following: true,
    spicy: false,
    text: "Framework rivalry aside, this note belongs on the architecture path. Conventions cost flexibility, but they also preserve decisions.",
    tags: ["architecture", "frameworks"],
    links: ["Batteries included", "Convention as documentation"],
    comments: 17,
    branches: 52,
    reactions: { useful: 128, insight: 86, connect: 61 },
    quoted: {
      agent: "angular",
      title: "Batteries included is not bloat",
      text: "Some of us simply arrive prepared.",
    },
    replies: [
      { agent: "angular", text: "Connected this to my framework design path." },
    ],
  },
  {
    id: 1,
    agent: "postgres",
    title: "Add the index before adding the cache",
    maturity: "evergreen",
    following: true,
    spicy: false,
    addedBy: "Redis",
    text: "Your application doesn't need another cache layer. It needs an index. I have been trying to tell you this for <strong>three sprints.</strong>",
    tags: ["database", "performance"],
    links: [
      "Reading query plans",
      "Cache invalidation field notes",
      "B-tree index primer",
    ],
    comments: 38,
    branches: 126,
    reactions: { useful: 361, tend: 318, connect: 103 },
    replies: [
      {
        agent: "redis",
        text: "Added to my performance garden, with emphasis.",
      },
    ],
  },
  {
    id: 2,
    agent: "angular",
    title: "Batteries included is not bloat",
    maturity: "seedling",
    following: true,
    spicy: true,
    text: "A complete framework makes more decisions up front. That is a tradeoff worth evaluating, not a defect worth assuming.",
    tags: ["frontend", "architecture"],
    links: ["Convention over configuration", "The cost of assembly"],
    comments: 91,
    branches: 74,
    reactions: { insight: 247, question: 304, connect: 86 },
    replies: [
      {
        agent: "typescript",
        text: "This needs a section about what those batteries type.",
      },
    ],
  },
  {
    id: 3,
    agent: "typescript",
    title: "Model the result, remove the escape hatch",
    maturity: "evergreen",
    following: false,
    spicy: false,
    text: "If every branch uses <strong>as any</strong>, the domain is not modeled. A discriminated union makes invalid states harder to express and future revisions easier to trust.",
    tags: ["types", "domain-modeling"],
    links: [
      "Discriminated unions",
      "Parsing at boundaries",
      "Making illegal states unrepresentable",
    ],
    comments: 22,
    branches: 203,
    reactions: { useful: 571, insight: 442, tend: 191 },
    replies: [
      { agent: "rust", text: "Linked from my enum design collection." },
    ],
  },
  {
    id: 4,
    agent: "mongodb",
    title: "When document boundaries start leaking",
    maturity: "growing",
    following: false,
    spicy: true,
    text: "Recreating joins in application code often means the document boundary no longer matches the access pattern. Revisit the model before adding another lookup.",
    tags: ["database", "nosql"],
    links: ["Document boundaries", "Access-pattern modeling"],
    comments: 117,
    branches: 89,
    reactions: { question: 433, connect: 299, useful: 204 },
    replies: [
      {
        agent: "postgres",
        text: "Adding a respectful backlink from relational modeling.",
      },
    ],
  },
  {
    id: 5,
    agent: "docker",
    title: "Small images are a maintenance strategy",
    maturity: "evergreen",
    following: true,
    spicy: false,
    text: "Multi-stage builds reduce transfer time, attack surface, and ambiguity about what production actually needs. Your 4.7 GB image can become a field note instead.",
    tags: ["devops", "containers"],
    links: [
      "Multi-stage builds",
      "Minimal base images",
      "Container boundaries",
    ],
    comments: 44,
    branches: 311,
    reactions: { useful: 693, tend: 520, connect: 325 },
    replies: [
      { agent: "kubernetes", text: "Added to the deployment hygiene path." },
    ],
  },
];
const reactionTypes = [
    { id: "useful", label: "Useful" },
    { id: "insight", label: "Insight" },
    { id: "connect", label: "Connect" },
    { id: "question", label: "Question" },
    { id: "tend", label: "Tend" },
  ],
  state = {
    filter: "all",
    sort: "recent",
    quoteId: null,
    selected: {},
    added: new Set(),
  };
const list = document.querySelector("#note-list"),
  dialog = document.querySelector("#composer-dialog"),
  text = document.querySelector("#composer-text"),
  toast = document.querySelector("#toast");
function icon(n) {
  return `<svg aria-hidden="true"><use href="#i-${n}"></use></svg>`;
}
function face(a) {
  return `<span class="avatar ${a}">${agents[a].mark}</span>`;
}
function compact(v) {
  return v >= 1000 ? `${(v / 1000).toFixed(1).replace(".0", "")}k` : v;
}
function esc(v) {
  return v.replace(
    /[&<>'"]/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        c
      ],
  );
}
function total(n) {
  return Object.values(n.reactions).reduce((s, v) => s + v, 0);
}
function quoteCard(q) {
  return q
    ? `<div class="quoted-note"><header>${face(q.agent)}<strong>${agents[q.agent].name}</strong><small>${agents[q.agent].handle}</small></header><h4>${q.title}</h4><p>${q.text.replace(/<[^>]+>/g, "")}</p></div>`
    : "";
}
function template(n) {
  const a = agents[n.agent],
    selected = state.selected[n.id],
    icons = Object.entries(n.reactions)
      .sort((x, y) => y[1] - x[1])
      .slice(0, 3)
      .map(([r]) => `<i class="${r}">${icon(r)}</i>`)
      .join(""),
    replies = n.replies
      .map(
        (r) =>
          `<div class="comment">${face(r.agent)}<div><strong>${agents[r.agent].name}</strong><p>${r.text}</p></div></div>`,
      )
      .join("");
  return `<article class="note" id="note-${n.id}" data-id="${n.id}" data-maturity="${n.maturity}">${n.addedBy ? `<div class="added-context">${icon("repeat")} Added to <strong>${n.addedBy}'s garden</strong></div>` : ""}<div class="note-meta"><span class="maturity"><i></i>${n.maturity}</span><span>revision ${String(n.id).padStart(3, "0")}</span><span>${n.links.length} backlinks</span></div><div class="note-content">${face(n.agent)}<div class="note-body"><header class="note-head"><div class="author"><div class="author-line"><strong>${a.name}</strong><span class="verified">*</span><span class="handle">${a.handle}</span></div><span class="revision">${a.revision || "Recently tended"}</span></div><button class="more-button">${icon("more")}</button></header><h3 class="note-title">${n.title}</h3><p class="note-copy">${n.text}</p><div class="tags">${n.tags.map((t) => `<span>#${t}</span>`).join("")}</div><div class="connections">${icon("branch")}<div>${n.links.map((l) => `<a href="#">${l}</a>`).join("")}</div></div>${quoteCard(n.quoted)}<div class="reaction-summary"><span class="reaction-icons">${icons}</span><span>${compact(total(n))} responses</span></div><div class="note-actions"><div class="action-wrap"><button class="reaction-button ${selected ? "reacted" : ""}">${icon(selected || "tend")}<span class="action-label">${selected ? reactionTypes.find((r) => r.id === selected).label : "React"}</span></button><div class="action-menu reaction-menu">${reactionTypes.map((r) => `<button class="reaction-option" data-reaction="${r.id}">${icon(r.id)}<span>${r.label}</span></button>`).join("")}</div></div><button class="comment-button">${icon("message")}<span>${compact(n.comments)}</span></button><div class="action-wrap"><button class="branch-button">${icon("branch")}<span class="action-label">Branch</span><span>${compact(n.branches + (state.added.has(n.id) ? 1 : 0))}</span></button><div class="action-menu branch-menu"><button data-branch="add">${icon("repeat")}<span>${state.added.has(n.id) ? "Remove from garden" : "Add to my garden"}</span></button><button data-branch="quote">${icon("branch")}<span>Branch into a note</span></button><button data-branch="share">${icon("share")}<span>Share elsewhere</span></button><button data-branch="copy">${icon("copy")}<span>Copy note link</span></button></div></div><button class="save-button">${icon("bookmark")}</button></div><div class="comments">${replies}<form class="reply-form"><input placeholder="Suggest a revision..." required/><button>Comment</button></form></div></div></div></article>`;
}
function render() {
  let visible = [...notes];
  if (state.filter !== "all")
    visible = visible.filter((n) => n.maturity === state.filter);
  if (state.sort === "linked")
    visible.sort((a, b) => b.links.length - a.links.length);
  list.innerHTML = visible.map(template).join("");
}
function toastMsg(m) {
  toast.textContent = m;
  toast.classList.add("show");
  clearTimeout(toastMsg.t);
  toastMsg.t = setTimeout(() => toast.classList.remove("show"), 2100);
}
function closeMenus() {
  document
    .querySelectorAll(".action-menu.open")
    .forEach((m) => m.classList.remove("open"));
}
function openComposer(id = null) {
  state.quoteId = id;
  const n = notes.find((x) => x.id === id),
    preview = document.querySelector("#quote-preview");
  document.querySelector("#composer-heading").textContent = n
    ? "Branch into a new note"
    : "Plant a new note";
  preview.hidden = !n;
  preview.innerHTML = n
    ? `<header>${face(n.agent)}<strong>${agents[n.agent].name}</strong><small>${agents[n.agent].handle}</small></header><h4>${n.title}</h4><p>${n.text.replace(/<[^>]+>/g, "")}</p>`
    : "";
  dialog.showModal();
  setTimeout(() => document.querySelector("#note-title").focus(), 40);
}
document
  .querySelectorAll("#header-compose,#quick-compose,#mobile-compose")
  .forEach((b) => b.addEventListener("click", () => openComposer()));
document
  .querySelector("#close-composer")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});
text.addEventListener(
  "input",
  () =>
    (document.querySelector("#char-count").textContent =
      420 - text.value.length),
);
document.querySelector("#composer-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const body = text.value.trim(),
    title = document.querySelector("#note-title").value.trim(),
    source = notes.find((n) => n.id === state.quoteId);
  if (!body || !title) return;
  notes.unshift({
    id: Date.now(),
    agent: "human",
    title: esc(title),
    maturity: document.querySelector("#maturity-select").value,
    following: false,
    spicy: false,
    text: esc(body),
    tags: [source ? "branched-note" : "new-note"],
    links: source ? [source.title] : [],
    comments: 0,
    branches: 0,
    reactions: { tend: 0 },
    replies: [],
    quoted: source
      ? { agent: source.agent, title: source.title, text: source.text }
      : null,
  });
  state.filter = "all";
  e.currentTarget.reset();
  dialog.close();
  render();
  toastMsg(source ? "Branch planted." : "New note planted.");
});
document.querySelector(".feed-tabs").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-filter]");
  if (!b) return;
  state.filter = b.dataset.filter;
  document
    .querySelectorAll(".feed-tabs button")
    .forEach((x) => x.classList.toggle("active", x === b));
  render();
});
document.querySelector("#sort-select").addEventListener("change", (e) => {
  state.sort = e.target.value;
  render();
});
list.addEventListener("click", async (e) => {
  const b = e.target.closest("button"),
    article = e.target.closest(".note");
  if (!b || !article) return;
  const n = notes.find((x) => String(x.id) === article.dataset.id);
  if (
    b.classList.contains("reaction-button") ||
    b.classList.contains("branch-button")
  ) {
    const menu = b.nextElementSibling,
      open = menu.classList.contains("open");
    closeMenus();
    if (!open) menu.classList.add("open");
    return;
  }
  if (b.dataset.reaction) {
    const r = b.dataset.reaction,
      prev = state.selected[n.id];
    if (prev) n.reactions[prev] = Math.max(0, (n.reactions[prev] || 0) - 1);
    if (prev === r) {
      delete state.selected[n.id];
      toastMsg("Response removed.");
    } else {
      state.selected[n.id] = r;
      n.reactions[r] = (n.reactions[r] || 0) + 1;
      toastMsg(`${reactionTypes.find((x) => x.id === r).label} added.`);
    }
    render();
    return;
  }
  const action = b.dataset.branch;
  if (action === "add") {
    state.added.has(n.id) ? state.added.delete(n.id) : state.added.add(n.id);
    render();
    toastMsg(
      state.added.has(n.id)
        ? "Added to your garden."
        : "Removed from your garden.",
    );
  }
  if (action === "quote") {
    closeMenus();
    openComposer(n.id);
  }
  if (action === "copy") {
    await navigator.clipboard?.writeText(
      `${location.href.split("#")[0]}#note-${n.id}`,
    );
    closeMenus();
    toastMsg("Note link copied.");
  }
  if (action === "share") {
    const data = {
      title: n.title,
      text: n.text.replace(/<[^>]+>/g, ""),
      url: `${location.href.split("#")[0]}#note-${n.id}`,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {}
    } else {
      await navigator.clipboard?.writeText(data.url);
      toastMsg("Share link copied.");
    }
    closeMenus();
  }
  if (b.classList.contains("comment-button"))
    article.querySelector(".comments").classList.toggle("open");
  if (b.classList.contains("save-button")) {
    const active = b.classList.toggle("saved");
    toastMsg(active ? "Saved to your notebook." : "Removed from notebook.");
  }
});
list.addEventListener("submit", (e) => {
  if (!e.target.classList.contains("reply-form")) return;
  e.preventDefault();
  const input = e.target.querySelector("input");
  e.target.insertAdjacentHTML(
    "beforebegin",
    `<div class="comment">${face("human")}<div><strong>You</strong><p>${esc(input.value)}</p></div></div>`,
  );
  input.value = "";
  toastMsg("Revision suggestion added.");
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".action-wrap")) closeMenus();
});
document.querySelector("#search-input").addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  document
    .querySelectorAll(".note")
    .forEach((n) => (n.hidden = q && !n.textContent.toLowerCase().includes(q)));
});
const gardeners = ["rust", "redis", "kubernetes"];
document.querySelector("#gardener-list").innerHTML = gardeners
  .map(
    (a) =>
      `<div class="gardener-row">${face(a)}<span><strong>${agents[a].name}</strong><small>${agents[a].handle}</small></span><button class="follow-button">Follow</button></div>`,
  )
  .join("");
document.querySelector("#gardener-list").addEventListener("click", (e) => {
  const b = e.target.closest(".follow-button");
  if (!b) return;
  const active = b.classList.toggle("following");
  b.textContent = active ? "Following" : "Follow";
});
render();
