import { Elysia, t } from "elysia";
import { prisma } from "./utils/prisma";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()

  .use(
    swagger({
      path: "/docs",
    })
  )
  //route Get All note
  .get("/", async () => {
    const notes = await prisma.note.findMany();

    return notes;
  })

  //route Get Single note
  .get("/:id", async ({ params }) => {
    const { id } = params;
    const findNote = await prisma.note.findFirst({
      where: {
        id,
      },
    });

    return findNote;
  })

  //route post note
  .post(
    "/",
    async ({ body }) => {
      const { content } = body;

      const newNote = await prisma.note.create({
        data: {
          content,
        },
      });

      return newNote;
    },

    //schema guard content body
    {
      body: t.Object({
        content: t.String(),
      }),
    }
  )

  //route edit Note
  .patch(
    "/:id",
    async ({ params, body }) => {
      const { id } = params;
      const { content, isDone } = body;

      const updateNote = await prisma.note.update({
        where: {
          id,
        },
        data: {
          content,
          isDone,
        },
      });

      return updateNote;
    },
    {
      body: t.Object({
        content: t.String(),
        isDone: t.Boolean(),
      }),
    }
  )

  //route delete note
  .delete("/:id", async ({ params }) => {
    const { id } = params;

    await prisma.note.delete({
      where: {
        id,
      },
    });

    return "deleted succses";
  })

  .listen(3000);

console.log("Note BE App");
