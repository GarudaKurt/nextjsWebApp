import http from "http";
import { Server } from "socket.io";  // ✅ Use import, not require
import express from "express";
import cors from "cors";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// ✅ Ensure correct serial port path
const port = new SerialPort({ path: "COM7", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", (data) => {
    console.log("Raw data received from Arduino:", JSON.stringify(data));
    const productId = data.trim();
    if (productId) {
        io.emit("productId", productId);
        console.log("Trimmed Product ID:", productId);
    }
});

io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("disconnect", () => {
        console.log("A client disconnected");
    });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`WebSocket server running on port ${PORT}`);
});
