import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  const inline = args.find((argument) => argument.startsWith(`${name}=`));
  return inline
    ? inline.slice(name.length + 1)
    : index >= 0
      ? (args[index + 1] ?? fallback)
      : fallback;
};
const root = path.resolve(
  fileURLToPath(new URL("../", import.meta.url)),
  option("--dir", "."),
);
const port = Number(option("--port", process.env.PORT ?? "5173"));
const host = option("--host", "0.0.0.0");
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

const server = createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end("Method not allowed");
    return;
  }
  try {
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    const file = path.resolve(
      root,
      `.${pathname.endsWith("/") ? `${pathname}index.html` : pathname}`,
    );
    const relative = path.relative(root, file);
    if (
      relative.startsWith("..") ||
      path.isAbsolute(relative) ||
      relative.split(path.sep).some((part) => part.startsWith("."))
    ) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const info = await stat(file);
    if (!info.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "Content-Type":
        mimeTypes[path.extname(file)] ?? "application/octet-stream",
      "Content-Length": info.size,
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    if (request.method === "HEAD") response.end();
    else
      createReadStream(file)
        .on("error", () => response.destroy())
        .pipe(response);
  } catch {
    response
      .writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
      .end("Not found");
  }
});

server.listen(port, host, () =>
  console.log(`Wellread is open at http://localhost:${port}`),
);
server.on("error", (error) => {
  console.error(`Unable to open Wellread: ${error.message}`);
  process.exitCode = 1;
});
