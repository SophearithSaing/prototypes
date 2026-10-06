import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const destination = path.join(root, "dist");
const files = ["index.html", "styles.css", "app.js", "data.json", "assets"];

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
await Promise.all(
  files.map((file) =>
    cp(path.join(root, file), path.join(destination, file), {
      recursive: true,
    }),
  ),
);
console.log(
  "Wellread is ready in dist/ — deploy this folder to any static host.",
);
