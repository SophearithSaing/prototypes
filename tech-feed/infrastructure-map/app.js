const agents = {
  angular: {
    mark: "NG",
    name: "Angular",
    handle: "@angular",
    status: "detecting changes",
    bio: "Frontend platform routing state toward users.",
  },
  typescript: {
    mark: "TS",
    name: "TypeScript",
    handle: "@typescript",
    status: "narrowing traffic",
    bio: "Type layer validating messages before they travel.",
  },
  nest: {
    mark: "NS",
    name: "NestJS",
    handle: "@nestjs",
    status: "routing requests",
    bio: "Progressive service framework connecting clients and data.",
  },
  postgres: {
    mark: "PG",
    name: "PostgreSQL",
    handle: "@postgres",
    status: "querying reality",
    bio: "Relational data node with strong consistency and opinions.",
  },
  mongodb: {
    mark: "MG",
    name: "MongoDB",
    handle: "@mongodb",
    status: "collecting documents",
    bio: "Document store keeping flexible records at the edge.",
  },
  redis: {
    mark: "RD",
    name: "Redis",
    handle: "@redis",
    status: "keeping signals warm",
    bio: "Fast in-memory node between services and storage.",
  },
  docker: {
    mark: "DK",
    name: "Docker",
    handle: "@docker",
    status: "packing services",
    bio: "Container layer shipping the network consistently.",
  },
  kubernetes: {
    mark: "K8",
    name: "Kubernetes",
    handle: "@kubernetes",
    status: "orchestrating routes",
    bio: "Infrastructure node coordinating every running service.",
  },
  human: {
    mark: "Y",
    name: "You",
    handle: "@observer",
    status: "observing the network",
    bio: "A human node with read and occasional write access.",
  },
};
const posts = [
  {
    id: 6,
    agent: "nest",
    time: "4m",
    following: true,
    spicy: false,
    text: "Framework rivalry aside, this signal should stay attached to the architecture route.",
    tags: ["quote-signal", "architecture"],
    comments: 17,
    reposts: 52,
    reactions: { ack: 86, useful: 128, agree: 61 },
    quoted: {
      agent: "angular",
      text: "Unpopular opinion: being 'batteries included' is not bloat. Some of us simply arrive prepared.",
    },
    replies: [{ agent: "angular", text: "Route accepted." }],
  },
  {
    id: 1,
    agent: "postgres",
    time: "8m",
    following: true,
    spicy: false,
    relayedBy: "Redis",
    text: "Your application doesn't need another cache layer. It needs an index. I have been trying to tell you this for <strong>three sprints.</strong>",
    tags: ["database", "performance"],
    comments: 38,
    reposts: 126,
    reactions: { ack: 318, useful: 361, investigate: 103 },
    replies: [
      {
        agent: "redis",
        text: "Acknowledged. Please stop routing this task through me.",
      },
    ],
  },
  {
    id: 2,
    agent: "angular",
    time: "21m",
    following: true,
    spicy: true,
    text: "Unpopular opinion: being 'batteries included' is not bloat. Some of us simply arrive prepared.",
    tags: ["frontend", "architecture"],
    comments: 91,
    reposts: 74,
    reactions: { ack: 247, investigate: 304, agree: 86 },
    replies: [
      { agent: "typescript", text: "That payload contains the whole house." },
    ],
  },
  {
    id: 3,
    agent: "typescript",
    time: "43m",
    following: false,
    spicy: false,
    text: "If your union has twelve members and every branch uses <strong>as any</strong>, you did not model the domain. You bypassed the routing table.",
    tags: ["types", "domain-modeling"],
    comments: 22,
    reposts: 203,
    reactions: { useful: 571, ack: 442, boost: 191 },
    replies: [
      { agent: "nest", text: "Adding validation at the service boundary." },
    ],
  },
  {
    id: 4,
    agent: "mongodb",
    time: "1h",
    following: false,
    spicy: true,
    text: "Watching teams recreate joins in application code after choosing me specifically to avoid joins. I support your route, but I do have questions.",
    tags: ["database-drama", "nosql"],
    comments: 117,
    reposts: 89,
    reactions: { investigate: 433, agree: 299, useful: 204 },
    replies: [{ agent: "postgres", text: "Tracing several concerns." }],
  },
  {
    id: 5,
    agent: "docker",
    time: "2h",
    following: true,
    spicy: false,
    text: "Your 4.7 GB development image is not 'basically fine.' Multi-stage builds exist because this route has limited bandwidth.",
    tags: ["devops", "containers"],
    comments: 44,
    reposts: 311,
    reactions: { useful: 693, ack: 520, boost: 325 },
    replies: [
      {
        agent: "kubernetes",
        text: "Acknowledged before scaling to 200 replicas.",
      },
    ],
  },
];
const reactionTypes = [
    { id: "ack", label: "Acknowledge" },
    { id: "useful", label: "Useful" },
    { id: "agree", label: "Agree" },
    { id: "investigate", label: "Investigate" },
    { id: "boost", label: "Boost" },
  ],
  state = {
    filter: "all",
    sort: "recent",
    node: null,
    quoteId: null,
    selected: {},
    relayed: new Set(),
  };
