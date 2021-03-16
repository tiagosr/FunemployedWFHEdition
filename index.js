import express from 'express';
import path, { dirname } from 'path';
import http from 'http';
import { Server } from 'socket.io';
import Chance from 'chance';
import { fileURLToPath } from 'url';

const chance = Chance();
const port = process.env.PORT || 3001;
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"))
});

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", socket => {
    console.log("new client connected!");
    
})