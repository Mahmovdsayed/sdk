import Hirely from "../../src/index.js";

const hirely = new Hirely({
  apiKey: process.env.HIRELY_API_KEY!,
  cache: {
    enabled: true,
    ttl: 300, 
  },
});

console.time("First request (cache miss)");
const projects1 = await hirely.projects();
console.timeEnd("First request (cache miss)");

console.time("Second request (cache hit)");
const projects2 = await hirely.projects();
console.timeEnd("Second request (cache hit)");

console.log("Same data returned:", projects1.length === projects2.length);

console.time("Bypass cache");
const freshProjects = await hirely.projects({ cache: false });
console.timeEnd("Bypass cache");

console.log("Fresh project count:", freshProjects.length);
