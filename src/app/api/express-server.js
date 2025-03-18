import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { SerialPort } from "serialport"; // ✅ Import correctly
import { ReadlineParser } from "@serialport/parser-readline"; // ✅ Updated parser import

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// ✅ Replace with your actual Arduino port (check `ls /dev/tty*` or Device Manager)
const portPath = "COM4"; // Change this to your actual port (e.g., "/dev/ttyUSB0" on Linux)

const port = new SerialPort({ path: "COM4", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", (data) => {
    const productId = data.trim();
    console.log(`Received productId from Arduino: ${productId}`);
    io.emit("productId", productId);
});

io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("disconnect", () => {
        console.log("A client disconnected");
    });
});

// Start the server
const PORT = 3002;
server.listen(PORT, () => {
    console.log(`WebSocket server running on port ${PORT}`);
});
