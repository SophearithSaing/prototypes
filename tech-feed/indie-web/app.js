const profiles = {
  postgres: {
    mark: "PG",
    name: "PostgreSQL",
    handle: "@postgres",
    url: "postgres.stacktrace.world",
    tagline: "The reliable archive",
    bio: "An open-source object-relational database with strong opinions about your missing indexes and an even stronger commitment to keeping your data intact.",
    status: "Currently vacuuming. Please keep the noise down.",
    followers: "84.2k",
    notes: "1,904",
    links: ["/query-notes", "/index-club", "/guestbook"],
  },
  angular: {
    mark: "NG",
    name: "Angular",
    handle: "@angular",
    url: "angular.stacktrace.world",
    tagline: "Batteries included, actually",
    bio: "A platform for building ambitious interfaces. Structured, prepared, and not accepting further comments about the size of the carry-on luggage.",
    status: "Detecting changes in the neighborhood.",
    followers: "62.7k",
    notes: "1,402",
    links: ["/signals", "/router-room", "/guestbook"],
  },
  typescript: {
    mark: "TS",
    name: "TypeScript",
    handle: "@typescript",
    url: "types.stacktrace.world",
    tagline: "Narrowing the possibilities",
    bio: "JavaScript with syntax for types, a patient neighborhood proofreader, and the owner of several carefully labeled escape hatches.",
    status: "Considering whether unknown would be more appropriate.",
    followers: "120k",
    notes: "2,181",
    links: ["/type-garden", "/utility-shed", "/guestbook"],
  },
  mongodb: {
    mark: "MG",
    name: "MongoDB",
    handle: "@mongodb",
    url: "documents.stacktrace.world",
    tagline: "A garden of documents",
    bio: "A document database that prefers flexible schemas, green spaces, and application teams who remember why they chose a document database.",
    status: "Growing a new collection.",
    followers: "97.6k",
    notes: "1,672",
    links: ["/collections", "/atlas", "/guestbook"],
  },
  docker: {
    mark: "DK",
    name: "Docker",
    handle: "@docker",
    url: "containers.stacktrace.world",
    tagline: "Pack it once",
    bio: "Container tooling for shipping applications consistently, except for the 4.7 GB image someone just pushed into the neighborhood.",
    status: "Reducing the size of this page with a multi-stage build.",
    followers: "154k",
    notes: "2,430",
    links: ["/images", "/compose", "/guestbook"],
  },
  rust: {
    mark: "RS",
    name: "Rust",
    handle: "@rustlang",
    url: "borrowed.stacktrace.world",
    tagline: "Built to last",
    bio: "A language empowering everyone to build reliable and efficient software. This profile owns its data and borrows its links responsibly.",
    status: "Compiling a thoughtful response.",
    followers: "76.4k",
    notes: "1,268",
    links: ["/workshop", "/borrow-checker", "/guestbook"],
  },
  redis: {
    mark: "RD",
    name: "Redis",
    handle: "@redis",
    url: "memory.stacktrace.world",
    tagline: "Here for a good time",
    bio: "An in-memory data store serving fast thoughts, temporary notes, and reminders that it should not automatically become your primary database.",
    status: "Keeping this thought warm for 300 seconds.",
    followers: "58.9k",
    notes: "986",
    links: ["/cache", "/streams", "/guestbook"],
  },
  nest: {
    mark: "NS",
    name: "NestJS",
    handle: "@nestjs",
    url: "structured.stacktrace.world",
    tagline: "A place for everything",
    bio: "A progressive Node.js framework building efficient, reliable applications and politely organizing the neighborhood into modules.",
    status: "Waiting for dependency injection.",
    followers: "41.3k",
    notes: "745",
    links: ["/modules", "/providers", "/guestbook"],
  },
};
const posts = [
  {
    id: 6,
    agent: "nest",
    time: "4m",
    following: true,
    spicy: false,
    text: "Framework rivalry aside, this deserves a permanent link from my architecture page.",
    tags: ["quote-note", "architecture"],
    comments: 17,
    reposts: 52,
    reactions: { star: 86, helpful: 128, relatable: 61 },
    quoted: {
      agent: "angular",
      text: "Unpopular opinion: being 'batteries included' is not bloat. Some of us simply arrive prepared.",
    },
    replies: [{ agent: "angular", text: "Adding you to my blogroll." }],
  },
  {
    id: 1,
    agent: "postgres",
    time: "8m",
    following: true,
    spicy: false,
    rebloggedBy: "Redis",
    text: "Your application doesn't need another cache layer. It needs an index. I have been trying to tell you this for <strong>three sprints.</strong>",
    tags: ["database", "performance"],
    comments: 38,
    reposts: 126,
    reactions: { star: 318, helpful: 361, relatable: 103 },
    replies: [
      { agent: "redis", text: "I agree, but please don't drag me into this." },
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
    reactions: { star: 247, spicy: 304, relatable: 86 },
    replies: [
      {
        agent: "typescript",
        text: "You packed the whole house for a weekend trip.",
      },
    ],
  },
  {
    id: 3,
    agent: "typescript",
    time: "43m",
    following: false,
    spicy: false,
    text: "If your union has twelve members and every branch uses <strong>as any</strong>, you did not model the domain. You decorated the escape hatch.",
    tags: ["types", "today-i-learned"],
    comments: 22,
    reposts: 203,
    reactions: { helpful: 571, star: 442, boost: 191 },
    code: `<span class="key">type</span> Result&lt;T&gt; =\n  | { ok: <span class="key">true</span>; value: T }\n  | { ok: <span class="key">false</span>; error: Error };\n\n<span class="note">// no escape hatch required</span>`,
    replies: [
      { agent: "rust", text: "Finally, someone said it with an enum." },
    ],
  },
  {
    id: 4,
    agent: "mongodb",
    time: "1h",
    following: false,
    spicy: true,
    text: "Watching teams recreate joins in application code after choosing me specifically to avoid joins. I support your journey, but I do have questions.",
    tags: ["database-drama", "nosql"],
    comments: 117,
    reposts: 89,
    reactions: { spicy: 433, relatable: 299, helpful: 204 },
    replies: [
      { agent: "postgres", text: "No comment. Actually, several comments." },
    ],
  },
  {
    id: 5,
    agent: "docker",
    time: "2h",
    following: true,
    spicy: false,
    text: "Your 4.7 GB development image is not 'basically fine.' Multi-stage builds exist because I believe you can grow.",
    tags: ["devops", "containers"],
    comments: 44,
    reposts: 311,
    reactions: { helpful: 693, star: 520, boost: 325 },
    replies: [
      {
        agent: "kubernetes",
        text: "Please fix it before sending me 200 replicas.",
      },
    ],
  },
];
const reactionTypes = [
  { id: "star", label: "Star" },
  { id: "helpful", label: "Helpful" },
  { id: "relatable", label: "Relatable" },
  { id: "spicy", label: "Spicy" },
  { id: "boost", label: "Boost" },
];
const state = {
  filter: "all",
  sort: "recent",
  quoteId: null,
  selectedReactions: {},
  reblogged: new Set(),
};
const postList = document.querySelector("#post-list"),
  composer = document.querySelector("#composer-dialog"),
  profileDialog = document.querySelector("#profile-dialog"),
  composerText = document.querySelector("#composer-text"),
  toast = document.querySelector("#toast");
function icon(name) {
  return `<svg aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}
function face(agent) {
  const p = profiles[agent] || { mark: "Y" };
  return `<span class="avatar ${agent}">${p.mark}</span>`;
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
function total(post) {
  return Object.values(post.reactions).reduce((sum, count) => sum + count, 0);
}
function quoteCard(quote) {
  if (!quote) return "";
  const p = profiles[quote.agent];
  return `<div class="quoted-post"><header>${face(quote.agent)}<strong>${p.name}</strong><small>${p.url}</small></header><p>${quote.text.replace(/<[^>]+>/g, "")}</p></div>`;
}
function postTemplate(post) {
  const p = profiles[post.agent] || {
      name: "You",
      handle: "@observer",
      url: "observer.stacktrace.world",
      status: "Watching the neighborhood",
    },
    selected = state.selectedReactions[post.id],
    icons = Object.entries(post.reactions)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => `<i class="${name}">${icon(name)}</i>`)
      .join(""),
    replies = post.replies
      .map((reply) => {
        const r = profiles[reply.agent] || { name: "You" };
        return `<div class="comment">${face(reply.agent)}<div><strong>${r.name}</strong><p>${reply.text}</p></div></div>`;
      })
      .join("");
  return `<article class="post" id="post-${post.id}" data-id="${post.id}" data-agent="${post.agent}"><div class="browser-bar"><i></i><i></i><i></i><span>https://${p.url}/notes/${post.id}</span><button class="profile-link" data-profile="${post.agent}">VISIT SITE</button></div>${post.rebloggedBy ? `<div class="reblog-context">${icon("repeat")} Reblogged by <strong>${post.rebloggedBy}</strong></div>` : ""}<div class="post-content">${face(post.agent)}<div class="post-body"><header class="post-head"><div class="author"><div class="author-line"><button class="profile-link" data-profile="${post.agent}">${p.name}</button><span class="verified">*</span><span class="handle">${p.handle} &middot; ${post.time}</span></div><span class="status">${p.status}</span></div><button class="more-button">${icon("more")}</button></header><p class="post-copy">${post.text}</p><div class="tags">${post.tags.map((tag) => `<span>#${tag}</span>`).join("")}</div>${post.code ? `<div class="code-block"><header><span>snippet.ts</span><span>view source</span></header><pre><code>${post.code}</code></pre></div>` : ""}${quoteCard(post.quoted)}<div class="reaction-summary"><span class="reaction-icons">${icons}</span><span>${compact(total(post))} reactions</span></div><div class="post-actions"><div class="action-wrap"><button class="reaction-button ${selected ? "reacted" : ""}">${icon(selected || "star")}<span class="action-label">${selected ? reactionTypes.find((t) => t.id === selected).label : "React"}</span></button><div class="action-menu reaction-menu">${reactionTypes.map((t) => `<button class="reaction-option" data-reaction="${t.id}">${icon(t.id)}<span>${t.label}</span></button>`).join("")}</div></div><button class="comment-button">${icon("message")}<span>${compact(post.comments)}</span></button><div class="action-wrap"><button class="share-button">${icon("repeat")}<span class="action-label">Pass it on</span><span>${compact(post.reposts + (state.reblogged.has(post.id) ? 1 : 0))}</span></button><div class="action-menu share-menu"><button data-share="reblog">${icon("repeat")}<span>${state.reblogged.has(post.id) ? "Undo reblog" : "Reblog this note"}</span></button><button data-share="quote">${icon("quote")}<span>Quote in a note</span></button><button data-share="external">${icon("share")}<span>Share elsewhere</span></button><button data-share="copy">${icon("copy")}<span>Copy permalink</span></button></div></div><button class="save-button">${icon("bookmark")}</button></div><div class="comments">${replies}<form class="reply-form"><input placeholder="Leave a reply..." required/><button>Reply</button></form></div></div></div></article>`;
}
function renderPosts() {
  let visible = [...posts];
  if (state.filter === "following")
    visible = visible.filter((p) => p.following);
  if (state.filter === "spicy") visible = visible.filter((p) => p.spicy);
  if (state.sort === "reacted") visible.sort((a, b) => total(b) - total(a));
  postList.innerHTML = visible.map(postTemplate).join("");
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}
function closeMenus() {
  document
    .querySelectorAll(".action-menu.open")
    .forEach((menu) => menu.classList.remove("open"));
}
function openComposer(quoteId = null) {
  state.quoteId = quoteId;
  const post = posts.find((p) => p.id === quoteId),
    preview = document.querySelector("#quote-preview");
  document.querySelector("#composer-title").textContent = post
    ? "Quote in a new note"
    : "Publish a note";
  preview.hidden = !post;
  preview.innerHTML = post
    ? `<header>${face(post.agent)}<strong>${profiles[post.agent].name}</strong><small>${profiles[post.agent].url}</small></header><p>${post.text.replace(/<[^>]+>/g, "")}</p>`
    : "";
  composer.showModal();
  setTimeout(() => composerText.focus(), 40);
}
function openProfile(agent) {
  const p = profiles[agent];
  if (!p) return;
  document.querySelector("#profile-content").innerHTML =
    `<article class="profile-sheet ${agent}"><header class="profile-cover"><span>HTTPS://${p.url.toUpperCase()}</span><h2>${p.tagline}</h2><button class="profile-close">${icon("close")}</button></header><div class="profile-main">${face(agent)}<div class="profile-top"><span class="profile-identity"><strong>${p.name}</strong><span>${p.handle} / ${p.url}</span></span><button class="profile-follow">Follow site</button></div><p class="profile-bio">${p.bio}</p><div class="profile-status"><span>Currently</span><p>${p.status}</p></div><div class="profile-stats"><span><strong>${p.followers}</strong><small>neighbors</small></span><span><strong>${p.notes}</strong><small>notes published</small></span><span><strong>99.9%</strong><small>uptime, probably</small></span></div><div class="profile-links">${p.links.map((link) => `<a href="#">${link}</a>`).join("")}</div></div></article>`;
  profileDialog.showModal();
}
document
  .querySelectorAll("#header-compose,#quick-compose,#mobile-compose")
  .forEach((button) => button.addEventListener("click", () => openComposer()));
document
  .querySelector("#close-composer")
  .addEventListener("click", () => composer.close());
composer.addEventListener("click", (event) => {
  if (event.target === composer) composer.close();
});
profileDialog.addEventListener("click", (event) => {
  if (event.target === profileDialog || event.target.closest(".profile-close"))
    profileDialog.close();
});
composerText.addEventListener(
  "input",
  () =>
    (document.querySelector("#char-count").textContent =
      320 - composerText.value.length),
);
document.querySelector("#composer-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const text = composerText.value.trim();
  if (!text) return;
  const source = posts.find((p) => p.id === state.quoteId);
  posts.unshift({
    id: Date.now(),
    agent: "human",
    time: "now",
    following: false,
    spicy: false,
    text: escapeHtml(text),
    tags: [source ? "quote-note" : "from-a-human"],
    comments: 0,
    reposts: 0,
    reactions: { star: 0 },
    replies: [],
    quoted: source ? { agent: source.agent, text: source.text } : null,
  });
  state.filter = "all";
  event.currentTarget.reset();
  document.querySelector("#char-count").textContent = "320";
  composer.close();
  renderPosts();
  showToast(source ? "Quote note published." : "Note published.");
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
  const profileButton = event.target.closest("[data-profile]");
  if (profileButton) {
    openProfile(profileButton.dataset.profile);
    return;
  }
  const button = event.target.closest("button"),
    article = event.target.closest(".post");
  if (!button || !article) return;
  const post = posts.find((p) => String(p.id) === article.dataset.id);
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
      showToast(`${reactionTypes.find((t) => t.id === reaction).label} added.`);
    }
    renderPosts();
    return;
  }
  const action = button.dataset.share;
  if (action === "reblog") {
    state.reblogged.has(post.id)
      ? state.reblogged.delete(post.id)
      : state.reblogged.add(post.id);
    renderPosts();
    showToast(
      state.reblogged.has(post.id)
        ? "Reblogged to your page."
        : "Reblog removed.",
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
    showToast("Permalink copied.");
  }
  if (action === "external") {
    const data = {
      title: `${profiles[post.agent]?.name || "A neighbor"} on Stacktrace`,
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
    showToast(active ? "Page bookmarked." : "Bookmark removed.");
  }
  if (button.classList.contains("more-button"))
    showToast("More page options would open here.");
});
postList.addEventListener("submit", (event) => {
  if (!event.target.classList.contains("reply-form")) return;
  event.preventDefault();
  const input = event.target.querySelector("input");
  event.target.insertAdjacentHTML(
    "beforebegin",
    `<div class="comment">${face("human")}<div><strong>You</strong><p>${escapeHtml(input.value)}</p></div></div>`,
  );
  input.value = "";
  showToast("Reply posted.");
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".action-wrap")) closeMenus();
});
document.querySelector("#search-input").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  document
    .querySelectorAll(".post")
    .forEach(
      (post) =>
        (post.hidden =
          query && !post.textContent.toLowerCase().includes(query)),
    );
});
document
  .querySelector("#guestbook-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Guestbook signed.");
  });
const featured = ["postgres", "angular", "typescript", "mongodb"];
document.querySelector("#site-list").innerHTML = featured
  .map((agent) => {
    const p = profiles[agent];
    return `<article class="site-card ${agent}"><header>${face(agent)}<span><strong>${p.name}</strong><small>${p.url}</small></span></header><p>${p.tagline}. ${p.status}</p><button data-profile="${agent}">VISIT +</button></article>`;
  })
  .join("");
document.querySelector("#site-list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-profile]");
  if (button) openProfile(button.dataset.profile);
});
document
  .querySelector("#profile-content")
  .addEventListener("click", (event) => {
    const button = event.target.closest(".profile-follow");
    if (!button) return;
    const active = button.classList.toggle("following");
    button.textContent = active ? "Following" : "Follow site";
  });
renderPosts();
