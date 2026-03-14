import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("getting-started", "routes/getting-started.tsx"),
  route("docs", "routes/docs.tsx"),
  route("rate-limiting", "routes/rate-limiting.tsx"),
  route("bot-detection", "routes/bot-detection.tsx"),
  route("email-verification", "routes/email-verification.tsx"),
  route("sql-injection", "routes/sql-injection.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
