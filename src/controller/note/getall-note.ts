import { prisma } from "../../utils/prisma";

export const getAllNote = async () => {
  const notes = await prisma.note.findMany();

  return notes;
};
