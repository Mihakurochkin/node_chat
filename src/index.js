import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { messageRouter } from './routes/message.route.js';
import { WebSocketServer } from 'ws';
import { messageService } from './services/message.service.js';

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use(messageRouter);

const server = app.listen(PORT);
const wss = new WebSocketServer({ server });

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

wss.on('connection', (connection) => {
  connection.on('message', async (messageBuffer) => {
    try {
      const messageData = JSON.parse(messageBuffer.toString());
      const newMessage = await messageService.add(messageData);

      broadcastMessage(newMessage);
    } catch (error) {
      console.error('Failed to process message:', error);
      connection.send(
        JSON.stringify({ error: 'Invalid message format or server error.' }),
      );
    }
  });
});
