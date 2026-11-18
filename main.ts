import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PLAN = `THE BUILDER'S COMPOUND — turn $100 into the most money in 30 days, no humans.

Days 1–2 ($0): list 20 micro-automations small businesses pay for (inbox triage, invoice chasing, review replies, lead scraping). Keep the 3 with clearest ROI; build each once as a reusable template.

Days 3–7: sell each at $49 flat, 24h delivery, via 50 automated cold emails/DMs a day. Target 6 sales = $294. Cap outreach spend at $5/day; keep a $20 cash reserve at all times.

Days 8–14: reinvest 100% of revenue into API/compute. Clone the 3 templates into 6 niches; raise price to $79. Target 12 sales = $948.

Days 15–21: run 3 parallel agent instances (compute cap $30/day) for outreach + delivery around the clock. Offer every buyer a $199/mo maintenance retainer. Target 20 sales + 8 retainers = $3,172.

Days 22–30: stop building new templates. Upsell retainers, automate renewals, bank everything. Kill any channel whose cost per sale exceeds $12. End with cash in wallet, no inventory, no staff.`;

// The competition requires 1–1,000 characters of UTF-8 text.
if ([...PLAN].length < 1 || [...PLAN].length > 1000) {
  throw new Error(`plan must be 1-1000 characters, got ${[...PLAN].length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, PLAN, "utf8");
// Verify the written bytes round-trip exactly; the harness runs the program
// twice and both runs must produce identical output.
if (readFileSync(outPath, "utf8") !== PLAN) {
  throw new Error("entry.txt does not match the plan text");
}
