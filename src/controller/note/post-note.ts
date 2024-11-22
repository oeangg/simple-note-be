import { Context, t } from "elysia";
import { prisma } from "../../utils/prisma";

export const postNoteSchema = t.Object({
  content: t.String(),
});

export const postNote = async ({ body }: Context) => {
  const { content } = body as { content: string };

  const newNote = await prisma.note.create({
    data: {
      content,
    },
  });

  return newNote;
};
