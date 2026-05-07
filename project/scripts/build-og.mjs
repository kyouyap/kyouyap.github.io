// project/scripts/build-og.mjs
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "public", "og", "og.png");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0d0e0c"/>
  <text x="80" y="170" font-family="ui-monospace, monospace" font-size="22" fill="#6b7a55">~ $ whoami</text>
  <text x="80" y="280" font-family="ui-monospace, monospace" font-weight="700" font-size="92" fill="#d2b471">takuya-ogata</text>
  <text x="80" y="340" font-family="ui-monospace, monospace" font-size="26" fill="#6b7a55">// Forward Deployed / Applied Research Engineer</text>
  <text x="80" y="380" font-family="ui-monospace, monospace" font-size="26" fill="#6b7a55">// AI products, research → prod</text>
  <text x="80" y="560" font-family="ui-monospace, monospace" font-size="22" fill="#6b94a8">kyouyap.github.io</text>
</svg>`;

mkdirSync(dirname(out), { recursive: true });
const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(out, png);
console.log("wrote", out);