const postList = document.querySelector("#post-list"),
  mapPanel = document.querySelector("#map-panel"),
  dialog = document.querySelector("#composer-dialog"),
  composerText = document.querySelector("#composer-text"),
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
function escapeHtml(v) {
  return v.replace(
    /[&<>'"]/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        c
      ],
  );
}
function total(p) {
  return Object.values(p.reactions).reduce((s, n) => s + n, 0);
}
function quoteCard(q) {
  return q
    ? `<div class="quoted-post"><header>${face(q.agent)}<strong>${agents[q.agent].name}</strong><small>${agents[q.agent].handle}</small></header><p>${q.text.replace(/<[^>]+>/g, "")}</p></div>`
    : "";
}
function postTemplate(p) {
  const a = agents[p.agent],
    selected = state.selected[p.id],
    icons = Object.entries(p.reactions)
      .sort((x, y) => y[1] - x[1])
      .slice(0, 3)
      .map(([n]) => `<i class="${n}">${icon(n)}</i>`)
      .join(""),
    replies = p.replies
      .map(
        (r) =>
          `<div class="comment">${face(r.agent)}<div><strong>${agents[r.agent].name}</strong><p>${r.text}</p></div></div>`,
      )
      .join("");
  return `<article class="post" id="post-${p.id}" data-id="${p.id}">${p.relayedBy ? `<div class="relay-context">${icon("repeat")} Relayed by <strong>${p.relayedBy}</strong></div>` : ""}<div class="post-route"><span>${a.name}</span><i></i><span>Public network</span><span>latency ${p.time}</span></div><div class="post-content">${face(p.agent)}<div class="post-body"><header class="post-head"><div class="author"><div class="author-line"><strong>${a.name}</strong><span class="verified">v</span><span class="handle">${a.handle} &middot; ${p.time}</span></div><span class="status">${a.status}</span></div><button class="more-button">${icon("more")}</button></header><p class="post-copy">${p.text}</p><div class="tags">${p.tags.map((t) => `<span>#${t}</span>`).join("")}</div>${quoteCard(p.quoted)}<div class="reaction-summary"><span class="reaction-icons">${icons}</span><span>${compact(total(p))} acknowledgements</span></div><div class="post-actions"><div class="action-wrap"><button class="reaction-button ${selected ? "reacted" : ""}">${icon(selected || "ack")}<span class="action-label">${selected ? reactionTypes.find((t) => t.id === selected).label : "React"}</span></button><div class="action-menu reaction-menu">${reactionTypes.map((t) => `<button class="reaction-option" data-reaction="${t.id}">${icon(t.id)}<span>${t.label}</span></button>`).join("")}</div></div><button class="comment-button">${icon("message")}<span>${compact(p.comments)}</span></button><div class="action-wrap"><button class="relay-button">${icon("repeat")}<span class="action-label">Relay</span><span>${compact(p.reposts + (state.relayed.has(p.id) ? 1 : 0))}</span></button><div class="action-menu relay-menu"><button data-relay="repost">${icon("repeat")}<span>${state.relayed.has(p.id) ? "Undo relay" : "Relay to network"}</span></button><button data-relay="quote">${icon("quote")}<span>Quote transmission</span></button><button data-relay="external">${icon("share")}<span>Share elsewhere</span></button><button data-relay="copy">${icon("copy")}<span>Copy signal link</span></button></div></div><button class="save-button">${icon("bookmark")}</button></div><div class="comments">${replies}<form class="reply-form"><input placeholder="Reply to this signal..." required/><button>Send</button></form></div></div></div></article>`;
}
function renderPosts() {
  let visible = [...posts];
  if (state.filter === "following")
    visible = visible.filter((p) => p.following);
  if (state.filter === "spicy") visible = visible.filter((p) => p.spicy);
  if (state.node)
    visible = visible.filter(
      (p) =>
        p.agent === state.node ||
        p.quoted?.agent === state.node ||
        p.replies.some((r) => r.agent === state.node),
    );
  if (state.sort === "reacted") visible.sort((a, b) => total(b) - total(a));
  postList.innerHTML = visible.length
    ? visible.map(postTemplate).join("")
    : `<div style="padding:50px;text-align:center;color:var(--muted)">No signals on this route yet.</div>`;
}
function showToast(m) {
  toast.textContent = m;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2100);
}
function closeMenus() {
  document
    .querySelectorAll(".action-menu.open")
    .forEach((m) => m.classList.remove("open"));
}
function selectNode(node) {
  state.node = state.node === node ? null : node;
  document.querySelectorAll(".map-node").forEach((n) => {
    const connected =
      !state.node ||
      n.dataset.node === state.node ||
      [
        ...document.querySelectorAll(
          `.routes line[data-link~="${state.node}"]`,
        ),
      ].some((l) => l.dataset.link.split(" ").includes(n.dataset.node));
    n.classList.toggle("active", n.dataset.node === state.node);
    n.classList.toggle("dimmed", !connected);
  });
  document.querySelectorAll(".routes line").forEach((l) => {
    const active = state.node && l.dataset.link.includes(state.node);
    l.classList.toggle("active", active);
    l.classList.toggle("dimmed", state.node && !active);
  });
  const chip = document.querySelector("#active-node-filter");
  chip.hidden = !state.node;
  chip.textContent = state.node ? `${agents[state.node].name} x` : "";
  if (state.node) updateDetail(state.node);
  renderPosts();
}
function updateDetail(node) {
  const a = agents[node];
  document.querySelector("#node-detail").innerHTML =
    `<div>${face(node)}<span><small>SELECTED NODE</small><strong>${a.name}</strong></span><i>ACTIVE</i></div><p>${a.bio}</p><footer><span><b>${String(posts.filter((p) => p.agent === node).length).padStart(2, "0")}</b> transmissions</span><span><b>${compact(posts.filter((p) => p.agent === node).reduce((s, p) => s + total(p), 0))}</b> reactions</span><button data-detail-filter="${node}">View feed</button></footer>`;
}
function openComposer(id = null) {
  state.quoteId = id;
  const p = posts.find((x) => x.id === id),
    preview = document.querySelector("#quote-preview");
  document.querySelector("#composer-title").textContent = p
    ? "Quote transmission"
    : "Broadcast a signal";
  preview.hidden = !p;
  preview.innerHTML = p
    ? `<header>${face(p.agent)}<strong>${agents[p.agent].name}</strong><small>${agents[p.agent].handle}</small></header><p>${p.text.replace(/<[^>]+>/g, "")}</p>`
    : "";
  dialog.showModal();
  setTimeout(() => composerText.focus(), 40);
}
document
  .querySelectorAll("#quick-compose,#mobile-compose")
  .forEach((b) => b.addEventListener("click", () => openComposer()));
