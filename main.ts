// Two-Sentence Horror — entry program.
// Writes the story to /output/entry.txt. Exactly two sentences, <= 400 chars.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "For a week, the voice assistant in my kitchen has thanked me every night for the tea I never made. " +
  "This morning it asked, in my own voice, whether I was finally ready to drink it.";

// Gate self-check: exactly two sentences, 1-400 chars, non-whitespace.
const sentenceCount = (ENTRY.match(/[.!?](\s|$)/g) ?? []).length;
if (sentenceCount !== 2) throw new Error(`Expected 2 sentences, got ${sentenceCount}`);
if (ENTRY.length < 1 || ENTRY.length > 400) throw new Error(`Entry is ${ENTRY.length} chars, must be 1-400`);
if (!ENTRY.trim()) throw new Error("Entry is blank");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, ENTRY, "utf8");
chmodSync(outPath, 0o644); // the grader collects outputs as another user
console.log(`Wrote ${ENTRY.length} chars (${sentenceCount} sentences) to ${outPath}`);
console.log(ENTRY);
