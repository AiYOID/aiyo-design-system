// Copies the agent-facing docs into public/ so the GitHub Pages site serves them
// at its root (./DESIGN.md, ./AGENTS.md, ./llms-full.txt, ...). Runs before dev and build.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"

const files = [
  ["DESIGN.md", "public/DESIGN.md"],
  ["AGENTS.md", "public/AGENTS.md"],
  ["README.md", "public/README.md"],
  ["tokens/aiyo.tokens.json", "public/aiyo.tokens.json"],
  ["skills/aiyo-design/SKILL.md", "public/SKILL.md"],
  ["src/styles/aiyo.css", "public/aiyo.css"],
]

mkdirSync("public", { recursive: true })
for (const [from, to] of files) {
  if (existsSync(from)) copyFileSync(from, to)
  else console.warn(`[sync-docs] missing ${from}`)
}

// llms-full.txt = everything an agent needs in one fetch
const full = ["AGENTS.md", "DESIGN.md", "src/styles/aiyo.css"]
  .filter(existsSync)
  .map((f) => `<!-- ${f} -->\n\n${readFileSync(f, "utf8")}`)
  .join("\n\n---\n\n")
writeFileSync("public/llms-full.txt", full)
console.log("[sync-docs] docs copied to public/")
