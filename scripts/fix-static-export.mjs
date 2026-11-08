// Next's Windows exporter currently nests segment-prefetch .txt artifacts in
// directories, while its browser client requests a dot-separated filename.
// Preserve the originals and add portable copies matching the observed client
// URLs. These are static files: no rewrites or hosting functions are needed.
import fs from "node:fs";
import path from "node:path";
let copied = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      const copy = (nested) => {
        for (const item of fs.readdirSync(nested, { withFileTypes: true })) {
          const source = path.join(nested, item.name);
          if (item.isDirectory()) copy(source);
          else if (item.name.endsWith(".txt")) {
            const name = path.relative(dir, source).split(path.sep).join(".");
            fs.copyFileSync(source, path.join(dir, name));
            copied++;
          }
        }
      };
      copy(full);
    } else walk(full);
  }
}
walk("out");
console.log(
  `Static export: ${copied} portable segment-prefetch files prepared.`,
);
