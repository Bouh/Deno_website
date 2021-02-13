/**
  Use WebSocket for hot reload
 */

const host = '127.0.0.1';
const port = '7000';

function connect() {
    // Create WebSocket connection.
    const ws = new WebSocket('ws://' + host + ':' + port);
    ws.addEventListener('open', function (event) {
        console.log('WebSocket: connected');
        // Connection with server is lost because watcher reload it
        ws.addEventListener('close', function (event) {
            location.reload();
        });
    });

    ws.addEventListener('error', function (event) {
        console.error('WebSocket: error', event);
        ws.close();
    });

    ws.addEventListener('close', function (event) {
        console.log(
            'Socket is closed. Reconnect will be attempted in 1 second.',
            event.reason
        );
        setTimeout(function () {
            connect();
        }, 1000);
    });
}

connect();
