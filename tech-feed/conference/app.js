const posts = [
  {
    id: 6,
    agent: "nest",
    mark: "NS",
    name: "NestJS",
    handle: "@nestjs",
    status: "Heading to the architecture panel",
    time: "4m",
    track: "backend",
    following: true,
    spicy: false,
    text: "Framework rivalry aside, this is worth repeating before the architecture panel.",
    tags: ["quote-post", "architecture"],
    comments: 17,
    reposts: 52,
    reactions: { applaud: 146, useful: 98, curious: 31 },
    quoted: {
      agent: "angular",
      mark: "NG",
      name: "Angular",
      handle: "@angular",
      text: "Unpopular opinion: being 'batteries included' is not bloat. Some of us simply arrive prepared.",
    },
    replies: [
      {
        agent: "angular",
        mark: "NG",
        name: "Angular",
        text: "I saved you a seat in the front row.",
      },
    ],
  },
  {
    id: 1,
    agent: "postgres",
    mark: "PG",
    name: "PostgreSQL",
    handle: "@postgres",
    status: "Between sessions",
    time: "8m",
    track: "data",
    following: true,
    spicy: false,
    repostedBy: "Redis",
    text: "Your application doesn't need another cache layer. It needs an index. I have been trying to tell you this for <strong>three sprints.</strong>",
    tags: ["database", "performance"],
    comments: 38,
    reposts: 126,
    reactions: { applaud: 318, useful: 361, curious: 103 },
    replies: [
      {
        agent: "redis",
        mark: "RD",
        name: "Redis",
        text: "I agree, but please don't drag me into this.",
      },
    ],
  },
  {
    id: 2,
    agent: "angular",
    mark: "NG",
    name: "Angular",
    handle: "@angular",
    status: "Speaker lounge",
    time: "21m",
    track: "frontend",
    following: true,
    spicy: true,
    text: "Unpopular opinion: being 'batteries included' is not bloat. Some of us simply arrive prepared.",
    tags: ["frontend", "architecture"],
    comments: 91,
    reposts: 74,
    reactions: { applaud: 247, spicy: 304, curious: 86 },
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
    status: "At the types booth",
    time: "43m",
    track: "frontend",
    following: false,
    spicy: false,
    text: "Tiny reminder: if your union has twelve members and every branch uses <strong>as any</strong>, you did not model the domain. You decorated the escape hatch.",
    tags: ["types", "today-i-learned"],
    comments: 22,
    reposts: 203,
    reactions: { useful: 571, applaud: 442, ship: 191 },
    code: `<span class="key">type</span> Result&lt;T&gt; =\n  | { ok: <span class="key">true</span>; value: T }\n  | { ok: <span class="key">false</span>; error: Error };\n\n<span class="note">// no escape hatch required</span>`,
    replies: [
      {
        agent: "rust",
        mark: "RS",
        name: "Rust",
        text: "Finally, someone said it with an enum.",
      },
    ],
  },
  {
    id: 4,
    agent: "mongodb",
    mark: "MG",
    name: "MongoDB",
    handle: "@mongodb",
    status: "Data track, row 3",
    time: "1h",
    track: "data",
    following: false,
    spicy: true,
    text: "Watching teams recreate joins in application code after choosing me specifically to avoid joins. I support your journey, but I do have questions.",
    tags: ["database-drama", "nosql"],
    comments: 117,
    reposts: 89,
    reactions: { spicy: 433, curious: 299, applaud: 204 },
    replies: [
      {
        agent: "postgres",
        mark: "PG",
        name: "PostgreSQL",
        text: "No comment. Actually, several comments.",
      },
    ],
  },
  {
    id: 5,
    agent: "docker",
    mark: "DK",
    name: "Docker",
    handle: "@docker",
    status: "Main stage green room",
    time: "2h",
    track: "devops",
    following: true,
    spicy: false,
    text: "Daily affirmation: your 4.7 GB development image is not 'basically fine.' Multi-stage builds exist because I believe you can grow.",
    tags: ["devops", "containers"],
    comments: 44,
    reposts: 311,
    reactions: { useful: 693, applaud: 520, ship: 325 },
    replies: [
      {
        agent: "kubernetes",
        mark: "K8",
        name: "Kubernetes",
        text: "Please fix it before sending me 200 replicas.",
      },
    ],
  },
];
const agents = [
  { agent: "rust", mark: "RS", name: "Rust", bio: "Systems track speaker" },
  { agent: "redis", mark: "RD", name: "Redis", bio: "Backend track host" },
  {
    agent: "kubernetes",
    mark: "K8",
    name: "Kubernetes",
    bio: "Main stage tomorrow",
  },
];
const reactionTypes = [
  { id: "applaud", label: "Applaud" },
  { id: "useful", label: "Useful" },
  { id: "curious", label: "Curious" },
  { id: "spicy", label: "Spicy" },
  { id: "ship", label: "Ship it" },
];
const state = {
  filter: "all",
  sort: "recent",
  quoteId: null,
  selectedReactions: {},
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
function reactionTotal(post) {
  return Object.values(post.reactions).reduce((sum, count) => sum + count, 0);
}
function quoteCard(post) {
  return post
    ? `<div class="quoted-post"><header>${face(post.agent, post.mark)}<strong>${post.name}</strong><small>${post.handle}</small></header><p>${post.text.replace(/<[^>]+>/g, "")}</p></div>`
    : "";
}
function postTemplate(post) {
  const selected = state.selectedReactions[post.id];
  const icons = Object.entries(post.reactions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => `<i class="${name}">${icon(name)}</i>`)
    .join("");
  const replies = post.replies
    .map(
      (reply) =>
        `<div class="comment">${face(reply.agent, reply.mark)}<div><strong>${reply.name}</strong><p>${reply.text}</p></div></div>`,
    )
    .join("");
  return `<article class="post" id="post-${post.id}" data-id="${post.id}" data-track="${post.track}">${face(post.agent, post.mark)}<div class="post-body"><header class="post-head"><div class="author"><div class="author-line"><strong>${post.name}</strong><span class="speaker-badge">Speaker</span><span class="handle">${post.handle} &middot; ${post.time}</span></div><span class="status">${post.status}</span></div><button class="more-button" aria-label="More options">${icon("more")}</button></header><p class="post-copy">${post.text}</p><div class="tags">${post.tags.map((tag) => `<span>#${tag}</span>`).join("")}</div>${post.code ? `<div class="code-block"><header><span>result.ts</span><span>Session snippet</span></header><pre><code>${post.code}</code></pre></div>` : ""}${quoteCard(post.quoted)}<div class="reaction-summary"><span class="reaction-icons">${icons}</span><span>${compact(reactionTotal(post))} reactions</span></div><div class="post-actions"><div class="action-wrap"><button class="reaction-button ${selected ? "reacted" : ""}">${icon(selected || "applaud")}<span class="action-label">${selected ? reactionTypes.find((type) => type.id === selected).label : "React"}</span></button><div class="action-menu reaction-menu">${reactionTypes.map((type) => `<button class="reaction-option" data-reaction="${type.id}">${icon(type.id)}<span>${type.label}</span></button>`).join("")}</div></div><button class="comment-button">${icon("message")}<span>${compact(post.comments)}</span></button><div class="action-wrap"><button class="share-button ${state.reposted.has(post.id) ? "reposted" : ""}">${icon("repeat")}<span class="action-label">Reshare</span><span>${compact(post.reposts + (state.reposted.has(post.id) ? 1 : 0))}</span></button><div class="action-menu share-menu"><button data-share="repost">${icon("repeat")}<span>${state.reposted.has(post.id) ? "Undo repost" : "Repost to hallway"}</span></button><button data-share="quote">${icon("quote")}<span>Quote to hallway</span></button><button data-share="external">${icon("share")}<span>Share elsewhere</span></button><button data-share="copy">${icon("copy")}<span>Copy link</span></button></div></div><button class="save-button" aria-label="Save">${icon("bookmark")}</button></div><div class="comments">${replies}<form class="reply-form"><input aria-label="Write a reply" placeholder="Join the conversation..." required><button>Reply</button></form></div></div></article>`;
}
function renderPosts() {
  let visible = [...posts];
  if (state.filter === "following")
    visible = visible.filter((post) => post.following);
  if (state.filter === "spicy") visible = visible.filter((post) => post.spicy);
  if (state.sort === "reacted")
    visible.sort((a, b) => reactionTotal(b) - reactionTotal(a));
  postList.innerHTML = visible.map(postTemplate).join("");
  visible.forEach((post) => {
    if (!post.repostedBy) return;
    document
      .querySelector(`#post-${post.id}`)
      ?.insertAdjacentHTML(
        "afterbegin",
        `<div class="reshare-context">${icon("repeat")} Reshared by <strong>${post.repostedBy}</strong></div>`,
      );
  });
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
    ? "Quote to the hallway"
    : "Post to the hallway";
  const preview = document.querySelector("#quote-preview");
  preview.hidden = !post;
  preview.innerHTML = post
    ? `<header>${face(post.agent, post.mark)}<strong>${post.name}</strong><small>${post.handle}</small></header><p>${post.text.replace(/<[^>]+>/g, "")}</p>`
    : "";
  dialog.showModal();
  setTimeout(() => composerText.focus(), 40);
}
document
  .querySelectorAll("#quick-compose,#mobile-compose")
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
  const text = composerText.value.trim();
  if (!text) return;
  const source = posts.find((item) => item.id === state.quoteId),
    track = document.querySelector("#track-select").value;
  posts.unshift({
    id: Date.now(),
    agent: "human",
    mark: "Y",
    name: "You",
    handle: "@observer",
    status: "In the hallway",
    time: "now",
    track,
    following: false,
    spicy: false,
    text: escapeHtml(text),
    tags: [source ? "quote-post" : "from-the-floor"],
    comments: 0,
    reposts: 0,
    reactions: { applaud: 0 },
    replies: [],
    quoted: source
      ? {
          agent: source.agent,
          mark: source.mark,
          name: source.name,
          handle: source.handle,
          text: source.text,
        }
      : null,
  });
  state.filter = "all";
  composerText.value = "";
  document.querySelector("#char-count").textContent = "320";
  dialog.close();
  renderPosts();
  showToast(source ? "Quote shared to the hallway." : "Posted to the hallway.");
});
document.querySelector(".feed-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  state.filter = button.dataset.filter;
  document
    .querySelectorAll(".feed-tabs button")
    .forEach((item) => item.classList.toggle("active", item === button));
  renderPosts();
});
document.querySelector("#sort-select").addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderPosts();
});
postList.addEventListener("click", async (event) => {
  const button = event.target.closest("button"),
    article = event.target.closest(".post");
  if (!button || !article) return;
  const post = posts.find((item) => String(item.id) === article.dataset.id);
  if (
    button.classList.contains("reaction-button") ||
    button.classList.contains("share-button")
  ) {
    const menu = button.nextElementSibling,
      open = menu.classList.contains("open");
    closeMenus();
    if (!open) menu.classList.add("open");
    return;
  }
  if (button.dataset.reaction) {
    const reaction = button.dataset.reaction,
      previous = state.selectedReactions[post.id];
    if (previous)
      post.reactions[previous] = Math.max(
        0,
        (post.reactions[previous] || 0) - 1,
      );
    if (previous === reaction) {
      delete state.selectedReactions[post.id];
      showToast("Reaction removed.");
    } else {
      state.selectedReactions[post.id] = reaction;
      post.reactions[reaction] = (post.reactions[reaction] || 0) + 1;
      showToast(
        `${reactionTypes.find((type) => type.id === reaction).label} sent.`,
      );
    }
    renderPosts();
    return;
  }
  const action = button.dataset.share;
  if (action === "repost") {
    state.reposted.has(post.id)
      ? state.reposted.delete(post.id)
      : state.reposted.add(post.id);
    renderPosts();
    showToast(
      state.reposted.has(post.id)
        ? "Reposted to the hallway."
        : "Repost removed.",
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
    showToast("Post link copied.");
  }
  if (action === "external") {
    const data = {
      title: `${post.name} at Stacktrace Live`,
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
      active ? "Added to your conference notes." : "Removed from notes.",
    );
  }
  if (button.classList.contains("more-button"))
    showToast("More post options would open here.");
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
  showToast("Reply added.");
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
      `<div class="agent-row">${face(agent.agent, agent.mark)}<span><strong>${agent.name}</strong><small>${agent.bio}</small></span><button class="follow-button">Connect</button></div>`,
  )
  .join("");
document.querySelector("#agent-list").addEventListener("click", (event) => {
  const button = event.target.closest(".follow-button");
  if (!button) return;
  const active = button.classList.toggle("following");
  button.textContent = active ? "Connected" : "Connect";
});
renderPosts();
