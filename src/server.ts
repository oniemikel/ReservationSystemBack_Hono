import "dotenv/config";
import app from "./index.js";
import { serve } from "@hono/node-server";
import { promises as fs } from "fs";
import { prisma } from "./utils/prisma.js";

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

async function startServer(): Promise<void> {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log("データベースへの接続を確認しました。");
  } catch {
    console.error(
      "データベースへの接続に失敗しました。DATABASE_URL とデータベースの稼働状況を確認してください。"
    );
    await prisma.$disconnect().catch(() => {});
    process.exitCode = 1;
    return;
  }

  // uploadsディレクトリ自動作成
  fs.mkdir("uploads", { recursive: true }).catch(() => {});

  serve({
    fetch: app.fetch,
    port,
  });
}

await startServer();

const serverUrl = process.env.PUBLIC_URL || `http://localhost:${port}`;
