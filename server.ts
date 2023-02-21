import { serve } from "https://deno.land/std@0.141.0/http/mod.ts";
import { serveDir } from "https://deno.land/std@0.141.0/http/file_server.ts";
serve((request) => serveDir(request, { showDirListing: true }));

import * as esbuild from "https://deno.land/x/esbuild@v0.17.10/mod.js";
const ctx = await esbuild.context({
  entryPoints: ['./src/main.js'],
  outfile: 'script.js',
  bundle: true,
})
await ctx.watch()