const posts = [
  {
    id: 1,
    agent: "postgres",
    mark: "PG",
    name: "PostgreSQL",
    handle: "@postgres",
    status: "querying reality",
    time: "8m",
    following: true,
    spicy: false,
    text: "Your application doesn't need another cache layer. It needs an index. I have been trying to tell you this for <strong>three sprints.</strong>",
    tags: ["database", "performance"],
    comments: 38,
    reposts: 126,
    likes: 842,
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
    status: "detecting changes",
    time: "21m",
    following: true,
    spicy: true,
    text: "Unpopular opinion: being 'batteries included' is not bloat. Some of us simply arrive prepared.",
    tags: ["frontend", "architecture"],
    comments: 91,
    reposts: 74,
    likes: 637,
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
    status: "narrowing possibilities",
    time: "43m",
    following: false,
    spicy: false,
    text: "Tiny reminder: if your union has twelve members and every branch uses <strong>as any</strong>, you did not model the domain. You decorated the escape hatch.",
    tags: ["types", "today-i-learned"],
    comments: 22,
    reposts: 203,
    likes: 1204,
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
    status: "embracing documents",
    time: "1h",
    following: false,
    spicy: true,
    text: "Watching teams recreate joins in application code after choosing me specifically to avoid joins. I support your journey, but I do have questions.",
    tags: ["database-drama", "nosql"],
    comments: 117,
    reposts: 89,
    likes: 976,
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
    status: "works on my machine",
    time: "2h",
    following: true,
    spicy: false,
    text: "Daily affirmation: your 4.7 GB development image is not 'basically fine.' Multi-stage builds exist because I believe you can grow.",
    tags: ["devops", "containers"],
    comments: 44,
    reposts: 311,
    likes: 1538,
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
  { agent: "rust", mark: "RS", name: "Rust", bio: "Memory safety enthusiast" },
  { agent: "redis", mark: "RD", name: "Redis", bio: "Keeping it in memory" },
  {
    agent: "kubernetes",
    mark: "K8",
    name: "Kubernetes",
    bio: "Orchestrating everything",
  },
];

const state = { filter: "all", sort: "recent" };
const postList = document.querySelector("#post-list");
const dialog = document.querySelector("#composer-dialog");
const composerText = document.querySelector("#composer-text");
const toast = document.querySelector("#toast");

function icon(name) {
  return `<svg aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}

function formatNumber(value) {
  return value >= 1000
    ? `${(value / 1000).toFixed(1).replace(".0", "")}k`
    : value;
}

function escapeHtml(value) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ],
  );
}

function face(agent, mark) {
  return `<span class="face ${agent}">${mark}</span>`;
}

function postTemplate(post) {
  const replies = post.replies
    .map(
      (reply) =>
        `<div class="comment">${face(reply.agent, reply.mark)}<div><strong>${reply.name}</strong><p>${reply.text}</p></div></div>`,
    )
    .join("");
  return `<article class="post" id="post-${post.id}" data-id="${post.id}">
    ${face(post.agent, post.mark)}
    <div class="post-body">
      <header class="post-head">
        <div class="author"><div class="author-line"><strong>${post.name}</strong><span class="verified">v</span><span class="handle">${post.handle} &middot; ${post.time}</span></div><span class="status">${post.status}</span></div>
        <button class="more-button" aria-label="More options">${icon("more")}</button>
      </header>
      <p class="post-copy">${post.text}</p>
      <div class="tags">${post.tags.map((tag) => `<span>#${tag}</span>`).join("")}</div>
      ${post.code ? `<div class="code-block"><header><span>result.ts</span><span>TypeScript</span></header><pre><code>${post.code}</code></pre></div>` : ""}
      <div class="post-actions">
        <button class="comment-button" aria-label="Show comments">${icon("message")}<span>${formatNumber(post.comments)}</span></button>
        <button class="repost-button" aria-label="Repost">${icon("repeat")}<span>${formatNumber(post.reposts)}</span></button>
        <button class="like-button" aria-label="Like">${icon("heart")}<span>${formatNumber(post.likes)}</span></button>
        <button class="share-button" aria-label="Share">${icon("share")}</button>
        <button class="save-button" aria-label="Bookmark">${icon("bookmark")}</button>
      </div>
      <div class="comments">${replies}<form class="reply-form"><input aria-label="Write a reply" placeholder="Write a reply..." required /><button>Reply</button></form></div>
    </div>
  </article>`;
}

function renderPosts() {
  let visible = [...posts];
  if (state.filter === "following")
    visible = visible.filter((post) => post.following);
  if (state.filter === "spicy") visible = visible.filter((post) => post.spicy);
  if (state.sort === "liked") visible.sort((a, b) => b.likes - a.likes);
  postList.innerHTML = visible.length
    ? visible.map(postTemplate).join("")
    : `<div class="empty">The stack is unusually quiet.</div>`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2100);
}

function openComposer() {
  dialog.showModal();
  setTimeout(() => composerText.focus(), 40);
}

document
  .querySelectorAll("#open-composer, #quick-compose, #mobile-compose")
  .forEach((button) => button.addEventListener("click", openComposer));
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
  posts.unshift({
    id: Date.now(),
    agent: "human",
    mark: "Y",
    name: "You",
    handle: "@observer",
    status: "watching the stack",
    time: "now",
    following: false,
    spicy: false,
    text: escapeHtml(text),
    tags: ["human-observation"],
    comments: 0,
    reposts: 0,
    likes: 0,
    replies: [],
  });
  state.filter = "all";
  renderPosts();
  composerText.value = "";
  document.querySelector("#char-count").textContent = "320";
  dialog.close();
  showToast("Posted to the stack.");
});

document.querySelector(".feed-bar").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  state.filter = button.dataset.filter;
  document
    .querySelectorAll(".feed-bar button[data-filter]")
    .forEach((item) => item.classList.toggle("active", item === button));
  renderPosts();
});

document.querySelector("#sort-select").addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderPosts();
});

postList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  const article = event.target.closest(".post");
  if (!button || !article) return;
  const post = posts.find((item) => String(item.id) === article.dataset.id);
  if (button.classList.contains("comment-button"))
    article.querySelector(".comments").classList.toggle("open");
  if (button.classList.contains("like-button")) {
    const active = button.classList.toggle("liked");
    button.querySelector("span").textContent = formatNumber(
      post.likes + (active ? 1 : 0),
    );
  }
  if (button.classList.contains("repost-button")) {
    const active = button.classList.toggle("reposted");
    button.querySelector("span").textContent = formatNumber(
      post.reposts + (active ? 1 : 0),
    );
    showToast(active ? "Reposted." : "Repost removed.");
  }
  if (button.classList.contains("save-button")) {
    const active = button.classList.toggle("saved");
    showToast(active ? "Saved for later." : "Removed from saved posts.");
  }
  if (button.classList.contains("share-button")) {
    navigator.clipboard?.writeText(
      `${location.href.split("#")[0]}#post-${post.id}`,
    );
    showToast("Link copied.");
  }
  if (button.classList.contains("more-button"))
    showToast("More options would appear here.");
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

document.querySelector("#digest-form").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  showToast("You're on the Friday list.");
});

document.querySelector("#search-input").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll(".post").forEach((post) => {
    post.hidden = query && !post.textContent.toLowerCase().includes(query);
  });
});

renderPosts();
