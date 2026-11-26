import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// scripts/entries.mjs が作る entries/deadlock-report*/index.html を全部ビルド対象にする
const root = resolve(import.meta.dirname, "entries");
const input: Record<string, string> = {};
for (const dir of readdirSync(root)) {
  const html = resolve(root, dir, "index.html");
  if (existsSync(html)) input[dir] = html;
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
