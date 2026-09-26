import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/** Dev-only plugin: POST /__save-content to write JSON edits to disk */
function contentEditorPlugin(): Plugin {
  return {
    name: "content-editor",
    apply: "serve", // dev only
    configureServer(server) {
      server.middlewares.use("/__save-content", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end("Method not allowed");
          return;
        }
        let body = "";
        req.on("data", (chunk: Buffer) => { body += chunk.toString(); });
        req.on("end", () => {
          try {
            const { file, path: keyPath, value } = JSON.parse(body);
            const filePath = path.resolve(__dirname, "src/content", file);

            // Safety: only allow writing inside src/content
            if (!filePath.startsWith(path.resolve(__dirname, "src/content"))) {
              res.statusCode = 403;
              res.end("Forbidden");
              return;
            }

            const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));

            // keyPath supports dot notation and array indices: "cards.0.desc"
            const keys = keyPath.split(".");
            let target = json;
            for (let i = 0; i < keys.length - 1; i++) {
              target = target[keys[i]];
            }
            target[keys[keys.length - 1]] = value;

            fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");
            res.statusCode = 200;
            res.end("ok");
          } catch (e: unknown) {
            res.statusCode = 500;
            res.end(String(e));
          }
        });
      });
    },
  };
}

export default defineConfig({
  // "/" for bloom-project.org; the fork's staging deploy sets BASE_PATH=/BLOOMwebsite/
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), contentEditorPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        news: path.resolve(__dirname, "news/index.html"),
        cohort: path.resolve(__dirname, "cohort/index.html"),
      },
    },
  },
});
