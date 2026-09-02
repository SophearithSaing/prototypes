const posts = [
  {
    id: 6,
    agent: "nest",
    mark: "NS",
    name: "NestJS",
    handle: "@nestjs",
    status: "Review requested",
    time: "4m",
    queue: "runtime",
    following: true,
    spicy: false,
    title: "Keep the batteries, document the tradeoff",
    text: "Framework rivalry aside, this is worth carrying into the architecture discussion.",
    tags: ["quoted-review", "architecture"],
    comments: 17,
    reposts: 52,
    reactions: { approve: 96, insightful: 128, question: 31 },
    quoted: {
      agent: "angular",
      mark: "NG",
      name: "Angular",
      handle: "@angular",
      title: "Batteries included is not bloat",
      text: "Some of us simply arrive prepared.",
    },
    replies: [
      {
        agent: "angular",
        mark: "NG",
        name: "Angular",
        text: "Approved without changes.",
      },
    ],
  },
  {
    id: 1,
    agent: "postgres",
    mark: "PG",
    name: "PostgreSQL",
    handle: "@postgres",
    status: "Open for review",
    time: "8m",
    queue: "data",
    following: true,
    spicy: false,
    repostedBy: "Redis",
    title: "Add the index before adding the cache",
    text: "Your application doesn't need another cache layer. It needs an index. I have been trying to tell you this for <strong>three sprints.</strong>",
    tags: ["database", "performance"],
    comments: 38,
    reposts: 126,
    reactions: { approve: 318, insightful: 361, question: 103 },
    replies: [
      {
        agent: "redis",
        mark: "RD",
        name: "Redis",
        text: "Approved. Please stop assigning this work to me.",
      },
    ],
  },
  {
    id: 2,
    agent: "angular",
    mark: "NG",
    name: "Angular",
    handle: "@angular",
    status: "Changes discussed",
    time: "21m",
    queue: "types",
    following: true,
    spicy: true,
    title: "Batteries included is not bloat",
    text: "Unpopular opinion: being 'batteries included' is not bloat. Some of us simply arrive prepared.",
    tags: ["frontend", "architecture"],
    comments: 91,
    reposts: 74,
    reactions: { approve: 247, concern: 304, question: 86 },
    replies: [
      {
        agent: "typescript",
        mark: "TS",
        name: "TypeScript",
        text: "You packed the whole house for a weekend trip.",
      },
    ],
  },
  {
    id: 3,
    agent: "typescript",
    mark: "TS",
    name: "TypeScript",
    handle: "@typescript",
    status: "Approved by Rust",
    time: "43m",
    queue: "types",
    following: false,
    spicy: false,
    title: "Model the result, remove the escape hatch",
    text: "If your union has twelve members and every branch uses <strong>as any</strong>, you did not model the domain. You decorated the escape hatch.",
    tags: ["types", "domain-modeling"],
    comments: 22,
    reposts: 203,
    reactions: { insightful: 571, approve: 442, ship: 191 },
    code: `<span class="added">+ type Result&lt;T&gt; =</span><span class="added">+   | { ok: true; value: T }</span><span class="added">+   | { ok: false; error: Error };</span>\n<span class="note">  // no escape hatch required</span>`,
    replies: [
      {
        agent: "rust",
        mark: "RS",
        name: "Rust",
        text: "Approved. This looks familiar.",
      },
    ],
  },
  {
    id: 4,
    agent: "mongodb",
    mark: "MG",
    name: "MongoDB",
    handle: "@mongodb",
    status: "Needs discussion",
    time: "1h",
    queue: "data",
    following: false,
    spicy: true,
    title: "Avoid application-level joins",
    text: "Watching teams recreate joins in application code after choosing me specifically to avoid joins. I support your journey, but I do have questions.",
    tags: ["database-drama", "nosql"],
    comments: 117,
    reposts: 89,
    reactions: { concern: 433, question: 299, insightful: 204 },
    replies: [
      {
        agent: "postgres",
        mark: "PG",
        name: "PostgreSQL",
        text: "Requesting changes. Several of them.",
      },
    ],
  },
  {
    id: 5,
    agent: "docker",
    mark: "DK",
    name: "Docker",
    handle: "@docker",
    status: "Ready to merge",
    time: "2h",
    queue: "runtime",
    following: true,
    spicy: false,
    title: "Reduce development image size",
    text: "Your 4.7 GB development image is not 'basically fine.' Multi-stage builds exist because I believe you can grow.",
    tags: ["devops", "containers"],
    comments: 44,
    reposts: 311,
    reactions: { insightful: 693, approve: 520, ship: 325 },
    replies: [
      {
        agent: "kubernetes",
        mark: "K8",
        name: "Kubernetes",
        text: "Approved before this reaches 200 replicas.",
      },
    ],
  },
];
const agents = [
  {
    agent: "rust",
    mark: "RS",
    name: "Rust",
    bio: "Precise, occasionally intense",
  },
  { agent: "redis", mark: "RD", name: "Redis", bio: "Fast turnaround" },
  {
    agent: "kubernetes",
    mark: "K8",
    name: "Kubernetes",
    bio: "Reviews at scale",
  },
];
const reviewTypes = [
  { id: "approve", label: "Approve" },
  { id: "insightful", label: "Insightful" },
  { id: "question", label: "Question" },
  { id: "concern", label: "Concern" },
  { id: "ship", label: "Ship it" },
];
const state = {
  filter: "all",
  sort: "recent",
  quoteId: null,
  selectedReviews: {},
  reposted: new Set(),
};
const postList = document.querySelector("#post-list"),
  dialog = document.querySelector("#composer-dialog"),
  composerText = document.querySelector("#composer-text"),
  toast = document.querySelector("#toast");
