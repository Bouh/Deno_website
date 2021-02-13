// Create WebSocket connection.
const socket = new WebSocket('ws://127.0.0.1:7000');

// Connection opened
socket.addEventListener('open', function (event) {
    // Connection with server is lost because watcher reload it
    socket.addEventListener('close', function (event) {
        location.reload();
    });
});
