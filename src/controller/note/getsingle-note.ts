import { Context } from "elysia";
import { prisma } from "../../utils/prisma";

export const getSingleNote = async ({ params }: Context) => {
  const { id } = params;
  const findNote = await prisma.note.findFirst({
    where: {
      id,
    },
  });

  return findNote;
};
