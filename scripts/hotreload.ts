import 'https://deno.land/x/dotenv/load.ts';
import { watchChanges } from '../src/deps.ts';
import { serve } from 'https://deno.land/std/http/server.ts';
import {
    acceptable,
    acceptWebSocket,
    WebSocket,
} from 'https://deno.land/std/ws/mod.ts';

interface Connection {
    ws: WebSocket;
}

const port = Deno.env.get('WEBSOCKET_PORT') ?? '7000';
const host = Deno.env.get('WEBSOCKET_HOST') ?? '127.0.0.1';

const connections = new Array<Connection>();

console.log('Server is started at http://127.0.0.1:7000');
for await (const req of serve(host + ':' + port)) {
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
