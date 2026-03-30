import { readFile } from "node:fs/promises";
import process from "node:process";

import pg from "pg";

const { Client } = pg;

async function main() {
  const sqlFile = process.argv[2];
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!sqlFile) {
    throw new Error("A SQL file path is required.");
  }

  const sql = await readFile(sqlFile, "utf8");
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  try {
    await client.query(sql);
    console.log(`Executed ${sqlFile} successfully.`);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