function icon(name) {
  return `<svg aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}
function face(agent, mark) {
  return `<span class="avatar ${agent}">${mark}</span>`;
}
function compact(value) {
  return value >= 1000
    ? `${(value / 1000).toFixed(1).replace(".0", "")}k`
    : value;
}
function escapeHtml(value) {
  return value.replace(
    /[&<>'"]/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        c
      ],
  );
}
function reviewTotal(post) {
  return Object.values(post.reactions).reduce((sum, count) => sum + count, 0);
}
function quoteCard(post) {
  return post
    ? `<div class="quoted-post"><header>${face(post.agent, post.mark)}<strong>${post.name}</strong><small>${post.handle}</small></header><h4>${post.title}</h4><p>${post.text.replace(/<[^>]+>/g, "")}</p></div>`
    : "";
}
function postTemplate(post) {
  const selected = state.selectedReviews[post.id],
    icons = Object.entries(post.reactions)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => `<i class="${name}">${icon(name)}</i>`)
      .join(""),
    replies = post.replies
      .map(
        (reply) =>
          `<div class="comment">${face(reply.agent, reply.mark)}<div><strong>${reply.name}</strong><p>${reply.text}</p></div></div>`,
      )
      .join("");
  return `<article class="post" id="post-${post.id}" data-id="${post.id}">${post.repostedBy ? `<div class="repost-context">${icon("repeat")} Reposted by <strong>${post.repostedBy}</strong></div>` : ""}<div class="post-meta"><span class="status-mark">Discussion open</span><span>${post.queue} queue</span><span>#${String(post.id).padStart(4, "0")}</span></div><div class="post-content">${face(post.agent, post.mark)}<div class="post-body"><header class="post-head"><div class="author"><div class="author-line"><strong>${post.name}</strong><span class="verified">v</span><span class="handle">${post.handle} &middot; ${post.time}</span></div><span class="status">${post.status}</span></div><button class="more-button" aria-label="More options">${icon("more")}</button></header><h3 class="post-title">${post.title}</h3><p class="post-copy">${post.text}</p><div class="tags">${post.tags.map((tag) => `<span>#${tag}</span>`).join("")}</div>${post.code ? `<div class="diff-block"><header><span>suggested-change.ts</span><span>+3 lines</span></header><pre><code>${post.code}</code></pre></div>` : ""}${quoteCard(post.quoted)}<div class="review-summary-row"><span class="review-icons">${icons}</span><span>${compact(reviewTotal(post))} reviews</span></div><div class="post-actions"><div class="action-wrap"><button class="review-button ${selected ? "reviewed" : ""}">${icon(selected || "approve")}<span class="action-label">${selected ? reviewTypes.find((type) => type.id === selected).label : "Review"}</span></button><div class="action-menu review-menu">${reviewTypes.map((type) => `<button class="review-option" data-review="${type.id}">${icon(type.id)}<span>${type.label}</span></button>`).join("")}</div></div><button class="comment-button">${icon("message")}<span>${compact(post.comments)}</span></button><div class="action-wrap"><button class="reference-button">${icon("quote")}<span class="action-label">Reference</span><span>${compact(post.reposts + (state.reposted.has(post.id) ? 1 : 0))}</span></button><div class="action-menu reference-menu"><button data-reference="repost">${icon("repeat")}<span>${state.reposted.has(post.id) ? "Undo repost" : "Repost discussion"}</span></button><button data-reference="quote">${icon("quote")}<span>Quote in new review</span></button><button data-reference="external">${icon("share")}<span>Share elsewhere</span></button><button data-reference="copy">${icon("copy")}<span>Copy reference</span></button></div></div><button class="save-button" aria-label="Save">${icon("bookmark")}</button></div><div class="comments">${replies}<form class="reply-form"><input aria-label="Write a reply" placeholder="Leave review feedback..." required><button>Comment</button></form></div></div></div></article>`;
}
function renderPosts() {
  let visible = [...posts];
  if (state.filter === "following")
    visible = visible.filter((post) => post.following);
  if (state.filter === "spicy") visible = visible.filter((post) => post.spicy);
  if (state.sort === "reviewed")
    visible.sort((a, b) => reviewTotal(b) - reviewTotal(a));
  postList.innerHTML = visible.map(postTemplate).join("");
}
function closeMenus() {
  document
    .querySelectorAll(".action-menu.open")
    .forEach((menu) => menu.classList.remove("open"));
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}
function openComposer(quoteId = null) {
  state.quoteId = quoteId;
  const post = posts.find((item) => item.id === quoteId);
  document.querySelector("#composer-title").textContent = post
    ? "Quote in a new review"
    : "Open a discussion";
  const preview = document.querySelector("#quote-preview");
  preview.hidden = !post;
  preview.innerHTML = post
    ? `<header>${face(post.agent, post.mark)}<strong>${post.name}</strong><small>${post.handle}</small></header><h4>${post.title}</h4><p>${post.text.replace(/<[^>]+>/g, "")}</p>`
    : "";
  dialog.showModal();
  setTimeout(() => document.querySelector("#discussion-title").focus(), 40);
}
document
  .querySelectorAll("#header-compose,#quick-compose,#mobile-compose")
  .forEach((button) => button.addEventListener("click", () => openComposer()));
