import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// scripts/entries.mjs が作る entries/deadlock-report/index.html と
// entries/deadlock-report/N/index.html を全部ビルド対象にする
const root = resolve(import.meta.dirname, "entries");
const top = resolve(root, "deadlock-report");
const input: Record<string, string> = { index: resolve(top, "index.html") };
for (const dir of readdirSync(top)) {
  const html = resolve(top, dir, "index.html");
  if (existsSync(html)) input[`report-${dir}`] = html;
}

export default defineConfig({
  root,
  publicDir: resolve(import.meta.dirname, "public"),
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": resolve(import.meta.dirname, "src") } },
  server: { fs: { allow: [import.meta.dirname] } },
  build: {
    outDir: resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    assetsDir: "deadlock-assets",
    rollupOptions: { input },
  },
});
