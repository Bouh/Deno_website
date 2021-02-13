import 'https://deno.land/x/dotenv/load.ts';
import { watchChanges, WEBSOCKET_PORT, WEBSOCKET_HOST } from '../src/deps.ts';
import { serve } from 'https://deno.land/std/http/server.ts';
import {
    acceptable,
    acceptWebSocket,
    WebSocket,
} from 'https://deno.land/std/ws/mod.ts';

interface Connection {
    ws: WebSocket;
}

export async function webSocketServerHotReload(enabled = true) {
    if (!enabled) return;
    const connections = new Array<Connection>();

    console.log('Server is started at http://'+WEBSOCKET_HOST + ':' + WEBSOCKET_PORT);
    for await (const req of serve(WEBSOCKET_HOST + ':' + WEBSOCKET_PORT)) {
        if (acceptable(req)) {
            const { conn, headers, w: bufWriter, r: bufReader } = req;
            acceptWebSocket({ conn, headers, bufReader, bufWriter }).then(
                async (ws: WebSocket) => {
                    await watchChanges('.', () => {
                        connections.forEach((connection) => {
                            if (connection.ws !== ws) {
                                connection.ws.send('reload');
                            }
                        });
                    });
                }
            );
        }
    }
}
