import { defineConfig } from "vite";
import { resolve } from "path";
import { cpSync, mkdirSync } from "node:fs";

export default defineConfig({
    plugins: [
        {
            name: "copiar-imagens",
            closeBundle() {
                const origem = resolve(import.meta.dirname, "img");
                const destino = resolve(import.meta.dirname, "dist/img");

                mkdirSync(destino, { recursive: true });
                cpSync(origem, destino, { recursive: true });
            }
        }
    ],

    build: {
        rollupOptions: {
            input: resolve(import.meta.dirname, "html/index.html")
        }
    }
});