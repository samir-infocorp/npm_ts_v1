import app from './app.js';
import http from 'http';
import 'dotenv/config';

const server = http.createServer(app);

const port = Number(process.env.PORT);
const ip = String(process.env.IP);

server.listen(port, ip, () => {
    console.log(`server is running on http://${ip}:${port}`);
});