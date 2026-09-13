import Hirely from "../../src/index.js";

const hirely = new Hirely({
  apiKey: process.env.HIRELY_API_KEY!,
  cache: { enabled: true, ttl: 300 },
});
