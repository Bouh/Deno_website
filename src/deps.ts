export { exists, existsSync } from "https://deno.land/std@0.86.0/fs/mod.ts";
export { dirname, join } from "https://deno.land/std@0.86.0/path/mod.ts";
export { parseMarkdown } from "https://deno.land/x/markdown_wasm/mod.ts";
export {
  json,
  opine,
  Router,
  serveStatic,
  urlencoded,
} from "https://deno.land/x/opine@1.1.0/mod.ts";
export { renderFileToString } from "https://deno.land/x/dejs@0.9.3/mod.ts";
export { createError } from "https://deno.land/x/http_errors@2.1.0/mod.ts";

export type {
  NextFunction,
  Request,
  Response,
} from "https://deno.land/x/opine@1.1.0/src/types.ts";
export type { IError } from "https://deno.land/x/http_errors@2.1.0/mod.ts";

export async function watchChanges(
  path: string,
  onChange: Function,
) {
  const watcher = Deno.watchFs(path);

  for await (const event of watcher) {
    if (event.kind === "modify") {
      onChange();
    }
  }
}
