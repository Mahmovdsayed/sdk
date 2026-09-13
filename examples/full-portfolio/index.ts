import Hirely from "@hirely/sdk";

const hirely = new Hirely({
  apiKey: process.env.HIRELY_API_KEY!,
});

const me = await hirely.me();
console.log(`\n=== ${me.profile?.firstName} ${me.profile?.lastName} ===`);
console.log(`Role: ${me.profile?.positionName}`);
console.log(`Location: ${me.profile?.city}, ${me.profile?.country}`);
console.log(`Bio: ${me.profile?.about}`);
console.log(`Plan: ${me.plan}`);

const portfolio = await hirely.get();

console.log(`\n=== Projects (${portfolio.projects.length}) ===`);
for (const p of portfolio.projects) {
  const feat = p.featured ? "⭐ " : "";
  console.log(`  ${feat}${p.title} — ${p.technologies?.slice(0, 3).join(", ")}`);
}

console.log(`\n=== Work Experience (${portfolio.work.length}) ===`);
for (const w of portfolio.work) {
  const current = w.isCurrent ? " (current)" : "";
  console.log(`  ${w.position} at ${w.companyName}${current}`);
}

console.log(`\n=== Education (${portfolio.education.length}) ===`);
for (const e of portfolio.education) {
  console.log(`  ${e.degree} in ${e.fieldOfStudy} — ${e.institution}`);
}

const byCategory = portfolio.skills.reduce<Record<string, string[]>>((acc, s) => {
  const cat = s.category ?? "Other";
  acc[cat] = [...(acc[cat] ?? []), s.name ?? ""];
  return acc;
}, {});
console.log("\n=== Skills ===");
for (const [cat, skills] of Object.entries(byCategory)) {
  console.log(`  ${cat}: ${skills.join(", ")}`);
}

if (portfolio.cv?.pdfUrl) {
  console.log(`\n=== CV ===\nPDF: ${portfolio.cv.pdfUrl}`);
}
