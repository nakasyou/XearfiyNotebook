import { serve } from "https://deno.land/std@0.141.0/http/mod.ts";
import { serveDir } from "https://deno.land/std@0.141.0/http/file_server.ts";
serve((request)=>serveDir(request, {
        showDirListing: true
    }));
import * as esbuild from "https://deno.land/x/esbuild@v0.17.10/mod.js";
const ctx = await esbuild.context({
    entryPoints: [
        './src/main.js'
    ],
    outfile: 'script.js',
    bundle: true
});
await ctx.watch();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvWGVhcmZpeU5vdGVib29rLTEvc2VydmVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlcnZlIH0gZnJvbSBcImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjE0MS4wL2h0dHAvbW9kLnRzXCI7XG5pbXBvcnQgeyBzZXJ2ZURpciB9IGZyb20gXCJodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xNDEuMC9odHRwL2ZpbGVfc2VydmVyLnRzXCI7XG5zZXJ2ZSgocmVxdWVzdCkgPT4gc2VydmVEaXIocmVxdWVzdCwgeyBzaG93RGlyTGlzdGluZzogdHJ1ZSB9KSk7XG5cbmltcG9ydCAqIGFzIGVzYnVpbGQgZnJvbSBcImh0dHBzOi8vZGVuby5sYW5kL3gvZXNidWlsZEB2MC4xNy4xMC9tb2QuanNcIjtcbmNvbnN0IGN0eCA9IGF3YWl0IGVzYnVpbGQuY29udGV4dCh7XG4gIGVudHJ5UG9pbnRzOiBbJy4vc3JjL21haW4uanMnXSxcbiAgb3V0ZmlsZTogJ3NjcmlwdC5qcycsXG4gIGJ1bmRsZTogdHJ1ZSxcbn0pXG5hd2FpdCBjdHgud2F0Y2goKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLEtBQUssUUFBUSw0Q0FBNEM7QUFDbEUsU0FBUyxRQUFRLFFBQVEsb0RBQW9EO0FBQzdFLE1BQU0sQ0FBQyxVQUFZLFNBQVMsU0FBUztRQUFFLGdCQUFnQixJQUFJO0lBQUM7QUFFNUQsWUFBWSxhQUFhLDhDQUE4QztBQUN2RSxNQUFNLE1BQU0sTUFBTSxRQUFRLE9BQU8sQ0FBQztJQUNoQyxhQUFhO1FBQUM7S0FBZ0I7SUFDOUIsU0FBUztJQUNULFFBQVEsSUFBSTtBQUNkO0FBQ0EsTUFBTSxJQUFJLEtBQUsifQ==