import { Elysia } from "elysia";
import { getAllNote } from "../controller/note/getall-note";
import { getSingleNote } from "../controller/note/getsingle-note";
import { postNote, postNoteSchema } from "../controller/note/post-note";
import { updateNote, updateNoteSchema } from "../controller/note/update-note";
import { deleteNote } from "../controller/note/delete-note";

export const noteRouter = new Elysia()

  //route Get All note
  .group("/api/v1/note", (app) =>
    app
      .get("/", getAllNote, { detail: { tags: ["Note"] } })

      //route Get Single note
      .get("/:id", getSingleNote, { detail: { tags: ["Note"] } })

      //route post note
      .post("/", postNote, { body: postNoteSchema, detail: { tags: ["Note"] } })

      //route edit Note
      .patch("/:id", updateNote, {
        body: updateNoteSchema,
        detail: { tags: ["Note"] },
      })

      //route delete note
      .delete("/:id", deleteNote, { detail: { tags: ["Note"] } })
  );
