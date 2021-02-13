// ------------------------------ Handle .env ------------------------------
import 'https://deno.land/x/dotenv/load.ts';

export const HOTRELOAD_ENABLED = Deno.env.get('BROWSER_HOTRELOAD') == 'TRUE';
export const ENV = Deno.env.get('ENV') ?? 'development';
export const HOST = Deno.env.get('HOST') ?? '127.0.0.1';
export const PORT = parseInt(Deno.env.get('PORT') ?? '3000');
export const WEBSOCKET_HOST = Deno.env.get('WEBSOCKET_HOST') ?? '127.0.0.1';
export const WEBSOCKET_PORT = Deno.env.get('WEBSOCKET_PORT') ?? '7000';

// ------------------------------ Exports ------------------------------

export { config } from 'https://deno.land/x/dotenv/mod.ts';
export { exists, existsSync } from 'https://deno.land/std@0.86.0/fs/mod.ts';
export { dirname, join } from 'https://deno.land/std@0.86.0/path/mod.ts';
export { parseMarkdown } from 'https://deno.land/x/markdown_wasm/mod.ts';
export {
    json,
    opine,
    Router,
    serveStatic,
    urlencoded,
} from 'https://deno.land/x/opine@1.1.0/mod.ts';
export { renderFileToString } from 'https://deno.land/x/dejs@0.9.3/mod.ts';
export { createError } from 'https://deno.land/x/http_errors@2.1.0/mod.ts';

// ------------------------------ Export types ------------------------------

export type {
    NextFunction,
    Request,
    Response,
} from 'https://deno.land/x/opine@1.1.0/src/types.ts';
export type { IError } from 'https://deno.land/x/http_errors@2.1.0/mod.ts';

// ------------------------------ Utils function ------------------------------

export async function watchChanges(path: string, onChange: Function) {
    const watcher = Deno.watchFs(path);

    for await (const event of watcher) {
        if (event.kind === 'modify') {
            onChange();
        }
    }
}

export function isScriptHotReloadEnabled() {
    return ENV !== 'development' ? false : HOTRELOAD_ENABLED ? true : false;
}
