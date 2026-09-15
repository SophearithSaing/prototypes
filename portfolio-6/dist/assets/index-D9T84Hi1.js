import {
  f as q,
  G as oe,
  q as z,
  g,
  c as h,
  r as K,
  V as E,
  s as N,
  t as Ge,
  u as qe,
  b as at,
  v as ne,
  w as rt,
  I as lt,
  x as ct,
  E as dt,
  y as pt,
  z as ut,
  D as ft,
  J as We,
  K as mt,
  X as ht,
  Y as yt,
  Z as gt,
  _ as wt,
  m as bt,
  $ as xt,
  a0 as vt,
  a1 as He,
  a2 as je,
  A as St,
  W as Tt,
  H as Et,
  a as Be,
  a3 as Ct,
  e as Pt,
} from "./three-core-WEinqkvm.js";
import {
  O as zt,
  E as Mt,
  R as kt,
  U as It,
  a as Lt,
} from "./three-effects-BawLS995.js";
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) i(c);
  new MutationObserver((c) => {
    for (const r of c)
      if (r.type === "childList")
        for (const u of r.addedNodes)
          u.tagName === "LINK" && u.rel === "modulepreload" && i(u);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(c) {
    const r = {};
    return (
      c.integrity && (r.integrity = c.integrity),
      c.referrerPolicy && (r.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : c.crossOrigin === "anonymous"
          ? (r.credentials = "omit")
          : (r.credentials = "same-origin"),
      r
    );
  }
  function i(c) {
    if (c.ep) return;
    c.ep = !0;
    const r = n(c);
    fetch(c.href, r);
  }
})();
const S = new q("#00e8f2"),
  R = new q("#bdff78"),
  V = 15.2,
  Y = 11.4;
let fe = 42;
function ye() {
  return ((fe = (fe * 16807) % 2147483647), (fe - 1) / 2147483646);
}
const y = (e, t) => e + ye() * (t - e),
  me = [
    {
      id: "typescript",
      name: "TypeScript",
      x: -2.7,
      z: 2,
      size: 1.75,
      color: S,
      description:
        "A strong foundation for ambitious applications. I use TypeScript to build reliable, expressive systems that are a pleasure to maintain.",
      tags: ["Type safety", "Web applications", "Developer experience"],
    },
    {
      id: "react",
      name: "React",
      x: 0,
      z: -0.1,
      size: 1.8,
      color: S,
      description:
        "Thoughtful interfaces, built component by component. My focus is on responsive experiences, accessible interactions, and clean, reusable architecture.",
      tags: ["React", "Next.js", "Design systems"],
    },
    {
      id: "node",
      name: "Node.js",
      x: 1.25,
      z: 2.55,
      size: 1.85,
      color: S,
      description:
        "The engine behind the experience. Scalable services and well-designed APIs that connect the interface to everything it needs.",
      tags: ["REST & GraphQL", "Backend services", "PostgreSQL"],
    },
    {
      id: "three",
      name: "Three.js",
      x: 4.6,
      z: -2,
      size: 1.8,
      color: R,
      description:
        "Bringing another dimension to the web. Real-time graphics, custom shaders, and playful interactions that make digital experiences feel tangible.",
      tags: ["WebGL", "Creative development", "3D interaction"],
    },
    {
      id: "aws",
      name: "AWS",
      x: 5.1,
      z: 0.5,
      size: 1.75,
      color: R,
      description:
        "From a local idea to a global service. Resilient cloud infrastructure designed with performance, observability, and simplicity in mind.",
      tags: ["Cloud architecture", "Serverless", "Infrastructure as code"],
    },
    {
      id: "cicd",
      name: "CI/CD",
      x: 5,
      z: 3.15,
      size: 1.8,
      color: R,
      description:
        "Great engineering keeps moving. Automated pipelines that turn small, confident changes into dependable production releases.",
      tags: ["GitHub Actions", "Docker", "Automated delivery"],
    },
    {
      id: "system",
      name: "System Design",
      x: 0.1,
      z: 4.6,
      size: 1.85,
      color: S,
      description:
        "Seeing the whole board. Balancing the details of each component with the needs of the larger system, from the first sketch to production scale.",
      tags: ["Architecture", "Distributed systems", "Scalability"],
    },
  ],
  j = [
    {
      id: "2019",
      year: "2019",
      name: "Junior Developer",
      x: -4.6,
      z: 2.6,
      color: S,
      description:
        "The first connection. Turning curiosity into craft, shipping my first production features, and discovering how much I love building for the web.",
      tags: ["The foundations", "JavaScript", "HTML & CSS"],
    },
    {
      id: "2020",
      year: "2020",
      name: "Software Engineer",
      x: -3.45,
      z: -0.45,
      color: S,
      description:
        "From features to full products. Taking ownership of end-to-end experiences and connecting great interface design with dependable backend systems.",
      tags: ["Full-stack development", "React", "TypeScript"],
    },
    {
      id: "2022",
      year: "2022",
      name: "Senior Engineer",
      x: 0.9,
      z: -3.05,
      color: R,
      description:
        "Building with a wider perspective. Leading complex projects, shaping system architecture, and helping other engineers do their best work.",
      tags: ["Technical ownership", "System design", "Mentorship"],
    },
    {
      id: "2024",
      year: "2024",
      name: "Lead Engineer",
      x: 3.6,
      z: -4.3,
      color: R,
      description:
        "Connecting people, technology, and possibility. Guiding teams from an ambitious idea to a thoughtfully engineered product.",
      tags: ["Engineering leadership", "Technical strategy", "Team growth"],
    },
  ];
function Fe(e, t, n) {
  const i = new pt();
  return (
    i.moveTo(-e / 2 + n, -t / 2),
    i.lineTo(e / 2 - n, -t / 2),
    i.quadraticCurveTo(e / 2, -t / 2, e / 2, -t / 2 + n),
    i.lineTo(e / 2, t / 2 - n),
    i.quadraticCurveTo(e / 2, t / 2, e / 2 - n, t / 2),
    i.lineTo(-e / 2 + n, t / 2),
    i.quadraticCurveTo(-e / 2, t / 2, -e / 2, t / 2 - n),
    i.lineTo(-e / 2, -t / 2 + n),
    i.quadraticCurveTo(-e / 2, -t / 2, -e / 2 + n, -t / 2),
    i
  );
}
function $(e, t, n, i, c) {
  const r = new dt(Fe(e, t, i), {
    depth: n,
    bevelEnabled: !0,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.025,
    bevelThickness: 0.025,
    curveSegments: 7,
  });
  r.rotateX(-Math.PI / 2);
  const u = new h(r, c);
  return ((u.castShadow = !0), (u.receiveShadow = !0), u);
}
function ge(e) {
  const t = new We(e);
  return ((t.colorSpace = mt), (t.anisotropy = 8), t);
}
function Rt() {
  const e = document.createElement("canvas");
  ((e.width = 2048), (e.height = 1536));
  const t = e.getContext("2d");
  ((t.fillStyle = "#081518"), t.fillRect(0, 0, 2048, 1536));
  for (let n = 0; n < 2700; n++) {
    const i = Math.floor(y(20, 2020) / 8) * 8,
      c = Math.floor(y(20, 1510) / 8) * 8,
      r = y(15, 140),
      u = ye() > 0.5 ? 1 : -1;
    ((t.strokeStyle = ["#10272b", "#122a2e", "#163036", "#061013", "#1a3033"][
      n % 5
    ]),
      (t.lineWidth = n % 3 === 0 ? 1.5 : 0.7),
      t.beginPath(),
      t.moveTo(i, c),
      t.lineTo(i + r * 0.4, c),
      t.lineTo(i + r * 0.65, c + r * 0.25 * u),
      t.lineTo(i + r, c + r * 0.25 * u),
      t.stroke(),
      n % 3 === 0 &&
        ((t.strokeStyle = "#31403b"),
        t.beginPath(),
        t.arc(i, c, 1.8, 0, Math.PI * 2),
        t.stroke()));
  }
  for (let n = 0; n < 250; n++) {
    const i = y(20, 1950),
      c = y(20, 1450);
    ((t.strokeStyle = "#213338"),
      (t.lineWidth = 0.7),
      t.strokeRect(i, c, y(14, 60), y(9, 30)),
      (t.fillStyle = "#425251"),
      (t.font = "5px monospace"),
      t.fillText(`${["R", "C", "U", "D"][n % 4]}${100 + n}`, i, c - 3));
  }
  return (
    (t.strokeStyle = "#24424a"),
    (t.lineWidth = 2),
    t.strokeRect(18, 18, 2012, 1500),
    (t.font = "10px monospace"),
    (t.fillStyle = "#466366"),
    t.fillText("AR / ENGINEERING THE CONNECTIONS", 65, 1490),
    t.fillText("REV 05.24     •     DESIGNED TO EVOLVE", 1610, 1490),
    ge(e)
  );
}
function At(e, t, n) {
  ((e.strokeStyle = n),
    (e.fillStyle = n),
    (e.lineWidth = 5),
    (e.lineJoin = "round"));
  const i = 256,
    c = 178;
  if (t === "react") {
    for (let r = 0; r < 3; r++)
      (e.save(),
        e.translate(i, c),
        e.rotate((r * Math.PI) / 3),
        e.beginPath(),
        e.ellipse(0, 0, 71, 26, 0, 0, Math.PI * 2),
        e.stroke(),
        e.restore());
    (e.beginPath(), e.arc(i, c, 9, 0, Math.PI * 2), e.fill());
  } else if (t === "typescript")
    (e.strokeRect(201, 126, 110, 103),
      (e.font = "500 67px Arial"),
      (e.textAlign = "center"),
      e.fillText("TS", 258, 209));
  else if (t === "node") {
    e.beginPath();
    for (let r = 0; r < 6; r++) {
      const u = (r * Math.PI) / 3 - Math.PI / 6,
        W = i + Math.cos(u) * 66,
        A = c + Math.sin(u) * 60;
      r === 0 ? e.moveTo(W, A) : e.lineTo(W, A);
    }
    (e.closePath(),
      e.stroke(),
      (e.font = "500 58px Arial"),
      (e.textAlign = "center"),
      e.fillText("JS", 256, 197));
  } else if (t === "three")
    (e.beginPath(),
      e.moveTo(193, 120),
      e.lineTo(330, 170),
      e.lineTo(218, 238),
      e.closePath(),
      e.moveTo(193, 120),
      e.lineTo(251, 188),
      e.lineTo(330, 170),
      e.moveTo(251, 188),
      e.lineTo(218, 238),
      e.moveTo(218, 151),
      e.lineTo(272, 191),
      e.stroke());
  else if (t === "aws")
    ((e.fillStyle = "#edf1ed"),
      (e.textAlign = "center"),
      (e.font = "100 90px Arial"),
      e.fillText("aws", 256, 203),
      (e.strokeStyle = "#ffac35"),
      (e.lineWidth = 6),
      e.beginPath(),
      e.moveTo(188, 225),
      e.quadraticCurveTo(250, 268, 323, 225),
      e.stroke(),
      e.beginPath(),
      e.moveTo(305, 225),
      e.lineTo(326, 222),
      e.lineTo(321, 243),
      e.stroke());
  else if (t === "cicd")
    ((e.lineWidth = 8),
      e.beginPath(),
      e.moveTo(256, 178),
      e.bezierCurveTo(135, 69, 133, 269, 256, 178),
      e.bezierCurveTo(379, 69, 379, 269, 256, 178),
      e.stroke());
  else
    for (let r = 2; r >= 0; r--) {
      const u = 139 + r * 26;
      (e.beginPath(),
        e.moveTo(200, u),
        e.lineTo(267, u - 20),
        e.lineTo(321, u + 16),
        e.lineTo(252, u + 37),
        e.closePath(),
        (e.fillStyle = "#081518"),
        e.fill(),
        e.stroke());
    }
}
function Ot(e) {
  const t = document.createElement("canvas");
  t.width = t.height = 512;
  const n = t.getContext("2d");
  ((n.fillStyle = "#091013"), n.fillRect(0, 0, 512, 512));
  const i = n.createLinearGradient(0, 0, 512, 512);
  (i.addColorStop(0, "#182527"),
    i.addColorStop(0.5, "#0b1417"),
    i.addColorStop(1, "#071012"),
    (n.fillStyle = i),
    n.beginPath(),
    n.roundRect(13, 13, 486, 486, 28),
    n.fill(),
    (n.strokeStyle = "#344246"),
    (n.lineWidth = 2),
    n.stroke(),
    (n.strokeStyle = "#172a2d"),
    (n.lineWidth = 1),
    n.beginPath(),
    n.roundRect(23, 23, 466, 466, 23),
    n.stroke());
  const c = ["node", "cicd", "three"].includes(e.id) ? "#91f2a3" : "#00e4f1";
  return (
    n.save(),
    n.translate(256, 178),
    n.scale(1.16, 1.16),
    n.translate(-256, -178),
    At(n, e.id, c),
    n.restore(),
    (n.fillStyle = "#edf2ee"),
    (n.textAlign = "center"),
    (n.font = "400 52px Arial"),
    e.id === "system"
      ? (n.fillText("System", 256, 325), n.fillText("Design", 256, 377))
      : e.id !== "aws" && n.fillText(e.name, 256, 328),
    (n.fillStyle = "#48605e"),
    (n.textAlign = "left"),
    (n.font = "12px monospace"),
    n.fillText("AR " + e.id.toUpperCase() + " / 01", 47, 462),
    (n.fillStyle = "#64807c"),
    n.beginPath(),
    n.arc(43, 43, 5, 0, Math.PI * 2),
    n.fill(),
    ge(t)
  );
}
function I(e, t, n) {
  const i = new Ge();
  for (let r = 1; r < e.length; r++) i.add(new qe(e[r - 1], e[r]));
  return new h(new ut(i, Math.max(12, e.length * 6), t, 5, !1), n);
}
function P(e, t, n) {
  const i = new h(new ft(e, t, 8, 40), n);
  return ((i.rotation.x = -Math.PI / 2), i);
}
function Dt(e) {
  const t = document.createElement("canvas");
  ((t.width = 512), (t.height = 256));
  const n = t.getContext("2d");
  ((n.textAlign = "center"),
    (n.fillStyle = e.color === S ? "#36f3ed" : "#b4f68a"),
    (n.font = "500 56px Arial"),
    n.fillText(e.year, 256, 65),
    (n.fillStyle = "#edf4ef"),
    (n.font = "400 52px Arial"));
  const i = e.name.split(" ");
  return (n.fillText(i[0], 256, 122), n.fillText(i[1], 256, 174), ge(t));
}
function Nt() {
  const e = new oe(),
    t = [],
    n = [],
    i = new z({ color: "#142127", metalness: 0.85, roughness: 0.32 }),
    c = new z({ color: "#080f12", metalness: 0.55, roughness: 0.39 }),
    r = new z({ color: "#617477", metalness: 0.92, roughness: 0.28 }),
    u = new z({ color: "#92866b", metalness: 0.85, roughness: 0.4 }),
    W = new g({ color: new q(0, 1.5, 1.9) }),
    A = new g({ color: new q(1.15, 1.8, 0.43) }),
    ve = $(V, Y, 0.26, 0.3, i);
  ((ve.position.y = -0.28), e.add(ve));
  const Se = $(V - 0.09, Y - 0.06, 0.15, 0.25, c);
  ((Se.position.y = -0.44), e.add(Se));
  const Ze = $(
    V - 0.08,
    Y - 0.08,
    0.04,
    0.28,
    new z({ color: "#0c1b1d", metalness: 0.65, roughness: 0.48 }),
  );
  e.add(Ze);
  const _ = new h(
    new K(V - 0.35, Y - 0.35),
    new z({ map: Rt(), metalness: 0.62, roughness: 0.48 }),
  );
  ((_.rotation.x = -Math.PI / 2),
    (_.position.y = 0.069),
    (_.receiveShadow = !0),
    e.add(_));
  const Qe = Fe(V - 0.02, Y - 0.02, 0.3)
    .getPoints(14)
    .map((o) => new E(o.x, -0.075, -o.y));
  (e.add(I(Qe, 0.012, new g({ color: "#086577" }))),
    e.add(
      I(
        [
          new E(-7.45, -0.06, 4.9),
          new E(-7.45, -0.06, 5.35),
          new E(-7.2, -0.06, 5.64),
          new E(-0.5, -0.06, 5.64),
        ],
        0.017,
        W,
      ),
    ),
    e.add(I([new E(7.55, -0.07, -3.8), new E(7.55, -0.07, 3.8)], 0.014, A)));
  for (const [o, s] of [
    [-7.17, -5.26],
    [7.17, -5.26],
    [-7.17, 5.26],
    [7.17, 5.26],
    [0, -5.26],
    [3.7, 5.26],
    [-7.17, 0],
    [7.17, 0],
  ]) {
    const a = new h(new N(0.1, 0.1, 0.012, 20), c);
    (a.position.set(o, 0.09, s), e.add(a));
    const l = P(0.11, 0.024, r);
    (l.position.set(o, 0.097, s), e.add(l));
    const d = P(0.17, 0.008, u);
    (d.position.set(o, 0.082, s), e.add(d));
  }
  const Te = { black: [], silver: [], gold: [], cyan: [], lime: [] },
    b = (o, s, a, l, d, f, m, p = 0) =>
      Te[o].push({ x: s, y: a, z: l, sx: d, sy: f, sz: m, rotation: p }),
    de = (o, s, a = 0.3) =>
      me.some(
        (l) =>
          Math.abs(l.x - o) < l.size / 2 + a &&
          Math.abs(l.z - s) < l.size / 2 + a,
      ) || j.some((l) => Math.hypot(l.x - o, l.z - s) < 0.6);
  for (let o = 0; o < 720; o++) {
    const s = y(-7.05, 7.05),
      a = y(-5.12, 5.12);
    if (de(s, a)) continue;
    const l = ye() > 0.5 ? 0 : Math.PI / 2,
      d = y(0.055, 0.12),
      f = y(0.11, 0.25),
      m = y(0.035, 0.095);
    b("black", s, 0.085 + m / 2, a, d, m, f, l);
    for (const p of [-1, 1])
      b(
        o % 4 === 0 ? "gold" : "silver",
        s + (l ? p * f * 0.4 : 0),
        0.09 + m / 2,
        a + (l ? 0 : p * f * 0.4),
        d * 1.04,
        m * 0.75,
        f * 0.2,
        l,
      );
    o % 21 === 0 &&
      b(o % 42 === 0 ? "lime" : "cyan", s, 0.14, a, 0.047, 0.035, 0.042);
  }
  for (let o = 0; o < 100; o++) {
    const s = y(-6.9, 6.9),
      a = y(-4.9, 4.9);
    if (de(s, a, 0.65)) continue;
    const l = y(0.3, 0.68),
      d = y(0.3, 0.75);
    b("black", s, 0.17, a, l, 0.17, d);
    for (let f = -1; f <= 1; f += 2)
      for (let m = 0; m < 5; m++)
        b(
          "silver",
          s + f * (l / 2 + 0.05),
          0.13,
          a - d * 0.38 + m * d * 0.19,
          0.11,
          0.07,
          0.028,
        );
    b("silver", s - l * 0.32, 0.259, a - d * 0.32, 0.024, 0.003, 0.024);
  }
  const _e = new N(0.105, 0.105, 0.24, 14);
  for (let o = 0; o < 29; o++) {
    const s = y(-7, 7),
      a = y(-5, 5);
    if (de(s, a, 0.5)) continue;
    const l = new h(_e, i);
    (l.position.set(s, 0.2, a), e.add(l));
    const d = P(0.084, 0.014, r);
    (d.position.set(s, 0.325, a),
      e.add(d),
      b("silver", s, 0.33, a, 0.1, 0.005, 0.01));
  }
  for (const o of me) {
    const s = new oe();
    s.position.set(o.x, 0.11, o.z);
    const a = $(o.size + 0.17, o.size + 0.17, 0.075, 0.13, c);
    s.add(a);
    const l = $(o.size, o.size, 0.2, 0.12, i);
    ((l.position.y = 0.07), s.add(l));
    const d = Ot(o),
      f = new h(
        new K(o.size - 0.035, o.size - 0.035),
        new z({
          map: d,
          metalness: 0.42,
          roughness: 0.5,
          emissive: "#b5d5d4",
          emissiveIntensity: 0.4,
          emissiveMap: d,
        }),
      );
    ((f.rotation.x = -Math.PI / 2),
      (f.position.y = 0.298),
      s.add(f),
      (f.userData = { type: "skill", ...o }),
      t.push(f),
      e.add(s));
    const m = o.color === S ? "cyan" : "lime";
    for (const p of [-1, 1])
      for (let T = 0; T < 13; T++) {
        const v = (-0.73 * o.size) / 2 + (T * o.size * 0.73) / 12;
        (b(
          "silver",
          o.x + p * (o.size / 2 + 0.09),
          0.23,
          o.z + v,
          0.19,
          0.075,
          0.045,
        ),
          b(
            m,
            o.x + p * (o.size / 2 + 0.165),
            0.188,
            o.z + v,
            0.036,
            0.085,
            0.03,
          ),
          b(
            "silver",
            o.x + v,
            0.23,
            o.z + p * (o.size / 2 + 0.09),
            0.045,
            0.075,
            0.19,
          ),
          b(
            m,
            o.x + v,
            0.188,
            o.z + p * (o.size / 2 + 0.165),
            0.03,
            0.085,
            0.036,
          ));
      }
    for (let p = 0; p < 7; p++) {
      const T = (p - 3) * 0.1,
        v = o.x > 3 ? -1 : 1,
        F = o.x + v * (o.size / 2 + 0.2),
        X = o.z + T,
        te = 0.3 + p * 0.075,
        pe = Math.min(5.15, X + (o.z > 2 ? -1 : 1) * (1.1 + p * 0.095)),
        ue = [
          [F, X],
          [F + v * te, X],
          [F + v * (te + 0.45), X + (pe - X) * 0.45],
          [F + v * (te + 0.45), pe - 0.16],
          [F + v * (te + 0.61), pe],
        ],
        nt = o.color.clone().multiplyScalar(p % 3 === 0 ? 0.85 : 0.29),
        Re = new g({ color: nt });
      e.add(
        I(
          ue.map(([st, it]) => new E(st, 0.091, it)),
          p % 3 === 0 ? 0.011 : 0.006,
          Re,
        ),
      );
      const Ae = P(0.035, 0.01, Re);
      (Ae.position.set(ue[4][0], 0.095, ue[4][1]), e.add(Ae));
    }
  }
  const et = [
    { from: [-3.45, -0.45], to: [-2.7, 1.03], color: S },
    { from: [-1.6, -1.7], to: [0, -1.1], color: S },
    { from: [0.9, -3.05], to: [3.58, -2], color: R },
    { from: [0.9, -3.05], to: [4.1, 0.5], color: R },
    { from: [3.6, -4.3], to: [5.3, -3], color: R },
    { from: [-1.6, -1.7], to: [1.25, 1.45], color: S },
  ];
  for (const o of et)
    for (let s = 0; s < 4; s++) {
      const a = s * 0.075,
        [l, d] = o.from,
        [f, m] = o.to,
        p = [
          [l + a, d],
          [l + a, d + 0.3 + a],
          [l + 0.55 + a, d + 0.85 + a],
          [l + 0.55 + a, m - 0.4 - a],
          [l + 0.95 + a, m - a],
          [f, m - a],
        ];
      e.add(
        I(
          p.map(([T, v]) => new E(T, 0.09, v)),
          0.007,
          new g({ color: o.color.clone().multiplyScalar(0.45) }),
        ),
      );
    }
  const k = [
      [-6.35, 4.6],
      [-6.1, 3.9],
      [-5.5, 3.3],
      [-4.6, 2.6],
      [-4.1, 1.8],
      [-3.9, 0.7],
      [-3.45, -0.45],
      [-2.7, -0.9],
      [-1.6, -1.7],
      [-0.75, -2.55],
      [0.9, -3.05],
      [2.15, -3.55],
      [2.6, -4],
      [3.6, -4.3],
      [4.25, -5],
    ].map(([o, s]) => new E(o, 0.25, s)),
    Ee = new Ge();
  for (let o = 1; o < k.length; o++) {
    Ee.add(new qe(k[o - 1], k[o]));
    const s = S.clone().lerp(R, at.smoothstep(o, 6, 11));
    (e.add(
      I(
        [k[o - 1], k[o]],
        0.043,
        new g({
          color: s.clone().multiplyScalar(0.45),
          transparent: !0,
          opacity: 0.3,
        }),
      ),
    ),
      e.add(
        I(
          [k[o - 1], k[o]],
          0.02,
          new g({ color: s.clone().multiplyScalar(2.4) }),
        ),
      ),
      e.add(I([k[o - 1], k[o]], 0.007, new g({ color: new q(2, 2.8, 2.3) }))));
  }
  for (const o of j) {
    const s = new oe();
    s.position.set(o.x, 0.09, o.z);
    const a = new h(new N(0.24, 0.29, 0.11, 40), i);
    ((a.position.y = 0.04), s.add(a));
    const l = P(
      0.22,
      0.027,
      new g({ color: o.color.clone().multiplyScalar(2) }),
    );
    ((l.position.y = 0.18), s.add(l));
    const d = new h(
      new N(0.16, 0.19, 0.11, 32),
      new z({
        color: "#133237",
        metalness: 0.7,
        roughness: 0.2,
        emissive: o.color,
        emissiveIntensity: 0.35,
      }),
    );
    ((d.position.y = 0.12), s.add(d));
    const f = new h(
      new ne(0.055, 12, 8),
      new g({ color: o.color.clone().multiplyScalar(2) }),
    );
    ((f.position.y = 0.22), s.add(f));
    const m = new h(new ne(0.36, 12, 8), new g({ visible: !1 }));
    ((m.userData = { type: "milestone", ...o }), s.add(m), t.push(m));
    const p = P(
      0.28,
      0.012,
      new g({ color: o.color, transparent: !0, opacity: 0.35 }),
    );
    ((p.position.y = 0.085), s.add(p), n.push(p), e.add(s));
    const T = new h(
      new K(2.15, 1.075),
      new g({ map: Dt(o), transparent: !0, depthWrite: !1, toneMapped: !1 }),
    );
    ((T.rotation.x = -Math.PI / 2),
      T.position.set(o.x - 0.45, 0.17, o.z - 0.86),
      e.add(T));
  }
  for (const [o, s] of [
    [-1.6, -1.7],
    [-0.75, -2.55],
  ]) {
    const a = P(0.115, 0.019, W);
    (a.position.set(o, 0.21, s), e.add(a));
  }
  const Ce = new h(new N(0.25, 0.29, 0.12, 32), i);
  (Ce.position.set(-6.35, 0.14, 4.6), e.add(Ce));
  const Pe = P(0.19, 0.038, r);
  (Pe.position.set(-6.35, 0.21, 4.6), e.add(Pe));
  const O = new oe();
  O.position.set(4.25, 0.35, -5);
  const tt = new h(new N(0.25, 0.29, 0.15, 32), i);
  O.add(tt);
  const ze = P(0.25, 0.021, A);
  ((ze.position.y = 0.1), O.add(ze));
  const Me = P(0.41, 0.023, A);
  ((Me.position.y = 0.44), O.add(Me));
  const ke = new h(
    new N(0.4, 0.4, 0.025, 40),
    new z({
      color: "#152b1b",
      metalness: 0.6,
      roughness: 0.25,
      transparent: !0,
      opacity: 0.9,
    }),
  );
  ((ke.position.y = 0.425), O.add(ke));
  const Ie = [];
  for (let o = 0; o <= 10; o++) {
    const s = (o * Math.PI) / 5 - Math.PI / 2,
      a = o % 2 === 0 ? 0.23 : 0.105;
    Ie.push(new E(Math.cos(s) * a, 0.45, Math.sin(s) * a));
  }
  (O.add(I(Ie, 0.018, A)), e.add(O));
  const ee = new h(new ne(0.48, 12, 8), new g({ visible: !1 }));
  ((ee.userData = { type: "milestone", ...j[3] }),
    (ee.position.y = 0.3),
    O.add(ee),
    t.push(ee));
  for (let o = 0; o < 3; o++) {
    const s = -5.6 + o * 2;
    b("black", s, 0.18, -5.08, 1.55, 0.2, 0.24);
    for (let a = 0; a < 16; a++)
      b("gold", s - 0.68 + a * 0.09, 0.24, -5.08, 0.036, 0.12, 0.15);
  }
  for (let o = 0; o < 3; o++)
    (b("black", 7.23, 0.14, -2.7 + o * 2.65, 0.25, 0.2, 2.05),
      b("silver", 7.39, 0.14, -2.7 + o * 2.65, 0.04, 0.16, 1.8));
  const ot = { black: c, silver: r, gold: u, cyan: W, lime: A },
    B = new rt();
  for (const [o, s] of Object.entries(Te)) {
    const a = new lt(new ct(1, 1, 1), ot[o], s.length);
    (s.forEach((l, d) => {
      (B.position.set(l.x, l.y, l.z),
        B.scale.set(l.sx, l.sy, l.sz),
        B.rotation.set(0, l.rotation, 0),
        B.updateMatrix(),
        a.setMatrixAt(d, B.matrix));
    }),
      (a.castShadow = o === "black"),
      (a.receiveShadow = !0),
      e.add(a));
  }
  const Le = [];
  for (let o = 0; o < 5; o++) {
    const s = new h(new ne(0.032, 8, 6), new g({ color: new q(1.8, 3, 2.5) }));
    (e.add(s), Le.push(s));
  }
  return { group: e, interactive: t, pulses: n, travelers: Le, pathCurve: Ee };
}
const U = document.querySelector("#scene"),
  Gt = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  C = new ht();
C.background = new q("#03080b");
C.fog = new yt("#03080b", 0.018);
const D = new gt(39, 1, 0.1, 100),
  w = new wt({ antialias: !0, alpha: !1, powerPreference: "high-performance" });
w.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
w.toneMapping = bt;
w.toneMappingExposure = 1.15;
w.shadowMap.enabled = !0;
w.shadowMap.type = xt;
U.appendChild(w.domElement);
w.domElement.setAttribute(
  "aria-label",
  "Circuit board. Drag to rotate, scroll to zoom, and click a glowing node to explore.",
);
const x = new zt(D, w.domElement);
x.enableDamping = !0;
x.dampingFactor = 0.065;
x.enablePan = !1;
x.minDistance = 13;
x.maxDistance = 33;
x.minPolarAngle = 0.3;
x.maxPolarAngle = Math.PI / 2.55;
x.rotateSpeed = 0.45;
x.zoomSpeed = 0.6;
x.enableZoom = !0;
C.add(new vt("#b5d9e4", "#081014", 0.7));
const M = new He("#d1e5ee", 2.2);
M.position.set(-3, 12, -5);
M.castShadow = !0;
M.shadow.mapSize.set(2048, 2048);
M.shadow.camera.left = -11;
M.shadow.camera.right = 11;
M.shadow.camera.top = 10;
M.shadow.camera.bottom = -10;
M.shadow.normalBias = 0.025;
M.shadow.bias = -1e-4;
C.add(M);
const Xe = new He("#568a9d", 0.8);
Xe.position.set(5, 5, 8);
C.add(Xe);
const Ve = new je("#00bdde", 20, 16, 2);
Ve.position.set(-5, 2, 5);
C.add(Ve);
const Ye = new je("#b6fa76", 12, 12, 2);
Ye.position.set(5, 2, -3);
C.add(Ye);
const H = Nt();
C.add(H.group);
const re = new h(
  new K(180, 180),
  new z({ color: "#010304", metalness: 0.15, roughness: 0.95 }),
);
re.rotation.x = -Math.PI / 2;
re.position.y = -0.63;
re.receiveShadow = !0;
C.add(re);
const ae = document.createElement("canvas");
ae.width = ae.height = 128;
const we = ae.getContext("2d"),
  le = we.createRadialGradient(64, 64, 0, 64, 64, 64);
le.addColorStop(0, "#ffffff");
le.addColorStop(0.35, "#ffffff55");
le.addColorStop(1, "#ffffff00");
we.fillStyle = le;
we.fillRect(0, 0, 128, 128);
const qt = new We(ae);
for (const [e, t, n, i, c] of [
  [-4, 4, "#00a6c5", 9, 6],
  [6, -2, "#84b743", 6, 7],
]) {
  const r = new h(
    new K(i, c),
    new g({
      map: qt,
      color: n,
      transparent: !0,
      opacity: 0.13,
      depthWrite: !1,
      blending: St,
    }),
  );
  ((r.rotation.x = -Math.PI / 2), r.position.set(e, -0.615, t), C.add(r));
}
const $e = new Tt(1, 1, { type: Et });
$e.samples = 4;
const Z = new Mt(w, $e);
Z.addPass(new kt(C, D));
const Wt = new It(new Be(1, 1), 0.55, 0.5, 0.95);
Z.addPass(Wt);
Z.addPass(new Lt());
function Q() {
  const e = U.clientWidth < 600;
  (D.position.set(e ? 9 : 6.12, e ? 17.5 : 11.88, e ? 20.5 : 13.82),
    x.target.set(0, 0, 0),
    x.update());
}
let Oe = U.clientWidth < 600;
function Je() {
  const e = U.clientWidth,
    t = U.clientHeight,
    n = e < 600;
  ((D.aspect = e / t),
    n !== Oe && (Q(), (Oe = n)),
    (D.fov = n ? 49 : e / t < 1.3 ? 44 : 32),
    D.setViewOffset(e, t, -e * (n ? 0.02 : 0.1), t * (n ? -0.11 : 0.06), e, t),
    D.updateProjectionMatrix(),
    w.setSize(e, t),
    Z.setSize(e, t));
}
Q();
Je();
window.addEventListener("resize", Je);
document.querySelector("#reset-view").addEventListener("click", Q);
const Ke = document.querySelector("#detail-panel"),
  L = document.querySelector("#tooltip");
let he = null;
function be(e, t) {
  ((he = t || document.activeElement),
    (document.querySelector("#detail-eyebrow").textContent =
      e.eyebrow ||
      (e.year
        ? `CAREER MILESTONE / ${e.year}`
        : "CONNECTED SKILL / CORE TECHNOLOGY")),
    (document.querySelector("#detail-title").textContent = e.name),
    (document.querySelector("#detail-description").textContent =
      e.description));
  const n = document.querySelector("#detail-tags");
  if (
    (n.replaceChildren(),
    (e.tags || []).forEach((i) => {
      const c = document.createElement("span");
      ((c.textContent = i), n.appendChild(c));
    }),
    e.email)
  ) {
    const i = document.createElement("a");
    ((i.href = `mailto:${e.email}`),
      (i.textContent = e.email),
      n.appendChild(i));
  }
  ((document.querySelector("#detail-footer").textContent =
    e.footer || "PART OF THE BIGGER PICTURE"),
    (Ke.hidden = !1),
    (L.style.opacity = "0"),
    document.querySelector("#close-panel").focus({ preventScroll: !0 }));
}
function ce() {
  ((Ke.hidden = !0),
    he instanceof HTMLElement && he.focus({ preventScroll: !0 }));
}
document.querySelector("#close-panel").addEventListener("click", ce);
window.addEventListener("keydown", (e) => {
  e.key === "Escape" && ce();
});
const Ht = {
  about: {
    eyebrow: "THE PERSON BEHIND THE BOARD",
    name: "Hi, I’m Alex.",
    description:
      "A software engineer who loves connecting the dots between thoughtful design and well-built technology. This board is a map of my journey — each chip a skill, each connection a step forward.",
    tags: ["Curious by nature", "Engineer by craft", "Always learning"],
  },
  experience: { ...j[3], eyebrow: "EXPERIENCE / 2019 — PRESENT" },
  skills: {
    eyebrow: "THE ENGINEERING TOOLKIT",
    name: "Connected by craft.",
    description:
      "A full-stack toolkit, built through years of making things. Select any of the seven processors on the board to explore the technology behind the work.",
    tags: me.map((e) => e.name),
    footer: "7 CORE SKILLS / ONE CONNECTED SYSTEM",
  },
  projects: {
    eyebrow: "SELECTED WORK / 001",
    name: "A career, connected.",
    description:
      "You’re looking at it. A real-time, interactive portfolio built with Three.js — featuring a custom circuit board, illuminated signal paths, and a career you can explore in three dimensions.",
    tags: ["Three.js", "WebGL", "JavaScript", "Creative development"],
    footer: "LIVE PROJECT / DRAG TO EXPLORE",
  },
  contact: {
    eyebrow: "LET’S MAKE A CONNECTION",
    name: "Build something great.",
    description:
      "Have an interesting challenge, a new idea, or a team that cares about craft? I’d love to hear what you’re working on.",
    email: "hello@alexrivera.dev",
    footer: "OPEN TO GOOD CONVERSATIONS",
  },
};
document.querySelectorAll("[data-view]").forEach((e) =>
  e.addEventListener("click", () => {
    const t = e.dataset.view;
    (document
      .querySelectorAll(".nav-link")
      .forEach((n) => n.classList.toggle("active", n.dataset.view === t)),
      t === "home" ? (ce(), Q()) : be(Ht[t], e));
  }),
);
document.querySelector(".identity").addEventListener("click", () => {
  (ce(), Q());
});
let se = 0;
document.querySelector("#explore").addEventListener("click", (e) => {
  (be(j[se], e.currentTarget),
    (se = (se + 1) % j.length),
    (e.currentTarget.firstChild.textContent =
      se === 0 ? "Explore my journey " : "Next connection "));
});
const De = new Ct(),
  Ne = new Be();
let J = null,
  G = null;
function Ue(e) {
  const t = w.domElement.getBoundingClientRect();
  return (
    Ne.set(
      ((e.clientX - t.left) / t.width) * 2 - 1,
      -((e.clientY - t.top) / t.height) * 2 + 1,
    ),
    De.setFromCamera(Ne, D),
    De.intersectObjects(H.interactive, !1)[0]?.object
  );
}
w.domElement.addEventListener("pointerdown", (e) => {
  ((J = { x: e.clientX, y: e.clientY }), (L.style.opacity = "0"));
});
w.domElement.addEventListener("pointermove", (e) => {
  if (e.buttons) {
    L.style.opacity = "0";
    return;
  }
  ((G = Ue(e)),
    (w.domElement.style.cursor = G ? "pointer" : "grab"),
    G
      ? ((L.textContent = `${G.userData.year ? G.userData.year + " / " : ""}${G.userData.name} ↗`),
        (L.style.left = `${Math.min(e.clientX + 16, window.innerWidth - 230)}px`),
        (L.style.top = `${e.clientY - 40}px`),
        (L.style.opacity = "1"))
      : (L.style.opacity = "0"));
});
w.domElement.addEventListener("pointerup", (e) => {
  if (J && Math.hypot(e.clientX - J.x, e.clientY - J.y) < 6) {
    const t = Ue(e);
    t && be(t.userData);
  }
  J = null;
});
w.domElement.addEventListener("pointerleave", () => {
  ((L.style.opacity = "0"), (G = null));
});
const jt = new Pt();
let ie = !0;
function xe() {
  if (!ie) return;
  const e = jt.getElapsedTime();
  (x.update(),
    Gt ||
      (H.pulses.forEach((t, n) => {
        const i = (e * 0.45 + n * 0.27) % 1;
        (t.scale.setScalar(1 + i * 0.8), (t.material.opacity = (1 - i) * 0.4));
      }),
      H.travelers.forEach((t, n) => {
        (t.position.copy(
          H.pathCurve.getPoint((e * 0.035 + n / H.travelers.length) % 1),
        ),
          (t.position.y += 0.018));
      })),
    Z.render(),
    requestAnimationFrame(xe));
}
document.addEventListener("visibilitychange", () => {
  document.hidden ? (ie = !1) : ie || ((ie = !0), xe());
});
xe();
document.querySelector("#loading").style.opacity = "0";
setTimeout(() => document.querySelector("#loading").remove(), 800);