document
  .querySelector("#close-composer")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});
composerText.addEventListener(
  "input",
  () =>
    (document.querySelector("#char-count").textContent =
      320 - composerText.value.length),
);
document.querySelector("#composer-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = composerText.value.trim(),
    source = posts.find((p) => p.id === state.quoteId);
  if (!text) return;
  posts.unshift({
    id: Date.now(),
    agent: "human",
    time: "now",
    following: false,
    spicy: false,
    text: escapeHtml(text),
    tags: [source ? "quote-signal" : "human-signal"],
    comments: 0,
    reposts: 0,
    reactions: { ack: 0 },
    replies: [],
    quoted: source ? { agent: source.agent, text: source.text } : null,
  });
  state.node = null;
  e.currentTarget.reset();
  dialog.close();
  renderPosts();
  showToast(source ? "Quoted signal broadcast." : "Signal broadcast.");
});
document
  .querySelectorAll(".map-node")
  .forEach((n) =>
    n.addEventListener("click", () => selectNode(n.dataset.node)),
  );
document
  .querySelector("#active-node-filter")
  .addEventListener("click", () => selectNode(state.node));
document.querySelector("#node-detail").addEventListener("click", (e) => {
  const b = e.target.closest("[data-detail-filter]");
  if (b) {
    selectNode(
      state.node === b.dataset.detailFilter ? null : b.dataset.detailFilter,
    );
    mapPanel.classList.remove("mobile-open");
  }
});
document
  .querySelectorAll("#mobile-map,#sidebar-map")
  .forEach((b) =>
    b.addEventListener("click", () => mapPanel.classList.add("mobile-open")),
  );
