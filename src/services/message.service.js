import { Message } from '../models/Message.js';

async function getAll() {
  const result = await Message.findAll();
  return result;
}

const add = async ({ text }) => {
  return await Message.create({ text });
};

const deleteMessage = async (id) => {
  const deletedCount = await Message.destroy({
    where: { id },
  });
  return deletedCount > 0;
};

export const messageService = {
  getAll,
  add,
  deleteMessage,
};
