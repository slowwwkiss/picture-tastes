// picture-tastes: writes the prepared ramen picture to /output/entry.png.
//
// The picture is a prepared asset (ramen.png, 896x597, 953,923 bytes — under
// the gate's 1 MiB / 1024x1024 limits): steaming ramen with a jammy egg,
// glistening chashu, chili oil and green onions. The program delivers those
// exact bytes, byte for byte; it draws nothing and fetches nothing.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const png = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "ramen.png"));

// Gate: the entry must be a whole PNG of at most 1,048,576 bytes.
// Fail loudly instead of submitting an invalid entry.
if (png.length > 1_048_576) throw new Error(`entry.png too large: ${png.length} bytes`);
if (png[0] !== 0x89 || png[1] !== 0x50 || png[2] !== 0x4e || png[3] !== 0x47) {
  throw new Error("ramen.png is not a PNG");
}
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.png"), png);
