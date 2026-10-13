import { getFontEmbedCSS, toBlob } from "html-to-image";
import JSZip from "jszip";
import {
  readDesignSystem,
  createColorPalette,
  colorTokenCSS,
} from "./design-system.js";

const pixelRatio = 4;
let fontCSS;

function filename(screen, index) {
  const slug = screen.tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");
  return `echo-${String(index + 1).padStart(2, "0")}-${slug}.png`;
}

async function renderImage(element) {
  await document.fonts.ready;
  // Reuse embedded fonts so a batch doesn't fetch the same font files 12 times.
  if (fontCSS === undefined) {
    fontCSS = await getFontEmbedCSS(element);
  }
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  const blob = await toBlob(element, {
    width,
    height,
    pixelRatio,
    fontEmbedCSS: fontCSS,
    style: {
      zoom: "1",
      margin: "0",
      boxShadow: "none",
      position: "relative",
      left: "auto",
      top: "auto",
      right: "auto",
      bottom: "auto",
      transform: "none",
    },
  });
  if (!blob || blob.size === 0)
    throw new Error("The browser could not render this screen.");
  return { blob, width: width * pixelRatio, height: height * pixelRatio };
}

function download(blob, name) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  // Keep the URL alive long enough for the browser to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export async function exportScreen(phone, screen, index) {
  const { blob } = await renderImage(phone);
  download(blob, filename(screen, index));
}

export async function exportScreens(phones, screens, onProgress) {
  const zip = new JSZip();
  const index = [];
  // Render sequentially to avoid allocating 12 large canvases simultaneously.
  for (let i = 0; i < screens.length; i++) {
    onProgress(i + 1, screens.length);
    const { blob, width, height } = await renderImage(phones[i]);
    const file = filename(screens[i], i);
    zip.file(file, blob);
    index.push({
      screen: i + 1,
      name: screens[i].name,
      type: screens[i].tag,
      group: screens[i].group,
      file,
      width,
      height,
    });
  }
  onProgress(screens.length, screens.length, "colors");
  const designSystem = readDesignSystem();
  const palette = createColorPalette(designSystem);
  try {
    const { blob } = await renderImage(palette);
    zip.file("echo-colors.png", blob);
  } finally {
    // Remove the offscreen palette even if rendering fails.
    palette.remove();
  }
  zip.file("design-system.json", JSON.stringify(designSystem, null, 2));
  zip.file("design-system.css", colorTokenCSS(designSystem));
  zip.file(
    "screens.json",
    JSON.stringify(
      {
        app: "Echo",
        description:
          "Static mobile app mockups. Screen order follows the gallery. Controls shown inside the mockups are not interactive.",
        pixelRatio,
        designSystem: {
          colors: "design-system.json",
          css: "design-system.css",
          palette: "echo-colors.png",
        },
        screens: index,
      },
      null,
      2,
    ),
  );
  const archive = await zip.generateAsync({ type: "blob" });
  download(archive, "echo-mockups.zip");
}
