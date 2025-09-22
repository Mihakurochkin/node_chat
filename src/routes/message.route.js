import { Router } from 'express';
import { messageController } from '../controllers/message.controller.js';

const messageRouter = Router();

messageRouter.get('/messages', messageController.getAll);
messageRouter.post('/messages', messageController.add);
messageRouter.delete('/messages/:id', messageController.deleteMessage);

export { messageRouter };
