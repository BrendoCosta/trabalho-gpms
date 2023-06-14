import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import checker from "vite-plugin-checker";

export default defineConfig({

    plugins: [

		svelte({

			preprocess: sveltePreprocess({ postcss: true })

		}),

		checker({

			typescript: true
			
		})

	],
    base: "/trabalho-gpms/",
    root: "./",
    publicDir: "./src/assets",
    build: {
		outDir: "./dist"
	},
    
})
