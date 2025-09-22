import { messageService } from '../services/message.service.js';

const getAll = async (req, res) => {
  const messages = await messageService.getAll();

  res.send(messages);
};

const add = async (req, res) => {
  try {
    const messageData = req.body;
    const newMessage = await messageService.add(messageData);
    res.status(201).send(newMessage);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await messageService.deleteMessage(id);
    if (deleted) {
      res.status(200).send({ message: 'Message deleted successfully' });
    } else {
      res.status(404).send({ error: 'Message not found' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const messageController = {
  getAll,
  add,
  deleteMessage,
};
