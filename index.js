import express from 'express';
import path from 'path';
import http from 'http';
import socketIo from 'socket.io';
import Chance from 'chance';

const chance = Chance();
const port = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"))
});

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
    console.log("new client connected!");
    
})