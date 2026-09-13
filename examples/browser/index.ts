import Hirely from "../../src/index.js";

const hirely = new Hirely({
  apiKey: "hk_pub_your_public_key_here",
  cache: { enabled: true, ttl: 60 },
});

async function loadProjects() {
  try {
    const projects = await hirely.projects();

    const container = document.getElementById("projects");
    if (!container) return;

    for (const project of projects) {
      const el = document.createElement("article");
      el.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.shortDescription ?? ""}</p>
        <p><strong>Tech:</strong> ${project.technologies?.join(", ") ?? ""}</p>
        ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank">Live Demo</a>` : ""}
      `;
      container.appendChild(el);
    }
  } catch (error) {
    console.error("Failed to load projects:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadProjects);
