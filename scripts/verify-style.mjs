#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files & tokens that must exist
const mustExist = [
  {
    file: "lib/design-tokens.css",
    needles: [
      ".hero-gradient",
      ".btn-primary",
      ".btn-secondary",
      ".animate-fade-in-up",
      "--gradient-hero",
    ],
  },
  {
    file: "app/globals.css",
    needles: ["lib/design-tokens.css"],
  },
  {
    file: "tailwind.config.js",
    needles: ["./app/", "./components/", "./lib/"],
  },
  {
    file: "postcss.config.cjs",
    needles: ["tailwindcss"],
  },
];

let ok = true;

for (const { file, needles } of mustExist) {
  const p = path.resolve(__dirname, "..", file);
  if (!fs.existsSync(p)) {
    console.error(`❌ Missing file: ${file}`);
    ok = false;
    continue;
  }
  const txt = fs.readFileSync(p, "utf8");
  for (const n of needles) {
    if (!txt.includes(n)) {
      console.error(`❌ ${file}: missing "${n}"`);
      ok = false;
    }
  }
}

if (!ok) {
  console.error("⛔ Design tokens / config check failed.");
  process.exit(1);
}

console.log("✅ Design tokens & config verified.");