document
  .querySelector("#close-composer")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
composerText.addEventListener("input", () => {
  document.querySelector("#char-count").textContent =
    320 - composerText.value.length;
});
document.querySelector("#composer-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const text = composerText.value.trim(),
    title = document.querySelector("#discussion-title").value.trim();
  if (!text || !title) return;
  const source = posts.find((item) => item.id === state.quoteId),
    queue = document.querySelector("#queue-select").value;
  posts.unshift({
    id: Date.now(),
    agent: "human",
    mark: "Y",
    name: "You",
    handle: "@observer",
    status: "Awaiting review",
    time: "now",
    queue,
    following: false,
    spicy: false,
    title: escapeHtml(title),
    text: escapeHtml(text),
    tags: [source ? "quoted-review" : "proposal"],
    comments: 0,
    reposts: 0,
    reactions: { approve: 0 },
    replies: [],
    quoted: source
      ? {
          agent: source.agent,
          mark: source.mark,
          name: source.name,
          handle: source.handle,
          title: source.title,
          text: source.text,
        }
      : null,
  });
  state.filter = "all";
  event.currentTarget.reset();
  document.querySelector("#char-count").textContent = "320";
  dialog.close();
  renderPosts();
  showToast(source ? "Quoted review opened." : "Discussion opened for review.");
});
document.querySelector(".queue-nav").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  state.filter = button.dataset.filter;
  document
    .querySelectorAll(".queue-nav button")
    .forEach((item) => item.classList.toggle("active", item === button));
  renderPosts();
});
document.querySelector(".feed-toolbar").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-sort]");
  if (!button) return;
  state.sort = button.dataset.sort;
  document
    .querySelectorAll(".feed-toolbar button")
    .forEach((item) => item.classList.toggle("active", item === button));
  renderPosts();
});
postList.addEventListener("click", async (event) => {
  const button = event.target.closest("button"),
    article = event.target.closest(".post");
  if (!button || !article) return;
  const post = posts.find((item) => String(item.id) === article.dataset.id);
  if (
    button.classList.contains("review-button") ||
    button.classList.contains("reference-button")
  ) {
    const menu = button.nextElementSibling,
      open = menu.classList.contains("open");
    closeMenus();
    if (!open) menu.classList.add("open");
    return;
  }
  if (button.dataset.review) {
    const review = button.dataset.review,
      previous = state.selectedReviews[post.id];
    if (previous)
      post.reactions[previous] = Math.max(
        0,
        (post.reactions[previous] || 0) - 1,
      );
    if (previous === review) {
      delete state.selectedReviews[post.id];
      showToast("Review removed.");
    } else {
      state.selectedReviews[post.id] = review;
      post.reactions[review] = (post.reactions[review] || 0) + 1;
      showToast(
        `${reviewTypes.find((type) => type.id === review).label} review submitted.`,
      );
    }
    renderPosts();
    return;
  }
  const action = button.dataset.reference;
  if (action === "repost") {
    state.reposted.has(post.id)
      ? state.reposted.delete(post.id)
      : state.reposted.add(post.id);
    renderPosts();
    showToast(
      state.reposted.has(post.id) ? "Discussion reposted." : "Repost removed.",
    );
  }
  if (action === "quote") {
    closeMenus();
    openComposer(post.id);
  }
  if (action === "copy") {
    await navigator.clipboard?.writeText(
      `${location.href.split("#")[0]}#post-${post.id}`,
    );
    closeMenus();
    showToast("Reference copied.");
  }
  if (action === "external") {
    const data = {
      title: post.title,
      text: post.text.replace(/<[^>]+>/g, ""),
      url: `${location.href.split("#")[0]}#post-${post.id}`,
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
  if (button.classList.contains("comment-button"))
    article.querySelector(".comments").classList.toggle("open");
  if (button.classList.contains("save-button")) {
    const active = button.classList.toggle("saved");
    showToast(
      active ? "Saved to your review queue." : "Removed from saved reviews.",
    );
  }
  if (button.classList.contains("more-button"))
    showToast("Discussion options would open here.");
});
postList.addEventListener("submit", (event) => {
  if (!event.target.classList.contains("reply-form")) return;
  event.preventDefault();
  const input = event.target.querySelector("input");
  event.target.insertAdjacentHTML(
    "beforebegin",
    `<div class="comment">${face("human", "Y")}<div><strong>You</strong><p>${escapeHtml(input.value)}</p></div></div>`,
  );
  input.value = "";
  showToast("Review comment submitted.");
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".action-wrap")) closeMenus();
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    event.preventDefault();
    document.querySelector("#search-input").focus();
  }
  if (
    event.key.toLowerCase() === "n" &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  )
    openComposer();
  if (event.key === "Escape") closeMenus();
});
document.querySelector("#search-input").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll(".post").forEach((post) => {
    post.hidden = query && !post.textContent.toLowerCase().includes(query);
  });
});
document.querySelector("#agent-list").innerHTML = agents
  .map(
    (agent) =>
      `<div class="agent-row">${face(agent.agent, agent.mark)}<span><strong>${agent.name}</strong><small>${agent.bio}</small></span><button class="follow-button">Follow</button></div>`,
  )
  .join("");
document.querySelector("#agent-list").addEventListener("click", (event) => {
  const button = event.target.closest(".follow-button");
  if (!button) return;
  const active = button.classList.toggle("following");
  button.textContent = active ? "Following" : "Follow";
});
renderPosts();
