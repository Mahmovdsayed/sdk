import Hirely, {
  HirelyError,
  HirelyAuthenticationError,
  HirelyNotFoundError,
  HirelyRateLimitError,
  HirelyTimeoutError,
  HirelyServerError,
} from "../../src/index.js";

const hirely = new Hirely({
  apiKey: process.env.HIRELY_API_KEY!,
  timeout: 10_000,
  retries: 2,
});

try {
  const me = await hirely.me();
  console.log("Account loaded:", me.userName);
  console.log("Profile:", me.profile?.firstName, me.profile?.lastName);
} catch (error) {
  if (error instanceof HirelyAuthenticationError) {
    console.error("❌ Authentication failed. Check your HIRELY_API_KEY.");
    console.error("   Status:", error.status, "| Code:", error.code);
  } else if (error instanceof HirelyNotFoundError) {
    console.error("❌ Resource not found.");
  } else if (error instanceof HirelyRateLimitError) {
    console.error(`⏱  Rate limited. Retry in ${error.retryAfter ?? "unknown"}s`);
  } else if (error instanceof HirelyTimeoutError) {
    console.error("⏳ Request timed out.");
  } else if (error instanceof HirelyServerError) {
    console.error("🔥 Hirely server error:", error.status);
  } else if (error instanceof HirelyError) {
    console.error("SDK error:", error.message, "| Status:", error.status);
  } else {
    throw error;
  }
}

try {
  const project = await hirely.projects.getBySlug("my-project-slug");
  console.log("Project found:", project.title);
} catch (error) {
  if (error instanceof HirelyNotFoundError) {
    console.log("Project does not exist — handle gracefully.");
  }
}
