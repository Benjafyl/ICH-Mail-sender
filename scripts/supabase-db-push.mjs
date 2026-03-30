import { spawn } from "node:child_process";
import process from "node:process";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is not configured.");
  process.exit(1);
}

const child = spawn(
  "npx",
  ["supabase", "db", "push", "--db-url", databaseUrl],
  {
    stdio: "inherit",
    shell: true,
  },
);

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
