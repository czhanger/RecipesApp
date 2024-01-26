const WebSocket = require("ws");
const net = require("net");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  const tcpSocket = new net.Socket();

  tcpSocket.connect(12345, "127.0.0.1", () => {
    console.log("WebSocket connected to TCP server");

    ws.on("message", (message) => {
      console.log(`Received message from WebSocket client: ${message}`);
      tcpSocket.write(message);
    });

    tcpSocket.on("data", (data) => {
      console.log(`Received data from TCP server: ${data}`);
      ws.send(data.toString());
    });

    tcpSocket.on("close", () => {
      console.log("TCP connection closed");
      ws.close();
    });

    tcpSocket.on("error", (error) => {
      console.error("TCP connection error:", error.message);
      ws.close();
    });
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
    tcpSocket.end();
  });

  ws.on("error", (error) => {
    console.error("WebSocket connection error:", error.message);
    tcpSocket.end();
  });
});
