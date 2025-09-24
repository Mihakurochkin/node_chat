import { Room } from '../models/Room.js';

const getAll = async () => {
  const result = await Room.findAll();
  return result;
};

const add = async (room) => {
  return await Room.create(room);
};

const rename = async (name, id) => {
  const [updatedCount] = await Room.update({ name }, { where: { id } });
  if (updatedCount > 0) {
    const updatedRoom = await Room.findByPk(id);
    return updatedRoom;
  }
  return null;
};

const deleteRoom = async (id) => {
  const deletedCount = await Room.destroy({
    where: { id },
  });
  console.log(deletedCount > 0);
  return deletedCount > 0;
};

export const roomService = {
  getAll,
  add,
  deleteRoom,
  rename,
};
