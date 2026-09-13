import Hirely from "@hirely/sdk";

const hirely = new Hirely({
  apiKey: process.env.HIRELY_API_KEY!,
  cache: { enabled: true, ttl: 300 },
});
