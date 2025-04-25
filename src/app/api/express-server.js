import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",  // ✅ Allow all origins temporarily for debugging
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    }
});

const port = new SerialPort({ path: "COM3", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", (data) => {
    console.log("Raw data received from Arduino:", JSON.stringify(data));
    const productId = data.trim();
    if (productId) {
        io.emit("productId", productId);
        console.log(`✅ Emitted Product ID: ${productId}`);
    }
});

io.on("connection", (socket) => {
    console.log(`✅ Client Connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`❌ Client Disconnected: ${socket.id}`);
    });

    socket.on("productId", (data) => {
        console.log(`🔁 Received & Emitting Product ID: ${data}`);
        io.emit("productId", data);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`🚀 WebSocket server running on port ${PORT}`);
});
