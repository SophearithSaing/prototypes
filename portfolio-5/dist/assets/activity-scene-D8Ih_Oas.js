import {
  W as we,
  P as ge,
  S as se,
  a as Me,
  O as ye,
  H as be,
  D as re,
  B as W,
  M as ae,
  E as ce,
  L as le,
  b as de,
  G as xe,
  c as Le,
  R as Se,
  V as ke,
  C as G,
  I as ve,
  d as Ee,
  e as Ce,
  f as De,
  g as pe,
  h as Ae,
  i as Be,
  j as Pe,
  k as Fe,
} from "./index-L02tw7n2.js";
function We(i, me) {
  const h = new we({
    canvas: i,
    antialias: !0,
    alpha: !0,
    preserveDrawingBuffer: !0,
  });
  (h.setPixelRatio(Math.min(window.devicePixelRatio, 1.75)),
    h.setClearColor(0, 0),
    (h.shadowMap.enabled = !0),
    (h.shadowMap.type = ge),
    (h.outputColorSpace = se));
  const a = new Me(),
    l = new ye(-20, 20, 8, -8, 0.1, 100);
  (l.position.set(6, 18, 23),
    l.lookAt(0, 0.4, 0),
    a.add(new be(14350574, 1122340, 2.4)));
  const d = new re(15925222, 3);
  (d.position.set(-8, 18, -10),
    (d.castShadow = !0),
    d.shadow.mapSize.set(2048, 1024),
    (d.shadow.camera.left = -22),
    (d.shadow.camera.right = 22),
    (d.shadow.camera.top = 12),
    (d.shadow.camera.bottom = -12),
    (d.shadow.normalBias = 0.025),
    a.add(d));
  const I = new re(56551, 1.1);
  (I.position.set(8, 4, 10), a.add(I));
  const O = new W(0.48, 1, 0.48),
    U = new ae({ roughness: 0.38, metalness: 0.18 }),
    j = new ae({ color: "#0e1b20", roughness: 0.75, metalness: 0.3 }),
    H = new W(0.5, 1, 0.5),
    T = new ce(H);
  H.dispose();
  const z = new le({ color: "#e3ffb8" }),
    f = new de(T, z);
  ((f.visible = !1), a.add(f));
  let r = [],
    s,
    p,
    m;
  const k = new xe();
  a.add(k);
  const v = [],
    E = [],
    b = new Le(),
    q = new Se(),
    V = new ke(),
    C = new G(),
    ue = new G("#126c64"),
    he = new G("#a6ee61"),
    fe = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let x = 34,
    w = -1,
    D = 0,
    g = 0,
    A = !1,
    B = !1,
    M = 1;
  function X() {
    for (const e of [...k.children]) {
      const t = e;
      (t.geometry.dispose(),
        t.material.map?.dispose(),
        t.material.dispose(),
        k.remove(t));
    }
  }
  function Y(e, t, n, c = 1.5) {
    const o = document.createElement("canvas");
    ((o.width = 192), (o.height = 64));
    const u = o.getContext("2d");
    ((u.font = '500 52px "DM Sans", sans-serif'),
      (u.textAlign = "center"),
      (u.textBaseline = "middle"),
      (u.fillStyle = "#9fb4b3"),
      u.fillText(e, 96, 32));
    const L = new Ae(o);
    L.colorSpace = se;
    const S = new pe(
      new Be(c, 0.56),
      new Pe({ map: L, transparent: !0, depthWrite: !1 }),
    );
    ((S.rotation.x = -Math.PI / 2), S.position.set(t, 0.012, n), k.add(S));
  }
  function Z() {
    const e = i.clientWidth,
      t = i.clientHeight;
    if (!e || !t) return;
    h.setSize(e, t, !1);
    const n = e / t,
      c = Math.max((x + 4.5) / 2, 7.2 * n);
    ((l.left = -c),
      (l.right = c),
      (l.top = c / n),
      (l.bottom = -c / n),
      l.updateProjectionMatrix(),
      P());
  }
  function K(e) {
    if (s) {
      for (let t = 0; t < r.length; t++) {
        const n = 0.055 + (v[t] - 0.055) * e;
        (b.position.copy(E[t]),
          (b.position.y = n / 2),
          b.scale.set(1, n, 1),
          b.updateMatrix(),
          s.setMatrixAt(t, b.matrix));
      }
      ((s.instanceMatrix.needsUpdate = !0),
        s.computeBoundingSphere(),
        w >= 0 && J());
    }
  }
  function P() {
    !B && A && !document.hidden && h.render(a, l);
  }
  function $(e) {
    if (((g = 0), B || !A || document.hidden)) return;
    D || (D = e);
    const t = Math.min((e - D) / 900, 1);
    ((M = 1 - Math.pow(1 - t, 3)),
      K(M),
      P(),
      t < 1 && (g = requestAnimationFrame($)));
  }
  function F() {
    !A ||
      document.hidden ||
      B ||
      (M < 1 && !g ? (g = requestAnimationFrame($)) : P());
  }
  function J() {
    const e = 0.055 + (v[w] - 0.055) * M;
    (f.position.copy(E[w]),
      (f.position.y = e / 2 + 0.012),
      f.scale.set(1, e + 0.025, 1));
  }
  function R(e, t = !1) {
    if (e < 0 || e >= r.length || r[e].future || (e === w && !t)) return;
    ((w = e), (f.visible = !0), J());
    const n = f.position.clone().project(l);
    (me(r[e], t, ((n.x + 1) * i.clientWidth) / 2), P());
  }
  function N(e) {
    if (!s) return -1;
    const t = i.getBoundingClientRect();
    return (
      V.set(
        ((e.clientX - t.left) / t.width) * 2 - 1,
        -((e.clientY - t.top) / t.height) * 2 + 1,
      ),
      q.setFromCamera(V, l),
      q.intersectObject(s)[0]?.instanceId ?? -1
    );
  }
  function Q(e) {
    if (e.pointerType !== "mouse") return;
    const t = N(e);
    (i.classList.toggle("is-hovering", t >= 0 && !r[t].future), R(t));
  }
  let y;
  function _(e) {
    y = [e.clientX, e.clientY];
  }
  function ee(e) {
    (y && Math.hypot(e.clientX - y[0], e.clientY - y[1]) < 8 && R(N(e)),
      (y = void 0));
  }
  function te() {
    y = void 0;
  }
  function oe(e) {
    const t = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
    let n = r.length - 1;
    for (; n >= 0 && r[n].future;) n--;
    if (n < 0) return;
    const c = w < 0 ? n : w;
    if (e.key in t || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const o = e.key === "Home" ? 0 : e.key === "End" ? n : c + t[e.key];
      R(Fe.clamp(o, 0, n), !0);
    }
  }
  const ne = new ResizeObserver(Z);
  ne.observe(i);
  const ie = new IntersectionObserver(([e]) => {
    ((A = e.isIntersecting), F());
  });
  return (
    ie.observe(i),
    document.addEventListener("visibilitychange", F),
    i.addEventListener("pointermove", Q),
    i.addEventListener("pointerdown", _),
    i.addEventListener("pointerup", ee),
    i.addEventListener("pointercancel", te),
    i.addEventListener("keydown", oe),
    {
      setDays(e) {
        (g && cancelAnimationFrame(g),
          (g = 0),
          (r = e),
          (w = -1),
          (f.visible = !1),
          X(),
          s && (a.remove(s), s.dispose()),
          p && (a.remove(p), p.geometry.dispose()),
          m && (a.remove(m), m.geometry.dispose(), m.material.dispose()),
          (x = ((r[r.length - 1]?.week ?? 52) + 1) * 0.62));
        const n = Math.max(
          1,
          ...r.filter((o) => !o.future).map((o) => o.count),
        );
        ((s = new ve(O, U, r.length)),
          s.instanceMatrix.setUsage(Ee),
          (s.castShadow = !0),
          (s.receiveShadow = !0),
          (v.length = E.length = 0));
        let c = -2;
        (r.forEach((o, u) => {
          const L = o.week * 0.62 - (x - 0.62) / 2;
          if (
            (E.push(new Ce(L, 0, (o.weekday - 3) * 0.62)),
            v.push(De(o.future ? 0 : o.count, n)),
            o.future
              ? C.set("#0c181d")
              : o.count === 0
                ? C.set("#1c3438")
                : C.copy(ue).lerp(he, Math.sqrt(o.count / n)),
            s.setColorAt(u, C),
            (u === 0 || o.date.endsWith("-01")) && o.week - c >= 2)
          ) {
            const S = new Intl.DateTimeFormat("en", {
              month: "short",
              timeZone: "UTC",
            }).format(new Date(`${o.date}T00:00:00Z`));
            (Y(S, L, 2.8), (c = o.week));
          }
        }),
          (s.instanceColor.needsUpdate = !0),
          a.add(s),
          (p = new pe(new W(x + 2.4, 0.18, 7), j)),
          p.position.set(-0.3, -0.12, 0.25),
          (p.receiveShadow = !0),
          a.add(p),
          (m = new de(
            new ce(p.geometry),
            new le({ color: "#294849", transparent: !0, opacity: 0.65 }),
          )),
          m.position.copy(p.position),
          a.add(m));
        for (const [o, u] of [
          [1, "Mon"],
          [3, "Wed"],
          [5, "Fri"],
        ])
          Y(u, -x / 2 - 0.9, (o - 3) * 0.62, 1.15);
        ((M = fe ? 1 : 0), (D = 0), K(M), Z(), F());
      },
      dispose() {
        ((B = !0),
          cancelAnimationFrame(g),
          ne.disconnect(),
          ie.disconnect(),
          document.removeEventListener("visibilitychange", F),
          i.removeEventListener("pointermove", Q),
          i.removeEventListener("pointerdown", _),
          i.removeEventListener("pointerup", ee),
          i.removeEventListener("pointercancel", te),
          i.removeEventListener("keydown", oe),
          X(),
          s?.dispose(),
          p?.geometry.dispose(),
          m?.geometry.dispose(),
          m && m.material.dispose(),
          O.dispose(),
          U.dispose(),
          j.dispose(),
          T.dispose(),
          z.dispose(),
          d.shadow.dispose(),
          h.dispose());
      },
    }
  );
}
export { We as createActivityScene };
