import Hirely from "@hirely/sdk";

const hirely = new Hirely({
  apiKey: process.env.HIRELY_API_KEY!,
});

const me = await hirely.me();

console.log("👤 Name:", me.profile?.firstName, me.profile?.lastName);
console.log("💼 Role:", me.role, "| Plan:", me.plan);
console.log("📍 Location:", me.profile?.city, me.profile?.country);
console.log("🖊  Bio:", me.profile?.about);
console.log("🖼  Avatar:", me.profile?.avatar?.url);

const portfolio = await hirely.get();
console.log("\n📁 Projects:", portfolio.projects.length);
console.log("💼 Work entries:", portfolio.work.length);
console.log("🎓 Education:", portfolio.education.length);
console.log("🛠  Skills:", portfolio.skills.length);
console.log("📜 Certificates:", portfolio.certificates.length);
console.log("⭐ Testimonials:", portfolio.testimonials.length);
console.log("🙋 Services:", portfolio.services.length);
