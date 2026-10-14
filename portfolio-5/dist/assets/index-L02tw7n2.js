(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s);
  new MutationObserver((s) => {
    for (const r of s)
      if (r.type === "childList")
        for (const a of r.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && n(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(s) {
    const r = {};
    return (
      s.integrity && (r.integrity = s.integrity),
      s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (r.credentials = "omit")
          : (r.credentials = "same-origin"),
      r
    );
  }
  function n(s) {
    if (s.ep) return;
    s.ep = !0;
    const r = t(s);
    fetch(s.href, r);
  }
})();
const Ht = [
    {
      id: "2021",
      year: "2021",
      title: "Web Developer",
      lines: ["Web", "Developer"],
      eyebrow: "01 / The first connection",
      description:
        "Building websites with PHP and JS. The start of my journey in web development.",
      tags: ["PHP", "JS"],
      color: "#00e5ed",
      position: [-4.7, 0.05],
    },
    {
      id: "2022",
      year: "2022",
      title: "Frontend Developer",
      lines: ["Frontend", "Developer"],
      eyebrow: "02 / Finding my footing",
      description:
        "Moving into frontend development with Magento, working on the interfaces behind e-commerce experiences.",
      tags: ["Magento"],
      color: "#20f0e9",
      position: [-1.55, 0.8],
    },
    {
      id: "2023",
      year: "2023",
      title: "Frontend Developer",
      lines: ["Frontend", "Developer"],
      eyebrow: "03 / Seeing the system",
      description:
        "Continuing in frontend development with Angular and Node, connecting application interfaces with backend services.",
      tags: ["Angular", "Node"],
      color: "#a0ed59",
      position: [1.9, 1.35],
    },
    {
      id: "2025",
      year: "2025",
      title: "Lead Node.js Developer",
      lines: ["Lead Node.js", "Developer"],
      eyebrow: "04 / Building what’s next",
      description:
        "Stepping into a Lead Node.js Developer role, working with Nest.js and Hyperleder Fabric.",
      tags: ["Nest.js", "Hyperleder Fabric"],
      color: "#b2f267",
      position: [5.7, 1.75],
    },
  ],
  pr = [
    {
      id: "php",
      title: "PHP",
      eyebrow: "Toolkit / Server-side development",
      description:
        "Server-side web development with PHP, working alongside JS in my 2021 Web Developer role.",
      tags: ["2021", "Web Developer"],
      color: "#22d8de",
      position: [-5.7, -2.15],
    },
    {
      id: "js",
      title: "JS",
      eyebrow: "Toolkit / Web interactions",
      description:
        "Browser interactions with JS, part of the foundation of my web development work in 2021.",
      tags: ["2021", "Web Developer"],
      color: "#20e2df",
      position: [-3.7, -2.15],
    },
    {
      id: "magento",
      title: "Magento",
      eyebrow: "Toolkit / E-commerce",
      description:
        "Frontend development for Magento storefronts, the focus of my Frontend Developer role in 2022.",
      tags: ["2022", "Frontend Developer"],
      color: "#20f0e9",
      position: [-1.25, -2.7],
    },
    {
      id: "angular",
      title: "Angular",
      eyebrow: "Toolkit / Interfaces",
      description:
        "Application interfaces with Angular, part of my Frontend Developer toolkit in 2023 alongside Node.",
      tags: ["2023", "Frontend Developer"],
      color: "#a0ed59",
      position: [1.9, -1.5],
    },
    {
      id: "node",
      title: "Node",
      eyebrow: "Toolkit / Backends",
      description:
        "Server-side JavaScript with Node, connecting backend services to my frontend work in 2023.",
      tags: ["2023", "Frontend Developer"],
      color: "#8be652",
      position: [1.9, -3.7],
    },
    {
      id: "nest",
      title: "Nest.js",
      eyebrow: "Toolkit / Node.js applications",
      description:
        "Backend applications with Nest.js, part of my Lead Node.js Developer toolkit in 2025.",
      tags: ["2025", "Lead Node.js Developer"],
      color: "#6ae7ab",
      position: [5.3, -0.7],
    },
    {
      id: "hyperleder-fabric",
      title: "Hyperleder Fabric",
      lines: ["Hyperleder", "Fabric"],
      eyebrow: "Toolkit / Blockchain",
      description:
        "Working with Hyperleder Fabric alongside Nest.js in my Lead Node.js Developer role in 2025.",
      tags: ["2025", "Lead Node.js Developer"],
      color: "#9bec5a",
      position: [5.3, -3],
    },
  ],
  ac = [...Ht, ...pr];
const io = "183",
  jc = 0,
  Ho = 1,
  Qc = 2,
  js = 1,
  oc = 2,
  $i = 3,
  In = 0,
  Ft = 1,
  gn = 2,
  an = 0,
  Si = 1,
  rr = 2,
  ko = 3,
  Wo = 4,
  eu = 5,
  Wn = 100,
  tu = 101,
  nu = 102,
  iu = 103,
  su = 104,
  ru = 200,
  au = 201,
  ou = 202,
  lu = 203,
  la = 204,
  ca = 205,
  cu = 206,
  uu = 207,
  hu = 208,
  fu = 209,
  du = 210,
  pu = 211,
  mu = 212,
  gu = 213,
  _u = 214,
  ua = 0,
  ha = 1,
  fa = 2,
  bi = 3,
  da = 4,
  pa = 5,
  ma = 6,
  ga = 7,
  lc = 0,
  vu = 1,
  xu = 2,
  jt = 0,
  so = 1,
  ro = 2,
  ao = 3,
  oo = 4,
  lo = 5,
  co = 6,
  uo = 7,
  cc = 300,
  Kn = 301,
  Ti = 302,
  Er = 303,
  br = 304,
  mr = 306,
  _a = 1e3,
  _n = 1001,
  va = 1002,
  Et = 1003,
  Mu = 1004,
  _s = 1005,
  Ct = 1006,
  Tr = 1007,
  Yn = 1008,
  Gt = 1009,
  uc = 1010,
  hc = 1011,
  ss = 1012,
  ho = 1013,
  on = 1014,
  $t = 1015,
  Ot = 1016,
  fo = 1017,
  po = 1018,
  rs = 1020,
  fc = 35902,
  dc = 35899,
  pc = 1021,
  mc = 1022,
  Kt = 1023,
  Mn = 1026,
  Jn = 1027,
  mo = 1028,
  go = 1029,
  Ai = 1030,
  _o = 1031,
  vo = 1033,
  Qs = 33776,
  er = 33777,
  tr = 33778,
  nr = 33779,
  xa = 35840,
  Ma = 35841,
  Sa = 35842,
  ya = 35843,
  Ea = 36196,
  ba = 37492,
  Ta = 37496,
  Aa = 37488,
  wa = 37489,
  Ca = 37490,
  Ra = 37491,
  Pa = 37808,
  La = 37809,
  Da = 37810,
  Ia = 37811,
  Ua = 37812,
  Na = 37813,
  Fa = 37814,
  Oa = 37815,
  Ba = 37816,
  za = 37817,
  Va = 37818,
  Ga = 37819,
  Ha = 37820,
  ka = 37821,
  Wa = 36492,
  Xa = 36494,
  qa = 36495,
  Ya = 36283,
  Ja = 36284,
  Za = 36285,
  $a = 36286,
  Su = 3200,
  gc = 0,
  yu = 1,
  Pn = "",
  Nt = "srgb",
  wi = "srgb-linear",
  ar = "linear",
  it = "srgb",
  ii = 7680,
  Xo = 519,
  Eu = 512,
  bu = 513,
  Tu = 514,
  xo = 515,
  Au = 516,
  wu = 517,
  Mo = 518,
  Cu = 519,
  qo = 35044,
  R0 = 35048,
  Yo = "300 es",
  rn = 2e3,
  as = 2001;
function Ru(i) {
  for (let e = i.length - 1; e >= 0; --e) if (i[e] >= 65535) return !0;
  return !1;
}
function or(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Pu() {
  const i = or("canvas");
  return ((i.style.display = "block"), i);
}
const Jo = {};
function Zo(...i) {
  const e = "THREE." + i.shift();
  console.log(e, ...i);
}
function _c(i) {
  const e = i[0];
  if (typeof e == "string" && e.startsWith("TSL:")) {
    const t = i[1];
    t && t.isStackTrace
      ? (i[0] += " " + t.getLocation())
      : (i[1] =
          'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.');
  }
  return i;
}
function Ve(...i) {
  i = _c(i);
  const e = "THREE." + i.shift();
  {
    const t = i[0];
    t && t.isStackTrace ? console.warn(t.getError(e)) : console.warn(e, ...i);
  }
}
function Qe(...i) {
  i = _c(i);
  const e = "THREE." + i.shift();
  {
    const t = i[0];
    t && t.isStackTrace ? console.error(t.getError(e)) : console.error(e, ...i);
  }
}
function lr(...i) {
  const e = i.join(" ");
  e in Jo || ((Jo[e] = !0), Ve(...i));
}
function Lu(i, e, t) {
  return new Promise(function (n, s) {
    function r() {
      switch (i.clientWaitSync(e, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          s();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(r, t);
          break;
        default:
          n();
      }
    }
    setTimeout(r, t);
  });
}
const Du = {
  [ua]: ha,
  [fa]: ma,
  [da]: ga,
  [bi]: pa,
  [ha]: ua,
  [ma]: fa,
  [ga]: da,
  [pa]: bi,
};
class Di {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    (n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t));
  }
  hasEventListener(e, t) {
    const n = this._listeners;
    return n === void 0 ? !1 : n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    const n = this._listeners;
    if (n === void 0) return;
    const s = n[e];
    if (s !== void 0) {
      const r = s.indexOf(t);
      r !== -1 && s.splice(r, 1);
    }
  }
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const n = t[e.type];
    if (n !== void 0) {
      e.target = this;
      const s = n.slice(0);
      for (let r = 0, a = s.length; r < a; r++) s[r].call(this, e);
      e.target = null;
    }
  }
}
const At = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "0a",
  "0b",
  "0c",
  "0d",
  "0e",
  "0f",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "1a",
  "1b",
  "1c",
  "1d",
  "1e",
  "1f",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "2a",
  "2b",
  "2c",
  "2d",
  "2e",
  "2f",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "3a",
  "3b",
  "3c",
  "3d",
  "3e",
  "3f",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "4a",
  "4b",
  "4c",
  "4d",
  "4e",
  "4f",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "5a",
  "5b",
  "5c",
  "5d",
  "5e",
  "5f",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "6a",
  "6b",
  "6c",
  "6d",
  "6e",
  "6f",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "7a",
  "7b",
  "7c",
  "7d",
  "7e",
  "7f",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "8a",
  "8b",
  "8c",
  "8d",
  "8e",
  "8f",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "9a",
  "9b",
  "9c",
  "9d",
  "9e",
  "9f",
  "a0",
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "aa",
  "ab",
  "ac",
  "ad",
  "ae",
  "af",
  "b0",
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "b8",
  "b9",
  "ba",
  "bb",
  "bc",
  "bd",
  "be",
  "bf",
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "ca",
  "cb",
  "cc",
  "cd",
  "ce",
  "cf",
  "d0",
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "da",
  "db",
  "dc",
  "dd",
  "de",
  "df",
  "e0",
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
  "e8",
  "e9",
  "ea",
  "eb",
  "ec",
  "ed",
  "ee",
  "ef",
  "f0",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "fa",
  "fb",
  "fc",
  "fd",
  "fe",
  "ff",
];
let $o = 1234567;
const yi = Math.PI / 180,
  os = 180 / Math.PI;
function Qn() {
  const i = (Math.random() * 4294967295) | 0,
    e = (Math.random() * 4294967295) | 0,
    t = (Math.random() * 4294967295) | 0,
    n = (Math.random() * 4294967295) | 0;
  return (
    At[i & 255] +
    At[(i >> 8) & 255] +
    At[(i >> 16) & 255] +
    At[(i >> 24) & 255] +
    "-" +
    At[e & 255] +
    At[(e >> 8) & 255] +
    "-" +
    At[((e >> 16) & 15) | 64] +
    At[(e >> 24) & 255] +
    "-" +
    At[(t & 63) | 128] +
    At[(t >> 8) & 255] +
    "-" +
    At[(t >> 16) & 255] +
    At[(t >> 24) & 255] +
    At[n & 255] +
    At[(n >> 8) & 255] +
    At[(n >> 16) & 255] +
    At[(n >> 24) & 255]
  ).toLowerCase();
}
function Ye(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function So(i, e) {
  return ((i % e) + e) % e;
}
function Iu(i, e, t, n, s) {
  return n + ((i - e) * (s - n)) / (t - e);
}
function Uu(i, e, t) {
  return i !== e ? (t - i) / (e - i) : 0;
}
function Qi(i, e, t) {
  return (1 - t) * i + t * e;
}
function Nu(i, e, t, n) {
  return Qi(i, e, 1 - Math.exp(-t * n));
}
function Fu(i, e = 1) {
  return e - Math.abs(So(i, e * 2) - e);
}
function Ou(i, e, t) {
  return i <= e
    ? 0
    : i >= t
      ? 1
      : ((i = (i - e) / (t - e)), i * i * (3 - 2 * i));
}
function Bu(i, e, t) {
  return i <= e
    ? 0
    : i >= t
      ? 1
      : ((i = (i - e) / (t - e)), i * i * i * (i * (i * 6 - 15) + 10));
}
function zu(i, e) {
  return i + Math.floor(Math.random() * (e - i + 1));
}
function Vu(i, e) {
  return i + Math.random() * (e - i);
}
function Gu(i) {
  return i * (0.5 - Math.random());
}
function Hu(i) {
  i !== void 0 && ($o = i);
  let e = ($o += 1831565813);
  return (
    (e = Math.imul(e ^ (e >>> 15), e | 1)),
    (e ^= e + Math.imul(e ^ (e >>> 7), e | 61)),
    ((e ^ (e >>> 14)) >>> 0) / 4294967296
  );
}
function ku(i) {
  return i * yi;
}
function Wu(i) {
  return i * os;
}
function Xu(i) {
  return (i & (i - 1)) === 0 && i !== 0;
}
function qu(i) {
  return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2));
}
function Yu(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function Ju(i, e, t, n, s) {
  const r = Math.cos,
    a = Math.sin,
    o = r(t / 2),
    c = a(t / 2),
    l = r((e + n) / 2),
    u = a((e + n) / 2),
    f = r((e - n) / 2),
    h = a((e - n) / 2),
    d = r((n - e) / 2),
    g = a((n - e) / 2);
  switch (s) {
    case "XYX":
      i.set(o * u, c * f, c * h, o * l);
      break;
    case "YZY":
      i.set(c * h, o * u, c * f, o * l);
      break;
    case "ZXZ":
      i.set(c * f, c * h, o * u, o * l);
      break;
    case "XZX":
      i.set(o * u, c * g, c * d, o * l);
      break;
    case "YXY":
      i.set(c * d, o * u, c * g, o * l);
      break;
    case "ZYZ":
      i.set(c * g, c * d, o * u, o * l);
      break;
    default:
      Ve(
        "MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " +
          s,
      );
  }
}
function xi(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Lt(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const un = {
  DEG2RAD: yi,
  RAD2DEG: os,
  generateUUID: Qn,
  clamp: Ye,
  euclideanModulo: So,
  mapLinear: Iu,
  inverseLerp: Uu,
  lerp: Qi,
  damp: Nu,
  pingpong: Fu,
  smoothstep: Ou,
  smootherstep: Bu,
  randInt: zu,
  randFloat: Vu,
  randFloatSpread: Gu,
  seededRandom: Hu,
  degToRad: ku,
  radToDeg: Wu,
  isPowerOfTwo: Xu,
  ceilPowerOfTwo: qu,
  floorPowerOfTwo: Yu,
  setQuaternionFromProperEuler: Ju,
  normalize: Lt,
  denormalize: xi,
};
class ue {
  constructor(e = 0, t = 0) {
    ((ue.prototype.isVector2 = !0), (this.x = e), (this.y = t));
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return ((this.x = e), (this.y = t), this);
  }
  setScalar(e) {
    return ((this.x = e), (this.y = e), this);
  }
  setX(e) {
    return ((this.x = e), this);
  }
  setY(e) {
    return ((this.y = e), this);
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return ((this.x = e.x), (this.y = e.y), this);
  }
  add(e) {
    return ((this.x += e.x), (this.y += e.y), this);
  }
  addScalar(e) {
    return ((this.x += e), (this.y += e), this);
  }
  addVectors(e, t) {
    return ((this.x = e.x + t.x), (this.y = e.y + t.y), this);
  }
  addScaledVector(e, t) {
    return ((this.x += e.x * t), (this.y += e.y * t), this);
  }
  sub(e) {
    return ((this.x -= e.x), (this.y -= e.y), this);
  }
  subScalar(e) {
    return ((this.x -= e), (this.y -= e), this);
  }
  subVectors(e, t) {
    return ((this.x = e.x - t.x), (this.y = e.y - t.y), this);
  }
  multiply(e) {
    return ((this.x *= e.x), (this.y *= e.y), this);
  }
  multiplyScalar(e) {
    return ((this.x *= e), (this.y *= e), this);
  }
  divide(e) {
    return ((this.x /= e.x), (this.y /= e.y), this);
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x,
      n = this.y,
      s = e.elements;
    return (
      (this.x = s[0] * t + s[3] * n + s[6]),
      (this.y = s[1] * t + s[4] * n + s[7]),
      this
    );
  }
  min(e) {
    return (
      (this.x = Math.min(this.x, e.x)),
      (this.y = Math.min(this.y, e.y)),
      this
    );
  }
  max(e) {
    return (
      (this.x = Math.max(this.x, e.x)),
      (this.y = Math.max(this.y, e.y)),
      this
    );
  }
  clamp(e, t) {
    return (
      (this.x = Ye(this.x, e.x, t.x)),
      (this.y = Ye(this.y, e.y, t.y)),
      this
    );
  }
  clampScalar(e, t) {
    return ((this.x = Ye(this.x, e, t)), (this.y = Ye(this.y, e, t)), this);
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Ye(n, e, t));
  }
  floor() {
    return ((this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this);
  }
  ceil() {
    return ((this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this);
  }
  round() {
    return ((this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this);
  }
  roundToZero() {
    return ((this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), this);
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), this);
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Ye(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x,
      n = this.y - e.y;
    return t * t + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return (
      (this.x += (e.x - this.x) * t),
      (this.y += (e.y - this.y) * t),
      this
    );
  }
  lerpVectors(e, t, n) {
    return (
      (this.x = e.x + (t.x - e.x) * n),
      (this.y = e.y + (t.y - e.y) * n),
      this
    );
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return ((this.x = e[t]), (this.y = e[t + 1]), this);
  }
  toArray(e = [], t = 0) {
    return ((e[t] = this.x), (e[t + 1] = this.y), e);
  }
  fromBufferAttribute(e, t) {
    return ((this.x = e.getX(t)), (this.y = e.getY(t)), this);
  }
  rotateAround(e, t) {
    const n = Math.cos(t),
      s = Math.sin(t),
      r = this.x - e.x,
      a = this.y - e.y;
    return (
      (this.x = r * n - a * s + e.x),
      (this.y = r * s + a * n + e.y),
      this
    );
  }
  random() {
    return ((this.x = Math.random()), (this.y = Math.random()), this);
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y);
  }
}
class Ii {
  constructor(e = 0, t = 0, n = 0, s = 1) {
    ((this.isQuaternion = !0),
      (this._x = e),
      (this._y = t),
      (this._z = n),
      (this._w = s));
  }
  static slerpFlat(e, t, n, s, r, a, o) {
    let c = n[s + 0],
      l = n[s + 1],
      u = n[s + 2],
      f = n[s + 3],
      h = r[a + 0],
      d = r[a + 1],
      g = r[a + 2],
      x = r[a + 3];
    if (f !== x || c !== h || l !== d || u !== g) {
      let m = c * h + l * d + u * g + f * x;
      m < 0 && ((h = -h), (d = -d), (g = -g), (x = -x), (m = -m));
      let p = 1 - o;
      if (m < 0.9995) {
        const S = Math.acos(m),
          E = Math.sin(S);
        ((p = Math.sin(p * S) / E),
          (o = Math.sin(o * S) / E),
          (c = c * p + h * o),
          (l = l * p + d * o),
          (u = u * p + g * o),
          (f = f * p + x * o));
      } else {
        ((c = c * p + h * o),
          (l = l * p + d * o),
          (u = u * p + g * o),
          (f = f * p + x * o));
        const S = 1 / Math.sqrt(c * c + l * l + u * u + f * f);
        ((c *= S), (l *= S), (u *= S), (f *= S));
      }
    }
    ((e[t] = c), (e[t + 1] = l), (e[t + 2] = u), (e[t + 3] = f));
  }
  static multiplyQuaternionsFlat(e, t, n, s, r, a) {
    const o = n[s],
      c = n[s + 1],
      l = n[s + 2],
      u = n[s + 3],
      f = r[a],
      h = r[a + 1],
      d = r[a + 2],
      g = r[a + 3];
    return (
      (e[t] = o * g + u * f + c * d - l * h),
      (e[t + 1] = c * g + u * h + l * f - o * d),
      (e[t + 2] = l * g + u * d + o * h - c * f),
      (e[t + 3] = u * g - o * f - c * h - l * d),
      e
    );
  }
  get x() {
    return this._x;
  }
  set x(e) {
    ((this._x = e), this._onChangeCallback());
  }
  get y() {
    return this._y;
  }
  set y(e) {
    ((this._y = e), this._onChangeCallback());
  }
  get z() {
    return this._z;
  }
  set z(e) {
    ((this._z = e), this._onChangeCallback());
  }
  get w() {
    return this._w;
  }
  set w(e) {
    ((this._w = e), this._onChangeCallback());
  }
  set(e, t, n, s) {
    return (
      (this._x = e),
      (this._y = t),
      (this._z = n),
      (this._w = s),
      this._onChangeCallback(),
      this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return (
      (this._x = e.x),
      (this._y = e.y),
      (this._z = e.z),
      (this._w = e.w),
      this._onChangeCallback(),
      this
    );
  }
  setFromEuler(e, t = !0) {
    const n = e._x,
      s = e._y,
      r = e._z,
      a = e._order,
      o = Math.cos,
      c = Math.sin,
      l = o(n / 2),
      u = o(s / 2),
      f = o(r / 2),
      h = c(n / 2),
      d = c(s / 2),
      g = c(r / 2);
    switch (a) {
      case "XYZ":
        ((this._x = h * u * f + l * d * g),
          (this._y = l * d * f - h * u * g),
          (this._z = l * u * g + h * d * f),
          (this._w = l * u * f - h * d * g));
        break;
      case "YXZ":
        ((this._x = h * u * f + l * d * g),
          (this._y = l * d * f - h * u * g),
          (this._z = l * u * g - h * d * f),
          (this._w = l * u * f + h * d * g));
        break;
      case "ZXY":
        ((this._x = h * u * f - l * d * g),
          (this._y = l * d * f + h * u * g),
          (this._z = l * u * g + h * d * f),
          (this._w = l * u * f - h * d * g));
        break;
      case "ZYX":
        ((this._x = h * u * f - l * d * g),
          (this._y = l * d * f + h * u * g),
          (this._z = l * u * g - h * d * f),
          (this._w = l * u * f + h * d * g));
        break;
      case "YZX":
        ((this._x = h * u * f + l * d * g),
          (this._y = l * d * f + h * u * g),
          (this._z = l * u * g - h * d * f),
          (this._w = l * u * f - h * d * g));
        break;
      case "XZY":
        ((this._x = h * u * f - l * d * g),
          (this._y = l * d * f - h * u * g),
          (this._z = l * u * g + h * d * f),
          (this._w = l * u * f + h * d * g));
        break;
      default:
        Ve("Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return (t === !0 && this._onChangeCallback(), this);
  }
  setFromAxisAngle(e, t) {
    const n = t / 2,
      s = Math.sin(n);
    return (
      (this._x = e.x * s),
      (this._y = e.y * s),
      (this._z = e.z * s),
      (this._w = Math.cos(n)),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(e) {
    const t = e.elements,
      n = t[0],
      s = t[4],
      r = t[8],
      a = t[1],
      o = t[5],
      c = t[9],
      l = t[2],
      u = t[6],
      f = t[10],
      h = n + o + f;
    if (h > 0) {
      const d = 0.5 / Math.sqrt(h + 1);
      ((this._w = 0.25 / d),
        (this._x = (u - c) * d),
        (this._y = (r - l) * d),
        (this._z = (a - s) * d));
    } else if (n > o && n > f) {
      const d = 2 * Math.sqrt(1 + n - o - f);
      ((this._w = (u - c) / d),
        (this._x = 0.25 * d),
        (this._y = (s + a) / d),
        (this._z = (r + l) / d));
    } else if (o > f) {
      const d = 2 * Math.sqrt(1 + o - n - f);
      ((this._w = (r - l) / d),
        (this._x = (s + a) / d),
        (this._y = 0.25 * d),
        (this._z = (c + u) / d));
    } else {
      const d = 2 * Math.sqrt(1 + f - n - o);
      ((this._w = (a - s) / d),
        (this._x = (r + l) / d),
        (this._y = (c + u) / d),
        (this._z = 0.25 * d));
    }
    return (this._onChangeCallback(), this);
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return (
      n < 1e-8
        ? ((n = 0),
          Math.abs(e.x) > Math.abs(e.z)
            ? ((this._x = -e.y), (this._y = e.x), (this._z = 0), (this._w = n))
            : ((this._x = 0), (this._y = -e.z), (this._z = e.y), (this._w = n)))
        : ((this._x = e.y * t.z - e.z * t.y),
          (this._y = e.z * t.x - e.x * t.z),
          (this._z = e.x * t.y - e.y * t.x),
          (this._w = n)),
      this.normalize()
    );
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Ye(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const s = Math.min(1, t / n);
    return (this.slerp(e, s), this);
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return (
      (this._x *= -1),
      (this._y *= -1),
      (this._z *= -1),
      this._onChangeCallback(),
      this
    );
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return (
      this._x * this._x +
      this._y * this._y +
      this._z * this._z +
      this._w * this._w
    );
  }
  length() {
    return Math.sqrt(
      this._x * this._x +
        this._y * this._y +
        this._z * this._z +
        this._w * this._w,
    );
  }
  normalize() {
    let e = this.length();
    return (
      e === 0
        ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
        : ((e = 1 / e),
          (this._x = this._x * e),
          (this._y = this._y * e),
          (this._z = this._z * e),
          (this._w = this._w * e)),
      this._onChangeCallback(),
      this
    );
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const n = e._x,
      s = e._y,
      r = e._z,
      a = e._w,
      o = t._x,
      c = t._y,
      l = t._z,
      u = t._w;
    return (
      (this._x = n * u + a * o + s * l - r * c),
      (this._y = s * u + a * c + r * o - n * l),
      (this._z = r * u + a * l + n * c - s * o),
      (this._w = a * u - n * o - s * c - r * l),
      this._onChangeCallback(),
      this
    );
  }
  slerp(e, t) {
    let n = e._x,
      s = e._y,
      r = e._z,
      a = e._w,
      o = this.dot(e);
    o < 0 && ((n = -n), (s = -s), (r = -r), (a = -a), (o = -o));
    let c = 1 - t;
    if (o < 0.9995) {
      const l = Math.acos(o),
        u = Math.sin(l);
      ((c = Math.sin(c * l) / u),
        (t = Math.sin(t * l) / u),
        (this._x = this._x * c + n * t),
        (this._y = this._y * c + s * t),
        (this._z = this._z * c + r * t),
        (this._w = this._w * c + a * t),
        this._onChangeCallback());
    } else
      ((this._x = this._x * c + n * t),
        (this._y = this._y * c + s * t),
        (this._z = this._z * c + r * t),
        (this._w = this._w * c + a * t),
        this.normalize());
    return this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = 2 * Math.PI * Math.random(),
      t = 2 * Math.PI * Math.random(),
      n = Math.random(),
      s = Math.sqrt(1 - n),
      r = Math.sqrt(n);
    return this.set(
      s * Math.sin(e),
      s * Math.cos(e),
      r * Math.sin(t),
      r * Math.cos(t),
    );
  }
  equals(e) {
    return (
      e._x === this._x &&
      e._y === this._y &&
      e._z === this._z &&
      e._w === this._w
    );
  }
  fromArray(e, t = 0) {
    return (
      (this._x = e[t]),
      (this._y = e[t + 1]),
      (this._z = e[t + 2]),
      (this._w = e[t + 3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(e = [], t = 0) {
    return (
      (e[t] = this._x),
      (e[t + 1] = this._y),
      (e[t + 2] = this._z),
      (e[t + 3] = this._w),
      e
    );
  }
  fromBufferAttribute(e, t) {
    return (
      (this._x = e.getX(t)),
      (this._y = e.getY(t)),
      (this._z = e.getZ(t)),
      (this._w = e.getW(t)),
      this._onChangeCallback(),
      this
    );
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return ((this._onChangeCallback = e), this);
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    (yield this._x, yield this._y, yield this._z, yield this._w);
  }
}
class D {
  constructor(e = 0, t = 0, n = 0) {
    ((D.prototype.isVector3 = !0), (this.x = e), (this.y = t), (this.z = n));
  }
  set(e, t, n) {
    return (
      n === void 0 && (n = this.z),
      (this.x = e),
      (this.y = t),
      (this.z = n),
      this
    );
  }
  setScalar(e) {
    return ((this.x = e), (this.y = e), (this.z = e), this);
  }
  setX(e) {
    return ((this.x = e), this);
  }
  setY(e) {
    return ((this.y = e), this);
  }
  setZ(e) {
    return ((this.z = e), this);
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return ((this.x = e.x), (this.y = e.y), (this.z = e.z), this);
  }
  add(e) {
    return ((this.x += e.x), (this.y += e.y), (this.z += e.z), this);
  }
  addScalar(e) {
    return ((this.x += e), (this.y += e), (this.z += e), this);
  }
  addVectors(e, t) {
    return (
      (this.x = e.x + t.x),
      (this.y = e.y + t.y),
      (this.z = e.z + t.z),
      this
    );
  }
  addScaledVector(e, t) {
    return (
      (this.x += e.x * t),
      (this.y += e.y * t),
      (this.z += e.z * t),
      this
    );
  }
  sub(e) {
    return ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), this);
  }
  subScalar(e) {
    return ((this.x -= e), (this.y -= e), (this.z -= e), this);
  }
  subVectors(e, t) {
    return (
      (this.x = e.x - t.x),
      (this.y = e.y - t.y),
      (this.z = e.z - t.z),
      this
    );
  }
  multiply(e) {
    return ((this.x *= e.x), (this.y *= e.y), (this.z *= e.z), this);
  }
  multiplyScalar(e) {
    return ((this.x *= e), (this.y *= e), (this.z *= e), this);
  }
  multiplyVectors(e, t) {
    return (
      (this.x = e.x * t.x),
      (this.y = e.y * t.y),
      (this.z = e.z * t.z),
      this
    );
  }
  applyEuler(e) {
    return this.applyQuaternion(Ko.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(Ko.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x,
      n = this.y,
      s = this.z,
      r = e.elements;
    return (
      (this.x = r[0] * t + r[3] * n + r[6] * s),
      (this.y = r[1] * t + r[4] * n + r[7] * s),
      (this.z = r[2] * t + r[5] * n + r[8] * s),
      this
    );
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x,
      n = this.y,
      s = this.z,
      r = e.elements,
      a = 1 / (r[3] * t + r[7] * n + r[11] * s + r[15]);
    return (
      (this.x = (r[0] * t + r[4] * n + r[8] * s + r[12]) * a),
      (this.y = (r[1] * t + r[5] * n + r[9] * s + r[13]) * a),
      (this.z = (r[2] * t + r[6] * n + r[10] * s + r[14]) * a),
      this
    );
  }
  applyQuaternion(e) {
    const t = this.x,
      n = this.y,
      s = this.z,
      r = e.x,
      a = e.y,
      o = e.z,
      c = e.w,
      l = 2 * (a * s - o * n),
      u = 2 * (o * t - r * s),
      f = 2 * (r * n - a * t);
    return (
      (this.x = t + c * l + a * f - o * u),
      (this.y = n + c * u + o * l - r * f),
      (this.z = s + c * f + r * u - a * l),
      this
    );
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(
      e.projectionMatrix,
    );
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(
      e.matrixWorld,
    );
  }
  transformDirection(e) {
    const t = this.x,
      n = this.y,
      s = this.z,
      r = e.elements;
    return (
      (this.x = r[0] * t + r[4] * n + r[8] * s),
      (this.y = r[1] * t + r[5] * n + r[9] * s),
      (this.z = r[2] * t + r[6] * n + r[10] * s),
      this.normalize()
    );
  }
  divide(e) {
    return ((this.x /= e.x), (this.y /= e.y), (this.z /= e.z), this);
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return (
      (this.x = Math.min(this.x, e.x)),
      (this.y = Math.min(this.y, e.y)),
      (this.z = Math.min(this.z, e.z)),
      this
    );
  }
  max(e) {
    return (
      (this.x = Math.max(this.x, e.x)),
      (this.y = Math.max(this.y, e.y)),
      (this.z = Math.max(this.z, e.z)),
      this
    );
  }
  clamp(e, t) {
    return (
      (this.x = Ye(this.x, e.x, t.x)),
      (this.y = Ye(this.y, e.y, t.y)),
      (this.z = Ye(this.z, e.z, t.z)),
      this
    );
  }
  clampScalar(e, t) {
    return (
      (this.x = Ye(this.x, e, t)),
      (this.y = Ye(this.y, e, t)),
      (this.z = Ye(this.z, e, t)),
      this
    );
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Ye(n, e, t));
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      this
    );
  }
  negate() {
    return ((this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this);
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return (
      (this.x += (e.x - this.x) * t),
      (this.y += (e.y - this.y) * t),
      (this.z += (e.z - this.z) * t),
      this
    );
  }
  lerpVectors(e, t, n) {
    return (
      (this.x = e.x + (t.x - e.x) * n),
      (this.y = e.y + (t.y - e.y) * n),
      (this.z = e.z + (t.z - e.z) * n),
      this
    );
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const n = e.x,
      s = e.y,
      r = e.z,
      a = t.x,
      o = t.y,
      c = t.z;
    return (
      (this.x = s * c - r * o),
      (this.y = r * a - n * c),
      (this.z = n * o - s * a),
      this
    );
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  projectOnPlane(e) {
    return (Ar.copy(this).projectOnVector(e), this.sub(Ar));
  }
  reflect(e) {
    return this.sub(Ar.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Ye(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x,
      n = this.y - e.y,
      s = this.z - e.z;
    return t * t + n * n + s * s;
  }
  manhattanDistanceTo(e) {
    return (
      Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z)
    );
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, n) {
    const s = Math.sin(t) * e;
    return (
      (this.x = s * Math.sin(n)),
      (this.y = Math.cos(t) * e),
      (this.z = s * Math.cos(n)),
      this
    );
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, n) {
    return (
      (this.x = e * Math.sin(t)),
      (this.y = n),
      (this.z = e * Math.cos(t)),
      this
    );
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return ((this.x = t[12]), (this.y = t[13]), (this.z = t[14]), this);
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(),
      n = this.setFromMatrixColumn(e, 1).length(),
      s = this.setFromMatrixColumn(e, 2).length();
    return ((this.x = t), (this.y = n), (this.z = s), this);
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return ((this.x = e._x), (this.y = e._y), (this.z = e._z), this);
  }
  setFromColor(e) {
    return ((this.x = e.r), (this.y = e.g), (this.z = e.b), this);
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return ((this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), this);
  }
  toArray(e = [], t = 0) {
    return ((e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), e);
  }
  fromBufferAttribute(e, t) {
    return (
      (this.x = e.getX(t)),
      (this.y = e.getY(t)),
      (this.z = e.getZ(t)),
      this
    );
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      this
    );
  }
  randomDirection() {
    const e = Math.random() * Math.PI * 2,
      t = Math.random() * 2 - 1,
      n = Math.sqrt(1 - t * t);
    return (
      (this.x = n * Math.cos(e)),
      (this.y = t),
      (this.z = n * Math.sin(e)),
      this
    );
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y, yield this.z);
  }
}
const Ar = new D(),
  Ko = new Ii();
class We {
  constructor(e, t, n, s, r, a, o, c, l) {
    ((We.prototype.isMatrix3 = !0),
      (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
      e !== void 0 && this.set(e, t, n, s, r, a, o, c, l));
  }
  set(e, t, n, s, r, a, o, c, l) {
    const u = this.elements;
    return (
      (u[0] = e),
      (u[1] = s),
      (u[2] = o),
      (u[3] = t),
      (u[4] = r),
      (u[5] = c),
      (u[6] = n),
      (u[7] = a),
      (u[8] = l),
      this
    );
  }
  identity() {
    return (this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this);
  }
  copy(e) {
    const t = this.elements,
      n = e.elements;
    return (
      (t[0] = n[0]),
      (t[1] = n[1]),
      (t[2] = n[2]),
      (t[3] = n[3]),
      (t[4] = n[4]),
      (t[5] = n[5]),
      (t[6] = n[6]),
      (t[7] = n[7]),
      (t[8] = n[8]),
      this
    );
  }
  extractBasis(e, t, n) {
    return (
      e.setFromMatrix3Column(this, 0),
      t.setFromMatrix3Column(this, 1),
      n.setFromMatrix3Column(this, 2),
      this
    );
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return (
      this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]),
      this
    );
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements,
      s = t.elements,
      r = this.elements,
      a = n[0],
      o = n[3],
      c = n[6],
      l = n[1],
      u = n[4],
      f = n[7],
      h = n[2],
      d = n[5],
      g = n[8],
      x = s[0],
      m = s[3],
      p = s[6],
      S = s[1],
      E = s[4],
      y = s[7],
      R = s[2],
      w = s[5],
      P = s[8];
    return (
      (r[0] = a * x + o * S + c * R),
      (r[3] = a * m + o * E + c * w),
      (r[6] = a * p + o * y + c * P),
      (r[1] = l * x + u * S + f * R),
      (r[4] = l * m + u * E + f * w),
      (r[7] = l * p + u * y + f * P),
      (r[2] = h * x + d * S + g * R),
      (r[5] = h * m + d * E + g * w),
      (r[8] = h * p + d * y + g * P),
      this
    );
  }
  multiplyScalar(e) {
    const t = this.elements;
    return (
      (t[0] *= e),
      (t[3] *= e),
      (t[6] *= e),
      (t[1] *= e),
      (t[4] *= e),
      (t[7] *= e),
      (t[2] *= e),
      (t[5] *= e),
      (t[8] *= e),
      this
    );
  }
  determinant() {
    const e = this.elements,
      t = e[0],
      n = e[1],
      s = e[2],
      r = e[3],
      a = e[4],
      o = e[5],
      c = e[6],
      l = e[7],
      u = e[8];
    return (
      t * a * u - t * o * l - n * r * u + n * o * c + s * r * l - s * a * c
    );
  }
  invert() {
    const e = this.elements,
      t = e[0],
      n = e[1],
      s = e[2],
      r = e[3],
      a = e[4],
      o = e[5],
      c = e[6],
      l = e[7],
      u = e[8],
      f = u * a - o * l,
      h = o * c - u * r,
      d = l * r - a * c,
      g = t * f + n * h + s * d;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const x = 1 / g;
    return (
      (e[0] = f * x),
      (e[1] = (s * l - u * n) * x),
      (e[2] = (o * n - s * a) * x),
      (e[3] = h * x),
      (e[4] = (u * t - s * c) * x),
      (e[5] = (s * r - o * t) * x),
      (e[6] = d * x),
      (e[7] = (n * c - l * t) * x),
      (e[8] = (a * t - n * r) * x),
      this
    );
  }
  transpose() {
    let e;
    const t = this.elements;
    return (
      (e = t[1]),
      (t[1] = t[3]),
      (t[3] = e),
      (e = t[2]),
      (t[2] = t[6]),
      (t[6] = e),
      (e = t[5]),
      (t[5] = t[7]),
      (t[7] = e),
      this
    );
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return (
      (e[0] = t[0]),
      (e[1] = t[3]),
      (e[2] = t[6]),
      (e[3] = t[1]),
      (e[4] = t[4]),
      (e[5] = t[7]),
      (e[6] = t[2]),
      (e[7] = t[5]),
      (e[8] = t[8]),
      this
    );
  }
  setUvTransform(e, t, n, s, r, a, o) {
    const c = Math.cos(r),
      l = Math.sin(r);
    return (
      this.set(
        n * c,
        n * l,
        -n * (c * a + l * o) + a + e,
        -s * l,
        s * c,
        -s * (-l * a + c * o) + o + t,
        0,
        0,
        1,
      ),
      this
    );
  }
  scale(e, t) {
    return (this.premultiply(wr.makeScale(e, t)), this);
  }
  rotate(e) {
    return (this.premultiply(wr.makeRotation(-e)), this);
  }
  translate(e, t) {
    return (this.premultiply(wr.makeTranslation(e, t)), this);
  }
  makeTranslation(e, t) {
    return (
      e.isVector2
        ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1)
        : this.set(1, 0, e, 0, 1, t, 0, 0, 1),
      this
    );
  }
  makeRotation(e) {
    const t = Math.cos(e),
      n = Math.sin(e);
    return (this.set(t, -n, 0, n, t, 0, 0, 0, 1), this);
  }
  makeScale(e, t) {
    return (this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this);
  }
  equals(e) {
    const t = this.elements,
      n = e.elements;
    for (let s = 0; s < 9; s++) if (t[s] !== n[s]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return (
      (e[t] = n[0]),
      (e[t + 1] = n[1]),
      (e[t + 2] = n[2]),
      (e[t + 3] = n[3]),
      (e[t + 4] = n[4]),
      (e[t + 5] = n[5]),
      (e[t + 6] = n[6]),
      (e[t + 7] = n[7]),
      (e[t + 8] = n[8]),
      e
    );
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const wr = new We(),
  jo = new We().set(
    0.4123908,
    0.3575843,
    0.1804808,
    0.212639,
    0.7151687,
    0.0721923,
    0.0193308,
    0.1191948,
    0.9505322,
  ),
  Qo = new We().set(
    3.2409699,
    -1.5373832,
    -0.4986108,
    -0.9692436,
    1.8759675,
    0.0415551,
    0.0556301,
    -0.203977,
    1.0569715,
  );
function Zu() {
  const i = {
      enabled: !0,
      workingColorSpace: wi,
      spaces: {},
      convert: function (s, r, a) {
        return (
          this.enabled === !1 ||
            r === a ||
            !r ||
            !a ||
            (this.spaces[r].transfer === it &&
              ((s.r = xn(s.r)), (s.g = xn(s.g)), (s.b = xn(s.b))),
            this.spaces[r].primaries !== this.spaces[a].primaries &&
              (s.applyMatrix3(this.spaces[r].toXYZ),
              s.applyMatrix3(this.spaces[a].fromXYZ)),
            this.spaces[a].transfer === it &&
              ((s.r = Ei(s.r)), (s.g = Ei(s.g)), (s.b = Ei(s.b)))),
          s
        );
      },
      workingToColorSpace: function (s, r) {
        return this.convert(s, this.workingColorSpace, r);
      },
      colorSpaceToWorking: function (s, r) {
        return this.convert(s, r, this.workingColorSpace);
      },
      getPrimaries: function (s) {
        return this.spaces[s].primaries;
      },
      getTransfer: function (s) {
        return s === Pn ? ar : this.spaces[s].transfer;
      },
      getToneMappingMode: function (s) {
        return (
          this.spaces[s].outputColorSpaceConfig.toneMappingMode || "standard"
        );
      },
      getLuminanceCoefficients: function (s, r = this.workingColorSpace) {
        return s.fromArray(this.spaces[r].luminanceCoefficients);
      },
      define: function (s) {
        Object.assign(this.spaces, s);
      },
      _getMatrix: function (s, r, a) {
        return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ);
      },
      _getDrawingBufferColorSpace: function (s) {
        return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function (s = this.workingColorSpace) {
        return this.spaces[s].workingColorSpaceConfig.unpackColorSpace;
      },
      fromWorkingColorSpace: function (s, r) {
        return (
          lr(
            "ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().",
          ),
          i.workingToColorSpace(s, r)
        );
      },
      toWorkingColorSpace: function (s, r) {
        return (
          lr(
            "ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().",
          ),
          i.colorSpaceToWorking(s, r)
        );
      },
    },
    e = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06],
    t = [0.2126, 0.7152, 0.0722],
    n = [0.3127, 0.329];
  return (
    i.define({
      [wi]: {
        primaries: e,
        whitePoint: n,
        transfer: ar,
        toXYZ: jo,
        fromXYZ: Qo,
        luminanceCoefficients: t,
        workingColorSpaceConfig: { unpackColorSpace: Nt },
        outputColorSpaceConfig: { drawingBufferColorSpace: Nt },
      },
      [Nt]: {
        primaries: e,
        whitePoint: n,
        transfer: it,
        toXYZ: jo,
        fromXYZ: Qo,
        luminanceCoefficients: t,
        outputColorSpaceConfig: { drawingBufferColorSpace: Nt },
      },
    }),
    i
  );
}
const et = Zu();
function xn(i) {
  return i < 0.04045
    ? i * 0.0773993808
    : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function Ei(i) {
  return i < 0.0031308 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let si;
class $u {
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
    let n;
    if (e instanceof HTMLCanvasElement) n = e;
    else {
      (si === void 0 && (si = or("canvas")),
        (si.width = e.width),
        (si.height = e.height));
      const s = si.getContext("2d");
      (e instanceof ImageData
        ? s.putImageData(e, 0, 0)
        : s.drawImage(e, 0, 0, e.width, e.height),
        (n = si));
    }
    return n.toDataURL(t);
  }
  static sRGBToLinear(e) {
    if (
      (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement) ||
      (typeof ImageBitmap < "u" && e instanceof ImageBitmap)
    ) {
      const t = or("canvas");
      ((t.width = e.width), (t.height = e.height));
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const s = n.getImageData(0, 0, e.width, e.height),
        r = s.data;
      for (let a = 0; a < r.length; a++) r[a] = xn(r[a] / 255) * 255;
      return (n.putImageData(s, 0, 0), t);
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray
          ? (t[n] = Math.floor(xn(t[n] / 255) * 255))
          : (t[n] = xn(t[n]));
      return { data: t, width: e.width, height: e.height };
    } else
      return (
        Ve(
          "ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.",
        ),
        e
      );
  }
}
let Ku = 0;
class yo {
  constructor(e = null) {
    ((this.isSource = !0),
      Object.defineProperty(this, "id", { value: Ku++ }),
      (this.uuid = Qn()),
      (this.data = e),
      (this.dataReady = !0),
      (this.version = 0));
  }
  getSize(e) {
    const t = this.data;
    return (
      typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement
        ? e.set(t.videoWidth, t.videoHeight, 0)
        : typeof VideoFrame < "u" && t instanceof VideoFrame
          ? e.set(t.displayHeight, t.displayWidth, 0)
          : t !== null
            ? e.set(t.width, t.height, t.depth || 0)
            : e.set(0, 0, 0),
      e
    );
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
    const n = { uuid: this.uuid, url: "" },
      s = this.data;
    if (s !== null) {
      let r;
      if (Array.isArray(s)) {
        r = [];
        for (let a = 0, o = s.length; a < o; a++)
          s[a].isDataTexture ? r.push(Cr(s[a].image)) : r.push(Cr(s[a]));
      } else r = Cr(s);
      n.url = r;
    }
    return (t || (e.images[this.uuid] = n), n);
  }
}
function Cr(i) {
  return (typeof HTMLImageElement < "u" && i instanceof HTMLImageElement) ||
    (typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement) ||
    (typeof ImageBitmap < "u" && i instanceof ImageBitmap)
    ? $u.getDataURL(i)
    : i.data
      ? {
          data: Array.from(i.data),
          width: i.width,
          height: i.height,
          type: i.data.constructor.name,
        }
      : (Ve("Texture: Unable to serialize Texture."), {});
}
let ju = 0;
const Rr = new D();
class bt extends Di {
  constructor(
    e = bt.DEFAULT_IMAGE,
    t = bt.DEFAULT_MAPPING,
    n = _n,
    s = _n,
    r = Ct,
    a = Yn,
    o = Kt,
    c = Gt,
    l = bt.DEFAULT_ANISOTROPY,
    u = Pn,
  ) {
    (super(),
      (this.isTexture = !0),
      Object.defineProperty(this, "id", { value: ju++ }),
      (this.uuid = Qn()),
      (this.name = ""),
      (this.source = new yo(e)),
      (this.mipmaps = []),
      (this.mapping = t),
      (this.channel = 0),
      (this.wrapS = n),
      (this.wrapT = s),
      (this.magFilter = r),
      (this.minFilter = a),
      (this.anisotropy = l),
      (this.format = o),
      (this.internalFormat = null),
      (this.type = c),
      (this.offset = new ue(0, 0)),
      (this.repeat = new ue(1, 1)),
      (this.center = new ue(0, 0)),
      (this.rotation = 0),
      (this.matrixAutoUpdate = !0),
      (this.matrix = new We()),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.unpackAlignment = 4),
      (this.colorSpace = u),
      (this.userData = {}),
      (this.updateRanges = []),
      (this.version = 0),
      (this.onUpdate = null),
      (this.renderTarget = null),
      (this.isRenderTargetTexture = !1),
      (this.isArrayTexture = !!(e && e.depth && e.depth > 1)),
      (this.pmremVersion = 0));
  }
  get width() {
    return this.source.getSize(Rr).x;
  }
  get height() {
    return this.source.getSize(Rr).y;
  }
  get depth() {
    return this.source.getSize(Rr).z;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(
      this.offset.x,
      this.offset.y,
      this.repeat.x,
      this.repeat.y,
      this.rotation,
      this.center.x,
      this.center.y,
    );
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return (
      (this.name = e.name),
      (this.source = e.source),
      (this.mipmaps = e.mipmaps.slice(0)),
      (this.mapping = e.mapping),
      (this.channel = e.channel),
      (this.wrapS = e.wrapS),
      (this.wrapT = e.wrapT),
      (this.magFilter = e.magFilter),
      (this.minFilter = e.minFilter),
      (this.anisotropy = e.anisotropy),
      (this.format = e.format),
      (this.internalFormat = e.internalFormat),
      (this.type = e.type),
      this.offset.copy(e.offset),
      this.repeat.copy(e.repeat),
      this.center.copy(e.center),
      (this.rotation = e.rotation),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      this.matrix.copy(e.matrix),
      (this.generateMipmaps = e.generateMipmaps),
      (this.premultiplyAlpha = e.premultiplyAlpha),
      (this.flipY = e.flipY),
      (this.unpackAlignment = e.unpackAlignment),
      (this.colorSpace = e.colorSpace),
      (this.renderTarget = e.renderTarget),
      (this.isRenderTargetTexture = e.isRenderTargetTexture),
      (this.isArrayTexture = e.isArrayTexture),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      (this.needsUpdate = !0),
      this
    );
  }
  setValues(e) {
    for (const t in e) {
      const n = e[t];
      if (n === void 0) {
        Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);
        continue;
      }
      const s = this[t];
      if (s === void 0) {
        Ve(`Texture.setValues(): property '${t}' does not exist.`);
        continue;
      }
      (s && n && s.isVector2 && n.isVector2) ||
      (s && n && s.isVector3 && n.isVector3) ||
      (s && n && s.isMatrix3 && n.isMatrix3)
        ? s.copy(n)
        : (this[t] = n);
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
    const n = {
      metadata: { version: 4.7, type: "Texture", generator: "Texture.toJSON" },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment,
    };
    return (
      Object.keys(this.userData).length > 0 && (n.userData = this.userData),
      t || (e.textures[this.uuid] = n),
      n
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== cc) return e;
    if ((e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1))
      switch (this.wrapS) {
        case _a:
          e.x = e.x - Math.floor(e.x);
          break;
        case _n:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case va:
          Math.abs(Math.floor(e.x) % 2) === 1
            ? (e.x = Math.ceil(e.x) - e.x)
            : (e.x = e.x - Math.floor(e.x));
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case _a:
          e.y = e.y - Math.floor(e.y);
          break;
        case _n:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case va:
          Math.abs(Math.floor(e.y) % 2) === 1
            ? (e.y = Math.ceil(e.y) - e.y)
            : (e.y = e.y - Math.floor(e.y));
          break;
      }
    return (this.flipY && (e.y = 1 - e.y), e);
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, (this.source.needsUpdate = !0));
  }
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
bt.DEFAULT_IMAGE = null;
bt.DEFAULT_MAPPING = cc;
bt.DEFAULT_ANISOTROPY = 1;
class dt {
  constructor(e = 0, t = 0, n = 0, s = 1) {
    ((dt.prototype.isVector4 = !0),
      (this.x = e),
      (this.y = t),
      (this.z = n),
      (this.w = s));
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, n, s) {
    return ((this.x = e), (this.y = t), (this.z = n), (this.w = s), this);
  }
  setScalar(e) {
    return ((this.x = e), (this.y = e), (this.z = e), (this.w = e), this);
  }
  setX(e) {
    return ((this.x = e), this);
  }
  setY(e) {
    return ((this.y = e), this);
  }
  setZ(e) {
    return ((this.z = e), this);
  }
  setW(e) {
    return ((this.w = e), this);
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return (
      (this.x = e.x),
      (this.y = e.y),
      (this.z = e.z),
      (this.w = e.w !== void 0 ? e.w : 1),
      this
    );
  }
  add(e) {
    return (
      (this.x += e.x),
      (this.y += e.y),
      (this.z += e.z),
      (this.w += e.w),
      this
    );
  }
  addScalar(e) {
    return ((this.x += e), (this.y += e), (this.z += e), (this.w += e), this);
  }
  addVectors(e, t) {
    return (
      (this.x = e.x + t.x),
      (this.y = e.y + t.y),
      (this.z = e.z + t.z),
      (this.w = e.w + t.w),
      this
    );
  }
  addScaledVector(e, t) {
    return (
      (this.x += e.x * t),
      (this.y += e.y * t),
      (this.z += e.z * t),
      (this.w += e.w * t),
      this
    );
  }
  sub(e) {
    return (
      (this.x -= e.x),
      (this.y -= e.y),
      (this.z -= e.z),
      (this.w -= e.w),
      this
    );
  }
  subScalar(e) {
    return ((this.x -= e), (this.y -= e), (this.z -= e), (this.w -= e), this);
  }
  subVectors(e, t) {
    return (
      (this.x = e.x - t.x),
      (this.y = e.y - t.y),
      (this.z = e.z - t.z),
      (this.w = e.w - t.w),
      this
    );
  }
  multiply(e) {
    return (
      (this.x *= e.x),
      (this.y *= e.y),
      (this.z *= e.z),
      (this.w *= e.w),
      this
    );
  }
  multiplyScalar(e) {
    return ((this.x *= e), (this.y *= e), (this.z *= e), (this.w *= e), this);
  }
  applyMatrix4(e) {
    const t = this.x,
      n = this.y,
      s = this.z,
      r = this.w,
      a = e.elements;
    return (
      (this.x = a[0] * t + a[4] * n + a[8] * s + a[12] * r),
      (this.y = a[1] * t + a[5] * n + a[9] * s + a[13] * r),
      (this.z = a[2] * t + a[6] * n + a[10] * s + a[14] * r),
      (this.w = a[3] * t + a[7] * n + a[11] * s + a[15] * r),
      this
    );
  }
  divide(e) {
    return (
      (this.x /= e.x),
      (this.y /= e.y),
      (this.z /= e.z),
      (this.w /= e.w),
      this
    );
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return (
      t < 1e-4
        ? ((this.x = 1), (this.y = 0), (this.z = 0))
        : ((this.x = e.x / t), (this.y = e.y / t), (this.z = e.z / t)),
      this
    );
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, n, s, r;
    const c = e.elements,
      l = c[0],
      u = c[4],
      f = c[8],
      h = c[1],
      d = c[5],
      g = c[9],
      x = c[2],
      m = c[6],
      p = c[10];
    if (
      Math.abs(u - h) < 0.01 &&
      Math.abs(f - x) < 0.01 &&
      Math.abs(g - m) < 0.01
    ) {
      if (
        Math.abs(u + h) < 0.1 &&
        Math.abs(f + x) < 0.1 &&
        Math.abs(g + m) < 0.1 &&
        Math.abs(l + d + p - 3) < 0.1
      )
        return (this.set(1, 0, 0, 0), this);
      t = Math.PI;
      const E = (l + 1) / 2,
        y = (d + 1) / 2,
        R = (p + 1) / 2,
        w = (u + h) / 4,
        P = (f + x) / 4,
        v = (g + m) / 4;
      return (
        E > y && E > R
          ? E < 0.01
            ? ((n = 0), (s = 0.707106781), (r = 0.707106781))
            : ((n = Math.sqrt(E)), (s = w / n), (r = P / n))
          : y > R
            ? y < 0.01
              ? ((n = 0.707106781), (s = 0), (r = 0.707106781))
              : ((s = Math.sqrt(y)), (n = w / s), (r = v / s))
            : R < 0.01
              ? ((n = 0.707106781), (s = 0.707106781), (r = 0))
              : ((r = Math.sqrt(R)), (n = P / r), (s = v / r)),
        this.set(n, s, r, t),
        this
      );
    }
    let S = Math.sqrt(
      (m - g) * (m - g) + (f - x) * (f - x) + (h - u) * (h - u),
    );
    return (
      Math.abs(S) < 0.001 && (S = 1),
      (this.x = (m - g) / S),
      (this.y = (f - x) / S),
      (this.z = (h - u) / S),
      (this.w = Math.acos((l + d + p - 1) / 2)),
      this
    );
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return (
      (this.x = t[12]),
      (this.y = t[13]),
      (this.z = t[14]),
      (this.w = t[15]),
      this
    );
  }
  min(e) {
    return (
      (this.x = Math.min(this.x, e.x)),
      (this.y = Math.min(this.y, e.y)),
      (this.z = Math.min(this.z, e.z)),
      (this.w = Math.min(this.w, e.w)),
      this
    );
  }
  max(e) {
    return (
      (this.x = Math.max(this.x, e.x)),
      (this.y = Math.max(this.y, e.y)),
      (this.z = Math.max(this.z, e.z)),
      (this.w = Math.max(this.w, e.w)),
      this
    );
  }
  clamp(e, t) {
    return (
      (this.x = Ye(this.x, e.x, t.x)),
      (this.y = Ye(this.y, e.y, t.y)),
      (this.z = Ye(this.z, e.z, t.z)),
      (this.w = Ye(this.w, e.w, t.w)),
      this
    );
  }
  clampScalar(e, t) {
    return (
      (this.x = Ye(this.x, e, t)),
      (this.y = Ye(this.y, e, t)),
      (this.z = Ye(this.z, e, t)),
      (this.w = Ye(this.w, e, t)),
      this
    );
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Ye(n, e, t));
  }
  floor() {
    return (
      (this.x = Math.floor(this.x)),
      (this.y = Math.floor(this.y)),
      (this.z = Math.floor(this.z)),
      (this.w = Math.floor(this.w)),
      this
    );
  }
  ceil() {
    return (
      (this.x = Math.ceil(this.x)),
      (this.y = Math.ceil(this.y)),
      (this.z = Math.ceil(this.z)),
      (this.w = Math.ceil(this.w)),
      this
    );
  }
  round() {
    return (
      (this.x = Math.round(this.x)),
      (this.y = Math.round(this.y)),
      (this.z = Math.round(this.z)),
      (this.w = Math.round(this.w)),
      this
    );
  }
  roundToZero() {
    return (
      (this.x = Math.trunc(this.x)),
      (this.y = Math.trunc(this.y)),
      (this.z = Math.trunc(this.z)),
      (this.w = Math.trunc(this.w)),
      this
    );
  }
  negate() {
    return (
      (this.x = -this.x),
      (this.y = -this.y),
      (this.z = -this.z),
      (this.w = -this.w),
      this
    );
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return (
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  }
  length() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w,
    );
  }
  manhattanLength() {
    return (
      Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    );
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return (
      (this.x += (e.x - this.x) * t),
      (this.y += (e.y - this.y) * t),
      (this.z += (e.z - this.z) * t),
      (this.w += (e.w - this.w) * t),
      this
    );
  }
  lerpVectors(e, t, n) {
    return (
      (this.x = e.x + (t.x - e.x) * n),
      (this.y = e.y + (t.y - e.y) * n),
      (this.z = e.z + (t.z - e.z) * n),
      (this.w = e.w + (t.w - e.w) * n),
      this
    );
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return (
      (this.x = e[t]),
      (this.y = e[t + 1]),
      (this.z = e[t + 2]),
      (this.w = e[t + 3]),
      this
    );
  }
  toArray(e = [], t = 0) {
    return (
      (e[t] = this.x),
      (e[t + 1] = this.y),
      (e[t + 2] = this.z),
      (e[t + 3] = this.w),
      e
    );
  }
  fromBufferAttribute(e, t) {
    return (
      (this.x = e.getX(t)),
      (this.y = e.getY(t)),
      (this.z = e.getZ(t)),
      (this.w = e.getW(t)),
      this
    );
  }
  random() {
    return (
      (this.x = Math.random()),
      (this.y = Math.random()),
      (this.z = Math.random()),
      (this.w = Math.random()),
      this
    );
  }
  *[Symbol.iterator]() {
    (yield this.x, yield this.y, yield this.z, yield this.w);
  }
}
class Qu extends Di {
  constructor(e = 1, t = 1, n = {}) {
    (super(),
      (n = Object.assign(
        {
          generateMipmaps: !1,
          internalFormat: null,
          minFilter: Ct,
          depthBuffer: !0,
          stencilBuffer: !1,
          resolveDepthBuffer: !0,
          resolveStencilBuffer: !0,
          depthTexture: null,
          samples: 0,
          count: 1,
          depth: 1,
          multiview: !1,
        },
        n,
      )),
      (this.isRenderTarget = !0),
      (this.width = e),
      (this.height = t),
      (this.depth = n.depth),
      (this.scissor = new dt(0, 0, e, t)),
      (this.scissorTest = !1),
      (this.viewport = new dt(0, 0, e, t)),
      (this.textures = []));
    const s = { width: e, height: t, depth: n.depth },
      r = new bt(s),
      a = n.count;
    for (let o = 0; o < a; o++)
      ((this.textures[o] = r.clone()),
        (this.textures[o].isRenderTargetTexture = !0),
        (this.textures[o].renderTarget = this));
    (this._setTextureOptions(n),
      (this.depthBuffer = n.depthBuffer),
      (this.stencilBuffer = n.stencilBuffer),
      (this.resolveDepthBuffer = n.resolveDepthBuffer),
      (this.resolveStencilBuffer = n.resolveStencilBuffer),
      (this._depthTexture = null),
      (this.depthTexture = n.depthTexture),
      (this.samples = n.samples),
      (this.multiview = n.multiview));
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: Ct,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null,
    };
    (e.mapping !== void 0 && (t.mapping = e.mapping),
      e.wrapS !== void 0 && (t.wrapS = e.wrapS),
      e.wrapT !== void 0 && (t.wrapT = e.wrapT),
      e.wrapR !== void 0 && (t.wrapR = e.wrapR),
      e.magFilter !== void 0 && (t.magFilter = e.magFilter),
      e.minFilter !== void 0 && (t.minFilter = e.minFilter),
      e.format !== void 0 && (t.format = e.format),
      e.type !== void 0 && (t.type = e.type),
      e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy),
      e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace),
      e.flipY !== void 0 && (t.flipY = e.flipY),
      e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps),
      e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat));
    for (let n = 0; n < this.textures.length; n++)
      this.textures[n].setValues(t);
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    (this._depthTexture !== null && (this._depthTexture.renderTarget = null),
      e !== null && (e.renderTarget = this),
      (this._depthTexture = e));
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(e, t, n = 1) {
    if (this.width !== e || this.height !== t || this.depth !== n) {
      ((this.width = e), (this.height = t), (this.depth = n));
      for (let s = 0, r = this.textures.length; s < r; s++)
        ((this.textures[s].image.width = e),
          (this.textures[s].image.height = t),
          (this.textures[s].image.depth = n),
          this.textures[s].isData3DTexture !== !0 &&
            (this.textures[s].isArrayTexture =
              this.textures[s].image.depth > 1));
      this.dispose();
    }
    (this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t));
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    ((this.width = e.width),
      (this.height = e.height),
      (this.depth = e.depth),
      this.scissor.copy(e.scissor),
      (this.scissorTest = e.scissorTest),
      this.viewport.copy(e.viewport),
      (this.textures.length = 0));
    for (let t = 0, n = e.textures.length; t < n; t++) {
      ((this.textures[t] = e.textures[t].clone()),
        (this.textures[t].isRenderTargetTexture = !0),
        (this.textures[t].renderTarget = this));
      const s = Object.assign({}, e.textures[t].image);
      this.textures[t].source = new yo(s);
    }
    return (
      (this.depthBuffer = e.depthBuffer),
      (this.stencilBuffer = e.stencilBuffer),
      (this.resolveDepthBuffer = e.resolveDepthBuffer),
      (this.resolveStencilBuffer = e.resolveStencilBuffer),
      e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()),
      (this.samples = e.samples),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class It extends Qu {
  constructor(e = 1, t = 1, n = {}) {
    (super(e, t, n), (this.isWebGLRenderTarget = !0));
  }
}
class vc extends bt {
  constructor(e = null, t = 1, n = 1, s = 1) {
    (super(null),
      (this.isDataArrayTexture = !0),
      (this.image = { data: e, width: t, height: n, depth: s }),
      (this.magFilter = Et),
      (this.minFilter = Et),
      (this.wrapR = _n),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1),
      (this.layerUpdates = new Set()));
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class eh extends bt {
  constructor(e = null, t = 1, n = 1, s = 1) {
    (super(null),
      (this.isData3DTexture = !0),
      (this.image = { data: e, width: t, height: n, depth: s }),
      (this.magFilter = Et),
      (this.minFilter = Et),
      (this.wrapR = _n),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1));
  }
}
class ot {
  constructor(e, t, n, s, r, a, o, c, l, u, f, h, d, g, x, m) {
    ((ot.prototype.isMatrix4 = !0),
      (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
      e !== void 0 && this.set(e, t, n, s, r, a, o, c, l, u, f, h, d, g, x, m));
  }
  set(e, t, n, s, r, a, o, c, l, u, f, h, d, g, x, m) {
    const p = this.elements;
    return (
      (p[0] = e),
      (p[4] = t),
      (p[8] = n),
      (p[12] = s),
      (p[1] = r),
      (p[5] = a),
      (p[9] = o),
      (p[13] = c),
      (p[2] = l),
      (p[6] = u),
      (p[10] = f),
      (p[14] = h),
      (p[3] = d),
      (p[7] = g),
      (p[11] = x),
      (p[15] = m),
      this
    );
  }
  identity() {
    return (this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
  }
  clone() {
    return new ot().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements,
      n = e.elements;
    return (
      (t[0] = n[0]),
      (t[1] = n[1]),
      (t[2] = n[2]),
      (t[3] = n[3]),
      (t[4] = n[4]),
      (t[5] = n[5]),
      (t[6] = n[6]),
      (t[7] = n[7]),
      (t[8] = n[8]),
      (t[9] = n[9]),
      (t[10] = n[10]),
      (t[11] = n[11]),
      (t[12] = n[12]),
      (t[13] = n[13]),
      (t[14] = n[14]),
      (t[15] = n[15]),
      this
    );
  }
  copyPosition(e) {
    const t = this.elements,
      n = e.elements;
    return ((t[12] = n[12]), (t[13] = n[13]), (t[14] = n[14]), this);
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return (
      this.set(
        t[0],
        t[3],
        t[6],
        0,
        t[1],
        t[4],
        t[7],
        0,
        t[2],
        t[5],
        t[8],
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  extractBasis(e, t, n) {
    return this.determinant() === 0
      ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this)
      : (e.setFromMatrixColumn(this, 0),
        t.setFromMatrixColumn(this, 1),
        n.setFromMatrixColumn(this, 2),
        this);
  }
  makeBasis(e, t, n) {
    return (
      this.set(
        e.x,
        t.x,
        n.x,
        0,
        e.y,
        t.y,
        n.y,
        0,
        e.z,
        t.z,
        n.z,
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  extractRotation(e) {
    if (e.determinant() === 0) return this.identity();
    const t = this.elements,
      n = e.elements,
      s = 1 / ri.setFromMatrixColumn(e, 0).length(),
      r = 1 / ri.setFromMatrixColumn(e, 1).length(),
      a = 1 / ri.setFromMatrixColumn(e, 2).length();
    return (
      (t[0] = n[0] * s),
      (t[1] = n[1] * s),
      (t[2] = n[2] * s),
      (t[3] = 0),
      (t[4] = n[4] * r),
      (t[5] = n[5] * r),
      (t[6] = n[6] * r),
      (t[7] = 0),
      (t[8] = n[8] * a),
      (t[9] = n[9] * a),
      (t[10] = n[10] * a),
      (t[11] = 0),
      (t[12] = 0),
      (t[13] = 0),
      (t[14] = 0),
      (t[15] = 1),
      this
    );
  }
  makeRotationFromEuler(e) {
    const t = this.elements,
      n = e.x,
      s = e.y,
      r = e.z,
      a = Math.cos(n),
      o = Math.sin(n),
      c = Math.cos(s),
      l = Math.sin(s),
      u = Math.cos(r),
      f = Math.sin(r);
    if (e.order === "XYZ") {
      const h = a * u,
        d = a * f,
        g = o * u,
        x = o * f;
      ((t[0] = c * u),
        (t[4] = -c * f),
        (t[8] = l),
        (t[1] = d + g * l),
        (t[5] = h - x * l),
        (t[9] = -o * c),
        (t[2] = x - h * l),
        (t[6] = g + d * l),
        (t[10] = a * c));
    } else if (e.order === "YXZ") {
      const h = c * u,
        d = c * f,
        g = l * u,
        x = l * f;
      ((t[0] = h + x * o),
        (t[4] = g * o - d),
        (t[8] = a * l),
        (t[1] = a * f),
        (t[5] = a * u),
        (t[9] = -o),
        (t[2] = d * o - g),
        (t[6] = x + h * o),
        (t[10] = a * c));
    } else if (e.order === "ZXY") {
      const h = c * u,
        d = c * f,
        g = l * u,
        x = l * f;
      ((t[0] = h - x * o),
        (t[4] = -a * f),
        (t[8] = g + d * o),
        (t[1] = d + g * o),
        (t[5] = a * u),
        (t[9] = x - h * o),
        (t[2] = -a * l),
        (t[6] = o),
        (t[10] = a * c));
    } else if (e.order === "ZYX") {
      const h = a * u,
        d = a * f,
        g = o * u,
        x = o * f;
      ((t[0] = c * u),
        (t[4] = g * l - d),
        (t[8] = h * l + x),
        (t[1] = c * f),
        (t[5] = x * l + h),
        (t[9] = d * l - g),
        (t[2] = -l),
        (t[6] = o * c),
        (t[10] = a * c));
    } else if (e.order === "YZX") {
      const h = a * c,
        d = a * l,
        g = o * c,
        x = o * l;
      ((t[0] = c * u),
        (t[4] = x - h * f),
        (t[8] = g * f + d),
        (t[1] = f),
        (t[5] = a * u),
        (t[9] = -o * u),
        (t[2] = -l * u),
        (t[6] = d * f + g),
        (t[10] = h - x * f));
    } else if (e.order === "XZY") {
      const h = a * c,
        d = a * l,
        g = o * c,
        x = o * l;
      ((t[0] = c * u),
        (t[4] = -f),
        (t[8] = l * u),
        (t[1] = h * f + x),
        (t[5] = a * u),
        (t[9] = d * f - g),
        (t[2] = g * f - d),
        (t[6] = o * u),
        (t[10] = x * f + h));
    }
    return (
      (t[3] = 0),
      (t[7] = 0),
      (t[11] = 0),
      (t[12] = 0),
      (t[13] = 0),
      (t[14] = 0),
      (t[15] = 1),
      this
    );
  }
  makeRotationFromQuaternion(e) {
    return this.compose(th, e, nh);
  }
  lookAt(e, t, n) {
    const s = this.elements;
    return (
      zt.subVectors(e, t),
      zt.lengthSq() === 0 && (zt.z = 1),
      zt.normalize(),
      En.crossVectors(n, zt),
      En.lengthSq() === 0 &&
        (Math.abs(n.z) === 1 ? (zt.x += 1e-4) : (zt.z += 1e-4),
        zt.normalize(),
        En.crossVectors(n, zt)),
      En.normalize(),
      vs.crossVectors(zt, En),
      (s[0] = En.x),
      (s[4] = vs.x),
      (s[8] = zt.x),
      (s[1] = En.y),
      (s[5] = vs.y),
      (s[9] = zt.y),
      (s[2] = En.z),
      (s[6] = vs.z),
      (s[10] = zt.z),
      this
    );
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements,
      s = t.elements,
      r = this.elements,
      a = n[0],
      o = n[4],
      c = n[8],
      l = n[12],
      u = n[1],
      f = n[5],
      h = n[9],
      d = n[13],
      g = n[2],
      x = n[6],
      m = n[10],
      p = n[14],
      S = n[3],
      E = n[7],
      y = n[11],
      R = n[15],
      w = s[0],
      P = s[4],
      v = s[8],
      b = s[12],
      W = s[1],
      C = s[5],
      V = s[9],
      G = s[13],
      H = s[2],
      N = s[6],
      O = s[10],
      F = s[14],
      ce = s[3],
      ie = s[7],
      ge = s[11],
      xe = s[15];
    return (
      (r[0] = a * w + o * W + c * H + l * ce),
      (r[4] = a * P + o * C + c * N + l * ie),
      (r[8] = a * v + o * V + c * O + l * ge),
      (r[12] = a * b + o * G + c * F + l * xe),
      (r[1] = u * w + f * W + h * H + d * ce),
      (r[5] = u * P + f * C + h * N + d * ie),
      (r[9] = u * v + f * V + h * O + d * ge),
      (r[13] = u * b + f * G + h * F + d * xe),
      (r[2] = g * w + x * W + m * H + p * ce),
      (r[6] = g * P + x * C + m * N + p * ie),
      (r[10] = g * v + x * V + m * O + p * ge),
      (r[14] = g * b + x * G + m * F + p * xe),
      (r[3] = S * w + E * W + y * H + R * ce),
      (r[7] = S * P + E * C + y * N + R * ie),
      (r[11] = S * v + E * V + y * O + R * ge),
      (r[15] = S * b + E * G + y * F + R * xe),
      this
    );
  }
  multiplyScalar(e) {
    const t = this.elements;
    return (
      (t[0] *= e),
      (t[4] *= e),
      (t[8] *= e),
      (t[12] *= e),
      (t[1] *= e),
      (t[5] *= e),
      (t[9] *= e),
      (t[13] *= e),
      (t[2] *= e),
      (t[6] *= e),
      (t[10] *= e),
      (t[14] *= e),
      (t[3] *= e),
      (t[7] *= e),
      (t[11] *= e),
      (t[15] *= e),
      this
    );
  }
  determinant() {
    const e = this.elements,
      t = e[0],
      n = e[4],
      s = e[8],
      r = e[12],
      a = e[1],
      o = e[5],
      c = e[9],
      l = e[13],
      u = e[2],
      f = e[6],
      h = e[10],
      d = e[14],
      g = e[3],
      x = e[7],
      m = e[11],
      p = e[15],
      S = c * d - l * h,
      E = o * d - l * f,
      y = o * h - c * f,
      R = a * d - l * u,
      w = a * h - c * u,
      P = a * f - o * u;
    return (
      t * (x * S - m * E + p * y) -
      n * (g * S - m * R + p * w) +
      s * (g * E - x * R + p * P) -
      r * (g * y - x * w + m * P)
    );
  }
  transpose() {
    const e = this.elements;
    let t;
    return (
      (t = e[1]),
      (e[1] = e[4]),
      (e[4] = t),
      (t = e[2]),
      (e[2] = e[8]),
      (e[8] = t),
      (t = e[6]),
      (e[6] = e[9]),
      (e[9] = t),
      (t = e[3]),
      (e[3] = e[12]),
      (e[12] = t),
      (t = e[7]),
      (e[7] = e[13]),
      (e[13] = t),
      (t = e[11]),
      (e[11] = e[14]),
      (e[14] = t),
      this
    );
  }
  setPosition(e, t, n) {
    const s = this.elements;
    return (
      e.isVector3
        ? ((s[12] = e.x), (s[13] = e.y), (s[14] = e.z))
        : ((s[12] = e), (s[13] = t), (s[14] = n)),
      this
    );
  }
  invert() {
    const e = this.elements,
      t = e[0],
      n = e[1],
      s = e[2],
      r = e[3],
      a = e[4],
      o = e[5],
      c = e[6],
      l = e[7],
      u = e[8],
      f = e[9],
      h = e[10],
      d = e[11],
      g = e[12],
      x = e[13],
      m = e[14],
      p = e[15],
      S = t * o - n * a,
      E = t * c - s * a,
      y = t * l - r * a,
      R = n * c - s * o,
      w = n * l - r * o,
      P = s * l - r * c,
      v = u * x - f * g,
      b = u * m - h * g,
      W = u * p - d * g,
      C = f * m - h * x,
      V = f * p - d * x,
      G = h * p - d * m,
      H = S * G - E * V + y * C + R * W - w * b + P * v;
    if (H === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const N = 1 / H;
    return (
      (e[0] = (o * G - c * V + l * C) * N),
      (e[1] = (s * V - n * G - r * C) * N),
      (e[2] = (x * P - m * w + p * R) * N),
      (e[3] = (h * w - f * P - d * R) * N),
      (e[4] = (c * W - a * G - l * b) * N),
      (e[5] = (t * G - s * W + r * b) * N),
      (e[6] = (m * y - g * P - p * E) * N),
      (e[7] = (u * P - h * y + d * E) * N),
      (e[8] = (a * V - o * W + l * v) * N),
      (e[9] = (n * W - t * V - r * v) * N),
      (e[10] = (g * w - x * y + p * S) * N),
      (e[11] = (f * y - u * w - d * S) * N),
      (e[12] = (o * b - a * C - c * v) * N),
      (e[13] = (t * C - n * b + s * v) * N),
      (e[14] = (x * E - g * R - m * S) * N),
      (e[15] = (u * R - f * E + h * S) * N),
      this
    );
  }
  scale(e) {
    const t = this.elements,
      n = e.x,
      s = e.y,
      r = e.z;
    return (
      (t[0] *= n),
      (t[4] *= s),
      (t[8] *= r),
      (t[1] *= n),
      (t[5] *= s),
      (t[9] *= r),
      (t[2] *= n),
      (t[6] *= s),
      (t[10] *= r),
      (t[3] *= n),
      (t[7] *= s),
      (t[11] *= r),
      this
    );
  }
  getMaxScaleOnAxis() {
    const e = this.elements,
      t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
      n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
      s = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, s));
  }
  makeTranslation(e, t, n) {
    return (
      e.isVector3
        ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1)
        : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1),
      this
    );
  }
  makeRotationX(e) {
    const t = Math.cos(e),
      n = Math.sin(e);
    return (this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this);
  }
  makeRotationY(e) {
    const t = Math.cos(e),
      n = Math.sin(e);
    return (this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this);
  }
  makeRotationZ(e) {
    const t = Math.cos(e),
      n = Math.sin(e);
    return (this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this);
  }
  makeRotationAxis(e, t) {
    const n = Math.cos(t),
      s = Math.sin(t),
      r = 1 - n,
      a = e.x,
      o = e.y,
      c = e.z,
      l = r * a,
      u = r * o;
    return (
      this.set(
        l * a + n,
        l * o - s * c,
        l * c + s * o,
        0,
        l * o + s * c,
        u * o + n,
        u * c - s * a,
        0,
        l * c - s * o,
        u * c + s * a,
        r * c * c + n,
        0,
        0,
        0,
        0,
        1,
      ),
      this
    );
  }
  makeScale(e, t, n) {
    return (this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this);
  }
  makeShear(e, t, n, s, r, a) {
    return (this.set(1, n, r, 0, e, 1, a, 0, t, s, 1, 0, 0, 0, 0, 1), this);
  }
  compose(e, t, n) {
    const s = this.elements,
      r = t._x,
      a = t._y,
      o = t._z,
      c = t._w,
      l = r + r,
      u = a + a,
      f = o + o,
      h = r * l,
      d = r * u,
      g = r * f,
      x = a * u,
      m = a * f,
      p = o * f,
      S = c * l,
      E = c * u,
      y = c * f,
      R = n.x,
      w = n.y,
      P = n.z;
    return (
      (s[0] = (1 - (x + p)) * R),
      (s[1] = (d + y) * R),
      (s[2] = (g - E) * R),
      (s[3] = 0),
      (s[4] = (d - y) * w),
      (s[5] = (1 - (h + p)) * w),
      (s[6] = (m + S) * w),
      (s[7] = 0),
      (s[8] = (g + E) * P),
      (s[9] = (m - S) * P),
      (s[10] = (1 - (h + x)) * P),
      (s[11] = 0),
      (s[12] = e.x),
      (s[13] = e.y),
      (s[14] = e.z),
      (s[15] = 1),
      this
    );
  }
  decompose(e, t, n) {
    const s = this.elements;
    ((e.x = s[12]), (e.y = s[13]), (e.z = s[14]));
    const r = this.determinant();
    if (r === 0) return (n.set(1, 1, 1), t.identity(), this);
    let a = ri.set(s[0], s[1], s[2]).length();
    const o = ri.set(s[4], s[5], s[6]).length(),
      c = ri.set(s[8], s[9], s[10]).length();
    (r < 0 && (a = -a), Yt.copy(this));
    const l = 1 / a,
      u = 1 / o,
      f = 1 / c;
    return (
      (Yt.elements[0] *= l),
      (Yt.elements[1] *= l),
      (Yt.elements[2] *= l),
      (Yt.elements[4] *= u),
      (Yt.elements[5] *= u),
      (Yt.elements[6] *= u),
      (Yt.elements[8] *= f),
      (Yt.elements[9] *= f),
      (Yt.elements[10] *= f),
      t.setFromRotationMatrix(Yt),
      (n.x = a),
      (n.y = o),
      (n.z = c),
      this
    );
  }
  makePerspective(e, t, n, s, r, a, o = rn, c = !1) {
    const l = this.elements,
      u = (2 * r) / (t - e),
      f = (2 * r) / (n - s),
      h = (t + e) / (t - e),
      d = (n + s) / (n - s);
    let g, x;
    if (c) ((g = r / (a - r)), (x = (a * r) / (a - r)));
    else if (o === rn) ((g = -(a + r) / (a - r)), (x = (-2 * a * r) / (a - r)));
    else if (o === as) ((g = -a / (a - r)), (x = (-a * r) / (a - r)));
    else
      throw new Error(
        "THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o,
      );
    return (
      (l[0] = u),
      (l[4] = 0),
      (l[8] = h),
      (l[12] = 0),
      (l[1] = 0),
      (l[5] = f),
      (l[9] = d),
      (l[13] = 0),
      (l[2] = 0),
      (l[6] = 0),
      (l[10] = g),
      (l[14] = x),
      (l[3] = 0),
      (l[7] = 0),
      (l[11] = -1),
      (l[15] = 0),
      this
    );
  }
  makeOrthographic(e, t, n, s, r, a, o = rn, c = !1) {
    const l = this.elements,
      u = 2 / (t - e),
      f = 2 / (n - s),
      h = -(t + e) / (t - e),
      d = -(n + s) / (n - s);
    let g, x;
    if (c) ((g = 1 / (a - r)), (x = a / (a - r)));
    else if (o === rn) ((g = -2 / (a - r)), (x = -(a + r) / (a - r)));
    else if (o === as) ((g = -1 / (a - r)), (x = -r / (a - r)));
    else
      throw new Error(
        "THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o,
      );
    return (
      (l[0] = u),
      (l[4] = 0),
      (l[8] = 0),
      (l[12] = h),
      (l[1] = 0),
      (l[5] = f),
      (l[9] = 0),
      (l[13] = d),
      (l[2] = 0),
      (l[6] = 0),
      (l[10] = g),
      (l[14] = x),
      (l[3] = 0),
      (l[7] = 0),
      (l[11] = 0),
      (l[15] = 1),
      this
    );
  }
  equals(e) {
    const t = this.elements,
      n = e.elements;
    for (let s = 0; s < 16; s++) if (t[s] !== n[s]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return (
      (e[t] = n[0]),
      (e[t + 1] = n[1]),
      (e[t + 2] = n[2]),
      (e[t + 3] = n[3]),
      (e[t + 4] = n[4]),
      (e[t + 5] = n[5]),
      (e[t + 6] = n[6]),
      (e[t + 7] = n[7]),
      (e[t + 8] = n[8]),
      (e[t + 9] = n[9]),
      (e[t + 10] = n[10]),
      (e[t + 11] = n[11]),
      (e[t + 12] = n[12]),
      (e[t + 13] = n[13]),
      (e[t + 14] = n[14]),
      (e[t + 15] = n[15]),
      e
    );
  }
}
const ri = new D(),
  Yt = new ot(),
  th = new D(0, 0, 0),
  nh = new D(1, 1, 1),
  En = new D(),
  vs = new D(),
  zt = new D(),
  el = new ot(),
  tl = new Ii();
class ln {
  constructor(e = 0, t = 0, n = 0, s = ln.DEFAULT_ORDER) {
    ((this.isEuler = !0),
      (this._x = e),
      (this._y = t),
      (this._z = n),
      (this._order = s));
  }
  get x() {
    return this._x;
  }
  set x(e) {
    ((this._x = e), this._onChangeCallback());
  }
  get y() {
    return this._y;
  }
  set y(e) {
    ((this._y = e), this._onChangeCallback());
  }
  get z() {
    return this._z;
  }
  set z(e) {
    ((this._z = e), this._onChangeCallback());
  }
  get order() {
    return this._order;
  }
  set order(e) {
    ((this._order = e), this._onChangeCallback());
  }
  set(e, t, n, s = this._order) {
    return (
      (this._x = e),
      (this._y = t),
      (this._z = n),
      (this._order = s),
      this._onChangeCallback(),
      this
    );
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return (
      (this._x = e._x),
      (this._y = e._y),
      (this._z = e._z),
      (this._order = e._order),
      this._onChangeCallback(),
      this
    );
  }
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const s = e.elements,
      r = s[0],
      a = s[4],
      o = s[8],
      c = s[1],
      l = s[5],
      u = s[9],
      f = s[2],
      h = s[6],
      d = s[10];
    switch (t) {
      case "XYZ":
        ((this._y = Math.asin(Ye(o, -1, 1))),
          Math.abs(o) < 0.9999999
            ? ((this._x = Math.atan2(-u, d)), (this._z = Math.atan2(-a, r)))
            : ((this._x = Math.atan2(h, l)), (this._z = 0)));
        break;
      case "YXZ":
        ((this._x = Math.asin(-Ye(u, -1, 1))),
          Math.abs(u) < 0.9999999
            ? ((this._y = Math.atan2(o, d)), (this._z = Math.atan2(c, l)))
            : ((this._y = Math.atan2(-f, r)), (this._z = 0)));
        break;
      case "ZXY":
        ((this._x = Math.asin(Ye(h, -1, 1))),
          Math.abs(h) < 0.9999999
            ? ((this._y = Math.atan2(-f, d)), (this._z = Math.atan2(-a, l)))
            : ((this._y = 0), (this._z = Math.atan2(c, r))));
        break;
      case "ZYX":
        ((this._y = Math.asin(-Ye(f, -1, 1))),
          Math.abs(f) < 0.9999999
            ? ((this._x = Math.atan2(h, d)), (this._z = Math.atan2(c, r)))
            : ((this._x = 0), (this._z = Math.atan2(-a, l))));
        break;
      case "YZX":
        ((this._z = Math.asin(Ye(c, -1, 1))),
          Math.abs(c) < 0.9999999
            ? ((this._x = Math.atan2(-u, l)), (this._y = Math.atan2(-f, r)))
            : ((this._x = 0), (this._y = Math.atan2(o, d))));
        break;
      case "XZY":
        ((this._z = Math.asin(-Ye(a, -1, 1))),
          Math.abs(a) < 0.9999999
            ? ((this._x = Math.atan2(h, l)), (this._y = Math.atan2(o, r)))
            : ((this._x = Math.atan2(-u, d)), (this._y = 0)));
        break;
      default:
        Ve(
          "Euler: .setFromRotationMatrix() encountered an unknown order: " + t,
        );
    }
    return ((this._order = t), n === !0 && this._onChangeCallback(), this);
  }
  setFromQuaternion(e, t, n) {
    return (
      el.makeRotationFromQuaternion(e),
      this.setFromRotationMatrix(el, t, n)
    );
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return (tl.setFromEuler(this), this.setFromQuaternion(tl, e));
  }
  equals(e) {
    return (
      e._x === this._x &&
      e._y === this._y &&
      e._z === this._z &&
      e._order === this._order
    );
  }
  fromArray(e) {
    return (
      (this._x = e[0]),
      (this._y = e[1]),
      (this._z = e[2]),
      e[3] !== void 0 && (this._order = e[3]),
      this._onChangeCallback(),
      this
    );
  }
  toArray(e = [], t = 0) {
    return (
      (e[t] = this._x),
      (e[t + 1] = this._y),
      (e[t + 2] = this._z),
      (e[t + 3] = this._order),
      e
    );
  }
  _onChange(e) {
    return ((this._onChangeCallback = e), this);
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    (yield this._x, yield this._y, yield this._z, yield this._order);
  }
}
ln.DEFAULT_ORDER = "XYZ";
class Eo {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = ((1 << e) | 0) >>> 0;
  }
  enable(e) {
    this.mask |= (1 << e) | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= (1 << e) | 0;
  }
  disable(e) {
    this.mask &= ~((1 << e) | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & ((1 << e) | 0)) !== 0;
  }
}
let ih = 0;
const nl = new D(),
  ai = new Ii(),
  hn = new ot(),
  xs = new D(),
  Vi = new D(),
  sh = new D(),
  rh = new Ii(),
  il = new D(1, 0, 0),
  sl = new D(0, 1, 0),
  rl = new D(0, 0, 1),
  al = { type: "added" },
  ah = { type: "removed" },
  oi = { type: "childadded", child: null },
  Pr = { type: "childremoved", child: null };
class St extends Di {
  constructor() {
    (super(),
      (this.isObject3D = !0),
      Object.defineProperty(this, "id", { value: ih++ }),
      (this.uuid = Qn()),
      (this.name = ""),
      (this.type = "Object3D"),
      (this.parent = null),
      (this.children = []),
      (this.up = St.DEFAULT_UP.clone()));
    const e = new D(),
      t = new ln(),
      n = new Ii(),
      s = new D(1, 1, 1);
    function r() {
      n.setFromEuler(t, !1);
    }
    function a() {
      t.setFromQuaternion(n, void 0, !1);
    }
    (t._onChange(r),
      n._onChange(a),
      Object.defineProperties(this, {
        position: { configurable: !0, enumerable: !0, value: e },
        rotation: { configurable: !0, enumerable: !0, value: t },
        quaternion: { configurable: !0, enumerable: !0, value: n },
        scale: { configurable: !0, enumerable: !0, value: s },
        modelViewMatrix: { value: new ot() },
        normalMatrix: { value: new We() },
      }),
      (this.matrix = new ot()),
      (this.matrixWorld = new ot()),
      (this.matrixAutoUpdate = St.DEFAULT_MATRIX_AUTO_UPDATE),
      (this.matrixWorldAutoUpdate = St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
      (this.matrixWorldNeedsUpdate = !1),
      (this.layers = new Eo()),
      (this.visible = !0),
      (this.castShadow = !1),
      (this.receiveShadow = !1),
      (this.frustumCulled = !0),
      (this.renderOrder = 0),
      (this.animations = []),
      (this.customDepthMaterial = void 0),
      (this.customDistanceMaterial = void 0),
      (this.static = !1),
      (this.userData = {}),
      (this.pivot = null));
  }
  onBeforeShadow() {}
  onAfterShadow() {}
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(e) {
    (this.matrixAutoUpdate && this.updateMatrix(),
      this.matrix.premultiply(e),
      this.matrix.decompose(this.position, this.quaternion, this.scale));
  }
  applyQuaternion(e) {
    return (this.quaternion.premultiply(e), this);
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return (ai.setFromAxisAngle(e, t), this.quaternion.multiply(ai), this);
  }
  rotateOnWorldAxis(e, t) {
    return (ai.setFromAxisAngle(e, t), this.quaternion.premultiply(ai), this);
  }
  rotateX(e) {
    return this.rotateOnAxis(il, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(sl, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(rl, e);
  }
  translateOnAxis(e, t) {
    return (
      nl.copy(e).applyQuaternion(this.quaternion),
      this.position.add(nl.multiplyScalar(t)),
      this
    );
  }
  translateX(e) {
    return this.translateOnAxis(il, e);
  }
  translateY(e) {
    return this.translateOnAxis(sl, e);
  }
  translateZ(e) {
    return this.translateOnAxis(rl, e);
  }
  localToWorld(e) {
    return (this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld));
  }
  worldToLocal(e) {
    return (
      this.updateWorldMatrix(!0, !1),
      e.applyMatrix4(hn.copy(this.matrixWorld).invert())
    );
  }
  lookAt(e, t, n) {
    e.isVector3 ? xs.copy(e) : xs.set(e, t, n);
    const s = this.parent;
    (this.updateWorldMatrix(!0, !1),
      Vi.setFromMatrixPosition(this.matrixWorld),
      this.isCamera || this.isLight
        ? hn.lookAt(Vi, xs, this.up)
        : hn.lookAt(xs, Vi, this.up),
      this.quaternion.setFromRotationMatrix(hn),
      s &&
        (hn.extractRotation(s.matrixWorld),
        ai.setFromRotationMatrix(hn),
        this.quaternion.premultiply(ai.invert())));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
      return this;
    }
    return e === this
      ? (Qe("Object3D.add: object can't be added as a child of itself.", e),
        this)
      : (e && e.isObject3D
          ? (e.removeFromParent(),
            (e.parent = this),
            this.children.push(e),
            e.dispatchEvent(al),
            (oi.child = e),
            this.dispatchEvent(oi),
            (oi.child = null))
          : Qe("Object3D.add: object not an instance of THREE.Object3D.", e),
        this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return (
      t !== -1 &&
        ((e.parent = null),
        this.children.splice(t, 1),
        e.dispatchEvent(ah),
        (Pr.child = e),
        this.dispatchEvent(Pr),
        (Pr.child = null)),
      this
    );
  }
  removeFromParent() {
    const e = this.parent;
    return (e !== null && e.remove(this), this);
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return (
      this.updateWorldMatrix(!0, !1),
      hn.copy(this.matrixWorld).invert(),
      e.parent !== null &&
        (e.parent.updateWorldMatrix(!0, !1), hn.multiply(e.parent.matrixWorld)),
      e.applyMatrix4(hn),
      e.removeFromParent(),
      (e.parent = this),
      this.children.push(e),
      e.updateWorldMatrix(!1, !0),
      e.dispatchEvent(al),
      (oi.child = e),
      this.dispatchEvent(oi),
      (oi.child = null),
      this
    );
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, s = this.children.length; n < s; n++) {
      const a = this.children[n].getObjectByProperty(e, t);
      if (a !== void 0) return a;
    }
  }
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const s = this.children;
    for (let r = 0, a = s.length; r < a; r++)
      s[r].getObjectsByProperty(e, t, n);
    return n;
  }
  getWorldPosition(e) {
    return (
      this.updateWorldMatrix(!0, !1),
      e.setFromMatrixPosition(this.matrixWorld)
    );
  }
  getWorldQuaternion(e) {
    return (
      this.updateWorldMatrix(!0, !1),
      this.matrixWorld.decompose(Vi, e, sh),
      e
    );
  }
  getWorldScale(e) {
    return (
      this.updateWorldMatrix(!0, !1),
      this.matrixWorld.decompose(Vi, rh, e),
      e
    );
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {}
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, s = t.length; n < s; n++) t[n].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let n = 0, s = t.length; n < s; n++) t[n].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const e = this.pivot;
    if (e !== null) {
      const t = e.x,
        n = e.y,
        s = e.z,
        r = this.matrix.elements;
      ((r[12] += t - r[0] * t - r[4] * n - r[8] * s),
        (r[13] += n - r[1] * t - r[5] * n - r[9] * s),
        (r[14] += s - r[2] * t - r[6] * n - r[10] * s));
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    (this.matrixAutoUpdate && this.updateMatrix(),
      (this.matrixWorldNeedsUpdate || e) &&
        (this.matrixWorldAutoUpdate === !0 &&
          (this.parent === null
            ? this.matrixWorld.copy(this.matrix)
            : this.matrixWorld.multiplyMatrices(
                this.parent.matrixWorld,
                this.matrix,
              )),
        (this.matrixWorldNeedsUpdate = !1),
        (e = !0)));
    const t = this.children;
    for (let n = 0, s = t.length; n < s; n++) t[n].updateMatrixWorld(e);
  }
  updateWorldMatrix(e, t) {
    const n = this.parent;
    if (
      (e === !0 && n !== null && n.updateWorldMatrix(!0, !1),
      this.matrixAutoUpdate && this.updateMatrix(),
      this.matrixWorldAutoUpdate === !0 &&
        (this.parent === null
          ? this.matrixWorld.copy(this.matrix)
          : this.matrixWorld.multiplyMatrices(
              this.parent.matrixWorld,
              this.matrix,
            )),
      t === !0)
    ) {
      const s = this.children;
      for (let r = 0, a = s.length; r < a; r++) s[r].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string",
      n = {};
    t &&
      ((e = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {},
        nodes: {},
      }),
      (n.metadata = {
        version: 4.7,
        type: "Object",
        generator: "Object3D.toJSON",
      }));
    const s = {};
    ((s.uuid = this.uuid),
      (s.type = this.type),
      this.name !== "" && (s.name = this.name),
      this.castShadow === !0 && (s.castShadow = !0),
      this.receiveShadow === !0 && (s.receiveShadow = !0),
      this.visible === !1 && (s.visible = !1),
      this.frustumCulled === !1 && (s.frustumCulled = !1),
      this.renderOrder !== 0 && (s.renderOrder = this.renderOrder),
      this.static !== !1 && (s.static = this.static),
      Object.keys(this.userData).length > 0 && (s.userData = this.userData),
      (s.layers = this.layers.mask),
      (s.matrix = this.matrix.toArray()),
      (s.up = this.up.toArray()),
      this.pivot !== null && (s.pivot = this.pivot.toArray()),
      this.matrixAutoUpdate === !1 && (s.matrixAutoUpdate = !1),
      this.morphTargetDictionary !== void 0 &&
        (s.morphTargetDictionary = Object.assign(
          {},
          this.morphTargetDictionary,
        )),
      this.morphTargetInfluences !== void 0 &&
        (s.morphTargetInfluences = this.morphTargetInfluences.slice()),
      this.isInstancedMesh &&
        ((s.type = "InstancedMesh"),
        (s.count = this.count),
        (s.instanceMatrix = this.instanceMatrix.toJSON()),
        this.instanceColor !== null &&
          (s.instanceColor = this.instanceColor.toJSON())),
      this.isBatchedMesh &&
        ((s.type = "BatchedMesh"),
        (s.perObjectFrustumCulled = this.perObjectFrustumCulled),
        (s.sortObjects = this.sortObjects),
        (s.drawRanges = this._drawRanges),
        (s.reservedRanges = this._reservedRanges),
        (s.geometryInfo = this._geometryInfo.map((o) => ({
          ...o,
          boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0,
          boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0,
        }))),
        (s.instanceInfo = this._instanceInfo.map((o) => ({ ...o }))),
        (s.availableInstanceIds = this._availableInstanceIds.slice()),
        (s.availableGeometryIds = this._availableGeometryIds.slice()),
        (s.nextIndexStart = this._nextIndexStart),
        (s.nextVertexStart = this._nextVertexStart),
        (s.geometryCount = this._geometryCount),
        (s.maxInstanceCount = this._maxInstanceCount),
        (s.maxVertexCount = this._maxVertexCount),
        (s.maxIndexCount = this._maxIndexCount),
        (s.geometryInitialized = this._geometryInitialized),
        (s.matricesTexture = this._matricesTexture.toJSON(e)),
        (s.indirectTexture = this._indirectTexture.toJSON(e)),
        this._colorsTexture !== null &&
          (s.colorsTexture = this._colorsTexture.toJSON(e)),
        this.boundingSphere !== null &&
          (s.boundingSphere = this.boundingSphere.toJSON()),
        this.boundingBox !== null &&
          (s.boundingBox = this.boundingBox.toJSON())));
    function r(o, c) {
      return (o[c.uuid] === void 0 && (o[c.uuid] = c.toJSON(e)), c.uuid);
    }
    if (this.isScene)
      (this.background &&
        (this.background.isColor
          ? (s.background = this.background.toJSON())
          : this.background.isTexture &&
            (s.background = this.background.toJSON(e).uuid)),
        this.environment &&
          this.environment.isTexture &&
          this.environment.isRenderTargetTexture !== !0 &&
          (s.environment = this.environment.toJSON(e).uuid));
    else if (this.isMesh || this.isLine || this.isPoints) {
      s.geometry = r(e.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const c = o.shapes;
        if (Array.isArray(c))
          for (let l = 0, u = c.length; l < u; l++) {
            const f = c[l];
            r(e.shapes, f);
          }
        else r(e.shapes, c);
      }
    }
    if (
      (this.isSkinnedMesh &&
        ((s.bindMode = this.bindMode),
        (s.bindMatrix = this.bindMatrix.toArray()),
        this.skeleton !== void 0 &&
          (r(e.skeletons, this.skeleton), (s.skeleton = this.skeleton.uuid))),
      this.material !== void 0)
    )
      if (Array.isArray(this.material)) {
        const o = [];
        for (let c = 0, l = this.material.length; c < l; c++)
          o.push(r(e.materials, this.material[c]));
        s.material = o;
      } else s.material = r(e.materials, this.material);
    if (this.children.length > 0) {
      s.children = [];
      for (let o = 0; o < this.children.length; o++)
        s.children.push(this.children[o].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      s.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const c = this.animations[o];
        s.animations.push(r(e.animations, c));
      }
    }
    if (t) {
      const o = a(e.geometries),
        c = a(e.materials),
        l = a(e.textures),
        u = a(e.images),
        f = a(e.shapes),
        h = a(e.skeletons),
        d = a(e.animations),
        g = a(e.nodes);
      (o.length > 0 && (n.geometries = o),
        c.length > 0 && (n.materials = c),
        l.length > 0 && (n.textures = l),
        u.length > 0 && (n.images = u),
        f.length > 0 && (n.shapes = f),
        h.length > 0 && (n.skeletons = h),
        d.length > 0 && (n.animations = d),
        g.length > 0 && (n.nodes = g));
    }
    return ((n.object = s), n);
    function a(o) {
      const c = [];
      for (const l in o) {
        const u = o[l];
        (delete u.metadata, c.push(u));
      }
      return c;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (
      ((this.name = e.name),
      this.up.copy(e.up),
      this.position.copy(e.position),
      (this.rotation.order = e.rotation.order),
      this.quaternion.copy(e.quaternion),
      this.scale.copy(e.scale),
      e.pivot !== null && (this.pivot = e.pivot.clone()),
      this.matrix.copy(e.matrix),
      this.matrixWorld.copy(e.matrixWorld),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      (this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate),
      (this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate),
      (this.layers.mask = e.layers.mask),
      (this.visible = e.visible),
      (this.castShadow = e.castShadow),
      (this.receiveShadow = e.receiveShadow),
      (this.frustumCulled = e.frustumCulled),
      (this.renderOrder = e.renderOrder),
      (this.static = e.static),
      (this.animations = e.animations.slice()),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      t === !0)
    )
      for (let n = 0; n < e.children.length; n++) {
        const s = e.children[n];
        this.add(s.clone());
      }
    return this;
  }
}
St.DEFAULT_UP = new D(0, 1, 0);
St.DEFAULT_MATRIX_AUTO_UPDATE = !0;
St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class Zn extends St {
  constructor() {
    (super(), (this.isGroup = !0), (this.type = "Group"));
  }
}
const oh = { type: "move" };
class Lr {
  constructor() {
    ((this._targetRay = null), (this._grip = null), (this._hand = null));
  }
  getHandSpace() {
    return (
      this._hand === null &&
        ((this._hand = new Zn()),
        (this._hand.matrixAutoUpdate = !1),
        (this._hand.visible = !1),
        (this._hand.joints = {}),
        (this._hand.inputState = { pinching: !1 })),
      this._hand
    );
  }
  getTargetRaySpace() {
    return (
      this._targetRay === null &&
        ((this._targetRay = new Zn()),
        (this._targetRay.matrixAutoUpdate = !1),
        (this._targetRay.visible = !1),
        (this._targetRay.hasLinearVelocity = !1),
        (this._targetRay.linearVelocity = new D()),
        (this._targetRay.hasAngularVelocity = !1),
        (this._targetRay.angularVelocity = new D())),
      this._targetRay
    );
  }
  getGripSpace() {
    return (
      this._grip === null &&
        ((this._grip = new Zn()),
        (this._grip.matrixAutoUpdate = !1),
        (this._grip.visible = !1),
        (this._grip.hasLinearVelocity = !1),
        (this._grip.linearVelocity = new D()),
        (this._grip.hasAngularVelocity = !1),
        (this._grip.angularVelocity = new D())),
      this._grip
    );
  }
  dispatchEvent(e) {
    return (
      this._targetRay !== null && this._targetRay.dispatchEvent(e),
      this._grip !== null && this._grip.dispatchEvent(e),
      this._hand !== null && this._hand.dispatchEvent(e),
      this
    );
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t) for (const n of e.hand.values()) this._getHandJoint(t, n);
    }
    return (this.dispatchEvent({ type: "connected", data: e }), this);
  }
  disconnect(e) {
    return (
      this.dispatchEvent({ type: "disconnected", data: e }),
      this._targetRay !== null && (this._targetRay.visible = !1),
      this._grip !== null && (this._grip.visible = !1),
      this._hand !== null && (this._hand.visible = !1),
      this
    );
  }
  update(e, t, n) {
    let s = null,
      r = null,
      a = null;
    const o = this._targetRay,
      c = this._grip,
      l = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (l && e.hand) {
        a = !0;
        for (const x of e.hand.values()) {
          const m = t.getJointPose(x, n),
            p = this._getHandJoint(l, x);
          (m !== null &&
            (p.matrix.fromArray(m.transform.matrix),
            p.matrix.decompose(p.position, p.rotation, p.scale),
            (p.matrixWorldNeedsUpdate = !0),
            (p.jointRadius = m.radius)),
            (p.visible = m !== null));
        }
        const u = l.joints["index-finger-tip"],
          f = l.joints["thumb-tip"],
          h = u.position.distanceTo(f.position),
          d = 0.02,
          g = 0.005;
        l.inputState.pinching && h > d + g
          ? ((l.inputState.pinching = !1),
            this.dispatchEvent({
              type: "pinchend",
              handedness: e.handedness,
              target: this,
            }))
          : !l.inputState.pinching &&
            h <= d - g &&
            ((l.inputState.pinching = !0),
            this.dispatchEvent({
              type: "pinchstart",
              handedness: e.handedness,
              target: this,
            }));
      } else
        c !== null &&
          e.gripSpace &&
          ((r = t.getPose(e.gripSpace, n)),
          r !== null &&
            (c.matrix.fromArray(r.transform.matrix),
            c.matrix.decompose(c.position, c.rotation, c.scale),
            (c.matrixWorldNeedsUpdate = !0),
            r.linearVelocity
              ? ((c.hasLinearVelocity = !0),
                c.linearVelocity.copy(r.linearVelocity))
              : (c.hasLinearVelocity = !1),
            r.angularVelocity
              ? ((c.hasAngularVelocity = !0),
                c.angularVelocity.copy(r.angularVelocity))
              : (c.hasAngularVelocity = !1)));
      o !== null &&
        ((s = t.getPose(e.targetRaySpace, n)),
        s === null && r !== null && (s = r),
        s !== null &&
          (o.matrix.fromArray(s.transform.matrix),
          o.matrix.decompose(o.position, o.rotation, o.scale),
          (o.matrixWorldNeedsUpdate = !0),
          s.linearVelocity
            ? ((o.hasLinearVelocity = !0),
              o.linearVelocity.copy(s.linearVelocity))
            : (o.hasLinearVelocity = !1),
          s.angularVelocity
            ? ((o.hasAngularVelocity = !0),
              o.angularVelocity.copy(s.angularVelocity))
            : (o.hasAngularVelocity = !1),
          this.dispatchEvent(oh)));
    }
    return (
      o !== null && (o.visible = s !== null),
      c !== null && (c.visible = r !== null),
      l !== null && (l.visible = a !== null),
      this
    );
  }
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new Zn();
      ((n.matrixAutoUpdate = !1),
        (n.visible = !1),
        (e.joints[t.jointName] = n),
        e.add(n));
    }
    return e.joints[t.jointName];
  }
}
const xc = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  },
  bn = { h: 0, s: 0, l: 0 },
  Ms = { h: 0, s: 0, l: 0 };
function Dr(i, e, t) {
  return (
    t < 0 && (t += 1),
    t > 1 && (t -= 1),
    t < 1 / 6
      ? i + (e - i) * 6 * t
      : t < 1 / 2
        ? e
        : t < 2 / 3
          ? i + (e - i) * 6 * (2 / 3 - t)
          : i
  );
}
class He {
  constructor(e, t, n) {
    return (
      (this.isColor = !0),
      (this.r = 1),
      (this.g = 1),
      (this.b = 1),
      this.set(e, t, n)
    );
  }
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const s = e;
      s && s.isColor
        ? this.copy(s)
        : typeof s == "number"
          ? this.setHex(s)
          : typeof s == "string" && this.setStyle(s);
    } else this.setRGB(e, t, n);
    return this;
  }
  setScalar(e) {
    return ((this.r = e), (this.g = e), (this.b = e), this);
  }
  setHex(e, t = Nt) {
    return (
      (e = Math.floor(e)),
      (this.r = ((e >> 16) & 255) / 255),
      (this.g = ((e >> 8) & 255) / 255),
      (this.b = (e & 255) / 255),
      et.colorSpaceToWorking(this, t),
      this
    );
  }
  setRGB(e, t, n, s = et.workingColorSpace) {
    return (
      (this.r = e),
      (this.g = t),
      (this.b = n),
      et.colorSpaceToWorking(this, s),
      this
    );
  }
  setHSL(e, t, n, s = et.workingColorSpace) {
    if (((e = So(e, 1)), (t = Ye(t, 0, 1)), (n = Ye(n, 0, 1)), t === 0))
      this.r = this.g = this.b = n;
    else {
      const r = n <= 0.5 ? n * (1 + t) : n + t - n * t,
        a = 2 * n - r;
      ((this.r = Dr(a, r, e + 1 / 3)),
        (this.g = Dr(a, r, e)),
        (this.b = Dr(a, r, e - 1 / 3)));
    }
    return (et.colorSpaceToWorking(this, s), this);
  }
  setStyle(e, t = Nt) {
    function n(r) {
      r !== void 0 &&
        parseFloat(r) < 1 &&
        Ve("Color: Alpha component of " + e + " will be ignored.");
    }
    let s;
    if ((s = /^(\w+)\(([^\)]*)\)/.exec(e))) {
      let r;
      const a = s[1],
        o = s[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (
            (r =
              /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                o,
              ))
          )
            return (
              n(r[4]),
              this.setRGB(
                Math.min(255, parseInt(r[1], 10)) / 255,
                Math.min(255, parseInt(r[2], 10)) / 255,
                Math.min(255, parseInt(r[3], 10)) / 255,
                t,
              )
            );
          if (
            (r =
              /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                o,
              ))
          )
            return (
              n(r[4]),
              this.setRGB(
                Math.min(100, parseInt(r[1], 10)) / 100,
                Math.min(100, parseInt(r[2], 10)) / 100,
                Math.min(100, parseInt(r[3], 10)) / 100,
                t,
              )
            );
          break;
        case "hsl":
        case "hsla":
          if (
            (r =
              /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                o,
              ))
          )
            return (
              n(r[4]),
              this.setHSL(
                parseFloat(r[1]) / 360,
                parseFloat(r[2]) / 100,
                parseFloat(r[3]) / 100,
                t,
              )
            );
          break;
        default:
          Ve("Color: Unknown color model " + e);
      }
    } else if ((s = /^\#([A-Fa-f\d]+)$/.exec(e))) {
      const r = s[1],
        a = r.length;
      if (a === 3)
        return this.setRGB(
          parseInt(r.charAt(0), 16) / 15,
          parseInt(r.charAt(1), 16) / 15,
          parseInt(r.charAt(2), 16) / 15,
          t,
        );
      if (a === 6) return this.setHex(parseInt(r, 16), t);
      Ve("Color: Invalid hex color " + e);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = Nt) {
    const n = xc[e.toLowerCase()];
    return (
      n !== void 0 ? this.setHex(n, t) : Ve("Color: Unknown color " + e),
      this
    );
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return ((this.r = e.r), (this.g = e.g), (this.b = e.b), this);
  }
  copySRGBToLinear(e) {
    return ((this.r = xn(e.r)), (this.g = xn(e.g)), (this.b = xn(e.b)), this);
  }
  copyLinearToSRGB(e) {
    return ((this.r = Ei(e.r)), (this.g = Ei(e.g)), (this.b = Ei(e.b)), this);
  }
  convertSRGBToLinear() {
    return (this.copySRGBToLinear(this), this);
  }
  convertLinearToSRGB() {
    return (this.copyLinearToSRGB(this), this);
  }
  getHex(e = Nt) {
    return (
      et.workingToColorSpace(wt.copy(this), e),
      Math.round(Ye(wt.r * 255, 0, 255)) * 65536 +
        Math.round(Ye(wt.g * 255, 0, 255)) * 256 +
        Math.round(Ye(wt.b * 255, 0, 255))
    );
  }
  getHexString(e = Nt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = et.workingColorSpace) {
    et.workingToColorSpace(wt.copy(this), t);
    const n = wt.r,
      s = wt.g,
      r = wt.b,
      a = Math.max(n, s, r),
      o = Math.min(n, s, r);
    let c, l;
    const u = (o + a) / 2;
    if (o === a) ((c = 0), (l = 0));
    else {
      const f = a - o;
      switch (((l = u <= 0.5 ? f / (a + o) : f / (2 - a - o)), a)) {
        case n:
          c = (s - r) / f + (s < r ? 6 : 0);
          break;
        case s:
          c = (r - n) / f + 2;
          break;
        case r:
          c = (n - s) / f + 4;
          break;
      }
      c /= 6;
    }
    return ((e.h = c), (e.s = l), (e.l = u), e);
  }
  getRGB(e, t = et.workingColorSpace) {
    return (
      et.workingToColorSpace(wt.copy(this), t),
      (e.r = wt.r),
      (e.g = wt.g),
      (e.b = wt.b),
      e
    );
  }
  getStyle(e = Nt) {
    et.workingToColorSpace(wt.copy(this), e);
    const t = wt.r,
      n = wt.g,
      s = wt.b;
    return e !== Nt
      ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`
      : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(s * 255)})`;
  }
  offsetHSL(e, t, n) {
    return (this.getHSL(bn), this.setHSL(bn.h + e, bn.s + t, bn.l + n));
  }
  add(e) {
    return ((this.r += e.r), (this.g += e.g), (this.b += e.b), this);
  }
  addColors(e, t) {
    return (
      (this.r = e.r + t.r),
      (this.g = e.g + t.g),
      (this.b = e.b + t.b),
      this
    );
  }
  addScalar(e) {
    return ((this.r += e), (this.g += e), (this.b += e), this);
  }
  sub(e) {
    return (
      (this.r = Math.max(0, this.r - e.r)),
      (this.g = Math.max(0, this.g - e.g)),
      (this.b = Math.max(0, this.b - e.b)),
      this
    );
  }
  multiply(e) {
    return ((this.r *= e.r), (this.g *= e.g), (this.b *= e.b), this);
  }
  multiplyScalar(e) {
    return ((this.r *= e), (this.g *= e), (this.b *= e), this);
  }
  lerp(e, t) {
    return (
      (this.r += (e.r - this.r) * t),
      (this.g += (e.g - this.g) * t),
      (this.b += (e.b - this.b) * t),
      this
    );
  }
  lerpColors(e, t, n) {
    return (
      (this.r = e.r + (t.r - e.r) * n),
      (this.g = e.g + (t.g - e.g) * n),
      (this.b = e.b + (t.b - e.b) * n),
      this
    );
  }
  lerpHSL(e, t) {
    (this.getHSL(bn), e.getHSL(Ms));
    const n = Qi(bn.h, Ms.h, t),
      s = Qi(bn.s, Ms.s, t),
      r = Qi(bn.l, Ms.l, t);
    return (this.setHSL(n, s, r), this);
  }
  setFromVector3(e) {
    return ((this.r = e.x), (this.g = e.y), (this.b = e.z), this);
  }
  applyMatrix3(e) {
    const t = this.r,
      n = this.g,
      s = this.b,
      r = e.elements;
    return (
      (this.r = r[0] * t + r[3] * n + r[6] * s),
      (this.g = r[1] * t + r[4] * n + r[7] * s),
      (this.b = r[2] * t + r[5] * n + r[8] * s),
      this
    );
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return ((this.r = e[t]), (this.g = e[t + 1]), (this.b = e[t + 2]), this);
  }
  toArray(e = [], t = 0) {
    return ((e[t] = this.r), (e[t + 1] = this.g), (e[t + 2] = this.b), e);
  }
  fromBufferAttribute(e, t) {
    return (
      (this.r = e.getX(t)),
      (this.g = e.getY(t)),
      (this.b = e.getZ(t)),
      this
    );
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    (yield this.r, yield this.g, yield this.b);
  }
}
const wt = new He();
He.NAMES = xc;
class lh extends St {
  constructor() {
    (super(),
      (this.isScene = !0),
      (this.type = "Scene"),
      (this.background = null),
      (this.environment = null),
      (this.fog = null),
      (this.backgroundBlurriness = 0),
      (this.backgroundIntensity = 1),
      (this.backgroundRotation = new ln()),
      (this.environmentIntensity = 1),
      (this.environmentRotation = new ln()),
      (this.overrideMaterial = null),
      typeof __THREE_DEVTOOLS__ < "u" &&
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent("observe", { detail: this }),
        ));
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      e.background !== null && (this.background = e.background.clone()),
      e.environment !== null && (this.environment = e.environment.clone()),
      e.fog !== null && (this.fog = e.fog.clone()),
      (this.backgroundBlurriness = e.backgroundBlurriness),
      (this.backgroundIntensity = e.backgroundIntensity),
      this.backgroundRotation.copy(e.backgroundRotation),
      (this.environmentIntensity = e.environmentIntensity),
      this.environmentRotation.copy(e.environmentRotation),
      e.overrideMaterial !== null &&
        (this.overrideMaterial = e.overrideMaterial.clone()),
      (this.matrixAutoUpdate = e.matrixAutoUpdate),
      this
    );
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (
      this.fog !== null && (t.object.fog = this.fog.toJSON()),
      this.backgroundBlurriness > 0 &&
        (t.object.backgroundBlurriness = this.backgroundBlurriness),
      this.backgroundIntensity !== 1 &&
        (t.object.backgroundIntensity = this.backgroundIntensity),
      (t.object.backgroundRotation = this.backgroundRotation.toArray()),
      this.environmentIntensity !== 1 &&
        (t.object.environmentIntensity = this.environmentIntensity),
      (t.object.environmentRotation = this.environmentRotation.toArray()),
      t
    );
  }
}
const Jt = new D(),
  fn = new D(),
  Ir = new D(),
  dn = new D(),
  li = new D(),
  ci = new D(),
  ol = new D(),
  Ur = new D(),
  Nr = new D(),
  Fr = new D(),
  Or = new dt(),
  Br = new dt(),
  zr = new dt();
class Xt {
  constructor(e = new D(), t = new D(), n = new D()) {
    ((this.a = e), (this.b = t), (this.c = n));
  }
  static getNormal(e, t, n, s) {
    (s.subVectors(n, t), Jt.subVectors(e, t), s.cross(Jt));
    const r = s.lengthSq();
    return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
  }
  static getBarycoord(e, t, n, s, r) {
    (Jt.subVectors(s, t), fn.subVectors(n, t), Ir.subVectors(e, t));
    const a = Jt.dot(Jt),
      o = Jt.dot(fn),
      c = Jt.dot(Ir),
      l = fn.dot(fn),
      u = fn.dot(Ir),
      f = a * l - o * o;
    if (f === 0) return (r.set(0, 0, 0), null);
    const h = 1 / f,
      d = (l * c - o * u) * h,
      g = (a * u - o * c) * h;
    return r.set(1 - d - g, g, d);
  }
  static containsPoint(e, t, n, s) {
    return this.getBarycoord(e, t, n, s, dn) === null
      ? !1
      : dn.x >= 0 && dn.y >= 0 && dn.x + dn.y <= 1;
  }
  static getInterpolation(e, t, n, s, r, a, o, c) {
    return this.getBarycoord(e, t, n, s, dn) === null
      ? ((c.x = 0),
        (c.y = 0),
        "z" in c && (c.z = 0),
        "w" in c && (c.w = 0),
        null)
      : (c.setScalar(0),
        c.addScaledVector(r, dn.x),
        c.addScaledVector(a, dn.y),
        c.addScaledVector(o, dn.z),
        c);
  }
  static getInterpolatedAttribute(e, t, n, s, r, a) {
    return (
      Or.setScalar(0),
      Br.setScalar(0),
      zr.setScalar(0),
      Or.fromBufferAttribute(e, t),
      Br.fromBufferAttribute(e, n),
      zr.fromBufferAttribute(e, s),
      a.setScalar(0),
      a.addScaledVector(Or, r.x),
      a.addScaledVector(Br, r.y),
      a.addScaledVector(zr, r.z),
      a
    );
  }
  static isFrontFacing(e, t, n, s) {
    return (Jt.subVectors(n, t), fn.subVectors(e, t), Jt.cross(fn).dot(s) < 0);
  }
  set(e, t, n) {
    return (this.a.copy(e), this.b.copy(t), this.c.copy(n), this);
  }
  setFromPointsAndIndices(e, t, n, s) {
    return (this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[s]), this);
  }
  setFromAttributeAndIndices(e, t, n, s) {
    return (
      this.a.fromBufferAttribute(e, t),
      this.b.fromBufferAttribute(e, n),
      this.c.fromBufferAttribute(e, s),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return (this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this);
  }
  getArea() {
    return (
      Jt.subVectors(this.c, this.b),
      fn.subVectors(this.a, this.b),
      Jt.cross(fn).length() * 0.5
    );
  }
  getMidpoint(e) {
    return e
      .addVectors(this.a, this.b)
      .add(this.c)
      .multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return Xt.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return Xt.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, n, s, r) {
    return Xt.getInterpolation(e, this.a, this.b, this.c, t, n, s, r);
  }
  containsPoint(e) {
    return Xt.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return Xt.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const n = this.a,
      s = this.b,
      r = this.c;
    let a, o;
    (li.subVectors(s, n), ci.subVectors(r, n), Ur.subVectors(e, n));
    const c = li.dot(Ur),
      l = ci.dot(Ur);
    if (c <= 0 && l <= 0) return t.copy(n);
    Nr.subVectors(e, s);
    const u = li.dot(Nr),
      f = ci.dot(Nr);
    if (u >= 0 && f <= u) return t.copy(s);
    const h = c * f - u * l;
    if (h <= 0 && c >= 0 && u <= 0)
      return ((a = c / (c - u)), t.copy(n).addScaledVector(li, a));
    Fr.subVectors(e, r);
    const d = li.dot(Fr),
      g = ci.dot(Fr);
    if (g >= 0 && d <= g) return t.copy(r);
    const x = d * l - c * g;
    if (x <= 0 && l >= 0 && g <= 0)
      return ((o = l / (l - g)), t.copy(n).addScaledVector(ci, o));
    const m = u * g - d * f;
    if (m <= 0 && f - u >= 0 && d - g >= 0)
      return (
        ol.subVectors(r, s),
        (o = (f - u) / (f - u + (d - g))),
        t.copy(s).addScaledVector(ol, o)
      );
    const p = 1 / (m + x + h);
    return (
      (a = x * p),
      (o = h * p),
      t.copy(n).addScaledVector(li, a).addScaledVector(ci, o)
    );
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
class ei {
  constructor(
    e = new D(1 / 0, 1 / 0, 1 / 0),
    t = new D(-1 / 0, -1 / 0, -1 / 0),
  ) {
    ((this.isBox3 = !0), (this.min = e), (this.max = t));
  }
  set(e, t) {
    return (this.min.copy(e), this.max.copy(t), this);
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(Zt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(Zt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = Zt.copy(t).multiplyScalar(0.5);
    return (this.min.copy(e).sub(n), this.max.copy(e).add(n), this);
  }
  setFromObject(e, t = !1) {
    return (this.makeEmpty(), this.expandByObject(e, t));
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return (this.min.copy(e.min), this.max.copy(e.max), this);
  }
  makeEmpty() {
    return (
      (this.min.x = this.min.y = this.min.z = 1 / 0),
      (this.max.x = this.max.y = this.max.z = -1 / 0),
      this
    );
  }
  isEmpty() {
    return (
      this.max.x < this.min.x ||
      this.max.y < this.min.y ||
      this.max.z < this.min.z
    );
  }
  getCenter(e) {
    return this.isEmpty()
      ? e.set(0, 0, 0)
      : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return (this.min.min(e), this.max.max(e), this);
  }
  expandByVector(e) {
    return (this.min.sub(e), this.max.add(e), this);
  }
  expandByScalar(e) {
    return (this.min.addScalar(-e), this.max.addScalar(e), this);
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const r = n.getAttribute("position");
      if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0)
        for (let a = 0, o = r.count; a < o; a++)
          (e.isMesh === !0
            ? e.getVertexPosition(a, Zt)
            : Zt.fromBufferAttribute(r, a),
            Zt.applyMatrix4(e.matrixWorld),
            this.expandByPoint(Zt));
      else
        (e.boundingBox !== void 0
          ? (e.boundingBox === null && e.computeBoundingBox(),
            Ss.copy(e.boundingBox))
          : (n.boundingBox === null && n.computeBoundingBox(),
            Ss.copy(n.boundingBox)),
          Ss.applyMatrix4(e.matrixWorld),
          this.union(Ss));
    }
    const s = e.children;
    for (let r = 0, a = s.length; r < a; r++) this.expandByObject(s[r], t);
    return this;
  }
  containsPoint(e) {
    return (
      e.x >= this.min.x &&
      e.x <= this.max.x &&
      e.y >= this.min.y &&
      e.y <= this.max.y &&
      e.z >= this.min.z &&
      e.z <= this.max.z
    );
  }
  containsBox(e) {
    return (
      this.min.x <= e.min.x &&
      e.max.x <= this.max.x &&
      this.min.y <= e.min.y &&
      e.max.y <= this.max.y &&
      this.min.z <= e.min.z &&
      e.max.z <= this.max.z
    );
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z),
    );
  }
  intersectsBox(e) {
    return (
      e.max.x >= this.min.x &&
      e.min.x <= this.max.x &&
      e.max.y >= this.min.y &&
      e.min.y <= this.max.y &&
      e.max.z >= this.min.z &&
      e.min.z <= this.max.z
    );
  }
  intersectsSphere(e) {
    return (
      this.clampPoint(e.center, Zt),
      Zt.distanceToSquared(e.center) <= e.radius * e.radius
    );
  }
  intersectsPlane(e) {
    let t, n;
    return (
      e.normal.x > 0
        ? ((t = e.normal.x * this.min.x), (n = e.normal.x * this.max.x))
        : ((t = e.normal.x * this.max.x), (n = e.normal.x * this.min.x)),
      e.normal.y > 0
        ? ((t += e.normal.y * this.min.y), (n += e.normal.y * this.max.y))
        : ((t += e.normal.y * this.max.y), (n += e.normal.y * this.min.y)),
      e.normal.z > 0
        ? ((t += e.normal.z * this.min.z), (n += e.normal.z * this.max.z))
        : ((t += e.normal.z * this.max.z), (n += e.normal.z * this.min.z)),
      t <= -e.constant && n >= -e.constant
    );
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    (this.getCenter(Gi),
      ys.subVectors(this.max, Gi),
      ui.subVectors(e.a, Gi),
      hi.subVectors(e.b, Gi),
      fi.subVectors(e.c, Gi),
      Tn.subVectors(hi, ui),
      An.subVectors(fi, hi),
      On.subVectors(ui, fi));
    let t = [
      0,
      -Tn.z,
      Tn.y,
      0,
      -An.z,
      An.y,
      0,
      -On.z,
      On.y,
      Tn.z,
      0,
      -Tn.x,
      An.z,
      0,
      -An.x,
      On.z,
      0,
      -On.x,
      -Tn.y,
      Tn.x,
      0,
      -An.y,
      An.x,
      0,
      -On.y,
      On.x,
      0,
    ];
    return !Vr(t, ui, hi, fi, ys) ||
      ((t = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !Vr(t, ui, hi, fi, ys))
      ? !1
      : (Es.crossVectors(Tn, An),
        (t = [Es.x, Es.y, Es.z]),
        Vr(t, ui, hi, fi, ys));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Zt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return (
      this.isEmpty()
        ? e.makeEmpty()
        : (this.getCenter(e.center),
          (e.radius = this.getSize(Zt).length() * 0.5)),
      e
    );
  }
  intersect(e) {
    return (
      this.min.max(e.min),
      this.max.min(e.max),
      this.isEmpty() && this.makeEmpty(),
      this
    );
  }
  union(e) {
    return (this.min.min(e.min), this.max.max(e.max), this);
  }
  applyMatrix4(e) {
    return this.isEmpty()
      ? this
      : (pn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
        pn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
        pn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
        pn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
        pn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
        pn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
        pn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
        pn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
        this.setFromPoints(pn),
        this);
  }
  translate(e) {
    return (this.min.add(e), this.max.add(e), this);
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  toJSON() {
    return { min: this.min.toArray(), max: this.max.toArray() };
  }
  fromJSON(e) {
    return (this.min.fromArray(e.min), this.max.fromArray(e.max), this);
  }
}
const pn = [
    new D(),
    new D(),
    new D(),
    new D(),
    new D(),
    new D(),
    new D(),
    new D(),
  ],
  Zt = new D(),
  Ss = new ei(),
  ui = new D(),
  hi = new D(),
  fi = new D(),
  Tn = new D(),
  An = new D(),
  On = new D(),
  Gi = new D(),
  ys = new D(),
  Es = new D(),
  Bn = new D();
function Vr(i, e, t, n, s) {
  for (let r = 0, a = i.length - 3; r <= a; r += 3) {
    Bn.fromArray(i, r);
    const o =
        s.x * Math.abs(Bn.x) + s.y * Math.abs(Bn.y) + s.z * Math.abs(Bn.z),
      c = e.dot(Bn),
      l = t.dot(Bn),
      u = n.dot(Bn);
    if (Math.max(-Math.max(c, l, u), Math.min(c, l, u)) > o) return !1;
  }
  return !0;
}
const mt = new D(),
  bs = new ue();
let ch = 0;
class Qt {
  constructor(e, t, n = !1) {
    if (Array.isArray(e))
      throw new TypeError(
        "THREE.BufferAttribute: array should be a Typed Array.",
      );
    ((this.isBufferAttribute = !0),
      Object.defineProperty(this, "id", { value: ch++ }),
      (this.name = ""),
      (this.array = e),
      (this.itemSize = t),
      (this.count = e !== void 0 ? e.length / t : 0),
      (this.normalized = n),
      (this.usage = qo),
      (this.updateRanges = []),
      (this.gpuType = $t),
      (this.version = 0));
  }
  onUploadCallback() {}
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return ((this.usage = e), this);
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return (
      (this.name = e.name),
      (this.array = new e.array.constructor(e.array)),
      (this.itemSize = e.itemSize),
      (this.count = e.count),
      (this.normalized = e.normalized),
      (this.usage = e.usage),
      (this.gpuType = e.gpuType),
      this
    );
  }
  copyAt(e, t, n) {
    ((e *= this.itemSize), (n *= t.itemSize));
    for (let s = 0, r = this.itemSize; s < r; s++)
      this.array[e + s] = t.array[n + s];
    return this;
  }
  copyArray(e) {
    return (this.array.set(e), this);
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        (bs.fromBufferAttribute(this, t),
          bs.applyMatrix3(e),
          this.setXY(t, bs.x, bs.y));
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        (mt.fromBufferAttribute(this, t),
          mt.applyMatrix3(e),
          this.setXYZ(t, mt.x, mt.y, mt.z));
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      (mt.fromBufferAttribute(this, t),
        mt.applyMatrix4(e),
        this.setXYZ(t, mt.x, mt.y, mt.z));
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      (mt.fromBufferAttribute(this, t),
        mt.applyNormalMatrix(e),
        this.setXYZ(t, mt.x, mt.y, mt.z));
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      (mt.fromBufferAttribute(this, t),
        mt.transformDirection(e),
        this.setXYZ(t, mt.x, mt.y, mt.z));
    return this;
  }
  set(e, t = 0) {
    return (this.array.set(e, t), this);
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return (this.normalized && (n = xi(n, this.array)), n);
  }
  setComponent(e, t, n) {
    return (
      this.normalized && (n = Lt(n, this.array)),
      (this.array[e * this.itemSize + t] = n),
      this
    );
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return (this.normalized && (t = xi(t, this.array)), t);
  }
  setX(e, t) {
    return (
      this.normalized && (t = Lt(t, this.array)),
      (this.array[e * this.itemSize] = t),
      this
    );
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return (this.normalized && (t = xi(t, this.array)), t);
  }
  setY(e, t) {
    return (
      this.normalized && (t = Lt(t, this.array)),
      (this.array[e * this.itemSize + 1] = t),
      this
    );
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return (this.normalized && (t = xi(t, this.array)), t);
  }
  setZ(e, t) {
    return (
      this.normalized && (t = Lt(t, this.array)),
      (this.array[e * this.itemSize + 2] = t),
      this
    );
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return (this.normalized && (t = xi(t, this.array)), t);
  }
  setW(e, t) {
    return (
      this.normalized && (t = Lt(t, this.array)),
      (this.array[e * this.itemSize + 3] = t),
      this
    );
  }
  setXY(e, t, n) {
    return (
      (e *= this.itemSize),
      this.normalized && ((t = Lt(t, this.array)), (n = Lt(n, this.array))),
      (this.array[e + 0] = t),
      (this.array[e + 1] = n),
      this
    );
  }
  setXYZ(e, t, n, s) {
    return (
      (e *= this.itemSize),
      this.normalized &&
        ((t = Lt(t, this.array)),
        (n = Lt(n, this.array)),
        (s = Lt(s, this.array))),
      (this.array[e + 0] = t),
      (this.array[e + 1] = n),
      (this.array[e + 2] = s),
      this
    );
  }
  setXYZW(e, t, n, s, r) {
    return (
      (e *= this.itemSize),
      this.normalized &&
        ((t = Lt(t, this.array)),
        (n = Lt(n, this.array)),
        (s = Lt(s, this.array)),
        (r = Lt(r, this.array))),
      (this.array[e + 0] = t),
      (this.array[e + 1] = n),
      (this.array[e + 2] = s),
      (this.array[e + 3] = r),
      this
    );
  }
  onUpload(e) {
    return ((this.onUploadCallback = e), this);
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized,
    };
    return (
      this.name !== "" && (e.name = this.name),
      this.usage !== qo && (e.usage = this.usage),
      e
    );
  }
}
class Mc extends Qt {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class Sc extends Qt {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class $e extends Qt {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
const uh = new ei(),
  Hi = new D(),
  Gr = new D();
class Ui {
  constructor(e = new D(), t = -1) {
    ((this.isSphere = !0), (this.center = e), (this.radius = t));
  }
  set(e, t) {
    return (this.center.copy(e), (this.radius = t), this);
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : uh.setFromPoints(e).getCenter(n);
    let s = 0;
    for (let r = 0, a = e.length; r < a; r++)
      s = Math.max(s, n.distanceToSquared(e[r]));
    return ((this.radius = Math.sqrt(s)), this);
  }
  copy(e) {
    return (this.center.copy(e.center), (this.radius = e.radius), this);
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return (this.center.set(0, 0, 0), (this.radius = -1), this);
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return (
      t.copy(e),
      n > this.radius * this.radius &&
        (t.sub(this.center).normalize(),
        t.multiplyScalar(this.radius).add(this.center)),
      t
    );
  }
  getBoundingBox(e) {
    return this.isEmpty()
      ? (e.makeEmpty(), e)
      : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return (
      this.center.applyMatrix4(e),
      (this.radius = this.radius * e.getMaxScaleOnAxis()),
      this
    );
  }
  translate(e) {
    return (this.center.add(e), this);
  }
  expandByPoint(e) {
    if (this.isEmpty()) return (this.center.copy(e), (this.radius = 0), this);
    Hi.subVectors(e, this.center);
    const t = Hi.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t),
        s = (n - this.radius) * 0.5;
      (this.center.addScaledVector(Hi, s / n), (this.radius += s));
    }
    return this;
  }
  union(e) {
    return e.isEmpty()
      ? this
      : this.isEmpty()
        ? (this.copy(e), this)
        : (this.center.equals(e.center) === !0
            ? (this.radius = Math.max(this.radius, e.radius))
            : (Gr.subVectors(e.center, this.center).setLength(e.radius),
              this.expandByPoint(Hi.copy(e.center).add(Gr)),
              this.expandByPoint(Hi.copy(e.center).sub(Gr))),
          this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    return { radius: this.radius, center: this.center.toArray() };
  }
  fromJSON(e) {
    return ((this.radius = e.radius), this.center.fromArray(e.center), this);
  }
}
let hh = 0;
const kt = new ot(),
  Hr = new St(),
  di = new D(),
  Vt = new ei(),
  ki = new ei(),
  xt = new D();
class ut extends Di {
  constructor() {
    (super(),
      (this.isBufferGeometry = !0),
      Object.defineProperty(this, "id", { value: hh++ }),
      (this.uuid = Qn()),
      (this.name = ""),
      (this.type = "BufferGeometry"),
      (this.index = null),
      (this.indirect = null),
      (this.indirectOffset = 0),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.morphTargetsRelative = !1),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null),
      (this.drawRange = { start: 0, count: 1 / 0 }),
      (this.userData = {}));
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return (
      Array.isArray(e)
        ? (this.index = new (Ru(e) ? Sc : Mc)(e, 1))
        : (this.index = e),
      this
    );
  }
  setIndirect(e, t = 0) {
    return ((this.indirect = e), (this.indirectOffset = t), this);
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return ((this.attributes[e] = t), this);
  }
  deleteAttribute(e) {
    return (delete this.attributes[e], this);
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, t, n = 0) {
    this.groups.push({ start: e, count: t, materialIndex: n });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    ((this.drawRange.start = e), (this.drawRange.count = t));
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), (t.needsUpdate = !0));
    const n = this.attributes.normal;
    if (n !== void 0) {
      const r = new We().getNormalMatrix(e);
      (n.applyNormalMatrix(r), (n.needsUpdate = !0));
    }
    const s = this.attributes.tangent;
    return (
      s !== void 0 && (s.transformDirection(e), (s.needsUpdate = !0)),
      this.boundingBox !== null && this.computeBoundingBox(),
      this.boundingSphere !== null && this.computeBoundingSphere(),
      this
    );
  }
  applyQuaternion(e) {
    return (kt.makeRotationFromQuaternion(e), this.applyMatrix4(kt), this);
  }
  rotateX(e) {
    return (kt.makeRotationX(e), this.applyMatrix4(kt), this);
  }
  rotateY(e) {
    return (kt.makeRotationY(e), this.applyMatrix4(kt), this);
  }
  rotateZ(e) {
    return (kt.makeRotationZ(e), this.applyMatrix4(kt), this);
  }
  translate(e, t, n) {
    return (kt.makeTranslation(e, t, n), this.applyMatrix4(kt), this);
  }
  scale(e, t, n) {
    return (kt.makeScale(e, t, n), this.applyMatrix4(kt), this);
  }
  lookAt(e) {
    return (
      Hr.lookAt(e),
      Hr.updateMatrix(),
      this.applyMatrix4(Hr.matrix),
      this
    );
  }
  center() {
    return (
      this.computeBoundingBox(),
      this.boundingBox.getCenter(di).negate(),
      this.translate(di.x, di.y, di.z),
      this
    );
  }
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const n = [];
      for (let s = 0, r = e.length; s < r; s++) {
        const a = e[s];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new $e(n, 3));
    } else {
      const n = Math.min(e.length, t.count);
      for (let s = 0; s < n; s++) {
        const r = e[s];
        t.setXYZ(s, r.x, r.y, r.z || 0);
      }
      (e.length > t.count &&
        Ve(
          "BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.",
        ),
        (t.needsUpdate = !0));
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new ei());
    const e = this.attributes.position,
      t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      (Qe(
        "BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",
        this,
      ),
        this.boundingBox.set(
          new D(-1 / 0, -1 / 0, -1 / 0),
          new D(1 / 0, 1 / 0, 1 / 0),
        ));
      return;
    }
    if (e !== void 0) {
      if ((this.boundingBox.setFromBufferAttribute(e), t))
        for (let n = 0, s = t.length; n < s; n++) {
          const r = t[n];
          (Vt.setFromBufferAttribute(r),
            this.morphTargetsRelative
              ? (xt.addVectors(this.boundingBox.min, Vt.min),
                this.boundingBox.expandByPoint(xt),
                xt.addVectors(this.boundingBox.max, Vt.max),
                this.boundingBox.expandByPoint(xt))
              : (this.boundingBox.expandByPoint(Vt.min),
                this.boundingBox.expandByPoint(Vt.max)));
        }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) ||
      isNaN(this.boundingBox.min.y) ||
      isNaN(this.boundingBox.min.z)) &&
      Qe(
        'BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
        this,
      );
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Ui());
    const e = this.attributes.position,
      t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      (Qe(
        "BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",
        this,
      ),
        this.boundingSphere.set(new D(), 1 / 0));
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if ((Vt.setFromBufferAttribute(e), t))
        for (let r = 0, a = t.length; r < a; r++) {
          const o = t[r];
          (ki.setFromBufferAttribute(o),
            this.morphTargetsRelative
              ? (xt.addVectors(Vt.min, ki.min),
                Vt.expandByPoint(xt),
                xt.addVectors(Vt.max, ki.max),
                Vt.expandByPoint(xt))
              : (Vt.expandByPoint(ki.min), Vt.expandByPoint(ki.max)));
        }
      Vt.getCenter(n);
      let s = 0;
      for (let r = 0, a = e.count; r < a; r++)
        (xt.fromBufferAttribute(e, r),
          (s = Math.max(s, n.distanceToSquared(xt))));
      if (t)
        for (let r = 0, a = t.length; r < a; r++) {
          const o = t[r],
            c = this.morphTargetsRelative;
          for (let l = 0, u = o.count; l < u; l++)
            (xt.fromBufferAttribute(o, l),
              c && (di.fromBufferAttribute(e, l), xt.add(di)),
              (s = Math.max(s, n.distanceToSquared(xt))));
        }
      ((this.boundingSphere.radius = Math.sqrt(s)),
        isNaN(this.boundingSphere.radius) &&
          Qe(
            'BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
            this,
          ));
    }
  }
  computeTangents() {
    const e = this.index,
      t = this.attributes;
    if (
      e === null ||
      t.position === void 0 ||
      t.normal === void 0 ||
      t.uv === void 0
    ) {
      Qe(
        "BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)",
      );
      return;
    }
    const n = t.position,
      s = t.normal,
      r = t.uv;
    this.hasAttribute("tangent") === !1 &&
      this.setAttribute("tangent", new Qt(new Float32Array(4 * n.count), 4));
    const a = this.getAttribute("tangent"),
      o = [],
      c = [];
    for (let v = 0; v < n.count; v++) ((o[v] = new D()), (c[v] = new D()));
    const l = new D(),
      u = new D(),
      f = new D(),
      h = new ue(),
      d = new ue(),
      g = new ue(),
      x = new D(),
      m = new D();
    function p(v, b, W) {
      (l.fromBufferAttribute(n, v),
        u.fromBufferAttribute(n, b),
        f.fromBufferAttribute(n, W),
        h.fromBufferAttribute(r, v),
        d.fromBufferAttribute(r, b),
        g.fromBufferAttribute(r, W),
        u.sub(l),
        f.sub(l),
        d.sub(h),
        g.sub(h));
      const C = 1 / (d.x * g.y - g.x * d.y);
      isFinite(C) &&
        (x
          .copy(u)
          .multiplyScalar(g.y)
          .addScaledVector(f, -d.y)
          .multiplyScalar(C),
        m
          .copy(f)
          .multiplyScalar(d.x)
          .addScaledVector(u, -g.x)
          .multiplyScalar(C),
        o[v].add(x),
        o[b].add(x),
        o[W].add(x),
        c[v].add(m),
        c[b].add(m),
        c[W].add(m));
    }
    let S = this.groups;
    S.length === 0 && (S = [{ start: 0, count: e.count }]);
    for (let v = 0, b = S.length; v < b; ++v) {
      const W = S[v],
        C = W.start,
        V = W.count;
      for (let G = C, H = C + V; G < H; G += 3)
        p(e.getX(G + 0), e.getX(G + 1), e.getX(G + 2));
    }
    const E = new D(),
      y = new D(),
      R = new D(),
      w = new D();
    function P(v) {
      (R.fromBufferAttribute(s, v), w.copy(R));
      const b = o[v];
      (E.copy(b),
        E.sub(R.multiplyScalar(R.dot(b))).normalize(),
        y.crossVectors(w, b));
      const C = y.dot(c[v]) < 0 ? -1 : 1;
      a.setXYZW(v, E.x, E.y, E.z, C);
    }
    for (let v = 0, b = S.length; v < b; ++v) {
      const W = S[v],
        C = W.start,
        V = W.count;
      for (let G = C, H = C + V; G < H; G += 3)
        (P(e.getX(G + 0)), P(e.getX(G + 1)), P(e.getX(G + 2)));
    }
  }
  computeVertexNormals() {
    const e = this.index,
      t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        ((n = new Qt(new Float32Array(t.count * 3), 3)),
          this.setAttribute("normal", n));
      else for (let h = 0, d = n.count; h < d; h++) n.setXYZ(h, 0, 0, 0);
      const s = new D(),
        r = new D(),
        a = new D(),
        o = new D(),
        c = new D(),
        l = new D(),
        u = new D(),
        f = new D();
      if (e)
        for (let h = 0, d = e.count; h < d; h += 3) {
          const g = e.getX(h + 0),
            x = e.getX(h + 1),
            m = e.getX(h + 2);
          (s.fromBufferAttribute(t, g),
            r.fromBufferAttribute(t, x),
            a.fromBufferAttribute(t, m),
            u.subVectors(a, r),
            f.subVectors(s, r),
            u.cross(f),
            o.fromBufferAttribute(n, g),
            c.fromBufferAttribute(n, x),
            l.fromBufferAttribute(n, m),
            o.add(u),
            c.add(u),
            l.add(u),
            n.setXYZ(g, o.x, o.y, o.z),
            n.setXYZ(x, c.x, c.y, c.z),
            n.setXYZ(m, l.x, l.y, l.z));
        }
      else
        for (let h = 0, d = t.count; h < d; h += 3)
          (s.fromBufferAttribute(t, h + 0),
            r.fromBufferAttribute(t, h + 1),
            a.fromBufferAttribute(t, h + 2),
            u.subVectors(a, r),
            f.subVectors(s, r),
            u.cross(f),
            n.setXYZ(h + 0, u.x, u.y, u.z),
            n.setXYZ(h + 1, u.x, u.y, u.z),
            n.setXYZ(h + 2, u.x, u.y, u.z));
      (this.normalizeNormals(), (n.needsUpdate = !0));
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      (xt.fromBufferAttribute(e, t),
        xt.normalize(),
        e.setXYZ(t, xt.x, xt.y, xt.z));
  }
  toNonIndexed() {
    function e(o, c) {
      const l = o.array,
        u = o.itemSize,
        f = o.normalized,
        h = new l.constructor(c.length * u);
      let d = 0,
        g = 0;
      for (let x = 0, m = c.length; x < m; x++) {
        o.isInterleavedBufferAttribute
          ? (d = c[x] * o.data.stride + o.offset)
          : (d = c[x] * u);
        for (let p = 0; p < u; p++) h[g++] = l[d++];
      }
      return new Qt(h, u, f);
    }
    if (this.index === null)
      return (
        Ve(
          "BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.",
        ),
        this
      );
    const t = new ut(),
      n = this.index.array,
      s = this.attributes;
    for (const o in s) {
      const c = s[o],
        l = e(c, n);
      t.setAttribute(o, l);
    }
    const r = this.morphAttributes;
    for (const o in r) {
      const c = [],
        l = r[o];
      for (let u = 0, f = l.length; u < f; u++) {
        const h = l[u],
          d = e(h, n);
        c.push(d);
      }
      t.morphAttributes[o] = c;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, c = a.length; o < c; o++) {
      const l = a[o];
      t.addGroup(l.start, l.count, l.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.7,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON",
      },
    };
    if (
      ((e.uuid = this.uuid),
      (e.type = this.type),
      this.name !== "" && (e.name = this.name),
      Object.keys(this.userData).length > 0 && (e.userData = this.userData),
      this.parameters !== void 0)
    ) {
      const c = this.parameters;
      for (const l in c) c[l] !== void 0 && (e[l] = c[l]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null &&
      (e.data.index = {
        type: t.array.constructor.name,
        array: Array.prototype.slice.call(t.array),
      });
    const n = this.attributes;
    for (const c in n) {
      const l = n[c];
      e.data.attributes[c] = l.toJSON(e.data);
    }
    const s = {};
    let r = !1;
    for (const c in this.morphAttributes) {
      const l = this.morphAttributes[c],
        u = [];
      for (let f = 0, h = l.length; f < h; f++) {
        const d = l[f];
        u.push(d.toJSON(e.data));
      }
      u.length > 0 && ((s[c] = u), (r = !0));
    }
    r &&
      ((e.data.morphAttributes = s),
      (e.data.morphTargetsRelative = this.morphTargetsRelative));
    const a = this.groups;
    a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return (o !== null && (e.data.boundingSphere = o.toJSON()), e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    ((this.index = null),
      (this.attributes = {}),
      (this.morphAttributes = {}),
      (this.groups = []),
      (this.boundingBox = null),
      (this.boundingSphere = null));
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone());
    const s = e.attributes;
    for (const l in s) {
      const u = s[l];
      this.setAttribute(l, u.clone(t));
    }
    const r = e.morphAttributes;
    for (const l in r) {
      const u = [],
        f = r[l];
      for (let h = 0, d = f.length; h < d; h++) u.push(f[h].clone(t));
      this.morphAttributes[l] = u;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let l = 0, u = a.length; l < u; l++) {
      const f = a[l];
      this.addGroup(f.start, f.count, f.materialIndex);
    }
    const o = e.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const c = e.boundingSphere;
    return (
      c !== null && (this.boundingSphere = c.clone()),
      (this.drawRange.start = e.drawRange.start),
      (this.drawRange.count = e.drawRange.count),
      (this.userData = e.userData),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
let fh = 0;
class Ni extends Di {
  constructor() {
    (super(),
      (this.isMaterial = !0),
      Object.defineProperty(this, "id", { value: fh++ }),
      (this.uuid = Qn()),
      (this.name = ""),
      (this.type = "Material"),
      (this.blending = Si),
      (this.side = In),
      (this.vertexColors = !1),
      (this.opacity = 1),
      (this.transparent = !1),
      (this.alphaHash = !1),
      (this.blendSrc = la),
      (this.blendDst = ca),
      (this.blendEquation = Wn),
      (this.blendSrcAlpha = null),
      (this.blendDstAlpha = null),
      (this.blendEquationAlpha = null),
      (this.blendColor = new He(0, 0, 0)),
      (this.blendAlpha = 0),
      (this.depthFunc = bi),
      (this.depthTest = !0),
      (this.depthWrite = !0),
      (this.stencilWriteMask = 255),
      (this.stencilFunc = Xo),
      (this.stencilRef = 0),
      (this.stencilFuncMask = 255),
      (this.stencilFail = ii),
      (this.stencilZFail = ii),
      (this.stencilZPass = ii),
      (this.stencilWrite = !1),
      (this.clippingPlanes = null),
      (this.clipIntersection = !1),
      (this.clipShadows = !1),
      (this.shadowSide = null),
      (this.colorWrite = !0),
      (this.precision = null),
      (this.polygonOffset = !1),
      (this.polygonOffsetFactor = 0),
      (this.polygonOffsetUnits = 0),
      (this.dithering = !1),
      (this.alphaToCoverage = !1),
      (this.premultipliedAlpha = !1),
      (this.forceSinglePass = !1),
      (this.allowOverride = !0),
      (this.visible = !0),
      (this.toneMapped = !0),
      (this.userData = {}),
      (this.version = 0),
      (this._alphaTest = 0));
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    (this._alphaTest > 0 != e > 0 && this.version++, (this._alphaTest = e));
  }
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          Ve(`Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const s = this[t];
        if (s === void 0) {
          Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        s && s.isColor
          ? s.set(n)
          : s && s.isVector3 && n && n.isVector3
            ? s.copy(n)
            : (this[t] = n);
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = { textures: {}, images: {} });
    const n = {
      metadata: {
        version: 4.7,
        type: "Material",
        generator: "Material.toJSON",
      },
    };
    ((n.uuid = this.uuid),
      (n.type = this.type),
      this.name !== "" && (n.name = this.name),
      this.color && this.color.isColor && (n.color = this.color.getHex()),
      this.roughness !== void 0 && (n.roughness = this.roughness),
      this.metalness !== void 0 && (n.metalness = this.metalness),
      this.sheen !== void 0 && (n.sheen = this.sheen),
      this.sheenColor &&
        this.sheenColor.isColor &&
        (n.sheenColor = this.sheenColor.getHex()),
      this.sheenRoughness !== void 0 &&
        (n.sheenRoughness = this.sheenRoughness),
      this.emissive &&
        this.emissive.isColor &&
        (n.emissive = this.emissive.getHex()),
      this.emissiveIntensity !== void 0 &&
        this.emissiveIntensity !== 1 &&
        (n.emissiveIntensity = this.emissiveIntensity),
      this.specular &&
        this.specular.isColor &&
        (n.specular = this.specular.getHex()),
      this.specularIntensity !== void 0 &&
        (n.specularIntensity = this.specularIntensity),
      this.specularColor &&
        this.specularColor.isColor &&
        (n.specularColor = this.specularColor.getHex()),
      this.shininess !== void 0 && (n.shininess = this.shininess),
      this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat),
      this.clearcoatRoughness !== void 0 &&
        (n.clearcoatRoughness = this.clearcoatRoughness),
      this.clearcoatMap &&
        this.clearcoatMap.isTexture &&
        (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid),
      this.clearcoatRoughnessMap &&
        this.clearcoatRoughnessMap.isTexture &&
        (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid),
      this.clearcoatNormalMap &&
        this.clearcoatNormalMap.isTexture &&
        ((n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid),
        (n.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
      this.sheenColorMap &&
        this.sheenColorMap.isTexture &&
        (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid),
      this.sheenRoughnessMap &&
        this.sheenRoughnessMap.isTexture &&
        (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid),
      this.dispersion !== void 0 && (n.dispersion = this.dispersion),
      this.iridescence !== void 0 && (n.iridescence = this.iridescence),
      this.iridescenceIOR !== void 0 &&
        (n.iridescenceIOR = this.iridescenceIOR),
      this.iridescenceThicknessRange !== void 0 &&
        (n.iridescenceThicknessRange = this.iridescenceThicknessRange),
      this.iridescenceMap &&
        this.iridescenceMap.isTexture &&
        (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid),
      this.iridescenceThicknessMap &&
        this.iridescenceThicknessMap.isTexture &&
        (n.iridescenceThicknessMap =
          this.iridescenceThicknessMap.toJSON(e).uuid),
      this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy),
      this.anisotropyRotation !== void 0 &&
        (n.anisotropyRotation = this.anisotropyRotation),
      this.anisotropyMap &&
        this.anisotropyMap.isTexture &&
        (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid),
      this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid),
      this.matcap &&
        this.matcap.isTexture &&
        (n.matcap = this.matcap.toJSON(e).uuid),
      this.alphaMap &&
        this.alphaMap.isTexture &&
        (n.alphaMap = this.alphaMap.toJSON(e).uuid),
      this.lightMap &&
        this.lightMap.isTexture &&
        ((n.lightMap = this.lightMap.toJSON(e).uuid),
        (n.lightMapIntensity = this.lightMapIntensity)),
      this.aoMap &&
        this.aoMap.isTexture &&
        ((n.aoMap = this.aoMap.toJSON(e).uuid),
        (n.aoMapIntensity = this.aoMapIntensity)),
      this.bumpMap &&
        this.bumpMap.isTexture &&
        ((n.bumpMap = this.bumpMap.toJSON(e).uuid),
        (n.bumpScale = this.bumpScale)),
      this.normalMap &&
        this.normalMap.isTexture &&
        ((n.normalMap = this.normalMap.toJSON(e).uuid),
        (n.normalMapType = this.normalMapType),
        (n.normalScale = this.normalScale.toArray())),
      this.displacementMap &&
        this.displacementMap.isTexture &&
        ((n.displacementMap = this.displacementMap.toJSON(e).uuid),
        (n.displacementScale = this.displacementScale),
        (n.displacementBias = this.displacementBias)),
      this.roughnessMap &&
        this.roughnessMap.isTexture &&
        (n.roughnessMap = this.roughnessMap.toJSON(e).uuid),
      this.metalnessMap &&
        this.metalnessMap.isTexture &&
        (n.metalnessMap = this.metalnessMap.toJSON(e).uuid),
      this.emissiveMap &&
        this.emissiveMap.isTexture &&
        (n.emissiveMap = this.emissiveMap.toJSON(e).uuid),
      this.specularMap &&
        this.specularMap.isTexture &&
        (n.specularMap = this.specularMap.toJSON(e).uuid),
      this.specularIntensityMap &&
        this.specularIntensityMap.isTexture &&
        (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid),
      this.specularColorMap &&
        this.specularColorMap.isTexture &&
        (n.specularColorMap = this.specularColorMap.toJSON(e).uuid),
      this.envMap &&
        this.envMap.isTexture &&
        ((n.envMap = this.envMap.toJSON(e).uuid),
        this.combine !== void 0 && (n.combine = this.combine)),
      this.envMapRotation !== void 0 &&
        (n.envMapRotation = this.envMapRotation.toArray()),
      this.envMapIntensity !== void 0 &&
        (n.envMapIntensity = this.envMapIntensity),
      this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity),
      this.refractionRatio !== void 0 &&
        (n.refractionRatio = this.refractionRatio),
      this.gradientMap &&
        this.gradientMap.isTexture &&
        (n.gradientMap = this.gradientMap.toJSON(e).uuid),
      this.transmission !== void 0 && (n.transmission = this.transmission),
      this.transmissionMap &&
        this.transmissionMap.isTexture &&
        (n.transmissionMap = this.transmissionMap.toJSON(e).uuid),
      this.thickness !== void 0 && (n.thickness = this.thickness),
      this.thicknessMap &&
        this.thicknessMap.isTexture &&
        (n.thicknessMap = this.thicknessMap.toJSON(e).uuid),
      this.attenuationDistance !== void 0 &&
        this.attenuationDistance !== 1 / 0 &&
        (n.attenuationDistance = this.attenuationDistance),
      this.attenuationColor !== void 0 &&
        (n.attenuationColor = this.attenuationColor.getHex()),
      this.size !== void 0 && (n.size = this.size),
      this.shadowSide !== null && (n.shadowSide = this.shadowSide),
      this.sizeAttenuation !== void 0 &&
        (n.sizeAttenuation = this.sizeAttenuation),
      this.blending !== Si && (n.blending = this.blending),
      this.side !== In && (n.side = this.side),
      this.vertexColors === !0 && (n.vertexColors = !0),
      this.opacity < 1 && (n.opacity = this.opacity),
      this.transparent === !0 && (n.transparent = !0),
      this.blendSrc !== la && (n.blendSrc = this.blendSrc),
      this.blendDst !== ca && (n.blendDst = this.blendDst),
      this.blendEquation !== Wn && (n.blendEquation = this.blendEquation),
      this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha),
      this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha),
      this.blendEquationAlpha !== null &&
        (n.blendEquationAlpha = this.blendEquationAlpha),
      this.blendColor &&
        this.blendColor.isColor &&
        (n.blendColor = this.blendColor.getHex()),
      this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha),
      this.depthFunc !== bi && (n.depthFunc = this.depthFunc),
      this.depthTest === !1 && (n.depthTest = this.depthTest),
      this.depthWrite === !1 && (n.depthWrite = this.depthWrite),
      this.colorWrite === !1 && (n.colorWrite = this.colorWrite),
      this.stencilWriteMask !== 255 &&
        (n.stencilWriteMask = this.stencilWriteMask),
      this.stencilFunc !== Xo && (n.stencilFunc = this.stencilFunc),
      this.stencilRef !== 0 && (n.stencilRef = this.stencilRef),
      this.stencilFuncMask !== 255 &&
        (n.stencilFuncMask = this.stencilFuncMask),
      this.stencilFail !== ii && (n.stencilFail = this.stencilFail),
      this.stencilZFail !== ii && (n.stencilZFail = this.stencilZFail),
      this.stencilZPass !== ii && (n.stencilZPass = this.stencilZPass),
      this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite),
      this.rotation !== void 0 &&
        this.rotation !== 0 &&
        (n.rotation = this.rotation),
      this.polygonOffset === !0 && (n.polygonOffset = !0),
      this.polygonOffsetFactor !== 0 &&
        (n.polygonOffsetFactor = this.polygonOffsetFactor),
      this.polygonOffsetUnits !== 0 &&
        (n.polygonOffsetUnits = this.polygonOffsetUnits),
      this.linewidth !== void 0 &&
        this.linewidth !== 1 &&
        (n.linewidth = this.linewidth),
      this.dashSize !== void 0 && (n.dashSize = this.dashSize),
      this.gapSize !== void 0 && (n.gapSize = this.gapSize),
      this.scale !== void 0 && (n.scale = this.scale),
      this.dithering === !0 && (n.dithering = !0),
      this.alphaTest > 0 && (n.alphaTest = this.alphaTest),
      this.alphaHash === !0 && (n.alphaHash = !0),
      this.alphaToCoverage === !0 && (n.alphaToCoverage = !0),
      this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0),
      this.forceSinglePass === !0 && (n.forceSinglePass = !0),
      this.allowOverride === !1 && (n.allowOverride = !1),
      this.wireframe === !0 && (n.wireframe = !0),
      this.wireframeLinewidth > 1 &&
        (n.wireframeLinewidth = this.wireframeLinewidth),
      this.wireframeLinecap !== "round" &&
        (n.wireframeLinecap = this.wireframeLinecap),
      this.wireframeLinejoin !== "round" &&
        (n.wireframeLinejoin = this.wireframeLinejoin),
      this.flatShading === !0 && (n.flatShading = !0),
      this.visible === !1 && (n.visible = !1),
      this.toneMapped === !1 && (n.toneMapped = !1),
      this.fog === !1 && (n.fog = !1),
      Object.keys(this.userData).length > 0 && (n.userData = this.userData));
    function s(r) {
      const a = [];
      for (const o in r) {
        const c = r[o];
        (delete c.metadata, a.push(c));
      }
      return a;
    }
    if (t) {
      const r = s(e.textures),
        a = s(e.images);
      (r.length > 0 && (n.textures = r), a.length > 0 && (n.images = a));
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    ((this.name = e.name),
      (this.blending = e.blending),
      (this.side = e.side),
      (this.vertexColors = e.vertexColors),
      (this.opacity = e.opacity),
      (this.transparent = e.transparent),
      (this.blendSrc = e.blendSrc),
      (this.blendDst = e.blendDst),
      (this.blendEquation = e.blendEquation),
      (this.blendSrcAlpha = e.blendSrcAlpha),
      (this.blendDstAlpha = e.blendDstAlpha),
      (this.blendEquationAlpha = e.blendEquationAlpha),
      this.blendColor.copy(e.blendColor),
      (this.blendAlpha = e.blendAlpha),
      (this.depthFunc = e.depthFunc),
      (this.depthTest = e.depthTest),
      (this.depthWrite = e.depthWrite),
      (this.stencilWriteMask = e.stencilWriteMask),
      (this.stencilFunc = e.stencilFunc),
      (this.stencilRef = e.stencilRef),
      (this.stencilFuncMask = e.stencilFuncMask),
      (this.stencilFail = e.stencilFail),
      (this.stencilZFail = e.stencilZFail),
      (this.stencilZPass = e.stencilZPass),
      (this.stencilWrite = e.stencilWrite));
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const s = t.length;
      n = new Array(s);
      for (let r = 0; r !== s; ++r) n[r] = t[r].clone();
    }
    return (
      (this.clippingPlanes = n),
      (this.clipIntersection = e.clipIntersection),
      (this.clipShadows = e.clipShadows),
      (this.shadowSide = e.shadowSide),
      (this.colorWrite = e.colorWrite),
      (this.precision = e.precision),
      (this.polygonOffset = e.polygonOffset),
      (this.polygonOffsetFactor = e.polygonOffsetFactor),
      (this.polygonOffsetUnits = e.polygonOffsetUnits),
      (this.dithering = e.dithering),
      (this.alphaTest = e.alphaTest),
      (this.alphaHash = e.alphaHash),
      (this.alphaToCoverage = e.alphaToCoverage),
      (this.premultipliedAlpha = e.premultipliedAlpha),
      (this.forceSinglePass = e.forceSinglePass),
      (this.allowOverride = e.allowOverride),
      (this.visible = e.visible),
      (this.toneMapped = e.toneMapped),
      (this.userData = JSON.parse(JSON.stringify(e.userData))),
      this
    );
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}
const mn = new D(),
  kr = new D(),
  Ts = new D(),
  wn = new D(),
  Wr = new D(),
  As = new D(),
  Xr = new D();
class bo {
  constructor(e = new D(), t = new D(0, 0, -1)) {
    ((this.origin = e), (this.direction = t));
  }
  set(e, t) {
    return (this.origin.copy(e), this.direction.copy(t), this);
  }
  copy(e) {
    return (this.origin.copy(e.origin), this.direction.copy(e.direction), this);
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return (this.direction.copy(e).sub(this.origin).normalize(), this);
  }
  recast(e) {
    return (this.origin.copy(this.at(e, mn)), this);
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0
      ? t.copy(this.origin)
      : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = mn.subVectors(e, this.origin).dot(this.direction);
    return t < 0
      ? this.origin.distanceToSquared(e)
      : (mn.copy(this.origin).addScaledVector(this.direction, t),
        mn.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, s) {
    (kr.copy(e).add(t).multiplyScalar(0.5),
      Ts.copy(t).sub(e).normalize(),
      wn.copy(this.origin).sub(kr));
    const r = e.distanceTo(t) * 0.5,
      a = -this.direction.dot(Ts),
      o = wn.dot(this.direction),
      c = -wn.dot(Ts),
      l = wn.lengthSq(),
      u = Math.abs(1 - a * a);
    let f, h, d, g;
    if (u > 0)
      if (((f = a * c - o), (h = a * o - c), (g = r * u), f >= 0))
        if (h >= -g)
          if (h <= g) {
            const x = 1 / u;
            ((f *= x),
              (h *= x),
              (d = f * (f + a * h + 2 * o) + h * (a * f + h + 2 * c) + l));
          } else
            ((h = r),
              (f = Math.max(0, -(a * h + o))),
              (d = -f * f + h * (h + 2 * c) + l));
        else
          ((h = -r),
            (f = Math.max(0, -(a * h + o))),
            (d = -f * f + h * (h + 2 * c) + l));
      else
        h <= -g
          ? ((f = Math.max(0, -(-a * r + o))),
            (h = f > 0 ? -r : Math.min(Math.max(-r, -c), r)),
            (d = -f * f + h * (h + 2 * c) + l))
          : h <= g
            ? ((f = 0),
              (h = Math.min(Math.max(-r, -c), r)),
              (d = h * (h + 2 * c) + l))
            : ((f = Math.max(0, -(a * r + o))),
              (h = f > 0 ? r : Math.min(Math.max(-r, -c), r)),
              (d = -f * f + h * (h + 2 * c) + l));
    else
      ((h = a > 0 ? -r : r),
        (f = Math.max(0, -(a * h + o))),
        (d = -f * f + h * (h + 2 * c) + l));
    return (
      n && n.copy(this.origin).addScaledVector(this.direction, f),
      s && s.copy(kr).addScaledVector(Ts, h),
      d
    );
  }
  intersectSphere(e, t) {
    mn.subVectors(e.center, this.origin);
    const n = mn.dot(this.direction),
      s = mn.dot(mn) - n * n,
      r = e.radius * e.radius;
    if (s > r) return null;
    const a = Math.sqrt(r - s),
      o = n - a,
      c = n + a;
    return c < 0 ? null : o < 0 ? this.at(c, t) : this.at(o, t);
  }
  intersectsSphere(e) {
    return e.radius < 0
      ? !1
      : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let n, s, r, a, o, c;
    const l = 1 / this.direction.x,
      u = 1 / this.direction.y,
      f = 1 / this.direction.z,
      h = this.origin;
    return (
      l >= 0
        ? ((n = (e.min.x - h.x) * l), (s = (e.max.x - h.x) * l))
        : ((n = (e.max.x - h.x) * l), (s = (e.min.x - h.x) * l)),
      u >= 0
        ? ((r = (e.min.y - h.y) * u), (a = (e.max.y - h.y) * u))
        : ((r = (e.max.y - h.y) * u), (a = (e.min.y - h.y) * u)),
      n > a ||
      r > s ||
      ((r > n || isNaN(n)) && (n = r),
      (a < s || isNaN(s)) && (s = a),
      f >= 0
        ? ((o = (e.min.z - h.z) * f), (c = (e.max.z - h.z) * f))
        : ((o = (e.max.z - h.z) * f), (c = (e.min.z - h.z) * f)),
      n > c || o > s) ||
      ((o > n || n !== n) && (n = o), (c < s || s !== s) && (s = c), s < 0)
        ? null
        : this.at(n >= 0 ? n : s, t)
    );
  }
  intersectsBox(e) {
    return this.intersectBox(e, mn) !== null;
  }
  intersectTriangle(e, t, n, s, r) {
    (Wr.subVectors(t, e), As.subVectors(n, e), Xr.crossVectors(Wr, As));
    let a = this.direction.dot(Xr),
      o;
    if (a > 0) {
      if (s) return null;
      o = 1;
    } else if (a < 0) ((o = -1), (a = -a));
    else return null;
    wn.subVectors(this.origin, e);
    const c = o * this.direction.dot(As.crossVectors(wn, As));
    if (c < 0) return null;
    const l = o * this.direction.dot(Wr.cross(wn));
    if (l < 0 || c + l > a) return null;
    const u = -o * wn.dot(Xr);
    return u < 0 ? null : this.at(u / a, r);
  }
  applyMatrix4(e) {
    return (
      this.origin.applyMatrix4(e),
      this.direction.transformDirection(e),
      this
    );
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Mt extends Ni {
  constructor(e) {
    (super(),
      (this.isMeshBasicMaterial = !0),
      (this.type = "MeshBasicMaterial"),
      (this.color = new He(16777215)),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.specularMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapRotation = new ln()),
      (this.combine = lc),
      (this.reflectivity = 1),
      (this.refractionRatio = 0.98),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.fog = !0),
      this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.lightMap = e.lightMap),
      (this.lightMapIntensity = e.lightMapIntensity),
      (this.aoMap = e.aoMap),
      (this.aoMapIntensity = e.aoMapIntensity),
      (this.specularMap = e.specularMap),
      (this.alphaMap = e.alphaMap),
      (this.envMap = e.envMap),
      this.envMapRotation.copy(e.envMapRotation),
      (this.combine = e.combine),
      (this.reflectivity = e.reflectivity),
      (this.refractionRatio = e.refractionRatio),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.wireframeLinecap = e.wireframeLinecap),
      (this.wireframeLinejoin = e.wireframeLinejoin),
      (this.fog = e.fog),
      this
    );
  }
}
const ll = new ot(),
  zn = new bo(),
  ws = new Ui(),
  cl = new D(),
  Cs = new D(),
  Rs = new D(),
  Ps = new D(),
  qr = new D(),
  Ls = new D(),
  ul = new D(),
  Ds = new D();
class je extends St {
  constructor(e = new ut(), t = new Mt()) {
    (super(),
      (this.isMesh = !0),
      (this.type = "Mesh"),
      (this.geometry = e),
      (this.material = t),
      (this.morphTargetDictionary = void 0),
      (this.morphTargetInfluences = void 0),
      (this.count = 1),
      this.updateMorphTargets());
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      e.morphTargetInfluences !== void 0 &&
        (this.morphTargetInfluences = e.morphTargetInfluences.slice()),
      e.morphTargetDictionary !== void 0 &&
        (this.morphTargetDictionary = Object.assign(
          {},
          e.morphTargetDictionary,
        )),
      (this.material = Array.isArray(e.material)
        ? e.material.slice()
        : e.material),
      (this.geometry = e.geometry),
      this
    );
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes,
      n = Object.keys(t);
    if (n.length > 0) {
      const s = t[n[0]];
      if (s !== void 0) {
        ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
        for (let r = 0, a = s.length; r < a; r++) {
          const o = s[r].name || String(r);
          (this.morphTargetInfluences.push(0),
            (this.morphTargetDictionary[o] = r));
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry,
      s = n.attributes.position,
      r = n.morphAttributes.position,
      a = n.morphTargetsRelative;
    t.fromBufferAttribute(s, e);
    const o = this.morphTargetInfluences;
    if (r && o) {
      Ls.set(0, 0, 0);
      for (let c = 0, l = r.length; c < l; c++) {
        const u = o[c],
          f = r[c];
        u !== 0 &&
          (qr.fromBufferAttribute(f, e),
          a ? Ls.addScaledVector(qr, u) : Ls.addScaledVector(qr.sub(t), u));
      }
      t.add(Ls);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry,
      s = this.material,
      r = this.matrixWorld;
    s !== void 0 &&
      (n.boundingSphere === null && n.computeBoundingSphere(),
      ws.copy(n.boundingSphere),
      ws.applyMatrix4(r),
      zn.copy(e.ray).recast(e.near),
      !(
        ws.containsPoint(zn.origin) === !1 &&
        (zn.intersectSphere(ws, cl) === null ||
          zn.origin.distanceToSquared(cl) > (e.far - e.near) ** 2)
      ) &&
        (ll.copy(r).invert(),
        zn.copy(e.ray).applyMatrix4(ll),
        !(n.boundingBox !== null && zn.intersectsBox(n.boundingBox) === !1) &&
          this._computeIntersections(e, t, zn)));
  }
  _computeIntersections(e, t, n) {
    let s;
    const r = this.geometry,
      a = this.material,
      o = r.index,
      c = r.attributes.position,
      l = r.attributes.uv,
      u = r.attributes.uv1,
      f = r.attributes.normal,
      h = r.groups,
      d = r.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let g = 0, x = h.length; g < x; g++) {
          const m = h[g],
            p = a[m.materialIndex],
            S = Math.max(m.start, d.start),
            E = Math.min(
              o.count,
              Math.min(m.start + m.count, d.start + d.count),
            );
          for (let y = S, R = E; y < R; y += 3) {
            const w = o.getX(y),
              P = o.getX(y + 1),
              v = o.getX(y + 2);
            ((s = Is(this, p, e, n, l, u, f, w, P, v)),
              s &&
                ((s.faceIndex = Math.floor(y / 3)),
                (s.face.materialIndex = m.materialIndex),
                t.push(s)));
          }
        }
      else {
        const g = Math.max(0, d.start),
          x = Math.min(o.count, d.start + d.count);
        for (let m = g, p = x; m < p; m += 3) {
          const S = o.getX(m),
            E = o.getX(m + 1),
            y = o.getX(m + 2);
          ((s = Is(this, a, e, n, l, u, f, S, E, y)),
            s && ((s.faceIndex = Math.floor(m / 3)), t.push(s)));
        }
      }
    else if (c !== void 0)
      if (Array.isArray(a))
        for (let g = 0, x = h.length; g < x; g++) {
          const m = h[g],
            p = a[m.materialIndex],
            S = Math.max(m.start, d.start),
            E = Math.min(
              c.count,
              Math.min(m.start + m.count, d.start + d.count),
            );
          for (let y = S, R = E; y < R; y += 3) {
            const w = y,
              P = y + 1,
              v = y + 2;
            ((s = Is(this, p, e, n, l, u, f, w, P, v)),
              s &&
                ((s.faceIndex = Math.floor(y / 3)),
                (s.face.materialIndex = m.materialIndex),
                t.push(s)));
          }
        }
      else {
        const g = Math.max(0, d.start),
          x = Math.min(c.count, d.start + d.count);
        for (let m = g, p = x; m < p; m += 3) {
          const S = m,
            E = m + 1,
            y = m + 2;
          ((s = Is(this, a, e, n, l, u, f, S, E, y)),
            s && ((s.faceIndex = Math.floor(m / 3)), t.push(s)));
        }
      }
  }
}
function dh(i, e, t, n, s, r, a, o) {
  let c;
  if (
    (e.side === Ft
      ? (c = n.intersectTriangle(a, r, s, !0, o))
      : (c = n.intersectTriangle(s, r, a, e.side === In, o)),
    c === null)
  )
    return null;
  (Ds.copy(o), Ds.applyMatrix4(i.matrixWorld));
  const l = t.ray.origin.distanceTo(Ds);
  return l < t.near || l > t.far
    ? null
    : { distance: l, point: Ds.clone(), object: i };
}
function Is(i, e, t, n, s, r, a, o, c, l) {
  (i.getVertexPosition(o, Cs),
    i.getVertexPosition(c, Rs),
    i.getVertexPosition(l, Ps));
  const u = dh(i, e, t, n, Cs, Rs, Ps, ul);
  if (u) {
    const f = new D();
    (Xt.getBarycoord(ul, Cs, Rs, Ps, f),
      s && (u.uv = Xt.getInterpolatedAttribute(s, o, c, l, f, new ue())),
      r && (u.uv1 = Xt.getInterpolatedAttribute(r, o, c, l, f, new ue())),
      a &&
        ((u.normal = Xt.getInterpolatedAttribute(a, o, c, l, f, new D())),
        u.normal.dot(n.direction) > 0 && u.normal.multiplyScalar(-1)));
    const h = { a: o, b: c, c: l, normal: new D(), materialIndex: 0 };
    (Xt.getNormal(Cs, Rs, Ps, h.normal), (u.face = h), (u.barycoord = f));
  }
  return u;
}
class yc extends bt {
  constructor(e = null, t = 1, n = 1, s, r, a, o, c, l = Et, u = Et, f, h) {
    (super(null, a, o, c, l, u, s, r, f, h),
      (this.isDataTexture = !0),
      (this.image = { data: e, width: t, height: n }),
      (this.generateMipmaps = !1),
      (this.flipY = !1),
      (this.unpackAlignment = 1));
  }
}
class hl extends Qt {
  constructor(e, t, n, s = 1) {
    (super(e, t, n),
      (this.isInstancedBufferAttribute = !0),
      (this.meshPerAttribute = s));
  }
  copy(e) {
    return (super.copy(e), (this.meshPerAttribute = e.meshPerAttribute), this);
  }
  toJSON() {
    const e = super.toJSON();
    return (
      (e.meshPerAttribute = this.meshPerAttribute),
      (e.isInstancedBufferAttribute = !0),
      e
    );
  }
}
const pi = new ot(),
  fl = new ot(),
  Us = [],
  dl = new ei(),
  ph = new ot(),
  Wi = new je(),
  Xi = new Ui();
class P0 extends je {
  constructor(e, t, n) {
    (super(e, t),
      (this.isInstancedMesh = !0),
      (this.instanceMatrix = new hl(new Float32Array(n * 16), 16)),
      (this.previousInstanceMatrix = null),
      (this.instanceColor = null),
      (this.morphTexture = null),
      (this.count = n),
      (this.boundingBox = null),
      (this.boundingSphere = null));
    for (let s = 0; s < n; s++) this.setMatrixAt(s, ph);
  }
  computeBoundingBox() {
    const e = this.geometry,
      t = this.count;
    (this.boundingBox === null && (this.boundingBox = new ei()),
      e.boundingBox === null && e.computeBoundingBox(),
      this.boundingBox.makeEmpty());
    for (let n = 0; n < t; n++)
      (this.getMatrixAt(n, pi),
        dl.copy(e.boundingBox).applyMatrix4(pi),
        this.boundingBox.union(dl));
  }
  computeBoundingSphere() {
    const e = this.geometry,
      t = this.count;
    (this.boundingSphere === null && (this.boundingSphere = new Ui()),
      e.boundingSphere === null && e.computeBoundingSphere(),
      this.boundingSphere.makeEmpty());
    for (let n = 0; n < t; n++)
      (this.getMatrixAt(n, pi),
        Xi.copy(e.boundingSphere).applyMatrix4(pi),
        this.boundingSphere.union(Xi));
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      this.instanceMatrix.copy(e.instanceMatrix),
      e.previousInstanceMatrix !== null &&
        (this.previousInstanceMatrix = e.previousInstanceMatrix.clone()),
      e.morphTexture !== null && (this.morphTexture = e.morphTexture.clone()),
      e.instanceColor !== null &&
        (this.instanceColor = e.instanceColor.clone()),
      (this.count = e.count),
      e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()),
      e.boundingSphere !== null &&
        (this.boundingSphere = e.boundingSphere.clone()),
      this
    );
  }
  getColorAt(e, t) {
    t.fromArray(this.instanceColor.array, e * 3);
  }
  getMatrixAt(e, t) {
    t.fromArray(this.instanceMatrix.array, e * 16);
  }
  getMorphAt(e, t) {
    const n = t.morphTargetInfluences,
      s = this.morphTexture.source.data.data,
      r = n.length + 1,
      a = e * r + 1;
    for (let o = 0; o < n.length; o++) n[o] = s[a + o];
  }
  raycast(e, t) {
    const n = this.matrixWorld,
      s = this.count;
    if (
      ((Wi.geometry = this.geometry),
      (Wi.material = this.material),
      Wi.material !== void 0 &&
        (this.boundingSphere === null && this.computeBoundingSphere(),
        Xi.copy(this.boundingSphere),
        Xi.applyMatrix4(n),
        e.ray.intersectsSphere(Xi) !== !1))
    )
      for (let r = 0; r < s; r++) {
        (this.getMatrixAt(r, pi),
          fl.multiplyMatrices(n, pi),
          (Wi.matrixWorld = fl),
          Wi.raycast(e, Us));
        for (let a = 0, o = Us.length; a < o; a++) {
          const c = Us[a];
          ((c.instanceId = r), (c.object = this), t.push(c));
        }
        Us.length = 0;
      }
  }
  setColorAt(e, t) {
    (this.instanceColor === null &&
      (this.instanceColor = new hl(
        new Float32Array(this.instanceMatrix.count * 3).fill(1),
        3,
      )),
      t.toArray(this.instanceColor.array, e * 3));
  }
  setMatrixAt(e, t) {
    t.toArray(this.instanceMatrix.array, e * 16);
  }
  setMorphAt(e, t) {
    const n = t.morphTargetInfluences,
      s = n.length + 1;
    this.morphTexture === null &&
      (this.morphTexture = new yc(
        new Float32Array(s * this.count),
        s,
        this.count,
        mo,
        $t,
      ));
    const r = this.morphTexture.source.data.data;
    let a = 0;
    for (let l = 0; l < n.length; l++) a += n[l];
    const o = this.geometry.morphTargetsRelative ? 1 : 1 - a,
      c = s * e;
    ((r[c] = o), r.set(n, c + 1));
  }
  updateMorphTargets() {}
  dispose() {
    (this.dispatchEvent({ type: "dispose" }),
      this.morphTexture !== null &&
        (this.morphTexture.dispose(), (this.morphTexture = null)));
  }
}
const Yr = new D(),
  mh = new D(),
  gh = new We();
class kn {
  constructor(e = new D(1, 0, 0), t = 0) {
    ((this.isPlane = !0), (this.normal = e), (this.constant = t));
  }
  set(e, t) {
    return (this.normal.copy(e), (this.constant = t), this);
  }
  setComponents(e, t, n, s) {
    return (this.normal.set(e, t, n), (this.constant = s), this);
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return (this.normal.copy(e), (this.constant = -t.dot(this.normal)), this);
  }
  setFromCoplanarPoints(e, t, n) {
    const s = Yr.subVectors(n, t).cross(mh.subVectors(e, t)).normalize();
    return (this.setFromNormalAndCoplanarPoint(s, e), this);
  }
  copy(e) {
    return (this.normal.copy(e.normal), (this.constant = e.constant), this);
  }
  normalize() {
    const e = 1 / this.normal.length();
    return (this.normal.multiplyScalar(e), (this.constant *= e), this);
  }
  negate() {
    return ((this.constant *= -1), this.normal.negate(), this);
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const n = e.delta(Yr),
      s = this.normal.dot(n);
    if (s === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const r = -(e.start.dot(this.normal) + this.constant) / s;
    return r < 0 || r > 1 ? null : t.copy(e.start).addScaledVector(n, r);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start),
      n = this.distanceToPoint(e.end);
    return (t < 0 && n > 0) || (n < 0 && t > 0);
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const n = t || gh.getNormalMatrix(e),
      s = this.coplanarPoint(Yr).applyMatrix4(e),
      r = this.normal.applyMatrix3(n).normalize();
    return ((this.constant = -s.dot(r)), this);
  }
  translate(e) {
    return ((this.constant -= e.dot(this.normal)), this);
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Vn = new Ui(),
  _h = new ue(0.5, 0.5),
  Ns = new D();
class To {
  constructor(
    e = new kn(),
    t = new kn(),
    n = new kn(),
    s = new kn(),
    r = new kn(),
    a = new kn(),
  ) {
    this.planes = [e, t, n, s, r, a];
  }
  set(e, t, n, s, r, a) {
    const o = this.planes;
    return (
      o[0].copy(e),
      o[1].copy(t),
      o[2].copy(n),
      o[3].copy(s),
      o[4].copy(r),
      o[5].copy(a),
      this
    );
  }
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e, t = rn, n = !1) {
    const s = this.planes,
      r = e.elements,
      a = r[0],
      o = r[1],
      c = r[2],
      l = r[3],
      u = r[4],
      f = r[5],
      h = r[6],
      d = r[7],
      g = r[8],
      x = r[9],
      m = r[10],
      p = r[11],
      S = r[12],
      E = r[13],
      y = r[14],
      R = r[15];
    if (
      (s[0].setComponents(l - a, d - u, p - g, R - S).normalize(),
      s[1].setComponents(l + a, d + u, p + g, R + S).normalize(),
      s[2].setComponents(l + o, d + f, p + x, R + E).normalize(),
      s[3].setComponents(l - o, d - f, p - x, R - E).normalize(),
      n)
    )
      (s[4].setComponents(c, h, m, y).normalize(),
        s[5].setComponents(l - c, d - h, p - m, R - y).normalize());
    else if (
      (s[4].setComponents(l - c, d - h, p - m, R - y).normalize(), t === rn)
    )
      s[5].setComponents(l + c, d + h, p + m, R + y).normalize();
    else if (t === as) s[5].setComponents(c, h, m, y).normalize();
    else
      throw new Error(
        "THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " +
          t,
      );
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      (e.boundingSphere === null && e.computeBoundingSphere(),
        Vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld));
    else {
      const t = e.geometry;
      (t.boundingSphere === null && t.computeBoundingSphere(),
        Vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld));
    }
    return this.intersectsSphere(Vn);
  }
  intersectsSprite(e) {
    Vn.center.set(0, 0, 0);
    const t = _h.distanceTo(e.center);
    return (
      (Vn.radius = 0.7071067811865476 + t),
      Vn.applyMatrix4(e.matrixWorld),
      this.intersectsSphere(Vn)
    );
  }
  intersectsSphere(e) {
    const t = this.planes,
      n = e.center,
      s = -e.radius;
    for (let r = 0; r < 6; r++) if (t[r].distanceToPoint(n) < s) return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const s = t[n];
      if (
        ((Ns.x = s.normal.x > 0 ? e.max.x : e.min.x),
        (Ns.y = s.normal.y > 0 ? e.max.y : e.min.y),
        (Ns.z = s.normal.z > 0 ? e.max.z : e.min.z),
        s.distanceToPoint(Ns) < 0)
      )
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) if (t[n].distanceToPoint(e) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Xn extends Ni {
  constructor(e) {
    (super(),
      (this.isLineBasicMaterial = !0),
      (this.type = "LineBasicMaterial"),
      (this.color = new He(16777215)),
      (this.map = null),
      (this.linewidth = 1),
      (this.linecap = "round"),
      (this.linejoin = "round"),
      (this.fog = !0),
      this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      this.color.copy(e.color),
      (this.map = e.map),
      (this.linewidth = e.linewidth),
      (this.linecap = e.linecap),
      (this.linejoin = e.linejoin),
      (this.fog = e.fog),
      this
    );
  }
}
const cr = new D(),
  ur = new D(),
  pl = new ot(),
  qi = new bo(),
  Fs = new Ui(),
  Jr = new D(),
  ml = new D();
class es extends St {
  constructor(e = new ut(), t = new Xn()) {
    (super(),
      (this.isLine = !0),
      (this.type = "Line"),
      (this.geometry = e),
      (this.material = t),
      (this.morphTargetDictionary = void 0),
      (this.morphTargetInfluences = void 0),
      this.updateMorphTargets());
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.material = Array.isArray(e.material)
        ? e.material.slice()
        : e.material),
      (this.geometry = e.geometry),
      this
    );
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position,
        n = [0];
      for (let s = 1, r = t.count; s < r; s++)
        (cr.fromBufferAttribute(t, s - 1),
          ur.fromBufferAttribute(t, s),
          (n[s] = n[s - 1]),
          (n[s] += cr.distanceTo(ur)));
      e.setAttribute("lineDistance", new $e(n, 1));
    } else
      Ve(
        "Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.",
      );
    return this;
  }
  raycast(e, t) {
    const n = this.geometry,
      s = this.matrixWorld,
      r = e.params.Line.threshold,
      a = n.drawRange;
    if (
      (n.boundingSphere === null && n.computeBoundingSphere(),
      Fs.copy(n.boundingSphere),
      Fs.applyMatrix4(s),
      (Fs.radius += r),
      e.ray.intersectsSphere(Fs) === !1)
    )
      return;
    (pl.copy(s).invert(), qi.copy(e.ray).applyMatrix4(pl));
    const o = r / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      c = o * o,
      l = this.isLineSegments ? 2 : 1,
      u = n.index,
      h = n.attributes.position;
    if (u !== null) {
      const d = Math.max(0, a.start),
        g = Math.min(u.count, a.start + a.count);
      for (let x = d, m = g - 1; x < m; x += l) {
        const p = u.getX(x),
          S = u.getX(x + 1),
          E = Os(this, e, qi, c, p, S, x);
        E && t.push(E);
      }
      if (this.isLineLoop) {
        const x = u.getX(g - 1),
          m = u.getX(d),
          p = Os(this, e, qi, c, x, m, g - 1);
        p && t.push(p);
      }
    } else {
      const d = Math.max(0, a.start),
        g = Math.min(h.count, a.start + a.count);
      for (let x = d, m = g - 1; x < m; x += l) {
        const p = Os(this, e, qi, c, x, x + 1, x);
        p && t.push(p);
      }
      if (this.isLineLoop) {
        const x = Os(this, e, qi, c, g - 1, d, g - 1);
        x && t.push(x);
      }
    }
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes,
      n = Object.keys(t);
    if (n.length > 0) {
      const s = t[n[0]];
      if (s !== void 0) {
        ((this.morphTargetInfluences = []), (this.morphTargetDictionary = {}));
        for (let r = 0, a = s.length; r < a; r++) {
          const o = s[r].name || String(r);
          (this.morphTargetInfluences.push(0),
            (this.morphTargetDictionary[o] = r));
        }
      }
    }
  }
}
function Os(i, e, t, n, s, r, a) {
  const o = i.geometry.attributes.position;
  if (
    (cr.fromBufferAttribute(o, s),
    ur.fromBufferAttribute(o, r),
    t.distanceSqToSegment(cr, ur, Jr, ml) > n)
  )
    return;
  Jr.applyMatrix4(i.matrixWorld);
  const l = e.ray.origin.distanceTo(Jr);
  if (!(l < e.near || l > e.far))
    return {
      distance: l,
      point: ml.clone().applyMatrix4(i.matrixWorld),
      index: a,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i,
    };
}
const gl = new D(),
  _l = new D();
class L0 extends es {
  constructor(e, t) {
    (super(e, t), (this.isLineSegments = !0), (this.type = "LineSegments"));
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position,
        n = [];
      for (let s = 0, r = t.count; s < r; s += 2)
        (gl.fromBufferAttribute(t, s),
          _l.fromBufferAttribute(t, s + 1),
          (n[s] = s === 0 ? 0 : n[s - 1]),
          (n[s + 1] = n[s] + gl.distanceTo(_l)));
      e.setAttribute("lineDistance", new $e(n, 1));
    } else
      Ve(
        "LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.",
      );
    return this;
  }
}
class Bs extends es {
  constructor(e, t) {
    (super(e, t), (this.isLineLoop = !0), (this.type = "LineLoop"));
  }
}
class Ec extends bt {
  constructor(e = [], t = Kn, n, s, r, a, o, c, l, u) {
    (super(e, t, n, s, r, a, o, c, l, u),
      (this.isCubeTexture = !0),
      (this.flipY = !1));
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class vh extends bt {
  constructor(e, t, n, s, r, a, o, c, l) {
    (super(e, t, n, s, r, a, o, c, l),
      (this.isCanvasTexture = !0),
      (this.needsUpdate = !0));
  }
}
class ls extends bt {
  constructor(e, t, n = on, s, r, a, o = Et, c = Et, l, u = Mn, f = 1) {
    if (u !== Mn && u !== Jn)
      throw new Error(
        "DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat",
      );
    const h = { width: e, height: t, depth: f };
    (super(h, s, r, a, o, c, u, n, l),
      (this.isDepthTexture = !0),
      (this.flipY = !1),
      (this.generateMipmaps = !1),
      (this.compareFunction = null));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.source = new yo(Object.assign({}, e.image))),
      (this.compareFunction = e.compareFunction),
      this
    );
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (
      this.compareFunction !== null &&
        (t.compareFunction = this.compareFunction),
      t
    );
  }
}
class xh extends ls {
  constructor(e, t = on, n = Kn, s, r, a = Et, o = Et, c, l = Mn) {
    const u = { width: e, height: e, depth: 1 },
      f = [u, u, u, u, u, u];
    (super(e, e, t, n, s, r, a, o, c, l),
      (this.image = f),
      (this.isCubeDepthTexture = !0),
      (this.isCubeTexture = !0));
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class bc extends bt {
  constructor(e = null) {
    (super(), (this.sourceTexture = e), (this.isExternalTexture = !0));
  }
  copy(e) {
    return (super.copy(e), (this.sourceTexture = e.sourceTexture), this);
  }
}
class Fi extends ut {
  constructor(e = 1, t = 1, n = 1, s = 1, r = 1, a = 1) {
    (super(),
      (this.type = "BoxGeometry"),
      (this.parameters = {
        width: e,
        height: t,
        depth: n,
        widthSegments: s,
        heightSegments: r,
        depthSegments: a,
      }));
    const o = this;
    ((s = Math.floor(s)), (r = Math.floor(r)), (a = Math.floor(a)));
    const c = [],
      l = [],
      u = [],
      f = [];
    let h = 0,
      d = 0;
    (g("z", "y", "x", -1, -1, n, t, e, a, r, 0),
      g("z", "y", "x", 1, -1, n, t, -e, a, r, 1),
      g("x", "z", "y", 1, 1, e, n, t, s, a, 2),
      g("x", "z", "y", 1, -1, e, n, -t, s, a, 3),
      g("x", "y", "z", 1, -1, e, t, n, s, r, 4),
      g("x", "y", "z", -1, -1, e, t, -n, s, r, 5),
      this.setIndex(c),
      this.setAttribute("position", new $e(l, 3)),
      this.setAttribute("normal", new $e(u, 3)),
      this.setAttribute("uv", new $e(f, 2)));
    function g(x, m, p, S, E, y, R, w, P, v, b) {
      const W = y / P,
        C = R / v,
        V = y / 2,
        G = R / 2,
        H = w / 2,
        N = P + 1,
        O = v + 1;
      let F = 0,
        ce = 0;
      const ie = new D();
      for (let ge = 0; ge < O; ge++) {
        const xe = ge * C - G;
        for (let _e = 0; _e < N; _e++) {
          const Ue = _e * W - V;
          ((ie[x] = Ue * S),
            (ie[m] = xe * E),
            (ie[p] = H),
            l.push(ie.x, ie.y, ie.z),
            (ie[x] = 0),
            (ie[m] = 0),
            (ie[p] = w > 0 ? 1 : -1),
            u.push(ie.x, ie.y, ie.z),
            f.push(_e / P),
            f.push(1 - ge / v),
            (F += 1));
        }
      }
      for (let ge = 0; ge < v; ge++)
        for (let xe = 0; xe < P; xe++) {
          const _e = h + xe + N * ge,
            Ue = h + xe + N * (ge + 1),
            Ze = h + (xe + 1) + N * (ge + 1),
            Ke = h + (xe + 1) + N * ge;
          (c.push(_e, Ue, Ke), c.push(Ue, Ze, Ke), (ce += 6));
        }
      (o.addGroup(d, ce, b), (d += ce), (h += F));
    }
  }
  copy(e) {
    return (
      super.copy(e),
      (this.parameters = Object.assign({}, e.parameters)),
      this
    );
  }
  static fromJSON(e) {
    return new Fi(
      e.width,
      e.height,
      e.depth,
      e.widthSegments,
      e.heightSegments,
      e.depthSegments,
    );
  }
}
class Mi extends ut {
  constructor(e = 1, t = 32, n = 0, s = Math.PI * 2) {
    (super(),
      (this.type = "CircleGeometry"),
      (this.parameters = {
        radius: e,
        segments: t,
        thetaStart: n,
        thetaLength: s,
      }),
      (t = Math.max(3, t)));
    const r = [],
      a = [],
      o = [],
      c = [],
      l = new D(),
      u = new ue();
    (a.push(0, 0, 0), o.push(0, 0, 1), c.push(0.5, 0.5));
    for (let f = 0, h = 3; f <= t; f++, h += 3) {
      const d = n + (f / t) * s;
      ((l.x = e * Math.cos(d)),
        (l.y = e * Math.sin(d)),
        a.push(l.x, l.y, l.z),
        o.push(0, 0, 1),
        (u.x = (a[h] / e + 1) / 2),
        (u.y = (a[h + 1] / e + 1) / 2),
        c.push(u.x, u.y));
    }
    for (let f = 1; f <= t; f++) r.push(f, f + 1, 0);
    (this.setIndex(r),
      this.setAttribute("position", new $e(a, 3)),
      this.setAttribute("normal", new $e(o, 3)),
      this.setAttribute("uv", new $e(c, 2)));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.parameters = Object.assign({}, e.parameters)),
      this
    );
  }
  static fromJSON(e) {
    return new Mi(e.radius, e.segments, e.thetaStart, e.thetaLength);
  }
}
const zs = new D(),
  Vs = new D(),
  Zr = new D(),
  Gs = new Xt();
class D0 extends ut {
  constructor(e = null, t = 1) {
    if (
      (super(),
      (this.type = "EdgesGeometry"),
      (this.parameters = { geometry: e, thresholdAngle: t }),
      e !== null)
    ) {
      const s = Math.pow(10, 4),
        r = Math.cos(yi * t),
        a = e.getIndex(),
        o = e.getAttribute("position"),
        c = a ? a.count : o.count,
        l = [0, 0, 0],
        u = ["a", "b", "c"],
        f = new Array(3),
        h = {},
        d = [];
      for (let g = 0; g < c; g += 3) {
        a
          ? ((l[0] = a.getX(g)), (l[1] = a.getX(g + 1)), (l[2] = a.getX(g + 2)))
          : ((l[0] = g), (l[1] = g + 1), (l[2] = g + 2));
        const { a: x, b: m, c: p } = Gs;
        if (
          (x.fromBufferAttribute(o, l[0]),
          m.fromBufferAttribute(o, l[1]),
          p.fromBufferAttribute(o, l[2]),
          Gs.getNormal(Zr),
          (f[0] = `${Math.round(x.x * s)},${Math.round(x.y * s)},${Math.round(x.z * s)}`),
          (f[1] = `${Math.round(m.x * s)},${Math.round(m.y * s)},${Math.round(m.z * s)}`),
          (f[2] = `${Math.round(p.x * s)},${Math.round(p.y * s)},${Math.round(p.z * s)}`),
          !(f[0] === f[1] || f[1] === f[2] || f[2] === f[0]))
        )
          for (let S = 0; S < 3; S++) {
            const E = (S + 1) % 3,
              y = f[S],
              R = f[E],
              w = Gs[u[S]],
              P = Gs[u[E]],
              v = `${y}_${R}`,
              b = `${R}_${y}`;
            b in h && h[b]
              ? (Zr.dot(h[b].normal) <= r &&
                  (d.push(w.x, w.y, w.z), d.push(P.x, P.y, P.z)),
                (h[b] = null))
              : v in h ||
                (h[v] = { index0: l[S], index1: l[E], normal: Zr.clone() });
          }
      }
      for (const g in h)
        if (h[g]) {
          const { index0: x, index1: m } = h[g];
          (zs.fromBufferAttribute(o, x),
            Vs.fromBufferAttribute(o, m),
            d.push(zs.x, zs.y, zs.z),
            d.push(Vs.x, Vs.y, Vs.z));
        }
      this.setAttribute("position", new $e(d, 3));
    }
  }
  copy(e) {
    return (
      super.copy(e),
      (this.parameters = Object.assign({}, e.parameters)),
      this
    );
  }
}
class cn {
  constructor() {
    ((this.type = "Curve"),
      (this.arcLengthDivisions = 200),
      (this.needsUpdate = !1),
      (this.cacheArcLengths = null));
  }
  getPoint() {
    Ve("Curve: .getPoint() not implemented.");
  }
  getPointAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getPoint(n, t);
  }
  getPoints(e = 5) {
    const t = [];
    for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
    return t;
  }
  getSpacedPoints(e = 5) {
    const t = [];
    for (let n = 0; n <= e; n++) t.push(this.getPointAt(n / e));
    return t;
  }
  getLength() {
    const e = this.getLengths();
    return e[e.length - 1];
  }
  getLengths(e = this.arcLengthDivisions) {
    if (
      this.cacheArcLengths &&
      this.cacheArcLengths.length === e + 1 &&
      !this.needsUpdate
    )
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const t = [];
    let n,
      s = this.getPoint(0),
      r = 0;
    t.push(0);
    for (let a = 1; a <= e; a++)
      ((n = this.getPoint(a / e)), (r += n.distanceTo(s)), t.push(r), (s = n));
    return ((this.cacheArcLengths = t), t);
  }
  updateArcLengths() {
    ((this.needsUpdate = !0), this.getLengths());
  }
  getUtoTmapping(e, t = null) {
    const n = this.getLengths();
    let s = 0;
    const r = n.length;
    let a;
    t ? (a = t) : (a = e * n[r - 1]);
    let o = 0,
      c = r - 1,
      l;
    for (; o <= c;)
      if (((s = Math.floor(o + (c - o) / 2)), (l = n[s] - a), l < 0)) o = s + 1;
      else if (l > 0) c = s - 1;
      else {
        c = s;
        break;
      }
    if (((s = c), n[s] === a)) return s / (r - 1);
    const u = n[s],
      h = n[s + 1] - u,
      d = (a - u) / h;
    return (s + d) / (r - 1);
  }
  getTangent(e, t) {
    let s = e - 1e-4,
      r = e + 1e-4;
    (s < 0 && (s = 0), r > 1 && (r = 1));
    const a = this.getPoint(s),
      o = this.getPoint(r),
      c = t || (a.isVector2 ? new ue() : new D());
    return (c.copy(o).sub(a).normalize(), c);
  }
  getTangentAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getTangent(n, t);
  }
  computeFrenetFrames(e, t = !1) {
    const n = new D(),
      s = [],
      r = [],
      a = [],
      o = new D(),
      c = new ot();
    for (let d = 0; d <= e; d++) {
      const g = d / e;
      s[d] = this.getTangentAt(g, new D());
    }
    ((r[0] = new D()), (a[0] = new D()));
    let l = Number.MAX_VALUE;
    const u = Math.abs(s[0].x),
      f = Math.abs(s[0].y),
      h = Math.abs(s[0].z);
    (u <= l && ((l = u), n.set(1, 0, 0)),
      f <= l && ((l = f), n.set(0, 1, 0)),
      h <= l && n.set(0, 0, 1),
      o.crossVectors(s[0], n).normalize(),
      r[0].crossVectors(s[0], o),
      a[0].crossVectors(s[0], r[0]));
    for (let d = 1; d <= e; d++) {
      if (
        ((r[d] = r[d - 1].clone()),
        (a[d] = a[d - 1].clone()),
        o.crossVectors(s[d - 1], s[d]),
        o.length() > Number.EPSILON)
      ) {
        o.normalize();
        const g = Math.acos(Ye(s[d - 1].dot(s[d]), -1, 1));
        r[d].applyMatrix4(c.makeRotationAxis(o, g));
      }
      a[d].crossVectors(s[d], r[d]);
    }
    if (t === !0) {
      let d = Math.acos(Ye(r[0].dot(r[e]), -1, 1));
      ((d /= e), s[0].dot(o.crossVectors(r[0], r[e])) > 0 && (d = -d));
      for (let g = 1; g <= e; g++)
        (r[g].applyMatrix4(c.makeRotationAxis(s[g], d * g)),
          a[g].crossVectors(s[g], r[g]));
    }
    return { tangents: s, normals: r, binormals: a };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return ((this.arcLengthDivisions = e.arcLengthDivisions), this);
  }
  toJSON() {
    const e = {
      metadata: { version: 4.7, type: "Curve", generator: "Curve.toJSON" },
    };
    return (
      (e.arcLengthDivisions = this.arcLengthDivisions),
      (e.type = this.type),
      e
    );
  }
  fromJSON(e) {
    return ((this.arcLengthDivisions = e.arcLengthDivisions), this);
  }
}
class Ao extends cn {
  constructor(
    e = 0,
    t = 0,
    n = 1,
    s = 1,
    r = 0,
    a = Math.PI * 2,
    o = !1,
    c = 0,
  ) {
    (super(),
      (this.isEllipseCurve = !0),
      (this.type = "EllipseCurve"),
      (this.aX = e),
      (this.aY = t),
      (this.xRadius = n),
      (this.yRadius = s),
      (this.aStartAngle = r),
      (this.aEndAngle = a),
      (this.aClockwise = o),
      (this.aRotation = c));
  }
  getPoint(e, t = new ue()) {
    const n = t,
      s = Math.PI * 2;
    let r = this.aEndAngle - this.aStartAngle;
    const a = Math.abs(r) < Number.EPSILON;
    for (; r < 0;) r += s;
    for (; r > s;) r -= s;
    (r < Number.EPSILON && (a ? (r = 0) : (r = s)),
      this.aClockwise === !0 && !a && (r === s ? (r = -s) : (r = r - s)));
    const o = this.aStartAngle + e * r;
    let c = this.aX + this.xRadius * Math.cos(o),
      l = this.aY + this.yRadius * Math.sin(o);
    if (this.aRotation !== 0) {
      const u = Math.cos(this.aRotation),
        f = Math.sin(this.aRotation),
        h = c - this.aX,
        d = l - this.aY;
      ((c = h * u - d * f + this.aX), (l = h * f + d * u + this.aY));
    }
    return n.set(c, l);
  }
  copy(e) {
    return (
      super.copy(e),
      (this.aX = e.aX),
      (this.aY = e.aY),
      (this.xRadius = e.xRadius),
      (this.yRadius = e.yRadius),
      (this.aStartAngle = e.aStartAngle),
      (this.aEndAngle = e.aEndAngle),
      (this.aClockwise = e.aClockwise),
      (this.aRotation = e.aRotation),
      this
    );
  }
  toJSON() {
    const e = super.toJSON();
    return (
      (e.aX = this.aX),
      (e.aY = this.aY),
      (e.xRadius = this.xRadius),
      (e.yRadius = this.yRadius),
      (e.aStartAngle = this.aStartAngle),
      (e.aEndAngle = this.aEndAngle),
      (e.aClockwise = this.aClockwise),
      (e.aRotation = this.aRotation),
      e
    );
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      (this.aX = e.aX),
      (this.aY = e.aY),
      (this.xRadius = e.xRadius),
      (this.yRadius = e.yRadius),
      (this.aStartAngle = e.aStartAngle),
      (this.aEndAngle = e.aEndAngle),
      (this.aClockwise = e.aClockwise),
      (this.aRotation = e.aRotation),
      this
    );
  }
}
class Mh extends Ao {
  constructor(e, t, n, s, r, a) {
    (super(e, t, n, n, s, r, a),
      (this.isArcCurve = !0),
      (this.type = "ArcCurve"));
  }
}
function wo() {
  let i = 0,
    e = 0,
    t = 0,
    n = 0;
  function s(r, a, o, c) {
    ((i = r),
      (e = o),
      (t = -3 * r + 3 * a - 2 * o - c),
      (n = 2 * r - 2 * a + o + c));
  }
  return {
    initCatmullRom: function (r, a, o, c, l) {
      s(a, o, l * (o - r), l * (c - a));
    },
    initNonuniformCatmullRom: function (r, a, o, c, l, u, f) {
      let h = (a - r) / l - (o - r) / (l + u) + (o - a) / u,
        d = (o - a) / u - (c - a) / (u + f) + (c - o) / f;
      ((h *= u), (d *= u), s(a, o, h, d));
    },
    calc: function (r) {
      const a = r * r,
        o = a * r;
      return i + e * r + t * a + n * o;
    },
  };
}
const Hs = new D(),
  $r = new wo(),
  Kr = new wo(),
  jr = new wo();
class Sh extends cn {
  constructor(e = [], t = !1, n = "centripetal", s = 0.5) {
    (super(),
      (this.isCatmullRomCurve3 = !0),
      (this.type = "CatmullRomCurve3"),
      (this.points = e),
      (this.closed = t),
      (this.curveType = n),
      (this.tension = s));
  }
  getPoint(e, t = new D()) {
    const n = t,
      s = this.points,
      r = s.length,
      a = (r - (this.closed ? 0 : 1)) * e;
    let o = Math.floor(a),
      c = a - o;
    this.closed
      ? (o += o > 0 ? 0 : (Math.floor(Math.abs(o) / r) + 1) * r)
      : c === 0 && o === r - 1 && ((o = r - 2), (c = 1));
    let l, u;
    this.closed || o > 0
      ? (l = s[(o - 1) % r])
      : (Hs.subVectors(s[0], s[1]).add(s[0]), (l = Hs));
    const f = s[o % r],
      h = s[(o + 1) % r];
    if (
      (this.closed || o + 2 < r
        ? (u = s[(o + 2) % r])
        : (Hs.subVectors(s[r - 1], s[r - 2]).add(s[r - 1]), (u = Hs)),
      this.curveType === "centripetal" || this.curveType === "chordal")
    ) {
      const d = this.curveType === "chordal" ? 0.5 : 0.25;
      let g = Math.pow(l.distanceToSquared(f), d),
        x = Math.pow(f.distanceToSquared(h), d),
        m = Math.pow(h.distanceToSquared(u), d);
      (x < 1e-4 && (x = 1),
        g < 1e-4 && (g = x),
        m < 1e-4 && (m = x),
        $r.initNonuniformCatmullRom(l.x, f.x, h.x, u.x, g, x, m),
        Kr.initNonuniformCatmullRom(l.y, f.y, h.y, u.y, g, x, m),
        jr.initNonuniformCatmullRom(l.z, f.z, h.z, u.z, g, x, m));
    } else
      this.curveType === "catmullrom" &&
        ($r.initCatmullRom(l.x, f.x, h.x, u.x, this.tension),
        Kr.initCatmullRom(l.y, f.y, h.y, u.y, this.tension),
        jr.initCatmullRom(l.z, f.z, h.z, u.z, this.tension));
    return (n.set($r.calc(c), Kr.calc(c), jr.calc(c)), n);
  }
  copy(e) {
    (super.copy(e), (this.points = []));
    for (let t = 0, n = e.points.length; t < n; t++) {
      const s = e.points[t];
      this.points.push(s.clone());
    }
    return (
      (this.closed = e.closed),
      (this.curveType = e.curveType),
      (this.tension = e.tension),
      this
    );
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, n = this.points.length; t < n; t++) {
      const s = this.points[t];
      e.points.push(s.toArray());
    }
    return (
      (e.closed = this.closed),
      (e.curveType = this.curveType),
      (e.tension = this.tension),
      e
    );
  }
  fromJSON(e) {
    (super.fromJSON(e), (this.points = []));
    for (let t = 0, n = e.points.length; t < n; t++) {
      const s = e.points[t];
      this.points.push(new D().fromArray(s));
    }
    return (
      (this.closed = e.closed),
      (this.curveType = e.curveType),
      (this.tension = e.tension),
      this
    );
  }
}
function vl(i, e, t, n, s) {
  const r = (n - e) * 0.5,
    a = (s - t) * 0.5,
    o = i * i,
    c = i * o;
  return (
    (2 * t - 2 * n + r + a) * c + (-3 * t + 3 * n - 2 * r - a) * o + r * i + t
  );
}
function yh(i, e) {
  const t = 1 - i;
  return t * t * e;
}
function Eh(i, e) {
  return 2 * (1 - i) * i * e;
}
function bh(i, e) {
  return i * i * e;
}
function ts(i, e, t, n) {
  return yh(i, e) + Eh(i, t) + bh(i, n);
}
function Th(i, e) {
  const t = 1 - i;
  return t * t * t * e;
}
function Ah(i, e) {
  const t = 1 - i;
  return 3 * t * t * i * e;
}
function wh(i, e) {
  return 3 * (1 - i) * i * i * e;
}
function Ch(i, e) {
  return i * i * i * e;
}
function ns(i, e, t, n, s) {
  return Th(i, e) + Ah(i, t) + wh(i, n) + Ch(i, s);
}
class Tc extends cn {
  constructor(e = new ue(), t = new ue(), n = new ue(), s = new ue()) {
    (super(),
      (this.isCubicBezierCurve = !0),
      (this.type = "CubicBezierCurve"),
      (this.v0 = e),
      (this.v1 = t),
      (this.v2 = n),
      (this.v3 = s));
  }
  getPoint(e, t = new ue()) {
    const n = t,
      s = this.v0,
      r = this.v1,
      a = this.v2,
      o = this.v3;
    return (n.set(ns(e, s.x, r.x, a.x, o.x), ns(e, s.y, r.y, a.y, o.y)), n);
  }
  copy(e) {
    return (
      super.copy(e),
      this.v0.copy(e.v0),
      this.v1.copy(e.v1),
      this.v2.copy(e.v2),
      this.v3.copy(e.v3),
      this
    );
  }
  toJSON() {
    const e = super.toJSON();
    return (
      (e.v0 = this.v0.toArray()),
      (e.v1 = this.v1.toArray()),
      (e.v2 = this.v2.toArray()),
      (e.v3 = this.v3.toArray()),
      e
    );
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      this.v0.fromArray(e.v0),
      this.v1.fromArray(e.v1),
      this.v2.fromArray(e.v2),
      this.v3.fromArray(e.v3),
      this
    );
  }
}
class Rh extends cn {
  constructor(e = new D(), t = new D(), n = new D(), s = new D()) {
    (super(),
      (this.isCubicBezierCurve3 = !0),
      (this.type = "CubicBezierCurve3"),
      (this.v0 = e),
      (this.v1 = t),
      (this.v2 = n),
      (this.v3 = s));
  }
  getPoint(e, t = new D()) {
    const n = t,
      s = this.v0,
      r = this.v1,
      a = this.v2,
      o = this.v3;
    return (
      n.set(
        ns(e, s.x, r.x, a.x, o.x),
        ns(e, s.y, r.y, a.y, o.y),
        ns(e, s.z, r.z, a.z, o.z),
      ),
      n
    );
  }
  copy(e) {
    return (
      super.copy(e),
      this.v0.copy(e.v0),
      this.v1.copy(e.v1),
      this.v2.copy(e.v2),
      this.v3.copy(e.v3),
      this
    );
  }
  toJSON() {
    const e = super.toJSON();
    return (
      (e.v0 = this.v0.toArray()),
      (e.v1 = this.v1.toArray()),
      (e.v2 = this.v2.toArray()),
      (e.v3 = this.v3.toArray()),
      e
    );
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      this.v0.fromArray(e.v0),
      this.v1.fromArray(e.v1),
      this.v2.fromArray(e.v2),
      this.v3.fromArray(e.v3),
      this
    );
  }
}
class Ac extends cn {
  constructor(e = new ue(), t = new ue()) {
    (super(),
      (this.isLineCurve = !0),
      (this.type = "LineCurve"),
      (this.v1 = e),
      (this.v2 = t));
  }
  getPoint(e, t = new ue()) {
    const n = t;
    return (
      e === 1
        ? n.copy(this.v2)
        : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)),
      n
    );
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new ue()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return (super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this);
  }
  toJSON() {
    const e = super.toJSON();
    return ((e.v1 = this.v1.toArray()), (e.v2 = this.v2.toArray()), e);
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      this.v1.fromArray(e.v1),
      this.v2.fromArray(e.v2),
      this
    );
  }
}
class Ka extends cn {
  constructor(e = new D(), t = new D()) {
    (super(),
      (this.isLineCurve3 = !0),
      (this.type = "LineCurve3"),
      (this.v1 = e),
      (this.v2 = t));
  }
  getPoint(e, t = new D()) {
    const n = t;
    return (
      e === 1
        ? n.copy(this.v2)
        : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)),
      n
    );
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new D()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return (super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this);
  }
  toJSON() {
    const e = super.toJSON();
    return ((e.v1 = this.v1.toArray()), (e.v2 = this.v2.toArray()), e);
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      this.v1.fromArray(e.v1),
      this.v2.fromArray(e.v2),
      this
    );
  }
}
class wc extends cn {
  constructor(e = new ue(), t = new ue(), n = new ue()) {
    (super(),
      (this.isQuadraticBezierCurve = !0),
      (this.type = "QuadraticBezierCurve"),
      (this.v0 = e),
      (this.v1 = t),
      (this.v2 = n));
  }
  getPoint(e, t = new ue()) {
    const n = t,
      s = this.v0,
      r = this.v1,
      a = this.v2;
    return (n.set(ts(e, s.x, r.x, a.x), ts(e, s.y, r.y, a.y)), n);
  }
  copy(e) {
    return (
      super.copy(e),
      this.v0.copy(e.v0),
      this.v1.copy(e.v1),
      this.v2.copy(e.v2),
      this
    );
  }
  toJSON() {
    const e = super.toJSON();
    return (
      (e.v0 = this.v0.toArray()),
      (e.v1 = this.v1.toArray()),
      (e.v2 = this.v2.toArray()),
      e
    );
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      this.v0.fromArray(e.v0),
      this.v1.fromArray(e.v1),
      this.v2.fromArray(e.v2),
      this
    );
  }
}
class Co extends cn {
  constructor(e = new D(), t = new D(), n = new D()) {
    (super(),
      (this.isQuadraticBezierCurve3 = !0),
      (this.type = "QuadraticBezierCurve3"),
      (this.v0 = e),
      (this.v1 = t),
      (this.v2 = n));
  }
  getPoint(e, t = new D()) {
    const n = t,
      s = this.v0,
      r = this.v1,
      a = this.v2;
    return (
      n.set(ts(e, s.x, r.x, a.x), ts(e, s.y, r.y, a.y), ts(e, s.z, r.z, a.z)),
      n
    );
  }
  copy(e) {
    return (
      super.copy(e),
      this.v0.copy(e.v0),
      this.v1.copy(e.v1),
      this.v2.copy(e.v2),
      this
    );
  }
  toJSON() {
    const e = super.toJSON();
    return (
      (e.v0 = this.v0.toArray()),
      (e.v1 = this.v1.toArray()),
      (e.v2 = this.v2.toArray()),
      e
    );
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      this.v0.fromArray(e.v0),
      this.v1.fromArray(e.v1),
      this.v2.fromArray(e.v2),
      this
    );
  }
}
class Cc extends cn {
  constructor(e = []) {
    (super(),
      (this.isSplineCurve = !0),
      (this.type = "SplineCurve"),
      (this.points = e));
  }
  getPoint(e, t = new ue()) {
    const n = t,
      s = this.points,
      r = (s.length - 1) * e,
      a = Math.floor(r),
      o = r - a,
      c = s[a === 0 ? a : a - 1],
      l = s[a],
      u = s[a > s.length - 2 ? s.length - 1 : a + 1],
      f = s[a > s.length - 3 ? s.length - 1 : a + 2];
    return (n.set(vl(o, c.x, l.x, u.x, f.x), vl(o, c.y, l.y, u.y, f.y)), n);
  }
  copy(e) {
    (super.copy(e), (this.points = []));
    for (let t = 0, n = e.points.length; t < n; t++) {
      const s = e.points[t];
      this.points.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, n = this.points.length; t < n; t++) {
      const s = this.points[t];
      e.points.push(s.toArray());
    }
    return e;
  }
  fromJSON(e) {
    (super.fromJSON(e), (this.points = []));
    for (let t = 0, n = e.points.length; t < n; t++) {
      const s = e.points[t];
      this.points.push(new ue().fromArray(s));
    }
    return this;
  }
}
var hr = Object.freeze({
  __proto__: null,
  ArcCurve: Mh,
  CatmullRomCurve3: Sh,
  CubicBezierCurve: Tc,
  CubicBezierCurve3: Rh,
  EllipseCurve: Ao,
  LineCurve: Ac,
  LineCurve3: Ka,
  QuadraticBezierCurve: wc,
  QuadraticBezierCurve3: Co,
  SplineCurve: Cc,
});
class Rc extends cn {
  constructor() {
    (super(),
      (this.type = "CurvePath"),
      (this.curves = []),
      (this.autoClose = !1));
  }
  add(e) {
    this.curves.push(e);
  }
  closePath() {
    const e = this.curves[0].getPoint(0),
      t = this.curves[this.curves.length - 1].getPoint(1);
    if (!e.equals(t)) {
      const n = e.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new hr[n](t, e));
    }
    return this;
  }
  getPoint(e, t) {
    const n = e * this.getLength(),
      s = this.getCurveLengths();
    let r = 0;
    for (; r < s.length;) {
      if (s[r] >= n) {
        const a = s[r] - n,
          o = this.curves[r],
          c = o.getLength(),
          l = c === 0 ? 0 : 1 - a / c;
        return o.getPointAt(l, t);
      }
      r++;
    }
    return null;
  }
  getLength() {
    const e = this.getCurveLengths();
    return e[e.length - 1];
  }
  updateArcLengths() {
    ((this.needsUpdate = !0),
      (this.cacheLengths = null),
      this.getCurveLengths());
  }
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
      return this.cacheLengths;
    const e = [];
    let t = 0;
    for (let n = 0, s = this.curves.length; n < s; n++)
      ((t += this.curves[n].getLength()), e.push(t));
    return ((this.cacheLengths = e), e);
  }
  getSpacedPoints(e = 40) {
    const t = [];
    for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
    return (this.autoClose && t.push(t[0]), t);
  }
  getPoints(e = 12) {
    const t = [];
    let n;
    for (let s = 0, r = this.curves; s < r.length; s++) {
      const a = r[s],
        o = a.isEllipseCurve
          ? e * 2
          : a.isLineCurve || a.isLineCurve3
            ? 1
            : a.isSplineCurve
              ? e * a.points.length
              : e,
        c = a.getPoints(o);
      for (let l = 0; l < c.length; l++) {
        const u = c[l];
        (n && n.equals(u)) || (t.push(u), (n = u));
      }
    }
    return (
      this.autoClose &&
        t.length > 1 &&
        !t[t.length - 1].equals(t[0]) &&
        t.push(t[0]),
      t
    );
  }
  copy(e) {
    (super.copy(e), (this.curves = []));
    for (let t = 0, n = e.curves.length; t < n; t++) {
      const s = e.curves[t];
      this.curves.push(s.clone());
    }
    return ((this.autoClose = e.autoClose), this);
  }
  toJSON() {
    const e = super.toJSON();
    ((e.autoClose = this.autoClose), (e.curves = []));
    for (let t = 0, n = this.curves.length; t < n; t++) {
      const s = this.curves[t];
      e.curves.push(s.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    (super.fromJSON(e), (this.autoClose = e.autoClose), (this.curves = []));
    for (let t = 0, n = e.curves.length; t < n; t++) {
      const s = e.curves[t];
      this.curves.push(new hr[s.type]().fromJSON(s));
    }
    return this;
  }
}
class xl extends Rc {
  constructor(e) {
    (super(),
      (this.type = "Path"),
      (this.currentPoint = new ue()),
      e && this.setFromPoints(e));
  }
  setFromPoints(e) {
    this.moveTo(e[0].x, e[0].y);
    for (let t = 1, n = e.length; t < n; t++) this.lineTo(e[t].x, e[t].y);
    return this;
  }
  moveTo(e, t) {
    return (this.currentPoint.set(e, t), this);
  }
  lineTo(e, t) {
    const n = new Ac(this.currentPoint.clone(), new ue(e, t));
    return (this.curves.push(n), this.currentPoint.set(e, t), this);
  }
  quadraticCurveTo(e, t, n, s) {
    const r = new wc(this.currentPoint.clone(), new ue(e, t), new ue(n, s));
    return (this.curves.push(r), this.currentPoint.set(n, s), this);
  }
  bezierCurveTo(e, t, n, s, r, a) {
    const o = new Tc(
      this.currentPoint.clone(),
      new ue(e, t),
      new ue(n, s),
      new ue(r, a),
    );
    return (this.curves.push(o), this.currentPoint.set(r, a), this);
  }
  splineThru(e) {
    const t = [this.currentPoint.clone()].concat(e),
      n = new Cc(t);
    return (this.curves.push(n), this.currentPoint.copy(e[e.length - 1]), this);
  }
  arc(e, t, n, s, r, a) {
    const o = this.currentPoint.x,
      c = this.currentPoint.y;
    return (this.absarc(e + o, t + c, n, s, r, a), this);
  }
  absarc(e, t, n, s, r, a) {
    return (this.absellipse(e, t, n, n, s, r, a), this);
  }
  ellipse(e, t, n, s, r, a, o, c) {
    const l = this.currentPoint.x,
      u = this.currentPoint.y;
    return (this.absellipse(e + l, t + u, n, s, r, a, o, c), this);
  }
  absellipse(e, t, n, s, r, a, o, c) {
    const l = new Ao(e, t, n, s, r, a, o, c);
    if (this.curves.length > 0) {
      const f = l.getPoint(0);
      f.equals(this.currentPoint) || this.lineTo(f.x, f.y);
    }
    this.curves.push(l);
    const u = l.getPoint(1);
    return (this.currentPoint.copy(u), this);
  }
  copy(e) {
    return (super.copy(e), this.currentPoint.copy(e.currentPoint), this);
  }
  toJSON() {
    const e = super.toJSON();
    return ((e.currentPoint = this.currentPoint.toArray()), e);
  }
  fromJSON(e) {
    return (
      super.fromJSON(e),
      this.currentPoint.fromArray(e.currentPoint),
      this
    );
  }
}
class gr extends xl {
  constructor(e) {
    (super(e), (this.uuid = Qn()), (this.type = "Shape"), (this.holes = []));
  }
  getPointsHoles(e) {
    const t = [];
    for (let n = 0, s = this.holes.length; n < s; n++)
      t[n] = this.holes[n].getPoints(e);
    return t;
  }
  extractPoints(e) {
    return { shape: this.getPoints(e), holes: this.getPointsHoles(e) };
  }
  copy(e) {
    (super.copy(e), (this.holes = []));
    for (let t = 0, n = e.holes.length; t < n; t++) {
      const s = e.holes[t];
      this.holes.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    ((e.uuid = this.uuid), (e.holes = []));
    for (let t = 0, n = this.holes.length; t < n; t++) {
      const s = this.holes[t];
      e.holes.push(s.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    (super.fromJSON(e), (this.uuid = e.uuid), (this.holes = []));
    for (let t = 0, n = e.holes.length; t < n; t++) {
      const s = e.holes[t];
      this.holes.push(new xl().fromJSON(s));
    }
    return this;
  }
}
function Ph(i, e, t = 2) {
  const n = e && e.length,
    s = n ? e[0] * t : i.length;
  let r = Pc(i, 0, s, t, !0);
  const a = [];
  if (!r || r.next === r.prev) return a;
  let o, c, l;
  if ((n && (r = Nh(i, e, r, t)), i.length > 80 * t)) {
    ((o = i[0]), (c = i[1]));
    let u = o,
      f = c;
    for (let h = t; h < s; h += t) {
      const d = i[h],
        g = i[h + 1];
      (d < o && (o = d), g < c && (c = g), d > u && (u = d), g > f && (f = g));
    }
    ((l = Math.max(u - o, f - c)), (l = l !== 0 ? 32767 / l : 0));
  }
  return (cs(r, a, t, o, c, l, 0), a);
}
function Pc(i, e, t, n, s) {
  let r;
  if (s === qh(i, e, t, n) > 0)
    for (let a = e; a < t; a += n) r = Ml((a / n) | 0, i[a], i[a + 1], r);
  else
    for (let a = t - n; a >= e; a -= n) r = Ml((a / n) | 0, i[a], i[a + 1], r);
  return (r && Ci(r, r.next) && (hs(r), (r = r.next)), r);
}
function jn(i, e) {
  if (!i) return i;
  e || (e = i);
  let t = i,
    n;
  do
    if (
      ((n = !1), !t.steiner && (Ci(t, t.next) || ht(t.prev, t, t.next) === 0))
    ) {
      if ((hs(t), (t = e = t.prev), t === t.next)) break;
      n = !0;
    } else t = t.next;
  while (n || t !== e);
  return e;
}
function cs(i, e, t, n, s, r, a) {
  if (!i) return;
  !a && r && Vh(i, n, s, r);
  let o = i;
  for (; i.prev !== i.next;) {
    const c = i.prev,
      l = i.next;
    if (r ? Dh(i, n, s, r) : Lh(i)) {
      (e.push(c.i, i.i, l.i), hs(i), (i = l.next), (o = l.next));
      continue;
    }
    if (((i = l), i === o)) {
      a
        ? a === 1
          ? ((i = Ih(jn(i), e)), cs(i, e, t, n, s, r, 2))
          : a === 2 && Uh(i, e, t, n, s, r)
        : cs(jn(i), e, t, n, s, r, 1);
      break;
    }
  }
}
function Lh(i) {
  const e = i.prev,
    t = i,
    n = i.next;
  if (ht(e, t, n) >= 0) return !1;
  const s = e.x,
    r = t.x,
    a = n.x,
    o = e.y,
    c = t.y,
    l = n.y,
    u = Math.min(s, r, a),
    f = Math.min(o, c, l),
    h = Math.max(s, r, a),
    d = Math.max(o, c, l);
  let g = n.next;
  for (; g !== e;) {
    if (
      g.x >= u &&
      g.x <= h &&
      g.y >= f &&
      g.y <= d &&
      Ki(s, o, r, c, a, l, g.x, g.y) &&
      ht(g.prev, g, g.next) >= 0
    )
      return !1;
    g = g.next;
  }
  return !0;
}
function Dh(i, e, t, n) {
  const s = i.prev,
    r = i,
    a = i.next;
  if (ht(s, r, a) >= 0) return !1;
  const o = s.x,
    c = r.x,
    l = a.x,
    u = s.y,
    f = r.y,
    h = a.y,
    d = Math.min(o, c, l),
    g = Math.min(u, f, h),
    x = Math.max(o, c, l),
    m = Math.max(u, f, h),
    p = ja(d, g, e, t, n),
    S = ja(x, m, e, t, n);
  let E = i.prevZ,
    y = i.nextZ;
  for (; E && E.z >= p && y && y.z <= S;) {
    if (
      (E.x >= d &&
        E.x <= x &&
        E.y >= g &&
        E.y <= m &&
        E !== s &&
        E !== a &&
        Ki(o, u, c, f, l, h, E.x, E.y) &&
        ht(E.prev, E, E.next) >= 0) ||
      ((E = E.prevZ),
      y.x >= d &&
        y.x <= x &&
        y.y >= g &&
        y.y <= m &&
        y !== s &&
        y !== a &&
        Ki(o, u, c, f, l, h, y.x, y.y) &&
        ht(y.prev, y, y.next) >= 0)
    )
      return !1;
    y = y.nextZ;
  }
  for (; E && E.z >= p;) {
    if (
      E.x >= d &&
      E.x <= x &&
      E.y >= g &&
      E.y <= m &&
      E !== s &&
      E !== a &&
      Ki(o, u, c, f, l, h, E.x, E.y) &&
      ht(E.prev, E, E.next) >= 0
    )
      return !1;
    E = E.prevZ;
  }
  for (; y && y.z <= S;) {
    if (
      y.x >= d &&
      y.x <= x &&
      y.y >= g &&
      y.y <= m &&
      y !== s &&
      y !== a &&
      Ki(o, u, c, f, l, h, y.x, y.y) &&
      ht(y.prev, y, y.next) >= 0
    )
      return !1;
    y = y.nextZ;
  }
  return !0;
}
function Ih(i, e) {
  let t = i;
  do {
    const n = t.prev,
      s = t.next.next;
    (!Ci(n, s) &&
      Dc(n, t, t.next, s) &&
      us(n, s) &&
      us(s, n) &&
      (e.push(n.i, t.i, s.i), hs(t), hs(t.next), (t = i = s)),
      (t = t.next));
  } while (t !== i);
  return jn(t);
}
function Uh(i, e, t, n, s, r) {
  let a = i;
  do {
    let o = a.next.next;
    for (; o !== a.prev;) {
      if (a.i !== o.i && kh(a, o)) {
        let c = Ic(a, o);
        ((a = jn(a, a.next)),
          (c = jn(c, c.next)),
          cs(a, e, t, n, s, r, 0),
          cs(c, e, t, n, s, r, 0));
        return;
      }
      o = o.next;
    }
    a = a.next;
  } while (a !== i);
}
function Nh(i, e, t, n) {
  const s = [];
  for (let r = 0, a = e.length; r < a; r++) {
    const o = e[r] * n,
      c = r < a - 1 ? e[r + 1] * n : i.length,
      l = Pc(i, o, c, n, !1);
    (l === l.next && (l.steiner = !0), s.push(Hh(l)));
  }
  s.sort(Fh);
  for (let r = 0; r < s.length; r++) t = Oh(s[r], t);
  return t;
}
function Fh(i, e) {
  let t = i.x - e.x;
  if (t === 0 && ((t = i.y - e.y), t === 0)) {
    const n = (i.next.y - i.y) / (i.next.x - i.x),
      s = (e.next.y - e.y) / (e.next.x - e.x);
    t = n - s;
  }
  return t;
}
function Oh(i, e) {
  const t = Bh(i, e);
  if (!t) return e;
  const n = Ic(t, i);
  return (jn(n, n.next), jn(t, t.next));
}
function Bh(i, e) {
  let t = e;
  const n = i.x,
    s = i.y;
  let r = -1 / 0,
    a;
  if (Ci(i, t)) return t;
  do {
    if (Ci(i, t.next)) return t.next;
    if (s <= t.y && s >= t.next.y && t.next.y !== t.y) {
      const f = t.x + ((s - t.y) * (t.next.x - t.x)) / (t.next.y - t.y);
      if (
        f <= n &&
        f > r &&
        ((r = f), (a = t.x < t.next.x ? t : t.next), f === n)
      )
        return a;
    }
    t = t.next;
  } while (t !== e);
  if (!a) return null;
  const o = a,
    c = a.x,
    l = a.y;
  let u = 1 / 0;
  t = a;
  do {
    if (
      n >= t.x &&
      t.x >= c &&
      n !== t.x &&
      Lc(s < l ? n : r, s, c, l, s < l ? r : n, s, t.x, t.y)
    ) {
      const f = Math.abs(s - t.y) / (n - t.x);
      us(t, i) &&
        (f < u || (f === u && (t.x > a.x || (t.x === a.x && zh(a, t))))) &&
        ((a = t), (u = f));
    }
    t = t.next;
  } while (t !== o);
  return a;
}
function zh(i, e) {
  return ht(i.prev, i, e.prev) < 0 && ht(e.next, i, i.next) < 0;
}
function Vh(i, e, t, n) {
  let s = i;
  do
    (s.z === 0 && (s.z = ja(s.x, s.y, e, t, n)),
      (s.prevZ = s.prev),
      (s.nextZ = s.next),
      (s = s.next));
  while (s !== i);
  ((s.prevZ.nextZ = null), (s.prevZ = null), Gh(s));
}
function Gh(i) {
  let e,
    t = 1;
  do {
    let n = i,
      s;
    i = null;
    let r = null;
    for (e = 0; n;) {
      e++;
      let a = n,
        o = 0;
      for (let l = 0; l < t && (o++, (a = a.nextZ), !!a); l++);
      let c = t;
      for (; o > 0 || (c > 0 && a);)
        (o !== 0 && (c === 0 || !a || n.z <= a.z)
          ? ((s = n), (n = n.nextZ), o--)
          : ((s = a), (a = a.nextZ), c--),
          r ? (r.nextZ = s) : (i = s),
          (s.prevZ = r),
          (r = s));
      n = a;
    }
    ((r.nextZ = null), (t *= 2));
  } while (e > 1);
  return i;
}
function ja(i, e, t, n, s) {
  return (
    (i = ((i - t) * s) | 0),
    (e = ((e - n) * s) | 0),
    (i = (i | (i << 8)) & 16711935),
    (i = (i | (i << 4)) & 252645135),
    (i = (i | (i << 2)) & 858993459),
    (i = (i | (i << 1)) & 1431655765),
    (e = (e | (e << 8)) & 16711935),
    (e = (e | (e << 4)) & 252645135),
    (e = (e | (e << 2)) & 858993459),
    (e = (e | (e << 1)) & 1431655765),
    i | (e << 1)
  );
}
function Hh(i) {
  let e = i,
    t = i;
  do ((e.x < t.x || (e.x === t.x && e.y < t.y)) && (t = e), (e = e.next));
  while (e !== i);
  return t;
}
function Lc(i, e, t, n, s, r, a, o) {
  return (
    (s - a) * (e - o) >= (i - a) * (r - o) &&
    (i - a) * (n - o) >= (t - a) * (e - o) &&
    (t - a) * (r - o) >= (s - a) * (n - o)
  );
}
function Ki(i, e, t, n, s, r, a, o) {
  return !(i === a && e === o) && Lc(i, e, t, n, s, r, a, o);
}
function kh(i, e) {
  return (
    i.next.i !== e.i &&
    i.prev.i !== e.i &&
    !Wh(i, e) &&
    ((us(i, e) &&
      us(e, i) &&
      Xh(i, e) &&
      (ht(i.prev, i, e.prev) || ht(i, e.prev, e))) ||
      (Ci(i, e) && ht(i.prev, i, i.next) > 0 && ht(e.prev, e, e.next) > 0))
  );
}
function ht(i, e, t) {
  return (e.y - i.y) * (t.x - e.x) - (e.x - i.x) * (t.y - e.y);
}
function Ci(i, e) {
  return i.x === e.x && i.y === e.y;
}
function Dc(i, e, t, n) {
  const s = Ws(ht(i, e, t)),
    r = Ws(ht(i, e, n)),
    a = Ws(ht(t, n, i)),
    o = Ws(ht(t, n, e));
  return !!(
    (s !== r && a !== o) ||
    (s === 0 && ks(i, t, e)) ||
    (r === 0 && ks(i, n, e)) ||
    (a === 0 && ks(t, i, n)) ||
    (o === 0 && ks(t, e, n))
  );
}
function ks(i, e, t) {
  return (
    e.x <= Math.max(i.x, t.x) &&
    e.x >= Math.min(i.x, t.x) &&
    e.y <= Math.max(i.y, t.y) &&
    e.y >= Math.min(i.y, t.y)
  );
}
function Ws(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function Wh(i, e) {
  let t = i;
  do {
    if (
      t.i !== i.i &&
      t.next.i !== i.i &&
      t.i !== e.i &&
      t.next.i !== e.i &&
      Dc(t, t.next, i, e)
    )
      return !0;
    t = t.next;
  } while (t !== i);
  return !1;
}
function us(i, e) {
  return ht(i.prev, i, i.next) < 0
    ? ht(i, e, i.next) >= 0 && ht(i, i.prev, e) >= 0
    : ht(i, e, i.prev) < 0 || ht(i, i.next, e) < 0;
}
function Xh(i, e) {
  let t = i,
    n = !1;
  const s = (i.x + e.x) / 2,
    r = (i.y + e.y) / 2;
  do
    (t.y > r != t.next.y > r &&
      t.next.y !== t.y &&
      s < ((t.next.x - t.x) * (r - t.y)) / (t.next.y - t.y) + t.x &&
      (n = !n),
      (t = t.next));
  while (t !== i);
  return n;
}
function Ic(i, e) {
  const t = Qa(i.i, i.x, i.y),
    n = Qa(e.i, e.x, e.y),
    s = i.next,
    r = e.prev;
  return (
    (i.next = e),
    (e.prev = i),
    (t.next = s),
    (s.prev = t),
    (n.next = t),
    (t.prev = n),
    (r.next = n),
    (n.prev = r),
    n
  );
}
function Ml(i, e, t, n) {
  const s = Qa(i, e, t);
  return (
    n
      ? ((s.next = n.next), (s.prev = n), (n.next.prev = s), (n.next = s))
      : ((s.prev = s), (s.next = s)),
    s
  );
}
function hs(i) {
  ((i.next.prev = i.prev),
    (i.prev.next = i.next),
    i.prevZ && (i.prevZ.nextZ = i.nextZ),
    i.nextZ && (i.nextZ.prevZ = i.prevZ));
}
function Qa(i, e, t) {
  return {
    i,
    x: e,
    y: t,
    prev: null,
    next: null,
    z: 0,
    prevZ: null,
    nextZ: null,
    steiner: !1,
  };
}
function qh(i, e, t, n) {
  let s = 0;
  for (let r = e, a = t - n; r < t; r += n)
    ((s += (i[a] - i[r]) * (i[r + 1] + i[a + 1])), (a = r));
  return s;
}
class Yh {
  static triangulate(e, t, n = 2) {
    return Ph(e, t, n);
  }
}
class vn {
  static area(e) {
    const t = e.length;
    let n = 0;
    for (let s = t - 1, r = 0; r < t; s = r++)
      n += e[s].x * e[r].y - e[r].x * e[s].y;
    return n * 0.5;
  }
  static isClockWise(e) {
    return vn.area(e) < 0;
  }
  static triangulateShape(e, t) {
    const n = [],
      s = [],
      r = [];
    (Sl(e), yl(n, e));
    let a = e.length;
    t.forEach(Sl);
    for (let c = 0; c < t.length; c++)
      (s.push(a), (a += t[c].length), yl(n, t[c]));
    const o = Yh.triangulate(n, s);
    for (let c = 0; c < o.length; c += 3) r.push(o.slice(c, c + 3));
    return r;
  }
}
function Sl(i) {
  const e = i.length;
  e > 2 && i[e - 1].equals(i[0]) && i.pop();
}
function yl(i, e) {
  for (let t = 0; t < e.length; t++) (i.push(e[t].x), i.push(e[t].y));
}
class is extends ut {
  constructor(
    e = new gr([
      new ue(0.5, 0.5),
      new ue(-0.5, 0.5),
      new ue(-0.5, -0.5),
      new ue(0.5, -0.5),
    ]),
    t = {},
  ) {
    (super(),
      (this.type = "ExtrudeGeometry"),
      (this.parameters = { shapes: e, options: t }),
      (e = Array.isArray(e) ? e : [e]));
    const n = this,
      s = [],
      r = [];
    for (let o = 0, c = e.length; o < c; o++) {
      const l = e[o];
      a(l);
    }
    (this.setAttribute("position", new $e(s, 3)),
      this.setAttribute("uv", new $e(r, 2)),
      this.computeVertexNormals());
    function a(o) {
      const c = [],
        l = t.curveSegments !== void 0 ? t.curveSegments : 12,
        u = t.steps !== void 0 ? t.steps : 1,
        f = t.depth !== void 0 ? t.depth : 1;
      let h = t.bevelEnabled !== void 0 ? t.bevelEnabled : !0,
        d = t.bevelThickness !== void 0 ? t.bevelThickness : 0.2,
        g = t.bevelSize !== void 0 ? t.bevelSize : d - 0.1,
        x = t.bevelOffset !== void 0 ? t.bevelOffset : 0,
        m = t.bevelSegments !== void 0 ? t.bevelSegments : 3;
      const p = t.extrudePath,
        S = t.UVGenerator !== void 0 ? t.UVGenerator : Jh;
      let E,
        y = !1,
        R,
        w,
        P,
        v;
      if (p) {
        ((E = p.getSpacedPoints(u)), (y = !0), (h = !1));
        const ee = p.isCatmullRomCurve3 ? p.closed : !1;
        ((R = p.computeFrenetFrames(u, ee)),
          (w = new D()),
          (P = new D()),
          (v = new D()));
      }
      h || ((m = 0), (d = 0), (g = 0), (x = 0));
      const b = o.extractPoints(l);
      let W = b.shape;
      const C = b.holes;
      if (!vn.isClockWise(W)) {
        W = W.reverse();
        for (let ee = 0, ae = C.length; ee < ae; ee++) {
          const te = C[ee];
          vn.isClockWise(te) && (C[ee] = te.reverse());
        }
      }
      function G(ee) {
        const te = 10000000000000001e-36;
        let me = ee[0];
        for (let A = 1; A <= ee.length; A++) {
          const Fe = A % ee.length,
            Me = ee[Fe],
            ze = Me.x - me.x,
            de = Me.y - me.y,
            T = ze * ze + de * de,
            _ = Math.max(
              Math.abs(Me.x),
              Math.abs(Me.y),
              Math.abs(me.x),
              Math.abs(me.y),
            ),
            I = te * _ * _;
          if (T <= I) {
            (ee.splice(Fe, 1), A--);
            continue;
          }
          me = Me;
        }
      }
      (G(W), C.forEach(G));
      const H = C.length,
        N = W;
      for (let ee = 0; ee < H; ee++) {
        const ae = C[ee];
        W = W.concat(ae);
      }
      function O(ee, ae, te) {
        return (
          ae || Qe("ExtrudeGeometry: vec does not exist"),
          ee.clone().addScaledVector(ae, te)
        );
      }
      const F = W.length;
      function ce(ee, ae, te) {
        let me, A, Fe;
        const Me = ee.x - ae.x,
          ze = ee.y - ae.y,
          de = te.x - ee.x,
          T = te.y - ee.y,
          _ = Me * Me + ze * ze,
          I = Me * T - ze * de;
        if (Math.abs(I) > Number.EPSILON) {
          const Y = Math.sqrt(_),
            Q = Math.sqrt(de * de + T * T),
            Z = ae.x - ze / Y,
            be = ae.y + Me / Y,
            pe = te.x - T / Q,
            De = te.y + de / Q,
            B = ((pe - Z) * T - (De - be) * de) / (Me * T - ze * de);
          ((me = Z + Me * B - ee.x), (A = be + ze * B - ee.y));
          const q = me * me + A * A;
          if (q <= 2) return new ue(me, A);
          Fe = Math.sqrt(q / 2);
        } else {
          let Y = !1;
          (Me > Number.EPSILON
            ? de > Number.EPSILON && (Y = !0)
            : Me < -Number.EPSILON
              ? de < -Number.EPSILON && (Y = !0)
              : Math.sign(ze) === Math.sign(T) && (Y = !0),
            Y
              ? ((me = -ze), (A = Me), (Fe = Math.sqrt(_)))
              : ((me = Me), (A = ze), (Fe = Math.sqrt(_ / 2))));
        }
        return new ue(me / Fe, A / Fe);
      }
      const ie = [];
      for (
        let ee = 0, ae = N.length, te = ae - 1, me = ee + 1;
        ee < ae;
        ee++, te++, me++
      )
        (te === ae && (te = 0),
          me === ae && (me = 0),
          (ie[ee] = ce(N[ee], N[te], N[me])));
      const ge = [];
      let xe,
        _e = ie.concat();
      for (let ee = 0, ae = H; ee < ae; ee++) {
        const te = C[ee];
        xe = [];
        for (
          let me = 0, A = te.length, Fe = A - 1, Me = me + 1;
          me < A;
          me++, Fe++, Me++
        )
          (Fe === A && (Fe = 0),
            Me === A && (Me = 0),
            (xe[me] = ce(te[me], te[Fe], te[Me])));
        (ge.push(xe), (_e = _e.concat(xe)));
      }
      let Ue;
      if (m === 0) Ue = vn.triangulateShape(N, C);
      else {
        const ee = [],
          ae = [];
        for (let te = 0; te < m; te++) {
          const me = te / m,
            A = d * Math.cos((me * Math.PI) / 2),
            Fe = g * Math.sin((me * Math.PI) / 2) + x;
          for (let Me = 0, ze = N.length; Me < ze; Me++) {
            const de = O(N[Me], ie[Me], Fe);
            (Be(de.x, de.y, -A), me === 0 && ee.push(de));
          }
          for (let Me = 0, ze = H; Me < ze; Me++) {
            const de = C[Me];
            xe = ge[Me];
            const T = [];
            for (let _ = 0, I = de.length; _ < I; _++) {
              const Y = O(de[_], xe[_], Fe);
              (Be(Y.x, Y.y, -A), me === 0 && T.push(Y));
            }
            me === 0 && ae.push(T);
          }
        }
        Ue = vn.triangulateShape(ee, ae);
      }
      const Ze = Ue.length,
        Ke = g + x;
      for (let ee = 0; ee < F; ee++) {
        const ae = h ? O(W[ee], _e[ee], Ke) : W[ee];
        y
          ? (P.copy(R.normals[0]).multiplyScalar(ae.x),
            w.copy(R.binormals[0]).multiplyScalar(ae.y),
            v.copy(E[0]).add(P).add(w),
            Be(v.x, v.y, v.z))
          : Be(ae.x, ae.y, 0);
      }
      for (let ee = 1; ee <= u; ee++)
        for (let ae = 0; ae < F; ae++) {
          const te = h ? O(W[ae], _e[ae], Ke) : W[ae];
          y
            ? (P.copy(R.normals[ee]).multiplyScalar(te.x),
              w.copy(R.binormals[ee]).multiplyScalar(te.y),
              v.copy(E[ee]).add(P).add(w),
              Be(v.x, v.y, v.z))
            : Be(te.x, te.y, (f / u) * ee);
        }
      for (let ee = m - 1; ee >= 0; ee--) {
        const ae = ee / m,
          te = d * Math.cos((ae * Math.PI) / 2),
          me = g * Math.sin((ae * Math.PI) / 2) + x;
        for (let A = 0, Fe = N.length; A < Fe; A++) {
          const Me = O(N[A], ie[A], me);
          Be(Me.x, Me.y, f + te);
        }
        for (let A = 0, Fe = C.length; A < Fe; A++) {
          const Me = C[A];
          xe = ge[A];
          for (let ze = 0, de = Me.length; ze < de; ze++) {
            const T = O(Me[ze], xe[ze], me);
            y
              ? Be(T.x, T.y + E[u - 1].y, E[u - 1].x + te)
              : Be(T.x, T.y, f + te);
          }
        }
      }
      ($(), he());
      function $() {
        const ee = s.length / 3;
        if (h) {
          let ae = 0,
            te = F * ae;
          for (let me = 0; me < Ze; me++) {
            const A = Ue[me];
            we(A[2] + te, A[1] + te, A[0] + te);
          }
          ((ae = u + m * 2), (te = F * ae));
          for (let me = 0; me < Ze; me++) {
            const A = Ue[me];
            we(A[0] + te, A[1] + te, A[2] + te);
          }
        } else {
          for (let ae = 0; ae < Ze; ae++) {
            const te = Ue[ae];
            we(te[2], te[1], te[0]);
          }
          for (let ae = 0; ae < Ze; ae++) {
            const te = Ue[ae];
            we(te[0] + F * u, te[1] + F * u, te[2] + F * u);
          }
        }
        n.addGroup(ee, s.length / 3 - ee, 0);
      }
      function he() {
        const ee = s.length / 3;
        let ae = 0;
        (fe(N, ae), (ae += N.length));
        for (let te = 0, me = C.length; te < me; te++) {
          const A = C[te];
          (fe(A, ae), (ae += A.length));
        }
        n.addGroup(ee, s.length / 3 - ee, 1);
      }
      function fe(ee, ae) {
        let te = ee.length;
        for (; --te >= 0;) {
          const me = te;
          let A = te - 1;
          A < 0 && (A = ee.length - 1);
          for (let Fe = 0, Me = u + m * 2; Fe < Me; Fe++) {
            const ze = F * Fe,
              de = F * (Fe + 1),
              T = ae + me + ze,
              _ = ae + A + ze,
              I = ae + A + de,
              Y = ae + me + de;
            Ne(T, _, I, Y);
          }
        }
      }
      function Be(ee, ae, te) {
        (c.push(ee), c.push(ae), c.push(te));
      }
      function we(ee, ae, te) {
        (Je(ee), Je(ae), Je(te));
        const me = s.length / 3,
          A = S.generateTopUV(n, s, me - 3, me - 2, me - 1);
        (Ge(A[0]), Ge(A[1]), Ge(A[2]));
      }
      function Ne(ee, ae, te, me) {
        (Je(ee), Je(ae), Je(me), Je(ae), Je(te), Je(me));
        const A = s.length / 3,
          Fe = S.generateSideWallUV(n, s, A - 6, A - 3, A - 2, A - 1);
        (Ge(Fe[0]), Ge(Fe[1]), Ge(Fe[3]), Ge(Fe[1]), Ge(Fe[2]), Ge(Fe[3]));
      }
      function Je(ee) {
        (s.push(c[ee * 3 + 0]), s.push(c[ee * 3 + 1]), s.push(c[ee * 3 + 2]));
      }
      function Ge(ee) {
        (r.push(ee.x), r.push(ee.y));
      }
    }
  }
  copy(e) {
    return (
      super.copy(e),
      (this.parameters = Object.assign({}, e.parameters)),
      this
    );
  }
  toJSON() {
    const e = super.toJSON(),
      t = this.parameters.shapes,
      n = this.parameters.options;
    return Zh(t, n, e);
  }
  static fromJSON(e, t) {
    const n = [];
    for (let r = 0, a = e.shapes.length; r < a; r++) {
      const o = t[e.shapes[r]];
      n.push(o);
    }
    const s = e.options.extrudePath;
    return (
      s !== void 0 && (e.options.extrudePath = new hr[s.type]().fromJSON(s)),
      new is(n, e.options)
    );
  }
}
const Jh = {
  generateTopUV: function (i, e, t, n, s) {
    const r = e[t * 3],
      a = e[t * 3 + 1],
      o = e[n * 3],
      c = e[n * 3 + 1],
      l = e[s * 3],
      u = e[s * 3 + 1];
    return [new ue(r, a), new ue(o, c), new ue(l, u)];
  },
  generateSideWallUV: function (i, e, t, n, s, r) {
    const a = e[t * 3],
      o = e[t * 3 + 1],
      c = e[t * 3 + 2],
      l = e[n * 3],
      u = e[n * 3 + 1],
      f = e[n * 3 + 2],
      h = e[s * 3],
      d = e[s * 3 + 1],
      g = e[s * 3 + 2],
      x = e[r * 3],
      m = e[r * 3 + 1],
      p = e[r * 3 + 2];
    return Math.abs(o - u) < Math.abs(a - l)
      ? [new ue(a, 1 - c), new ue(l, 1 - f), new ue(h, 1 - g), new ue(x, 1 - p)]
      : [
          new ue(o, 1 - c),
          new ue(u, 1 - f),
          new ue(d, 1 - g),
          new ue(m, 1 - p),
        ];
  },
};
function Zh(i, e, t) {
  if (((t.shapes = []), Array.isArray(i)))
    for (let n = 0, s = i.length; n < s; n++) {
      const r = i[n];
      t.shapes.push(r.uuid);
    }
  else t.shapes.push(i.uuid);
  return (
    (t.options = Object.assign({}, e)),
    e.extrudePath !== void 0 &&
      (t.options.extrudePath = e.extrudePath.toJSON()),
    t
  );
}
class $n extends ut {
  constructor(e = 1, t = 1, n = 1, s = 1) {
    (super(),
      (this.type = "PlaneGeometry"),
      (this.parameters = {
        width: e,
        height: t,
        widthSegments: n,
        heightSegments: s,
      }));
    const r = e / 2,
      a = t / 2,
      o = Math.floor(n),
      c = Math.floor(s),
      l = o + 1,
      u = c + 1,
      f = e / o,
      h = t / c,
      d = [],
      g = [],
      x = [],
      m = [];
    for (let p = 0; p < u; p++) {
      const S = p * h - a;
      for (let E = 0; E < l; E++) {
        const y = E * f - r;
        (g.push(y, -S, 0), x.push(0, 0, 1), m.push(E / o), m.push(1 - p / c));
      }
    }
    for (let p = 0; p < c; p++)
      for (let S = 0; S < o; S++) {
        const E = S + l * p,
          y = S + l * (p + 1),
          R = S + 1 + l * (p + 1),
          w = S + 1 + l * p;
        (d.push(E, y, w), d.push(y, R, w));
      }
    (this.setIndex(d),
      this.setAttribute("position", new $e(g, 3)),
      this.setAttribute("normal", new $e(x, 3)),
      this.setAttribute("uv", new $e(m, 2)));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.parameters = Object.assign({}, e.parameters)),
      this
    );
  }
  static fromJSON(e) {
    return new $n(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
class fr extends ut {
  constructor(e = 0.5, t = 1, n = 32, s = 1, r = 0, a = Math.PI * 2) {
    (super(),
      (this.type = "RingGeometry"),
      (this.parameters = {
        innerRadius: e,
        outerRadius: t,
        thetaSegments: n,
        phiSegments: s,
        thetaStart: r,
        thetaLength: a,
      }),
      (n = Math.max(3, n)),
      (s = Math.max(1, s)));
    const o = [],
      c = [],
      l = [],
      u = [];
    let f = e;
    const h = (t - e) / s,
      d = new D(),
      g = new ue();
    for (let x = 0; x <= s; x++) {
      for (let m = 0; m <= n; m++) {
        const p = r + (m / n) * a;
        ((d.x = f * Math.cos(p)),
          (d.y = f * Math.sin(p)),
          c.push(d.x, d.y, d.z),
          l.push(0, 0, 1),
          (g.x = (d.x / t + 1) / 2),
          (g.y = (d.y / t + 1) / 2),
          u.push(g.x, g.y));
      }
      f += h;
    }
    for (let x = 0; x < s; x++) {
      const m = x * (n + 1);
      for (let p = 0; p < n; p++) {
        const S = p + m,
          E = S,
          y = S + n + 1,
          R = S + n + 2,
          w = S + 1;
        (o.push(E, y, w), o.push(y, R, w));
      }
    }
    (this.setIndex(o),
      this.setAttribute("position", new $e(c, 3)),
      this.setAttribute("normal", new $e(l, 3)),
      this.setAttribute("uv", new $e(u, 2)));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.parameters = Object.assign({}, e.parameters)),
      this
    );
  }
  static fromJSON(e) {
    return new fr(
      e.innerRadius,
      e.outerRadius,
      e.thetaSegments,
      e.phiSegments,
      e.thetaStart,
      e.thetaLength,
    );
  }
}
class fs extends ut {
  constructor(
    e = new gr([new ue(0, 0.5), new ue(-0.5, -0.5), new ue(0.5, -0.5)]),
    t = 12,
  ) {
    (super(),
      (this.type = "ShapeGeometry"),
      (this.parameters = { shapes: e, curveSegments: t }));
    const n = [],
      s = [],
      r = [],
      a = [];
    let o = 0,
      c = 0;
    if (Array.isArray(e) === !1) l(e);
    else
      for (let u = 0; u < e.length; u++)
        (l(e[u]), this.addGroup(o, c, u), (o += c), (c = 0));
    (this.setIndex(n),
      this.setAttribute("position", new $e(s, 3)),
      this.setAttribute("normal", new $e(r, 3)),
      this.setAttribute("uv", new $e(a, 2)));
    function l(u) {
      const f = s.length / 3,
        h = u.extractPoints(t);
      let d = h.shape;
      const g = h.holes;
      vn.isClockWise(d) === !1 && (d = d.reverse());
      for (let m = 0, p = g.length; m < p; m++) {
        const S = g[m];
        vn.isClockWise(S) === !0 && (g[m] = S.reverse());
      }
      const x = vn.triangulateShape(d, g);
      for (let m = 0, p = g.length; m < p; m++) {
        const S = g[m];
        d = d.concat(S);
      }
      for (let m = 0, p = d.length; m < p; m++) {
        const S = d[m];
        (s.push(S.x, S.y, 0), r.push(0, 0, 1), a.push(S.x, S.y));
      }
      for (let m = 0, p = x.length; m < p; m++) {
        const S = x[m],
          E = S[0] + f,
          y = S[1] + f,
          R = S[2] + f;
        (n.push(E, y, R), (c += 3));
      }
    }
  }
  copy(e) {
    return (
      super.copy(e),
      (this.parameters = Object.assign({}, e.parameters)),
      this
    );
  }
  toJSON() {
    const e = super.toJSON(),
      t = this.parameters.shapes;
    return $h(t, e);
  }
  static fromJSON(e, t) {
    const n = [];
    for (let s = 0, r = e.shapes.length; s < r; s++) {
      const a = t[e.shapes[s]];
      n.push(a);
    }
    return new fs(n, e.curveSegments);
  }
}
function $h(i, e) {
  if (((e.shapes = []), Array.isArray(i)))
    for (let t = 0, n = i.length; t < n; t++) {
      const s = i[t];
      e.shapes.push(s.uuid);
    }
  else e.shapes.push(i.uuid);
  return e;
}
class Ro extends ut {
  constructor(
    e = 1,
    t = 32,
    n = 16,
    s = 0,
    r = Math.PI * 2,
    a = 0,
    o = Math.PI,
  ) {
    (super(),
      (this.type = "SphereGeometry"),
      (this.parameters = {
        radius: e,
        widthSegments: t,
        heightSegments: n,
        phiStart: s,
        phiLength: r,
        thetaStart: a,
        thetaLength: o,
      }),
      (t = Math.max(3, Math.floor(t))),
      (n = Math.max(2, Math.floor(n))));
    const c = Math.min(a + o, Math.PI);
    let l = 0;
    const u = [],
      f = new D(),
      h = new D(),
      d = [],
      g = [],
      x = [],
      m = [];
    for (let p = 0; p <= n; p++) {
      const S = [],
        E = p / n;
      let y = 0;
      p === 0 && a === 0
        ? (y = 0.5 / t)
        : p === n && c === Math.PI && (y = -0.5 / t);
      for (let R = 0; R <= t; R++) {
        const w = R / t;
        ((f.x = -e * Math.cos(s + w * r) * Math.sin(a + E * o)),
          (f.y = e * Math.cos(a + E * o)),
          (f.z = e * Math.sin(s + w * r) * Math.sin(a + E * o)),
          g.push(f.x, f.y, f.z),
          h.copy(f).normalize(),
          x.push(h.x, h.y, h.z),
          m.push(w + y, 1 - E),
          S.push(l++));
      }
      u.push(S);
    }
    for (let p = 0; p < n; p++)
      for (let S = 0; S < t; S++) {
        const E = u[p][S + 1],
          y = u[p][S],
          R = u[p + 1][S],
          w = u[p + 1][S + 1];
        ((p !== 0 || a > 0) && d.push(E, y, w),
          (p !== n - 1 || c < Math.PI) && d.push(y, R, w));
      }
    (this.setIndex(d),
      this.setAttribute("position", new $e(g, 3)),
      this.setAttribute("normal", new $e(x, 3)),
      this.setAttribute("uv", new $e(m, 2)));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.parameters = Object.assign({}, e.parameters)),
      this
    );
  }
  static fromJSON(e) {
    return new Ro(
      e.radius,
      e.widthSegments,
      e.heightSegments,
      e.phiStart,
      e.phiLength,
      e.thetaStart,
      e.thetaLength,
    );
  }
}
class dr extends ut {
  constructor(
    e = 1,
    t = 0.4,
    n = 12,
    s = 48,
    r = Math.PI * 2,
    a = 0,
    o = Math.PI * 2,
  ) {
    (super(),
      (this.type = "TorusGeometry"),
      (this.parameters = {
        radius: e,
        tube: t,
        radialSegments: n,
        tubularSegments: s,
        arc: r,
        thetaStart: a,
        thetaLength: o,
      }),
      (n = Math.floor(n)),
      (s = Math.floor(s)));
    const c = [],
      l = [],
      u = [],
      f = [],
      h = new D(),
      d = new D(),
      g = new D();
    for (let x = 0; x <= n; x++) {
      const m = a + (x / n) * o;
      for (let p = 0; p <= s; p++) {
        const S = (p / s) * r;
        ((d.x = (e + t * Math.cos(m)) * Math.cos(S)),
          (d.y = (e + t * Math.cos(m)) * Math.sin(S)),
          (d.z = t * Math.sin(m)),
          l.push(d.x, d.y, d.z),
          (h.x = e * Math.cos(S)),
          (h.y = e * Math.sin(S)),
          g.subVectors(d, h).normalize(),
          u.push(g.x, g.y, g.z),
          f.push(p / s),
          f.push(x / n));
      }
    }
    for (let x = 1; x <= n; x++)
      for (let m = 1; m <= s; m++) {
        const p = (s + 1) * x + m - 1,
          S = (s + 1) * (x - 1) + m - 1,
          E = (s + 1) * (x - 1) + m,
          y = (s + 1) * x + m;
        (c.push(p, S, y), c.push(S, E, y));
      }
    (this.setIndex(c),
      this.setAttribute("position", new $e(l, 3)),
      this.setAttribute("normal", new $e(u, 3)),
      this.setAttribute("uv", new $e(f, 2)));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.parameters = Object.assign({}, e.parameters)),
      this
    );
  }
  static fromJSON(e) {
    return new dr(e.radius, e.tube, e.radialSegments, e.tubularSegments, e.arc);
  }
}
class Po extends ut {
  constructor(
    e = new Co(new D(-1, -1, 0), new D(-1, 1, 0), new D(1, 1, 0)),
    t = 64,
    n = 1,
    s = 8,
    r = !1,
  ) {
    (super(),
      (this.type = "TubeGeometry"),
      (this.parameters = {
        path: e,
        tubularSegments: t,
        radius: n,
        radialSegments: s,
        closed: r,
      }));
    const a = e.computeFrenetFrames(t, r);
    ((this.tangents = a.tangents),
      (this.normals = a.normals),
      (this.binormals = a.binormals));
    const o = new D(),
      c = new D(),
      l = new ue();
    let u = new D();
    const f = [],
      h = [],
      d = [],
      g = [];
    (x(),
      this.setIndex(g),
      this.setAttribute("position", new $e(f, 3)),
      this.setAttribute("normal", new $e(h, 3)),
      this.setAttribute("uv", new $e(d, 2)));
    function x() {
      for (let E = 0; E < t; E++) m(E);
      (m(r === !1 ? t : 0), S(), p());
    }
    function m(E) {
      u = e.getPointAt(E / t, u);
      const y = a.normals[E],
        R = a.binormals[E];
      for (let w = 0; w <= s; w++) {
        const P = (w / s) * Math.PI * 2,
          v = Math.sin(P),
          b = -Math.cos(P);
        ((c.x = b * y.x + v * R.x),
          (c.y = b * y.y + v * R.y),
          (c.z = b * y.z + v * R.z),
          c.normalize(),
          h.push(c.x, c.y, c.z),
          (o.x = u.x + n * c.x),
          (o.y = u.y + n * c.y),
          (o.z = u.z + n * c.z),
          f.push(o.x, o.y, o.z));
      }
    }
    function p() {
      for (let E = 1; E <= t; E++)
        for (let y = 1; y <= s; y++) {
          const R = (s + 1) * (E - 1) + (y - 1),
            w = (s + 1) * E + (y - 1),
            P = (s + 1) * E + y,
            v = (s + 1) * (E - 1) + y;
          (g.push(R, w, v), g.push(w, P, v));
        }
    }
    function S() {
      for (let E = 0; E <= t; E++)
        for (let y = 0; y <= s; y++)
          ((l.x = E / t), (l.y = y / s), d.push(l.x, l.y));
    }
  }
  copy(e) {
    return (
      super.copy(e),
      (this.parameters = Object.assign({}, e.parameters)),
      this
    );
  }
  toJSON() {
    const e = super.toJSON();
    return ((e.path = this.parameters.path.toJSON()), e);
  }
  static fromJSON(e) {
    return new Po(
      new hr[e.path.type]().fromJSON(e.path),
      e.tubularSegments,
      e.radius,
      e.radialSegments,
      e.closed,
    );
  }
}
function Ri(i) {
  const e = {};
  for (const t in i) {
    e[t] = {};
    for (const n in i[t]) {
      const s = i[t][n];
      s &&
      (s.isColor ||
        s.isMatrix3 ||
        s.isMatrix4 ||
        s.isVector2 ||
        s.isVector3 ||
        s.isVector4 ||
        s.isTexture ||
        s.isQuaternion)
        ? s.isRenderTargetTexture
          ? (Ve(
              "UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().",
            ),
            (e[t][n] = null))
          : (e[t][n] = s.clone())
        : Array.isArray(s)
          ? (e[t][n] = s.slice())
          : (e[t][n] = s);
    }
  }
  return e;
}
function Dt(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = Ri(i[t]);
    for (const s in n) e[s] = n[s];
  }
  return e;
}
function Kh(i) {
  const e = [];
  for (let t = 0; t < i.length; t++) e.push(i[t].clone());
  return e;
}
function Uc(i) {
  const e = i.getRenderTarget();
  return e === null
    ? i.outputColorSpace
    : e.isXRRenderTarget === !0
      ? e.texture.colorSpace
      : et.workingColorSpace;
}
const ds = { clone: Ri, merge: Dt };
var jh = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  Qh = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Rt extends Ni {
  constructor(e) {
    (super(),
      (this.isShaderMaterial = !0),
      (this.type = "ShaderMaterial"),
      (this.defines = {}),
      (this.uniforms = {}),
      (this.uniformsGroups = []),
      (this.vertexShader = jh),
      (this.fragmentShader = Qh),
      (this.linewidth = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.fog = !1),
      (this.lights = !1),
      (this.clipping = !1),
      (this.forceSinglePass = !0),
      (this.extensions = { clipCullDistance: !1, multiDraw: !1 }),
      (this.defaultAttributeValues = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv1: [0, 0],
      }),
      (this.index0AttributeName = void 0),
      (this.uniformsNeedUpdate = !1),
      (this.glslVersion = null),
      e !== void 0 && this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.fragmentShader = e.fragmentShader),
      (this.vertexShader = e.vertexShader),
      (this.uniforms = Ri(e.uniforms)),
      (this.uniformsGroups = Kh(e.uniformsGroups)),
      (this.defines = Object.assign({}, e.defines)),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.fog = e.fog),
      (this.lights = e.lights),
      (this.clipping = e.clipping),
      (this.extensions = Object.assign({}, e.extensions)),
      (this.glslVersion = e.glslVersion),
      (this.defaultAttributeValues = Object.assign(
        {},
        e.defaultAttributeValues,
      )),
      (this.index0AttributeName = e.index0AttributeName),
      (this.uniformsNeedUpdate = e.uniformsNeedUpdate),
      this
    );
  }
  toJSON(e) {
    const t = super.toJSON(e);
    ((t.glslVersion = this.glslVersion), (t.uniforms = {}));
    for (const s in this.uniforms) {
      const a = this.uniforms[s].value;
      a && a.isTexture
        ? (t.uniforms[s] = { type: "t", value: a.toJSON(e).uuid })
        : a && a.isColor
          ? (t.uniforms[s] = { type: "c", value: a.getHex() })
          : a && a.isVector2
            ? (t.uniforms[s] = { type: "v2", value: a.toArray() })
            : a && a.isVector3
              ? (t.uniforms[s] = { type: "v3", value: a.toArray() })
              : a && a.isVector4
                ? (t.uniforms[s] = { type: "v4", value: a.toArray() })
                : a && a.isMatrix3
                  ? (t.uniforms[s] = { type: "m3", value: a.toArray() })
                  : a && a.isMatrix4
                    ? (t.uniforms[s] = { type: "m4", value: a.toArray() })
                    : (t.uniforms[s] = { value: a });
    }
    (Object.keys(this.defines).length > 0 && (t.defines = this.defines),
      (t.vertexShader = this.vertexShader),
      (t.fragmentShader = this.fragmentShader),
      (t.lights = this.lights),
      (t.clipping = this.clipping));
    const n = {};
    for (const s in this.extensions) this.extensions[s] === !0 && (n[s] = !0);
    return (Object.keys(n).length > 0 && (t.extensions = n), t);
  }
}
class Nc extends Rt {
  constructor(e) {
    (super(e),
      (this.isRawShaderMaterial = !0),
      (this.type = "RawShaderMaterial"));
  }
}
class mi extends Ni {
  constructor(e) {
    (super(),
      (this.isMeshStandardMaterial = !0),
      (this.type = "MeshStandardMaterial"),
      (this.defines = { STANDARD: "" }),
      (this.color = new He(16777215)),
      (this.roughness = 1),
      (this.metalness = 0),
      (this.map = null),
      (this.lightMap = null),
      (this.lightMapIntensity = 1),
      (this.aoMap = null),
      (this.aoMapIntensity = 1),
      (this.emissive = new He(0)),
      (this.emissiveIntensity = 1),
      (this.emissiveMap = null),
      (this.bumpMap = null),
      (this.bumpScale = 1),
      (this.normalMap = null),
      (this.normalMapType = gc),
      (this.normalScale = new ue(1, 1)),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.roughnessMap = null),
      (this.metalnessMap = null),
      (this.alphaMap = null),
      (this.envMap = null),
      (this.envMapRotation = new ln()),
      (this.envMapIntensity = 1),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      (this.wireframeLinecap = "round"),
      (this.wireframeLinejoin = "round"),
      (this.flatShading = !1),
      (this.fog = !0),
      this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.defines = { STANDARD: "" }),
      this.color.copy(e.color),
      (this.roughness = e.roughness),
      (this.metalness = e.metalness),
      (this.map = e.map),
      (this.lightMap = e.lightMap),
      (this.lightMapIntensity = e.lightMapIntensity),
      (this.aoMap = e.aoMap),
      (this.aoMapIntensity = e.aoMapIntensity),
      this.emissive.copy(e.emissive),
      (this.emissiveMap = e.emissiveMap),
      (this.emissiveIntensity = e.emissiveIntensity),
      (this.bumpMap = e.bumpMap),
      (this.bumpScale = e.bumpScale),
      (this.normalMap = e.normalMap),
      (this.normalMapType = e.normalMapType),
      this.normalScale.copy(e.normalScale),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.roughnessMap = e.roughnessMap),
      (this.metalnessMap = e.metalnessMap),
      (this.alphaMap = e.alphaMap),
      (this.envMap = e.envMap),
      this.envMapRotation.copy(e.envMapRotation),
      (this.envMapIntensity = e.envMapIntensity),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      (this.wireframeLinecap = e.wireframeLinecap),
      (this.wireframeLinejoin = e.wireframeLinejoin),
      (this.flatShading = e.flatShading),
      (this.fog = e.fog),
      this
    );
  }
}
class ef extends Ni {
  constructor(e) {
    (super(),
      (this.isMeshDepthMaterial = !0),
      (this.type = "MeshDepthMaterial"),
      (this.depthPacking = Su),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      (this.wireframe = !1),
      (this.wireframeLinewidth = 1),
      this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.depthPacking = e.depthPacking),
      (this.map = e.map),
      (this.alphaMap = e.alphaMap),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      (this.wireframe = e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth),
      this
    );
  }
}
class tf extends Ni {
  constructor(e) {
    (super(),
      (this.isMeshDistanceMaterial = !0),
      (this.type = "MeshDistanceMaterial"),
      (this.map = null),
      (this.alphaMap = null),
      (this.displacementMap = null),
      (this.displacementScale = 1),
      (this.displacementBias = 0),
      this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.map = e.map),
      (this.alphaMap = e.alphaMap),
      (this.displacementMap = e.displacementMap),
      (this.displacementScale = e.displacementScale),
      (this.displacementBias = e.displacementBias),
      this
    );
  }
}
class nf extends Xn {
  constructor(e) {
    (super(),
      (this.isLineDashedMaterial = !0),
      (this.type = "LineDashedMaterial"),
      (this.scale = 1),
      (this.dashSize = 3),
      (this.gapSize = 1),
      this.setValues(e));
  }
  copy(e) {
    return (
      super.copy(e),
      (this.scale = e.scale),
      (this.dashSize = e.dashSize),
      (this.gapSize = e.gapSize),
      this
    );
  }
}
class Lo extends St {
  constructor(e, t = 1) {
    (super(),
      (this.isLight = !0),
      (this.type = "Light"),
      (this.color = new He(e)),
      (this.intensity = t));
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      this.color.copy(e.color),
      (this.intensity = e.intensity),
      this
    );
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (
      (t.object.color = this.color.getHex()),
      (t.object.intensity = this.intensity),
      t
    );
  }
}
class I0 extends Lo {
  constructor(e, t, n) {
    (super(e, n),
      (this.isHemisphereLight = !0),
      (this.type = "HemisphereLight"),
      this.position.copy(St.DEFAULT_UP),
      this.updateMatrix(),
      (this.groundColor = new He(t)));
  }
  copy(e, t) {
    return (super.copy(e, t), this.groundColor.copy(e.groundColor), this);
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return ((t.object.groundColor = this.groundColor.getHex()), t);
  }
}
const Qr = new ot(),
  El = new D(),
  bl = new D();
class sf {
  constructor(e) {
    ((this.camera = e),
      (this.intensity = 1),
      (this.bias = 0),
      (this.biasNode = null),
      (this.normalBias = 0),
      (this.radius = 1),
      (this.blurSamples = 8),
      (this.mapSize = new ue(512, 512)),
      (this.mapType = Gt),
      (this.map = null),
      (this.mapPass = null),
      (this.matrix = new ot()),
      (this.autoUpdate = !0),
      (this.needsUpdate = !1),
      (this._frustum = new To()),
      (this._frameExtents = new ue(1, 1)),
      (this._viewportCount = 1),
      (this._viewports = [new dt(0, 0, 1, 1)]));
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera,
      n = this.matrix;
    (El.setFromMatrixPosition(e.matrixWorld),
      t.position.copy(El),
      bl.setFromMatrixPosition(e.target.matrixWorld),
      t.lookAt(bl),
      t.updateMatrixWorld(),
      Qr.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
      this._frustum.setFromProjectionMatrix(
        Qr,
        t.coordinateSystem,
        t.reversedDepth,
      ),
      t.coordinateSystem === as || t.reversedDepth
        ? n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 1)
        : n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
      n.multiply(Qr));
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    (this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose());
  }
  copy(e) {
    return (
      (this.camera = e.camera.clone()),
      (this.intensity = e.intensity),
      (this.bias = e.bias),
      (this.radius = e.radius),
      (this.autoUpdate = e.autoUpdate),
      (this.needsUpdate = e.needsUpdate),
      (this.normalBias = e.normalBias),
      (this.blurSamples = e.blurSamples),
      this.mapSize.copy(e.mapSize),
      (this.biasNode = e.biasNode),
      this
    );
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return (
      this.intensity !== 1 && (e.intensity = this.intensity),
      this.bias !== 0 && (e.bias = this.bias),
      this.normalBias !== 0 && (e.normalBias = this.normalBias),
      this.radius !== 1 && (e.radius = this.radius),
      (this.mapSize.x !== 512 || this.mapSize.y !== 512) &&
        (e.mapSize = this.mapSize.toArray()),
      (e.camera = this.camera.toJSON(!1).object),
      delete e.camera.matrix,
      e
    );
  }
}
const Xs = new D(),
  qs = new Ii(),
  tn = new D();
class Fc extends St {
  constructor() {
    (super(),
      (this.isCamera = !0),
      (this.type = "Camera"),
      (this.matrixWorldInverse = new ot()),
      (this.projectionMatrix = new ot()),
      (this.projectionMatrixInverse = new ot()),
      (this.coordinateSystem = rn),
      (this._reversedDepth = !1));
  }
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      this.matrixWorldInverse.copy(e.matrixWorldInverse),
      this.projectionMatrix.copy(e.projectionMatrix),
      this.projectionMatrixInverse.copy(e.projectionMatrixInverse),
      (this.coordinateSystem = e.coordinateSystem),
      this
    );
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    (super.updateMatrixWorld(e),
      this.matrixWorld.decompose(Xs, qs, tn),
      tn.x === 1 && tn.y === 1 && tn.z === 1
        ? this.matrixWorldInverse.copy(this.matrixWorld).invert()
        : this.matrixWorldInverse.compose(Xs, qs, tn.set(1, 1, 1)).invert());
  }
  updateWorldMatrix(e, t) {
    (super.updateWorldMatrix(e, t),
      this.matrixWorld.decompose(Xs, qs, tn),
      tn.x === 1 && tn.y === 1 && tn.z === 1
        ? this.matrixWorldInverse.copy(this.matrixWorld).invert()
        : this.matrixWorldInverse.compose(Xs, qs, tn.set(1, 1, 1)).invert());
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Cn = new D(),
  Tl = new ue(),
  Al = new ue();
class Wt extends Fc {
  constructor(e = 50, t = 1, n = 0.1, s = 2e3) {
    (super(),
      (this.isPerspectiveCamera = !0),
      (this.type = "PerspectiveCamera"),
      (this.fov = e),
      (this.zoom = 1),
      (this.near = n),
      (this.far = s),
      (this.focus = 10),
      (this.aspect = t),
      (this.view = null),
      (this.filmGauge = 35),
      (this.filmOffset = 0),
      this.updateProjectionMatrix());
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.fov = e.fov),
      (this.zoom = e.zoom),
      (this.near = e.near),
      (this.far = e.far),
      (this.focus = e.focus),
      (this.aspect = e.aspect),
      (this.view = e.view === null ? null : Object.assign({}, e.view)),
      (this.filmGauge = e.filmGauge),
      (this.filmOffset = e.filmOffset),
      this
    );
  }
  setFocalLength(e) {
    const t = (0.5 * this.getFilmHeight()) / e;
    ((this.fov = os * 2 * Math.atan(t)), this.updateProjectionMatrix());
  }
  getFocalLength() {
    const e = Math.tan(yi * 0.5 * this.fov);
    return (0.5 * this.getFilmHeight()) / e;
  }
  getEffectiveFOV() {
    return os * 2 * Math.atan(Math.tan(yi * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(e, t, n) {
    (Cn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse),
      t.set(Cn.x, Cn.y).multiplyScalar(-e / Cn.z),
      Cn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse),
      n.set(Cn.x, Cn.y).multiplyScalar(-e / Cn.z));
  }
  getViewSize(e, t) {
    return (this.getViewBounds(e, Tl, Al), t.subVectors(Al, Tl));
  }
  setViewOffset(e, t, n, s, r, a) {
    ((this.aspect = e / t),
      this.view === null &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        }),
      (this.view.enabled = !0),
      (this.view.fullWidth = e),
      (this.view.fullHeight = t),
      (this.view.offsetX = n),
      (this.view.offsetY = s),
      (this.view.width = r),
      (this.view.height = a),
      this.updateProjectionMatrix());
  }
  clearViewOffset() {
    (this.view !== null && (this.view.enabled = !1),
      this.updateProjectionMatrix());
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = (e * Math.tan(yi * 0.5 * this.fov)) / this.zoom,
      n = 2 * t,
      s = this.aspect * n,
      r = -0.5 * s;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const c = a.fullWidth,
        l = a.fullHeight;
      ((r += (a.offsetX * s) / c),
        (t -= (a.offsetY * n) / l),
        (s *= a.width / c),
        (n *= a.height / l));
    }
    const o = this.filmOffset;
    (o !== 0 && (r += (e * o) / this.getFilmWidth()),
      this.projectionMatrix.makePerspective(
        r,
        r + s,
        t,
        t - n,
        e,
        this.far,
        this.coordinateSystem,
        this.reversedDepth,
      ),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (
      (t.object.fov = this.fov),
      (t.object.zoom = this.zoom),
      (t.object.near = this.near),
      (t.object.far = this.far),
      (t.object.focus = this.focus),
      (t.object.aspect = this.aspect),
      this.view !== null && (t.object.view = Object.assign({}, this.view)),
      (t.object.filmGauge = this.filmGauge),
      (t.object.filmOffset = this.filmOffset),
      t
    );
  }
}
class _r extends Fc {
  constructor(e = -1, t = 1, n = 1, s = -1, r = 0.1, a = 2e3) {
    (super(),
      (this.isOrthographicCamera = !0),
      (this.type = "OrthographicCamera"),
      (this.zoom = 1),
      (this.view = null),
      (this.left = e),
      (this.right = t),
      (this.top = n),
      (this.bottom = s),
      (this.near = r),
      (this.far = a),
      this.updateProjectionMatrix());
  }
  copy(e, t) {
    return (
      super.copy(e, t),
      (this.left = e.left),
      (this.right = e.right),
      (this.top = e.top),
      (this.bottom = e.bottom),
      (this.near = e.near),
      (this.far = e.far),
      (this.zoom = e.zoom),
      (this.view = e.view === null ? null : Object.assign({}, e.view)),
      this
    );
  }
  setViewOffset(e, t, n, s, r, a) {
    (this.view === null &&
      (this.view = {
        enabled: !0,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1,
      }),
      (this.view.enabled = !0),
      (this.view.fullWidth = e),
      (this.view.fullHeight = t),
      (this.view.offsetX = n),
      (this.view.offsetY = s),
      (this.view.width = r),
      (this.view.height = a),
      this.updateProjectionMatrix());
  }
  clearViewOffset() {
    (this.view !== null && (this.view.enabled = !1),
      this.updateProjectionMatrix());
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom),
      t = (this.top - this.bottom) / (2 * this.zoom),
      n = (this.right + this.left) / 2,
      s = (this.top + this.bottom) / 2;
    let r = n - e,
      a = n + e,
      o = s + t,
      c = s - t;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom,
        u = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      ((r += l * this.view.offsetX),
        (a = r + l * this.view.width),
        (o -= u * this.view.offsetY),
        (c = o - u * this.view.height));
    }
    (this.projectionMatrix.makeOrthographic(
      r,
      a,
      o,
      c,
      this.near,
      this.far,
      this.coordinateSystem,
      this.reversedDepth,
    ),
      this.projectionMatrixInverse.copy(this.projectionMatrix).invert());
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (
      (t.object.zoom = this.zoom),
      (t.object.left = this.left),
      (t.object.right = this.right),
      (t.object.top = this.top),
      (t.object.bottom = this.bottom),
      (t.object.near = this.near),
      (t.object.far = this.far),
      this.view !== null && (t.object.view = Object.assign({}, this.view)),
      t
    );
  }
}
class rf extends sf {
  constructor() {
    (super(new _r(-5, 5, 5, -5, 0.5, 500)),
      (this.isDirectionalLightShadow = !0));
  }
}
class wl extends Lo {
  constructor(e, t) {
    (super(e, t),
      (this.isDirectionalLight = !0),
      (this.type = "DirectionalLight"),
      this.position.copy(St.DEFAULT_UP),
      this.updateMatrix(),
      (this.target = new St()),
      (this.shadow = new rf()));
  }
  dispose() {
    (super.dispose(), this.shadow.dispose());
  }
  copy(e) {
    return (
      super.copy(e),
      (this.target = e.target.clone()),
      (this.shadow = e.shadow.clone()),
      this
    );
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return (
      (t.object.shadow = this.shadow.toJSON()),
      (t.object.target = this.target.uuid),
      t
    );
  }
}
class af extends Lo {
  constructor(e, t) {
    (super(e, t), (this.isAmbientLight = !0), (this.type = "AmbientLight"));
  }
}
const gi = -90,
  _i = 1;
class of extends St {
  constructor(e, t, n) {
    (super(),
      (this.type = "CubeCamera"),
      (this.renderTarget = n),
      (this.coordinateSystem = null),
      (this.activeMipmapLevel = 0));
    const s = new Wt(gi, _i, e, t);
    ((s.layers = this.layers), this.add(s));
    const r = new Wt(gi, _i, e, t);
    ((r.layers = this.layers), this.add(r));
    const a = new Wt(gi, _i, e, t);
    ((a.layers = this.layers), this.add(a));
    const o = new Wt(gi, _i, e, t);
    ((o.layers = this.layers), this.add(o));
    const c = new Wt(gi, _i, e, t);
    ((c.layers = this.layers), this.add(c));
    const l = new Wt(gi, _i, e, t);
    ((l.layers = this.layers), this.add(l));
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem,
      t = this.children.concat(),
      [n, s, r, a, o, c] = t;
    for (const l of t) this.remove(l);
    if (e === rn)
      (n.up.set(0, 1, 0),
        n.lookAt(1, 0, 0),
        s.up.set(0, 1, 0),
        s.lookAt(-1, 0, 0),
        r.up.set(0, 0, -1),
        r.lookAt(0, 1, 0),
        a.up.set(0, 0, 1),
        a.lookAt(0, -1, 0),
        o.up.set(0, 1, 0),
        o.lookAt(0, 0, 1),
        c.up.set(0, 1, 0),
        c.lookAt(0, 0, -1));
    else if (e === as)
      (n.up.set(0, -1, 0),
        n.lookAt(-1, 0, 0),
        s.up.set(0, -1, 0),
        s.lookAt(1, 0, 0),
        r.up.set(0, 0, 1),
        r.lookAt(0, 1, 0),
        a.up.set(0, 0, -1),
        a.lookAt(0, -1, 0),
        o.up.set(0, -1, 0),
        o.lookAt(0, 0, 1),
        c.up.set(0, -1, 0),
        c.lookAt(0, 0, -1));
    else
      throw new Error(
        "THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " +
          e,
      );
    for (const l of t) (this.add(l), l.updateMatrixWorld());
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: s } = this;
    this.coordinateSystem !== e.coordinateSystem &&
      ((this.coordinateSystem = e.coordinateSystem),
      this.updateCoordinateSystem());
    const [r, a, o, c, l, u] = this.children,
      f = e.getRenderTarget(),
      h = e.getActiveCubeFace(),
      d = e.getActiveMipmapLevel(),
      g = e.xr.enabled;
    e.xr.enabled = !1;
    const x = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1;
    let m = !1;
    (e.isWebGLRenderer === !0
      ? (m = e.state.buffers.depth.getReversed())
      : (m = e.reversedDepthBuffer),
      e.setRenderTarget(n, 0, s),
      m && e.autoClear === !1 && e.clearDepth(),
      e.render(t, r),
      e.setRenderTarget(n, 1, s),
      m && e.autoClear === !1 && e.clearDepth(),
      e.render(t, a),
      e.setRenderTarget(n, 2, s),
      m && e.autoClear === !1 && e.clearDepth(),
      e.render(t, o),
      e.setRenderTarget(n, 3, s),
      m && e.autoClear === !1 && e.clearDepth(),
      e.render(t, c),
      e.setRenderTarget(n, 4, s),
      m && e.autoClear === !1 && e.clearDepth(),
      e.render(t, l),
      (n.texture.generateMipmaps = x),
      e.setRenderTarget(n, 5, s),
      m && e.autoClear === !1 && e.clearDepth(),
      e.render(t, u),
      e.setRenderTarget(f, h, d),
      (e.xr.enabled = g),
      (n.texture.needsPMREMUpdate = !0));
  }
}
class lf extends Wt {
  constructor(e = []) {
    (super(),
      (this.isArrayCamera = !0),
      (this.isMultiViewCamera = !1),
      (this.cameras = e));
  }
}
class cf {
  constructor() {
    ((this._previousTime = 0),
      (this._currentTime = 0),
      (this._startTime = performance.now()),
      (this._delta = 0),
      (this._elapsed = 0),
      (this._timescale = 1),
      (this._document = null),
      (this._pageVisibilityHandler = null));
  }
  connect(e) {
    ((this._document = e),
      e.hidden !== void 0 &&
        ((this._pageVisibilityHandler = uf.bind(this)),
        e.addEventListener(
          "visibilitychange",
          this._pageVisibilityHandler,
          !1,
        )));
  }
  disconnect() {
    (this._pageVisibilityHandler !== null &&
      (this._document.removeEventListener(
        "visibilitychange",
        this._pageVisibilityHandler,
      ),
      (this._pageVisibilityHandler = null)),
      (this._document = null));
  }
  getDelta() {
    return this._delta / 1e3;
  }
  getElapsed() {
    return this._elapsed / 1e3;
  }
  getTimescale() {
    return this._timescale;
  }
  setTimescale(e) {
    return ((this._timescale = e), this);
  }
  reset() {
    return ((this._currentTime = performance.now() - this._startTime), this);
  }
  dispose() {
    this.disconnect();
  }
  update(e) {
    return (
      this._pageVisibilityHandler !== null && this._document.hidden === !0
        ? (this._delta = 0)
        : ((this._previousTime = this._currentTime),
          (this._currentTime =
            (e !== void 0 ? e : performance.now()) - this._startTime),
          (this._delta =
            (this._currentTime - this._previousTime) * this._timescale),
          (this._elapsed += this._delta)),
      this
    );
  }
}
function uf() {
  this._document.hidden === !1 && this.reset();
}
const Cl = new ot();
class hf {
  constructor(e, t, n = 0, s = 1 / 0) {
    ((this.ray = new bo(e, t)),
      (this.near = n),
      (this.far = s),
      (this.camera = null),
      (this.layers = new Eo()),
      (this.params = {
        Mesh: {},
        Line: { threshold: 1 },
        LOD: {},
        Points: { threshold: 1 },
        Sprite: {},
      }));
  }
  set(e, t) {
    this.ray.set(e, t);
  }
  setFromCamera(e, t) {
    t.isPerspectiveCamera
      ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld),
        this.ray.direction
          .set(e.x, e.y, 0.5)
          .unproject(t)
          .sub(this.ray.origin)
          .normalize(),
        (this.camera = t))
      : t.isOrthographicCamera
        ? (this.ray.origin
            .set(e.x, e.y, (t.near + t.far) / (t.near - t.far))
            .unproject(t),
          this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld),
          (this.camera = t))
        : Qe("Raycaster: Unsupported camera type: " + t.type);
  }
  setFromXRController(e) {
    return (
      Cl.identity().extractRotation(e.matrixWorld),
      this.ray.origin.setFromMatrixPosition(e.matrixWorld),
      this.ray.direction.set(0, 0, -1).applyMatrix4(Cl),
      this
    );
  }
  intersectObject(e, t = !0, n = []) {
    return (eo(e, this, n, t), n.sort(Rl), n);
  }
  intersectObjects(e, t = !0, n = []) {
    for (let s = 0, r = e.length; s < r; s++) eo(e[s], this, n, t);
    return (n.sort(Rl), n);
  }
}
function Rl(i, e) {
  return i.distance - e.distance;
}
function eo(i, e, t, n) {
  let s = !0;
  if (
    (i.layers.test(e.layers) && i.raycast(e, t) === !1 && (s = !1),
    s === !0 && n === !0)
  ) {
    const r = i.children;
    for (let a = 0, o = r.length; a < o; a++) eo(r[a], e, t, !0);
  }
}
function Pl(i, e, t, n) {
  const s = ff(n);
  switch (t) {
    case pc:
      return i * e;
    case mo:
      return ((i * e) / s.components) * s.byteLength;
    case go:
      return ((i * e) / s.components) * s.byteLength;
    case Ai:
      return ((i * e * 2) / s.components) * s.byteLength;
    case _o:
      return ((i * e * 2) / s.components) * s.byteLength;
    case mc:
      return ((i * e * 3) / s.components) * s.byteLength;
    case Kt:
      return ((i * e * 4) / s.components) * s.byteLength;
    case vo:
      return ((i * e * 4) / s.components) * s.byteLength;
    case Qs:
    case er:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case tr:
    case nr:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case Ma:
    case ya:
      return (Math.max(i, 16) * Math.max(e, 8)) / 4;
    case xa:
    case Sa:
      return (Math.max(i, 8) * Math.max(e, 8)) / 2;
    case Ea:
    case ba:
    case Aa:
    case wa:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case Ta:
    case Ca:
    case Ra:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case Pa:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case La:
      return Math.floor((i + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case Da:
      return Math.floor((i + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case Ia:
      return Math.floor((i + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case Ua:
      return Math.floor((i + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case Na:
      return Math.floor((i + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case Fa:
      return Math.floor((i + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case Oa:
      return Math.floor((i + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case Ba:
      return Math.floor((i + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case za:
      return Math.floor((i + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case Va:
      return Math.floor((i + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case Ga:
      return Math.floor((i + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case Ha:
      return Math.floor((i + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case ka:
      return Math.floor((i + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    case Wa:
    case Xa:
    case qa:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
    case Ya:
    case Ja:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 8;
    case Za:
    case $a:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${t} format.`);
}
function ff(i) {
  switch (i) {
    case Gt:
    case uc:
      return { byteLength: 1, components: 1 };
    case ss:
    case hc:
    case Ot:
      return { byteLength: 2, components: 1 };
    case fo:
    case po:
      return { byteLength: 2, components: 4 };
    case on:
    case ho:
    case $t:
      return { byteLength: 4, components: 1 };
    case fc:
    case dc:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
typeof __THREE_DEVTOOLS__ < "u" &&
  __THREE_DEVTOOLS__.dispatchEvent(
    new CustomEvent("register", { detail: { revision: io } }),
  );
typeof window < "u" &&
  (window.__THREE__
    ? Ve("WARNING: Multiple instances of Three.js being imported.")
    : (window.__THREE__ = io));
function Oc() {
  let i = null,
    e = !1,
    t = null,
    n = null;
  function s(r, a) {
    (t(r, a), (n = i.requestAnimationFrame(s)));
  }
  return {
    start: function () {
      e !== !0 && t !== null && ((n = i.requestAnimationFrame(s)), (e = !0));
    },
    stop: function () {
      (i.cancelAnimationFrame(n), (e = !1));
    },
    setAnimationLoop: function (r) {
      t = r;
    },
    setContext: function (r) {
      i = r;
    },
  };
}
function df(i) {
  const e = new WeakMap();
  function t(o, c) {
    const l = o.array,
      u = o.usage,
      f = l.byteLength,
      h = i.createBuffer();
    (i.bindBuffer(c, h), i.bufferData(c, l, u), o.onUploadCallback());
    let d;
    if (l instanceof Float32Array) d = i.FLOAT;
    else if (typeof Float16Array < "u" && l instanceof Float16Array)
      d = i.HALF_FLOAT;
    else if (l instanceof Uint16Array)
      o.isFloat16BufferAttribute ? (d = i.HALF_FLOAT) : (d = i.UNSIGNED_SHORT);
    else if (l instanceof Int16Array) d = i.SHORT;
    else if (l instanceof Uint32Array) d = i.UNSIGNED_INT;
    else if (l instanceof Int32Array) d = i.INT;
    else if (l instanceof Int8Array) d = i.BYTE;
    else if (l instanceof Uint8Array) d = i.UNSIGNED_BYTE;
    else if (l instanceof Uint8ClampedArray) d = i.UNSIGNED_BYTE;
    else
      throw new Error(
        "THREE.WebGLAttributes: Unsupported buffer data format: " + l,
      );
    return {
      buffer: h,
      type: d,
      bytesPerElement: l.BYTES_PER_ELEMENT,
      version: o.version,
      size: f,
    };
  }
  function n(o, c, l) {
    const u = c.array,
      f = c.updateRanges;
    if ((i.bindBuffer(l, o), f.length === 0)) i.bufferSubData(l, 0, u);
    else {
      f.sort((d, g) => d.start - g.start);
      let h = 0;
      for (let d = 1; d < f.length; d++) {
        const g = f[h],
          x = f[d];
        x.start <= g.start + g.count + 1
          ? (g.count = Math.max(g.count, x.start + x.count - g.start))
          : (++h, (f[h] = x));
      }
      f.length = h + 1;
      for (let d = 0, g = f.length; d < g; d++) {
        const x = f[d];
        i.bufferSubData(l, x.start * u.BYTES_PER_ELEMENT, u, x.start, x.count);
      }
      c.clearUpdateRanges();
    }
    c.onUploadCallback();
  }
  function s(o) {
    return (o.isInterleavedBufferAttribute && (o = o.data), e.get(o));
  }
  function r(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const c = e.get(o);
    c && (i.deleteBuffer(c.buffer), e.delete(o));
  }
  function a(o, c) {
    if (
      (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute)
    ) {
      const u = e.get(o);
      (!u || u.version < o.version) &&
        e.set(o, {
          buffer: o.buffer,
          type: o.type,
          bytesPerElement: o.elementSize,
          version: o.version,
        });
      return;
    }
    const l = e.get(o);
    if (l === void 0) e.set(o, t(o, c));
    else if (l.version < o.version) {
      if (l.size !== o.array.byteLength)
        throw new Error(
          "THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.",
        );
      (n(l.buffer, o, c), (l.version = o.version));
    }
  }
  return { get: s, remove: r, update: a };
}
var pf = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
  mf = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
  gf = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
  _f = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  vf = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,
  xf = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
  Mf = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
  Sf = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
  yf = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,
  Ef = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,
  bf = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
  Tf = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
  Af = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
  wf = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
  Cf = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
  Rf = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,
  Pf = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
  Lf = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
  Df = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
  If = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,
  Uf = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,
  Nf = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,
  Ff = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,
  Of = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
  Bf = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
  zf = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,
  Vf = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
  Gf = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
  Hf = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
  kf = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
  Wf = "gl_FragColor = linearToOutputTexel( gl_FragColor );",
  Xf = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
  qf = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,
  Yf = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,
  Jf = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
  Zf = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
  $f = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
  Kf = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
  jf = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
  Qf = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
  ed = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
  td = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
  nd = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
  id = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
  sd = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
  rd = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,
  ad = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,
  od = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
  ld = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
  cd = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
  ud = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
  hd = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
  fd = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
  dd = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
  pd = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
  md = `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
  gd = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
  _d = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  vd = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  xd = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,
  Md = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
  Sd = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
  yd = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
  Ed = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  bd = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
  Td = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
  Ad = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,
  wd = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
  Cd = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  Rd = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,
  Pd = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  Ld = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
  Dd = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
  Id = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  Ud = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  Nd = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,
  Fd = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
  Od = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
  Bd = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
  zd = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
  Vd = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
  Gd = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
  Hd = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,
  kd = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
  Wd = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
  Xd = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
  qd = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
  Yd = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
  Jd = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
  Zd = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,
  $d = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
  Kd = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
  jd = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
  Qd = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
  ep = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
  tp = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
  np = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
  ip = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
  sp = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
  rp = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
  ap = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
  op = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
  lp = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
  cp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  up = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  hp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
  fp = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const dp = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
  pp = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  mp = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  gp = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  _p = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  vp = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  xp = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
  Mp = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,
  Sp = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
  yp = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,
  Ep = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
  bp = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  Tp = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  Ap = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  wp = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
  Cp = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Rp = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Pp = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Lp = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
  Dp = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Ip = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
  Up = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
  Np = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Fp = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Op = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
  Bp = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  zp = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Vp = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  Gp = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
  Hp = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  kp = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  Wp = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  Xp = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  qp = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,
  Xe = {
    alphahash_fragment: pf,
    alphahash_pars_fragment: mf,
    alphamap_fragment: gf,
    alphamap_pars_fragment: _f,
    alphatest_fragment: vf,
    alphatest_pars_fragment: xf,
    aomap_fragment: Mf,
    aomap_pars_fragment: Sf,
    batching_pars_vertex: yf,
    batching_vertex: Ef,
    begin_vertex: bf,
    beginnormal_vertex: Tf,
    bsdfs: Af,
    iridescence_fragment: wf,
    bumpmap_pars_fragment: Cf,
    clipping_planes_fragment: Rf,
    clipping_planes_pars_fragment: Pf,
    clipping_planes_pars_vertex: Lf,
    clipping_planes_vertex: Df,
    color_fragment: If,
    color_pars_fragment: Uf,
    color_pars_vertex: Nf,
    color_vertex: Ff,
    common: Of,
    cube_uv_reflection_fragment: Bf,
    defaultnormal_vertex: zf,
    displacementmap_pars_vertex: Vf,
    displacementmap_vertex: Gf,
    emissivemap_fragment: Hf,
    emissivemap_pars_fragment: kf,
    colorspace_fragment: Wf,
    colorspace_pars_fragment: Xf,
    envmap_fragment: qf,
    envmap_common_pars_fragment: Yf,
    envmap_pars_fragment: Jf,
    envmap_pars_vertex: Zf,
    envmap_physical_pars_fragment: ad,
    envmap_vertex: $f,
    fog_vertex: Kf,
    fog_pars_vertex: jf,
    fog_fragment: Qf,
    fog_pars_fragment: ed,
    gradientmap_pars_fragment: td,
    lightmap_pars_fragment: nd,
    lights_lambert_fragment: id,
    lights_lambert_pars_fragment: sd,
    lights_pars_begin: rd,
    lights_toon_fragment: od,
    lights_toon_pars_fragment: ld,
    lights_phong_fragment: cd,
    lights_phong_pars_fragment: ud,
    lights_physical_fragment: hd,
    lights_physical_pars_fragment: fd,
    lights_fragment_begin: dd,
    lights_fragment_maps: pd,
    lights_fragment_end: md,
    logdepthbuf_fragment: gd,
    logdepthbuf_pars_fragment: _d,
    logdepthbuf_pars_vertex: vd,
    logdepthbuf_vertex: xd,
    map_fragment: Md,
    map_pars_fragment: Sd,
    map_particle_fragment: yd,
    map_particle_pars_fragment: Ed,
    metalnessmap_fragment: bd,
    metalnessmap_pars_fragment: Td,
    morphinstance_vertex: Ad,
    morphcolor_vertex: wd,
    morphnormal_vertex: Cd,
    morphtarget_pars_vertex: Rd,
    morphtarget_vertex: Pd,
    normal_fragment_begin: Ld,
    normal_fragment_maps: Dd,
    normal_pars_fragment: Id,
    normal_pars_vertex: Ud,
    normal_vertex: Nd,
    normalmap_pars_fragment: Fd,
    clearcoat_normal_fragment_begin: Od,
    clearcoat_normal_fragment_maps: Bd,
    clearcoat_pars_fragment: zd,
    iridescence_pars_fragment: Vd,
    opaque_fragment: Gd,
    packing: Hd,
    premultiplied_alpha_fragment: kd,
    project_vertex: Wd,
    dithering_fragment: Xd,
    dithering_pars_fragment: qd,
    roughnessmap_fragment: Yd,
    roughnessmap_pars_fragment: Jd,
    shadowmap_pars_fragment: Zd,
    shadowmap_pars_vertex: $d,
    shadowmap_vertex: Kd,
    shadowmask_pars_fragment: jd,
    skinbase_vertex: Qd,
    skinning_pars_vertex: ep,
    skinning_vertex: tp,
    skinnormal_vertex: np,
    specularmap_fragment: ip,
    specularmap_pars_fragment: sp,
    tonemapping_fragment: rp,
    tonemapping_pars_fragment: ap,
    transmission_fragment: op,
    transmission_pars_fragment: lp,
    uv_pars_fragment: cp,
    uv_pars_vertex: up,
    uv_vertex: hp,
    worldpos_vertex: fp,
    background_vert: dp,
    background_frag: pp,
    backgroundCube_vert: mp,
    backgroundCube_frag: gp,
    cube_vert: _p,
    cube_frag: vp,
    depth_vert: xp,
    depth_frag: Mp,
    distance_vert: Sp,
    distance_frag: yp,
    equirect_vert: Ep,
    equirect_frag: bp,
    linedashed_vert: Tp,
    linedashed_frag: Ap,
    meshbasic_vert: wp,
    meshbasic_frag: Cp,
    meshlambert_vert: Rp,
    meshlambert_frag: Pp,
    meshmatcap_vert: Lp,
    meshmatcap_frag: Dp,
    meshnormal_vert: Ip,
    meshnormal_frag: Up,
    meshphong_vert: Np,
    meshphong_frag: Fp,
    meshphysical_vert: Op,
    meshphysical_frag: Bp,
    meshtoon_vert: zp,
    meshtoon_frag: Vp,
    points_vert: Gp,
    points_frag: Hp,
    shadow_vert: kp,
    shadow_frag: Wp,
    sprite_vert: Xp,
    sprite_frag: qp,
  },
  ve = {
    common: {
      diffuse: { value: new He(16777215) },
      opacity: { value: 1 },
      map: { value: null },
      mapTransform: { value: new We() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new We() },
      alphaTest: { value: 0 },
    },
    specularmap: {
      specularMap: { value: null },
      specularMapTransform: { value: new We() },
    },
    envmap: {
      envMap: { value: null },
      envMapRotation: { value: new We() },
      flipEnvMap: { value: -1 },
      reflectivity: { value: 1 },
      ior: { value: 1.5 },
      refractionRatio: { value: 0.98 },
      dfgLUT: { value: null },
    },
    aomap: {
      aoMap: { value: null },
      aoMapIntensity: { value: 1 },
      aoMapTransform: { value: new We() },
    },
    lightmap: {
      lightMap: { value: null },
      lightMapIntensity: { value: 1 },
      lightMapTransform: { value: new We() },
    },
    bumpmap: {
      bumpMap: { value: null },
      bumpMapTransform: { value: new We() },
      bumpScale: { value: 1 },
    },
    normalmap: {
      normalMap: { value: null },
      normalMapTransform: { value: new We() },
      normalScale: { value: new ue(1, 1) },
    },
    displacementmap: {
      displacementMap: { value: null },
      displacementMapTransform: { value: new We() },
      displacementScale: { value: 1 },
      displacementBias: { value: 0 },
    },
    emissivemap: {
      emissiveMap: { value: null },
      emissiveMapTransform: { value: new We() },
    },
    metalnessmap: {
      metalnessMap: { value: null },
      metalnessMapTransform: { value: new We() },
    },
    roughnessmap: {
      roughnessMap: { value: null },
      roughnessMapTransform: { value: new We() },
    },
    gradientmap: { gradientMap: { value: null } },
    fog: {
      fogDensity: { value: 25e-5 },
      fogNear: { value: 1 },
      fogFar: { value: 2e3 },
      fogColor: { value: new He(16777215) },
    },
    lights: {
      ambientLightColor: { value: [] },
      lightProbe: { value: [] },
      directionalLights: {
        value: [],
        properties: { direction: {}, color: {} },
      },
      directionalLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      directionalShadowMatrix: { value: [] },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {},
        },
      },
      spotLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
        },
      },
      spotLightMap: { value: [] },
      spotLightMatrix: { value: [] },
      pointLights: {
        value: [],
        properties: { color: {}, position: {}, decay: {}, distance: {} },
      },
      pointLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {},
        },
      },
      pointShadowMatrix: { value: [] },
      hemisphereLights: {
        value: [],
        properties: { direction: {}, skyColor: {}, groundColor: {} },
      },
      rectAreaLights: {
        value: [],
        properties: { color: {}, position: {}, width: {}, height: {} },
      },
      ltc_1: { value: null },
      ltc_2: { value: null },
    },
    points: {
      diffuse: { value: new He(16777215) },
      opacity: { value: 1 },
      size: { value: 1 },
      scale: { value: 1 },
      map: { value: null },
      alphaMap: { value: null },
      alphaMapTransform: { value: new We() },
      alphaTest: { value: 0 },
      uvTransform: { value: new We() },
    },
    sprite: {
      diffuse: { value: new He(16777215) },
      opacity: { value: 1 },
      center: { value: new ue(0.5, 0.5) },
      rotation: { value: 0 },
      map: { value: null },
      mapTransform: { value: new We() },
      alphaMap: { value: null },
      alphaMapTransform: { value: new We() },
      alphaTest: { value: 0 },
    },
  },
  sn = {
    basic: {
      uniforms: Dt([
        ve.common,
        ve.specularmap,
        ve.envmap,
        ve.aomap,
        ve.lightmap,
        ve.fog,
      ]),
      vertexShader: Xe.meshbasic_vert,
      fragmentShader: Xe.meshbasic_frag,
    },
    lambert: {
      uniforms: Dt([
        ve.common,
        ve.specularmap,
        ve.envmap,
        ve.aomap,
        ve.lightmap,
        ve.emissivemap,
        ve.bumpmap,
        ve.normalmap,
        ve.displacementmap,
        ve.fog,
        ve.lights,
        { emissive: { value: new He(0) }, envMapIntensity: { value: 1 } },
      ]),
      vertexShader: Xe.meshlambert_vert,
      fragmentShader: Xe.meshlambert_frag,
    },
    phong: {
      uniforms: Dt([
        ve.common,
        ve.specularmap,
        ve.envmap,
        ve.aomap,
        ve.lightmap,
        ve.emissivemap,
        ve.bumpmap,
        ve.normalmap,
        ve.displacementmap,
        ve.fog,
        ve.lights,
        {
          emissive: { value: new He(0) },
          specular: { value: new He(1118481) },
          shininess: { value: 30 },
          envMapIntensity: { value: 1 },
        },
      ]),
      vertexShader: Xe.meshphong_vert,
      fragmentShader: Xe.meshphong_frag,
    },
    standard: {
      uniforms: Dt([
        ve.common,
        ve.envmap,
        ve.aomap,
        ve.lightmap,
        ve.emissivemap,
        ve.bumpmap,
        ve.normalmap,
        ve.displacementmap,
        ve.roughnessmap,
        ve.metalnessmap,
        ve.fog,
        ve.lights,
        {
          emissive: { value: new He(0) },
          roughness: { value: 1 },
          metalness: { value: 0 },
          envMapIntensity: { value: 1 },
        },
      ]),
      vertexShader: Xe.meshphysical_vert,
      fragmentShader: Xe.meshphysical_frag,
    },
    toon: {
      uniforms: Dt([
        ve.common,
        ve.aomap,
        ve.lightmap,
        ve.emissivemap,
        ve.bumpmap,
        ve.normalmap,
        ve.displacementmap,
        ve.gradientmap,
        ve.fog,
        ve.lights,
        { emissive: { value: new He(0) } },
      ]),
      vertexShader: Xe.meshtoon_vert,
      fragmentShader: Xe.meshtoon_frag,
    },
    matcap: {
      uniforms: Dt([
        ve.common,
        ve.bumpmap,
        ve.normalmap,
        ve.displacementmap,
        ve.fog,
        { matcap: { value: null } },
      ]),
      vertexShader: Xe.meshmatcap_vert,
      fragmentShader: Xe.meshmatcap_frag,
    },
    points: {
      uniforms: Dt([ve.points, ve.fog]),
      vertexShader: Xe.points_vert,
      fragmentShader: Xe.points_frag,
    },
    dashed: {
      uniforms: Dt([
        ve.common,
        ve.fog,
        {
          scale: { value: 1 },
          dashSize: { value: 1 },
          totalSize: { value: 2 },
        },
      ]),
      vertexShader: Xe.linedashed_vert,
      fragmentShader: Xe.linedashed_frag,
    },
    depth: {
      uniforms: Dt([ve.common, ve.displacementmap]),
      vertexShader: Xe.depth_vert,
      fragmentShader: Xe.depth_frag,
    },
    normal: {
      uniforms: Dt([
        ve.common,
        ve.bumpmap,
        ve.normalmap,
        ve.displacementmap,
        { opacity: { value: 1 } },
      ]),
      vertexShader: Xe.meshnormal_vert,
      fragmentShader: Xe.meshnormal_frag,
    },
    sprite: {
      uniforms: Dt([ve.sprite, ve.fog]),
      vertexShader: Xe.sprite_vert,
      fragmentShader: Xe.sprite_frag,
    },
    background: {
      uniforms: {
        uvTransform: { value: new We() },
        t2D: { value: null },
        backgroundIntensity: { value: 1 },
      },
      vertexShader: Xe.background_vert,
      fragmentShader: Xe.background_frag,
    },
    backgroundCube: {
      uniforms: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        backgroundBlurriness: { value: 0 },
        backgroundIntensity: { value: 1 },
        backgroundRotation: { value: new We() },
      },
      vertexShader: Xe.backgroundCube_vert,
      fragmentShader: Xe.backgroundCube_frag,
    },
    cube: {
      uniforms: {
        tCube: { value: null },
        tFlip: { value: -1 },
        opacity: { value: 1 },
      },
      vertexShader: Xe.cube_vert,
      fragmentShader: Xe.cube_frag,
    },
    equirect: {
      uniforms: { tEquirect: { value: null } },
      vertexShader: Xe.equirect_vert,
      fragmentShader: Xe.equirect_frag,
    },
    distance: {
      uniforms: Dt([
        ve.common,
        ve.displacementmap,
        {
          referencePosition: { value: new D() },
          nearDistance: { value: 1 },
          farDistance: { value: 1e3 },
        },
      ]),
      vertexShader: Xe.distance_vert,
      fragmentShader: Xe.distance_frag,
    },
    shadow: {
      uniforms: Dt([
        ve.lights,
        ve.fog,
        { color: { value: new He(0) }, opacity: { value: 1 } },
      ]),
      vertexShader: Xe.shadow_vert,
      fragmentShader: Xe.shadow_frag,
    },
  };
sn.physical = {
  uniforms: Dt([
    sn.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: new We() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: new We() },
      clearcoatNormalScale: { value: new ue(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: new We() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: new We() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: new We() },
      sheen: { value: 0 },
      sheenColor: { value: new He(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: new We() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: new We() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: new We() },
      transmissionSamplerSize: { value: new ue() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: new We() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: new He(0) },
      specularColor: { value: new He(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: new We() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: new We() },
      anisotropyVector: { value: new ue() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: new We() },
    },
  ]),
  vertexShader: Xe.meshphysical_vert,
  fragmentShader: Xe.meshphysical_frag,
};
const Ys = { r: 0, b: 0, g: 0 },
  Gn = new ln(),
  Yp = new ot();
function Jp(i, e, t, n, s, r) {
  const a = new He(0);
  let o = s === !0 ? 0 : 1,
    c,
    l,
    u = null,
    f = 0,
    h = null;
  function d(S) {
    let E = S.isScene === !0 ? S.background : null;
    if (E && E.isTexture) {
      const y = S.backgroundBlurriness > 0;
      E = e.get(E, y);
    }
    return E;
  }
  function g(S) {
    let E = !1;
    const y = d(S);
    y === null ? m(a, o) : y && y.isColor && (m(y, 1), (E = !0));
    const R = i.xr.getEnvironmentBlendMode();
    (R === "additive"
      ? t.buffers.color.setClear(0, 0, 0, 1, r)
      : R === "alpha-blend" && t.buffers.color.setClear(0, 0, 0, 0, r),
      (i.autoClear || E) &&
        (t.buffers.depth.setTest(!0),
        t.buffers.depth.setMask(!0),
        t.buffers.color.setMask(!0),
        i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil)));
  }
  function x(S, E) {
    const y = d(E);
    y && (y.isCubeTexture || y.mapping === mr)
      ? (l === void 0 &&
          ((l = new je(
            new Fi(1, 1, 1),
            new Rt({
              name: "BackgroundCubeMaterial",
              uniforms: Ri(sn.backgroundCube.uniforms),
              vertexShader: sn.backgroundCube.vertexShader,
              fragmentShader: sn.backgroundCube.fragmentShader,
              side: Ft,
              depthTest: !1,
              depthWrite: !1,
              fog: !1,
              allowOverride: !1,
            }),
          )),
          l.geometry.deleteAttribute("normal"),
          l.geometry.deleteAttribute("uv"),
          (l.onBeforeRender = function (R, w, P) {
            this.matrixWorld.copyPosition(P.matrixWorld);
          }),
          Object.defineProperty(l.material, "envMap", {
            get: function () {
              return this.uniforms.envMap.value;
            },
          }),
          n.update(l)),
        Gn.copy(E.backgroundRotation),
        (Gn.x *= -1),
        (Gn.y *= -1),
        (Gn.z *= -1),
        y.isCubeTexture &&
          y.isRenderTargetTexture === !1 &&
          ((Gn.y *= -1), (Gn.z *= -1)),
        (l.material.uniforms.envMap.value = y),
        (l.material.uniforms.flipEnvMap.value =
          y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1),
        (l.material.uniforms.backgroundBlurriness.value =
          E.backgroundBlurriness),
        (l.material.uniforms.backgroundIntensity.value = E.backgroundIntensity),
        l.material.uniforms.backgroundRotation.value.setFromMatrix4(
          Yp.makeRotationFromEuler(Gn),
        ),
        (l.material.toneMapped = et.getTransfer(y.colorSpace) !== it),
        (u !== y || f !== y.version || h !== i.toneMapping) &&
          ((l.material.needsUpdate = !0),
          (u = y),
          (f = y.version),
          (h = i.toneMapping)),
        l.layers.enableAll(),
        S.unshift(l, l.geometry, l.material, 0, 0, null))
      : y &&
        y.isTexture &&
        (c === void 0 &&
          ((c = new je(
            new $n(2, 2),
            new Rt({
              name: "BackgroundMaterial",
              uniforms: Ri(sn.background.uniforms),
              vertexShader: sn.background.vertexShader,
              fragmentShader: sn.background.fragmentShader,
              side: In,
              depthTest: !1,
              depthWrite: !1,
              fog: !1,
              allowOverride: !1,
            }),
          )),
          c.geometry.deleteAttribute("normal"),
          Object.defineProperty(c.material, "map", {
            get: function () {
              return this.uniforms.t2D.value;
            },
          }),
          n.update(c)),
        (c.material.uniforms.t2D.value = y),
        (c.material.uniforms.backgroundIntensity.value = E.backgroundIntensity),
        (c.material.toneMapped = et.getTransfer(y.colorSpace) !== it),
        y.matrixAutoUpdate === !0 && y.updateMatrix(),
        c.material.uniforms.uvTransform.value.copy(y.matrix),
        (u !== y || f !== y.version || h !== i.toneMapping) &&
          ((c.material.needsUpdate = !0),
          (u = y),
          (f = y.version),
          (h = i.toneMapping)),
        c.layers.enableAll(),
        S.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function m(S, E) {
    (S.getRGB(Ys, Uc(i)), t.buffers.color.setClear(Ys.r, Ys.g, Ys.b, E, r));
  }
  function p() {
    (l !== void 0 && (l.geometry.dispose(), l.material.dispose(), (l = void 0)),
      c !== void 0 &&
        (c.geometry.dispose(), c.material.dispose(), (c = void 0)));
  }
  return {
    getClearColor: function () {
      return a;
    },
    setClearColor: function (S, E = 1) {
      (a.set(S), (o = E), m(a, o));
    },
    getClearAlpha: function () {
      return o;
    },
    setClearAlpha: function (S) {
      ((o = S), m(a, o));
    },
    render: g,
    addToRenderList: x,
    dispose: p,
  };
}
function Zp(i, e) {
  const t = i.getParameter(i.MAX_VERTEX_ATTRIBS),
    n = {},
    s = h(null);
  let r = s,
    a = !1;
  function o(C, V, G, H, N) {
    let O = !1;
    const F = f(C, H, G, V);
    (r !== F && ((r = F), l(r.object)),
      (O = d(C, H, G, N)),
      O && g(C, H, G, N),
      N !== null && e.update(N, i.ELEMENT_ARRAY_BUFFER),
      (O || a) &&
        ((a = !1),
        y(C, V, G, H),
        N !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(N).buffer)));
  }
  function c() {
    return i.createVertexArray();
  }
  function l(C) {
    return i.bindVertexArray(C);
  }
  function u(C) {
    return i.deleteVertexArray(C);
  }
  function f(C, V, G, H) {
    const N = H.wireframe === !0;
    let O = n[V.id];
    O === void 0 && ((O = {}), (n[V.id] = O));
    const F = C.isInstancedMesh === !0 ? C.id : 0;
    let ce = O[F];
    ce === void 0 && ((ce = {}), (O[F] = ce));
    let ie = ce[G.id];
    ie === void 0 && ((ie = {}), (ce[G.id] = ie));
    let ge = ie[N];
    return (ge === void 0 && ((ge = h(c())), (ie[N] = ge)), ge);
  }
  function h(C) {
    const V = [],
      G = [],
      H = [];
    for (let N = 0; N < t; N++) ((V[N] = 0), (G[N] = 0), (H[N] = 0));
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: V,
      enabledAttributes: G,
      attributeDivisors: H,
      object: C,
      attributes: {},
      index: null,
    };
  }
  function d(C, V, G, H) {
    const N = r.attributes,
      O = V.attributes;
    let F = 0;
    const ce = G.getAttributes();
    for (const ie in ce)
      if (ce[ie].location >= 0) {
        const xe = N[ie];
        let _e = O[ie];
        if (
          (_e === void 0 &&
            (ie === "instanceMatrix" &&
              C.instanceMatrix &&
              (_e = C.instanceMatrix),
            ie === "instanceColor" &&
              C.instanceColor &&
              (_e = C.instanceColor)),
          xe === void 0 || xe.attribute !== _e || (_e && xe.data !== _e.data))
        )
          return !0;
        F++;
      }
    return r.attributesNum !== F || r.index !== H;
  }
  function g(C, V, G, H) {
    const N = {},
      O = V.attributes;
    let F = 0;
    const ce = G.getAttributes();
    for (const ie in ce)
      if (ce[ie].location >= 0) {
        let xe = O[ie];
        xe === void 0 &&
          (ie === "instanceMatrix" &&
            C.instanceMatrix &&
            (xe = C.instanceMatrix),
          ie === "instanceColor" && C.instanceColor && (xe = C.instanceColor));
        const _e = {};
        ((_e.attribute = xe),
          xe && xe.data && (_e.data = xe.data),
          (N[ie] = _e),
          F++);
      }
    ((r.attributes = N), (r.attributesNum = F), (r.index = H));
  }
  function x() {
    const C = r.newAttributes;
    for (let V = 0, G = C.length; V < G; V++) C[V] = 0;
  }
  function m(C) {
    p(C, 0);
  }
  function p(C, V) {
    const G = r.newAttributes,
      H = r.enabledAttributes,
      N = r.attributeDivisors;
    ((G[C] = 1),
      H[C] === 0 && (i.enableVertexAttribArray(C), (H[C] = 1)),
      N[C] !== V && (i.vertexAttribDivisor(C, V), (N[C] = V)));
  }
  function S() {
    const C = r.newAttributes,
      V = r.enabledAttributes;
    for (let G = 0, H = V.length; G < H; G++)
      V[G] !== C[G] && (i.disableVertexAttribArray(G), (V[G] = 0));
  }
  function E(C, V, G, H, N, O, F) {
    F === !0
      ? i.vertexAttribIPointer(C, V, G, N, O)
      : i.vertexAttribPointer(C, V, G, H, N, O);
  }
  function y(C, V, G, H) {
    x();
    const N = H.attributes,
      O = G.getAttributes(),
      F = V.defaultAttributeValues;
    for (const ce in O) {
      const ie = O[ce];
      if (ie.location >= 0) {
        let ge = N[ce];
        if (
          (ge === void 0 &&
            (ce === "instanceMatrix" &&
              C.instanceMatrix &&
              (ge = C.instanceMatrix),
            ce === "instanceColor" &&
              C.instanceColor &&
              (ge = C.instanceColor)),
          ge !== void 0)
        ) {
          const xe = ge.normalized,
            _e = ge.itemSize,
            Ue = e.get(ge);
          if (Ue === void 0) continue;
          const Ze = Ue.buffer,
            Ke = Ue.type,
            $ = Ue.bytesPerElement,
            he = Ke === i.INT || Ke === i.UNSIGNED_INT || ge.gpuType === ho;
          if (ge.isInterleavedBufferAttribute) {
            const fe = ge.data,
              Be = fe.stride,
              we = ge.offset;
            if (fe.isInstancedInterleavedBuffer) {
              for (let Ne = 0; Ne < ie.locationSize; Ne++)
                p(ie.location + Ne, fe.meshPerAttribute);
              C.isInstancedMesh !== !0 &&
                H._maxInstanceCount === void 0 &&
                (H._maxInstanceCount = fe.meshPerAttribute * fe.count);
            } else
              for (let Ne = 0; Ne < ie.locationSize; Ne++) m(ie.location + Ne);
            i.bindBuffer(i.ARRAY_BUFFER, Ze);
            for (let Ne = 0; Ne < ie.locationSize; Ne++)
              E(
                ie.location + Ne,
                _e / ie.locationSize,
                Ke,
                xe,
                Be * $,
                (we + (_e / ie.locationSize) * Ne) * $,
                he,
              );
          } else {
            if (ge.isInstancedBufferAttribute) {
              for (let fe = 0; fe < ie.locationSize; fe++)
                p(ie.location + fe, ge.meshPerAttribute);
              C.isInstancedMesh !== !0 &&
                H._maxInstanceCount === void 0 &&
                (H._maxInstanceCount = ge.meshPerAttribute * ge.count);
            } else
              for (let fe = 0; fe < ie.locationSize; fe++) m(ie.location + fe);
            i.bindBuffer(i.ARRAY_BUFFER, Ze);
            for (let fe = 0; fe < ie.locationSize; fe++)
              E(
                ie.location + fe,
                _e / ie.locationSize,
                Ke,
                xe,
                _e * $,
                (_e / ie.locationSize) * fe * $,
                he,
              );
          }
        } else if (F !== void 0) {
          const xe = F[ce];
          if (xe !== void 0)
            switch (xe.length) {
              case 2:
                i.vertexAttrib2fv(ie.location, xe);
                break;
              case 3:
                i.vertexAttrib3fv(ie.location, xe);
                break;
              case 4:
                i.vertexAttrib4fv(ie.location, xe);
                break;
              default:
                i.vertexAttrib1fv(ie.location, xe);
            }
        }
      }
    }
    S();
  }
  function R() {
    b();
    for (const C in n) {
      const V = n[C];
      for (const G in V) {
        const H = V[G];
        for (const N in H) {
          const O = H[N];
          for (const F in O) (u(O[F].object), delete O[F]);
          delete H[N];
        }
      }
      delete n[C];
    }
  }
  function w(C) {
    if (n[C.id] === void 0) return;
    const V = n[C.id];
    for (const G in V) {
      const H = V[G];
      for (const N in H) {
        const O = H[N];
        for (const F in O) (u(O[F].object), delete O[F]);
        delete H[N];
      }
    }
    delete n[C.id];
  }
  function P(C) {
    for (const V in n) {
      const G = n[V];
      for (const H in G) {
        const N = G[H];
        if (N[C.id] === void 0) continue;
        const O = N[C.id];
        for (const F in O) (u(O[F].object), delete O[F]);
        delete N[C.id];
      }
    }
  }
  function v(C) {
    for (const V in n) {
      const G = n[V],
        H = C.isInstancedMesh === !0 ? C.id : 0,
        N = G[H];
      if (N !== void 0) {
        for (const O in N) {
          const F = N[O];
          for (const ce in F) (u(F[ce].object), delete F[ce]);
          delete N[O];
        }
        (delete G[H], Object.keys(G).length === 0 && delete n[V]);
      }
    }
  }
  function b() {
    (W(), (a = !0), r !== s && ((r = s), l(r.object)));
  }
  function W() {
    ((s.geometry = null), (s.program = null), (s.wireframe = !1));
  }
  return {
    setup: o,
    reset: b,
    resetDefaultState: W,
    dispose: R,
    releaseStatesOfGeometry: w,
    releaseStatesOfObject: v,
    releaseStatesOfProgram: P,
    initAttributes: x,
    enableAttribute: m,
    disableUnusedAttributes: S,
  };
}
function $p(i, e, t) {
  let n;
  function s(l) {
    n = l;
  }
  function r(l, u) {
    (i.drawArrays(n, l, u), t.update(u, n, 1));
  }
  function a(l, u, f) {
    f !== 0 && (i.drawArraysInstanced(n, l, u, f), t.update(u, n, f));
  }
  function o(l, u, f) {
    if (f === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, l, 0, u, 0, f);
    let d = 0;
    for (let g = 0; g < f; g++) d += u[g];
    t.update(d, n, 1);
  }
  function c(l, u, f, h) {
    if (f === 0) return;
    const d = e.get("WEBGL_multi_draw");
    if (d === null) for (let g = 0; g < l.length; g++) a(l[g], u[g], h[g]);
    else {
      d.multiDrawArraysInstancedWEBGL(n, l, 0, u, 0, h, 0, f);
      let g = 0;
      for (let x = 0; x < f; x++) g += u[x] * h[x];
      t.update(g, n, 1);
    }
  }
  ((this.setMode = s),
    (this.render = r),
    (this.renderInstances = a),
    (this.renderMultiDraw = o),
    (this.renderMultiDrawInstances = c));
}
function Kp(i, e, t, n) {
  let s;
  function r() {
    if (s !== void 0) return s;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const P = e.get("EXT_texture_filter_anisotropic");
      s = i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else s = 0;
    return s;
  }
  function a(P) {
    return !(
      P !== Kt &&
      n.convert(P) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)
    );
  }
  function o(P) {
    const v =
      P === Ot &&
      (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(
      P !== Gt &&
      n.convert(P) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) &&
      P !== $t &&
      !v
    );
  }
  function c(P) {
    if (P === "highp") {
      if (
        i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision >
          0 &&
        i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision >
          0
      )
        return "highp";
      P = "mediump";
    }
    return P === "mediump" &&
      i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision >
        0 &&
      i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision >
        0
      ? "mediump"
      : "lowp";
  }
  let l = t.precision !== void 0 ? t.precision : "highp";
  const u = c(l);
  u !== l &&
    (Ve("WebGLRenderer:", l, "not supported, using", u, "instead."), (l = u));
  const f = t.logarithmicDepthBuffer === !0,
    h = t.reversedDepthBuffer === !0 && e.has("EXT_clip_control"),
    d = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),
    g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    x = i.getParameter(i.MAX_TEXTURE_SIZE),
    m = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),
    p = i.getParameter(i.MAX_VERTEX_ATTRIBS),
    S = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),
    E = i.getParameter(i.MAX_VARYING_VECTORS),
    y = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),
    R = i.getParameter(i.MAX_SAMPLES),
    w = i.getParameter(i.SAMPLES);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: r,
    getMaxPrecision: c,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: l,
    logarithmicDepthBuffer: f,
    reversedDepthBuffer: h,
    maxTextures: d,
    maxVertexTextures: g,
    maxTextureSize: x,
    maxCubemapSize: m,
    maxAttributes: p,
    maxVertexUniforms: S,
    maxVaryings: E,
    maxFragmentUniforms: y,
    maxSamples: R,
    samples: w,
  };
}
function jp(i) {
  const e = this;
  let t = null,
    n = 0,
    s = !1,
    r = !1;
  const a = new kn(),
    o = new We(),
    c = { value: null, needsUpdate: !1 };
  ((this.uniform = c),
    (this.numPlanes = 0),
    (this.numIntersection = 0),
    (this.init = function (f, h) {
      const d = f.length !== 0 || h || n !== 0 || s;
      return ((s = h), (n = f.length), d);
    }),
    (this.beginShadows = function () {
      ((r = !0), u(null));
    }),
    (this.endShadows = function () {
      r = !1;
    }),
    (this.setGlobalState = function (f, h) {
      t = u(f, h, 0);
    }),
    (this.setState = function (f, h, d) {
      const g = f.clippingPlanes,
        x = f.clipIntersection,
        m = f.clipShadows,
        p = i.get(f);
      if (!s || g === null || g.length === 0 || (r && !m)) r ? u(null) : l();
      else {
        const S = r ? 0 : n,
          E = S * 4;
        let y = p.clippingState || null;
        ((c.value = y), (y = u(g, h, E, d)));
        for (let R = 0; R !== E; ++R) y[R] = t[R];
        ((p.clippingState = y),
          (this.numIntersection = x ? this.numPlanes : 0),
          (this.numPlanes += S));
      }
    }));
  function l() {
    (c.value !== t && ((c.value = t), (c.needsUpdate = n > 0)),
      (e.numPlanes = n),
      (e.numIntersection = 0));
  }
  function u(f, h, d, g) {
    const x = f !== null ? f.length : 0;
    let m = null;
    if (x !== 0) {
      if (((m = c.value), g !== !0 || m === null)) {
        const p = d + x * 4,
          S = h.matrixWorldInverse;
        (o.getNormalMatrix(S),
          (m === null || m.length < p) && (m = new Float32Array(p)));
        for (let E = 0, y = d; E !== x; ++E, y += 4)
          (a.copy(f[E]).applyMatrix4(S, o),
            a.normal.toArray(m, y),
            (m[y + 3] = a.constant));
      }
      ((c.value = m), (c.needsUpdate = !0));
    }
    return ((e.numPlanes = x), (e.numIntersection = 0), m);
  }
}
const Ln = 4,
  Ll = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582],
  qn = 20,
  Qp = 256,
  Yi = new _r(),
  Dl = new He();
let ea = null,
  ta = 0,
  na = 0,
  ia = !1;
const em = new D();
class Il {
  constructor(e) {
    ((this._renderer = e),
      (this._pingPongRenderTarget = null),
      (this._lodMax = 0),
      (this._cubeSize = 0),
      (this._sizeLods = []),
      (this._sigmas = []),
      (this._lodMeshes = []),
      (this._backgroundBox = null),
      (this._cubemapMaterial = null),
      (this._equirectMaterial = null),
      (this._blurMaterial = null),
      (this._ggxMaterial = null));
  }
  fromScene(e, t = 0, n = 0.1, s = 100, r = {}) {
    const { size: a = 256, position: o = em } = r;
    ((ea = this._renderer.getRenderTarget()),
      (ta = this._renderer.getActiveCubeFace()),
      (na = this._renderer.getActiveMipmapLevel()),
      (ia = this._renderer.xr.enabled),
      (this._renderer.xr.enabled = !1),
      this._setSize(a));
    const c = this._allocateTargets();
    return (
      (c.depthBuffer = !0),
      this._sceneToCubeUV(e, n, s, c, o),
      t > 0 && this._blur(c, 0, 0, t),
      this._applyPMREM(c),
      this._cleanup(c),
      c
    );
  }
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null &&
      ((this._cubemapMaterial = Fl()),
      this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null &&
      ((this._equirectMaterial = Nl()),
      this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    (this._dispose(),
      this._cubemapMaterial !== null && this._cubemapMaterial.dispose(),
      this._equirectMaterial !== null && this._equirectMaterial.dispose(),
      this._backgroundBox !== null &&
        (this._backgroundBox.geometry.dispose(),
        this._backgroundBox.material.dispose()));
  }
  _setSize(e) {
    ((this._lodMax = Math.floor(Math.log2(e))),
      (this._cubeSize = Math.pow(2, this._lodMax)));
  }
  _dispose() {
    (this._blurMaterial !== null && this._blurMaterial.dispose(),
      this._ggxMaterial !== null && this._ggxMaterial.dispose(),
      this._pingPongRenderTarget !== null &&
        this._pingPongRenderTarget.dispose());
    for (let e = 0; e < this._lodMeshes.length; e++)
      this._lodMeshes[e].geometry.dispose();
  }
  _cleanup(e) {
    (this._renderer.setRenderTarget(ea, ta, na),
      (this._renderer.xr.enabled = ia),
      (e.scissorTest = !1),
      vi(e, 0, 0, e.width, e.height));
  }
  _fromTexture(e, t) {
    (e.mapping === Kn || e.mapping === Ti
      ? this._setSize(
          e.image.length === 0
            ? 16
            : e.image[0].width || e.image[0].image.width,
        )
      : this._setSize(e.image.width / 4),
      (ea = this._renderer.getRenderTarget()),
      (ta = this._renderer.getActiveCubeFace()),
      (na = this._renderer.getActiveMipmapLevel()),
      (ia = this._renderer.xr.enabled),
      (this._renderer.xr.enabled = !1));
    const n = t || this._allocateTargets();
    return (
      this._textureToCubeUV(e, n),
      this._applyPMREM(n),
      this._cleanup(n),
      n
    );
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112),
      t = 4 * this._cubeSize,
      n = {
        magFilter: Ct,
        minFilter: Ct,
        generateMipmaps: !1,
        type: Ot,
        format: Kt,
        colorSpace: wi,
        depthBuffer: !1,
      },
      s = Ul(e, t, n);
    if (
      this._pingPongRenderTarget === null ||
      this._pingPongRenderTarget.width !== e ||
      this._pingPongRenderTarget.height !== t
    ) {
      (this._pingPongRenderTarget !== null && this._dispose(),
        (this._pingPongRenderTarget = Ul(e, t, n)));
      const { _lodMax: r } = this;
      (({
        lodMeshes: this._lodMeshes,
        sizeLods: this._sizeLods,
        sigmas: this._sigmas,
      } = tm(r)),
        (this._blurMaterial = im(r, e, t)),
        (this._ggxMaterial = nm(r, e, t)));
    }
    return s;
  }
  _compileMaterial(e) {
    const t = new je(new ut(), e);
    this._renderer.compile(t, Yi);
  }
  _sceneToCubeUV(e, t, n, s, r) {
    const c = new Wt(90, 1, t, n),
      l = [1, -1, 1, 1, 1, 1],
      u = [1, 1, 1, -1, -1, -1],
      f = this._renderer,
      h = f.autoClear,
      d = f.toneMapping;
    (f.getClearColor(Dl),
      (f.toneMapping = jt),
      (f.autoClear = !1),
      f.state.buffers.depth.getReversed() &&
        (f.setRenderTarget(s), f.clearDepth(), f.setRenderTarget(null)),
      this._backgroundBox === null &&
        (this._backgroundBox = new je(
          new Fi(),
          new Mt({
            name: "PMREM.Background",
            side: Ft,
            depthWrite: !1,
            depthTest: !1,
          }),
        )));
    const x = this._backgroundBox,
      m = x.material;
    let p = !1;
    const S = e.background;
    S
      ? S.isColor && (m.color.copy(S), (e.background = null), (p = !0))
      : (m.color.copy(Dl), (p = !0));
    for (let E = 0; E < 6; E++) {
      const y = E % 3;
      y === 0
        ? (c.up.set(0, l[E], 0),
          c.position.set(r.x, r.y, r.z),
          c.lookAt(r.x + u[E], r.y, r.z))
        : y === 1
          ? (c.up.set(0, 0, l[E]),
            c.position.set(r.x, r.y, r.z),
            c.lookAt(r.x, r.y + u[E], r.z))
          : (c.up.set(0, l[E], 0),
            c.position.set(r.x, r.y, r.z),
            c.lookAt(r.x, r.y, r.z + u[E]));
      const R = this._cubeSize;
      (vi(s, y * R, E > 2 ? R : 0, R, R),
        f.setRenderTarget(s),
        p && f.render(x, c),
        f.render(e, c));
    }
    ((f.toneMapping = d), (f.autoClear = h), (e.background = S));
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer,
      s = e.mapping === Kn || e.mapping === Ti;
    s
      ? (this._cubemapMaterial === null && (this._cubemapMaterial = Fl()),
        (this._cubemapMaterial.uniforms.flipEnvMap.value =
          e.isRenderTargetTexture === !1 ? -1 : 1))
      : this._equirectMaterial === null && (this._equirectMaterial = Nl());
    const r = s ? this._cubemapMaterial : this._equirectMaterial,
      a = this._lodMeshes[0];
    a.material = r;
    const o = r.uniforms;
    o.envMap.value = e;
    const c = this._cubeSize;
    (vi(t, 0, 0, 3 * c, 2 * c), n.setRenderTarget(t), n.render(a, Yi));
  }
  _applyPMREM(e) {
    const t = this._renderer,
      n = t.autoClear;
    t.autoClear = !1;
    const s = this._lodMeshes.length;
    for (let r = 1; r < s; r++) this._applyGGXFilter(e, r - 1, r);
    t.autoClear = n;
  }
  _applyGGXFilter(e, t, n) {
    const s = this._renderer,
      r = this._pingPongRenderTarget,
      a = this._ggxMaterial,
      o = this._lodMeshes[n];
    o.material = a;
    const c = a.uniforms,
      l = n / (this._lodMeshes.length - 1),
      u = t / (this._lodMeshes.length - 1),
      f = Math.sqrt(l * l - u * u),
      h = 0 + l * 1.25,
      d = f * h,
      { _lodMax: g } = this,
      x = this._sizeLods[n],
      m = 3 * x * (n > g - Ln ? n - g + Ln : 0),
      p = 4 * (this._cubeSize - x);
    ((c.envMap.value = e.texture),
      (c.roughness.value = d),
      (c.mipInt.value = g - t),
      vi(r, m, p, 3 * x, 2 * x),
      s.setRenderTarget(r),
      s.render(o, Yi),
      (c.envMap.value = r.texture),
      (c.roughness.value = 0),
      (c.mipInt.value = g - n),
      vi(e, m, p, 3 * x, 2 * x),
      s.setRenderTarget(e),
      s.render(o, Yi));
  }
  _blur(e, t, n, s, r) {
    const a = this._pingPongRenderTarget;
    (this._halfBlur(e, a, t, n, s, "latitudinal", r),
      this._halfBlur(a, e, n, n, s, "longitudinal", r));
  }
  _halfBlur(e, t, n, s, r, a, o) {
    const c = this._renderer,
      l = this._blurMaterial;
    a !== "latitudinal" &&
      a !== "longitudinal" &&
      Qe("blur direction must be either latitudinal or longitudinal!");
    const u = 3,
      f = this._lodMeshes[s];
    f.material = l;
    const h = l.uniforms,
      d = this._sizeLods[n] - 1,
      g = isFinite(r) ? Math.PI / (2 * d) : (2 * Math.PI) / (2 * qn - 1),
      x = r / g,
      m = isFinite(r) ? 1 + Math.floor(u * x) : qn;
    m > qn &&
      Ve(
        `sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${qn}`,
      );
    const p = [];
    let S = 0;
    for (let P = 0; P < qn; ++P) {
      const v = P / x,
        b = Math.exp((-v * v) / 2);
      (p.push(b), P === 0 ? (S += b) : P < m && (S += 2 * b));
    }
    for (let P = 0; P < p.length; P++) p[P] = p[P] / S;
    ((h.envMap.value = e.texture),
      (h.samples.value = m),
      (h.weights.value = p),
      (h.latitudinal.value = a === "latitudinal"),
      o && (h.poleAxis.value = o));
    const { _lodMax: E } = this;
    ((h.dTheta.value = g), (h.mipInt.value = E - n));
    const y = this._sizeLods[s],
      R = 3 * y * (s > E - Ln ? s - E + Ln : 0),
      w = 4 * (this._cubeSize - y);
    (vi(t, R, w, 3 * y, 2 * y), c.setRenderTarget(t), c.render(f, Yi));
  }
}
function tm(i) {
  const e = [],
    t = [],
    n = [];
  let s = i;
  const r = i - Ln + 1 + Ll.length;
  for (let a = 0; a < r; a++) {
    const o = Math.pow(2, s);
    e.push(o);
    let c = 1 / o;
    (a > i - Ln ? (c = Ll[a - i + Ln - 1]) : a === 0 && (c = 0), t.push(c));
    const l = 1 / (o - 2),
      u = -l,
      f = 1 + l,
      h = [u, u, f, u, f, f, u, u, f, f, u, f],
      d = 6,
      g = 6,
      x = 3,
      m = 2,
      p = 1,
      S = new Float32Array(x * g * d),
      E = new Float32Array(m * g * d),
      y = new Float32Array(p * g * d);
    for (let w = 0; w < d; w++) {
      const P = ((w % 3) * 2) / 3 - 1,
        v = w > 2 ? 0 : -1,
        b = [
          P,
          v,
          0,
          P + 2 / 3,
          v,
          0,
          P + 2 / 3,
          v + 1,
          0,
          P,
          v,
          0,
          P + 2 / 3,
          v + 1,
          0,
          P,
          v + 1,
          0,
        ];
      (S.set(b, x * g * w), E.set(h, m * g * w));
      const W = [w, w, w, w, w, w];
      y.set(W, p * g * w);
    }
    const R = new ut();
    (R.setAttribute("position", new Qt(S, x)),
      R.setAttribute("uv", new Qt(E, m)),
      R.setAttribute("faceIndex", new Qt(y, p)),
      n.push(new je(R, null)),
      s > Ln && s--);
  }
  return { lodMeshes: n, sizeLods: e, sigmas: t };
}
function Ul(i, e, t) {
  const n = new It(i, e, t);
  return (
    (n.texture.mapping = mr),
    (n.texture.name = "PMREM.cubeUv"),
    (n.scissorTest = !0),
    n
  );
}
function vi(i, e, t, n, s) {
  (i.viewport.set(e, t, n, s), i.scissor.set(e, t, n, s));
}
function nm(i, e, t) {
  return new Rt({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: Qp,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`,
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 },
    },
    vertexShader: vr(),
    fragmentShader: `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,
    blending: an,
    depthTest: !1,
    depthWrite: !1,
  });
}
function im(i, e, t) {
  const n = new Float32Array(qn),
    s = new D(0, 1, 0);
  return new Rt({
    name: "SphericalGaussianBlur",
    defines: {
      n: qn,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`,
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: s },
    },
    vertexShader: vr(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: an,
    depthTest: !1,
    depthWrite: !1,
  });
}
function Nl() {
  return new Rt({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: vr(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: an,
    depthTest: !1,
    depthWrite: !1,
  });
}
function Fl() {
  return new Rt({
    name: "CubemapToCubeUV",
    uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } },
    vertexShader: vr(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: an,
    depthTest: !1,
    depthWrite: !1,
  });
}
function vr() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
class Bc extends It {
  constructor(e = 1, t = {}) {
    (super(e, e, t), (this.isWebGLCubeRenderTarget = !0));
    const n = { width: e, height: e, depth: 1 },
      s = [n, n, n, n, n, n];
    ((this.texture = new Ec(s)),
      this._setTextureOptions(t),
      (this.texture.isRenderTargetTexture = !0));
  }
  fromEquirectangularTexture(e, t) {
    ((this.texture.type = t.type),
      (this.texture.colorSpace = t.colorSpace),
      (this.texture.generateMipmaps = t.generateMipmaps),
      (this.texture.minFilter = t.minFilter),
      (this.texture.magFilter = t.magFilter));
    const n = {
        uniforms: { tEquirect: { value: null } },
        vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
        fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`,
      },
      s = new Fi(5, 5, 5),
      r = new Rt({
        name: "CubemapFromEquirect",
        uniforms: Ri(n.uniforms),
        vertexShader: n.vertexShader,
        fragmentShader: n.fragmentShader,
        side: Ft,
        blending: an,
      });
    r.uniforms.tEquirect.value = t;
    const a = new je(s, r),
      o = t.minFilter;
    return (
      t.minFilter === Yn && (t.minFilter = Ct),
      new of(1, 10, this).update(e, a),
      (t.minFilter = o),
      a.geometry.dispose(),
      a.material.dispose(),
      this
    );
  }
  clear(e, t = !0, n = !0, s = !0) {
    const r = e.getRenderTarget();
    for (let a = 0; a < 6; a++) (e.setRenderTarget(this, a), e.clear(t, n, s));
    e.setRenderTarget(r);
  }
}
function sm(i) {
  let e = new WeakMap(),
    t = new WeakMap(),
    n = null;
  function s(h, d = !1) {
    return h == null ? null : d ? a(h) : r(h);
  }
  function r(h) {
    if (h && h.isTexture) {
      const d = h.mapping;
      if (d === Er || d === br)
        if (e.has(h)) {
          const g = e.get(h).texture;
          return o(g, h.mapping);
        } else {
          const g = h.image;
          if (g && g.height > 0) {
            const x = new Bc(g.height);
            return (
              x.fromEquirectangularTexture(i, h),
              e.set(h, x),
              h.addEventListener("dispose", l),
              o(x.texture, h.mapping)
            );
          } else return null;
        }
    }
    return h;
  }
  function a(h) {
    if (h && h.isTexture) {
      const d = h.mapping,
        g = d === Er || d === br,
        x = d === Kn || d === Ti;
      if (g || x) {
        let m = t.get(h);
        const p = m !== void 0 ? m.texture.pmremVersion : 0;
        if (h.isRenderTargetTexture && h.pmremVersion !== p)
          return (
            n === null && (n = new Il(i)),
            (m = g ? n.fromEquirectangular(h, m) : n.fromCubemap(h, m)),
            (m.texture.pmremVersion = h.pmremVersion),
            t.set(h, m),
            m.texture
          );
        if (m !== void 0) return m.texture;
        {
          const S = h.image;
          return (g && S && S.height > 0) || (x && S && c(S))
            ? (n === null && (n = new Il(i)),
              (m = g ? n.fromEquirectangular(h) : n.fromCubemap(h)),
              (m.texture.pmremVersion = h.pmremVersion),
              t.set(h, m),
              h.addEventListener("dispose", u),
              m.texture)
            : null;
        }
      }
    }
    return h;
  }
  function o(h, d) {
    return (d === Er ? (h.mapping = Kn) : d === br && (h.mapping = Ti), h);
  }
  function c(h) {
    let d = 0;
    const g = 6;
    for (let x = 0; x < g; x++) h[x] !== void 0 && d++;
    return d === g;
  }
  function l(h) {
    const d = h.target;
    d.removeEventListener("dispose", l);
    const g = e.get(d);
    g !== void 0 && (e.delete(d), g.dispose());
  }
  function u(h) {
    const d = h.target;
    d.removeEventListener("dispose", u);
    const g = t.get(d);
    g !== void 0 && (t.delete(d), g.dispose());
  }
  function f() {
    ((e = new WeakMap()),
      (t = new WeakMap()),
      n !== null && (n.dispose(), (n = null)));
  }
  return { get: s, dispose: f };
}
function rm(i) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0) return e[n];
    const s = i.getExtension(n);
    return ((e[n] = s), s);
  }
  return {
    has: function (n) {
      return t(n) !== null;
    },
    init: function () {
      (t("EXT_color_buffer_float"),
        t("WEBGL_clip_cull_distance"),
        t("OES_texture_float_linear"),
        t("EXT_color_buffer_half_float"),
        t("WEBGL_multisampled_render_to_texture"),
        t("WEBGL_render_shared_exponent"));
    },
    get: function (n) {
      const s = t(n);
      return (
        s === null && lr("WebGLRenderer: " + n + " extension not supported."),
        s
      );
    },
  };
}
function am(i, e, t, n) {
  const s = {},
    r = new WeakMap();
  function a(f) {
    const h = f.target;
    h.index !== null && e.remove(h.index);
    for (const g in h.attributes) e.remove(h.attributes[g]);
    (h.removeEventListener("dispose", a), delete s[h.id]);
    const d = r.get(h);
    (d && (e.remove(d), r.delete(h)),
      n.releaseStatesOfGeometry(h),
      h.isInstancedBufferGeometry === !0 && delete h._maxInstanceCount,
      t.memory.geometries--);
  }
  function o(f, h) {
    return (
      s[h.id] === !0 ||
        (h.addEventListener("dispose", a),
        (s[h.id] = !0),
        t.memory.geometries++),
      h
    );
  }
  function c(f) {
    const h = f.attributes;
    for (const d in h) e.update(h[d], i.ARRAY_BUFFER);
  }
  function l(f) {
    const h = [],
      d = f.index,
      g = f.attributes.position;
    let x = 0;
    if (g === void 0) return;
    if (d !== null) {
      const S = d.array;
      x = d.version;
      for (let E = 0, y = S.length; E < y; E += 3) {
        const R = S[E + 0],
          w = S[E + 1],
          P = S[E + 2];
        h.push(R, w, w, P, P, R);
      }
    } else {
      const S = g.array;
      x = g.version;
      for (let E = 0, y = S.length / 3 - 1; E < y; E += 3) {
        const R = E + 0,
          w = E + 1,
          P = E + 2;
        h.push(R, w, w, P, P, R);
      }
    }
    const m = new (g.count >= 65535 ? Sc : Mc)(h, 1);
    m.version = x;
    const p = r.get(f);
    (p && e.remove(p), r.set(f, m));
  }
  function u(f) {
    const h = r.get(f);
    if (h) {
      const d = f.index;
      d !== null && h.version < d.version && l(f);
    } else l(f);
    return r.get(f);
  }
  return { get: o, update: c, getWireframeAttribute: u };
}
function om(i, e, t) {
  let n;
  function s(h) {
    n = h;
  }
  let r, a;
  function o(h) {
    ((r = h.type), (a = h.bytesPerElement));
  }
  function c(h, d) {
    (i.drawElements(n, d, r, h * a), t.update(d, n, 1));
  }
  function l(h, d, g) {
    g !== 0 && (i.drawElementsInstanced(n, d, r, h * a, g), t.update(d, n, g));
  }
  function u(h, d, g) {
    if (g === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, d, 0, r, h, 0, g);
    let m = 0;
    for (let p = 0; p < g; p++) m += d[p];
    t.update(m, n, 1);
  }
  function f(h, d, g, x) {
    if (g === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null) for (let p = 0; p < h.length; p++) l(h[p] / a, d[p], x[p]);
    else {
      m.multiDrawElementsInstancedWEBGL(n, d, 0, r, h, 0, x, 0, g);
      let p = 0;
      for (let S = 0; S < g; S++) p += d[S] * x[S];
      t.update(p, n, 1);
    }
  }
  ((this.setMode = s),
    (this.setIndex = o),
    (this.render = c),
    (this.renderInstances = l),
    (this.renderMultiDraw = u),
    (this.renderMultiDrawInstances = f));
}
function lm(i) {
  const e = { geometries: 0, textures: 0 },
    t = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
  function n(r, a, o) {
    switch ((t.calls++, a)) {
      case i.TRIANGLES:
        t.triangles += o * (r / 3);
        break;
      case i.LINES:
        t.lines += o * (r / 2);
        break;
      case i.LINE_STRIP:
        t.lines += o * (r - 1);
        break;
      case i.LINE_LOOP:
        t.lines += o * r;
        break;
      case i.POINTS:
        t.points += o * r;
        break;
      default:
        Qe("WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function s() {
    ((t.calls = 0), (t.triangles = 0), (t.points = 0), (t.lines = 0));
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: s,
    update: n,
  };
}
function cm(i, e, t) {
  const n = new WeakMap(),
    s = new dt();
  function r(a, o, c) {
    const l = a.morphTargetInfluences,
      u =
        o.morphAttributes.position ||
        o.morphAttributes.normal ||
        o.morphAttributes.color,
      f = u !== void 0 ? u.length : 0;
    let h = n.get(o);
    if (h === void 0 || h.count !== f) {
      let b = function () {
        (P.dispose(), n.delete(o), o.removeEventListener("dispose", b));
      };
      h !== void 0 && h.texture.dispose();
      const d = o.morphAttributes.position !== void 0,
        g = o.morphAttributes.normal !== void 0,
        x = o.morphAttributes.color !== void 0,
        m = o.morphAttributes.position || [],
        p = o.morphAttributes.normal || [],
        S = o.morphAttributes.color || [];
      let E = 0;
      (d === !0 && (E = 1), g === !0 && (E = 2), x === !0 && (E = 3));
      let y = o.attributes.position.count * E,
        R = 1;
      y > e.maxTextureSize &&
        ((R = Math.ceil(y / e.maxTextureSize)), (y = e.maxTextureSize));
      const w = new Float32Array(y * R * 4 * f),
        P = new vc(w, y, R, f);
      ((P.type = $t), (P.needsUpdate = !0));
      const v = E * 4;
      for (let W = 0; W < f; W++) {
        const C = m[W],
          V = p[W],
          G = S[W],
          H = y * R * 4 * W;
        for (let N = 0; N < C.count; N++) {
          const O = N * v;
          (d === !0 &&
            (s.fromBufferAttribute(C, N),
            (w[H + O + 0] = s.x),
            (w[H + O + 1] = s.y),
            (w[H + O + 2] = s.z),
            (w[H + O + 3] = 0)),
            g === !0 &&
              (s.fromBufferAttribute(V, N),
              (w[H + O + 4] = s.x),
              (w[H + O + 5] = s.y),
              (w[H + O + 6] = s.z),
              (w[H + O + 7] = 0)),
            x === !0 &&
              (s.fromBufferAttribute(G, N),
              (w[H + O + 8] = s.x),
              (w[H + O + 9] = s.y),
              (w[H + O + 10] = s.z),
              (w[H + O + 11] = G.itemSize === 4 ? s.w : 1)));
        }
      }
      ((h = { count: f, texture: P, size: new ue(y, R) }),
        n.set(o, h),
        o.addEventListener("dispose", b));
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      c.getUniforms().setValue(i, "morphTexture", a.morphTexture, t);
    else {
      let d = 0;
      for (let x = 0; x < l.length; x++) d += l[x];
      const g = o.morphTargetsRelative ? 1 : 1 - d;
      (c.getUniforms().setValue(i, "morphTargetBaseInfluence", g),
        c.getUniforms().setValue(i, "morphTargetInfluences", l));
    }
    (c.getUniforms().setValue(i, "morphTargetsTexture", h.texture, t),
      c.getUniforms().setValue(i, "morphTargetsTextureSize", h.size));
  }
  return { update: r };
}
function um(i, e, t, n, s) {
  let r = new WeakMap();
  function a(l) {
    const u = s.render.frame,
      f = l.geometry,
      h = e.get(l, f);
    if (
      (r.get(h) !== u && (e.update(h), r.set(h, u)),
      l.isInstancedMesh &&
        (l.hasEventListener("dispose", c) === !1 &&
          l.addEventListener("dispose", c),
        r.get(l) !== u &&
          (t.update(l.instanceMatrix, i.ARRAY_BUFFER),
          l.instanceColor !== null && t.update(l.instanceColor, i.ARRAY_BUFFER),
          r.set(l, u))),
      l.isSkinnedMesh)
    ) {
      const d = l.skeleton;
      r.get(d) !== u && (d.update(), r.set(d, u));
    }
    return h;
  }
  function o() {
    r = new WeakMap();
  }
  function c(l) {
    const u = l.target;
    (u.removeEventListener("dispose", c),
      n.releaseStatesOfObject(u),
      t.remove(u.instanceMatrix),
      u.instanceColor !== null && t.remove(u.instanceColor));
  }
  return { update: a, dispose: o };
}
const hm = {
  [so]: "LINEAR_TONE_MAPPING",
  [ro]: "REINHARD_TONE_MAPPING",
  [ao]: "CINEON_TONE_MAPPING",
  [oo]: "ACES_FILMIC_TONE_MAPPING",
  [co]: "AGX_TONE_MAPPING",
  [uo]: "NEUTRAL_TONE_MAPPING",
  [lo]: "CUSTOM_TONE_MAPPING",
};
function fm(i, e, t, n, s) {
  const r = new It(e, t, { type: i, depthBuffer: n, stencilBuffer: s }),
    a = new It(e, t, { type: Ot, depthBuffer: !1, stencilBuffer: !1 }),
    o = new ut();
  (o.setAttribute("position", new $e([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)),
    o.setAttribute("uv", new $e([0, 2, 0, 0, 2, 0], 2)));
  const c = new Nc({
      uniforms: { tDiffuse: { value: null } },
      vertexShader: `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,
      fragmentShader: `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,
      depthTest: !1,
      depthWrite: !1,
    }),
    l = new je(o, c),
    u = new _r(-1, 1, 1, -1, 0, 1);
  let f = null,
    h = null,
    d = !1,
    g,
    x = null,
    m = [],
    p = !1;
  ((this.setSize = function (S, E) {
    (r.setSize(S, E), a.setSize(S, E));
    for (let y = 0; y < m.length; y++) {
      const R = m[y];
      R.setSize && R.setSize(S, E);
    }
  }),
    (this.setEffects = function (S) {
      ((m = S), (p = m.length > 0 && m[0].isRenderPass === !0));
      const E = r.width,
        y = r.height;
      for (let R = 0; R < m.length; R++) {
        const w = m[R];
        w.setSize && w.setSize(E, y);
      }
    }),
    (this.begin = function (S, E) {
      if (d || (S.toneMapping === jt && m.length === 0)) return !1;
      if (((x = E), E !== null)) {
        const y = E.width,
          R = E.height;
        (r.width !== y || r.height !== R) && this.setSize(y, R);
      }
      return (
        p === !1 && S.setRenderTarget(r),
        (g = S.toneMapping),
        (S.toneMapping = jt),
        !0
      );
    }),
    (this.hasRenderPass = function () {
      return p;
    }),
    (this.end = function (S, E) {
      ((S.toneMapping = g), (d = !0));
      let y = r,
        R = a;
      for (let w = 0; w < m.length; w++) {
        const P = m[w];
        if (P.enabled !== !1 && (P.render(S, R, y, E), P.needsSwap !== !1)) {
          const v = y;
          ((y = R), (R = v));
        }
      }
      if (f !== S.outputColorSpace || h !== S.toneMapping) {
        ((f = S.outputColorSpace),
          (h = S.toneMapping),
          (c.defines = {}),
          et.getTransfer(f) === it && (c.defines.SRGB_TRANSFER = ""));
        const w = hm[h];
        (w && (c.defines[w] = ""), (c.needsUpdate = !0));
      }
      ((c.uniforms.tDiffuse.value = y.texture),
        S.setRenderTarget(x),
        S.render(l, u),
        (x = null),
        (d = !1));
    }),
    (this.isCompositing = function () {
      return d;
    }),
    (this.dispose = function () {
      (r.dispose(), a.dispose(), o.dispose(), c.dispose());
    }));
}
const zc = new bt(),
  to = new ls(1, 1),
  Vc = new vc(),
  Gc = new eh(),
  Hc = new Ec(),
  Ol = [],
  Bl = [],
  zl = new Float32Array(16),
  Vl = new Float32Array(9),
  Gl = new Float32Array(4);
function Oi(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const s = e * t;
  let r = Ol[s];
  if ((r === void 0 && ((r = new Float32Array(s)), (Ol[s] = r)), e !== 0)) {
    n.toArray(r, 0);
    for (let a = 1, o = 0; a !== e; ++a) ((o += t), i[a].toArray(r, o));
  }
  return r;
}
function gt(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++) if (i[t] !== e[t]) return !1;
  return !0;
}
function _t(i, e) {
  for (let t = 0, n = e.length; t < n; t++) i[t] = e[t];
}
function xr(i, e) {
  let t = Bl[e];
  t === void 0 && ((t = new Int32Array(e)), (Bl[e] = t));
  for (let n = 0; n !== e; ++n) t[n] = i.allocateTextureUnit();
  return t;
}
function dm(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), (t[0] = e));
}
function pm(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) &&
      (i.uniform2f(this.addr, e.x, e.y), (t[0] = e.x), (t[1] = e.y));
  else {
    if (gt(t, e)) return;
    (i.uniform2fv(this.addr, e), _t(t, e));
  }
}
function mm(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) &&
      (i.uniform3f(this.addr, e.x, e.y, e.z),
      (t[0] = e.x),
      (t[1] = e.y),
      (t[2] = e.z));
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) &&
      (i.uniform3f(this.addr, e.r, e.g, e.b),
      (t[0] = e.r),
      (t[1] = e.g),
      (t[2] = e.b));
  else {
    if (gt(t, e)) return;
    (i.uniform3fv(this.addr, e), _t(t, e));
  }
}
function gm(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) &&
      (i.uniform4f(this.addr, e.x, e.y, e.z, e.w),
      (t[0] = e.x),
      (t[1] = e.y),
      (t[2] = e.z),
      (t[3] = e.w));
  else {
    if (gt(t, e)) return;
    (i.uniform4fv(this.addr, e), _t(t, e));
  }
}
function _m(i, e) {
  const t = this.cache,
    n = e.elements;
  if (n === void 0) {
    if (gt(t, e)) return;
    (i.uniformMatrix2fv(this.addr, !1, e), _t(t, e));
  } else {
    if (gt(t, n)) return;
    (Gl.set(n), i.uniformMatrix2fv(this.addr, !1, Gl), _t(t, n));
  }
}
function vm(i, e) {
  const t = this.cache,
    n = e.elements;
  if (n === void 0) {
    if (gt(t, e)) return;
    (i.uniformMatrix3fv(this.addr, !1, e), _t(t, e));
  } else {
    if (gt(t, n)) return;
    (Vl.set(n), i.uniformMatrix3fv(this.addr, !1, Vl), _t(t, n));
  }
}
function xm(i, e) {
  const t = this.cache,
    n = e.elements;
  if (n === void 0) {
    if (gt(t, e)) return;
    (i.uniformMatrix4fv(this.addr, !1, e), _t(t, e));
  } else {
    if (gt(t, n)) return;
    (zl.set(n), i.uniformMatrix4fv(this.addr, !1, zl), _t(t, n));
  }
}
function Mm(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), (t[0] = e));
}
function Sm(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) &&
      (i.uniform2i(this.addr, e.x, e.y), (t[0] = e.x), (t[1] = e.y));
  else {
    if (gt(t, e)) return;
    (i.uniform2iv(this.addr, e), _t(t, e));
  }
}
function ym(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) &&
      (i.uniform3i(this.addr, e.x, e.y, e.z),
      (t[0] = e.x),
      (t[1] = e.y),
      (t[2] = e.z));
  else {
    if (gt(t, e)) return;
    (i.uniform3iv(this.addr, e), _t(t, e));
  }
}
function Em(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) &&
      (i.uniform4i(this.addr, e.x, e.y, e.z, e.w),
      (t[0] = e.x),
      (t[1] = e.y),
      (t[2] = e.z),
      (t[3] = e.w));
  else {
    if (gt(t, e)) return;
    (i.uniform4iv(this.addr, e), _t(t, e));
  }
}
function bm(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), (t[0] = e));
}
function Tm(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) &&
      (i.uniform2ui(this.addr, e.x, e.y), (t[0] = e.x), (t[1] = e.y));
  else {
    if (gt(t, e)) return;
    (i.uniform2uiv(this.addr, e), _t(t, e));
  }
}
function Am(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) &&
      (i.uniform3ui(this.addr, e.x, e.y, e.z),
      (t[0] = e.x),
      (t[1] = e.y),
      (t[2] = e.z));
  else {
    if (gt(t, e)) return;
    (i.uniform3uiv(this.addr, e), _t(t, e));
  }
}
function wm(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) &&
      (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w),
      (t[0] = e.x),
      (t[1] = e.y),
      (t[2] = e.z),
      (t[3] = e.w));
  else {
    if (gt(t, e)) return;
    (i.uniform4uiv(this.addr, e), _t(t, e));
  }
}
function Cm(i, e, t) {
  const n = this.cache,
    s = t.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), (n[0] = s));
  let r;
  (this.type === i.SAMPLER_2D_SHADOW
    ? ((to.compareFunction = t.isReversedDepthBuffer() ? Mo : xo), (r = to))
    : (r = zc),
    t.setTexture2D(e || r, s));
}
function Rm(i, e, t) {
  const n = this.cache,
    s = t.allocateTextureUnit();
  (n[0] !== s && (i.uniform1i(this.addr, s), (n[0] = s)),
    t.setTexture3D(e || Gc, s));
}
function Pm(i, e, t) {
  const n = this.cache,
    s = t.allocateTextureUnit();
  (n[0] !== s && (i.uniform1i(this.addr, s), (n[0] = s)),
    t.setTextureCube(e || Hc, s));
}
function Lm(i, e, t) {
  const n = this.cache,
    s = t.allocateTextureUnit();
  (n[0] !== s && (i.uniform1i(this.addr, s), (n[0] = s)),
    t.setTexture2DArray(e || Vc, s));
}
function Dm(i) {
  switch (i) {
    case 5126:
      return dm;
    case 35664:
      return pm;
    case 35665:
      return mm;
    case 35666:
      return gm;
    case 35674:
      return _m;
    case 35675:
      return vm;
    case 35676:
      return xm;
    case 5124:
    case 35670:
      return Mm;
    case 35667:
    case 35671:
      return Sm;
    case 35668:
    case 35672:
      return ym;
    case 35669:
    case 35673:
      return Em;
    case 5125:
      return bm;
    case 36294:
      return Tm;
    case 36295:
      return Am;
    case 36296:
      return wm;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Cm;
    case 35679:
    case 36299:
    case 36307:
      return Rm;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Pm;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Lm;
  }
}
function Im(i, e) {
  i.uniform1fv(this.addr, e);
}
function Um(i, e) {
  const t = Oi(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function Nm(i, e) {
  const t = Oi(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function Fm(i, e) {
  const t = Oi(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function Om(i, e) {
  const t = Oi(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function Bm(i, e) {
  const t = Oi(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function zm(i, e) {
  const t = Oi(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function Vm(i, e) {
  i.uniform1iv(this.addr, e);
}
function Gm(i, e) {
  i.uniform2iv(this.addr, e);
}
function Hm(i, e) {
  i.uniform3iv(this.addr, e);
}
function km(i, e) {
  i.uniform4iv(this.addr, e);
}
function Wm(i, e) {
  i.uniform1uiv(this.addr, e);
}
function Xm(i, e) {
  i.uniform2uiv(this.addr, e);
}
function qm(i, e) {
  i.uniform3uiv(this.addr, e);
}
function Ym(i, e) {
  i.uniform4uiv(this.addr, e);
}
function Jm(i, e, t) {
  const n = this.cache,
    s = e.length,
    r = xr(t, s);
  gt(n, r) || (i.uniform1iv(this.addr, r), _t(n, r));
  let a;
  this.type === i.SAMPLER_2D_SHADOW ? (a = to) : (a = zc);
  for (let o = 0; o !== s; ++o) t.setTexture2D(e[o] || a, r[o]);
}
function Zm(i, e, t) {
  const n = this.cache,
    s = e.length,
    r = xr(t, s);
  gt(n, r) || (i.uniform1iv(this.addr, r), _t(n, r));
  for (let a = 0; a !== s; ++a) t.setTexture3D(e[a] || Gc, r[a]);
}
function $m(i, e, t) {
  const n = this.cache,
    s = e.length,
    r = xr(t, s);
  gt(n, r) || (i.uniform1iv(this.addr, r), _t(n, r));
  for (let a = 0; a !== s; ++a) t.setTextureCube(e[a] || Hc, r[a]);
}
function Km(i, e, t) {
  const n = this.cache,
    s = e.length,
    r = xr(t, s);
  gt(n, r) || (i.uniform1iv(this.addr, r), _t(n, r));
  for (let a = 0; a !== s; ++a) t.setTexture2DArray(e[a] || Vc, r[a]);
}
function jm(i) {
  switch (i) {
    case 5126:
      return Im;
    case 35664:
      return Um;
    case 35665:
      return Nm;
    case 35666:
      return Fm;
    case 35674:
      return Om;
    case 35675:
      return Bm;
    case 35676:
      return zm;
    case 5124:
    case 35670:
      return Vm;
    case 35667:
    case 35671:
      return Gm;
    case 35668:
    case 35672:
      return Hm;
    case 35669:
    case 35673:
      return km;
    case 5125:
      return Wm;
    case 36294:
      return Xm;
    case 36295:
      return qm;
    case 36296:
      return Ym;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Jm;
    case 35679:
    case 36299:
    case 36307:
      return Zm;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return $m;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Km;
  }
}
class Qm {
  constructor(e, t, n) {
    ((this.id = e),
      (this.addr = n),
      (this.cache = []),
      (this.type = t.type),
      (this.setValue = Dm(t.type)));
  }
}
class eg {
  constructor(e, t, n) {
    ((this.id = e),
      (this.addr = n),
      (this.cache = []),
      (this.type = t.type),
      (this.size = t.size),
      (this.setValue = jm(t.type)));
  }
}
class tg {
  constructor(e) {
    ((this.id = e), (this.seq = []), (this.map = {}));
  }
  setValue(e, t, n) {
    const s = this.seq;
    for (let r = 0, a = s.length; r !== a; ++r) {
      const o = s[r];
      o.setValue(e, t[o.id], n);
    }
  }
}
const sa = /(\w+)(\])?(\[|\.)?/g;
function Hl(i, e) {
  (i.seq.push(e), (i.map[e.id] = e));
}
function ng(i, e, t) {
  const n = i.name,
    s = n.length;
  for (sa.lastIndex = 0; ;) {
    const r = sa.exec(n),
      a = sa.lastIndex;
    let o = r[1];
    const c = r[2] === "]",
      l = r[3];
    if ((c && (o = o | 0), l === void 0 || (l === "[" && a + 2 === s))) {
      Hl(t, l === void 0 ? new Qm(o, i, e) : new eg(o, i, e));
      break;
    } else {
      let f = t.map[o];
      (f === void 0 && ((f = new tg(o)), Hl(t, f)), (t = f));
    }
  }
}
class ir {
  constructor(e, t) {
    ((this.seq = []), (this.map = {}));
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let a = 0; a < n; ++a) {
      const o = e.getActiveUniform(t, a),
        c = e.getUniformLocation(t, o.name);
      ng(o, c, this);
    }
    const s = [],
      r = [];
    for (const a of this.seq)
      a.type === e.SAMPLER_2D_SHADOW ||
      a.type === e.SAMPLER_CUBE_SHADOW ||
      a.type === e.SAMPLER_2D_ARRAY_SHADOW
        ? s.push(a)
        : r.push(a);
    s.length > 0 && (this.seq = s.concat(r));
  }
  setValue(e, t, n, s) {
    const r = this.map[t];
    r !== void 0 && r.setValue(e, n, s);
  }
  setOptional(e, t, n) {
    const s = t[n];
    s !== void 0 && this.setValue(e, n, s);
  }
  static upload(e, t, n, s) {
    for (let r = 0, a = t.length; r !== a; ++r) {
      const o = t[r],
        c = n[o.id];
      c.needsUpdate !== !1 && o.setValue(e, c.value, s);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let s = 0, r = e.length; s !== r; ++s) {
      const a = e[s];
      a.id in t && n.push(a);
    }
    return n;
  }
}
function kl(i, e, t) {
  const n = i.createShader(e);
  return (i.shaderSource(n, t), i.compileShader(n), n);
}
const ig = 37297;
let sg = 0;
function rg(i, e) {
  const t = i.split(`
`),
    n = [],
    s = Math.max(e - 6, 0),
    r = Math.min(e + 6, t.length);
  for (let a = s; a < r; a++) {
    const o = a + 1;
    n.push(`${o === e ? ">" : " "} ${o}: ${t[a]}`);
  }
  return n.join(`
`);
}
const Wl = new We();
function ag(i) {
  et._getMatrix(Wl, et.workingColorSpace, i);
  const e = `mat3( ${Wl.elements.map((t) => t.toFixed(4))} )`;
  switch (et.getTransfer(i)) {
    case ar:
      return [e, "LinearTransferOETF"];
    case it:
      return [e, "sRGBTransferOETF"];
    default:
      return (
        Ve("WebGLProgram: Unsupported color space: ", i),
        [e, "LinearTransferOETF"]
      );
  }
}
function Xl(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS),
    r = (i.getShaderInfoLog(e) || "").trim();
  if (n && r === "") return "";
  const a = /ERROR: 0:(\d+)/.exec(r);
  if (a) {
    const o = parseInt(a[1]);
    return (
      t.toUpperCase() +
      `

` +
      r +
      `

` +
      rg(i.getShaderSource(e), o)
    );
  } else return r;
}
function og(i, e) {
  const t = ag(e);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}",
  ].join(`
`);
}
const lg = {
  [so]: "Linear",
  [ro]: "Reinhard",
  [ao]: "Cineon",
  [oo]: "ACESFilmic",
  [co]: "AgX",
  [uo]: "Neutral",
  [lo]: "Custom",
};
function cg(i, e) {
  const t = lg[e];
  return t === void 0
    ? (Ve("WebGLProgram: Unsupported toneMapping:", e),
      "vec3 " + i + "( vec3 color ) { return LinearToneMapping( color ); }")
    : "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const Js = new D();
function ug() {
  et.getLuminanceCoefficients(Js);
  const i = Js.x.toFixed(4),
    e = Js.y.toFixed(4),
    t = Js.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}",
  ].join(`
`);
}
function hg(i) {
  return [
    i.extensionClipCullDistance
      ? "#extension GL_ANGLE_clip_cull_distance : require"
      : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : "",
  ].filter(ji).join(`
`);
}
function fg(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function dg(i, e) {
  const t = {},
    n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES);
  for (let s = 0; s < n; s++) {
    const r = i.getActiveAttrib(e, s),
      a = r.name;
    let o = 1;
    (r.type === i.FLOAT_MAT2 && (o = 2),
      r.type === i.FLOAT_MAT3 && (o = 3),
      r.type === i.FLOAT_MAT4 && (o = 4),
      (t[a] = {
        type: r.type,
        location: i.getAttribLocation(e, a),
        locationSize: o,
      }));
  }
  return t;
}
function ji(i) {
  return i !== "";
}
function ql(i, e) {
  const t =
    e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i
    .replace(/NUM_DIR_LIGHTS/g, e.numDirLights)
    .replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights)
    .replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps)
    .replace(/NUM_SPOT_LIGHT_COORDS/g, t)
    .replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights)
    .replace(/NUM_POINT_LIGHTS/g, e.numPointLights)
    .replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights)
    .replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows)
    .replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps)
    .replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows)
    .replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Yl(i, e) {
  return i
    .replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes)
    .replace(
      /UNION_CLIPPING_PLANES/g,
      e.numClippingPlanes - e.numClipIntersection,
    );
}
const pg = /^[ \t]*#include +<([\w\d./]+)>/gm;
function no(i) {
  return i.replace(pg, gg);
}
const mg = new Map();
function gg(i, e) {
  let t = Xe[e];
  if (t === void 0) {
    const n = mg.get(e);
    if (n !== void 0)
      ((t = Xe[n]),
        Ve(
          'WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',
          e,
          n,
        ));
    else throw new Error("Can not resolve #include <" + e + ">");
  }
  return no(t);
}
const _g =
  /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Jl(i) {
  return i.replace(_g, vg);
}
function vg(i, e, t, n) {
  let s = "";
  for (let r = parseInt(e); r < parseInt(t); r++)
    s += n
      .replace(/\[\s*i\s*\]/g, "[ " + r + " ]")
      .replace(/UNROLLED_LOOP_INDEX/g, r);
  return s;
}
function Zl(i) {
  let e = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return (
    i.precision === "highp"
      ? (e += `
#define HIGH_PRECISION`)
      : i.precision === "mediump"
        ? (e += `
#define MEDIUM_PRECISION`)
        : i.precision === "lowp" &&
          (e += `
#define LOW_PRECISION`),
    e
  );
}
const xg = { [js]: "SHADOWMAP_TYPE_PCF", [$i]: "SHADOWMAP_TYPE_VSM" };
function Mg(i) {
  return xg[i.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
const Sg = {
  [Kn]: "ENVMAP_TYPE_CUBE",
  [Ti]: "ENVMAP_TYPE_CUBE",
  [mr]: "ENVMAP_TYPE_CUBE_UV",
};
function yg(i) {
  return i.envMap === !1
    ? "ENVMAP_TYPE_CUBE"
    : Sg[i.envMapMode] || "ENVMAP_TYPE_CUBE";
}
const Eg = { [Ti]: "ENVMAP_MODE_REFRACTION" };
function bg(i) {
  return i.envMap === !1
    ? "ENVMAP_MODE_REFLECTION"
    : Eg[i.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
const Tg = {
  [lc]: "ENVMAP_BLENDING_MULTIPLY",
  [vu]: "ENVMAP_BLENDING_MIX",
  [xu]: "ENVMAP_BLENDING_ADD",
};
function Ag(i) {
  return i.envMap === !1
    ? "ENVMAP_BLENDING_NONE"
    : Tg[i.combine] || "ENVMAP_BLENDING_NONE";
}
function wg(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2,
    n = 1 / e;
  return {
    texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)),
    texelHeight: n,
    maxMip: t,
  };
}
function Cg(i, e, t, n) {
  const s = i.getContext(),
    r = t.defines;
  let a = t.vertexShader,
    o = t.fragmentShader;
  const c = Mg(t),
    l = yg(t),
    u = bg(t),
    f = Ag(t),
    h = wg(t),
    d = hg(t),
    g = fg(r),
    x = s.createProgram();
  let m,
    p,
    S = t.glslVersion
      ? "#version " +
        t.glslVersion +
        `
`
      : "";
  (t.isRawShaderMaterial
    ? ((m = [
        "#define SHADER_TYPE " + t.shaderType,
        "#define SHADER_NAME " + t.shaderName,
        g,
      ].filter(ji).join(`
`)),
      m.length > 0 &&
        (m += `
`),
      (p = [
        "#define SHADER_TYPE " + t.shaderType,
        "#define SHADER_NAME " + t.shaderName,
        g,
      ].filter(ji).join(`
`)),
      p.length > 0 &&
        (p += `
`))
    : ((m = [
        Zl(t),
        "#define SHADER_TYPE " + t.shaderType,
        "#define SHADER_NAME " + t.shaderName,
        g,
        t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
        t.batching ? "#define USE_BATCHING" : "",
        t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
        t.instancing ? "#define USE_INSTANCING" : "",
        t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
        t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
        t.useFog && t.fog ? "#define USE_FOG" : "",
        t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
        t.map ? "#define USE_MAP" : "",
        t.envMap ? "#define USE_ENVMAP" : "",
        t.envMap ? "#define " + u : "",
        t.lightMap ? "#define USE_LIGHTMAP" : "",
        t.aoMap ? "#define USE_AOMAP" : "",
        t.bumpMap ? "#define USE_BUMPMAP" : "",
        t.normalMap ? "#define USE_NORMALMAP" : "",
        t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
        t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        t.anisotropy ? "#define USE_ANISOTROPY" : "",
        t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        t.specularMap ? "#define USE_SPECULARMAP" : "",
        t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        t.metalnessMap ? "#define USE_METALNESSMAP" : "",
        t.alphaMap ? "#define USE_ALPHAMAP" : "",
        t.alphaHash ? "#define USE_ALPHAHASH" : "",
        t.transmission ? "#define USE_TRANSMISSION" : "",
        t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        t.mapUv ? "#define MAP_UV " + t.mapUv : "",
        t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
        t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
        t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
        t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
        t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
        t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
        t.displacementMapUv
          ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv
          : "",
        t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
        t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
        t.anisotropyMapUv
          ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv
          : "",
        t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
        t.clearcoatNormalMapUv
          ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv
          : "",
        t.clearcoatRoughnessMapUv
          ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv
          : "",
        t.iridescenceMapUv
          ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv
          : "",
        t.iridescenceThicknessMapUv
          ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv
          : "",
        t.sheenColorMapUv
          ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv
          : "",
        t.sheenRoughnessMapUv
          ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv
          : "",
        t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
        t.specularColorMapUv
          ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv
          : "",
        t.specularIntensityMapUv
          ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv
          : "",
        t.transmissionMapUv
          ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv
          : "",
        t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
        t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
        t.vertexColors ? "#define USE_COLOR" : "",
        t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
        t.vertexUv1s ? "#define USE_UV1" : "",
        t.vertexUv2s ? "#define USE_UV2" : "",
        t.vertexUv3s ? "#define USE_UV3" : "",
        t.pointsUvs ? "#define USE_POINTS_UV" : "",
        t.flatShading ? "#define FLAT_SHADED" : "",
        t.skinning ? "#define USE_SKINNING" : "",
        t.morphTargets ? "#define USE_MORPHTARGETS" : "",
        t.morphNormals && t.flatShading === !1
          ? "#define USE_MORPHNORMALS"
          : "",
        t.morphColors ? "#define USE_MORPHCOLORS" : "",
        t.morphTargetsCount > 0
          ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride
          : "",
        t.morphTargetsCount > 0
          ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount
          : "",
        t.doubleSided ? "#define DOUBLE_SIDED" : "",
        t.flipSided ? "#define FLIP_SIDED" : "",
        t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        t.shadowMapEnabled ? "#define " + c : "",
        t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
        t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
        t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
        "uniform mat4 modelMatrix;",
        "uniform mat4 modelViewMatrix;",
        "uniform mat4 projectionMatrix;",
        "uniform mat4 viewMatrix;",
        "uniform mat3 normalMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        "#ifdef USE_INSTANCING",
        "	attribute mat4 instanceMatrix;",
        "#endif",
        "#ifdef USE_INSTANCING_COLOR",
        "	attribute vec3 instanceColor;",
        "#endif",
        "#ifdef USE_INSTANCING_MORPH",
        "	uniform sampler2D morphTexture;",
        "#endif",
        "attribute vec3 position;",
        "attribute vec3 normal;",
        "attribute vec2 uv;",
        "#ifdef USE_UV1",
        "	attribute vec2 uv1;",
        "#endif",
        "#ifdef USE_UV2",
        "	attribute vec2 uv2;",
        "#endif",
        "#ifdef USE_UV3",
        "	attribute vec2 uv3;",
        "#endif",
        "#ifdef USE_TANGENT",
        "	attribute vec4 tangent;",
        "#endif",
        "#if defined( USE_COLOR_ALPHA )",
        "	attribute vec4 color;",
        "#elif defined( USE_COLOR )",
        "	attribute vec3 color;",
        "#endif",
        "#ifdef USE_SKINNING",
        "	attribute vec4 skinIndex;",
        "	attribute vec4 skinWeight;",
        "#endif",
        `
`,
      ].filter(ji).join(`
`)),
      (p = [
        Zl(t),
        "#define SHADER_TYPE " + t.shaderType,
        "#define SHADER_NAME " + t.shaderName,
        g,
        t.useFog && t.fog ? "#define USE_FOG" : "",
        t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
        t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
        t.map ? "#define USE_MAP" : "",
        t.matcap ? "#define USE_MATCAP" : "",
        t.envMap ? "#define USE_ENVMAP" : "",
        t.envMap ? "#define " + l : "",
        t.envMap ? "#define " + u : "",
        t.envMap ? "#define " + f : "",
        h ? "#define CUBEUV_TEXEL_WIDTH " + h.texelWidth : "",
        h ? "#define CUBEUV_TEXEL_HEIGHT " + h.texelHeight : "",
        h ? "#define CUBEUV_MAX_MIP " + h.maxMip + ".0" : "",
        t.lightMap ? "#define USE_LIGHTMAP" : "",
        t.aoMap ? "#define USE_AOMAP" : "",
        t.bumpMap ? "#define USE_BUMPMAP" : "",
        t.normalMap ? "#define USE_NORMALMAP" : "",
        t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
        t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
        t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
        t.anisotropy ? "#define USE_ANISOTROPY" : "",
        t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
        t.clearcoat ? "#define USE_CLEARCOAT" : "",
        t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
        t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
        t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
        t.dispersion ? "#define USE_DISPERSION" : "",
        t.iridescence ? "#define USE_IRIDESCENCE" : "",
        t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
        t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
        t.specularMap ? "#define USE_SPECULARMAP" : "",
        t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
        t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
        t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
        t.metalnessMap ? "#define USE_METALNESSMAP" : "",
        t.alphaMap ? "#define USE_ALPHAMAP" : "",
        t.alphaTest ? "#define USE_ALPHATEST" : "",
        t.alphaHash ? "#define USE_ALPHAHASH" : "",
        t.sheen ? "#define USE_SHEEN" : "",
        t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
        t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
        t.transmission ? "#define USE_TRANSMISSION" : "",
        t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
        t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
        t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
        t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
        t.vertexAlphas || t.batchingColor ? "#define USE_COLOR_ALPHA" : "",
        t.vertexUv1s ? "#define USE_UV1" : "",
        t.vertexUv2s ? "#define USE_UV2" : "",
        t.vertexUv3s ? "#define USE_UV3" : "",
        t.pointsUvs ? "#define USE_POINTS_UV" : "",
        t.gradientMap ? "#define USE_GRADIENTMAP" : "",
        t.flatShading ? "#define FLAT_SHADED" : "",
        t.doubleSided ? "#define DOUBLE_SIDED" : "",
        t.flipSided ? "#define FLIP_SIDED" : "",
        t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        t.shadowMapEnabled ? "#define " + c : "",
        t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
        t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
        t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
        t.decodeVideoTextureEmissive
          ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE"
          : "",
        t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
        t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
        "uniform mat4 viewMatrix;",
        "uniform vec3 cameraPosition;",
        "uniform bool isOrthographic;",
        t.toneMapping !== jt ? "#define TONE_MAPPING" : "",
        t.toneMapping !== jt ? Xe.tonemapping_pars_fragment : "",
        t.toneMapping !== jt ? cg("toneMapping", t.toneMapping) : "",
        t.dithering ? "#define DITHERING" : "",
        t.opaque ? "#define OPAQUE" : "",
        Xe.colorspace_pars_fragment,
        og("linearToOutputTexel", t.outputColorSpace),
        ug(),
        t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
        `
`,
      ].filter(ji).join(`
`))),
    (a = no(a)),
    (a = ql(a, t)),
    (a = Yl(a, t)),
    (o = no(o)),
    (o = ql(o, t)),
    (o = Yl(o, t)),
    (a = Jl(a)),
    (o = Jl(o)),
    t.isRawShaderMaterial !== !0 &&
      ((S = `#version 300 es
`),
      (m =
        [
          d,
          "#define attribute in",
          "#define varying out",
          "#define texture2D texture",
        ].join(`
`) +
        `
` +
        m),
      (p =
        [
          "#define varying in",
          t.glslVersion === Yo
            ? ""
            : "layout(location = 0) out highp vec4 pc_fragColor;",
          t.glslVersion === Yo ? "" : "#define gl_FragColor pc_fragColor",
          "#define gl_FragDepthEXT gl_FragDepth",
          "#define texture2D texture",
          "#define textureCube texture",
          "#define texture2DProj textureProj",
          "#define texture2DLodEXT textureLod",
          "#define texture2DProjLodEXT textureProjLod",
          "#define textureCubeLodEXT textureLod",
          "#define texture2DGradEXT textureGrad",
          "#define texture2DProjGradEXT textureProjGrad",
          "#define textureCubeGradEXT textureGrad",
        ].join(`
`) +
        `
` +
        p)));
  const E = S + m + a,
    y = S + p + o,
    R = kl(s, s.VERTEX_SHADER, E),
    w = kl(s, s.FRAGMENT_SHADER, y);
  (s.attachShader(x, R),
    s.attachShader(x, w),
    t.index0AttributeName !== void 0
      ? s.bindAttribLocation(x, 0, t.index0AttributeName)
      : t.morphTargets === !0 && s.bindAttribLocation(x, 0, "position"),
    s.linkProgram(x));
  function P(C) {
    if (i.debug.checkShaderErrors) {
      const V = s.getProgramInfoLog(x) || "",
        G = s.getShaderInfoLog(R) || "",
        H = s.getShaderInfoLog(w) || "",
        N = V.trim(),
        O = G.trim(),
        F = H.trim();
      let ce = !0,
        ie = !0;
      if (s.getProgramParameter(x, s.LINK_STATUS) === !1)
        if (((ce = !1), typeof i.debug.onShaderError == "function"))
          i.debug.onShaderError(s, x, R, w);
        else {
          const ge = Xl(s, R, "vertex"),
            xe = Xl(s, w, "fragment");
          Qe(
            "THREE.WebGLProgram: Shader Error " +
              s.getError() +
              " - VALIDATE_STATUS " +
              s.getProgramParameter(x, s.VALIDATE_STATUS) +
              `

Material Name: ` +
              C.name +
              `
Material Type: ` +
              C.type +
              `

Program Info Log: ` +
              N +
              `
` +
              ge +
              `
` +
              xe,
          );
        }
      else
        N !== ""
          ? Ve("WebGLProgram: Program Info Log:", N)
          : (O === "" || F === "") && (ie = !1);
      ie &&
        (C.diagnostics = {
          runnable: ce,
          programLog: N,
          vertexShader: { log: O, prefix: m },
          fragmentShader: { log: F, prefix: p },
        });
    }
    (s.deleteShader(R), s.deleteShader(w), (v = new ir(s, x)), (b = dg(s, x)));
  }
  let v;
  this.getUniforms = function () {
    return (v === void 0 && P(this), v);
  };
  let b;
  this.getAttributes = function () {
    return (b === void 0 && P(this), b);
  };
  let W = t.rendererExtensionParallelShaderCompile === !1;
  return (
    (this.isReady = function () {
      return (W === !1 && (W = s.getProgramParameter(x, ig)), W);
    }),
    (this.destroy = function () {
      (n.releaseStatesOfProgram(this),
        s.deleteProgram(x),
        (this.program = void 0));
    }),
    (this.type = t.shaderType),
    (this.name = t.shaderName),
    (this.id = sg++),
    (this.cacheKey = e),
    (this.usedTimes = 1),
    (this.program = x),
    (this.vertexShader = R),
    (this.fragmentShader = w),
    this
  );
}
let Rg = 0;
class Pg {
  constructor() {
    ((this.shaderCache = new Map()), (this.materialCache = new Map()));
  }
  update(e) {
    const t = e.vertexShader,
      n = e.fragmentShader,
      s = this._getShaderStage(t),
      r = this._getShaderStage(n),
      a = this._getShaderCacheForMaterial(e);
    return (
      a.has(s) === !1 && (a.add(s), s.usedTimes++),
      a.has(r) === !1 && (a.add(r), r.usedTimes++),
      this
    );
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      (n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code));
    return (this.materialCache.delete(e), this);
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    (this.shaderCache.clear(), this.materialCache.clear());
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return (n === void 0 && ((n = new Set()), t.set(e, n)), n);
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return (n === void 0 && ((n = new Lg(e)), t.set(e, n)), n);
  }
}
class Lg {
  constructor(e) {
    ((this.id = Rg++), (this.code = e), (this.usedTimes = 0));
  }
}
function Dg(i, e, t, n, s, r) {
  const a = new Eo(),
    o = new Pg(),
    c = new Set(),
    l = [],
    u = new Map(),
    f = n.logarithmicDepthBuffer;
  let h = n.precision;
  const d = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distance",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite",
  };
  function g(v) {
    return (c.add(v), v === 0 ? "uv" : `uv${v}`);
  }
  function x(v, b, W, C, V) {
    const G = C.fog,
      H = V.geometry,
      N =
        v.isMeshStandardMaterial ||
        v.isMeshLambertMaterial ||
        v.isMeshPhongMaterial
          ? C.environment
          : null,
      O =
        v.isMeshStandardMaterial ||
        (v.isMeshLambertMaterial && !v.envMap) ||
        (v.isMeshPhongMaterial && !v.envMap),
      F = e.get(v.envMap || N, O),
      ce = F && F.mapping === mr ? F.image.height : null,
      ie = d[v.type];
    v.precision !== null &&
      ((h = n.getMaxPrecision(v.precision)),
      h !== v.precision &&
        Ve(
          "WebGLProgram.getParameters:",
          v.precision,
          "not supported, using",
          h,
          "instead.",
        ));
    const ge =
        H.morphAttributes.position ||
        H.morphAttributes.normal ||
        H.morphAttributes.color,
      xe = ge !== void 0 ? ge.length : 0;
    let _e = 0;
    (H.morphAttributes.position !== void 0 && (_e = 1),
      H.morphAttributes.normal !== void 0 && (_e = 2),
      H.morphAttributes.color !== void 0 && (_e = 3));
    let Ue, Ze, Ke, $;
    if (ie) {
      const tt = sn[ie];
      ((Ue = tt.vertexShader), (Ze = tt.fragmentShader));
    } else
      ((Ue = v.vertexShader),
        (Ze = v.fragmentShader),
        o.update(v),
        (Ke = o.getVertexShaderID(v)),
        ($ = o.getFragmentShaderID(v)));
    const he = i.getRenderTarget(),
      fe = i.state.buffers.depth.getReversed(),
      Be = V.isInstancedMesh === !0,
      we = V.isBatchedMesh === !0,
      Ne = !!v.map,
      Je = !!v.matcap,
      Ge = !!F,
      ee = !!v.aoMap,
      ae = !!v.lightMap,
      te = !!v.bumpMap,
      me = !!v.normalMap,
      A = !!v.displacementMap,
      Fe = !!v.emissiveMap,
      Me = !!v.metalnessMap,
      ze = !!v.roughnessMap,
      de = v.anisotropy > 0,
      T = v.clearcoat > 0,
      _ = v.dispersion > 0,
      I = v.iridescence > 0,
      Y = v.sheen > 0,
      Q = v.transmission > 0,
      Z = de && !!v.anisotropyMap,
      be = T && !!v.clearcoatMap,
      pe = T && !!v.clearcoatNormalMap,
      De = T && !!v.clearcoatRoughnessMap,
      B = I && !!v.iridescenceMap,
      q = I && !!v.iridescenceThicknessMap,
      K = Y && !!v.sheenColorMap,
      j = Y && !!v.sheenRoughnessMap,
      le = !!v.specularMap,
      ne = !!v.specularColorMap,
      Ce = !!v.specularIntensityMap,
      L = Q && !!v.transmissionMap,
      re = Q && !!v.thicknessMap,
      oe = !!v.gradientMap,
      Ee = !!v.alphaMap,
      se = v.alphaTest > 0,
      J = !!v.alphaHash,
      Te = !!v.extensions;
    let Re = jt;
    v.toneMapped &&
      (he === null || he.isXRRenderTarget === !0) &&
      (Re = i.toneMapping);
    const st = {
      shaderID: ie,
      shaderType: v.type,
      shaderName: v.name,
      vertexShader: Ue,
      fragmentShader: Ze,
      defines: v.defines,
      customVertexShaderID: Ke,
      customFragmentShaderID: $,
      isRawShaderMaterial: v.isRawShaderMaterial === !0,
      glslVersion: v.glslVersion,
      precision: h,
      batching: we,
      batchingColor: we && V._colorsTexture !== null,
      instancing: Be,
      instancingColor: Be && V.instanceColor !== null,
      instancingMorph: Be && V.morphTexture !== null,
      outputColorSpace:
        he === null
          ? i.outputColorSpace
          : he.isXRRenderTarget === !0
            ? he.texture.colorSpace
            : wi,
      alphaToCoverage: !!v.alphaToCoverage,
      map: Ne,
      matcap: Je,
      envMap: Ge,
      envMapMode: Ge && F.mapping,
      envMapCubeUVHeight: ce,
      aoMap: ee,
      lightMap: ae,
      bumpMap: te,
      normalMap: me,
      displacementMap: A,
      emissiveMap: Fe,
      normalMapObjectSpace: me && v.normalMapType === yu,
      normalMapTangentSpace: me && v.normalMapType === gc,
      metalnessMap: Me,
      roughnessMap: ze,
      anisotropy: de,
      anisotropyMap: Z,
      clearcoat: T,
      clearcoatMap: be,
      clearcoatNormalMap: pe,
      clearcoatRoughnessMap: De,
      dispersion: _,
      iridescence: I,
      iridescenceMap: B,
      iridescenceThicknessMap: q,
      sheen: Y,
      sheenColorMap: K,
      sheenRoughnessMap: j,
      specularMap: le,
      specularColorMap: ne,
      specularIntensityMap: Ce,
      transmission: Q,
      transmissionMap: L,
      thicknessMap: re,
      gradientMap: oe,
      opaque:
        v.transparent === !1 && v.blending === Si && v.alphaToCoverage === !1,
      alphaMap: Ee,
      alphaTest: se,
      alphaHash: J,
      combine: v.combine,
      mapUv: Ne && g(v.map.channel),
      aoMapUv: ee && g(v.aoMap.channel),
      lightMapUv: ae && g(v.lightMap.channel),
      bumpMapUv: te && g(v.bumpMap.channel),
      normalMapUv: me && g(v.normalMap.channel),
      displacementMapUv: A && g(v.displacementMap.channel),
      emissiveMapUv: Fe && g(v.emissiveMap.channel),
      metalnessMapUv: Me && g(v.metalnessMap.channel),
      roughnessMapUv: ze && g(v.roughnessMap.channel),
      anisotropyMapUv: Z && g(v.anisotropyMap.channel),
      clearcoatMapUv: be && g(v.clearcoatMap.channel),
      clearcoatNormalMapUv: pe && g(v.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: De && g(v.clearcoatRoughnessMap.channel),
      iridescenceMapUv: B && g(v.iridescenceMap.channel),
      iridescenceThicknessMapUv: q && g(v.iridescenceThicknessMap.channel),
      sheenColorMapUv: K && g(v.sheenColorMap.channel),
      sheenRoughnessMapUv: j && g(v.sheenRoughnessMap.channel),
      specularMapUv: le && g(v.specularMap.channel),
      specularColorMapUv: ne && g(v.specularColorMap.channel),
      specularIntensityMapUv: Ce && g(v.specularIntensityMap.channel),
      transmissionMapUv: L && g(v.transmissionMap.channel),
      thicknessMapUv: re && g(v.thicknessMap.channel),
      alphaMapUv: Ee && g(v.alphaMap.channel),
      vertexTangents: !!H.attributes.tangent && (me || de),
      vertexColors: v.vertexColors,
      vertexAlphas:
        v.vertexColors === !0 &&
        !!H.attributes.color &&
        H.attributes.color.itemSize === 4,
      pointsUvs: V.isPoints === !0 && !!H.attributes.uv && (Ne || Ee),
      fog: !!G,
      useFog: v.fog === !0,
      fogExp2: !!G && G.isFogExp2,
      flatShading:
        v.wireframe === !1 &&
        (v.flatShading === !0 ||
          (H.attributes.normal === void 0 &&
            me === !1 &&
            (v.isMeshLambertMaterial ||
              v.isMeshPhongMaterial ||
              v.isMeshStandardMaterial ||
              v.isMeshPhysicalMaterial))),
      sizeAttenuation: v.sizeAttenuation === !0,
      logarithmicDepthBuffer: f,
      reversedDepthBuffer: fe,
      skinning: V.isSkinnedMesh === !0,
      morphTargets: H.morphAttributes.position !== void 0,
      morphNormals: H.morphAttributes.normal !== void 0,
      morphColors: H.morphAttributes.color !== void 0,
      morphTargetsCount: xe,
      morphTextureStride: _e,
      numDirLights: b.directional.length,
      numPointLights: b.point.length,
      numSpotLights: b.spot.length,
      numSpotLightMaps: b.spotLightMap.length,
      numRectAreaLights: b.rectArea.length,
      numHemiLights: b.hemi.length,
      numDirLightShadows: b.directionalShadowMap.length,
      numPointLightShadows: b.pointShadowMap.length,
      numSpotLightShadows: b.spotShadowMap.length,
      numSpotLightShadowsWithMaps: b.numSpotLightShadowsWithMaps,
      numLightProbes: b.numLightProbes,
      numClippingPlanes: r.numPlanes,
      numClipIntersection: r.numIntersection,
      dithering: v.dithering,
      shadowMapEnabled: i.shadowMap.enabled && W.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: Re,
      decodeVideoTexture:
        Ne &&
        v.map.isVideoTexture === !0 &&
        et.getTransfer(v.map.colorSpace) === it,
      decodeVideoTextureEmissive:
        Fe &&
        v.emissiveMap.isVideoTexture === !0 &&
        et.getTransfer(v.emissiveMap.colorSpace) === it,
      premultipliedAlpha: v.premultipliedAlpha,
      doubleSided: v.side === gn,
      flipSided: v.side === Ft,
      useDepthPacking: v.depthPacking >= 0,
      depthPacking: v.depthPacking || 0,
      index0AttributeName: v.index0AttributeName,
      extensionClipCullDistance:
        Te &&
        v.extensions.clipCullDistance === !0 &&
        t.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw:
        ((Te && v.extensions.multiDraw === !0) || we) &&
        t.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: t.has(
        "KHR_parallel_shader_compile",
      ),
      customProgramCacheKey: v.customProgramCacheKey(),
    };
    return (
      (st.vertexUv1s = c.has(1)),
      (st.vertexUv2s = c.has(2)),
      (st.vertexUv3s = c.has(3)),
      c.clear(),
      st
    );
  }
  function m(v) {
    const b = [];
    if (
      (v.shaderID
        ? b.push(v.shaderID)
        : (b.push(v.customVertexShaderID), b.push(v.customFragmentShaderID)),
      v.defines !== void 0)
    )
      for (const W in v.defines) (b.push(W), b.push(v.defines[W]));
    return (
      v.isRawShaderMaterial === !1 &&
        (p(b, v), S(b, v), b.push(i.outputColorSpace)),
      b.push(v.customProgramCacheKey),
      b.join()
    );
  }
  function p(v, b) {
    (v.push(b.precision),
      v.push(b.outputColorSpace),
      v.push(b.envMapMode),
      v.push(b.envMapCubeUVHeight),
      v.push(b.mapUv),
      v.push(b.alphaMapUv),
      v.push(b.lightMapUv),
      v.push(b.aoMapUv),
      v.push(b.bumpMapUv),
      v.push(b.normalMapUv),
      v.push(b.displacementMapUv),
      v.push(b.emissiveMapUv),
      v.push(b.metalnessMapUv),
      v.push(b.roughnessMapUv),
      v.push(b.anisotropyMapUv),
      v.push(b.clearcoatMapUv),
      v.push(b.clearcoatNormalMapUv),
      v.push(b.clearcoatRoughnessMapUv),
      v.push(b.iridescenceMapUv),
      v.push(b.iridescenceThicknessMapUv),
      v.push(b.sheenColorMapUv),
      v.push(b.sheenRoughnessMapUv),
      v.push(b.specularMapUv),
      v.push(b.specularColorMapUv),
      v.push(b.specularIntensityMapUv),
      v.push(b.transmissionMapUv),
      v.push(b.thicknessMapUv),
      v.push(b.combine),
      v.push(b.fogExp2),
      v.push(b.sizeAttenuation),
      v.push(b.morphTargetsCount),
      v.push(b.morphAttributeCount),
      v.push(b.numDirLights),
      v.push(b.numPointLights),
      v.push(b.numSpotLights),
      v.push(b.numSpotLightMaps),
      v.push(b.numHemiLights),
      v.push(b.numRectAreaLights),
      v.push(b.numDirLightShadows),
      v.push(b.numPointLightShadows),
      v.push(b.numSpotLightShadows),
      v.push(b.numSpotLightShadowsWithMaps),
      v.push(b.numLightProbes),
      v.push(b.shadowMapType),
      v.push(b.toneMapping),
      v.push(b.numClippingPlanes),
      v.push(b.numClipIntersection),
      v.push(b.depthPacking));
  }
  function S(v, b) {
    (a.disableAll(),
      b.instancing && a.enable(0),
      b.instancingColor && a.enable(1),
      b.instancingMorph && a.enable(2),
      b.matcap && a.enable(3),
      b.envMap && a.enable(4),
      b.normalMapObjectSpace && a.enable(5),
      b.normalMapTangentSpace && a.enable(6),
      b.clearcoat && a.enable(7),
      b.iridescence && a.enable(8),
      b.alphaTest && a.enable(9),
      b.vertexColors && a.enable(10),
      b.vertexAlphas && a.enable(11),
      b.vertexUv1s && a.enable(12),
      b.vertexUv2s && a.enable(13),
      b.vertexUv3s && a.enable(14),
      b.vertexTangents && a.enable(15),
      b.anisotropy && a.enable(16),
      b.alphaHash && a.enable(17),
      b.batching && a.enable(18),
      b.dispersion && a.enable(19),
      b.batchingColor && a.enable(20),
      b.gradientMap && a.enable(21),
      v.push(a.mask),
      a.disableAll(),
      b.fog && a.enable(0),
      b.useFog && a.enable(1),
      b.flatShading && a.enable(2),
      b.logarithmicDepthBuffer && a.enable(3),
      b.reversedDepthBuffer && a.enable(4),
      b.skinning && a.enable(5),
      b.morphTargets && a.enable(6),
      b.morphNormals && a.enable(7),
      b.morphColors && a.enable(8),
      b.premultipliedAlpha && a.enable(9),
      b.shadowMapEnabled && a.enable(10),
      b.doubleSided && a.enable(11),
      b.flipSided && a.enable(12),
      b.useDepthPacking && a.enable(13),
      b.dithering && a.enable(14),
      b.transmission && a.enable(15),
      b.sheen && a.enable(16),
      b.opaque && a.enable(17),
      b.pointsUvs && a.enable(18),
      b.decodeVideoTexture && a.enable(19),
      b.decodeVideoTextureEmissive && a.enable(20),
      b.alphaToCoverage && a.enable(21),
      v.push(a.mask));
  }
  function E(v) {
    const b = d[v.type];
    let W;
    if (b) {
      const C = sn[b];
      W = ds.clone(C.uniforms);
    } else W = v.uniforms;
    return W;
  }
  function y(v, b) {
    let W = u.get(b);
    return (
      W !== void 0
        ? ++W.usedTimes
        : ((W = new Cg(i, b, v, s)), l.push(W), u.set(b, W)),
      W
    );
  }
  function R(v) {
    if (--v.usedTimes === 0) {
      const b = l.indexOf(v);
      ((l[b] = l[l.length - 1]), l.pop(), u.delete(v.cacheKey), v.destroy());
    }
  }
  function w(v) {
    o.remove(v);
  }
  function P() {
    o.dispose();
  }
  return {
    getParameters: x,
    getProgramCacheKey: m,
    getUniforms: E,
    acquireProgram: y,
    releaseProgram: R,
    releaseShaderCache: w,
    programs: l,
    dispose: P,
  };
}
function Ig() {
  let i = new WeakMap();
  function e(a) {
    return i.has(a);
  }
  function t(a) {
    let o = i.get(a);
    return (o === void 0 && ((o = {}), i.set(a, o)), o);
  }
  function n(a) {
    i.delete(a);
  }
  function s(a, o, c) {
    i.get(a)[o] = c;
  }
  function r() {
    i = new WeakMap();
  }
  return { has: e, get: t, remove: n, update: s, dispose: r };
}
function Ug(i, e) {
  return i.groupOrder !== e.groupOrder
    ? i.groupOrder - e.groupOrder
    : i.renderOrder !== e.renderOrder
      ? i.renderOrder - e.renderOrder
      : i.material.id !== e.material.id
        ? i.material.id - e.material.id
        : i.materialVariant !== e.materialVariant
          ? i.materialVariant - e.materialVariant
          : i.z !== e.z
            ? i.z - e.z
            : i.id - e.id;
}
function $l(i, e) {
  return i.groupOrder !== e.groupOrder
    ? i.groupOrder - e.groupOrder
    : i.renderOrder !== e.renderOrder
      ? i.renderOrder - e.renderOrder
      : i.z !== e.z
        ? e.z - i.z
        : i.id - e.id;
}
function Kl() {
  const i = [];
  let e = 0;
  const t = [],
    n = [],
    s = [];
  function r() {
    ((e = 0), (t.length = 0), (n.length = 0), (s.length = 0));
  }
  function a(h) {
    let d = 0;
    return (h.isInstancedMesh && (d += 2), h.isSkinnedMesh && (d += 1), d);
  }
  function o(h, d, g, x, m, p) {
    let S = i[e];
    return (
      S === void 0
        ? ((S = {
            id: h.id,
            object: h,
            geometry: d,
            material: g,
            materialVariant: a(h),
            groupOrder: x,
            renderOrder: h.renderOrder,
            z: m,
            group: p,
          }),
          (i[e] = S))
        : ((S.id = h.id),
          (S.object = h),
          (S.geometry = d),
          (S.material = g),
          (S.materialVariant = a(h)),
          (S.groupOrder = x),
          (S.renderOrder = h.renderOrder),
          (S.z = m),
          (S.group = p)),
      e++,
      S
    );
  }
  function c(h, d, g, x, m, p) {
    const S = o(h, d, g, x, m, p);
    g.transmission > 0
      ? n.push(S)
      : g.transparent === !0
        ? s.push(S)
        : t.push(S);
  }
  function l(h, d, g, x, m, p) {
    const S = o(h, d, g, x, m, p);
    g.transmission > 0
      ? n.unshift(S)
      : g.transparent === !0
        ? s.unshift(S)
        : t.unshift(S);
  }
  function u(h, d) {
    (t.length > 1 && t.sort(h || Ug),
      n.length > 1 && n.sort(d || $l),
      s.length > 1 && s.sort(d || $l));
  }
  function f() {
    for (let h = e, d = i.length; h < d; h++) {
      const g = i[h];
      if (g.id === null) break;
      ((g.id = null),
        (g.object = null),
        (g.geometry = null),
        (g.material = null),
        (g.group = null));
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: s,
    init: r,
    push: c,
    unshift: l,
    finish: f,
    sort: u,
  };
}
function Ng() {
  let i = new WeakMap();
  function e(n, s) {
    const r = i.get(n);
    let a;
    return (
      r === void 0
        ? ((a = new Kl()), i.set(n, [a]))
        : s >= r.length
          ? ((a = new Kl()), r.push(a))
          : (a = r[s]),
      a
    );
  }
  function t() {
    i = new WeakMap();
  }
  return { get: e, dispose: t };
}
function Fg() {
  const i = {};
  return {
    get: function (e) {
      if (i[e.id] !== void 0) return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = { direction: new D(), color: new He() };
          break;
        case "SpotLight":
          t = {
            position: new D(),
            direction: new D(),
            color: new He(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0,
          };
          break;
        case "PointLight":
          t = { position: new D(), color: new He(), distance: 0, decay: 0 };
          break;
        case "HemisphereLight":
          t = { direction: new D(), skyColor: new He(), groundColor: new He() };
          break;
        case "RectAreaLight":
          t = {
            color: new He(),
            position: new D(),
            halfWidth: new D(),
            halfHeight: new D(),
          };
          break;
      }
      return ((i[e.id] = t), t);
    },
  };
}
function Og() {
  const i = {};
  return {
    get: function (e) {
      if (i[e.id] !== void 0) return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new ue(),
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new ue(),
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new ue(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3,
          };
          break;
      }
      return ((i[e.id] = t), t);
    },
  };
}
let Bg = 0;
function zg(i, e) {
  return (
    (e.castShadow ? 2 : 0) -
    (i.castShadow ? 2 : 0) +
    (e.map ? 1 : 0) -
    (i.map ? 1 : 0)
  );
}
function Vg(i) {
  const e = new Fg(),
    t = Og(),
    n = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
        numLightProbes: -1,
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
      numLightProbes: 0,
    };
  for (let l = 0; l < 9; l++) n.probe.push(new D());
  const s = new D(),
    r = new ot(),
    a = new ot();
  function o(l) {
    let u = 0,
      f = 0,
      h = 0;
    for (let b = 0; b < 9; b++) n.probe[b].set(0, 0, 0);
    let d = 0,
      g = 0,
      x = 0,
      m = 0,
      p = 0,
      S = 0,
      E = 0,
      y = 0,
      R = 0,
      w = 0,
      P = 0;
    l.sort(zg);
    for (let b = 0, W = l.length; b < W; b++) {
      const C = l[b],
        V = C.color,
        G = C.intensity,
        H = C.distance;
      let N = null;
      if (
        (C.shadow &&
          C.shadow.map &&
          (C.shadow.map.texture.format === Ai
            ? (N = C.shadow.map.texture)
            : (N = C.shadow.map.depthTexture || C.shadow.map.texture)),
        C.isAmbientLight)
      )
        ((u += V.r * G), (f += V.g * G), (h += V.b * G));
      else if (C.isLightProbe) {
        for (let O = 0; O < 9; O++)
          n.probe[O].addScaledVector(C.sh.coefficients[O], G);
        P++;
      } else if (C.isDirectionalLight) {
        const O = e.get(C);
        if ((O.color.copy(C.color).multiplyScalar(C.intensity), C.castShadow)) {
          const F = C.shadow,
            ce = t.get(C);
          ((ce.shadowIntensity = F.intensity),
            (ce.shadowBias = F.bias),
            (ce.shadowNormalBias = F.normalBias),
            (ce.shadowRadius = F.radius),
            (ce.shadowMapSize = F.mapSize),
            (n.directionalShadow[d] = ce),
            (n.directionalShadowMap[d] = N),
            (n.directionalShadowMatrix[d] = C.shadow.matrix),
            S++);
        }
        ((n.directional[d] = O), d++);
      } else if (C.isSpotLight) {
        const O = e.get(C);
        (O.position.setFromMatrixPosition(C.matrixWorld),
          O.color.copy(V).multiplyScalar(G),
          (O.distance = H),
          (O.coneCos = Math.cos(C.angle)),
          (O.penumbraCos = Math.cos(C.angle * (1 - C.penumbra))),
          (O.decay = C.decay),
          (n.spot[x] = O));
        const F = C.shadow;
        if (
          (C.map &&
            ((n.spotLightMap[R] = C.map),
            R++,
            F.updateMatrices(C),
            C.castShadow && w++),
          (n.spotLightMatrix[x] = F.matrix),
          C.castShadow)
        ) {
          const ce = t.get(C);
          ((ce.shadowIntensity = F.intensity),
            (ce.shadowBias = F.bias),
            (ce.shadowNormalBias = F.normalBias),
            (ce.shadowRadius = F.radius),
            (ce.shadowMapSize = F.mapSize),
            (n.spotShadow[x] = ce),
            (n.spotShadowMap[x] = N),
            y++);
        }
        x++;
      } else if (C.isRectAreaLight) {
        const O = e.get(C);
        (O.color.copy(V).multiplyScalar(G),
          O.halfWidth.set(C.width * 0.5, 0, 0),
          O.halfHeight.set(0, C.height * 0.5, 0),
          (n.rectArea[m] = O),
          m++);
      } else if (C.isPointLight) {
        const O = e.get(C);
        if (
          (O.color.copy(C.color).multiplyScalar(C.intensity),
          (O.distance = C.distance),
          (O.decay = C.decay),
          C.castShadow)
        ) {
          const F = C.shadow,
            ce = t.get(C);
          ((ce.shadowIntensity = F.intensity),
            (ce.shadowBias = F.bias),
            (ce.shadowNormalBias = F.normalBias),
            (ce.shadowRadius = F.radius),
            (ce.shadowMapSize = F.mapSize),
            (ce.shadowCameraNear = F.camera.near),
            (ce.shadowCameraFar = F.camera.far),
            (n.pointShadow[g] = ce),
            (n.pointShadowMap[g] = N),
            (n.pointShadowMatrix[g] = C.shadow.matrix),
            E++);
        }
        ((n.point[g] = O), g++);
      } else if (C.isHemisphereLight) {
        const O = e.get(C);
        (O.skyColor.copy(C.color).multiplyScalar(G),
          O.groundColor.copy(C.groundColor).multiplyScalar(G),
          (n.hemi[p] = O),
          p++);
      }
    }
    (m > 0 &&
      (i.has("OES_texture_float_linear") === !0
        ? ((n.rectAreaLTC1 = ve.LTC_FLOAT_1), (n.rectAreaLTC2 = ve.LTC_FLOAT_2))
        : ((n.rectAreaLTC1 = ve.LTC_HALF_1), (n.rectAreaLTC2 = ve.LTC_HALF_2))),
      (n.ambient[0] = u),
      (n.ambient[1] = f),
      (n.ambient[2] = h));
    const v = n.hash;
    (v.directionalLength !== d ||
      v.pointLength !== g ||
      v.spotLength !== x ||
      v.rectAreaLength !== m ||
      v.hemiLength !== p ||
      v.numDirectionalShadows !== S ||
      v.numPointShadows !== E ||
      v.numSpotShadows !== y ||
      v.numSpotMaps !== R ||
      v.numLightProbes !== P) &&
      ((n.directional.length = d),
      (n.spot.length = x),
      (n.rectArea.length = m),
      (n.point.length = g),
      (n.hemi.length = p),
      (n.directionalShadow.length = S),
      (n.directionalShadowMap.length = S),
      (n.pointShadow.length = E),
      (n.pointShadowMap.length = E),
      (n.spotShadow.length = y),
      (n.spotShadowMap.length = y),
      (n.directionalShadowMatrix.length = S),
      (n.pointShadowMatrix.length = E),
      (n.spotLightMatrix.length = y + R - w),
      (n.spotLightMap.length = R),
      (n.numSpotLightShadowsWithMaps = w),
      (n.numLightProbes = P),
      (v.directionalLength = d),
      (v.pointLength = g),
      (v.spotLength = x),
      (v.rectAreaLength = m),
      (v.hemiLength = p),
      (v.numDirectionalShadows = S),
      (v.numPointShadows = E),
      (v.numSpotShadows = y),
      (v.numSpotMaps = R),
      (v.numLightProbes = P),
      (n.version = Bg++));
  }
  function c(l, u) {
    let f = 0,
      h = 0,
      d = 0,
      g = 0,
      x = 0;
    const m = u.matrixWorldInverse;
    for (let p = 0, S = l.length; p < S; p++) {
      const E = l[p];
      if (E.isDirectionalLight) {
        const y = n.directional[f];
        (y.direction.setFromMatrixPosition(E.matrixWorld),
          s.setFromMatrixPosition(E.target.matrixWorld),
          y.direction.sub(s),
          y.direction.transformDirection(m),
          f++);
      } else if (E.isSpotLight) {
        const y = n.spot[d];
        (y.position.setFromMatrixPosition(E.matrixWorld),
          y.position.applyMatrix4(m),
          y.direction.setFromMatrixPosition(E.matrixWorld),
          s.setFromMatrixPosition(E.target.matrixWorld),
          y.direction.sub(s),
          y.direction.transformDirection(m),
          d++);
      } else if (E.isRectAreaLight) {
        const y = n.rectArea[g];
        (y.position.setFromMatrixPosition(E.matrixWorld),
          y.position.applyMatrix4(m),
          a.identity(),
          r.copy(E.matrixWorld),
          r.premultiply(m),
          a.extractRotation(r),
          y.halfWidth.set(E.width * 0.5, 0, 0),
          y.halfHeight.set(0, E.height * 0.5, 0),
          y.halfWidth.applyMatrix4(a),
          y.halfHeight.applyMatrix4(a),
          g++);
      } else if (E.isPointLight) {
        const y = n.point[h];
        (y.position.setFromMatrixPosition(E.matrixWorld),
          y.position.applyMatrix4(m),
          h++);
      } else if (E.isHemisphereLight) {
        const y = n.hemi[x];
        (y.direction.setFromMatrixPosition(E.matrixWorld),
          y.direction.transformDirection(m),
          x++);
      }
    }
  }
  return { setup: o, setupView: c, state: n };
}
function jl(i) {
  const e = new Vg(i),
    t = [],
    n = [];
  function s(u) {
    ((l.camera = u), (t.length = 0), (n.length = 0));
  }
  function r(u) {
    t.push(u);
  }
  function a(u) {
    n.push(u);
  }
  function o() {
    e.setup(t);
  }
  function c(u) {
    e.setupView(t, u);
  }
  const l = {
    lightsArray: t,
    shadowsArray: n,
    camera: null,
    lights: e,
    transmissionRenderTarget: {},
  };
  return {
    init: s,
    state: l,
    setupLights: o,
    setupLightsView: c,
    pushLight: r,
    pushShadow: a,
  };
}
function Gg(i) {
  let e = new WeakMap();
  function t(s, r = 0) {
    const a = e.get(s);
    let o;
    return (
      a === void 0
        ? ((o = new jl(i)), e.set(s, [o]))
        : r >= a.length
          ? ((o = new jl(i)), a.push(o))
          : (o = a[r]),
      o
    );
  }
  function n() {
    e = new WeakMap();
  }
  return { get: t, dispose: n };
}
const Hg = `void main() {
	gl_Position = vec4( position, 1.0 );
}`,
  kg = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,
  Wg = [
    new D(1, 0, 0),
    new D(-1, 0, 0),
    new D(0, 1, 0),
    new D(0, -1, 0),
    new D(0, 0, 1),
    new D(0, 0, -1),
  ],
  Xg = [
    new D(0, -1, 0),
    new D(0, -1, 0),
    new D(0, 0, 1),
    new D(0, 0, -1),
    new D(0, -1, 0),
    new D(0, -1, 0),
  ],
  Ql = new ot(),
  Ji = new D(),
  ra = new D();
function qg(i, e, t) {
  let n = new To();
  const s = new ue(),
    r = new ue(),
    a = new dt(),
    o = new ef(),
    c = new tf(),
    l = {},
    u = t.maxTextureSize,
    f = { [In]: Ft, [Ft]: In, [gn]: gn },
    h = new Rt({
      defines: { VSM_SAMPLES: 8 },
      uniforms: {
        shadow_pass: { value: null },
        resolution: { value: new ue() },
        radius: { value: 4 },
      },
      vertexShader: Hg,
      fragmentShader: kg,
    }),
    d = h.clone();
  d.defines.HORIZONTAL_PASS = 1;
  const g = new ut();
  g.setAttribute(
    "position",
    new Qt(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3),
  );
  const x = new je(g, h),
    m = this;
  ((this.enabled = !1),
    (this.autoUpdate = !0),
    (this.needsUpdate = !1),
    (this.type = js));
  let p = this.type;
  this.render = function (w, P, v) {
    if (
      m.enabled === !1 ||
      (m.autoUpdate === !1 && m.needsUpdate === !1) ||
      w.length === 0
    )
      return;
    this.type === oc &&
      (Ve(
        "WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.",
      ),
      (this.type = js));
    const b = i.getRenderTarget(),
      W = i.getActiveCubeFace(),
      C = i.getActiveMipmapLevel(),
      V = i.state;
    (V.setBlending(an),
      V.buffers.depth.getReversed() === !0
        ? V.buffers.color.setClear(0, 0, 0, 0)
        : V.buffers.color.setClear(1, 1, 1, 1),
      V.buffers.depth.setTest(!0),
      V.setScissorTest(!1));
    const G = p !== this.type;
    G &&
      P.traverse(function (H) {
        H.material &&
          (Array.isArray(H.material)
            ? H.material.forEach((N) => (N.needsUpdate = !0))
            : (H.material.needsUpdate = !0));
      });
    for (let H = 0, N = w.length; H < N; H++) {
      const O = w[H],
        F = O.shadow;
      if (F === void 0) {
        Ve("WebGLShadowMap:", O, "has no shadow.");
        continue;
      }
      if (F.autoUpdate === !1 && F.needsUpdate === !1) continue;
      s.copy(F.mapSize);
      const ce = F.getFrameExtents();
      (s.multiply(ce),
        r.copy(F.mapSize),
        (s.x > u || s.y > u) &&
          (s.x > u &&
            ((r.x = Math.floor(u / ce.x)),
            (s.x = r.x * ce.x),
            (F.mapSize.x = r.x)),
          s.y > u &&
            ((r.y = Math.floor(u / ce.y)),
            (s.y = r.y * ce.y),
            (F.mapSize.y = r.y))));
      const ie = i.state.buffers.depth.getReversed();
      if (((F.camera._reversedDepth = ie), F.map === null || G === !0)) {
        if (
          (F.map !== null &&
            (F.map.depthTexture !== null &&
              (F.map.depthTexture.dispose(), (F.map.depthTexture = null)),
            F.map.dispose()),
          this.type === $i)
        ) {
          if (O.isPointLight) {
            Ve(
              "WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.",
            );
            continue;
          }
          ((F.map = new It(s.x, s.y, {
            format: Ai,
            type: Ot,
            minFilter: Ct,
            magFilter: Ct,
            generateMipmaps: !1,
          })),
            (F.map.texture.name = O.name + ".shadowMap"),
            (F.map.depthTexture = new ls(s.x, s.y, $t)),
            (F.map.depthTexture.name = O.name + ".shadowMapDepth"),
            (F.map.depthTexture.format = Mn),
            (F.map.depthTexture.compareFunction = null),
            (F.map.depthTexture.minFilter = Et),
            (F.map.depthTexture.magFilter = Et));
        } else
          (O.isPointLight
            ? ((F.map = new Bc(s.x)), (F.map.depthTexture = new xh(s.x, on)))
            : ((F.map = new It(s.x, s.y)),
              (F.map.depthTexture = new ls(s.x, s.y, on))),
            (F.map.depthTexture.name = O.name + ".shadowMap"),
            (F.map.depthTexture.format = Mn),
            this.type === js
              ? ((F.map.depthTexture.compareFunction = ie ? Mo : xo),
                (F.map.depthTexture.minFilter = Ct),
                (F.map.depthTexture.magFilter = Ct))
              : ((F.map.depthTexture.compareFunction = null),
                (F.map.depthTexture.minFilter = Et),
                (F.map.depthTexture.magFilter = Et)));
        F.camera.updateProjectionMatrix();
      }
      const ge = F.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let xe = 0; xe < ge; xe++) {
        if (F.map.isWebGLCubeRenderTarget)
          (i.setRenderTarget(F.map, xe), i.clear());
        else {
          xe === 0 && (i.setRenderTarget(F.map), i.clear());
          const _e = F.getViewport(xe);
          (a.set(r.x * _e.x, r.y * _e.y, r.x * _e.z, r.y * _e.w),
            V.viewport(a));
        }
        if (O.isPointLight) {
          const _e = F.camera,
            Ue = F.matrix,
            Ze = O.distance || _e.far;
          (Ze !== _e.far && ((_e.far = Ze), _e.updateProjectionMatrix()),
            Ji.setFromMatrixPosition(O.matrixWorld),
            _e.position.copy(Ji),
            ra.copy(_e.position),
            ra.add(Wg[xe]),
            _e.up.copy(Xg[xe]),
            _e.lookAt(ra),
            _e.updateMatrixWorld(),
            Ue.makeTranslation(-Ji.x, -Ji.y, -Ji.z),
            Ql.multiplyMatrices(_e.projectionMatrix, _e.matrixWorldInverse),
            F._frustum.setFromProjectionMatrix(
              Ql,
              _e.coordinateSystem,
              _e.reversedDepth,
            ));
        } else F.updateMatrices(O);
        ((n = F.getFrustum()), y(P, v, F.camera, O, this.type));
      }
      (F.isPointLightShadow !== !0 && this.type === $i && S(F, v),
        (F.needsUpdate = !1));
    }
    ((p = this.type), (m.needsUpdate = !1), i.setRenderTarget(b, W, C));
  };
  function S(w, P) {
    const v = e.update(x);
    (h.defines.VSM_SAMPLES !== w.blurSamples &&
      ((h.defines.VSM_SAMPLES = w.blurSamples),
      (d.defines.VSM_SAMPLES = w.blurSamples),
      (h.needsUpdate = !0),
      (d.needsUpdate = !0)),
      w.mapPass === null &&
        (w.mapPass = new It(s.x, s.y, { format: Ai, type: Ot })),
      (h.uniforms.shadow_pass.value = w.map.depthTexture),
      (h.uniforms.resolution.value = w.mapSize),
      (h.uniforms.radius.value = w.radius),
      i.setRenderTarget(w.mapPass),
      i.clear(),
      i.renderBufferDirect(P, null, v, h, x, null),
      (d.uniforms.shadow_pass.value = w.mapPass.texture),
      (d.uniforms.resolution.value = w.mapSize),
      (d.uniforms.radius.value = w.radius),
      i.setRenderTarget(w.map),
      i.clear(),
      i.renderBufferDirect(P, null, v, d, x, null));
  }
  function E(w, P, v, b) {
    let W = null;
    const C =
      v.isPointLight === !0 ? w.customDistanceMaterial : w.customDepthMaterial;
    if (C !== void 0) W = C;
    else if (
      ((W = v.isPointLight === !0 ? c : o),
      (i.localClippingEnabled &&
        P.clipShadows === !0 &&
        Array.isArray(P.clippingPlanes) &&
        P.clippingPlanes.length !== 0) ||
        (P.displacementMap && P.displacementScale !== 0) ||
        (P.alphaMap && P.alphaTest > 0) ||
        (P.map && P.alphaTest > 0) ||
        P.alphaToCoverage === !0)
    ) {
      const V = W.uuid,
        G = P.uuid;
      let H = l[V];
      H === void 0 && ((H = {}), (l[V] = H));
      let N = H[G];
      (N === void 0 &&
        ((N = W.clone()), (H[G] = N), P.addEventListener("dispose", R)),
        (W = N));
    }
    if (
      ((W.visible = P.visible),
      (W.wireframe = P.wireframe),
      b === $i
        ? (W.side = P.shadowSide !== null ? P.shadowSide : P.side)
        : (W.side = P.shadowSide !== null ? P.shadowSide : f[P.side]),
      (W.alphaMap = P.alphaMap),
      (W.alphaTest = P.alphaToCoverage === !0 ? 0.5 : P.alphaTest),
      (W.map = P.map),
      (W.clipShadows = P.clipShadows),
      (W.clippingPlanes = P.clippingPlanes),
      (W.clipIntersection = P.clipIntersection),
      (W.displacementMap = P.displacementMap),
      (W.displacementScale = P.displacementScale),
      (W.displacementBias = P.displacementBias),
      (W.wireframeLinewidth = P.wireframeLinewidth),
      (W.linewidth = P.linewidth),
      v.isPointLight === !0 && W.isMeshDistanceMaterial === !0)
    ) {
      const V = i.properties.get(W);
      V.light = v;
    }
    return W;
  }
  function y(w, P, v, b, W) {
    if (w.visible === !1) return;
    if (
      w.layers.test(P.layers) &&
      (w.isMesh || w.isLine || w.isPoints) &&
      (w.castShadow || (w.receiveShadow && W === $i)) &&
      (!w.frustumCulled || n.intersectsObject(w))
    ) {
      w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse, w.matrixWorld);
      const G = e.update(w),
        H = w.material;
      if (Array.isArray(H)) {
        const N = G.groups;
        for (let O = 0, F = N.length; O < F; O++) {
          const ce = N[O],
            ie = H[ce.materialIndex];
          if (ie && ie.visible) {
            const ge = E(w, ie, b, W);
            (w.onBeforeShadow(i, w, P, v, G, ge, ce),
              i.renderBufferDirect(v, null, G, ge, w, ce),
              w.onAfterShadow(i, w, P, v, G, ge, ce));
          }
        }
      } else if (H.visible) {
        const N = E(w, H, b, W);
        (w.onBeforeShadow(i, w, P, v, G, N, null),
          i.renderBufferDirect(v, null, G, N, w, null),
          w.onAfterShadow(i, w, P, v, G, N, null));
      }
    }
    const V = w.children;
    for (let G = 0, H = V.length; G < H; G++) y(V[G], P, v, b, W);
  }
  function R(w) {
    w.target.removeEventListener("dispose", R);
    for (const v in l) {
      const b = l[v],
        W = w.target.uuid;
      W in b && (b[W].dispose(), delete b[W]);
    }
  }
}
function Yg(i, e) {
  function t() {
    let L = !1;
    const re = new dt();
    let oe = null;
    const Ee = new dt(0, 0, 0, 0);
    return {
      setMask: function (se) {
        oe !== se && !L && (i.colorMask(se, se, se, se), (oe = se));
      },
      setLocked: function (se) {
        L = se;
      },
      setClear: function (se, J, Te, Re, st) {
        (st === !0 && ((se *= Re), (J *= Re), (Te *= Re)),
          re.set(se, J, Te, Re),
          Ee.equals(re) === !1 && (i.clearColor(se, J, Te, Re), Ee.copy(re)));
      },
      reset: function () {
        ((L = !1), (oe = null), Ee.set(-1, 0, 0, 0));
      },
    };
  }
  function n() {
    let L = !1,
      re = !1,
      oe = null,
      Ee = null,
      se = null;
    return {
      setReversed: function (J) {
        if (re !== J) {
          const Te = e.get("EXT_clip_control");
          (J
            ? Te.clipControlEXT(Te.LOWER_LEFT_EXT, Te.ZERO_TO_ONE_EXT)
            : Te.clipControlEXT(Te.LOWER_LEFT_EXT, Te.NEGATIVE_ONE_TO_ONE_EXT),
            (re = J));
          const Re = se;
          ((se = null), this.setClear(Re));
        }
      },
      getReversed: function () {
        return re;
      },
      setTest: function (J) {
        J ? he(i.DEPTH_TEST) : fe(i.DEPTH_TEST);
      },
      setMask: function (J) {
        oe !== J && !L && (i.depthMask(J), (oe = J));
      },
      setFunc: function (J) {
        if ((re && (J = Du[J]), Ee !== J)) {
          switch (J) {
            case ua:
              i.depthFunc(i.NEVER);
              break;
            case ha:
              i.depthFunc(i.ALWAYS);
              break;
            case fa:
              i.depthFunc(i.LESS);
              break;
            case bi:
              i.depthFunc(i.LEQUAL);
              break;
            case da:
              i.depthFunc(i.EQUAL);
              break;
            case pa:
              i.depthFunc(i.GEQUAL);
              break;
            case ma:
              i.depthFunc(i.GREATER);
              break;
            case ga:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          Ee = J;
        }
      },
      setLocked: function (J) {
        L = J;
      },
      setClear: function (J) {
        se !== J && ((se = J), re && (J = 1 - J), i.clearDepth(J));
      },
      reset: function () {
        ((L = !1), (oe = null), (Ee = null), (se = null), (re = !1));
      },
    };
  }
  function s() {
    let L = !1,
      re = null,
      oe = null,
      Ee = null,
      se = null,
      J = null,
      Te = null,
      Re = null,
      st = null;
    return {
      setTest: function (tt) {
        L || (tt ? he(i.STENCIL_TEST) : fe(i.STENCIL_TEST));
      },
      setMask: function (tt) {
        re !== tt && !L && (i.stencilMask(tt), (re = tt));
      },
      setFunc: function (tt, Pt, Ut) {
        (oe !== tt || Ee !== Pt || se !== Ut) &&
          (i.stencilFunc(tt, Pt, Ut), (oe = tt), (Ee = Pt), (se = Ut));
      },
      setOp: function (tt, Pt, Ut) {
        (J !== tt || Te !== Pt || Re !== Ut) &&
          (i.stencilOp(tt, Pt, Ut), (J = tt), (Te = Pt), (Re = Ut));
      },
      setLocked: function (tt) {
        L = tt;
      },
      setClear: function (tt) {
        st !== tt && (i.clearStencil(tt), (st = tt));
      },
      reset: function () {
        ((L = !1),
          (re = null),
          (oe = null),
          (Ee = null),
          (se = null),
          (J = null),
          (Te = null),
          (Re = null),
          (st = null));
      },
    };
  }
  const r = new t(),
    a = new n(),
    o = new s(),
    c = new WeakMap(),
    l = new WeakMap();
  let u = {},
    f = {},
    h = new WeakMap(),
    d = [],
    g = null,
    x = !1,
    m = null,
    p = null,
    S = null,
    E = null,
    y = null,
    R = null,
    w = null,
    P = new He(0, 0, 0),
    v = 0,
    b = !1,
    W = null,
    C = null,
    V = null,
    G = null,
    H = null;
  const N = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let O = !1,
    F = 0;
  const ce = i.getParameter(i.VERSION);
  ce.indexOf("WebGL") !== -1
    ? ((F = parseFloat(/^WebGL (\d)/.exec(ce)[1])), (O = F >= 1))
    : ce.indexOf("OpenGL ES") !== -1 &&
      ((F = parseFloat(/^OpenGL ES (\d)/.exec(ce)[1])), (O = F >= 2));
  let ie = null,
    ge = {};
  const xe = i.getParameter(i.SCISSOR_BOX),
    _e = i.getParameter(i.VIEWPORT),
    Ue = new dt().fromArray(xe),
    Ze = new dt().fromArray(_e);
  function Ke(L, re, oe, Ee) {
    const se = new Uint8Array(4),
      J = i.createTexture();
    (i.bindTexture(L, J),
      i.texParameteri(L, i.TEXTURE_MIN_FILTER, i.NEAREST),
      i.texParameteri(L, i.TEXTURE_MAG_FILTER, i.NEAREST));
    for (let Te = 0; Te < oe; Te++)
      L === i.TEXTURE_3D || L === i.TEXTURE_2D_ARRAY
        ? i.texImage3D(re, 0, i.RGBA, 1, 1, Ee, 0, i.RGBA, i.UNSIGNED_BYTE, se)
        : i.texImage2D(
            re + Te,
            0,
            i.RGBA,
            1,
            1,
            0,
            i.RGBA,
            i.UNSIGNED_BYTE,
            se,
          );
    return J;
  }
  const $ = {};
  (($[i.TEXTURE_2D] = Ke(i.TEXTURE_2D, i.TEXTURE_2D, 1)),
    ($[i.TEXTURE_CUBE_MAP] = Ke(
      i.TEXTURE_CUBE_MAP,
      i.TEXTURE_CUBE_MAP_POSITIVE_X,
      6,
    )),
    ($[i.TEXTURE_2D_ARRAY] = Ke(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1)),
    ($[i.TEXTURE_3D] = Ke(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1)),
    r.setClear(0, 0, 0, 1),
    a.setClear(1),
    o.setClear(0),
    he(i.DEPTH_TEST),
    a.setFunc(bi),
    te(!1),
    me(Ho),
    he(i.CULL_FACE),
    ee(an));
  function he(L) {
    u[L] !== !0 && (i.enable(L), (u[L] = !0));
  }
  function fe(L) {
    u[L] !== !1 && (i.disable(L), (u[L] = !1));
  }
  function Be(L, re) {
    return f[L] !== re
      ? (i.bindFramebuffer(L, re),
        (f[L] = re),
        L === i.DRAW_FRAMEBUFFER && (f[i.FRAMEBUFFER] = re),
        L === i.FRAMEBUFFER && (f[i.DRAW_FRAMEBUFFER] = re),
        !0)
      : !1;
  }
  function we(L, re) {
    let oe = d,
      Ee = !1;
    if (L) {
      ((oe = h.get(re)), oe === void 0 && ((oe = []), h.set(re, oe)));
      const se = L.textures;
      if (oe.length !== se.length || oe[0] !== i.COLOR_ATTACHMENT0) {
        for (let J = 0, Te = se.length; J < Te; J++)
          oe[J] = i.COLOR_ATTACHMENT0 + J;
        ((oe.length = se.length), (Ee = !0));
      }
    } else oe[0] !== i.BACK && ((oe[0] = i.BACK), (Ee = !0));
    Ee && i.drawBuffers(oe);
  }
  function Ne(L) {
    return g !== L ? (i.useProgram(L), (g = L), !0) : !1;
  }
  const Je = {
    [Wn]: i.FUNC_ADD,
    [tu]: i.FUNC_SUBTRACT,
    [nu]: i.FUNC_REVERSE_SUBTRACT,
  };
  ((Je[iu] = i.MIN), (Je[su] = i.MAX));
  const Ge = {
    [ru]: i.ZERO,
    [au]: i.ONE,
    [ou]: i.SRC_COLOR,
    [la]: i.SRC_ALPHA,
    [du]: i.SRC_ALPHA_SATURATE,
    [hu]: i.DST_COLOR,
    [cu]: i.DST_ALPHA,
    [lu]: i.ONE_MINUS_SRC_COLOR,
    [ca]: i.ONE_MINUS_SRC_ALPHA,
    [fu]: i.ONE_MINUS_DST_COLOR,
    [uu]: i.ONE_MINUS_DST_ALPHA,
    [pu]: i.CONSTANT_COLOR,
    [mu]: i.ONE_MINUS_CONSTANT_COLOR,
    [gu]: i.CONSTANT_ALPHA,
    [_u]: i.ONE_MINUS_CONSTANT_ALPHA,
  };
  function ee(L, re, oe, Ee, se, J, Te, Re, st, tt) {
    if (L === an) {
      x === !0 && (fe(i.BLEND), (x = !1));
      return;
    }
    if ((x === !1 && (he(i.BLEND), (x = !0)), L !== eu)) {
      if (L !== m || tt !== b) {
        if (
          ((p !== Wn || y !== Wn) &&
            (i.blendEquation(i.FUNC_ADD), (p = Wn), (y = Wn)),
          tt)
        )
          switch (L) {
            case Si:
              i.blendFuncSeparate(
                i.ONE,
                i.ONE_MINUS_SRC_ALPHA,
                i.ONE,
                i.ONE_MINUS_SRC_ALPHA,
              );
              break;
            case rr:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case ko:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case Wo:
              i.blendFuncSeparate(
                i.DST_COLOR,
                i.ONE_MINUS_SRC_ALPHA,
                i.ZERO,
                i.ONE,
              );
              break;
            default:
              Qe("WebGLState: Invalid blending: ", L);
              break;
          }
        else
          switch (L) {
            case Si:
              i.blendFuncSeparate(
                i.SRC_ALPHA,
                i.ONE_MINUS_SRC_ALPHA,
                i.ONE,
                i.ONE_MINUS_SRC_ALPHA,
              );
              break;
            case rr:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE, i.ONE, i.ONE);
              break;
            case ko:
              Qe(
                "WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true",
              );
              break;
            case Wo:
              Qe(
                "WebGLState: MultiplyBlending requires material.premultipliedAlpha = true",
              );
              break;
            default:
              Qe("WebGLState: Invalid blending: ", L);
              break;
          }
        ((S = null),
          (E = null),
          (R = null),
          (w = null),
          P.set(0, 0, 0),
          (v = 0),
          (m = L),
          (b = tt));
      }
      return;
    }
    ((se = se || re),
      (J = J || oe),
      (Te = Te || Ee),
      (re !== p || se !== y) &&
        (i.blendEquationSeparate(Je[re], Je[se]), (p = re), (y = se)),
      (oe !== S || Ee !== E || J !== R || Te !== w) &&
        (i.blendFuncSeparate(Ge[oe], Ge[Ee], Ge[J], Ge[Te]),
        (S = oe),
        (E = Ee),
        (R = J),
        (w = Te)),
      (Re.equals(P) === !1 || st !== v) &&
        (i.blendColor(Re.r, Re.g, Re.b, st), P.copy(Re), (v = st)),
      (m = L),
      (b = !1));
  }
  function ae(L, re) {
    L.side === gn ? fe(i.CULL_FACE) : he(i.CULL_FACE);
    let oe = L.side === Ft;
    (re && (oe = !oe),
      te(oe),
      L.blending === Si && L.transparent === !1
        ? ee(an)
        : ee(
            L.blending,
            L.blendEquation,
            L.blendSrc,
            L.blendDst,
            L.blendEquationAlpha,
            L.blendSrcAlpha,
            L.blendDstAlpha,
            L.blendColor,
            L.blendAlpha,
            L.premultipliedAlpha,
          ),
      a.setFunc(L.depthFunc),
      a.setTest(L.depthTest),
      a.setMask(L.depthWrite),
      r.setMask(L.colorWrite));
    const Ee = L.stencilWrite;
    (o.setTest(Ee),
      Ee &&
        (o.setMask(L.stencilWriteMask),
        o.setFunc(L.stencilFunc, L.stencilRef, L.stencilFuncMask),
        o.setOp(L.stencilFail, L.stencilZFail, L.stencilZPass)),
      Fe(L.polygonOffset, L.polygonOffsetFactor, L.polygonOffsetUnits),
      L.alphaToCoverage === !0
        ? he(i.SAMPLE_ALPHA_TO_COVERAGE)
        : fe(i.SAMPLE_ALPHA_TO_COVERAGE));
  }
  function te(L) {
    W !== L && (L ? i.frontFace(i.CW) : i.frontFace(i.CCW), (W = L));
  }
  function me(L) {
    (L !== jc
      ? (he(i.CULL_FACE),
        L !== C &&
          (L === Ho
            ? i.cullFace(i.BACK)
            : L === Qc
              ? i.cullFace(i.FRONT)
              : i.cullFace(i.FRONT_AND_BACK)))
      : fe(i.CULL_FACE),
      (C = L));
  }
  function A(L) {
    L !== V && (O && i.lineWidth(L), (V = L));
  }
  function Fe(L, re, oe) {
    L
      ? (he(i.POLYGON_OFFSET_FILL),
        (G !== re || H !== oe) &&
          ((G = re),
          (H = oe),
          a.getReversed() && (re = -re),
          i.polygonOffset(re, oe)))
      : fe(i.POLYGON_OFFSET_FILL);
  }
  function Me(L) {
    L ? he(i.SCISSOR_TEST) : fe(i.SCISSOR_TEST);
  }
  function ze(L) {
    (L === void 0 && (L = i.TEXTURE0 + N - 1),
      ie !== L && (i.activeTexture(L), (ie = L)));
  }
  function de(L, re, oe) {
    oe === void 0 && (ie === null ? (oe = i.TEXTURE0 + N - 1) : (oe = ie));
    let Ee = ge[oe];
    (Ee === void 0 && ((Ee = { type: void 0, texture: void 0 }), (ge[oe] = Ee)),
      (Ee.type !== L || Ee.texture !== re) &&
        (ie !== oe && (i.activeTexture(oe), (ie = oe)),
        i.bindTexture(L, re || $[L]),
        (Ee.type = L),
        (Ee.texture = re)));
  }
  function T() {
    const L = ge[ie];
    L !== void 0 &&
      L.type !== void 0 &&
      (i.bindTexture(L.type, null), (L.type = void 0), (L.texture = void 0));
  }
  function _() {
    try {
      i.compressedTexImage2D(...arguments);
    } catch (L) {
      Qe("WebGLState:", L);
    }
  }
  function I() {
    try {
      i.compressedTexImage3D(...arguments);
    } catch (L) {
      Qe("WebGLState:", L);
    }
  }
  function Y() {
    try {
      i.texSubImage2D(...arguments);
    } catch (L) {
      Qe("WebGLState:", L);
    }
  }
  function Q() {
    try {
      i.texSubImage3D(...arguments);
    } catch (L) {
      Qe("WebGLState:", L);
    }
  }
  function Z() {
    try {
      i.compressedTexSubImage2D(...arguments);
    } catch (L) {
      Qe("WebGLState:", L);
    }
  }
  function be() {
    try {
      i.compressedTexSubImage3D(...arguments);
    } catch (L) {
      Qe("WebGLState:", L);
    }
  }
  function pe() {
    try {
      i.texStorage2D(...arguments);
    } catch (L) {
      Qe("WebGLState:", L);
    }
  }
  function De() {
    try {
      i.texStorage3D(...arguments);
    } catch (L) {
      Qe("WebGLState:", L);
    }
  }
  function B() {
    try {
      i.texImage2D(...arguments);
    } catch (L) {
      Qe("WebGLState:", L);
    }
  }
  function q() {
    try {
      i.texImage3D(...arguments);
    } catch (L) {
      Qe("WebGLState:", L);
    }
  }
  function K(L) {
    Ue.equals(L) === !1 && (i.scissor(L.x, L.y, L.z, L.w), Ue.copy(L));
  }
  function j(L) {
    Ze.equals(L) === !1 && (i.viewport(L.x, L.y, L.z, L.w), Ze.copy(L));
  }
  function le(L, re) {
    let oe = l.get(re);
    oe === void 0 && ((oe = new WeakMap()), l.set(re, oe));
    let Ee = oe.get(L);
    Ee === void 0 && ((Ee = i.getUniformBlockIndex(re, L.name)), oe.set(L, Ee));
  }
  function ne(L, re) {
    const Ee = l.get(re).get(L);
    c.get(re) !== Ee &&
      (i.uniformBlockBinding(re, Ee, L.__bindingPointIndex), c.set(re, Ee));
  }
  function Ce() {
    (i.disable(i.BLEND),
      i.disable(i.CULL_FACE),
      i.disable(i.DEPTH_TEST),
      i.disable(i.POLYGON_OFFSET_FILL),
      i.disable(i.SCISSOR_TEST),
      i.disable(i.STENCIL_TEST),
      i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),
      i.blendEquation(i.FUNC_ADD),
      i.blendFunc(i.ONE, i.ZERO),
      i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO),
      i.blendColor(0, 0, 0, 0),
      i.colorMask(!0, !0, !0, !0),
      i.clearColor(0, 0, 0, 0),
      i.depthMask(!0),
      i.depthFunc(i.LESS),
      a.setReversed(!1),
      i.clearDepth(1),
      i.stencilMask(4294967295),
      i.stencilFunc(i.ALWAYS, 0, 4294967295),
      i.stencilOp(i.KEEP, i.KEEP, i.KEEP),
      i.clearStencil(0),
      i.cullFace(i.BACK),
      i.frontFace(i.CCW),
      i.polygonOffset(0, 0),
      i.activeTexture(i.TEXTURE0),
      i.bindFramebuffer(i.FRAMEBUFFER, null),
      i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null),
      i.bindFramebuffer(i.READ_FRAMEBUFFER, null),
      i.useProgram(null),
      i.lineWidth(1),
      i.scissor(0, 0, i.canvas.width, i.canvas.height),
      i.viewport(0, 0, i.canvas.width, i.canvas.height),
      (u = {}),
      (ie = null),
      (ge = {}),
      (f = {}),
      (h = new WeakMap()),
      (d = []),
      (g = null),
      (x = !1),
      (m = null),
      (p = null),
      (S = null),
      (E = null),
      (y = null),
      (R = null),
      (w = null),
      (P = new He(0, 0, 0)),
      (v = 0),
      (b = !1),
      (W = null),
      (C = null),
      (V = null),
      (G = null),
      (H = null),
      Ue.set(0, 0, i.canvas.width, i.canvas.height),
      Ze.set(0, 0, i.canvas.width, i.canvas.height),
      r.reset(),
      a.reset(),
      o.reset());
  }
  return {
    buffers: { color: r, depth: a, stencil: o },
    enable: he,
    disable: fe,
    bindFramebuffer: Be,
    drawBuffers: we,
    useProgram: Ne,
    setBlending: ee,
    setMaterial: ae,
    setFlipSided: te,
    setCullFace: me,
    setLineWidth: A,
    setPolygonOffset: Fe,
    setScissorTest: Me,
    activeTexture: ze,
    bindTexture: de,
    unbindTexture: T,
    compressedTexImage2D: _,
    compressedTexImage3D: I,
    texImage2D: B,
    texImage3D: q,
    updateUBOMapping: le,
    uniformBlockBinding: ne,
    texStorage2D: pe,
    texStorage3D: De,
    texSubImage2D: Y,
    texSubImage3D: Q,
    compressedTexSubImage2D: Z,
    compressedTexSubImage3D: be,
    scissor: K,
    viewport: j,
    reset: Ce,
  };
}
function Jg(i, e, t, n, s, r, a) {
  const o = e.has("WEBGL_multisampled_render_to_texture")
      ? e.get("WEBGL_multisampled_render_to_texture")
      : null,
    c =
      typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent),
    l = new ue(),
    u = new WeakMap();
  let f;
  const h = new WeakMap();
  let d = !1;
  try {
    d =
      typeof OffscreenCanvas < "u" &&
      new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {}
  function g(T, _) {
    return d ? new OffscreenCanvas(T, _) : or("canvas");
  }
  function x(T, _, I) {
    let Y = 1;
    const Q = de(T);
    if (
      ((Q.width > I || Q.height > I) && (Y = I / Math.max(Q.width, Q.height)),
      Y < 1)
    )
      if (
        (typeof HTMLImageElement < "u" && T instanceof HTMLImageElement) ||
        (typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement) ||
        (typeof ImageBitmap < "u" && T instanceof ImageBitmap) ||
        (typeof VideoFrame < "u" && T instanceof VideoFrame)
      ) {
        const Z = Math.floor(Y * Q.width),
          be = Math.floor(Y * Q.height);
        f === void 0 && (f = g(Z, be));
        const pe = _ ? g(Z, be) : f;
        return (
          (pe.width = Z),
          (pe.height = be),
          pe.getContext("2d").drawImage(T, 0, 0, Z, be),
          Ve(
            "WebGLRenderer: Texture has been resized from (" +
              Q.width +
              "x" +
              Q.height +
              ") to (" +
              Z +
              "x" +
              be +
              ").",
          ),
          pe
        );
      } else
        return (
          "data" in T &&
            Ve(
              "WebGLRenderer: Image in DataTexture is too big (" +
                Q.width +
                "x" +
                Q.height +
                ").",
            ),
          T
        );
    return T;
  }
  function m(T) {
    return T.generateMipmaps;
  }
  function p(T) {
    i.generateMipmap(T);
  }
  function S(T) {
    return T.isWebGLCubeRenderTarget
      ? i.TEXTURE_CUBE_MAP
      : T.isWebGL3DRenderTarget
        ? i.TEXTURE_3D
        : T.isWebGLArrayRenderTarget || T.isCompressedArrayTexture
          ? i.TEXTURE_2D_ARRAY
          : i.TEXTURE_2D;
  }
  function E(T, _, I, Y, Q = !1) {
    if (T !== null) {
      if (i[T] !== void 0) return i[T];
      Ve(
        "WebGLRenderer: Attempt to use non-existing WebGL internal format '" +
          T +
          "'",
      );
    }
    let Z = _;
    if (
      (_ === i.RED &&
        (I === i.FLOAT && (Z = i.R32F),
        I === i.HALF_FLOAT && (Z = i.R16F),
        I === i.UNSIGNED_BYTE && (Z = i.R8)),
      _ === i.RED_INTEGER &&
        (I === i.UNSIGNED_BYTE && (Z = i.R8UI),
        I === i.UNSIGNED_SHORT && (Z = i.R16UI),
        I === i.UNSIGNED_INT && (Z = i.R32UI),
        I === i.BYTE && (Z = i.R8I),
        I === i.SHORT && (Z = i.R16I),
        I === i.INT && (Z = i.R32I)),
      _ === i.RG &&
        (I === i.FLOAT && (Z = i.RG32F),
        I === i.HALF_FLOAT && (Z = i.RG16F),
        I === i.UNSIGNED_BYTE && (Z = i.RG8)),
      _ === i.RG_INTEGER &&
        (I === i.UNSIGNED_BYTE && (Z = i.RG8UI),
        I === i.UNSIGNED_SHORT && (Z = i.RG16UI),
        I === i.UNSIGNED_INT && (Z = i.RG32UI),
        I === i.BYTE && (Z = i.RG8I),
        I === i.SHORT && (Z = i.RG16I),
        I === i.INT && (Z = i.RG32I)),
      _ === i.RGB_INTEGER &&
        (I === i.UNSIGNED_BYTE && (Z = i.RGB8UI),
        I === i.UNSIGNED_SHORT && (Z = i.RGB16UI),
        I === i.UNSIGNED_INT && (Z = i.RGB32UI),
        I === i.BYTE && (Z = i.RGB8I),
        I === i.SHORT && (Z = i.RGB16I),
        I === i.INT && (Z = i.RGB32I)),
      _ === i.RGBA_INTEGER &&
        (I === i.UNSIGNED_BYTE && (Z = i.RGBA8UI),
        I === i.UNSIGNED_SHORT && (Z = i.RGBA16UI),
        I === i.UNSIGNED_INT && (Z = i.RGBA32UI),
        I === i.BYTE && (Z = i.RGBA8I),
        I === i.SHORT && (Z = i.RGBA16I),
        I === i.INT && (Z = i.RGBA32I)),
      _ === i.RGB &&
        (I === i.UNSIGNED_INT_5_9_9_9_REV && (Z = i.RGB9_E5),
        I === i.UNSIGNED_INT_10F_11F_11F_REV && (Z = i.R11F_G11F_B10F)),
      _ === i.RGBA)
    ) {
      const be = Q ? ar : et.getTransfer(Y);
      (I === i.FLOAT && (Z = i.RGBA32F),
        I === i.HALF_FLOAT && (Z = i.RGBA16F),
        I === i.UNSIGNED_BYTE && (Z = be === it ? i.SRGB8_ALPHA8 : i.RGBA8),
        I === i.UNSIGNED_SHORT_4_4_4_4 && (Z = i.RGBA4),
        I === i.UNSIGNED_SHORT_5_5_5_1 && (Z = i.RGB5_A1));
    }
    return (
      (Z === i.R16F ||
        Z === i.R32F ||
        Z === i.RG16F ||
        Z === i.RG32F ||
        Z === i.RGBA16F ||
        Z === i.RGBA32F) &&
        e.get("EXT_color_buffer_float"),
      Z
    );
  }
  function y(T, _) {
    let I;
    return (
      T
        ? _ === null || _ === on || _ === rs
          ? (I = i.DEPTH24_STENCIL8)
          : _ === $t
            ? (I = i.DEPTH32F_STENCIL8)
            : _ === ss &&
              ((I = i.DEPTH24_STENCIL8),
              Ve(
                "DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.",
              ))
        : _ === null || _ === on || _ === rs
          ? (I = i.DEPTH_COMPONENT24)
          : _ === $t
            ? (I = i.DEPTH_COMPONENT32F)
            : _ === ss && (I = i.DEPTH_COMPONENT16),
      I
    );
  }
  function R(T, _) {
    return m(T) === !0 ||
      (T.isFramebufferTexture && T.minFilter !== Et && T.minFilter !== Ct)
      ? Math.log2(Math.max(_.width, _.height)) + 1
      : T.mipmaps !== void 0 && T.mipmaps.length > 0
        ? T.mipmaps.length
        : T.isCompressedTexture && Array.isArray(T.image)
          ? _.mipmaps.length
          : 1;
  }
  function w(T) {
    const _ = T.target;
    (_.removeEventListener("dispose", w),
      v(_),
      _.isVideoTexture && u.delete(_));
  }
  function P(T) {
    const _ = T.target;
    (_.removeEventListener("dispose", P), W(_));
  }
  function v(T) {
    const _ = n.get(T);
    if (_.__webglInit === void 0) return;
    const I = T.source,
      Y = h.get(I);
    if (Y) {
      const Q = Y[_.__cacheKey];
      (Q.usedTimes--,
        Q.usedTimes === 0 && b(T),
        Object.keys(Y).length === 0 && h.delete(I));
    }
    n.remove(T);
  }
  function b(T) {
    const _ = n.get(T);
    i.deleteTexture(_.__webglTexture);
    const I = T.source,
      Y = h.get(I);
    (delete Y[_.__cacheKey], a.memory.textures--);
  }
  function W(T) {
    const _ = n.get(T);
    if (
      (T.depthTexture && (T.depthTexture.dispose(), n.remove(T.depthTexture)),
      T.isWebGLCubeRenderTarget)
    )
      for (let Y = 0; Y < 6; Y++) {
        if (Array.isArray(_.__webglFramebuffer[Y]))
          for (let Q = 0; Q < _.__webglFramebuffer[Y].length; Q++)
            i.deleteFramebuffer(_.__webglFramebuffer[Y][Q]);
        else i.deleteFramebuffer(_.__webglFramebuffer[Y]);
        _.__webglDepthbuffer && i.deleteRenderbuffer(_.__webglDepthbuffer[Y]);
      }
    else {
      if (Array.isArray(_.__webglFramebuffer))
        for (let Y = 0; Y < _.__webglFramebuffer.length; Y++)
          i.deleteFramebuffer(_.__webglFramebuffer[Y]);
      else i.deleteFramebuffer(_.__webglFramebuffer);
      if (
        (_.__webglDepthbuffer && i.deleteRenderbuffer(_.__webglDepthbuffer),
        _.__webglMultisampledFramebuffer &&
          i.deleteFramebuffer(_.__webglMultisampledFramebuffer),
        _.__webglColorRenderbuffer)
      )
        for (let Y = 0; Y < _.__webglColorRenderbuffer.length; Y++)
          _.__webglColorRenderbuffer[Y] &&
            i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);
      _.__webglDepthRenderbuffer &&
        i.deleteRenderbuffer(_.__webglDepthRenderbuffer);
    }
    const I = T.textures;
    for (let Y = 0, Q = I.length; Y < Q; Y++) {
      const Z = n.get(I[Y]);
      (Z.__webglTexture &&
        (i.deleteTexture(Z.__webglTexture), a.memory.textures--),
        n.remove(I[Y]));
    }
    n.remove(T);
  }
  let C = 0;
  function V() {
    C = 0;
  }
  function G() {
    const T = C;
    return (
      T >= s.maxTextures &&
        Ve(
          "WebGLTextures: Trying to use " +
            T +
            " texture units while this GPU supports only " +
            s.maxTextures,
        ),
      (C += 1),
      T
    );
  }
  function H(T) {
    const _ = [];
    return (
      _.push(T.wrapS),
      _.push(T.wrapT),
      _.push(T.wrapR || 0),
      _.push(T.magFilter),
      _.push(T.minFilter),
      _.push(T.anisotropy),
      _.push(T.internalFormat),
      _.push(T.format),
      _.push(T.type),
      _.push(T.generateMipmaps),
      _.push(T.premultiplyAlpha),
      _.push(T.flipY),
      _.push(T.unpackAlignment),
      _.push(T.colorSpace),
      _.join()
    );
  }
  function N(T, _) {
    const I = n.get(T);
    if (
      (T.isVideoTexture && Me(T),
      T.isRenderTargetTexture === !1 &&
        T.isExternalTexture !== !0 &&
        T.version > 0 &&
        I.__version !== T.version)
    ) {
      const Y = T.image;
      if (Y === null)
        Ve("WebGLRenderer: Texture marked for update but no image data found.");
      else if (Y.complete === !1)
        Ve("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        $(I, T, _);
        return;
      }
    } else
      T.isExternalTexture &&
        (I.__webglTexture = T.sourceTexture ? T.sourceTexture : null);
    t.bindTexture(i.TEXTURE_2D, I.__webglTexture, i.TEXTURE0 + _);
  }
  function O(T, _) {
    const I = n.get(T);
    if (
      T.isRenderTargetTexture === !1 &&
      T.version > 0 &&
      I.__version !== T.version
    ) {
      $(I, T, _);
      return;
    } else
      T.isExternalTexture &&
        (I.__webglTexture = T.sourceTexture ? T.sourceTexture : null);
    t.bindTexture(i.TEXTURE_2D_ARRAY, I.__webglTexture, i.TEXTURE0 + _);
  }
  function F(T, _) {
    const I = n.get(T);
    if (
      T.isRenderTargetTexture === !1 &&
      T.version > 0 &&
      I.__version !== T.version
    ) {
      $(I, T, _);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, I.__webglTexture, i.TEXTURE0 + _);
  }
  function ce(T, _) {
    const I = n.get(T);
    if (
      T.isCubeDepthTexture !== !0 &&
      T.version > 0 &&
      I.__version !== T.version
    ) {
      he(I, T, _);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, I.__webglTexture, i.TEXTURE0 + _);
  }
  const ie = { [_a]: i.REPEAT, [_n]: i.CLAMP_TO_EDGE, [va]: i.MIRRORED_REPEAT },
    ge = {
      [Et]: i.NEAREST,
      [Mu]: i.NEAREST_MIPMAP_NEAREST,
      [_s]: i.NEAREST_MIPMAP_LINEAR,
      [Ct]: i.LINEAR,
      [Tr]: i.LINEAR_MIPMAP_NEAREST,
      [Yn]: i.LINEAR_MIPMAP_LINEAR,
    },
    xe = {
      [Eu]: i.NEVER,
      [Cu]: i.ALWAYS,
      [bu]: i.LESS,
      [xo]: i.LEQUAL,
      [Tu]: i.EQUAL,
      [Mo]: i.GEQUAL,
      [Au]: i.GREATER,
      [wu]: i.NOTEQUAL,
    };
  function _e(T, _) {
    if (
      (_.type === $t &&
        e.has("OES_texture_float_linear") === !1 &&
        (_.magFilter === Ct ||
          _.magFilter === Tr ||
          _.magFilter === _s ||
          _.magFilter === Yn ||
          _.minFilter === Ct ||
          _.minFilter === Tr ||
          _.minFilter === _s ||
          _.minFilter === Yn) &&
        Ve(
          "WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.",
        ),
      i.texParameteri(T, i.TEXTURE_WRAP_S, ie[_.wrapS]),
      i.texParameteri(T, i.TEXTURE_WRAP_T, ie[_.wrapT]),
      (T === i.TEXTURE_3D || T === i.TEXTURE_2D_ARRAY) &&
        i.texParameteri(T, i.TEXTURE_WRAP_R, ie[_.wrapR]),
      i.texParameteri(T, i.TEXTURE_MAG_FILTER, ge[_.magFilter]),
      i.texParameteri(T, i.TEXTURE_MIN_FILTER, ge[_.minFilter]),
      _.compareFunction &&
        (i.texParameteri(T, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE),
        i.texParameteri(T, i.TEXTURE_COMPARE_FUNC, xe[_.compareFunction])),
      e.has("EXT_texture_filter_anisotropic") === !0)
    ) {
      if (
        _.magFilter === Et ||
        (_.minFilter !== _s && _.minFilter !== Yn) ||
        (_.type === $t && e.has("OES_texture_float_linear") === !1)
      )
        return;
      if (_.anisotropy > 1 || n.get(_).__currentAnisotropy) {
        const I = e.get("EXT_texture_filter_anisotropic");
        (i.texParameterf(
          T,
          I.TEXTURE_MAX_ANISOTROPY_EXT,
          Math.min(_.anisotropy, s.getMaxAnisotropy()),
        ),
          (n.get(_).__currentAnisotropy = _.anisotropy));
      }
    }
  }
  function Ue(T, _) {
    let I = !1;
    T.__webglInit === void 0 &&
      ((T.__webglInit = !0), _.addEventListener("dispose", w));
    const Y = _.source;
    let Q = h.get(Y);
    Q === void 0 && ((Q = {}), h.set(Y, Q));
    const Z = H(_);
    if (Z !== T.__cacheKey) {
      (Q[Z] === void 0 &&
        ((Q[Z] = { texture: i.createTexture(), usedTimes: 0 }),
        a.memory.textures++,
        (I = !0)),
        Q[Z].usedTimes++);
      const be = Q[T.__cacheKey];
      (be !== void 0 &&
        (Q[T.__cacheKey].usedTimes--, be.usedTimes === 0 && b(_)),
        (T.__cacheKey = Z),
        (T.__webglTexture = Q[Z].texture));
    }
    return I;
  }
  function Ze(T, _, I) {
    return Math.floor(Math.floor(T / I) / _);
  }
  function Ke(T, _, I, Y) {
    const Z = T.updateRanges;
    if (Z.length === 0)
      t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, _.width, _.height, I, Y, _.data);
    else {
      Z.sort((q, K) => q.start - K.start);
      let be = 0;
      for (let q = 1; q < Z.length; q++) {
        const K = Z[be],
          j = Z[q],
          le = K.start + K.count,
          ne = Ze(j.start, _.width, 4),
          Ce = Ze(K.start, _.width, 4);
        j.start <= le + 1 &&
        ne === Ce &&
        Ze(j.start + j.count - 1, _.width, 4) === ne
          ? (K.count = Math.max(K.count, j.start + j.count - K.start))
          : (++be, (Z[be] = j));
      }
      Z.length = be + 1;
      const pe = i.getParameter(i.UNPACK_ROW_LENGTH),
        De = i.getParameter(i.UNPACK_SKIP_PIXELS),
        B = i.getParameter(i.UNPACK_SKIP_ROWS);
      i.pixelStorei(i.UNPACK_ROW_LENGTH, _.width);
      for (let q = 0, K = Z.length; q < K; q++) {
        const j = Z[q],
          le = Math.floor(j.start / 4),
          ne = Math.ceil(j.count / 4),
          Ce = le % _.width,
          L = Math.floor(le / _.width),
          re = ne,
          oe = 1;
        (i.pixelStorei(i.UNPACK_SKIP_PIXELS, Ce),
          i.pixelStorei(i.UNPACK_SKIP_ROWS, L),
          t.texSubImage2D(i.TEXTURE_2D, 0, Ce, L, re, oe, I, Y, _.data));
      }
      (T.clearUpdateRanges(),
        i.pixelStorei(i.UNPACK_ROW_LENGTH, pe),
        i.pixelStorei(i.UNPACK_SKIP_PIXELS, De),
        i.pixelStorei(i.UNPACK_SKIP_ROWS, B));
    }
  }
  function $(T, _, I) {
    let Y = i.TEXTURE_2D;
    ((_.isDataArrayTexture || _.isCompressedArrayTexture) &&
      (Y = i.TEXTURE_2D_ARRAY),
      _.isData3DTexture && (Y = i.TEXTURE_3D));
    const Q = Ue(T, _),
      Z = _.source;
    t.bindTexture(Y, T.__webglTexture, i.TEXTURE0 + I);
    const be = n.get(Z);
    if (Z.version !== be.__version || Q === !0) {
      t.activeTexture(i.TEXTURE0 + I);
      const pe = et.getPrimaries(et.workingColorSpace),
        De = _.colorSpace === Pn ? null : et.getPrimaries(_.colorSpace),
        B = _.colorSpace === Pn || pe === De ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      (i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY),
        i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha),
        i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment),
        i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, B));
      let q = x(_.image, !1, s.maxTextureSize);
      q = ze(_, q);
      const K = r.convert(_.format, _.colorSpace),
        j = r.convert(_.type);
      let le = E(_.internalFormat, K, j, _.colorSpace, _.isVideoTexture);
      _e(Y, _);
      let ne;
      const Ce = _.mipmaps,
        L = _.isVideoTexture !== !0,
        re = be.__version === void 0 || Q === !0,
        oe = Z.dataReady,
        Ee = R(_, q);
      if (_.isDepthTexture)
        ((le = y(_.format === Jn, _.type)),
          re &&
            (L
              ? t.texStorage2D(i.TEXTURE_2D, 1, le, q.width, q.height)
              : t.texImage2D(
                  i.TEXTURE_2D,
                  0,
                  le,
                  q.width,
                  q.height,
                  0,
                  K,
                  j,
                  null,
                )));
      else if (_.isDataTexture)
        if (Ce.length > 0) {
          L &&
            re &&
            t.texStorage2D(i.TEXTURE_2D, Ee, le, Ce[0].width, Ce[0].height);
          for (let se = 0, J = Ce.length; se < J; se++)
            ((ne = Ce[se]),
              L
                ? oe &&
                  t.texSubImage2D(
                    i.TEXTURE_2D,
                    se,
                    0,
                    0,
                    ne.width,
                    ne.height,
                    K,
                    j,
                    ne.data,
                  )
                : t.texImage2D(
                    i.TEXTURE_2D,
                    se,
                    le,
                    ne.width,
                    ne.height,
                    0,
                    K,
                    j,
                    ne.data,
                  ));
          _.generateMipmaps = !1;
        } else
          L
            ? (re && t.texStorage2D(i.TEXTURE_2D, Ee, le, q.width, q.height),
              oe && Ke(_, q, K, j))
            : t.texImage2D(
                i.TEXTURE_2D,
                0,
                le,
                q.width,
                q.height,
                0,
                K,
                j,
                q.data,
              );
      else if (_.isCompressedTexture)
        if (_.isCompressedArrayTexture) {
          L &&
            re &&
            t.texStorage3D(
              i.TEXTURE_2D_ARRAY,
              Ee,
              le,
              Ce[0].width,
              Ce[0].height,
              q.depth,
            );
          for (let se = 0, J = Ce.length; se < J; se++)
            if (((ne = Ce[se]), _.format !== Kt))
              if (K !== null)
                if (L) {
                  if (oe)
                    if (_.layerUpdates.size > 0) {
                      const Te = Pl(ne.width, ne.height, _.format, _.type);
                      for (const Re of _.layerUpdates) {
                        const st = ne.data.subarray(
                          (Re * Te) / ne.data.BYTES_PER_ELEMENT,
                          ((Re + 1) * Te) / ne.data.BYTES_PER_ELEMENT,
                        );
                        t.compressedTexSubImage3D(
                          i.TEXTURE_2D_ARRAY,
                          se,
                          0,
                          0,
                          Re,
                          ne.width,
                          ne.height,
                          1,
                          K,
                          st,
                        );
                      }
                      _.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(
                        i.TEXTURE_2D_ARRAY,
                        se,
                        0,
                        0,
                        0,
                        ne.width,
                        ne.height,
                        q.depth,
                        K,
                        ne.data,
                      );
                } else
                  t.compressedTexImage3D(
                    i.TEXTURE_2D_ARRAY,
                    se,
                    le,
                    ne.width,
                    ne.height,
                    q.depth,
                    0,
                    ne.data,
                    0,
                    0,
                  );
              else
                Ve(
                  "WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                );
            else
              L
                ? oe &&
                  t.texSubImage3D(
                    i.TEXTURE_2D_ARRAY,
                    se,
                    0,
                    0,
                    0,
                    ne.width,
                    ne.height,
                    q.depth,
                    K,
                    j,
                    ne.data,
                  )
                : t.texImage3D(
                    i.TEXTURE_2D_ARRAY,
                    se,
                    le,
                    ne.width,
                    ne.height,
                    q.depth,
                    0,
                    K,
                    j,
                    ne.data,
                  );
        } else {
          L &&
            re &&
            t.texStorage2D(i.TEXTURE_2D, Ee, le, Ce[0].width, Ce[0].height);
          for (let se = 0, J = Ce.length; se < J; se++)
            ((ne = Ce[se]),
              _.format !== Kt
                ? K !== null
                  ? L
                    ? oe &&
                      t.compressedTexSubImage2D(
                        i.TEXTURE_2D,
                        se,
                        0,
                        0,
                        ne.width,
                        ne.height,
                        K,
                        ne.data,
                      )
                    : t.compressedTexImage2D(
                        i.TEXTURE_2D,
                        se,
                        le,
                        ne.width,
                        ne.height,
                        0,
                        ne.data,
                      )
                  : Ve(
                      "WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()",
                    )
                : L
                  ? oe &&
                    t.texSubImage2D(
                      i.TEXTURE_2D,
                      se,
                      0,
                      0,
                      ne.width,
                      ne.height,
                      K,
                      j,
                      ne.data,
                    )
                  : t.texImage2D(
                      i.TEXTURE_2D,
                      se,
                      le,
                      ne.width,
                      ne.height,
                      0,
                      K,
                      j,
                      ne.data,
                    ));
        }
      else if (_.isDataArrayTexture)
        if (L) {
          if (
            (re &&
              t.texStorage3D(
                i.TEXTURE_2D_ARRAY,
                Ee,
                le,
                q.width,
                q.height,
                q.depth,
              ),
            oe)
          )
            if (_.layerUpdates.size > 0) {
              const se = Pl(q.width, q.height, _.format, _.type);
              for (const J of _.layerUpdates) {
                const Te = q.data.subarray(
                  (J * se) / q.data.BYTES_PER_ELEMENT,
                  ((J + 1) * se) / q.data.BYTES_PER_ELEMENT,
                );
                t.texSubImage3D(
                  i.TEXTURE_2D_ARRAY,
                  0,
                  0,
                  0,
                  J,
                  q.width,
                  q.height,
                  1,
                  K,
                  j,
                  Te,
                );
              }
              _.clearLayerUpdates();
            } else
              t.texSubImage3D(
                i.TEXTURE_2D_ARRAY,
                0,
                0,
                0,
                0,
                q.width,
                q.height,
                q.depth,
                K,
                j,
                q.data,
              );
        } else
          t.texImage3D(
            i.TEXTURE_2D_ARRAY,
            0,
            le,
            q.width,
            q.height,
            q.depth,
            0,
            K,
            j,
            q.data,
          );
      else if (_.isData3DTexture)
        L
          ? (re &&
              t.texStorage3D(i.TEXTURE_3D, Ee, le, q.width, q.height, q.depth),
            oe &&
              t.texSubImage3D(
                i.TEXTURE_3D,
                0,
                0,
                0,
                0,
                q.width,
                q.height,
                q.depth,
                K,
                j,
                q.data,
              ))
          : t.texImage3D(
              i.TEXTURE_3D,
              0,
              le,
              q.width,
              q.height,
              q.depth,
              0,
              K,
              j,
              q.data,
            );
      else if (_.isFramebufferTexture) {
        if (re)
          if (L) t.texStorage2D(i.TEXTURE_2D, Ee, le, q.width, q.height);
          else {
            let se = q.width,
              J = q.height;
            for (let Te = 0; Te < Ee; Te++)
              (t.texImage2D(i.TEXTURE_2D, Te, le, se, J, 0, K, j, null),
                (se >>= 1),
                (J >>= 1));
          }
      } else if (Ce.length > 0) {
        if (L && re) {
          const se = de(Ce[0]);
          t.texStorage2D(i.TEXTURE_2D, Ee, le, se.width, se.height);
        }
        for (let se = 0, J = Ce.length; se < J; se++)
          ((ne = Ce[se]),
            L
              ? oe && t.texSubImage2D(i.TEXTURE_2D, se, 0, 0, K, j, ne)
              : t.texImage2D(i.TEXTURE_2D, se, le, K, j, ne));
        _.generateMipmaps = !1;
      } else if (L) {
        if (re) {
          const se = de(q);
          t.texStorage2D(i.TEXTURE_2D, Ee, le, se.width, se.height);
        }
        oe && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, K, j, q);
      } else t.texImage2D(i.TEXTURE_2D, 0, le, K, j, q);
      (m(_) && p(Y), (be.__version = Z.version), _.onUpdate && _.onUpdate(_));
    }
    T.__version = _.version;
  }
  function he(T, _, I) {
    if (_.image.length !== 6) return;
    const Y = Ue(T, _),
      Q = _.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, T.__webglTexture, i.TEXTURE0 + I);
    const Z = n.get(Q);
    if (Q.version !== Z.__version || Y === !0) {
      t.activeTexture(i.TEXTURE0 + I);
      const be = et.getPrimaries(et.workingColorSpace),
        pe = _.colorSpace === Pn ? null : et.getPrimaries(_.colorSpace),
        De =
          _.colorSpace === Pn || be === pe ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      (i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY),
        i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha),
        i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment),
        i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, De));
      const B = _.isCompressedTexture || _.image[0].isCompressedTexture,
        q = _.image[0] && _.image[0].isDataTexture,
        K = [];
      for (let J = 0; J < 6; J++)
        (!B && !q
          ? (K[J] = x(_.image[J], !0, s.maxCubemapSize))
          : (K[J] = q ? _.image[J].image : _.image[J]),
          (K[J] = ze(_, K[J])));
      const j = K[0],
        le = r.convert(_.format, _.colorSpace),
        ne = r.convert(_.type),
        Ce = E(_.internalFormat, le, ne, _.colorSpace),
        L = _.isVideoTexture !== !0,
        re = Z.__version === void 0 || Y === !0,
        oe = Q.dataReady;
      let Ee = R(_, j);
      _e(i.TEXTURE_CUBE_MAP, _);
      let se;
      if (B) {
        L &&
          re &&
          t.texStorage2D(i.TEXTURE_CUBE_MAP, Ee, Ce, j.width, j.height);
        for (let J = 0; J < 6; J++) {
          se = K[J].mipmaps;
          for (let Te = 0; Te < se.length; Te++) {
            const Re = se[Te];
            _.format !== Kt
              ? le !== null
                ? L
                  ? oe &&
                    t.compressedTexSubImage2D(
                      i.TEXTURE_CUBE_MAP_POSITIVE_X + J,
                      Te,
                      0,
                      0,
                      Re.width,
                      Re.height,
                      le,
                      Re.data,
                    )
                  : t.compressedTexImage2D(
                      i.TEXTURE_CUBE_MAP_POSITIVE_X + J,
                      Te,
                      Ce,
                      Re.width,
                      Re.height,
                      0,
                      Re.data,
                    )
                : Ve(
                    "WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()",
                  )
              : L
                ? oe &&
                  t.texSubImage2D(
                    i.TEXTURE_CUBE_MAP_POSITIVE_X + J,
                    Te,
                    0,
                    0,
                    Re.width,
                    Re.height,
                    le,
                    ne,
                    Re.data,
                  )
                : t.texImage2D(
                    i.TEXTURE_CUBE_MAP_POSITIVE_X + J,
                    Te,
                    Ce,
                    Re.width,
                    Re.height,
                    0,
                    le,
                    ne,
                    Re.data,
                  );
          }
        }
      } else {
        if (((se = _.mipmaps), L && re)) {
          se.length > 0 && Ee++;
          const J = de(K[0]);
          t.texStorage2D(i.TEXTURE_CUBE_MAP, Ee, Ce, J.width, J.height);
        }
        for (let J = 0; J < 6; J++)
          if (q) {
            L
              ? oe &&
                t.texSubImage2D(
                  i.TEXTURE_CUBE_MAP_POSITIVE_X + J,
                  0,
                  0,
                  0,
                  K[J].width,
                  K[J].height,
                  le,
                  ne,
                  K[J].data,
                )
              : t.texImage2D(
                  i.TEXTURE_CUBE_MAP_POSITIVE_X + J,
                  0,
                  Ce,
                  K[J].width,
                  K[J].height,
                  0,
                  le,
                  ne,
                  K[J].data,
                );
            for (let Te = 0; Te < se.length; Te++) {
              const st = se[Te].image[J].image;
              L
                ? oe &&
                  t.texSubImage2D(
                    i.TEXTURE_CUBE_MAP_POSITIVE_X + J,
                    Te + 1,
                    0,
                    0,
                    st.width,
                    st.height,
                    le,
                    ne,
                    st.data,
                  )
                : t.texImage2D(
                    i.TEXTURE_CUBE_MAP_POSITIVE_X + J,
                    Te + 1,
                    Ce,
                    st.width,
                    st.height,
                    0,
                    le,
                    ne,
                    st.data,
                  );
            }
          } else {
            L
              ? oe &&
                t.texSubImage2D(
                  i.TEXTURE_CUBE_MAP_POSITIVE_X + J,
                  0,
                  0,
                  0,
                  le,
                  ne,
                  K[J],
                )
              : t.texImage2D(
                  i.TEXTURE_CUBE_MAP_POSITIVE_X + J,
                  0,
                  Ce,
                  le,
                  ne,
                  K[J],
                );
            for (let Te = 0; Te < se.length; Te++) {
              const Re = se[Te];
              L
                ? oe &&
                  t.texSubImage2D(
                    i.TEXTURE_CUBE_MAP_POSITIVE_X + J,
                    Te + 1,
                    0,
                    0,
                    le,
                    ne,
                    Re.image[J],
                  )
                : t.texImage2D(
                    i.TEXTURE_CUBE_MAP_POSITIVE_X + J,
                    Te + 1,
                    Ce,
                    le,
                    ne,
                    Re.image[J],
                  );
            }
          }
      }
      (m(_) && p(i.TEXTURE_CUBE_MAP),
        (Z.__version = Q.version),
        _.onUpdate && _.onUpdate(_));
    }
    T.__version = _.version;
  }
  function fe(T, _, I, Y, Q, Z) {
    const be = r.convert(I.format, I.colorSpace),
      pe = r.convert(I.type),
      De = E(I.internalFormat, be, pe, I.colorSpace),
      B = n.get(_),
      q = n.get(I);
    if (((q.__renderTarget = _), !B.__hasExternalTextures)) {
      const K = Math.max(1, _.width >> Z),
        j = Math.max(1, _.height >> Z);
      Q === i.TEXTURE_3D || Q === i.TEXTURE_2D_ARRAY
        ? t.texImage3D(Q, Z, De, K, j, _.depth, 0, be, pe, null)
        : t.texImage2D(Q, Z, De, K, j, 0, be, pe, null);
    }
    (t.bindFramebuffer(i.FRAMEBUFFER, T),
      Fe(_)
        ? o.framebufferTexture2DMultisampleEXT(
            i.FRAMEBUFFER,
            Y,
            Q,
            q.__webglTexture,
            0,
            A(_),
          )
        : (Q === i.TEXTURE_2D ||
            (Q >= i.TEXTURE_CUBE_MAP_POSITIVE_X &&
              Q <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z)) &&
          i.framebufferTexture2D(i.FRAMEBUFFER, Y, Q, q.__webglTexture, Z),
      t.bindFramebuffer(i.FRAMEBUFFER, null));
  }
  function Be(T, _, I) {
    if ((i.bindRenderbuffer(i.RENDERBUFFER, T), _.depthBuffer)) {
      const Y = _.depthTexture,
        Q = Y && Y.isDepthTexture ? Y.type : null,
        Z = y(_.stencilBuffer, Q),
        be = _.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
      (Fe(_)
        ? o.renderbufferStorageMultisampleEXT(
            i.RENDERBUFFER,
            A(_),
            Z,
            _.width,
            _.height,
          )
        : I
          ? i.renderbufferStorageMultisample(
              i.RENDERBUFFER,
              A(_),
              Z,
              _.width,
              _.height,
            )
          : i.renderbufferStorage(i.RENDERBUFFER, Z, _.width, _.height),
        i.framebufferRenderbuffer(i.FRAMEBUFFER, be, i.RENDERBUFFER, T));
    } else {
      const Y = _.textures;
      for (let Q = 0; Q < Y.length; Q++) {
        const Z = Y[Q],
          be = r.convert(Z.format, Z.colorSpace),
          pe = r.convert(Z.type),
          De = E(Z.internalFormat, be, pe, Z.colorSpace);
        Fe(_)
          ? o.renderbufferStorageMultisampleEXT(
              i.RENDERBUFFER,
              A(_),
              De,
              _.width,
              _.height,
            )
          : I
            ? i.renderbufferStorageMultisample(
                i.RENDERBUFFER,
                A(_),
                De,
                _.width,
                _.height,
              )
            : i.renderbufferStorage(i.RENDERBUFFER, De, _.width, _.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function we(T, _, I) {
    const Y = _.isWebGLCubeRenderTarget === !0;
    if (
      (t.bindFramebuffer(i.FRAMEBUFFER, T),
      !(_.depthTexture && _.depthTexture.isDepthTexture))
    )
      throw new Error(
        "renderTarget.depthTexture must be an instance of THREE.DepthTexture",
      );
    const Q = n.get(_.depthTexture);
    if (
      ((Q.__renderTarget = _),
      (!Q.__webglTexture ||
        _.depthTexture.image.width !== _.width ||
        _.depthTexture.image.height !== _.height) &&
        ((_.depthTexture.image.width = _.width),
        (_.depthTexture.image.height = _.height),
        (_.depthTexture.needsUpdate = !0)),
      Y)
    ) {
      if (
        (Q.__webglInit === void 0 &&
          ((Q.__webglInit = !0), _.depthTexture.addEventListener("dispose", w)),
        Q.__webglTexture === void 0)
      ) {
        ((Q.__webglTexture = i.createTexture()),
          t.bindTexture(i.TEXTURE_CUBE_MAP, Q.__webglTexture),
          _e(i.TEXTURE_CUBE_MAP, _.depthTexture));
        const B = r.convert(_.depthTexture.format),
          q = r.convert(_.depthTexture.type);
        let K;
        _.depthTexture.format === Mn
          ? (K = i.DEPTH_COMPONENT24)
          : _.depthTexture.format === Jn && (K = i.DEPTH24_STENCIL8);
        for (let j = 0; j < 6; j++)
          i.texImage2D(
            i.TEXTURE_CUBE_MAP_POSITIVE_X + j,
            0,
            K,
            _.width,
            _.height,
            0,
            B,
            q,
            null,
          );
      }
    } else N(_.depthTexture, 0);
    const Z = Q.__webglTexture,
      be = A(_),
      pe = Y ? i.TEXTURE_CUBE_MAP_POSITIVE_X + I : i.TEXTURE_2D,
      De =
        _.depthTexture.format === Jn
          ? i.DEPTH_STENCIL_ATTACHMENT
          : i.DEPTH_ATTACHMENT;
    if (_.depthTexture.format === Mn)
      Fe(_)
        ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, De, pe, Z, 0, be)
        : i.framebufferTexture2D(i.FRAMEBUFFER, De, pe, Z, 0);
    else if (_.depthTexture.format === Jn)
      Fe(_)
        ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, De, pe, Z, 0, be)
        : i.framebufferTexture2D(i.FRAMEBUFFER, De, pe, Z, 0);
    else throw new Error("Unknown depthTexture format");
  }
  function Ne(T) {
    const _ = n.get(T),
      I = T.isWebGLCubeRenderTarget === !0;
    if (_.__boundDepthTexture !== T.depthTexture) {
      const Y = T.depthTexture;
      if ((_.__depthDisposeCallback && _.__depthDisposeCallback(), Y)) {
        const Q = () => {
          (delete _.__boundDepthTexture,
            delete _.__depthDisposeCallback,
            Y.removeEventListener("dispose", Q));
        };
        (Y.addEventListener("dispose", Q), (_.__depthDisposeCallback = Q));
      }
      _.__boundDepthTexture = Y;
    }
    if (T.depthTexture && !_.__autoAllocateDepthBuffer)
      if (I) for (let Y = 0; Y < 6; Y++) we(_.__webglFramebuffer[Y], T, Y);
      else {
        const Y = T.texture.mipmaps;
        Y && Y.length > 0
          ? we(_.__webglFramebuffer[0], T, 0)
          : we(_.__webglFramebuffer, T, 0);
      }
    else if (I) {
      _.__webglDepthbuffer = [];
      for (let Y = 0; Y < 6; Y++)
        if (
          (t.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer[Y]),
          _.__webglDepthbuffer[Y] === void 0)
        )
          ((_.__webglDepthbuffer[Y] = i.createRenderbuffer()),
            Be(_.__webglDepthbuffer[Y], T, !1));
        else {
          const Q = T.stencilBuffer
              ? i.DEPTH_STENCIL_ATTACHMENT
              : i.DEPTH_ATTACHMENT,
            Z = _.__webglDepthbuffer[Y];
          (i.bindRenderbuffer(i.RENDERBUFFER, Z),
            i.framebufferRenderbuffer(i.FRAMEBUFFER, Q, i.RENDERBUFFER, Z));
        }
    } else {
      const Y = T.texture.mipmaps;
      if (
        (Y && Y.length > 0
          ? t.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer[0])
          : t.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer),
        _.__webglDepthbuffer === void 0)
      )
        ((_.__webglDepthbuffer = i.createRenderbuffer()),
          Be(_.__webglDepthbuffer, T, !1));
      else {
        const Q = T.stencilBuffer
            ? i.DEPTH_STENCIL_ATTACHMENT
            : i.DEPTH_ATTACHMENT,
          Z = _.__webglDepthbuffer;
        (i.bindRenderbuffer(i.RENDERBUFFER, Z),
          i.framebufferRenderbuffer(i.FRAMEBUFFER, Q, i.RENDERBUFFER, Z));
      }
    }
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Je(T, _, I) {
    const Y = n.get(T);
    (_ !== void 0 &&
      fe(
        Y.__webglFramebuffer,
        T,
        T.texture,
        i.COLOR_ATTACHMENT0,
        i.TEXTURE_2D,
        0,
      ),
      I !== void 0 && Ne(T));
  }
  function Ge(T) {
    const _ = T.texture,
      I = n.get(T),
      Y = n.get(_);
    T.addEventListener("dispose", P);
    const Q = T.textures,
      Z = T.isWebGLCubeRenderTarget === !0,
      be = Q.length > 1;
    if (
      (be ||
        (Y.__webglTexture === void 0 && (Y.__webglTexture = i.createTexture()),
        (Y.__version = _.version),
        a.memory.textures++),
      Z)
    ) {
      I.__webglFramebuffer = [];
      for (let pe = 0; pe < 6; pe++)
        if (_.mipmaps && _.mipmaps.length > 0) {
          I.__webglFramebuffer[pe] = [];
          for (let De = 0; De < _.mipmaps.length; De++)
            I.__webglFramebuffer[pe][De] = i.createFramebuffer();
        } else I.__webglFramebuffer[pe] = i.createFramebuffer();
    } else {
      if (_.mipmaps && _.mipmaps.length > 0) {
        I.__webglFramebuffer = [];
        for (let pe = 0; pe < _.mipmaps.length; pe++)
          I.__webglFramebuffer[pe] = i.createFramebuffer();
      } else I.__webglFramebuffer = i.createFramebuffer();
      if (be)
        for (let pe = 0, De = Q.length; pe < De; pe++) {
          const B = n.get(Q[pe]);
          B.__webglTexture === void 0 &&
            ((B.__webglTexture = i.createTexture()), a.memory.textures++);
        }
      if (T.samples > 0 && Fe(T) === !1) {
        ((I.__webglMultisampledFramebuffer = i.createFramebuffer()),
          (I.__webglColorRenderbuffer = []),
          t.bindFramebuffer(i.FRAMEBUFFER, I.__webglMultisampledFramebuffer));
        for (let pe = 0; pe < Q.length; pe++) {
          const De = Q[pe];
          ((I.__webglColorRenderbuffer[pe] = i.createRenderbuffer()),
            i.bindRenderbuffer(i.RENDERBUFFER, I.__webglColorRenderbuffer[pe]));
          const B = r.convert(De.format, De.colorSpace),
            q = r.convert(De.type),
            K = E(
              De.internalFormat,
              B,
              q,
              De.colorSpace,
              T.isXRRenderTarget === !0,
            ),
            j = A(T);
          (i.renderbufferStorageMultisample(
            i.RENDERBUFFER,
            j,
            K,
            T.width,
            T.height,
          ),
            i.framebufferRenderbuffer(
              i.FRAMEBUFFER,
              i.COLOR_ATTACHMENT0 + pe,
              i.RENDERBUFFER,
              I.__webglColorRenderbuffer[pe],
            ));
        }
        (i.bindRenderbuffer(i.RENDERBUFFER, null),
          T.depthBuffer &&
            ((I.__webglDepthRenderbuffer = i.createRenderbuffer()),
            Be(I.__webglDepthRenderbuffer, T, !0)),
          t.bindFramebuffer(i.FRAMEBUFFER, null));
      }
    }
    if (Z) {
      (t.bindTexture(i.TEXTURE_CUBE_MAP, Y.__webglTexture),
        _e(i.TEXTURE_CUBE_MAP, _));
      for (let pe = 0; pe < 6; pe++)
        if (_.mipmaps && _.mipmaps.length > 0)
          for (let De = 0; De < _.mipmaps.length; De++)
            fe(
              I.__webglFramebuffer[pe][De],
              T,
              _,
              i.COLOR_ATTACHMENT0,
              i.TEXTURE_CUBE_MAP_POSITIVE_X + pe,
              De,
            );
        else
          fe(
            I.__webglFramebuffer[pe],
            T,
            _,
            i.COLOR_ATTACHMENT0,
            i.TEXTURE_CUBE_MAP_POSITIVE_X + pe,
            0,
          );
      (m(_) && p(i.TEXTURE_CUBE_MAP), t.unbindTexture());
    } else if (be) {
      for (let pe = 0, De = Q.length; pe < De; pe++) {
        const B = Q[pe],
          q = n.get(B);
        let K = i.TEXTURE_2D;
        ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) &&
          (K = T.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY),
          t.bindTexture(K, q.__webglTexture),
          _e(K, B),
          fe(I.__webglFramebuffer, T, B, i.COLOR_ATTACHMENT0 + pe, K, 0),
          m(B) && p(K));
      }
      t.unbindTexture();
    } else {
      let pe = i.TEXTURE_2D;
      if (
        ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) &&
          (pe = T.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY),
        t.bindTexture(pe, Y.__webglTexture),
        _e(pe, _),
        _.mipmaps && _.mipmaps.length > 0)
      )
        for (let De = 0; De < _.mipmaps.length; De++)
          fe(I.__webglFramebuffer[De], T, _, i.COLOR_ATTACHMENT0, pe, De);
      else fe(I.__webglFramebuffer, T, _, i.COLOR_ATTACHMENT0, pe, 0);
      (m(_) && p(pe), t.unbindTexture());
    }
    T.depthBuffer && Ne(T);
  }
  function ee(T) {
    const _ = T.textures;
    for (let I = 0, Y = _.length; I < Y; I++) {
      const Q = _[I];
      if (m(Q)) {
        const Z = S(T),
          be = n.get(Q).__webglTexture;
        (t.bindTexture(Z, be), p(Z), t.unbindTexture());
      }
    }
  }
  const ae = [],
    te = [];
  function me(T) {
    if (T.samples > 0) {
      if (Fe(T) === !1) {
        const _ = T.textures,
          I = T.width,
          Y = T.height;
        let Q = i.COLOR_BUFFER_BIT;
        const Z = T.stencilBuffer
            ? i.DEPTH_STENCIL_ATTACHMENT
            : i.DEPTH_ATTACHMENT,
          be = n.get(T),
          pe = _.length > 1;
        if (pe)
          for (let B = 0; B < _.length; B++)
            (t.bindFramebuffer(
              i.FRAMEBUFFER,
              be.__webglMultisampledFramebuffer,
            ),
              i.framebufferRenderbuffer(
                i.FRAMEBUFFER,
                i.COLOR_ATTACHMENT0 + B,
                i.RENDERBUFFER,
                null,
              ),
              t.bindFramebuffer(i.FRAMEBUFFER, be.__webglFramebuffer),
              i.framebufferTexture2D(
                i.DRAW_FRAMEBUFFER,
                i.COLOR_ATTACHMENT0 + B,
                i.TEXTURE_2D,
                null,
                0,
              ));
        t.bindFramebuffer(
          i.READ_FRAMEBUFFER,
          be.__webglMultisampledFramebuffer,
        );
        const De = T.texture.mipmaps;
        De && De.length > 0
          ? t.bindFramebuffer(i.DRAW_FRAMEBUFFER, be.__webglFramebuffer[0])
          : t.bindFramebuffer(i.DRAW_FRAMEBUFFER, be.__webglFramebuffer);
        for (let B = 0; B < _.length; B++) {
          if (
            (T.resolveDepthBuffer &&
              (T.depthBuffer && (Q |= i.DEPTH_BUFFER_BIT),
              T.stencilBuffer &&
                T.resolveStencilBuffer &&
                (Q |= i.STENCIL_BUFFER_BIT)),
            pe)
          ) {
            i.framebufferRenderbuffer(
              i.READ_FRAMEBUFFER,
              i.COLOR_ATTACHMENT0,
              i.RENDERBUFFER,
              be.__webglColorRenderbuffer[B],
            );
            const q = n.get(_[B]).__webglTexture;
            i.framebufferTexture2D(
              i.DRAW_FRAMEBUFFER,
              i.COLOR_ATTACHMENT0,
              i.TEXTURE_2D,
              q,
              0,
            );
          }
          (i.blitFramebuffer(0, 0, I, Y, 0, 0, I, Y, Q, i.NEAREST),
            c === !0 &&
              ((ae.length = 0),
              (te.length = 0),
              ae.push(i.COLOR_ATTACHMENT0 + B),
              T.depthBuffer &&
                T.resolveDepthBuffer === !1 &&
                (ae.push(Z),
                te.push(Z),
                i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, te)),
              i.invalidateFramebuffer(i.READ_FRAMEBUFFER, ae)));
        }
        if (
          (t.bindFramebuffer(i.READ_FRAMEBUFFER, null),
          t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null),
          pe)
        )
          for (let B = 0; B < _.length; B++) {
            (t.bindFramebuffer(
              i.FRAMEBUFFER,
              be.__webglMultisampledFramebuffer,
            ),
              i.framebufferRenderbuffer(
                i.FRAMEBUFFER,
                i.COLOR_ATTACHMENT0 + B,
                i.RENDERBUFFER,
                be.__webglColorRenderbuffer[B],
              ));
            const q = n.get(_[B]).__webglTexture;
            (t.bindFramebuffer(i.FRAMEBUFFER, be.__webglFramebuffer),
              i.framebufferTexture2D(
                i.DRAW_FRAMEBUFFER,
                i.COLOR_ATTACHMENT0 + B,
                i.TEXTURE_2D,
                q,
                0,
              ));
          }
        t.bindFramebuffer(
          i.DRAW_FRAMEBUFFER,
          be.__webglMultisampledFramebuffer,
        );
      } else if (T.depthBuffer && T.resolveDepthBuffer === !1 && c) {
        const _ = T.stencilBuffer
          ? i.DEPTH_STENCIL_ATTACHMENT
          : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [_]);
      }
    }
  }
  function A(T) {
    return Math.min(s.maxSamples, T.samples);
  }
  function Fe(T) {
    const _ = n.get(T);
    return (
      T.samples > 0 &&
      e.has("WEBGL_multisampled_render_to_texture") === !0 &&
      _.__useRenderToTexture !== !1
    );
  }
  function Me(T) {
    const _ = a.render.frame;
    u.get(T) !== _ && (u.set(T, _), T.update());
  }
  function ze(T, _) {
    const I = T.colorSpace,
      Y = T.format,
      Q = T.type;
    return (
      T.isCompressedTexture === !0 ||
        T.isVideoTexture === !0 ||
        (I !== wi &&
          I !== Pn &&
          (et.getTransfer(I) === it
            ? (Y !== Kt || Q !== Gt) &&
              Ve(
                "WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.",
              )
            : Qe("WebGLTextures: Unsupported texture color space:", I))),
      _
    );
  }
  function de(T) {
    return (
      typeof HTMLImageElement < "u" && T instanceof HTMLImageElement
        ? ((l.width = T.naturalWidth || T.width),
          (l.height = T.naturalHeight || T.height))
        : typeof VideoFrame < "u" && T instanceof VideoFrame
          ? ((l.width = T.displayWidth), (l.height = T.displayHeight))
          : ((l.width = T.width), (l.height = T.height)),
      l
    );
  }
  ((this.allocateTextureUnit = G),
    (this.resetTextureUnits = V),
    (this.setTexture2D = N),
    (this.setTexture2DArray = O),
    (this.setTexture3D = F),
    (this.setTextureCube = ce),
    (this.rebindTextures = Je),
    (this.setupRenderTarget = Ge),
    (this.updateRenderTargetMipmap = ee),
    (this.updateMultisampleRenderTarget = me),
    (this.setupDepthRenderbuffer = Ne),
    (this.setupFrameBufferTexture = fe),
    (this.useMultisampledRTT = Fe),
    (this.isReversedDepthBuffer = function () {
      return t.buffers.depth.getReversed();
    }));
}
function Zg(i, e) {
  function t(n, s = Pn) {
    let r;
    const a = et.getTransfer(s);
    if (n === Gt) return i.UNSIGNED_BYTE;
    if (n === fo) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === po) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === fc) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === dc) return i.UNSIGNED_INT_10F_11F_11F_REV;
    if (n === uc) return i.BYTE;
    if (n === hc) return i.SHORT;
    if (n === ss) return i.UNSIGNED_SHORT;
    if (n === ho) return i.INT;
    if (n === on) return i.UNSIGNED_INT;
    if (n === $t) return i.FLOAT;
    if (n === Ot) return i.HALF_FLOAT;
    if (n === pc) return i.ALPHA;
    if (n === mc) return i.RGB;
    if (n === Kt) return i.RGBA;
    if (n === Mn) return i.DEPTH_COMPONENT;
    if (n === Jn) return i.DEPTH_STENCIL;
    if (n === mo) return i.RED;
    if (n === go) return i.RED_INTEGER;
    if (n === Ai) return i.RG;
    if (n === _o) return i.RG_INTEGER;
    if (n === vo) return i.RGBA_INTEGER;
    if (n === Qs || n === er || n === tr || n === nr)
      if (a === it)
        if (((r = e.get("WEBGL_compressed_texture_s3tc_srgb")), r !== null)) {
          if (n === Qs) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === er) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === tr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === nr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else return null;
      else if (((r = e.get("WEBGL_compressed_texture_s3tc")), r !== null)) {
        if (n === Qs) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === er) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === tr) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === nr) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else return null;
    if (n === xa || n === Ma || n === Sa || n === ya)
      if (((r = e.get("WEBGL_compressed_texture_pvrtc")), r !== null)) {
        if (n === xa) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === Ma) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === Sa) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === ya) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    if (
      n === Ea ||
      n === ba ||
      n === Ta ||
      n === Aa ||
      n === wa ||
      n === Ca ||
      n === Ra
    )
      if (((r = e.get("WEBGL_compressed_texture_etc")), r !== null)) {
        if (n === Ea || n === ba)
          return a === it ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (n === Ta)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC
            : r.COMPRESSED_RGBA8_ETC2_EAC;
        if (n === Aa) return r.COMPRESSED_R11_EAC;
        if (n === wa) return r.COMPRESSED_SIGNED_R11_EAC;
        if (n === Ca) return r.COMPRESSED_RG11_EAC;
        if (n === Ra) return r.COMPRESSED_SIGNED_RG11_EAC;
      } else return null;
    if (
      n === Pa ||
      n === La ||
      n === Da ||
      n === Ia ||
      n === Ua ||
      n === Na ||
      n === Fa ||
      n === Oa ||
      n === Ba ||
      n === za ||
      n === Va ||
      n === Ga ||
      n === Ha ||
      n === ka
    )
      if (((r = e.get("WEBGL_compressed_texture_astc")), r !== null)) {
        if (n === Pa)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR
            : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === La)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR
            : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === Da)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR
            : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === Ia)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR
            : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === Ua)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR
            : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === Na)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR
            : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === Fa)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR
            : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === Oa)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR
            : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === Ba)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR
            : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === za)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR
            : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === Va)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR
            : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === Ga)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR
            : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === Ha)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR
            : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === ka)
          return a === it
            ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
            : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    if (n === Wa || n === Xa || n === qa)
      if (((r = e.get("EXT_texture_compression_bptc")), r !== null)) {
        if (n === Wa)
          return a === it
            ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT
            : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === Xa) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === qa) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    if (n === Ya || n === Ja || n === Za || n === $a)
      if (((r = e.get("EXT_texture_compression_rgtc")), r !== null)) {
        if (n === Ya) return r.COMPRESSED_RED_RGTC1_EXT;
        if (n === Ja) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === Za) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === $a) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    return n === rs ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: t };
}
const $g = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`,
  Kg = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class jg {
  constructor() {
    ((this.texture = null),
      (this.mesh = null),
      (this.depthNear = 0),
      (this.depthFar = 0));
  }
  init(e, t) {
    if (this.texture === null) {
      const n = new bc(e.texture);
      ((e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) &&
        ((this.depthNear = e.depthNear), (this.depthFar = e.depthFar)),
        (this.texture = n));
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport,
        n = new Rt({
          vertexShader: $g,
          fragmentShader: Kg,
          uniforms: {
            depthColor: { value: this.texture },
            depthWidth: { value: t.z },
            depthHeight: { value: t.w },
          },
        });
      this.mesh = new je(new $n(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    ((this.texture = null), (this.mesh = null));
  }
  getDepthTexture() {
    return this.texture;
  }
}
class Qg extends Di {
  constructor(e, t) {
    super();
    const n = this;
    let s = null,
      r = 1,
      a = null,
      o = "local-floor",
      c = 1,
      l = null,
      u = null,
      f = null,
      h = null,
      d = null,
      g = null;
    const x = typeof XRWebGLBinding < "u",
      m = new jg(),
      p = {},
      S = t.getContextAttributes();
    let E = null,
      y = null;
    const R = [],
      w = [],
      P = new ue();
    let v = null;
    const b = new Wt();
    b.viewport = new dt();
    const W = new Wt();
    W.viewport = new dt();
    const C = [b, W],
      V = new lf();
    let G = null,
      H = null;
    ((this.cameraAutoUpdate = !0),
      (this.enabled = !1),
      (this.isPresenting = !1),
      (this.getController = function ($) {
        let he = R[$];
        return (
          he === void 0 && ((he = new Lr()), (R[$] = he)),
          he.getTargetRaySpace()
        );
      }),
      (this.getControllerGrip = function ($) {
        let he = R[$];
        return (
          he === void 0 && ((he = new Lr()), (R[$] = he)),
          he.getGripSpace()
        );
      }),
      (this.getHand = function ($) {
        let he = R[$];
        return (
          he === void 0 && ((he = new Lr()), (R[$] = he)),
          he.getHandSpace()
        );
      }));
    function N($) {
      const he = w.indexOf($.inputSource);
      if (he === -1) return;
      const fe = R[he];
      fe !== void 0 &&
        (fe.update($.inputSource, $.frame, l || a),
        fe.dispatchEvent({ type: $.type, data: $.inputSource }));
    }
    function O() {
      (s.removeEventListener("select", N),
        s.removeEventListener("selectstart", N),
        s.removeEventListener("selectend", N),
        s.removeEventListener("squeeze", N),
        s.removeEventListener("squeezestart", N),
        s.removeEventListener("squeezeend", N),
        s.removeEventListener("end", O),
        s.removeEventListener("inputsourceschange", F));
      for (let $ = 0; $ < R.length; $++) {
        const he = w[$];
        he !== null && ((w[$] = null), R[$].disconnect(he));
      }
      ((G = null), (H = null), m.reset());
      for (const $ in p) delete p[$];
      (e.setRenderTarget(E),
        (d = null),
        (h = null),
        (f = null),
        (s = null),
        (y = null),
        Ke.stop(),
        (n.isPresenting = !1),
        e.setPixelRatio(v),
        e.setSize(P.width, P.height, !1),
        n.dispatchEvent({ type: "sessionend" }));
    }
    ((this.setFramebufferScaleFactor = function ($) {
      ((r = $),
        n.isPresenting === !0 &&
          Ve(
            "WebXRManager: Cannot change framebuffer scale while presenting.",
          ));
    }),
      (this.setReferenceSpaceType = function ($) {
        ((o = $),
          n.isPresenting === !0 &&
            Ve(
              "WebXRManager: Cannot change reference space type while presenting.",
            ));
      }),
      (this.getReferenceSpace = function () {
        return l || a;
      }),
      (this.setReferenceSpace = function ($) {
        l = $;
      }),
      (this.getBaseLayer = function () {
        return h !== null ? h : d;
      }),
      (this.getBinding = function () {
        return (f === null && x && (f = new XRWebGLBinding(s, t)), f);
      }),
      (this.getFrame = function () {
        return g;
      }),
      (this.getSession = function () {
        return s;
      }),
      (this.setSession = async function ($) {
        if (((s = $), s !== null)) {
          if (
            ((E = e.getRenderTarget()),
            s.addEventListener("select", N),
            s.addEventListener("selectstart", N),
            s.addEventListener("selectend", N),
            s.addEventListener("squeeze", N),
            s.addEventListener("squeezestart", N),
            s.addEventListener("squeezeend", N),
            s.addEventListener("end", O),
            s.addEventListener("inputsourceschange", F),
            S.xrCompatible !== !0 && (await t.makeXRCompatible()),
            (v = e.getPixelRatio()),
            e.getSize(P),
            x && "createProjectionLayer" in XRWebGLBinding.prototype)
          ) {
            let fe = null,
              Be = null,
              we = null;
            S.depth &&
              ((we = S.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24),
              (fe = S.stencil ? Jn : Mn),
              (Be = S.stencil ? rs : on));
            const Ne = {
              colorFormat: t.RGBA8,
              depthFormat: we,
              scaleFactor: r,
            };
            ((f = this.getBinding()),
              (h = f.createProjectionLayer(Ne)),
              s.updateRenderState({ layers: [h] }),
              e.setPixelRatio(1),
              e.setSize(h.textureWidth, h.textureHeight, !1),
              (y = new It(h.textureWidth, h.textureHeight, {
                format: Kt,
                type: Gt,
                depthTexture: new ls(
                  h.textureWidth,
                  h.textureHeight,
                  Be,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  fe,
                ),
                stencilBuffer: S.stencil,
                colorSpace: e.outputColorSpace,
                samples: S.antialias ? 4 : 0,
                resolveDepthBuffer: h.ignoreDepthValues === !1,
                resolveStencilBuffer: h.ignoreDepthValues === !1,
              })));
          } else {
            const fe = {
              antialias: S.antialias,
              alpha: !0,
              depth: S.depth,
              stencil: S.stencil,
              framebufferScaleFactor: r,
            };
            ((d = new XRWebGLLayer(s, t, fe)),
              s.updateRenderState({ baseLayer: d }),
              e.setPixelRatio(1),
              e.setSize(d.framebufferWidth, d.framebufferHeight, !1),
              (y = new It(d.framebufferWidth, d.framebufferHeight, {
                format: Kt,
                type: Gt,
                colorSpace: e.outputColorSpace,
                stencilBuffer: S.stencil,
                resolveDepthBuffer: d.ignoreDepthValues === !1,
                resolveStencilBuffer: d.ignoreDepthValues === !1,
              })));
          }
          ((y.isXRRenderTarget = !0),
            this.setFoveation(c),
            (l = null),
            (a = await s.requestReferenceSpace(o)),
            Ke.setContext(s),
            Ke.start(),
            (n.isPresenting = !0),
            n.dispatchEvent({ type: "sessionstart" }));
        }
      }),
      (this.getEnvironmentBlendMode = function () {
        if (s !== null) return s.environmentBlendMode;
      }),
      (this.getDepthTexture = function () {
        return m.getDepthTexture();
      }));
    function F($) {
      for (let he = 0; he < $.removed.length; he++) {
        const fe = $.removed[he],
          Be = w.indexOf(fe);
        Be >= 0 && ((w[Be] = null), R[Be].disconnect(fe));
      }
      for (let he = 0; he < $.added.length; he++) {
        const fe = $.added[he];
        let Be = w.indexOf(fe);
        if (Be === -1) {
          for (let Ne = 0; Ne < R.length; Ne++)
            if (Ne >= w.length) {
              (w.push(fe), (Be = Ne));
              break;
            } else if (w[Ne] === null) {
              ((w[Ne] = fe), (Be = Ne));
              break;
            }
          if (Be === -1) break;
        }
        const we = R[Be];
        we && we.connect(fe);
      }
    }
    const ce = new D(),
      ie = new D();
    function ge($, he, fe) {
      (ce.setFromMatrixPosition(he.matrixWorld),
        ie.setFromMatrixPosition(fe.matrixWorld));
      const Be = ce.distanceTo(ie),
        we = he.projectionMatrix.elements,
        Ne = fe.projectionMatrix.elements,
        Je = we[14] / (we[10] - 1),
        Ge = we[14] / (we[10] + 1),
        ee = (we[9] + 1) / we[5],
        ae = (we[9] - 1) / we[5],
        te = (we[8] - 1) / we[0],
        me = (Ne[8] + 1) / Ne[0],
        A = Je * te,
        Fe = Je * me,
        Me = Be / (-te + me),
        ze = Me * -te;
      if (
        (he.matrixWorld.decompose($.position, $.quaternion, $.scale),
        $.translateX(ze),
        $.translateZ(Me),
        $.matrixWorld.compose($.position, $.quaternion, $.scale),
        $.matrixWorldInverse.copy($.matrixWorld).invert(),
        we[10] === -1)
      )
        ($.projectionMatrix.copy(he.projectionMatrix),
          $.projectionMatrixInverse.copy(he.projectionMatrixInverse));
      else {
        const de = Je + Me,
          T = Ge + Me,
          _ = A - ze,
          I = Fe + (Be - ze),
          Y = ((ee * Ge) / T) * de,
          Q = ((ae * Ge) / T) * de;
        ($.projectionMatrix.makePerspective(_, I, Y, Q, de, T),
          $.projectionMatrixInverse.copy($.projectionMatrix).invert());
      }
    }
    function xe($, he) {
      (he === null
        ? $.matrixWorld.copy($.matrix)
        : $.matrixWorld.multiplyMatrices(he.matrixWorld, $.matrix),
        $.matrixWorldInverse.copy($.matrixWorld).invert());
    }
    this.updateCamera = function ($) {
      if (s === null) return;
      let he = $.near,
        fe = $.far;
      (m.texture !== null &&
        (m.depthNear > 0 && (he = m.depthNear),
        m.depthFar > 0 && (fe = m.depthFar)),
        (V.near = W.near = b.near = he),
        (V.far = W.far = b.far = fe),
        (G !== V.near || H !== V.far) &&
          (s.updateRenderState({ depthNear: V.near, depthFar: V.far }),
          (G = V.near),
          (H = V.far)),
        (V.layers.mask = $.layers.mask | 6),
        (b.layers.mask = V.layers.mask & -5),
        (W.layers.mask = V.layers.mask & -3));
      const Be = $.parent,
        we = V.cameras;
      xe(V, Be);
      for (let Ne = 0; Ne < we.length; Ne++) xe(we[Ne], Be);
      (we.length === 2
        ? ge(V, b, W)
        : V.projectionMatrix.copy(b.projectionMatrix),
        _e($, V, Be));
    };
    function _e($, he, fe) {
      (fe === null
        ? $.matrix.copy(he.matrixWorld)
        : ($.matrix.copy(fe.matrixWorld),
          $.matrix.invert(),
          $.matrix.multiply(he.matrixWorld)),
        $.matrix.decompose($.position, $.quaternion, $.scale),
        $.updateMatrixWorld(!0),
        $.projectionMatrix.copy(he.projectionMatrix),
        $.projectionMatrixInverse.copy(he.projectionMatrixInverse),
        $.isPerspectiveCamera &&
          (($.fov = os * 2 * Math.atan(1 / $.projectionMatrix.elements[5])),
          ($.zoom = 1)));
    }
    ((this.getCamera = function () {
      return V;
    }),
      (this.getFoveation = function () {
        if (!(h === null && d === null)) return c;
      }),
      (this.setFoveation = function ($) {
        ((c = $),
          h !== null && (h.fixedFoveation = $),
          d !== null && d.fixedFoveation !== void 0 && (d.fixedFoveation = $));
      }),
      (this.hasDepthSensing = function () {
        return m.texture !== null;
      }),
      (this.getDepthSensingMesh = function () {
        return m.getMesh(V);
      }),
      (this.getCameraTexture = function ($) {
        return p[$];
      }));
    let Ue = null;
    function Ze($, he) {
      if (((u = he.getViewerPose(l || a)), (g = he), u !== null)) {
        const fe = u.views;
        d !== null &&
          (e.setRenderTargetFramebuffer(y, d.framebuffer),
          e.setRenderTarget(y));
        let Be = !1;
        fe.length !== V.cameras.length && ((V.cameras.length = 0), (Be = !0));
        for (let Ge = 0; Ge < fe.length; Ge++) {
          const ee = fe[Ge];
          let ae = null;
          if (d !== null) ae = d.getViewport(ee);
          else {
            const me = f.getViewSubImage(h, ee);
            ((ae = me.viewport),
              Ge === 0 &&
                (e.setRenderTargetTextures(
                  y,
                  me.colorTexture,
                  me.depthStencilTexture,
                ),
                e.setRenderTarget(y)));
          }
          let te = C[Ge];
          (te === void 0 &&
            ((te = new Wt()),
            te.layers.enable(Ge),
            (te.viewport = new dt()),
            (C[Ge] = te)),
            te.matrix.fromArray(ee.transform.matrix),
            te.matrix.decompose(te.position, te.quaternion, te.scale),
            te.projectionMatrix.fromArray(ee.projectionMatrix),
            te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),
            te.viewport.set(ae.x, ae.y, ae.width, ae.height),
            Ge === 0 &&
              (V.matrix.copy(te.matrix),
              V.matrix.decompose(V.position, V.quaternion, V.scale)),
            Be === !0 && V.cameras.push(te));
        }
        const we = s.enabledFeatures;
        if (
          we &&
          we.includes("depth-sensing") &&
          s.depthUsage == "gpu-optimized" &&
          x
        ) {
          f = n.getBinding();
          const Ge = f.getDepthInformation(fe[0]);
          Ge && Ge.isValid && Ge.texture && m.init(Ge, s.renderState);
        }
        if (we && we.includes("camera-access") && x) {
          (e.state.unbindTexture(), (f = n.getBinding()));
          for (let Ge = 0; Ge < fe.length; Ge++) {
            const ee = fe[Ge].camera;
            if (ee) {
              let ae = p[ee];
              ae || ((ae = new bc()), (p[ee] = ae));
              const te = f.getCameraImage(ee);
              ae.sourceTexture = te;
            }
          }
        }
      }
      for (let fe = 0; fe < R.length; fe++) {
        const Be = w[fe],
          we = R[fe];
        Be !== null && we !== void 0 && we.update(Be, he, l || a);
      }
      (Ue && Ue($, he),
        he.detectedPlanes &&
          n.dispatchEvent({ type: "planesdetected", data: he }),
        (g = null));
    }
    const Ke = new Oc();
    (Ke.setAnimationLoop(Ze),
      (this.setAnimationLoop = function ($) {
        Ue = $;
      }),
      (this.dispose = function () {}));
  }
}
const Hn = new ln(),
  e0 = new ot();
function t0(i, e) {
  function t(m, p) {
    (m.matrixAutoUpdate === !0 && m.updateMatrix(), p.value.copy(m.matrix));
  }
  function n(m, p) {
    (p.color.getRGB(m.fogColor.value, Uc(i)),
      p.isFog
        ? ((m.fogNear.value = p.near), (m.fogFar.value = p.far))
        : p.isFogExp2 && (m.fogDensity.value = p.density));
  }
  function s(m, p, S, E, y) {
    p.isMeshBasicMaterial
      ? r(m, p)
      : p.isMeshLambertMaterial
        ? (r(m, p), p.envMap && (m.envMapIntensity.value = p.envMapIntensity))
        : p.isMeshToonMaterial
          ? (r(m, p), f(m, p))
          : p.isMeshPhongMaterial
            ? (r(m, p),
              u(m, p),
              p.envMap && (m.envMapIntensity.value = p.envMapIntensity))
            : p.isMeshStandardMaterial
              ? (r(m, p), h(m, p), p.isMeshPhysicalMaterial && d(m, p, y))
              : p.isMeshMatcapMaterial
                ? (r(m, p), g(m, p))
                : p.isMeshDepthMaterial
                  ? r(m, p)
                  : p.isMeshDistanceMaterial
                    ? (r(m, p), x(m, p))
                    : p.isMeshNormalMaterial
                      ? r(m, p)
                      : p.isLineBasicMaterial
                        ? (a(m, p), p.isLineDashedMaterial && o(m, p))
                        : p.isPointsMaterial
                          ? c(m, p, S, E)
                          : p.isSpriteMaterial
                            ? l(m, p)
                            : p.isShadowMaterial
                              ? (m.color.value.copy(p.color),
                                (m.opacity.value = p.opacity))
                              : p.isShaderMaterial &&
                                (p.uniformsNeedUpdate = !1);
  }
  function r(m, p) {
    ((m.opacity.value = p.opacity),
      p.color && m.diffuse.value.copy(p.color),
      p.emissive &&
        m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),
      p.map && ((m.map.value = p.map), t(p.map, m.mapTransform)),
      p.alphaMap &&
        ((m.alphaMap.value = p.alphaMap), t(p.alphaMap, m.alphaMapTransform)),
      p.bumpMap &&
        ((m.bumpMap.value = p.bumpMap),
        t(p.bumpMap, m.bumpMapTransform),
        (m.bumpScale.value = p.bumpScale),
        p.side === Ft && (m.bumpScale.value *= -1)),
      p.normalMap &&
        ((m.normalMap.value = p.normalMap),
        t(p.normalMap, m.normalMapTransform),
        m.normalScale.value.copy(p.normalScale),
        p.side === Ft && m.normalScale.value.negate()),
      p.displacementMap &&
        ((m.displacementMap.value = p.displacementMap),
        t(p.displacementMap, m.displacementMapTransform),
        (m.displacementScale.value = p.displacementScale),
        (m.displacementBias.value = p.displacementBias)),
      p.emissiveMap &&
        ((m.emissiveMap.value = p.emissiveMap),
        t(p.emissiveMap, m.emissiveMapTransform)),
      p.specularMap &&
        ((m.specularMap.value = p.specularMap),
        t(p.specularMap, m.specularMapTransform)),
      p.alphaTest > 0 && (m.alphaTest.value = p.alphaTest));
    const S = e.get(p),
      E = S.envMap,
      y = S.envMapRotation;
    (E &&
      ((m.envMap.value = E),
      Hn.copy(y),
      (Hn.x *= -1),
      (Hn.y *= -1),
      (Hn.z *= -1),
      E.isCubeTexture &&
        E.isRenderTargetTexture === !1 &&
        ((Hn.y *= -1), (Hn.z *= -1)),
      m.envMapRotation.value.setFromMatrix4(e0.makeRotationFromEuler(Hn)),
      (m.flipEnvMap.value =
        E.isCubeTexture && E.isRenderTargetTexture === !1 ? -1 : 1),
      (m.reflectivity.value = p.reflectivity),
      (m.ior.value = p.ior),
      (m.refractionRatio.value = p.refractionRatio)),
      p.lightMap &&
        ((m.lightMap.value = p.lightMap),
        (m.lightMapIntensity.value = p.lightMapIntensity),
        t(p.lightMap, m.lightMapTransform)),
      p.aoMap &&
        ((m.aoMap.value = p.aoMap),
        (m.aoMapIntensity.value = p.aoMapIntensity),
        t(p.aoMap, m.aoMapTransform)));
  }
  function a(m, p) {
    (m.diffuse.value.copy(p.color),
      (m.opacity.value = p.opacity),
      p.map && ((m.map.value = p.map), t(p.map, m.mapTransform)));
  }
  function o(m, p) {
    ((m.dashSize.value = p.dashSize),
      (m.totalSize.value = p.dashSize + p.gapSize),
      (m.scale.value = p.scale));
  }
  function c(m, p, S, E) {
    (m.diffuse.value.copy(p.color),
      (m.opacity.value = p.opacity),
      (m.size.value = p.size * S),
      (m.scale.value = E * 0.5),
      p.map && ((m.map.value = p.map), t(p.map, m.uvTransform)),
      p.alphaMap &&
        ((m.alphaMap.value = p.alphaMap), t(p.alphaMap, m.alphaMapTransform)),
      p.alphaTest > 0 && (m.alphaTest.value = p.alphaTest));
  }
  function l(m, p) {
    (m.diffuse.value.copy(p.color),
      (m.opacity.value = p.opacity),
      (m.rotation.value = p.rotation),
      p.map && ((m.map.value = p.map), t(p.map, m.mapTransform)),
      p.alphaMap &&
        ((m.alphaMap.value = p.alphaMap), t(p.alphaMap, m.alphaMapTransform)),
      p.alphaTest > 0 && (m.alphaTest.value = p.alphaTest));
  }
  function u(m, p) {
    (m.specular.value.copy(p.specular),
      (m.shininess.value = Math.max(p.shininess, 1e-4)));
  }
  function f(m, p) {
    p.gradientMap && (m.gradientMap.value = p.gradientMap);
  }
  function h(m, p) {
    ((m.metalness.value = p.metalness),
      p.metalnessMap &&
        ((m.metalnessMap.value = p.metalnessMap),
        t(p.metalnessMap, m.metalnessMapTransform)),
      (m.roughness.value = p.roughness),
      p.roughnessMap &&
        ((m.roughnessMap.value = p.roughnessMap),
        t(p.roughnessMap, m.roughnessMapTransform)),
      p.envMap && (m.envMapIntensity.value = p.envMapIntensity));
  }
  function d(m, p, S) {
    ((m.ior.value = p.ior),
      p.sheen > 0 &&
        (m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),
        (m.sheenRoughness.value = p.sheenRoughness),
        p.sheenColorMap &&
          ((m.sheenColorMap.value = p.sheenColorMap),
          t(p.sheenColorMap, m.sheenColorMapTransform)),
        p.sheenRoughnessMap &&
          ((m.sheenRoughnessMap.value = p.sheenRoughnessMap),
          t(p.sheenRoughnessMap, m.sheenRoughnessMapTransform))),
      p.clearcoat > 0 &&
        ((m.clearcoat.value = p.clearcoat),
        (m.clearcoatRoughness.value = p.clearcoatRoughness),
        p.clearcoatMap &&
          ((m.clearcoatMap.value = p.clearcoatMap),
          t(p.clearcoatMap, m.clearcoatMapTransform)),
        p.clearcoatRoughnessMap &&
          ((m.clearcoatRoughnessMap.value = p.clearcoatRoughnessMap),
          t(p.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)),
        p.clearcoatNormalMap &&
          ((m.clearcoatNormalMap.value = p.clearcoatNormalMap),
          t(p.clearcoatNormalMap, m.clearcoatNormalMapTransform),
          m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),
          p.side === Ft && m.clearcoatNormalScale.value.negate())),
      p.dispersion > 0 && (m.dispersion.value = p.dispersion),
      p.iridescence > 0 &&
        ((m.iridescence.value = p.iridescence),
        (m.iridescenceIOR.value = p.iridescenceIOR),
        (m.iridescenceThicknessMinimum.value = p.iridescenceThicknessRange[0]),
        (m.iridescenceThicknessMaximum.value = p.iridescenceThicknessRange[1]),
        p.iridescenceMap &&
          ((m.iridescenceMap.value = p.iridescenceMap),
          t(p.iridescenceMap, m.iridescenceMapTransform)),
        p.iridescenceThicknessMap &&
          ((m.iridescenceThicknessMap.value = p.iridescenceThicknessMap),
          t(p.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))),
      p.transmission > 0 &&
        ((m.transmission.value = p.transmission),
        (m.transmissionSamplerMap.value = S.texture),
        m.transmissionSamplerSize.value.set(S.width, S.height),
        p.transmissionMap &&
          ((m.transmissionMap.value = p.transmissionMap),
          t(p.transmissionMap, m.transmissionMapTransform)),
        (m.thickness.value = p.thickness),
        p.thicknessMap &&
          ((m.thicknessMap.value = p.thicknessMap),
          t(p.thicknessMap, m.thicknessMapTransform)),
        (m.attenuationDistance.value = p.attenuationDistance),
        m.attenuationColor.value.copy(p.attenuationColor)),
      p.anisotropy > 0 &&
        (m.anisotropyVector.value.set(
          p.anisotropy * Math.cos(p.anisotropyRotation),
          p.anisotropy * Math.sin(p.anisotropyRotation),
        ),
        p.anisotropyMap &&
          ((m.anisotropyMap.value = p.anisotropyMap),
          t(p.anisotropyMap, m.anisotropyMapTransform))),
      (m.specularIntensity.value = p.specularIntensity),
      m.specularColor.value.copy(p.specularColor),
      p.specularColorMap &&
        ((m.specularColorMap.value = p.specularColorMap),
        t(p.specularColorMap, m.specularColorMapTransform)),
      p.specularIntensityMap &&
        ((m.specularIntensityMap.value = p.specularIntensityMap),
        t(p.specularIntensityMap, m.specularIntensityMapTransform)));
  }
  function g(m, p) {
    p.matcap && (m.matcap.value = p.matcap);
  }
  function x(m, p) {
    const S = e.get(p).light;
    (m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),
      (m.nearDistance.value = S.shadow.camera.near),
      (m.farDistance.value = S.shadow.camera.far));
  }
  return { refreshFogUniforms: n, refreshMaterialUniforms: s };
}
function n0(i, e, t, n) {
  let s = {},
    r = {},
    a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(S, E) {
    const y = E.program;
    n.uniformBlockBinding(S, y);
  }
  function l(S, E) {
    let y = s[S.id];
    y === void 0 &&
      (g(S), (y = u(S)), (s[S.id] = y), S.addEventListener("dispose", m));
    const R = E.program;
    n.updateUBOMapping(S, R);
    const w = e.render.frame;
    r[S.id] !== w && (h(S), (r[S.id] = w));
  }
  function u(S) {
    const E = f();
    S.__bindingPointIndex = E;
    const y = i.createBuffer(),
      R = S.__size,
      w = S.usage;
    return (
      i.bindBuffer(i.UNIFORM_BUFFER, y),
      i.bufferData(i.UNIFORM_BUFFER, R, w),
      i.bindBuffer(i.UNIFORM_BUFFER, null),
      i.bindBufferBase(i.UNIFORM_BUFFER, E, y),
      y
    );
  }
  function f() {
    for (let S = 0; S < o; S++) if (a.indexOf(S) === -1) return (a.push(S), S);
    return (
      Qe(
        "WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.",
      ),
      0
    );
  }
  function h(S) {
    const E = s[S.id],
      y = S.uniforms,
      R = S.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, E);
    for (let w = 0, P = y.length; w < P; w++) {
      const v = Array.isArray(y[w]) ? y[w] : [y[w]];
      for (let b = 0, W = v.length; b < W; b++) {
        const C = v[b];
        if (d(C, w, b, R) === !0) {
          const V = C.__offset,
            G = Array.isArray(C.value) ? C.value : [C.value];
          let H = 0;
          for (let N = 0; N < G.length; N++) {
            const O = G[N],
              F = x(O);
            typeof O == "number" || typeof O == "boolean"
              ? ((C.__data[0] = O),
                i.bufferSubData(i.UNIFORM_BUFFER, V + H, C.__data))
              : O.isMatrix3
                ? ((C.__data[0] = O.elements[0]),
                  (C.__data[1] = O.elements[1]),
                  (C.__data[2] = O.elements[2]),
                  (C.__data[3] = 0),
                  (C.__data[4] = O.elements[3]),
                  (C.__data[5] = O.elements[4]),
                  (C.__data[6] = O.elements[5]),
                  (C.__data[7] = 0),
                  (C.__data[8] = O.elements[6]),
                  (C.__data[9] = O.elements[7]),
                  (C.__data[10] = O.elements[8]),
                  (C.__data[11] = 0))
                : (O.toArray(C.__data, H),
                  (H += F.storage / Float32Array.BYTES_PER_ELEMENT));
          }
          i.bufferSubData(i.UNIFORM_BUFFER, V, C.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function d(S, E, y, R) {
    const w = S.value,
      P = E + "_" + y;
    if (R[P] === void 0)
      return (
        typeof w == "number" || typeof w == "boolean"
          ? (R[P] = w)
          : (R[P] = w.clone()),
        !0
      );
    {
      const v = R[P];
      if (typeof w == "number" || typeof w == "boolean") {
        if (v !== w) return ((R[P] = w), !0);
      } else if (v.equals(w) === !1) return (v.copy(w), !0);
    }
    return !1;
  }
  function g(S) {
    const E = S.uniforms;
    let y = 0;
    const R = 16;
    for (let P = 0, v = E.length; P < v; P++) {
      const b = Array.isArray(E[P]) ? E[P] : [E[P]];
      for (let W = 0, C = b.length; W < C; W++) {
        const V = b[W],
          G = Array.isArray(V.value) ? V.value : [V.value];
        for (let H = 0, N = G.length; H < N; H++) {
          const O = G[H],
            F = x(O),
            ce = y % R,
            ie = ce % F.boundary,
            ge = ce + ie;
          ((y += ie),
            ge !== 0 && R - ge < F.storage && (y += R - ge),
            (V.__data = new Float32Array(
              F.storage / Float32Array.BYTES_PER_ELEMENT,
            )),
            (V.__offset = y),
            (y += F.storage));
        }
      }
    }
    const w = y % R;
    return (w > 0 && (y += R - w), (S.__size = y), (S.__cache = {}), this);
  }
  function x(S) {
    const E = { boundary: 0, storage: 0 };
    return (
      typeof S == "number" || typeof S == "boolean"
        ? ((E.boundary = 4), (E.storage = 4))
        : S.isVector2
          ? ((E.boundary = 8), (E.storage = 8))
          : S.isVector3 || S.isColor
            ? ((E.boundary = 16), (E.storage = 12))
            : S.isVector4
              ? ((E.boundary = 16), (E.storage = 16))
              : S.isMatrix3
                ? ((E.boundary = 48), (E.storage = 48))
                : S.isMatrix4
                  ? ((E.boundary = 64), (E.storage = 64))
                  : S.isTexture
                    ? Ve(
                        "WebGLRenderer: Texture samplers can not be part of an uniforms group.",
                      )
                    : Ve("WebGLRenderer: Unsupported uniform value type.", S),
      E
    );
  }
  function m(S) {
    const E = S.target;
    E.removeEventListener("dispose", m);
    const y = a.indexOf(E.__bindingPointIndex);
    (a.splice(y, 1), i.deleteBuffer(s[E.id]), delete s[E.id], delete r[E.id]);
  }
  function p() {
    for (const S in s) i.deleteBuffer(s[S]);
    ((a = []), (s = {}), (r = {}));
  }
  return { bind: c, update: l, dispose: p };
}
const i0 = new Uint16Array([
  12469, 15057, 12620, 14925, 13266, 14620, 13807, 14376, 14323, 13990, 14545,
  13625, 14713, 13328, 14840, 12882, 14931, 12528, 14996, 12233, 15039, 11829,
  15066, 11525, 15080, 11295, 15085, 10976, 15082, 10705, 15073, 10495, 13880,
  14564, 13898, 14542, 13977, 14430, 14158, 14124, 14393, 13732, 14556, 13410,
  14702, 12996, 14814, 12596, 14891, 12291, 14937, 11834, 14957, 11489, 14958,
  11194, 14943, 10803, 14921, 10506, 14893, 10278, 14858, 9960, 14484, 14039,
  14487, 14025, 14499, 13941, 14524, 13740, 14574, 13468, 14654, 13106, 14743,
  12678, 14818, 12344, 14867, 11893, 14889, 11509, 14893, 11180, 14881, 10751,
  14852, 10428, 14812, 10128, 14765, 9754, 14712, 9466, 14764, 13480, 14764,
  13475, 14766, 13440, 14766, 13347, 14769, 13070, 14786, 12713, 14816, 12387,
  14844, 11957, 14860, 11549, 14868, 11215, 14855, 10751, 14825, 10403, 14782,
  10044, 14729, 9651, 14666, 9352, 14599, 9029, 14967, 12835, 14966, 12831,
  14963, 12804, 14954, 12723, 14936, 12564, 14917, 12347, 14900, 11958, 14886,
  11569, 14878, 11247, 14859, 10765, 14828, 10401, 14784, 10011, 14727, 9600,
  14660, 9289, 14586, 8893, 14508, 8533, 15111, 12234, 15110, 12234, 15104,
  12216, 15092, 12156, 15067, 12010, 15028, 11776, 14981, 11500, 14942, 11205,
  14902, 10752, 14861, 10393, 14812, 9991, 14752, 9570, 14682, 9252, 14603,
  8808, 14519, 8445, 14431, 8145, 15209, 11449, 15208, 11451, 15202, 11451,
  15190, 11438, 15163, 11384, 15117, 11274, 15055, 10979, 14994, 10648, 14932,
  10343, 14871, 9936, 14803, 9532, 14729, 9218, 14645, 8742, 14556, 8381, 14461,
  8020, 14365, 7603, 15273, 10603, 15272, 10607, 15267, 10619, 15256, 10631,
  15231, 10614, 15182, 10535, 15118, 10389, 15042, 10167, 14963, 9787, 14883,
  9447, 14800, 9115, 14710, 8665, 14615, 8318, 14514, 7911, 14411, 7507, 14279,
  7198, 15314, 9675, 15313, 9683, 15309, 9712, 15298, 9759, 15277, 9797, 15229,
  9773, 15166, 9668, 15084, 9487, 14995, 9274, 14898, 8910, 14800, 8539, 14697,
  8234, 14590, 7790, 14479, 7409, 14367, 7067, 14178, 6621, 15337, 8619, 15337,
  8631, 15333, 8677, 15325, 8769, 15305, 8871, 15264, 8940, 15202, 8909, 15119,
  8775, 15022, 8565, 14916, 8328, 14804, 8009, 14688, 7614, 14569, 7287, 14448,
  6888, 14321, 6483, 14088, 6171, 15350, 7402, 15350, 7419, 15347, 7480, 15340,
  7613, 15322, 7804, 15287, 7973, 15229, 8057, 15148, 8012, 15046, 7846, 14933,
  7611, 14810, 7357, 14682, 7069, 14552, 6656, 14421, 6316, 14251, 5948, 14007,
  5528, 15356, 5942, 15356, 5977, 15353, 6119, 15348, 6294, 15332, 6551, 15302,
  6824, 15249, 7044, 15171, 7122, 15070, 7050, 14949, 6861, 14818, 6611, 14679,
  6349, 14538, 6067, 14398, 5651, 14189, 5311, 13935, 4958, 15359, 4123, 15359,
  4153, 15356, 4296, 15353, 4646, 15338, 5160, 15311, 5508, 15263, 5829, 15188,
  6042, 15088, 6094, 14966, 6001, 14826, 5796, 14678, 5543, 14527, 5287, 14377,
  4985, 14133, 4586, 13869, 4257, 15360, 1563, 15360, 1642, 15358, 2076, 15354,
  2636, 15341, 3350, 15317, 4019, 15273, 4429, 15203, 4732, 15105, 4911, 14981,
  4932, 14836, 4818, 14679, 4621, 14517, 4386, 14359, 4156, 14083, 3795, 13808,
  3437, 15360, 122, 15360, 137, 15358, 285, 15355, 636, 15344, 1274, 15322,
  2177, 15281, 2765, 15215, 3223, 15120, 3451, 14995, 3569, 14846, 3567, 14681,
  3466, 14511, 3305, 14344, 3121, 14037, 2800, 13753, 2467, 15360, 0, 15360, 1,
  15359, 21, 15355, 89, 15346, 253, 15325, 479, 15287, 796, 15225, 1148, 15133,
  1492, 15008, 1749, 14856, 1882, 14685, 1886, 14506, 1783, 14324, 1608, 13996,
  1398, 13702, 1183,
]);
let nn = null;
function s0() {
  return (
    nn === null &&
      ((nn = new yc(i0, 16, 16, Ai, Ot)),
      (nn.name = "DFG_LUT"),
      (nn.minFilter = Ct),
      (nn.magFilter = Ct),
      (nn.wrapS = _n),
      (nn.wrapT = _n),
      (nn.generateMipmaps = !1),
      (nn.needsUpdate = !0)),
    nn
  );
}
class r0 {
  constructor(e = {}) {
    const {
      canvas: t = Pu(),
      context: n = null,
      depth: s = !0,
      stencil: r = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: c = !0,
      preserveDrawingBuffer: l = !1,
      powerPreference: u = "default",
      failIfMajorPerformanceCaveat: f = !1,
      reversedDepthBuffer: h = !1,
      outputBufferType: d = Gt,
    } = e;
    this.isWebGLRenderer = !0;
    let g;
    if (n !== null) {
      if (
        typeof WebGLRenderingContext < "u" &&
        n instanceof WebGLRenderingContext
      )
        throw new Error(
          "THREE.WebGLRenderer: WebGL 1 is not supported since r163.",
        );
      g = n.getContextAttributes().alpha;
    } else g = a;
    const x = d,
      m = new Set([vo, _o, go]),
      p = new Set([Gt, on, ss, rs, fo, po]),
      S = new Uint32Array(4),
      E = new Int32Array(4);
    let y = null,
      R = null;
    const w = [],
      P = [];
    let v = null;
    ((this.domElement = t),
      (this.debug = { checkShaderErrors: !0, onShaderError: null }),
      (this.autoClear = !0),
      (this.autoClearColor = !0),
      (this.autoClearDepth = !0),
      (this.autoClearStencil = !0),
      (this.sortObjects = !0),
      (this.clippingPlanes = []),
      (this.localClippingEnabled = !1),
      (this.toneMapping = jt),
      (this.toneMappingExposure = 1),
      (this.transmissionResolutionScale = 1));
    const b = this;
    let W = !1;
    this._outputColorSpace = Nt;
    let C = 0,
      V = 0,
      G = null,
      H = -1,
      N = null;
    const O = new dt(),
      F = new dt();
    let ce = null;
    const ie = new He(0);
    let ge = 0,
      xe = t.width,
      _e = t.height,
      Ue = 1,
      Ze = null,
      Ke = null;
    const $ = new dt(0, 0, xe, _e),
      he = new dt(0, 0, xe, _e);
    let fe = !1;
    const Be = new To();
    let we = !1,
      Ne = !1;
    const Je = new ot(),
      Ge = new D(),
      ee = new dt(),
      ae = {
        background: null,
        fog: null,
        environment: null,
        overrideMaterial: null,
        isScene: !0,
      };
    let te = !1;
    function me() {
      return G === null ? Ue : 1;
    }
    let A = n;
    function Fe(M, U) {
      return t.getContext(M, U);
    }
    try {
      const M = {
        alpha: !0,
        depth: s,
        stencil: r,
        antialias: o,
        premultipliedAlpha: c,
        preserveDrawingBuffer: l,
        powerPreference: u,
        failIfMajorPerformanceCaveat: f,
      };
      if (
        ("setAttribute" in t &&
          t.setAttribute("data-engine", `three.js r${io}`),
        t.addEventListener("webglcontextlost", Te, !1),
        t.addEventListener("webglcontextrestored", Re, !1),
        t.addEventListener("webglcontextcreationerror", st, !1),
        A === null)
      ) {
        const U = "webgl2";
        if (((A = Fe(U, M)), A === null))
          throw Fe(U)
            ? new Error(
                "Error creating WebGL context with your selected attributes.",
              )
            : new Error("Error creating WebGL context.");
      }
    } catch (M) {
      throw (Qe("WebGLRenderer: " + M.message), M);
    }
    let Me,
      ze,
      de,
      T,
      _,
      I,
      Y,
      Q,
      Z,
      be,
      pe,
      De,
      B,
      q,
      K,
      j,
      le,
      ne,
      Ce,
      L,
      re,
      oe,
      Ee;
    function se() {
      ((Me = new rm(A)),
        Me.init(),
        (re = new Zg(A, Me)),
        (ze = new Kp(A, Me, e, re)),
        (de = new Yg(A, Me)),
        ze.reversedDepthBuffer && h && de.buffers.depth.setReversed(!0),
        (T = new lm(A)),
        (_ = new Ig()),
        (I = new Jg(A, Me, de, _, ze, re, T)),
        (Y = new sm(b)),
        (Q = new df(A)),
        (oe = new Zp(A, Q)),
        (Z = new am(A, Q, T, oe)),
        (be = new um(A, Z, Q, oe, T)),
        (ne = new cm(A, ze, I)),
        (K = new jp(_)),
        (pe = new Dg(b, Y, Me, ze, oe, K)),
        (De = new t0(b, _)),
        (B = new Ng()),
        (q = new Gg(Me)),
        (le = new Jp(b, Y, de, be, g, c)),
        (j = new qg(b, be, ze)),
        (Ee = new n0(A, T, ze, de)),
        (Ce = new $p(A, Me, T)),
        (L = new om(A, Me, T)),
        (T.programs = pe.programs),
        (b.capabilities = ze),
        (b.extensions = Me),
        (b.properties = _),
        (b.renderLists = B),
        (b.shadowMap = j),
        (b.state = de),
        (b.info = T));
    }
    (se(), x !== Gt && (v = new fm(x, t.width, t.height, s, r)));
    const J = new Qg(b, A);
    ((this.xr = J),
      (this.getContext = function () {
        return A;
      }),
      (this.getContextAttributes = function () {
        return A.getContextAttributes();
      }),
      (this.forceContextLoss = function () {
        const M = Me.get("WEBGL_lose_context");
        M && M.loseContext();
      }),
      (this.forceContextRestore = function () {
        const M = Me.get("WEBGL_lose_context");
        M && M.restoreContext();
      }),
      (this.getPixelRatio = function () {
        return Ue;
      }),
      (this.setPixelRatio = function (M) {
        M !== void 0 && ((Ue = M), this.setSize(xe, _e, !1));
      }),
      (this.getSize = function (M) {
        return M.set(xe, _e);
      }),
      (this.setSize = function (M, U, X = !0) {
        if (J.isPresenting) {
          Ve("WebGLRenderer: Can't change size while VR device is presenting.");
          return;
        }
        ((xe = M),
          (_e = U),
          (t.width = Math.floor(M * Ue)),
          (t.height = Math.floor(U * Ue)),
          X === !0 && ((t.style.width = M + "px"), (t.style.height = U + "px")),
          v !== null && v.setSize(t.width, t.height),
          this.setViewport(0, 0, M, U));
      }),
      (this.getDrawingBufferSize = function (M) {
        return M.set(xe * Ue, _e * Ue).floor();
      }),
      (this.setDrawingBufferSize = function (M, U, X) {
        ((xe = M),
          (_e = U),
          (Ue = X),
          (t.width = Math.floor(M * X)),
          (t.height = Math.floor(U * X)),
          this.setViewport(0, 0, M, U));
      }),
      (this.setEffects = function (M) {
        if (x === Gt) {
          console.error(
            "THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.",
          );
          return;
        }
        if (M) {
          for (let U = 0; U < M.length; U++)
            if (M[U].isOutputPass === !0) {
              console.warn(
                "THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.",
              );
              break;
            }
        }
        v.setEffects(M || []);
      }),
      (this.getCurrentViewport = function (M) {
        return M.copy(O);
      }),
      (this.getViewport = function (M) {
        return M.copy($);
      }),
      (this.setViewport = function (M, U, X, k) {
        (M.isVector4 ? $.set(M.x, M.y, M.z, M.w) : $.set(M, U, X, k),
          de.viewport(O.copy($).multiplyScalar(Ue).round()));
      }),
      (this.getScissor = function (M) {
        return M.copy(he);
      }),
      (this.setScissor = function (M, U, X, k) {
        (M.isVector4 ? he.set(M.x, M.y, M.z, M.w) : he.set(M, U, X, k),
          de.scissor(F.copy(he).multiplyScalar(Ue).round()));
      }),
      (this.getScissorTest = function () {
        return fe;
      }),
      (this.setScissorTest = function (M) {
        de.setScissorTest((fe = M));
      }),
      (this.setOpaqueSort = function (M) {
        Ze = M;
      }),
      (this.setTransparentSort = function (M) {
        Ke = M;
      }),
      (this.getClearColor = function (M) {
        return M.copy(le.getClearColor());
      }),
      (this.setClearColor = function () {
        le.setClearColor(...arguments);
      }),
      (this.getClearAlpha = function () {
        return le.getClearAlpha();
      }),
      (this.setClearAlpha = function () {
        le.setClearAlpha(...arguments);
      }),
      (this.clear = function (M = !0, U = !0, X = !0) {
        let k = 0;
        if (M) {
          let z = !1;
          if (G !== null) {
            const Se = G.texture.format;
            z = m.has(Se);
          }
          if (z) {
            const Se = G.texture.type,
              Ae = p.has(Se),
              ye = le.getClearColor(),
              Pe = le.getClearAlpha(),
              Ie = ye.r,
              ke = ye.g,
              qe = ye.b;
            Ae
              ? ((S[0] = Ie),
                (S[1] = ke),
                (S[2] = qe),
                (S[3] = Pe),
                A.clearBufferuiv(A.COLOR, 0, S))
              : ((E[0] = Ie),
                (E[1] = ke),
                (E[2] = qe),
                (E[3] = Pe),
                A.clearBufferiv(A.COLOR, 0, E));
          } else k |= A.COLOR_BUFFER_BIT;
        }
        (U && (k |= A.DEPTH_BUFFER_BIT),
          X &&
            ((k |= A.STENCIL_BUFFER_BIT),
            this.state.buffers.stencil.setMask(4294967295)),
          k !== 0 && A.clear(k));
      }),
      (this.clearColor = function () {
        this.clear(!0, !1, !1);
      }),
      (this.clearDepth = function () {
        this.clear(!1, !0, !1);
      }),
      (this.clearStencil = function () {
        this.clear(!1, !1, !0);
      }),
      (this.dispose = function () {
        (t.removeEventListener("webglcontextlost", Te, !1),
          t.removeEventListener("webglcontextrestored", Re, !1),
          t.removeEventListener("webglcontextcreationerror", st, !1),
          le.dispose(),
          B.dispose(),
          q.dispose(),
          _.dispose(),
          Y.dispose(),
          be.dispose(),
          oe.dispose(),
          Ee.dispose(),
          pe.dispose(),
          J.dispose(),
          J.removeEventListener("sessionstart", Uo),
          J.removeEventListener("sessionend", No),
          Nn.stop());
      }));
    function Te(M) {
      (M.preventDefault(), Zo("WebGLRenderer: Context Lost."), (W = !0));
    }
    function Re() {
      (Zo("WebGLRenderer: Context Restored."), (W = !1));
      const M = T.autoReset,
        U = j.enabled,
        X = j.autoUpdate,
        k = j.needsUpdate,
        z = j.type;
      (se(),
        (T.autoReset = M),
        (j.enabled = U),
        (j.autoUpdate = X),
        (j.needsUpdate = k),
        (j.type = z));
    }
    function st(M) {
      Qe(
        "WebGLRenderer: A WebGL context could not be created. Reason: ",
        M.statusMessage,
      );
    }
    function tt(M) {
      const U = M.target;
      (U.removeEventListener("dispose", tt), Pt(U));
    }
    function Pt(M) {
      (Ut(M), _.remove(M));
    }
    function Ut(M) {
      const U = _.get(M).programs;
      U !== void 0 &&
        (U.forEach(function (X) {
          pe.releaseProgram(X);
        }),
        M.isShaderMaterial && pe.releaseShaderCache(M));
    }
    this.renderBufferDirect = function (M, U, X, k, z, Se) {
      U === null && (U = ae);
      const Ae = z.isMesh && z.matrixWorld.determinant() < 0,
        ye = qc(M, U, X, k, z);
      de.setMaterial(k, Ae);
      let Pe = X.index,
        Ie = 1;
      if (k.wireframe === !0) {
        if (((Pe = Z.getWireframeAttribute(X)), Pe === void 0)) return;
        Ie = 2;
      }
      const ke = X.drawRange,
        qe = X.attributes.position;
      let Oe = ke.start * Ie,
        rt = (ke.start + ke.count) * Ie;
      (Se !== null &&
        ((Oe = Math.max(Oe, Se.start * Ie)),
        (rt = Math.min(rt, (Se.start + Se.count) * Ie))),
        Pe !== null
          ? ((Oe = Math.max(Oe, 0)), (rt = Math.min(rt, Pe.count)))
          : qe != null &&
            ((Oe = Math.max(Oe, 0)), (rt = Math.min(rt, qe.count))));
      const pt = rt - Oe;
      if (pt < 0 || pt === 1 / 0) return;
      oe.setup(z, k, ye, X, Pe);
      let ft,
        at = Ce;
      if (
        (Pe !== null && ((ft = Q.get(Pe)), (at = L), at.setIndex(ft)), z.isMesh)
      )
        k.wireframe === !0
          ? (de.setLineWidth(k.wireframeLinewidth * me()), at.setMode(A.LINES))
          : at.setMode(A.TRIANGLES);
      else if (z.isLine) {
        let Tt = k.linewidth;
        (Tt === void 0 && (Tt = 1),
          de.setLineWidth(Tt * me()),
          z.isLineSegments
            ? at.setMode(A.LINES)
            : z.isLineLoop
              ? at.setMode(A.LINE_LOOP)
              : at.setMode(A.LINE_STRIP));
      } else
        z.isPoints
          ? at.setMode(A.POINTS)
          : z.isSprite && at.setMode(A.TRIANGLES);
      if (z.isBatchedMesh)
        if (z._multiDrawInstances !== null)
          (lr(
            "WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection.",
          ),
            at.renderMultiDrawInstances(
              z._multiDrawStarts,
              z._multiDrawCounts,
              z._multiDrawCount,
              z._multiDrawInstances,
            ));
        else if (Me.get("WEBGL_multi_draw"))
          at.renderMultiDraw(
            z._multiDrawStarts,
            z._multiDrawCounts,
            z._multiDrawCount,
          );
        else {
          const Tt = z._multiDrawStarts,
            Le = z._multiDrawCounts,
            Bt = z._multiDrawCount,
            nt = Pe ? Q.get(Pe).bytesPerElement : 1,
            qt = _.get(k).currentProgram.getUniforms();
          for (let en = 0; en < Bt; en++)
            (qt.setValue(A, "_gl_DrawID", en), at.render(Tt[en] / nt, Le[en]));
        }
      else if (z.isInstancedMesh) at.renderInstances(Oe, pt, z.count);
      else if (X.isInstancedBufferGeometry) {
        const Tt = X._maxInstanceCount !== void 0 ? X._maxInstanceCount : 1 / 0,
          Le = Math.min(X.instanceCount, Tt);
        at.renderInstances(Oe, pt, Le);
      } else at.render(Oe, pt);
    };
    function Un(M, U, X) {
      M.transparent === !0 && M.side === gn && M.forceSinglePass === !1
        ? ((M.side = Ft),
          (M.needsUpdate = !0),
          gs(M, U, X),
          (M.side = In),
          (M.needsUpdate = !0),
          gs(M, U, X),
          (M.side = gn))
        : gs(M, U, X);
    }
    ((this.compile = function (M, U, X = null) {
      (X === null && (X = M),
        (R = q.get(X)),
        R.init(U),
        P.push(R),
        X.traverseVisible(function (z) {
          z.isLight &&
            z.layers.test(U.layers) &&
            (R.pushLight(z), z.castShadow && R.pushShadow(z));
        }),
        M !== X &&
          M.traverseVisible(function (z) {
            z.isLight &&
              z.layers.test(U.layers) &&
              (R.pushLight(z), z.castShadow && R.pushShadow(z));
          }),
        R.setupLights());
      const k = new Set();
      return (
        M.traverse(function (z) {
          if (!(z.isMesh || z.isPoints || z.isLine || z.isSprite)) return;
          const Se = z.material;
          if (Se)
            if (Array.isArray(Se))
              for (let Ae = 0; Ae < Se.length; Ae++) {
                const ye = Se[Ae];
                (Un(ye, X, z), k.add(ye));
              }
            else (Un(Se, X, z), k.add(Se));
        }),
        (R = P.pop()),
        k
      );
    }),
      (this.compileAsync = function (M, U, X = null) {
        const k = this.compile(M, U, X);
        return new Promise((z) => {
          function Se() {
            if (
              (k.forEach(function (Ae) {
                _.get(Ae).currentProgram.isReady() && k.delete(Ae);
              }),
              k.size === 0)
            ) {
              z(M);
              return;
            }
            setTimeout(Se, 10);
          }
          Me.get("KHR_parallel_shader_compile") !== null
            ? Se()
            : setTimeout(Se, 10);
        });
      }));
    let Sr = null;
    function Xc(M) {
      Sr && Sr(M);
    }
    function Uo() {
      Nn.stop();
    }
    function No() {
      Nn.start();
    }
    const Nn = new Oc();
    (Nn.setAnimationLoop(Xc),
      typeof self < "u" && Nn.setContext(self),
      (this.setAnimationLoop = function (M) {
        ((Sr = M), J.setAnimationLoop(M), M === null ? Nn.stop() : Nn.start());
      }),
      J.addEventListener("sessionstart", Uo),
      J.addEventListener("sessionend", No),
      (this.render = function (M, U) {
        if (U !== void 0 && U.isCamera !== !0) {
          Qe(
            "WebGLRenderer.render: camera is not an instance of THREE.Camera.",
          );
          return;
        }
        if (W === !0) return;
        const X = J.enabled === !0 && J.isPresenting === !0,
          k = v !== null && (G === null || X) && v.begin(b, G);
        if (
          (M.matrixWorldAutoUpdate === !0 && M.updateMatrixWorld(),
          U.parent === null &&
            U.matrixWorldAutoUpdate === !0 &&
            U.updateMatrixWorld(),
          J.enabled === !0 &&
            J.isPresenting === !0 &&
            (v === null || v.isCompositing() === !1) &&
            (J.cameraAutoUpdate === !0 && J.updateCamera(U),
            (U = J.getCamera())),
          M.isScene === !0 && M.onBeforeRender(b, M, U, G),
          (R = q.get(M, P.length)),
          R.init(U),
          P.push(R),
          Je.multiplyMatrices(U.projectionMatrix, U.matrixWorldInverse),
          Be.setFromProjectionMatrix(Je, rn, U.reversedDepth),
          (Ne = this.localClippingEnabled),
          (we = K.init(this.clippingPlanes, Ne)),
          (y = B.get(M, w.length)),
          y.init(),
          w.push(y),
          J.enabled === !0 && J.isPresenting === !0)
        ) {
          const Ae = b.xr.getDepthSensingMesh();
          Ae !== null && yr(Ae, U, -1 / 0, b.sortObjects);
        }
        (yr(M, U, 0, b.sortObjects),
          y.finish(),
          b.sortObjects === !0 && y.sort(Ze, Ke),
          (te =
            J.enabled === !1 ||
            J.isPresenting === !1 ||
            J.hasDepthSensing() === !1),
          te && le.addToRenderList(y, M),
          this.info.render.frame++,
          we === !0 && K.beginShadows());
        const z = R.state.shadowsArray;
        if (
          (j.render(z, M, U),
          we === !0 && K.endShadows(),
          this.info.autoReset === !0 && this.info.reset(),
          (k && v.hasRenderPass()) === !1)
        ) {
          const Ae = y.opaque,
            ye = y.transmissive;
          if ((R.setupLights(), U.isArrayCamera)) {
            const Pe = U.cameras;
            if (ye.length > 0)
              for (let Ie = 0, ke = Pe.length; Ie < ke; Ie++) {
                const qe = Pe[Ie];
                Oo(Ae, ye, M, qe);
              }
            te && le.render(M);
            for (let Ie = 0, ke = Pe.length; Ie < ke; Ie++) {
              const qe = Pe[Ie];
              Fo(y, M, qe, qe.viewport);
            }
          } else
            (ye.length > 0 && Oo(Ae, ye, M, U),
              te && le.render(M),
              Fo(y, M, U));
        }
        (G !== null &&
          V === 0 &&
          (I.updateMultisampleRenderTarget(G), I.updateRenderTargetMipmap(G)),
          k && v.end(b),
          M.isScene === !0 && M.onAfterRender(b, M, U),
          oe.resetDefaultState(),
          (H = -1),
          (N = null),
          P.pop(),
          P.length > 0
            ? ((R = P[P.length - 1]),
              we === !0 && K.setGlobalState(b.clippingPlanes, R.state.camera))
            : (R = null),
          w.pop(),
          w.length > 0 ? (y = w[w.length - 1]) : (y = null));
      }));
    function yr(M, U, X, k) {
      if (M.visible === !1) return;
      if (M.layers.test(U.layers)) {
        if (M.isGroup) X = M.renderOrder;
        else if (M.isLOD) M.autoUpdate === !0 && M.update(U);
        else if (M.isLight) (R.pushLight(M), M.castShadow && R.pushShadow(M));
        else if (M.isSprite) {
          if (!M.frustumCulled || Be.intersectsSprite(M)) {
            k && ee.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Je);
            const Ae = be.update(M),
              ye = M.material;
            ye.visible && y.push(M, Ae, ye, X, ee.z, null);
          }
        } else if (
          (M.isMesh || M.isLine || M.isPoints) &&
          (!M.frustumCulled || Be.intersectsObject(M))
        ) {
          const Ae = be.update(M),
            ye = M.material;
          if (
            (k &&
              (M.boundingSphere !== void 0
                ? (M.boundingSphere === null && M.computeBoundingSphere(),
                  ee.copy(M.boundingSphere.center))
                : (Ae.boundingSphere === null && Ae.computeBoundingSphere(),
                  ee.copy(Ae.boundingSphere.center)),
              ee.applyMatrix4(M.matrixWorld).applyMatrix4(Je)),
            Array.isArray(ye))
          ) {
            const Pe = Ae.groups;
            for (let Ie = 0, ke = Pe.length; Ie < ke; Ie++) {
              const qe = Pe[Ie],
                Oe = ye[qe.materialIndex];
              Oe && Oe.visible && y.push(M, Ae, Oe, X, ee.z, qe);
            }
          } else ye.visible && y.push(M, Ae, ye, X, ee.z, null);
        }
      }
      const Se = M.children;
      for (let Ae = 0, ye = Se.length; Ae < ye; Ae++) yr(Se[Ae], U, X, k);
    }
    function Fo(M, U, X, k) {
      const { opaque: z, transmissive: Se, transparent: Ae } = M;
      (R.setupLightsView(X),
        we === !0 && K.setGlobalState(b.clippingPlanes, X),
        k && de.viewport(O.copy(k)),
        z.length > 0 && ms(z, U, X),
        Se.length > 0 && ms(Se, U, X),
        Ae.length > 0 && ms(Ae, U, X),
        de.buffers.depth.setTest(!0),
        de.buffers.depth.setMask(!0),
        de.buffers.color.setMask(!0),
        de.setPolygonOffset(!1));
    }
    function Oo(M, U, X, k) {
      if ((X.isScene === !0 ? X.overrideMaterial : null) !== null) return;
      if (R.state.transmissionRenderTarget[k.id] === void 0) {
        const Oe =
          Me.has("EXT_color_buffer_half_float") ||
          Me.has("EXT_color_buffer_float");
        R.state.transmissionRenderTarget[k.id] = new It(1, 1, {
          generateMipmaps: !0,
          type: Oe ? Ot : Gt,
          minFilter: Yn,
          samples: Math.max(4, ze.samples),
          stencilBuffer: r,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: et.workingColorSpace,
        });
      }
      const Se = R.state.transmissionRenderTarget[k.id],
        Ae = k.viewport || O;
      Se.setSize(
        Ae.z * b.transmissionResolutionScale,
        Ae.w * b.transmissionResolutionScale,
      );
      const ye = b.getRenderTarget(),
        Pe = b.getActiveCubeFace(),
        Ie = b.getActiveMipmapLevel();
      (b.setRenderTarget(Se),
        b.getClearColor(ie),
        (ge = b.getClearAlpha()),
        ge < 1 && b.setClearColor(16777215, 0.5),
        b.clear(),
        te && le.render(X));
      const ke = b.toneMapping;
      b.toneMapping = jt;
      const qe = k.viewport;
      if (
        (k.viewport !== void 0 && (k.viewport = void 0),
        R.setupLightsView(k),
        we === !0 && K.setGlobalState(b.clippingPlanes, k),
        ms(M, X, k),
        I.updateMultisampleRenderTarget(Se),
        I.updateRenderTargetMipmap(Se),
        Me.has("WEBGL_multisampled_render_to_texture") === !1)
      ) {
        let Oe = !1;
        for (let rt = 0, pt = U.length; rt < pt; rt++) {
          const ft = U[rt],
            { object: at, geometry: Tt, material: Le, group: Bt } = ft;
          if (Le.side === gn && at.layers.test(k.layers)) {
            const nt = Le.side;
            ((Le.side = Ft),
              (Le.needsUpdate = !0),
              Bo(at, X, k, Tt, Le, Bt),
              (Le.side = nt),
              (Le.needsUpdate = !0),
              (Oe = !0));
          }
        }
        Oe === !0 &&
          (I.updateMultisampleRenderTarget(Se), I.updateRenderTargetMipmap(Se));
      }
      (b.setRenderTarget(ye, Pe, Ie),
        b.setClearColor(ie, ge),
        qe !== void 0 && (k.viewport = qe),
        (b.toneMapping = ke));
    }
    function ms(M, U, X) {
      const k = U.isScene === !0 ? U.overrideMaterial : null;
      for (let z = 0, Se = M.length; z < Se; z++) {
        const Ae = M[z],
          { object: ye, geometry: Pe, group: Ie } = Ae;
        let ke = Ae.material;
        (ke.allowOverride === !0 && k !== null && (ke = k),
          ye.layers.test(X.layers) && Bo(ye, U, X, Pe, ke, Ie));
      }
    }
    function Bo(M, U, X, k, z, Se) {
      (M.onBeforeRender(b, U, X, k, z, Se),
        M.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse, M.matrixWorld),
        M.normalMatrix.getNormalMatrix(M.modelViewMatrix),
        z.onBeforeRender(b, U, X, k, M, Se),
        z.transparent === !0 && z.side === gn && z.forceSinglePass === !1
          ? ((z.side = Ft),
            (z.needsUpdate = !0),
            b.renderBufferDirect(X, U, k, z, M, Se),
            (z.side = In),
            (z.needsUpdate = !0),
            b.renderBufferDirect(X, U, k, z, M, Se),
            (z.side = gn))
          : b.renderBufferDirect(X, U, k, z, M, Se),
        M.onAfterRender(b, U, X, k, z, Se));
    }
    function gs(M, U, X) {
      U.isScene !== !0 && (U = ae);
      const k = _.get(M),
        z = R.state.lights,
        Se = R.state.shadowsArray,
        Ae = z.state.version,
        ye = pe.getParameters(M, z.state, Se, U, X),
        Pe = pe.getProgramCacheKey(ye);
      let Ie = k.programs;
      ((k.environment =
        M.isMeshStandardMaterial ||
        M.isMeshLambertMaterial ||
        M.isMeshPhongMaterial
          ? U.environment
          : null),
        (k.fog = U.fog));
      const ke =
        M.isMeshStandardMaterial ||
        (M.isMeshLambertMaterial && !M.envMap) ||
        (M.isMeshPhongMaterial && !M.envMap);
      ((k.envMap = Y.get(M.envMap || k.environment, ke)),
        (k.envMapRotation =
          k.environment !== null && M.envMap === null
            ? U.environmentRotation
            : M.envMapRotation),
        Ie === void 0 &&
          (M.addEventListener("dispose", tt),
          (Ie = new Map()),
          (k.programs = Ie)));
      let qe = Ie.get(Pe);
      if (qe !== void 0) {
        if (k.currentProgram === qe && k.lightsStateVersion === Ae)
          return (Vo(M, ye), qe);
      } else
        ((ye.uniforms = pe.getUniforms(M)),
          M.onBeforeCompile(ye, b),
          (qe = pe.acquireProgram(ye, Pe)),
          Ie.set(Pe, qe),
          (k.uniforms = ye.uniforms));
      const Oe = k.uniforms;
      return (
        ((!M.isShaderMaterial && !M.isRawShaderMaterial) ||
          M.clipping === !0) &&
          (Oe.clippingPlanes = K.uniform),
        Vo(M, ye),
        (k.needsLights = Jc(M)),
        (k.lightsStateVersion = Ae),
        k.needsLights &&
          ((Oe.ambientLightColor.value = z.state.ambient),
          (Oe.lightProbe.value = z.state.probe),
          (Oe.directionalLights.value = z.state.directional),
          (Oe.directionalLightShadows.value = z.state.directionalShadow),
          (Oe.spotLights.value = z.state.spot),
          (Oe.spotLightShadows.value = z.state.spotShadow),
          (Oe.rectAreaLights.value = z.state.rectArea),
          (Oe.ltc_1.value = z.state.rectAreaLTC1),
          (Oe.ltc_2.value = z.state.rectAreaLTC2),
          (Oe.pointLights.value = z.state.point),
          (Oe.pointLightShadows.value = z.state.pointShadow),
          (Oe.hemisphereLights.value = z.state.hemi),
          (Oe.directionalShadowMatrix.value = z.state.directionalShadowMatrix),
          (Oe.spotLightMatrix.value = z.state.spotLightMatrix),
          (Oe.spotLightMap.value = z.state.spotLightMap),
          (Oe.pointShadowMatrix.value = z.state.pointShadowMatrix)),
        (k.currentProgram = qe),
        (k.uniformsList = null),
        qe
      );
    }
    function zo(M) {
      if (M.uniformsList === null) {
        const U = M.currentProgram.getUniforms();
        M.uniformsList = ir.seqWithValue(U.seq, M.uniforms);
      }
      return M.uniformsList;
    }
    function Vo(M, U) {
      const X = _.get(M);
      ((X.outputColorSpace = U.outputColorSpace),
        (X.batching = U.batching),
        (X.batchingColor = U.batchingColor),
        (X.instancing = U.instancing),
        (X.instancingColor = U.instancingColor),
        (X.instancingMorph = U.instancingMorph),
        (X.skinning = U.skinning),
        (X.morphTargets = U.morphTargets),
        (X.morphNormals = U.morphNormals),
        (X.morphColors = U.morphColors),
        (X.morphTargetsCount = U.morphTargetsCount),
        (X.numClippingPlanes = U.numClippingPlanes),
        (X.numIntersection = U.numClipIntersection),
        (X.vertexAlphas = U.vertexAlphas),
        (X.vertexTangents = U.vertexTangents),
        (X.toneMapping = U.toneMapping));
    }
    function qc(M, U, X, k, z) {
      (U.isScene !== !0 && (U = ae), I.resetTextureUnits());
      const Se = U.fog,
        Ae =
          k.isMeshStandardMaterial ||
          k.isMeshLambertMaterial ||
          k.isMeshPhongMaterial
            ? U.environment
            : null,
        ye =
          G === null
            ? b.outputColorSpace
            : G.isXRRenderTarget === !0
              ? G.texture.colorSpace
              : wi,
        Pe =
          k.isMeshStandardMaterial ||
          (k.isMeshLambertMaterial && !k.envMap) ||
          (k.isMeshPhongMaterial && !k.envMap),
        Ie = Y.get(k.envMap || Ae, Pe),
        ke =
          k.vertexColors === !0 &&
          !!X.attributes.color &&
          X.attributes.color.itemSize === 4,
        qe = !!X.attributes.tangent && (!!k.normalMap || k.anisotropy > 0),
        Oe = !!X.morphAttributes.position,
        rt = !!X.morphAttributes.normal,
        pt = !!X.morphAttributes.color;
      let ft = jt;
      k.toneMapped &&
        (G === null || G.isXRRenderTarget === !0) &&
        (ft = b.toneMapping);
      const at =
          X.morphAttributes.position ||
          X.morphAttributes.normal ||
          X.morphAttributes.color,
        Tt = at !== void 0 ? at.length : 0,
        Le = _.get(k),
        Bt = R.state.lights;
      if (we === !0 && (Ne === !0 || M !== N)) {
        const vt = M === N && k.id === H;
        K.setState(k, M, vt);
      }
      let nt = !1;
      k.version === Le.__version
        ? ((Le.needsLights && Le.lightsStateVersion !== Bt.state.version) ||
            Le.outputColorSpace !== ye ||
            (z.isBatchedMesh && Le.batching === !1) ||
            (!z.isBatchedMesh && Le.batching === !0) ||
            (z.isBatchedMesh &&
              Le.batchingColor === !0 &&
              z.colorTexture === null) ||
            (z.isBatchedMesh &&
              Le.batchingColor === !1 &&
              z.colorTexture !== null) ||
            (z.isInstancedMesh && Le.instancing === !1) ||
            (!z.isInstancedMesh && Le.instancing === !0) ||
            (z.isSkinnedMesh && Le.skinning === !1) ||
            (!z.isSkinnedMesh && Le.skinning === !0) ||
            (z.isInstancedMesh &&
              Le.instancingColor === !0 &&
              z.instanceColor === null) ||
            (z.isInstancedMesh &&
              Le.instancingColor === !1 &&
              z.instanceColor !== null) ||
            (z.isInstancedMesh &&
              Le.instancingMorph === !0 &&
              z.morphTexture === null) ||
            (z.isInstancedMesh &&
              Le.instancingMorph === !1 &&
              z.morphTexture !== null) ||
            Le.envMap !== Ie ||
            (k.fog === !0 && Le.fog !== Se) ||
            (Le.numClippingPlanes !== void 0 &&
              (Le.numClippingPlanes !== K.numPlanes ||
                Le.numIntersection !== K.numIntersection)) ||
            Le.vertexAlphas !== ke ||
            Le.vertexTangents !== qe ||
            Le.morphTargets !== Oe ||
            Le.morphNormals !== rt ||
            Le.morphColors !== pt ||
            Le.toneMapping !== ft ||
            Le.morphTargetsCount !== Tt) &&
          (nt = !0)
        : ((nt = !0), (Le.__version = k.version));
      let qt = Le.currentProgram;
      nt === !0 && (qt = gs(k, U, z));
      let en = !1,
        Fn = !1,
        ti = !1;
      const lt = qt.getUniforms(),
        yt = Le.uniforms;
      if (
        (de.useProgram(qt.program) && ((en = !0), (Fn = !0), (ti = !0)),
        k.id !== H && ((H = k.id), (Fn = !0)),
        en || N !== M)
      ) {
        (de.buffers.depth.getReversed() &&
          M.reversedDepth !== !0 &&
          ((M._reversedDepth = !0), M.updateProjectionMatrix()),
          lt.setValue(A, "projectionMatrix", M.projectionMatrix),
          lt.setValue(A, "viewMatrix", M.matrixWorldInverse));
        const yn = lt.map.cameraPosition;
        (yn !== void 0 &&
          yn.setValue(A, Ge.setFromMatrixPosition(M.matrixWorld)),
          ze.logarithmicDepthBuffer &&
            lt.setValue(
              A,
              "logDepthBufFC",
              2 / (Math.log(M.far + 1) / Math.LN2),
            ),
          (k.isMeshPhongMaterial ||
            k.isMeshToonMaterial ||
            k.isMeshLambertMaterial ||
            k.isMeshBasicMaterial ||
            k.isMeshStandardMaterial ||
            k.isShaderMaterial) &&
            lt.setValue(A, "isOrthographic", M.isOrthographicCamera === !0),
          N !== M && ((N = M), (Fn = !0), (ti = !0)));
      }
      if (
        (Le.needsLights &&
          (Bt.state.directionalShadowMap.length > 0 &&
            lt.setValue(
              A,
              "directionalShadowMap",
              Bt.state.directionalShadowMap,
              I,
            ),
          Bt.state.spotShadowMap.length > 0 &&
            lt.setValue(A, "spotShadowMap", Bt.state.spotShadowMap, I),
          Bt.state.pointShadowMap.length > 0 &&
            lt.setValue(A, "pointShadowMap", Bt.state.pointShadowMap, I)),
        z.isSkinnedMesh)
      ) {
        (lt.setOptional(A, z, "bindMatrix"),
          lt.setOptional(A, z, "bindMatrixInverse"));
        const vt = z.skeleton;
        vt &&
          (vt.boneTexture === null && vt.computeBoneTexture(),
          lt.setValue(A, "boneTexture", vt.boneTexture, I));
      }
      z.isBatchedMesh &&
        (lt.setOptional(A, z, "batchingTexture"),
        lt.setValue(A, "batchingTexture", z._matricesTexture, I),
        lt.setOptional(A, z, "batchingIdTexture"),
        lt.setValue(A, "batchingIdTexture", z._indirectTexture, I),
        lt.setOptional(A, z, "batchingColorTexture"),
        z._colorsTexture !== null &&
          lt.setValue(A, "batchingColorTexture", z._colorsTexture, I));
      const Sn = X.morphAttributes;
      if (
        ((Sn.position !== void 0 ||
          Sn.normal !== void 0 ||
          Sn.color !== void 0) &&
          ne.update(z, X, qt),
        (Fn || Le.receiveShadow !== z.receiveShadow) &&
          ((Le.receiveShadow = z.receiveShadow),
          lt.setValue(A, "receiveShadow", z.receiveShadow)),
        (k.isMeshStandardMaterial ||
          k.isMeshLambertMaterial ||
          k.isMeshPhongMaterial) &&
          k.envMap === null &&
          U.environment !== null &&
          (yt.envMapIntensity.value = U.environmentIntensity),
        yt.dfgLUT !== void 0 && (yt.dfgLUT.value = s0()),
        Fn &&
          (lt.setValue(A, "toneMappingExposure", b.toneMappingExposure),
          Le.needsLights && Yc(yt, ti),
          Se && k.fog === !0 && De.refreshFogUniforms(yt, Se),
          De.refreshMaterialUniforms(
            yt,
            k,
            Ue,
            _e,
            R.state.transmissionRenderTarget[M.id],
          ),
          ir.upload(A, zo(Le), yt, I)),
        k.isShaderMaterial &&
          k.uniformsNeedUpdate === !0 &&
          (ir.upload(A, zo(Le), yt, I), (k.uniformsNeedUpdate = !1)),
        k.isSpriteMaterial && lt.setValue(A, "center", z.center),
        lt.setValue(A, "modelViewMatrix", z.modelViewMatrix),
        lt.setValue(A, "normalMatrix", z.normalMatrix),
        lt.setValue(A, "modelMatrix", z.matrixWorld),
        k.isShaderMaterial || k.isRawShaderMaterial)
      ) {
        const vt = k.uniformsGroups;
        for (let yn = 0, ni = vt.length; yn < ni; yn++) {
          const Go = vt[yn];
          (Ee.update(Go, qt), Ee.bind(Go, qt));
        }
      }
      return qt;
    }
    function Yc(M, U) {
      ((M.ambientLightColor.needsUpdate = U),
        (M.lightProbe.needsUpdate = U),
        (M.directionalLights.needsUpdate = U),
        (M.directionalLightShadows.needsUpdate = U),
        (M.pointLights.needsUpdate = U),
        (M.pointLightShadows.needsUpdate = U),
        (M.spotLights.needsUpdate = U),
        (M.spotLightShadows.needsUpdate = U),
        (M.rectAreaLights.needsUpdate = U),
        (M.hemisphereLights.needsUpdate = U));
    }
    function Jc(M) {
      return (
        M.isMeshLambertMaterial ||
        M.isMeshToonMaterial ||
        M.isMeshPhongMaterial ||
        M.isMeshStandardMaterial ||
        M.isShadowMaterial ||
        (M.isShaderMaterial && M.lights === !0)
      );
    }
    ((this.getActiveCubeFace = function () {
      return C;
    }),
      (this.getActiveMipmapLevel = function () {
        return V;
      }),
      (this.getRenderTarget = function () {
        return G;
      }),
      (this.setRenderTargetTextures = function (M, U, X) {
        const k = _.get(M);
        ((k.__autoAllocateDepthBuffer = M.resolveDepthBuffer === !1),
          k.__autoAllocateDepthBuffer === !1 && (k.__useRenderToTexture = !1),
          (_.get(M.texture).__webglTexture = U),
          (_.get(M.depthTexture).__webglTexture = k.__autoAllocateDepthBuffer
            ? void 0
            : X),
          (k.__hasExternalTextures = !0));
      }),
      (this.setRenderTargetFramebuffer = function (M, U) {
        const X = _.get(M);
        ((X.__webglFramebuffer = U),
          (X.__useDefaultFramebuffer = U === void 0));
      }));
    const Zc = A.createFramebuffer();
    ((this.setRenderTarget = function (M, U = 0, X = 0) {
      ((G = M), (C = U), (V = X));
      let k = null,
        z = !1,
        Se = !1;
      if (M) {
        const ye = _.get(M);
        if (ye.__useDefaultFramebuffer !== void 0) {
          (de.bindFramebuffer(A.FRAMEBUFFER, ye.__webglFramebuffer),
            O.copy(M.viewport),
            F.copy(M.scissor),
            (ce = M.scissorTest),
            de.viewport(O),
            de.scissor(F),
            de.setScissorTest(ce),
            (H = -1));
          return;
        } else if (ye.__webglFramebuffer === void 0) I.setupRenderTarget(M);
        else if (ye.__hasExternalTextures)
          I.rebindTextures(
            M,
            _.get(M.texture).__webglTexture,
            _.get(M.depthTexture).__webglTexture,
          );
        else if (M.depthBuffer) {
          const ke = M.depthTexture;
          if (ye.__boundDepthTexture !== ke) {
            if (
              ke !== null &&
              _.has(ke) &&
              (M.width !== ke.image.width || M.height !== ke.image.height)
            )
              throw new Error(
                "WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.",
              );
            I.setupDepthRenderbuffer(M);
          }
        }
        const Pe = M.texture;
        (Pe.isData3DTexture ||
          Pe.isDataArrayTexture ||
          Pe.isCompressedArrayTexture) &&
          (Se = !0);
        const Ie = _.get(M).__webglFramebuffer;
        (M.isWebGLCubeRenderTarget
          ? (Array.isArray(Ie[U]) ? (k = Ie[U][X]) : (k = Ie[U]), (z = !0))
          : M.samples > 0 && I.useMultisampledRTT(M) === !1
            ? (k = _.get(M).__webglMultisampledFramebuffer)
            : Array.isArray(Ie)
              ? (k = Ie[X])
              : (k = Ie),
          O.copy(M.viewport),
          F.copy(M.scissor),
          (ce = M.scissorTest));
      } else
        (O.copy($).multiplyScalar(Ue).floor(),
          F.copy(he).multiplyScalar(Ue).floor(),
          (ce = fe));
      if (
        (X !== 0 && (k = Zc),
        de.bindFramebuffer(A.FRAMEBUFFER, k) && de.drawBuffers(M, k),
        de.viewport(O),
        de.scissor(F),
        de.setScissorTest(ce),
        z)
      ) {
        const ye = _.get(M.texture);
        A.framebufferTexture2D(
          A.FRAMEBUFFER,
          A.COLOR_ATTACHMENT0,
          A.TEXTURE_CUBE_MAP_POSITIVE_X + U,
          ye.__webglTexture,
          X,
        );
      } else if (Se) {
        const ye = U;
        for (let Pe = 0; Pe < M.textures.length; Pe++) {
          const Ie = _.get(M.textures[Pe]);
          A.framebufferTextureLayer(
            A.FRAMEBUFFER,
            A.COLOR_ATTACHMENT0 + Pe,
            Ie.__webglTexture,
            X,
            ye,
          );
        }
      } else if (M !== null && X !== 0) {
        const ye = _.get(M.texture);
        A.framebufferTexture2D(
          A.FRAMEBUFFER,
          A.COLOR_ATTACHMENT0,
          A.TEXTURE_2D,
          ye.__webglTexture,
          X,
        );
      }
      H = -1;
    }),
      (this.readRenderTargetPixels = function (M, U, X, k, z, Se, Ae, ye = 0) {
        if (!(M && M.isWebGLRenderTarget)) {
          Qe(
            "WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.",
          );
          return;
        }
        let Pe = _.get(M).__webglFramebuffer;
        if ((M.isWebGLCubeRenderTarget && Ae !== void 0 && (Pe = Pe[Ae]), Pe)) {
          de.bindFramebuffer(A.FRAMEBUFFER, Pe);
          try {
            const Ie = M.textures[ye],
              ke = Ie.format,
              qe = Ie.type;
            if (
              (M.textures.length > 1 && A.readBuffer(A.COLOR_ATTACHMENT0 + ye),
              !ze.textureFormatReadable(ke))
            ) {
              Qe(
                "WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.",
              );
              return;
            }
            if (!ze.textureTypeReadable(qe)) {
              Qe(
                "WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.",
              );
              return;
            }
            U >= 0 &&
              U <= M.width - k &&
              X >= 0 &&
              X <= M.height - z &&
              A.readPixels(U, X, k, z, re.convert(ke), re.convert(qe), Se);
          } finally {
            const Ie = G !== null ? _.get(G).__webglFramebuffer : null;
            de.bindFramebuffer(A.FRAMEBUFFER, Ie);
          }
        }
      }),
      (this.readRenderTargetPixelsAsync = async function (
        M,
        U,
        X,
        k,
        z,
        Se,
        Ae,
        ye = 0,
      ) {
        if (!(M && M.isWebGLRenderTarget))
          throw new Error(
            "THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.",
          );
        let Pe = _.get(M).__webglFramebuffer;
        if ((M.isWebGLCubeRenderTarget && Ae !== void 0 && (Pe = Pe[Ae]), Pe))
          if (U >= 0 && U <= M.width - k && X >= 0 && X <= M.height - z) {
            de.bindFramebuffer(A.FRAMEBUFFER, Pe);
            const Ie = M.textures[ye],
              ke = Ie.format,
              qe = Ie.type;
            if (
              (M.textures.length > 1 && A.readBuffer(A.COLOR_ATTACHMENT0 + ye),
              !ze.textureFormatReadable(ke))
            )
              throw new Error(
                "THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.",
              );
            if (!ze.textureTypeReadable(qe))
              throw new Error(
                "THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.",
              );
            const Oe = A.createBuffer();
            (A.bindBuffer(A.PIXEL_PACK_BUFFER, Oe),
              A.bufferData(A.PIXEL_PACK_BUFFER, Se.byteLength, A.STREAM_READ),
              A.readPixels(U, X, k, z, re.convert(ke), re.convert(qe), 0));
            const rt = G !== null ? _.get(G).__webglFramebuffer : null;
            de.bindFramebuffer(A.FRAMEBUFFER, rt);
            const pt = A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE, 0);
            return (
              A.flush(),
              await Lu(A, pt, 4),
              A.bindBuffer(A.PIXEL_PACK_BUFFER, Oe),
              A.getBufferSubData(A.PIXEL_PACK_BUFFER, 0, Se),
              A.deleteBuffer(Oe),
              A.deleteSync(pt),
              Se
            );
          } else
            throw new Error(
              "THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.",
            );
      }),
      (this.copyFramebufferToTexture = function (M, U = null, X = 0) {
        const k = Math.pow(2, -X),
          z = Math.floor(M.image.width * k),
          Se = Math.floor(M.image.height * k),
          Ae = U !== null ? U.x : 0,
          ye = U !== null ? U.y : 0;
        (I.setTexture2D(M, 0),
          A.copyTexSubImage2D(A.TEXTURE_2D, X, 0, 0, Ae, ye, z, Se),
          de.unbindTexture());
      }));
    const $c = A.createFramebuffer(),
      Kc = A.createFramebuffer();
    ((this.copyTextureToTexture = function (
      M,
      U,
      X = null,
      k = null,
      z = 0,
      Se = 0,
    ) {
      let Ae, ye, Pe, Ie, ke, qe, Oe, rt, pt;
      const ft = M.isCompressedTexture ? M.mipmaps[Se] : M.image;
      if (X !== null)
        ((Ae = X.max.x - X.min.x),
          (ye = X.max.y - X.min.y),
          (Pe = X.isBox3 ? X.max.z - X.min.z : 1),
          (Ie = X.min.x),
          (ke = X.min.y),
          (qe = X.isBox3 ? X.min.z : 0));
      else {
        const yt = Math.pow(2, -z);
        ((Ae = Math.floor(ft.width * yt)),
          (ye = Math.floor(ft.height * yt)),
          M.isDataArrayTexture
            ? (Pe = ft.depth)
            : M.isData3DTexture
              ? (Pe = Math.floor(ft.depth * yt))
              : (Pe = 1),
          (Ie = 0),
          (ke = 0),
          (qe = 0));
      }
      k !== null
        ? ((Oe = k.x), (rt = k.y), (pt = k.z))
        : ((Oe = 0), (rt = 0), (pt = 0));
      const at = re.convert(U.format),
        Tt = re.convert(U.type);
      let Le;
      (U.isData3DTexture
        ? (I.setTexture3D(U, 0), (Le = A.TEXTURE_3D))
        : U.isDataArrayTexture || U.isCompressedArrayTexture
          ? (I.setTexture2DArray(U, 0), (Le = A.TEXTURE_2D_ARRAY))
          : (I.setTexture2D(U, 0), (Le = A.TEXTURE_2D)),
        A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL, U.flipY),
        A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL, U.premultiplyAlpha),
        A.pixelStorei(A.UNPACK_ALIGNMENT, U.unpackAlignment));
      const Bt = A.getParameter(A.UNPACK_ROW_LENGTH),
        nt = A.getParameter(A.UNPACK_IMAGE_HEIGHT),
        qt = A.getParameter(A.UNPACK_SKIP_PIXELS),
        en = A.getParameter(A.UNPACK_SKIP_ROWS),
        Fn = A.getParameter(A.UNPACK_SKIP_IMAGES);
      (A.pixelStorei(A.UNPACK_ROW_LENGTH, ft.width),
        A.pixelStorei(A.UNPACK_IMAGE_HEIGHT, ft.height),
        A.pixelStorei(A.UNPACK_SKIP_PIXELS, Ie),
        A.pixelStorei(A.UNPACK_SKIP_ROWS, ke),
        A.pixelStorei(A.UNPACK_SKIP_IMAGES, qe));
      const ti = M.isDataArrayTexture || M.isData3DTexture,
        lt = U.isDataArrayTexture || U.isData3DTexture;
      if (M.isDepthTexture) {
        const yt = _.get(M),
          Sn = _.get(U),
          vt = _.get(yt.__renderTarget),
          yn = _.get(Sn.__renderTarget);
        (de.bindFramebuffer(A.READ_FRAMEBUFFER, vt.__webglFramebuffer),
          de.bindFramebuffer(A.DRAW_FRAMEBUFFER, yn.__webglFramebuffer));
        for (let ni = 0; ni < Pe; ni++)
          (ti &&
            (A.framebufferTextureLayer(
              A.READ_FRAMEBUFFER,
              A.COLOR_ATTACHMENT0,
              _.get(M).__webglTexture,
              z,
              qe + ni,
            ),
            A.framebufferTextureLayer(
              A.DRAW_FRAMEBUFFER,
              A.COLOR_ATTACHMENT0,
              _.get(U).__webglTexture,
              Se,
              pt + ni,
            )),
            A.blitFramebuffer(
              Ie,
              ke,
              Ae,
              ye,
              Oe,
              rt,
              Ae,
              ye,
              A.DEPTH_BUFFER_BIT,
              A.NEAREST,
            ));
        (de.bindFramebuffer(A.READ_FRAMEBUFFER, null),
          de.bindFramebuffer(A.DRAW_FRAMEBUFFER, null));
      } else if (z !== 0 || M.isRenderTargetTexture || _.has(M)) {
        const yt = _.get(M),
          Sn = _.get(U);
        (de.bindFramebuffer(A.READ_FRAMEBUFFER, $c),
          de.bindFramebuffer(A.DRAW_FRAMEBUFFER, Kc));
        for (let vt = 0; vt < Pe; vt++)
          (ti
            ? A.framebufferTextureLayer(
                A.READ_FRAMEBUFFER,
                A.COLOR_ATTACHMENT0,
                yt.__webglTexture,
                z,
                qe + vt,
              )
            : A.framebufferTexture2D(
                A.READ_FRAMEBUFFER,
                A.COLOR_ATTACHMENT0,
                A.TEXTURE_2D,
                yt.__webglTexture,
                z,
              ),
            lt
              ? A.framebufferTextureLayer(
                  A.DRAW_FRAMEBUFFER,
                  A.COLOR_ATTACHMENT0,
                  Sn.__webglTexture,
                  Se,
                  pt + vt,
                )
              : A.framebufferTexture2D(
                  A.DRAW_FRAMEBUFFER,
                  A.COLOR_ATTACHMENT0,
                  A.TEXTURE_2D,
                  Sn.__webglTexture,
                  Se,
                ),
            z !== 0
              ? A.blitFramebuffer(
                  Ie,
                  ke,
                  Ae,
                  ye,
                  Oe,
                  rt,
                  Ae,
                  ye,
                  A.COLOR_BUFFER_BIT,
                  A.NEAREST,
                )
              : lt
                ? A.copyTexSubImage3D(Le, Se, Oe, rt, pt + vt, Ie, ke, Ae, ye)
                : A.copyTexSubImage2D(Le, Se, Oe, rt, Ie, ke, Ae, ye));
        (de.bindFramebuffer(A.READ_FRAMEBUFFER, null),
          de.bindFramebuffer(A.DRAW_FRAMEBUFFER, null));
      } else
        lt
          ? M.isDataTexture || M.isData3DTexture
            ? A.texSubImage3D(Le, Se, Oe, rt, pt, Ae, ye, Pe, at, Tt, ft.data)
            : U.isCompressedArrayTexture
              ? A.compressedTexSubImage3D(
                  Le,
                  Se,
                  Oe,
                  rt,
                  pt,
                  Ae,
                  ye,
                  Pe,
                  at,
                  ft.data,
                )
              : A.texSubImage3D(Le, Se, Oe, rt, pt, Ae, ye, Pe, at, Tt, ft)
          : M.isDataTexture
            ? A.texSubImage2D(A.TEXTURE_2D, Se, Oe, rt, Ae, ye, at, Tt, ft.data)
            : M.isCompressedTexture
              ? A.compressedTexSubImage2D(
                  A.TEXTURE_2D,
                  Se,
                  Oe,
                  rt,
                  ft.width,
                  ft.height,
                  at,
                  ft.data,
                )
              : A.texSubImage2D(A.TEXTURE_2D, Se, Oe, rt, Ae, ye, at, Tt, ft);
      (A.pixelStorei(A.UNPACK_ROW_LENGTH, Bt),
        A.pixelStorei(A.UNPACK_IMAGE_HEIGHT, nt),
        A.pixelStorei(A.UNPACK_SKIP_PIXELS, qt),
        A.pixelStorei(A.UNPACK_SKIP_ROWS, en),
        A.pixelStorei(A.UNPACK_SKIP_IMAGES, Fn),
        Se === 0 && U.generateMipmaps && A.generateMipmap(Le),
        de.unbindTexture());
    }),
      (this.initRenderTarget = function (M) {
        _.get(M).__webglFramebuffer === void 0 && I.setupRenderTarget(M);
      }),
      (this.initTexture = function (M) {
        (M.isCubeTexture
          ? I.setTextureCube(M, 0)
          : M.isData3DTexture
            ? I.setTexture3D(M, 0)
            : M.isDataArrayTexture || M.isCompressedArrayTexture
              ? I.setTexture2DArray(M, 0)
              : I.setTexture2D(M, 0),
          de.unbindTexture());
      }),
      (this.resetState = function () {
        ((C = 0), (V = 0), (G = null), de.reset(), oe.reset());
      }),
      typeof __THREE_DEVTOOLS__ < "u" &&
        __THREE_DEVTOOLS__.dispatchEvent(
          new CustomEvent("observe", { detail: this }),
        ));
  }
  get coordinateSystem() {
    return rn;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    ((t.drawingBufferColorSpace = et._getDrawingBufferColorSpace(e)),
      (t.unpackColorSpace = et._getUnpackColorSpace()));
  }
}
const sr = {
  name: "CopyShader",
  uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`,
};
class Bi {
  constructor() {
    ((this.isPass = !0),
      (this.enabled = !0),
      (this.needsSwap = !0),
      (this.clear = !1),
      (this.renderToScreen = !1));
  }
  setSize() {}
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  dispose() {}
}
const a0 = new _r(-1, 1, 1, -1, 0, 1);
class o0 extends ut {
  constructor() {
    (super(),
      this.setAttribute("position", new $e([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)),
      this.setAttribute("uv", new $e([0, 2, 0, 0, 2, 0], 2)));
  }
}
const l0 = new o0();
class Do {
  constructor(e) {
    this._mesh = new je(l0, e);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(e) {
    e.render(this._mesh, a0);
  }
  get material() {
    return this._mesh.material;
  }
  set material(e) {
    this._mesh.material = e;
  }
}
class c0 extends Bi {
  constructor(e, t = "tDiffuse") {
    (super(),
      (this.textureID = t),
      (this.uniforms = null),
      (this.material = null),
      e instanceof Rt
        ? ((this.uniforms = e.uniforms), (this.material = e))
        : e &&
          ((this.uniforms = ds.clone(e.uniforms)),
          (this.material = new Rt({
            name: e.name !== void 0 ? e.name : "unspecified",
            defines: Object.assign({}, e.defines),
            uniforms: this.uniforms,
            vertexShader: e.vertexShader,
            fragmentShader: e.fragmentShader,
          }))),
      (this._fsQuad = new Do(this.material)));
  }
  render(e, t, n) {
    (this.uniforms[this.textureID] &&
      (this.uniforms[this.textureID].value = n.texture),
      (this._fsQuad.material = this.material),
      this.renderToScreen
        ? (e.setRenderTarget(null), this._fsQuad.render(e))
        : (e.setRenderTarget(t),
          this.clear &&
            e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
          this._fsQuad.render(e)));
  }
  dispose() {
    (this.material.dispose(), this._fsQuad.dispose());
  }
}
class ec extends Bi {
  constructor(e, t) {
    (super(),
      (this.scene = e),
      (this.camera = t),
      (this.clear = !0),
      (this.needsSwap = !1),
      (this.inverse = !1));
  }
  render(e, t, n) {
    const s = e.getContext(),
      r = e.state;
    (r.buffers.color.setMask(!1),
      r.buffers.depth.setMask(!1),
      r.buffers.color.setLocked(!0),
      r.buffers.depth.setLocked(!0));
    let a, o;
    (this.inverse ? ((a = 0), (o = 1)) : ((a = 1), (o = 0)),
      r.buffers.stencil.setTest(!0),
      r.buffers.stencil.setOp(s.REPLACE, s.REPLACE, s.REPLACE),
      r.buffers.stencil.setFunc(s.ALWAYS, a, 4294967295),
      r.buffers.stencil.setClear(o),
      r.buffers.stencil.setLocked(!0),
      e.setRenderTarget(n),
      this.clear && e.clear(),
      e.render(this.scene, this.camera),
      e.setRenderTarget(t),
      this.clear && e.clear(),
      e.render(this.scene, this.camera),
      r.buffers.color.setLocked(!1),
      r.buffers.depth.setLocked(!1),
      r.buffers.color.setMask(!0),
      r.buffers.depth.setMask(!0),
      r.buffers.stencil.setLocked(!1),
      r.buffers.stencil.setFunc(s.EQUAL, 1, 4294967295),
      r.buffers.stencil.setOp(s.KEEP, s.KEEP, s.KEEP),
      r.buffers.stencil.setLocked(!0));
  }
}
class u0 extends Bi {
  constructor() {
    (super(), (this.needsSwap = !1));
  }
  render(e) {
    (e.state.buffers.stencil.setLocked(!1),
      e.state.buffers.stencil.setTest(!1));
  }
}
class h0 {
  constructor(e, t) {
    if (
      ((this.renderer = e),
      (this._pixelRatio = e.getPixelRatio()),
      t === void 0)
    ) {
      const n = e.getSize(new ue());
      ((this._width = n.width),
        (this._height = n.height),
        (t = new It(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio,
          { type: Ot },
        )),
        (t.texture.name = "EffectComposer.rt1"));
    } else ((this._width = t.width), (this._height = t.height));
    ((this.renderTarget1 = t),
      (this.renderTarget2 = t.clone()),
      (this.renderTarget2.texture.name = "EffectComposer.rt2"),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2),
      (this.renderToScreen = !0),
      (this.passes = []),
      (this.copyPass = new c0(sr)),
      (this.copyPass.material.blending = an),
      (this.timer = new cf()));
  }
  swapBuffers() {
    const e = this.readBuffer;
    ((this.readBuffer = this.writeBuffer), (this.writeBuffer = e));
  }
  addPass(e) {
    (this.passes.push(e),
      e.setSize(
        this._width * this._pixelRatio,
        this._height * this._pixelRatio,
      ));
  }
  insertPass(e, t) {
    (this.passes.splice(t, 0, e),
      e.setSize(
        this._width * this._pixelRatio,
        this._height * this._pixelRatio,
      ));
  }
  removePass(e) {
    const t = this.passes.indexOf(e);
    t !== -1 && this.passes.splice(t, 1);
  }
  isLastEnabledPass(e) {
    for (let t = e + 1; t < this.passes.length; t++)
      if (this.passes[t].enabled) return !1;
    return !0;
  }
  render(e) {
    (this.timer.update(), e === void 0 && (e = this.timer.getDelta()));
    const t = this.renderer.getRenderTarget();
    let n = !1;
    for (let s = 0, r = this.passes.length; s < r; s++) {
      const a = this.passes[s];
      if (a.enabled !== !1) {
        if (
          ((a.renderToScreen =
            this.renderToScreen && this.isLastEnabledPass(s)),
          a.render(this.renderer, this.writeBuffer, this.readBuffer, e, n),
          a.needsSwap)
        ) {
          if (n) {
            const o = this.renderer.getContext(),
              c = this.renderer.state.buffers.stencil;
            (c.setFunc(o.NOTEQUAL, 1, 4294967295),
              this.copyPass.render(
                this.renderer,
                this.writeBuffer,
                this.readBuffer,
                e,
              ),
              c.setFunc(o.EQUAL, 1, 4294967295));
          }
          this.swapBuffers();
        }
        ec !== void 0 &&
          (a instanceof ec ? (n = !0) : a instanceof u0 && (n = !1));
      }
    }
    this.renderer.setRenderTarget(t);
  }
  reset(e) {
    if (e === void 0) {
      const t = this.renderer.getSize(new ue());
      ((this._pixelRatio = this.renderer.getPixelRatio()),
        (this._width = t.width),
        (this._height = t.height),
        (e = this.renderTarget1.clone()),
        e.setSize(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio,
        ));
    }
    (this.renderTarget1.dispose(),
      this.renderTarget2.dispose(),
      (this.renderTarget1 = e),
      (this.renderTarget2 = e.clone()),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2));
  }
  setSize(e, t) {
    ((this._width = e), (this._height = t));
    const n = this._width * this._pixelRatio,
      s = this._height * this._pixelRatio;
    (this.renderTarget1.setSize(n, s), this.renderTarget2.setSize(n, s));
    for (let r = 0; r < this.passes.length; r++) this.passes[r].setSize(n, s);
  }
  setPixelRatio(e) {
    ((this._pixelRatio = e), this.setSize(this._width, this._height));
  }
  dispose() {
    (this.renderTarget1.dispose(),
      this.renderTarget2.dispose(),
      this.copyPass.dispose());
  }
}
class f0 extends Bi {
  constructor(e, t, n = null, s = null, r = null) {
    (super(),
      (this.scene = e),
      (this.camera = t),
      (this.overrideMaterial = n),
      (this.clearColor = s),
      (this.clearAlpha = r),
      (this.clear = !0),
      (this.clearDepth = !1),
      (this.needsSwap = !1),
      (this.isRenderPass = !0),
      (this._oldClearColor = new He()));
  }
  render(e, t, n) {
    const s = e.autoClear;
    e.autoClear = !1;
    let r, a;
    (this.overrideMaterial !== null &&
      ((a = this.scene.overrideMaterial),
      (this.scene.overrideMaterial = this.overrideMaterial)),
      this.clearColor !== null &&
        (e.getClearColor(this._oldClearColor),
        e.setClearColor(this.clearColor, e.getClearAlpha())),
      this.clearAlpha !== null &&
        ((r = e.getClearAlpha()), e.setClearAlpha(this.clearAlpha)),
      this.clearDepth == !0 && e.clearDepth(),
      e.setRenderTarget(this.renderToScreen ? null : n),
      this.clear === !0 &&
        e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
      e.render(this.scene, this.camera),
      this.clearColor !== null && e.setClearColor(this._oldClearColor),
      this.clearAlpha !== null && e.setClearAlpha(r),
      this.overrideMaterial !== null && (this.scene.overrideMaterial = a),
      (e.autoClear = s));
  }
}
const d0 = {
  uniforms: {
    tDiffuse: { value: null },
    luminosityThreshold: { value: 1 },
    smoothWidth: { value: 1 },
    defaultColor: { value: new He(0) },
    defaultOpacity: { value: 0 },
  },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`,
};
class Pi extends Bi {
  constructor(e, t = 1, n, s) {
    (super(),
      (this.strength = t),
      (this.radius = n),
      (this.threshold = s),
      (this.resolution = e !== void 0 ? new ue(e.x, e.y) : new ue(256, 256)),
      (this.clearColor = new He(0, 0, 0)),
      (this.needsSwap = !1),
      (this.renderTargetsHorizontal = []),
      (this.renderTargetsVertical = []),
      (this.nMips = 5));
    let r = Math.round(this.resolution.x / 2),
      a = Math.round(this.resolution.y / 2);
    ((this.renderTargetBright = new It(r, a, { type: Ot })),
      (this.renderTargetBright.texture.name = "UnrealBloomPass.bright"),
      (this.renderTargetBright.texture.generateMipmaps = !1));
    for (let u = 0; u < this.nMips; u++) {
      const f = new It(r, a, { type: Ot });
      ((f.texture.name = "UnrealBloomPass.h" + u),
        (f.texture.generateMipmaps = !1),
        this.renderTargetsHorizontal.push(f));
      const h = new It(r, a, { type: Ot });
      ((h.texture.name = "UnrealBloomPass.v" + u),
        (h.texture.generateMipmaps = !1),
        this.renderTargetsVertical.push(h),
        (r = Math.round(r / 2)),
        (a = Math.round(a / 2)));
    }
    const o = d0;
    ((this.highPassUniforms = ds.clone(o.uniforms)),
      (this.highPassUniforms.luminosityThreshold.value = s),
      (this.highPassUniforms.smoothWidth.value = 0.01),
      (this.materialHighPassFilter = new Rt({
        uniforms: this.highPassUniforms,
        vertexShader: o.vertexShader,
        fragmentShader: o.fragmentShader,
      })),
      (this.separableBlurMaterials = []));
    const c = [6, 10, 14, 18, 22];
    ((r = Math.round(this.resolution.x / 2)),
      (a = Math.round(this.resolution.y / 2)));
    for (let u = 0; u < this.nMips; u++)
      (this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),
        (this.separableBlurMaterials[u].uniforms.invSize.value = new ue(
          1 / r,
          1 / a,
        )),
        (r = Math.round(r / 2)),
        (a = Math.round(a / 2)));
    ((this.compositeMaterial = this._getCompositeMaterial(this.nMips)),
      (this.compositeMaterial.uniforms.blurTexture1.value =
        this.renderTargetsVertical[0].texture),
      (this.compositeMaterial.uniforms.blurTexture2.value =
        this.renderTargetsVertical[1].texture),
      (this.compositeMaterial.uniforms.blurTexture3.value =
        this.renderTargetsVertical[2].texture),
      (this.compositeMaterial.uniforms.blurTexture4.value =
        this.renderTargetsVertical[3].texture),
      (this.compositeMaterial.uniforms.blurTexture5.value =
        this.renderTargetsVertical[4].texture),
      (this.compositeMaterial.uniforms.bloomStrength.value = t),
      (this.compositeMaterial.uniforms.bloomRadius.value = 0.1));
    const l = [1, 0.8, 0.6, 0.4, 0.2];
    ((this.compositeMaterial.uniforms.bloomFactors.value = l),
      (this.bloomTintColors = [
        new D(1, 1, 1),
        new D(1, 1, 1),
        new D(1, 1, 1),
        new D(1, 1, 1),
        new D(1, 1, 1),
      ]),
      (this.compositeMaterial.uniforms.bloomTintColors.value =
        this.bloomTintColors),
      (this.copyUniforms = ds.clone(sr.uniforms)),
      (this.blendMaterial = new Rt({
        uniforms: this.copyUniforms,
        vertexShader: sr.vertexShader,
        fragmentShader: sr.fragmentShader,
        premultipliedAlpha: !0,
        blending: rr,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0,
      })),
      (this._oldClearColor = new He()),
      (this._oldClearAlpha = 1),
      (this._basic = new Mt()),
      (this._fsQuad = new Do(null)));
  }
  dispose() {
    for (let e = 0; e < this.renderTargetsHorizontal.length; e++)
      this.renderTargetsHorizontal[e].dispose();
    for (let e = 0; e < this.renderTargetsVertical.length; e++)
      this.renderTargetsVertical[e].dispose();
    this.renderTargetBright.dispose();
    for (let e = 0; e < this.separableBlurMaterials.length; e++)
      this.separableBlurMaterials[e].dispose();
    (this.compositeMaterial.dispose(),
      this.blendMaterial.dispose(),
      this._basic.dispose(),
      this._fsQuad.dispose());
  }
  setSize(e, t) {
    let n = Math.round(e / 2),
      s = Math.round(t / 2);
    this.renderTargetBright.setSize(n, s);
    for (let r = 0; r < this.nMips; r++)
      (this.renderTargetsHorizontal[r].setSize(n, s),
        this.renderTargetsVertical[r].setSize(n, s),
        (this.separableBlurMaterials[r].uniforms.invSize.value = new ue(
          1 / n,
          1 / s,
        )),
        (n = Math.round(n / 2)),
        (s = Math.round(s / 2)));
  }
  render(e, t, n, s, r) {
    (e.getClearColor(this._oldClearColor),
      (this._oldClearAlpha = e.getClearAlpha()));
    const a = e.autoClear;
    ((e.autoClear = !1),
      e.setClearColor(this.clearColor, 0),
      r && e.state.buffers.stencil.setTest(!1),
      this.renderToScreen &&
        ((this._fsQuad.material = this._basic),
        (this._basic.map = n.texture),
        e.setRenderTarget(null),
        e.clear(),
        this._fsQuad.render(e)),
      (this.highPassUniforms.tDiffuse.value = n.texture),
      (this.highPassUniforms.luminosityThreshold.value = this.threshold),
      (this._fsQuad.material = this.materialHighPassFilter),
      e.setRenderTarget(this.renderTargetBright),
      e.clear(),
      this._fsQuad.render(e));
    let o = this.renderTargetBright;
    for (let c = 0; c < this.nMips; c++)
      ((this._fsQuad.material = this.separableBlurMaterials[c]),
        (this.separableBlurMaterials[c].uniforms.colorTexture.value =
          o.texture),
        (this.separableBlurMaterials[c].uniforms.direction.value =
          Pi.BlurDirectionX),
        e.setRenderTarget(this.renderTargetsHorizontal[c]),
        e.clear(),
        this._fsQuad.render(e),
        (this.separableBlurMaterials[c].uniforms.colorTexture.value =
          this.renderTargetsHorizontal[c].texture),
        (this.separableBlurMaterials[c].uniforms.direction.value =
          Pi.BlurDirectionY),
        e.setRenderTarget(this.renderTargetsVertical[c]),
        e.clear(),
        this._fsQuad.render(e),
        (o = this.renderTargetsVertical[c]));
    ((this._fsQuad.material = this.compositeMaterial),
      (this.compositeMaterial.uniforms.bloomStrength.value = this.strength),
      (this.compositeMaterial.uniforms.bloomRadius.value = this.radius),
      (this.compositeMaterial.uniforms.bloomTintColors.value =
        this.bloomTintColors),
      e.setRenderTarget(this.renderTargetsHorizontal[0]),
      e.clear(),
      this._fsQuad.render(e),
      (this._fsQuad.material = this.blendMaterial),
      (this.copyUniforms.tDiffuse.value =
        this.renderTargetsHorizontal[0].texture),
      r && e.state.buffers.stencil.setTest(!0),
      this.renderToScreen
        ? (e.setRenderTarget(null), this._fsQuad.render(e))
        : (e.setRenderTarget(n), this._fsQuad.render(e)),
      e.setClearColor(this._oldClearColor, this._oldClearAlpha),
      (e.autoClear = a));
  }
  _getSeparableBlurMaterial(e) {
    const t = [],
      n = e / 3;
    for (let s = 0; s < e; s++)
      t.push((0.39894 * Math.exp((-0.5 * s * s) / (n * n))) / n);
    return new Rt({
      defines: { KERNEL_RADIUS: e },
      uniforms: {
        colorTexture: { value: null },
        invSize: { value: new ue(0.5, 0.5) },
        direction: { value: new ue(0.5, 0.5) },
        gaussianCoefficients: { value: t },
      },
      vertexShader: `

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,
      fragmentShader: `

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`,
    });
  }
  _getCompositeMaterial(e) {
    return new Rt({
      defines: { NUM_MIPS: e },
      uniforms: {
        blurTexture1: { value: null },
        blurTexture2: { value: null },
        blurTexture3: { value: null },
        blurTexture4: { value: null },
        blurTexture5: { value: null },
        bloomStrength: { value: 1 },
        bloomFactors: { value: null },
        bloomTintColors: { value: null },
        bloomRadius: { value: 0 },
      },
      vertexShader: `

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,
      fragmentShader: `

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`,
    });
  }
}
Pi.BlurDirectionX = new ue(1, 0);
Pi.BlurDirectionY = new ue(0, 1);
const Zs = {
  name: "OutputShader",
  uniforms: { tDiffuse: { value: null }, toneMappingExposure: { value: 1 } },
  vertexShader: `
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`,
};
class p0 extends Bi {
  constructor() {
    (super(),
      (this.isOutputPass = !0),
      (this.uniforms = ds.clone(Zs.uniforms)),
      (this.material = new Nc({
        name: Zs.name,
        uniforms: this.uniforms,
        vertexShader: Zs.vertexShader,
        fragmentShader: Zs.fragmentShader,
      })),
      (this._fsQuad = new Do(this.material)),
      (this._outputColorSpace = null),
      (this._toneMapping = null));
  }
  render(e, t, n) {
    ((this.uniforms.tDiffuse.value = n.texture),
      (this.uniforms.toneMappingExposure.value = e.toneMappingExposure),
      (this._outputColorSpace !== e.outputColorSpace ||
        this._toneMapping !== e.toneMapping) &&
        ((this._outputColorSpace = e.outputColorSpace),
        (this._toneMapping = e.toneMapping),
        (this.material.defines = {}),
        et.getTransfer(this._outputColorSpace) === it &&
          (this.material.defines.SRGB_TRANSFER = ""),
        this._toneMapping === so
          ? (this.material.defines.LINEAR_TONE_MAPPING = "")
          : this._toneMapping === ro
            ? (this.material.defines.REINHARD_TONE_MAPPING = "")
            : this._toneMapping === ao
              ? (this.material.defines.CINEON_TONE_MAPPING = "")
              : this._toneMapping === oo
                ? (this.material.defines.ACES_FILMIC_TONE_MAPPING = "")
                : this._toneMapping === co
                  ? (this.material.defines.AGX_TONE_MAPPING = "")
                  : this._toneMapping === uo
                    ? (this.material.defines.NEUTRAL_TONE_MAPPING = "")
                    : this._toneMapping === lo &&
                      (this.material.defines.CUSTOM_TONE_MAPPING = ""),
        (this.material.needsUpdate = !0)),
      this.renderToScreen === !0
        ? (e.setRenderTarget(null), this._fsQuad.render(e))
        : (e.setRenderTarget(t),
          this.clear &&
            e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
          this._fsQuad.render(e)));
  }
  dispose() {
    (this.material.dispose(), this._fsQuad.dispose());
  }
}
const tc = new He("#00e5ed"),
  nc = new He("#b0f76a"),
  $s = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Rn(i, e, t) {
  const n = -i / 2,
    s = -e / 2,
    r = new gr();
  return (
    r.moveTo(n + t, s),
    r.lineTo(n + i - t, s),
    r.quadraticCurveTo(n + i, s, n + i, s + t),
    r.lineTo(n + i, s + e - t),
    r.quadraticCurveTo(n + i, s + e, n + i - t, s + e),
    r.lineTo(n + t, s + e),
    r.quadraticCurveTo(n, s + e, n, s + e - t),
    r.lineTo(n, s + t),
    r.quadraticCurveTo(n, s, n + t, s),
    r
  );
}
function ic(i, e, t) {
  const n = new fs(Rn(i, e, t), 20),
    s = n.attributes.position,
    r = n.attributes.uv;
  for (let a = 0; a < s.count; a++)
    r.setXY(a, (s.getX(a) + i / 2) / i, (s.getY(a) + e / 2) / e);
  return n;
}
function ps(i, e, t) {
  const n = document.createElement("canvas");
  ((n.width = i), (n.height = e));
  const s = n.getContext("2d");
  t(s);
  const r = new vh(n);
  return ((r.colorSpace = Nt), (r.anisotropy = 8), r);
}
function m0() {
  return ps(1024, 1024, (i) => {
    const e = i.createImageData(1024, 1024);
    let t = 729;
    for (let n = 0; n < e.data.length; n += 4) {
      t = (t * 16807) % 2147483647;
      const s = (t / 2147483647) * 7;
      ((e.data[n] = 24 + s),
        (e.data[n + 1] = 31 + s),
        (e.data[n + 2] = 35 + s),
        (e.data[n + 3] = 255));
    }
    i.putImageData(e, 0, 0);
  });
}
function g0(i, e, t) {
  if (
    (i.save(),
    i.translate(256, 155),
    i.scale(1.14, 1.14),
    (i.strokeStyle = t),
    (i.fillStyle = t),
    (i.lineWidth = 5),
    (i.lineCap = "round"),
    (i.lineJoin = "round"),
    (i.textAlign = "center"),
    e === "php")
  )
    (i.beginPath(),
      i.ellipse(0, 0, 82, 45, 0, 0, Math.PI * 2),
      i.stroke(),
      (i.font = 'italic 600 58px "DM Sans", sans-serif'),
      i.fillText("php", -3, 18));
  else if (e === "js")
    ((i.lineWidth = 4),
      i.strokeRect(-60, -52, 120, 108),
      (i.font = '600 69px "DM Sans", sans-serif'),
      i.fillText("JS", 2, 34));
  else if (e === "magento" || e === "node" || e === "nest") {
    i.beginPath();
    for (let n = 0; n < 6; n++) {
      const s = (Math.PI / 3) * n - Math.PI / 2,
        r = Math.cos(s) * 61,
        a = Math.sin(s) * 61;
      n === 0 ? i.moveTo(r, a) : i.lineTo(r, a);
    }
    (i.closePath(),
      i.stroke(),
      (i.font = '600 60px "DM Sans", sans-serif'),
      i.fillText(e === "node" ? "JS" : e === "magento" ? "M" : "N", 0, 22));
  } else if (e === "angular")
    (i.beginPath(),
      i.moveTo(0, -66),
      i.lineTo(62, -43),
      i.lineTo(51, 38),
      i.lineTo(0, 68),
      i.lineTo(-51, 38),
      i.lineTo(-62, -43),
      i.closePath(),
      i.stroke(),
      (i.font = '600 84px "DM Sans", sans-serif'),
      i.fillText("A", 0, 30));
  else if (e === "hyperleder-fabric") {
    const n = [
      [-48, -28],
      [48, -28],
      [0, 50],
    ];
    (i.beginPath(),
      i.moveTo(-24, -28),
      i.lineTo(24, -28),
      i.moveTo(-36, -7),
      i.lineTo(-12, 29),
      i.moveTo(36, -7),
      i.lineTo(12, 29),
      i.stroke());
    for (const [s, r] of n) {
      i.beginPath();
      for (let a = 0; a < 6; a++) {
        const o = (Math.PI / 3) * a,
          c = s + Math.cos(o) * 24,
          l = r + Math.sin(o) * 24;
        a === 0 ? i.moveTo(c, l) : i.lineTo(c, l);
      }
      (i.closePath(), i.stroke());
    }
  }
  i.restore();
}
function _0(i) {
  return ps(512, 448, (e) => {
    const t = e.createLinearGradient(0, 0, 512, 448);
    (t.addColorStop(0, "#151f24"),
      t.addColorStop(0.6, "#11191e"),
      t.addColorStop(1, "#0c1318"),
      (e.fillStyle = t),
      e.fillRect(0, 0, 512, 448));
    let n = 431;
    for (let r = 0; r < 11e3; r++) {
      n = (n * 16807) % 2147483647;
      const a = n % 512;
      ((n = (n * 16807) % 2147483647),
        (e.fillStyle = r % 2 ? "#ffffff04" : "#00000009"),
        e.fillRect(a, n % 448, 1, 1));
    }
    (g0(e, i.id, i.color),
      (e.fillStyle = "#edf2f2"),
      (e.textAlign = "center"),
      (e.font = '400 59px "DM Sans", sans-serif'));
    const s = i.lines ?? [i.title];
    s.forEach((r, a) =>
      e.fillText(r, 256, s.length > 1 ? 303 + a * 58 : 324, 448),
    );
  });
}
function v0(i) {
  return ps(128, 128, (e) => {
    const t = e.createRadialGradient(64, 64, 0, 64, 64, 64);
    (t.addColorStop(0, i + "b0"),
      t.addColorStop(0.25, i + "55"),
      t.addColorStop(0.55, i + "16"),
      t.addColorStop(1, i + "00"),
      (e.fillStyle = t),
      e.fillRect(0, 0, 128, 128));
  });
}
function x0(i, e, t = 0.11) {
  const n = new Rc(),
    s = i.map(([a, o]) => new D(a, o, e));
  let r = s[0];
  for (let a = 1; a < s.length - 1; a++) {
    const o = s[a],
      c = o.clone().add(
        s[a - 1]
          .clone()
          .sub(o)
          .normalize()
          .multiplyScalar(Math.min(t, o.distanceTo(s[a - 1]) / 3)),
      ),
      l = o.clone().add(
        s[a + 1]
          .clone()
          .sub(o)
          .normalize()
          .multiplyScalar(Math.min(t, o.distanceTo(s[a + 1]) / 3)),
      );
    (n.add(new Ka(r, c)), n.add(new Co(c, o, l)), (r = l));
  }
  return (n.add(new Ka(r, s[s.length - 1])), n);
}
function M0(i, e) {
  const t = i.querySelector("canvas"),
    n = new r0({
      canvas: t,
      antialias: !0,
      alpha: !1,
      powerPreference: "high-performance",
    });
  (n.setPixelRatio(Math.min(window.devicePixelRatio, 1.75)),
    n.setClearColor(0, 1),
    (n.outputColorSpace = Nt),
    (n.toneMapping = jt),
    (n.shadowMap.enabled = !0),
    (n.shadowMap.type = oc));
  const s = new lh(),
    r = new Wt(21.5, 1, 0.1, 100);
  (r.position.set(2, -24, 18), r.lookAt(0.4, -1.6, 0));
  const a = new It(1, 1, { type: Ot, samples: 4 }),
    o = new h0(n, a);
  o.addPass(new f0(s, r));
  const c = new Pi(new ue(1, 1), 0.38, 0.3, 1.25);
  (o.addPass(c), o.addPass(new p0()), s.add(new af(11783899, 0.85)));
  const l = new wl(13165292, 0.9);
  (l.position.set(-6, 7, 13),
    (l.castShadow = !0),
    l.shadow.mapSize.set(2048, 2048),
    (l.shadow.camera.left = -10),
    (l.shadow.camera.right = 10),
    (l.shadow.camera.top = 8),
    (l.shadow.camera.bottom = -8),
    (l.shadow.normalBias = 0.025),
    (l.shadow.bias = -2e-4),
    (l.shadow.radius = 3),
    s.add(l));
  const u = new wl(51931, 0.12);
  (u.position.set(-10, -6, 3), s.add(u));
  const f = new Zn();
  ((f.rotation.z = 0.1), (f.scale.y = 1.3), s.add(f));
  const h = 14.8,
    d = 10.35,
    g = m0(),
    x = new is(Rn(h, d, 0.47), {
      depth: 0.27,
      bevelEnabled: !0,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.065,
      bevelThickness: 0.06,
      curveSegments: 28,
    }),
    m = new je(
      x,
      new mi({ color: "#0a1014", metalness: 0.75, roughness: 0.48 }),
    );
  ((m.position.z = -0.36), (m.receiveShadow = !0), f.add(m));
  const p = new is(Rn(h, d, 0.47), {
      depth: 0.075,
      bevelEnabled: !0,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.028,
      bevelThickness: 0.028,
      curveSegments: 28,
    }),
    S = new je(
      p,
      new mi({ color: "#192127", metalness: 0.78, roughness: 0.48 }),
    );
  ((S.position.z = -0.085), (S.receiveShadow = !0), f.add(S));
  const E = new je(
    ic(h - 0.35, d - 0.35, 0.37),
    new mi({ map: g, color: "#828890", metalness: 0.15, roughness: 0.88 }),
  );
  ((E.position.z = 0.009), (E.receiveShadow = !0), f.add(E));
  function y(B, q, K, j, le, ne = 1) {
    const Ce = Rn(B, q, K)
        .getPoints(40)
        .map((re) => new D(re.x, re.y, j)),
      L = new Bs(
        new ut().setFromPoints(Ce),
        new Xn({ color: le, transparent: ne < 1, opacity: ne }),
      );
    return (f.add(L), L);
  }
  (y(h - 0.37, d - 0.37, 0.37, 0.017, "#010506"),
    y(h - 0.43, d - 0.43, 0.36, 0.02, "#718894", 0.24),
    y(h + 0.03, d + 0.03, 0.49, -0.057, "#688591", 0.43));
  const R = Rn(h + 0.15, d + 0.15, 0.49)
      .getPoints(80)
      .map((B) => new D(B.x, B.y, -0.1)),
    w = new ut().setFromPoints(R),
    P = [];
  (R.forEach((B) => {
    const q =
        B.y < -4.5
          ? Math.max(0.03, 1 - (B.x + 5) / 12)
          : B.x < -7
            ? 0.32
            : 0.012,
      K = tc.clone().multiplyScalar(q * 2.5);
    P.push(K.r, K.g, K.b);
  }),
    w.setAttribute("color", new $e(P, 3)),
    f.add(new Bs(w, new Xn({ vertexColors: !0, toneMapped: !1 }))));
  const v = ps(256, 256, (B) => {
    const q = B.createRadialGradient(128, 128, 38, 128, 128, 125);
    (q.addColorStop(0, "#000000e8"),
      q.addColorStop(0.65, "#00000085"),
      q.addColorStop(1, "#00000000"),
      (B.fillStyle = q),
      B.fillRect(0, 0, 256, 256));
  });
  function b(B, q = "#34464d", K = 0.2) {
    const j = new ut().setFromPoints(B.map(([le, ne]) => new D(le, ne, 0.025)));
    f.add(new es(j, new Xn({ color: q, transparent: !0, opacity: K })));
  }
  (b([
    [-6.6, 4.55],
    [-3.9, 4.55],
    [-3.58, 4.22],
    [0.55, 4.22],
    [0.86, 4.55],
    [6.35, 4.55],
  ]),
    b(
      [
        [-6.6, 4.47],
        [-3.96, 4.47],
        [-3.64, 4.14],
        [0.6, 4.14],
        [0.91, 4.47],
        [6.35, 4.47],
      ],
      "#020708",
      0.6,
    ),
    b(
      [
        [2.45, -5.03],
        [2.92, -4.65],
        [7.04, -4.65],
      ],
      "#010406",
      1,
    ),
    b(
      [
        [2.47, -5.05],
        [2.95, -4.7],
        [7.04, -4.7],
      ],
      "#526168",
      0.35,
    ));
  const W = new je(
    new Fi(0.45, 0.023, 0.022),
    new Mt({ color: nc.clone().multiplyScalar(2), toneMapped: !1 }),
  );
  (W.position.set(6.65, -5.23, -0.21), f.add(W));
  const C = new fr(0.014, 0.025, 12),
    V = new mi({ color: "#718b98", metalness: 0.85, roughness: 0.4 });
  for (const [B, q, K, j] of [
    [-6.65, 4.1, 5, 3],
    [-6.65, -4.45, 4, 4],
    [6.45, -4.2, 3, 1],
  ])
    for (let le = 0; le < j; le++)
      for (let ne = 0; ne < K; ne++) {
        if (le === 0 && ne === K - 1 && j > 1) continue;
        const Ce = new je(C, V);
        (Ce.position.set(B + ne * 0.19, q + le * 0.16, 0.035), f.add(Ce));
      }
  const G = [
    {
      color: "#22d8de",
      points: [
        [-4.7, 0.05],
        [-4.7, -0.55],
        [-5.3, -0.55],
        [-5.7, -0.95],
        [-5.7, -1.42],
      ],
    },
    {
      color: "#20e2df",
      points: [
        [-4.7, 0.05],
        [-4.7, -0.55],
        [-4.1, -0.55],
        [-3.7, -0.95],
        [-3.7, -1.42],
      ],
    },
    {
      color: "#20f0e9",
      points: [
        [-1.55, 0.8],
        [-1.55, -0.6],
        [-1.25, -0.9],
        [-1.25, -1.97],
      ],
    },
    {
      color: "#a0ed59",
      points: [
        [1.9, 1.35],
        [1.9, 0.35],
        [1.5, -0.05],
        [1.5, -0.37],
        [1.9, -0.77],
      ],
    },
    {
      color: "#8be652",
      points: [
        [1.9, 1.35],
        [2.75, 0.5],
        [3.25, 0.5],
        [3.55, 0.2],
        [3.55, -3.25],
        [3.1, -3.7],
        [2.72, -3.7],
      ],
    },
    {
      color: "#6ae7ab",
      points: [
        [5.7, 1.75],
        [5.7, 0.9],
        [5.3, 0.5],
        [5.3, 0.03],
      ],
    },
    {
      color: "#9bec5a",
      points: [
        [5.7, 1.75],
        [6.6, 0.85],
        [6.6, -2.6],
        [6.2, -3],
        [6.12, -3],
      ],
    },
  ];
  for (const B of G) {
    const q = B.points.map(([le, ne]) => new D(le, ne, 0.042)),
      K = new ut().setFromPoints(q),
      j = new es(
        K,
        new nf({
          color: B.color,
          dashSize: 0.028,
          gapSize: 0.047,
          transparent: !0,
          opacity: 0.87,
        }),
      );
    (j.computeLineDistances(),
      f.add(j),
      B.points.forEach(([le, ne], Ce) => {
        if (Ce === 0 || (Ce !== B.points.length - 1 && Ce % 2 === 1)) return;
        const L = new je(new Mi(0.028, 16), new Mt({ color: B.color }));
        (L.position.set(le, ne, 0.047), f.add(L));
        const re = new je(
          new fr(0.032, 0.038, 16),
          new Mt({ color: B.color, transparent: !0, opacity: 0.35 }),
        );
        (re.position.copy(L.position), f.add(re));
      }));
  }
  const H = x0(
    [
      [-6.65, -1.43],
      [-5.31, -0.3],
      [-4.7, 0.05],
      [-3.05, 0.12],
      [-2.23, 0.66],
      [-1.55, 0.8],
      [0.33, 0.83],
      [0.98, 1.24],
      [1.9, 1.35],
      [4.6, 1.38],
      [5.04, 1.72],
      [5.7, 1.75],
    ],
    0.093,
  );
  function N(B, q) {
    const K = new Po(H, 280, B, 8, !1),
      j = [],
      le = K.attributes.position;
    for (let Ce = 0; Ce < le.count; Ce++) {
      const L = le.getX(Ce),
        re = un.smoothstep(L, -1, 2.6),
        oe = tc.clone().lerp(nc, re);
      (B < 0.01 && oe.lerp(new He("white"), 0.8),
        oe.multiplyScalar(q),
        j.push(oe.r, oe.g, oe.b));
    }
    K.setAttribute("color", new $e(j, 3));
    const ne = new je(K, new Mt({ vertexColors: !0, toneMapped: !1 }));
    (B < 0.01 && (ne.position.z = 0.017), f.add(ne));
  }
  (N(0.019, 2.6), N(0.007, 4.1));
  const O = [],
    F = new Map(),
    ce = new Map(),
    ie = new Map();
  for (const B of Ht) {
    const [q, K] = B.position,
      j = new Zn();
    (j.position.set(q, K, 0.1), f.add(j), ce.set(B.id, j));
    const le = new He(B.color),
      ne = B.id === Ht[Ht.length - 1].id,
      Ce = ne ? 0.34 : 0.265,
      L = new je(
        new $n(1.55, 1.55),
        new Mt({
          map: v0(B.color),
          transparent: !0,
          depthWrite: !1,
          blending: rr,
          opacity: 0.7,
          toneMapped: !1,
        }),
      );
    ((L.position.z = -0.057), j.add(L), ie.set(B.id, L));
    const re = new je(
      new Mi(Ce, 48),
      new mi({
        color: "#193234",
        roughness: 0.4,
        metalness: 0.6,
        emissive: le,
        emissiveIntensity: 0.07,
      }),
    );
    ((re.position.z = 0.009), j.add(re));
    const oe = new je(
      new dr(Ce, 0.023, 12, 64),
      new Mt({
        color: le.clone().lerp(new He("white"), 0.55).multiplyScalar(2),
        toneMapped: !1,
      }),
    );
    ((oe.position.z = 0.022), j.add(oe));
    const Ee = new je(
      new dr(Ce + 0.041, 0.007, 8, 64),
      new Mt({ color: le, transparent: !0, opacity: 0.26 }),
    );
    if (((Ee.position.z = 0.021), j.add(Ee), ne)) {
      const Re = new gr();
      for (let Pt = 0; Pt < 10; Pt++) {
        const Ut = Math.PI / 2 + (Pt * Math.PI) / 5,
          Un = Pt % 2 ? 0.073 : 0.172;
        Pt
          ? Re.lineTo(Math.cos(Ut) * Un, Math.sin(Ut) * Un)
          : Re.moveTo(Math.cos(Ut) * Un, Math.sin(Ut) * Un);
      }
      Re.closePath();
      const st = new je(
        new fs(Re),
        new Mt({ color: le.clone().multiplyScalar(3), toneMapped: !1 }),
      );
      ((st.position.z = 0.033), j.add(st));
      const tt = new je(new fs(Re), new Mt({ color: "#598a25" }));
      (tt.scale.setScalar(0.54), (tt.position.z = 0.035), j.add(tt));
    } else {
      const Re = new je(
        new Mi(0.093, 40),
        new Mt({
          color: le.clone().lerp(new He("white"), 0.62).multiplyScalar(2),
          toneMapped: !1,
        }),
      );
      ((Re.position.z = 0.033), j.add(Re));
    }
    const se = ps(512, 400, (Re) => {
        ((Re.textAlign = "center"),
          (Re.font = '500 72px "DM Sans", sans-serif'),
          (Re.fillStyle = B.color),
          Re.fillText(B.year, 256, 91),
          (Re.font = '400 67px "DM Sans", sans-serif'),
          (Re.fillStyle = "#f2f4f3"),
          Re.fillText(B.lines[0], 256, 189, 464),
          Re.fillText(B.lines[1], 256, 269, 464));
      }),
      J = new je(
        new $n(2.04, 1.95),
        new Mt({ map: se, transparent: !0, depthWrite: !1, toneMapped: !1 }),
      );
    (J.position.set(q, K + 1.23, 0.045), f.add(J));
    const Te = new je(new Mi(0.49, 32), new Mt({ visible: !1 }));
    ((Te.position.z = 0.055),
      (Te.userData.item = B),
      j.add(Te),
      O.push(Te),
      (J.userData.item = B),
      O.push(J));
  }
  for (const B of pr) {
    const [q, K] = B.position,
      j = 1.64,
      le = (B.lines?.length ?? 1) > 1 ? 1.58 : 1.46,
      ne = new Zn();
    (ne.position.set(q, K, 0.1),
      (ne.userData.baseZ = 0.1),
      f.add(ne),
      F.set(B.id, ne));
    const Ce = new je(
      new $n(2.7, 2.4),
      new Mt({ map: v, transparent: !0, depthWrite: !1, opacity: 0.76 }),
    );
    (Ce.position.set(q + 0.035, K - 0.075, 0.03), f.add(Ce));
    const L = new je(
      new is(Rn(j, le, 0.21), {
        depth: 0.13,
        bevelEnabled: !0,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.037,
        bevelThickness: 0.032,
        curveSegments: 20,
      }),
      new mi({ color: "#070d10", roughness: 0.43, metalness: 0.65 }),
    );
    ((L.castShadow = !0), (L.receiveShadow = !0), ne.add(L));
    const re = new je(ic(j, le, 0.21), new Mt({ map: _0(B), toneMapped: !1 }));
    ((re.position.z = 0.167), (re.userData.item = B), ne.add(re), O.push(re));
    const oe = new Bs(
      new ut().setFromPoints(
        Rn(j, le, 0.21)
          .getPoints(32)
          .map((se) => new D(se.x, se.y, 0.173)),
      ),
      new Xn({ color: B.color, transparent: !0, opacity: 0.52 }),
    );
    ne.add(oe);
    const Ee = new Bs(
      new ut().setFromPoints(
        Rn(j + 0.025, le + 0.025, 0.23)
          .getPoints(32)
          .map((se) => new D(se.x, se.y, 0.012)),
      ),
      new Xn({ color: B.color, transparent: !0, opacity: 0.16 }),
    );
    ne.add(Ee);
  }
  const ge = new je(
    new Ro(0.033, 10, 10),
    new Mt({ color: new He(3, 4, 4), toneMapped: !1 }),
  );
  (f.add(ge), (ge.visible = !$s));
  const xe = new hf(),
    _e = new ue();
  let Ue = null,
    Ze = null,
    Ke = !1,
    $ = 0,
    he = 0,
    fe = 0,
    Be = 0,
    we = 0,
    Ne = 0.1,
    Je = 1,
    Ge = !1,
    ee = !1,
    ae = !document.hidden,
    te = !0;
  function me(B) {
    const q = t.getBoundingClientRect();
    return (
      _e.set(
        ((B.clientX - q.left) / q.width) * 2 - 1,
        (-(B.clientY - q.top) / q.height) * 2 + 1,
      ),
      xe.setFromCamera(_e, r),
      xe.intersectObjects(O, !1)[0]?.object.userData.item
    );
  }
  function A(B) {
    B.button === 0 &&
      ((Ke = !0),
      (Ge = !1),
      ($ = fe = B.clientX),
      (he = Be = B.clientY),
      t.setPointerCapture(B.pointerId));
  }
  function Fe(B) {
    Ke
      ? (Math.hypot(B.clientX - $, B.clientY - he) > 5 && (Ge = !0),
        (Ne = un.clamp(Ne + (B.clientX - fe) * 0.0025, -0.35, 0.48)),
        (we = un.clamp(we + (B.clientY - Be) * 0.002, -0.24, 0.3)),
        (fe = B.clientX),
        (Be = B.clientY))
      : ((Ze = me(B)?.id ?? null),
        i.classList.toggle("is-hovering", Ze !== null));
  }
  function Me(B) {
    if (
      Ke &&
      ((Ke = !1),
      t.hasPointerCapture(B.pointerId) && t.releasePointerCapture(B.pointerId),
      !Ge)
    ) {
      const q = me(B);
      q && ((Ue = q.id), e(q));
    }
  }
  function ze() {
    ((Ke = !1), (Ze = null), i.classList.remove("is-hovering"));
  }
  function de() {
    Ke || ((Ze = null), i.classList.remove("is-hovering"));
  }
  function T(B) {
    (!B.ctrlKey && !B.metaKey) ||
      (B.preventDefault(), (Je = un.clamp(Je - B.deltaY * 55e-5, 0.78, 1.35)));
  }
  function _(B) {
    if (
      ([
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "+",
        "-",
        "=",
        "0",
        "Escape",
      ].includes(B.key) && B.preventDefault(),
      B.key === "ArrowLeft" && (Ne = Math.max(-0.35, Ne - 0.055)),
      B.key === "ArrowRight" && (Ne = Math.min(0.48, Ne + 0.055)),
      B.key === "ArrowUp" && (we = Math.max(-0.24, we - 0.055)),
      B.key === "ArrowDown" && (we = Math.min(0.3, we + 0.055)),
      (B.key === "+" || B.key === "=") && (Je = Math.min(1.35, Je + 0.08)),
      B.key === "-" && (Je = Math.max(0.78, Je - 0.08)),
      (B.key === "0" || B.key === "Escape") && I(),
      B.key === "Enter")
    ) {
      const q = ac.find((K) => K.id === Ue) ?? Ht[0];
      (e(q), (Ue = q.id));
    }
  }
  function I() {
    ((we = 0), (Ne = 0.1), (Je = 1), (Ue = null));
  }
  function Y() {
    const B = i.clientWidth,
      q = i.clientHeight;
    (n.setSize(B, q, !1),
      o.setSize(B, q),
      (r.aspect = B / q),
      (r.fov =
        window.innerWidth <= 760
          ? un.radToDeg(2 * Math.atan(8.65 / (30.08 * r.aspect)))
          : 21.5),
      r.updateProjectionMatrix());
  }
  const Q = new ResizeObserver(Y);
  (Q.observe(i),
    Y(),
    t.addEventListener("pointerdown", A),
    t.addEventListener("pointermove", Fe),
    t.addEventListener("pointerup", Me),
    t.addEventListener("pointercancel", ze),
    t.addEventListener("pointerleave", de),
    t.addEventListener("wheel", T, { passive: !1 }),
    t.addEventListener("keydown", _));
  const Z = () => {
    ae = !document.hidden;
  };
  document.addEventListener("visibilitychange", Z);
  const be = new IntersectionObserver(([B]) => {
    te = B.isIntersecting;
  });
  be.observe(i);
  let pe = 0;
  function De(B) {
    if (ee || !ae || !te) return;
    const q = Math.min((B - pe) / 1e3, 0.05);
    pe = B;
    const K = $s ? 1 : 1 - Math.exp(-q * 9);
    ((f.rotation.x = un.lerp(f.rotation.x, we, K)),
      (f.rotation.z = un.lerp(f.rotation.z, Ne, K)),
      (r.zoom = un.lerp(r.zoom, Je, K)),
      r.updateProjectionMatrix());
    for (const [j, le] of F) {
      const ne = j === Ze || j === Ue;
      le.position.z = un.lerp(le.position.z, ne ? 0.24 : 0.1, K);
    }
    for (const [j, le] of ce) {
      const ne = j === Ze || j === Ue,
        Ce = ne ? 1.12 : 1;
      le.scale.lerp(new D(Ce, Ce, 1), K);
      const L = ie.get(j);
      L.material.opacity = ne
        ? 1
        : 0.64 + ($s ? 0 : Math.sin(B * 0.0018 + Number(j)) * 0.09);
    }
    if (!$s) {
      const j = (B * 55e-6) % 1;
      (ge.position.copy(H.getPoint(j)), (ge.position.z += 0.021));
    }
    o.render();
  }
  return (
    n.setAnimationLoop(De),
    i.querySelector("#loading")?.classList.add("is-loaded"),
    {
      select(B) {
        Ue = B;
      },
      reset: I,
      dispose() {
        ((ee = !0),
          n.setAnimationLoop(null),
          Q.disconnect(),
          be.disconnect(),
          t.removeEventListener("pointerdown", A),
          t.removeEventListener("pointermove", Fe),
          t.removeEventListener("pointerup", Me),
          t.removeEventListener("pointercancel", ze),
          t.removeEventListener("pointerleave", de),
          t.removeEventListener("wheel", T),
          t.removeEventListener("keydown", _),
          document.removeEventListener("visibilitychange", Z));
        const B = new Set(),
          q = new Set(),
          K = new Set();
        (s.traverse((j) => {
          if (j instanceof je || j instanceof es) {
            B.add(j.geometry);
            for (const le of Array.isArray(j.material)
              ? j.material
              : [j.material]) {
              q.add(le);
              for (const ne of Object.values(le)) ne instanceof bt && K.add(ne);
            }
          }
        }),
          B.forEach((j) => j.dispose()),
          q.forEach((j) => j.dispose()),
          K.forEach((j) => j.dispose()),
          o.dispose(),
          c.dispose(),
          n.dispose());
      },
    }
  );
}
const S0 = "modulepreload",
  y0 = function (i) {
    return "/" + i;
  },
  sc = {},
  E0 = function (e, t, n) {
    let s = Promise.resolve();
    if (t && t.length > 0) {
      let c = function (l) {
        return Promise.all(
          l.map((u) =>
            Promise.resolve(u).then(
              (f) => ({ status: "fulfilled", value: f }),
              (f) => ({ status: "rejected", reason: f }),
            ),
          ),
        );
      };
      document.getElementsByTagName("link");
      const a = document.querySelector("meta[property=csp-nonce]"),
        o = a?.nonce || a?.getAttribute("nonce");
      s = c(
        t.map((l) => {
          if (((l = y0(l)), l in sc)) return;
          sc[l] = !0;
          const u = l.endsWith(".css"),
            f = u ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${l}"]${f}`)) return;
          const h = document.createElement("link");
          if (
            ((h.rel = u ? "stylesheet" : S0),
            u || (h.as = "script"),
            (h.crossOrigin = ""),
            (h.href = l),
            o && h.setAttribute("nonce", o),
            document.head.appendChild(h),
            u)
          )
            return new Promise((d, g) => {
              (h.addEventListener("load", d),
                h.addEventListener("error", () =>
                  g(new Error(`Unable to preload CSS for ${l}`)),
                ));
            });
        }),
      );
    }
    function r(a) {
      const o = new Event("vite:preloadError", { cancelable: !0 });
      if (((o.payload = a), window.dispatchEvent(o), !o.defaultPrevented))
        throw a;
    }
    return s.then((a) => {
      for (const o of a || []) o.status === "rejected" && r(o.reason);
      return e().catch(r);
    });
  },
  Ks = "SophearithSaing",
  aa = 864e5;
function rc(i, e = new Date()) {
  if (
    !i ||
    typeof i != "object" ||
    !("contributions" in i) ||
    !Array.isArray(i.contributions) ||
    i.contributions.length === 0
  )
    throw new Error("GitHub activity is unavailable.");
  const t = new Map();
  for (const l of i.contributions) {
    if (
      !l ||
      typeof l.date != "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(l.date) ||
      !Number.isSafeInteger(l.count) ||
      l.count < 0
    )
      throw new Error("Invalid GitHub activity data.");
    const u = Date.parse(`${l.date}T00:00:00Z`);
    if (
      !Number.isFinite(u) ||
      new Date(u).toISOString().slice(0, 10) !== l.date ||
      t.has(l.date)
    )
      throw new Error("Invalid GitHub activity date.");
    t.set(l.date, l.count);
  }
  const n = [...t.keys()].sort(),
    s = Date.parse(`${n[0]}T00:00:00Z`),
    r = Date.parse(`${n[n.length - 1]}T00:00:00Z`);
  if ((r - s) / aa > 371) throw new Error("Invalid activity period.");
  const a = new Date(s).getUTCDay(),
    o = e.toISOString().slice(0, 10),
    c = [];
  for (let l = s; l <= r; l += aa) {
    const u = new Date(l).toISOString().slice(0, 10);
    if (!t.has(u)) throw new Error("Incomplete GitHub activity data.");
    c.push({
      date: u,
      count: t.get(u),
      weekday: new Date(l).getUTCDay(),
      week: Math.floor(((l - s) / aa + a) / 7),
      future: u > o,
    });
  }
  return c;
}
function b0(i) {
  let e = 0,
    t = 0,
    n = 0,
    s = 0,
    r = 0;
  for (const a of i)
    a.future ||
      ((e += a.count),
      (r = Math.max(r, a.count)),
      (s = a.count > 0 ? s + 1 : 0),
      a.count > 0 && t++,
      (n = Math.max(n, s)));
  return { total: e, activeDays: t, longestStreak: n, bestDay: r };
}
function U0(i, e) {
  return i > 0 && e > 0 ? 0.16 + Math.sqrt(i / e) * 2.8 : 0.055;
}
function Zi(i, e = !1) {
  return new Intl.DateTimeFormat("en", {
    month: e ? "short" : "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${i}T00:00:00Z`));
}
function T0(i) {
  const e = (P) => i.querySelector(P),
    t = e("#activity-period"),
    n = e("#activity-canvas"),
    s = e("#activity-viewport"),
    r = e("#activity-graph"),
    a = e("#activity-state"),
    o = e("#activity-message"),
    c = e("#activity-retry"),
    l = e("#activity-status"),
    u = new Intl.NumberFormat("en");
  let f,
    h = !1,
    d,
    g = 0,
    x = !1,
    m = !1;
  for (let P = new Date().getFullYear(); P >= new Date().getFullYear() - 4; P--)
    t.add(new Option(String(P), String(P)));
  const p = e("#activity-profile");
  ((p.href = `https://github.com/${Ks}`),
    (e("#activity-username").textContent = `@${Ks}`));
  function S(P, v, b) {
    ((e("#activity-day-count").textContent =
      `${u.format(P.count)} ${P.count === 1 ? "contribution" : "contributions"}`),
      (e("#activity-day-date").textContent = Zi(P.date)),
      v && s.scrollTo({ left: b - s.clientWidth / 2, behavior: "instant" }));
  }
  async function E(P, v) {
    if (!f && !h)
      try {
        const { createActivityScene: C } = await E0(async () => {
          const { createActivityScene: V } =
            await import("./activity-scene-D8Ih_Oas.js");
          return { createActivityScene: V };
        }, []);
        if (m || v !== g) return;
        f = C(n, S);
      } catch (C) {
        (console.error("Unable to initialize the activity graph:", C),
          (h = !0));
      }
    if (m || v !== g) return;
    const b = b0(P);
    ((e("#activity-total").textContent = u.format(b.total)),
      (e("#activity-active-days").textContent = u.format(b.activeDays)),
      (e("#activity-streak").textContent = u.format(b.longestStreak)),
      (e("#activity-best").textContent = u.format(b.bestDay)));
    const W = P.filter((C) => !C.future);
    ((e("#activity-range").textContent = W.length
      ? `${Zi(W[0].date, !0)} — ${Zi(W[W.length - 1].date, !0)}`
      : "No activity in this period yet"),
      (e("#activity-day-count").textContent = b.total
        ? "Every day tells a story"
        : "A fresh page"),
      (e("#activity-day-date").textContent = b.total
        ? "Hover or tap a column to explore"
        : "No contributions in this period"),
      e("#activity-table-body").replaceChildren(
        ...W.slice()
          .reverse()
          .map((C) => {
            const V = document.createElement("tr"),
              G = document.createElement("th");
            ((G.scope = "row"), (G.textContent = Zi(C.date)));
            const H = document.createElement("td");
            return ((H.textContent = u.format(C.count)), V.append(G, H), V);
          }),
      ),
      (e("#activity-daily-list").hidden = !1),
      f?.setDays(P),
      r.classList.add("has-data"),
      r.setAttribute("aria-busy", "false"),
      r.classList.remove("is-loading"),
      (a.hidden = !h),
      h &&
        ((o.textContent =
          "The 3D view needs WebGL. Explore your daily activity in the table below."),
        (c.hidden = !0)),
      (s.scrollLeft = s.scrollWidth - s.clientWidth));
  }
  async function y() {
    ((x = !0), d?.abort());
    const P = new AbortController();
    d = P;
    const v = P.signal,
      b = ++g,
      W = t.value,
      C = `career-circuit:github:${Ks}:${W}`;
    let V;
    ((l.textContent = "Connecting to GitHub"),
      l.classList.remove("is-saved"),
      r.setAttribute("aria-busy", "true"),
      r.classList.add("is-loading"),
      r.classList.remove("has-data"),
      (a.hidden = !1),
      (o.textContent = "Connecting the days…"),
      (c.hidden = !0),
      (e("#activity-daily-list").hidden = !0),
      (e("#activity-range").textContent = "Loading activity"),
      (e("#activity-day-count").textContent = "Your next perspective"),
      (e("#activity-day-date").textContent = "Loading daily contributions"));
    for (const H of [
      "#activity-total",
      "#activity-active-days",
      "#activity-streak",
      "#activity-best",
    ])
      e(H).textContent = "—";
    try {
      const H = localStorage.getItem(C);
      if (H) {
        const N = JSON.parse(H);
        typeof N.savedAt == "string" &&
          Number.isFinite(Date.parse(N.savedAt)) &&
          ((V = { days: rc(N.payload), savedAt: N.savedAt }),
          await E(V.days, b));
      }
    } catch {}
    if (m || b !== g) return;
    const G = window.setTimeout(() => P.abort(), 15e3);
    try {
      const H = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${Ks}?y=${encodeURIComponent(W)}`,
        { signal: v },
      );
      if (!H.ok) throw new Error(`GitHub activity returned ${H.status}`);
      const N = await H.json(),
        O = rc(N);
      if (m || b !== g || (await E(O, b), m || b !== g)) return;
      l.textContent = "Live GitHub activity";
      try {
        localStorage.setItem(
          C,
          JSON.stringify({ savedAt: new Date().toISOString(), payload: N }),
        );
      } catch {}
    } catch {
      if (m || b !== g) return;
      (r.setAttribute("aria-busy", "false"),
        r.classList.remove("is-loading"),
        l.classList.add("is-saved"),
        V
          ? (l.textContent = `Saved activity · ${Zi(V.savedAt.slice(0, 10), !0)}`)
          : ((l.textContent = "Activity unavailable"),
            (o.textContent =
              "Couldn’t load GitHub activity. Try connecting again."),
            (c.hidden = !1),
            (a.hidden = !1),
            (e("#activity-range").textContent =
              "GitHub is currently unreachable"),
            (e("#activity-day-date").textContent =
              "Use Try again to reload your activity")));
    } finally {
      window.clearTimeout(G);
    }
  }
  const R = () => {
    y();
  };
  (t.addEventListener("change", R), c.addEventListener("click", R));
  const w = new IntersectionObserver(
    ([P]) => {
      P.isIntersecting && !x && (w.disconnect(), y());
    },
    { rootMargin: "250px" },
  );
  return (
    w.observe(i),
    () => {
      ((m = !0),
        d?.abort(),
        w.disconnect(),
        t.removeEventListener("change", R),
        c.removeEventListener("click", R),
        f?.dispose());
    }
  );
}
const ct = (i) => document.querySelector(i);
let zi, Io;
const kc = ct("#selection-card"),
  Dn = ct("#info-dialog"),
  oa = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";
function Li(i) {
  ((Io = i),
    zi?.select(i.id),
    (ct("#selection-eyebrow").textContent = i.eyebrow),
    (ct("#selection-eyebrow").style.color = i.color),
    (ct("#selection-title").textContent = i.year
      ? `${i.year} · ${i.title}`
      : i.title),
    (ct("#selection-description").textContent = i.description),
    ct("#selection-tags").replaceChildren(
      ...i.tags.map((e) => {
        const t = document.createElement("span");
        return ((t.textContent = e), t);
      }),
    ),
    (ct("#next-stop").hidden = !i.year),
    (ct("#next-stop").firstChild.textContent =
      i.id === Ht[Ht.length - 1].id
        ? "Back to the beginning "
        : "Next milestone "),
    (kc.hidden = !1));
}
function Mr() {
  ((kc.hidden = !0), (Io = void 0), zi?.select(null));
}
ct("#close-selection").addEventListener("click", Mr);
ct("#explore").addEventListener("click", () => {
  Li(Ht[0]);
});
ct("#next-stop").addEventListener("click", () => {
  const i = Ht.findIndex((e) => e.id === Io?.id);
  Li(Ht[(i + 1) % Ht.length]);
});
ct("#reset-view").addEventListener("click", () => {
  (zi?.reset(), Mr());
});
ct(".board-accessibility").replaceChildren(
  ...ac.map((i) => {
    const e = document.createElement("button");
    return (
      (e.dataset.item = i.id),
      (e.textContent = i.year ? `${i.year} — ${i.title}` : i.title),
      e.addEventListener("click", () => Li(i)),
      e
    );
  }),
);
const A0 = {
  about: {
    label: "A little about me",
    html: `<h2>Engineer by trade.<br><span class="green-text">Builder at heart.</span></h2><p>I’m Alex, a software engineer who loves the space where thoughtful design meets good engineering. I turn complex ideas into useful, intuitive digital experiences.</p><p>This board is a map of that journey. Every connection represents a new skill, a fresh challenge, or a step forward.</p><div class="dialog-stat-row"><div><strong>${new Date().getFullYear() - Number(Ht[0].year)}+</strong><span>Years of building</span></div><div><strong>${pr.length}</strong><span>Connected disciplines</span></div><div><strong>∞</strong><span>Things to explore</span></div></div>`,
  },
  projects: {
    label: "Selected work / 01—03",
    html: '<h2>Ideas, <span class="cyan-text">made real.</span></h2><div class="project"><span class="project-number">01</span><div><h3>Career Circuit</h3><p>The interactive 3D experience you’re exploring. A different way to connect the dots.</p><span class="project-stack">THREE.JS · TYPESCRIPT · WEBGL</span></div></div><div class="project"><span class="project-number">02</span><div><h3>Forma Design System</h3><p>A shared component language for accessible, consistent product experiences.</p><span class="project-stack">REACT · TYPESCRIPT · STORYBOOK</span></div></div><div class="project"><span class="project-number">03</span><div><h3>Relay Platform</h3><p>An event-driven foundation for reliable services and a smoother path to production.</p><span class="project-stack">NODE.JS · POSTGRESQL · DOCKER</span></div></div>',
  },
  contact: {
    label: "The next connection",
    html: '<h2>Good things start<br>with <span class="green-text">a conversation.</span></h2><p>Have something interesting in mind? I’d love to hear about your team, your idea, or the problem you’re excited to solve.</p><a class="contact-link" href="mailto:hello@alexrivera.dev">hello@alexrivera.dev <span>↗</span></a><div class="availability"><span class="live-indicator"></span>Open to thoughtful collaborations</div>',
  },
};
function Wc(i) {
  if (
    (document
      .querySelectorAll("[data-nav]")
      .forEach((t) => t.classList.toggle("is-active", t.dataset.nav === i)),
    i === "home")
  ) {
    (zi?.reset(), Mr(), window.scrollTo({ top: 0, behavior: oa }));
    return;
  }
  if (i === "experience") {
    (ct("#home").scrollIntoView({ behavior: oa }), Li(Ht[0]));
    return;
  }
  if (i === "skills") {
    (ct("#home").scrollIntoView({ behavior: oa }), Li(pr[0]));
    return;
  }
  const e = A0[i];
  e &&
    ((ct("#dialog-label").textContent = e.label),
    (ct("#dialog-content").innerHTML = e.html),
    Dn.showModal());
}
document
  .querySelectorAll("[data-nav]")
  .forEach((i) => i.addEventListener("click", () => Wc(i.dataset.nav)));
ct(".identity").addEventListener("click", (i) => {
  (i.preventDefault(), Wc("home"));
});
ct("#dialog-close").addEventListener("click", () => Dn.close());
Dn.addEventListener("click", (i) => {
  if (i.target === Dn) {
    const e = Dn.getBoundingClientRect();
    (i.clientX < e.left ||
      i.clientX > e.right ||
      i.clientY < e.top ||
      i.clientY > e.bottom) &&
      Dn.close();
  }
});
Dn.addEventListener("close", () => {
  document
    .querySelectorAll("[data-nav]")
    .forEach((i) => i.classList.toggle("is-active", i.dataset.nav === "home"));
});
document.addEventListener("keydown", (i) => {
  i.key === "Escape" && !Dn.open && Mr();
});
window.matchMedia("(pointer: coarse)").matches &&
  ((ct(".drag-instruction").textContent = "Swipe to rotate"),
  (ct(".zoom-instruction").textContent = "Tap to explore"));
async function w0() {
  await Promise.race([
    document.fonts.ready,
    new Promise((i) => setTimeout(i, 1800)),
  ]);
  try {
    zi = M0(ct("#scene-container"), Li);
  } catch (i) {
    (console.error("Unable to initialize the career board:", i),
      (ct("#loading").hidden = !0));
    const e = document.createElement("div");
    ((e.className = "scene-error"),
      (e.innerHTML =
        "<strong>A career, connected.</strong><p>The 3D board needs WebGL to run.<br>You can still explore the journey with the button on the left.</p>"),
      ct("#scene-container").append(e));
  }
}
w0();
const C0 = T0(ct("#activity"));
window.addEventListener("pagehide", (i) => {
  i.persisted || (zi?.dispose(), C0());
});
export {
  Fi as B,
  He as C,
  wl as D,
  D0 as E,
  Zn as G,
  I0 as H,
  P0 as I,
  Xn as L,
  mi as M,
  _r as O,
  oc as P,
  hf as R,
  Nt as S,
  ue as V,
  r0 as W,
  lh as a,
  L0 as b,
  St as c,
  R0 as d,
  D as e,
  U0 as f,
  je as g,
  vh as h,
  $n as i,
  Mt as j,
  un as k,
};