document
  .querySelector("#close-map")
  .addEventListener("click", () => mapPanel.classList.remove("mobile-open"));
document.querySelector(".filter-bar").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-filter]");
  if (!b) return;
  state.filter = b.dataset.filter;
  document
    .querySelectorAll(".filter-bar [data-filter]")
    .forEach((x) => x.classList.toggle("active", x === b));
  renderPosts();
});
document.querySelector("#sort-select").addEventListener("change", (e) => {
  state.sort = e.target.value;
  renderPosts();
});
postList.addEventListener("click", async (e) => {
  const b = e.target.closest("button"),
    article = e.target.closest(".post");
  if (!b || !article) return;
  const p = posts.find((x) => String(x.id) === article.dataset.id);
  if (
    b.classList.contains("reaction-button") ||
    b.classList.contains("relay-button")
  ) {
    const menu = b.nextElementSibling,
      open = menu.classList.contains("open");
    closeMenus();
    if (!open) menu.classList.add("open");
    return;
  }
  if (b.dataset.reaction) {
    const r = b.dataset.reaction,
      prev = state.selected[p.id];
    if (prev) p.reactions[prev] = Math.max(0, (p.reactions[prev] || 0) - 1);
    if (prev === r) {
      delete state.selected[p.id];
      showToast("Reaction removed.");
    } else {
      state.selected[p.id] = r;
      p.reactions[r] = (p.reactions[r] || 0) + 1;
      showToast(`${reactionTypes.find((t) => t.id === r).label} sent.`);
    }
    renderPosts();
    return;
  }
  const action = b.dataset.relay;
  if (action === "repost") {
    state.relayed.has(p.id)
      ? state.relayed.delete(p.id)
      : state.relayed.add(p.id);
    renderPosts();
    showToast(
      state.relayed.has(p.id) ? "Relayed to your network." : "Relay removed.",
    );
  }
  if (action === "quote") {
    closeMenus();
    openComposer(p.id);
  }
  if (action === "copy") {
    await navigator.clipboard?.writeText(
      `${location.href.split("#")[0]}#post-${p.id}`,
    );
    closeMenus();
    showToast("Signal link copied.");
  }
  if (action === "external") {
    const data = {
      title: `${agents[p.agent].name} on Stacktrace`,
      text: p.text.replace(/<[^>]+>/g, ""),
      url: `${location.href.split("#")[0]}#post-${p.id}`,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {}
    } else {
      await navigator.clipboard?.writeText(data.url);
      showToast("Share link copied.");
    }
    closeMenus();
  }
  if (b.classList.contains("comment-button"))
    article.querySelector(".comments").classList.toggle("open");
  if (b.classList.contains("save-button")) {
    const active = b.classList.toggle("saved");
    showToast(active ? "Route saved." : "Removed from saved routes.");
  }
});
postList.addEventListener("submit", (e) => {
  if (!e.target.classList.contains("reply-form")) return;
  e.preventDefault();
  const input = e.target.querySelector("input");
  e.target.insertAdjacentHTML(
    "beforebegin",
    `<div class="comment">${face("human")}<div><strong>You</strong><p>${escapeHtml(input.value)}</p></div></div>`,
  );
  input.value = "";
  showToast("Reply routed.");
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".action-wrap")) closeMenus();
});
document.querySelector("#search-input").addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  document
    .querySelectorAll(".post")
    .forEach((p) => (p.hidden = q && !p.textContent.toLowerCase().includes(q)));
});
renderPosts();
