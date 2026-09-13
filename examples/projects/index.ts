import Hirely from "../../src/index.js";

const hirely = new Hirely({
  apiKey: process.env.HIRELY_API_KEY!,
});

const projects = await hirely.projects();
console.log(`Found ${projects.length} projects:\n`);

for (const project of projects) {
  console.log(`  • ${project.title} (${project.slug})`);
  console.log(`    ${project.shortDescription}`);
  console.log(`    Tech: ${project.technologies?.join(", ")}`);
  console.log();
}

if (projects[0]?.slug) {
  const bySlug = await hirely.projects.getBySlug(projects[0].slug);
  console.log("By slug:", bySlug.title, "→", bySlug.demoUrl);
}

if (projects[0]?._id) {
  const byId = await hirely.projects.getById(projects[0]._id);
  console.log("By ID:", byId.title, "| Views:", byId.views);
}
