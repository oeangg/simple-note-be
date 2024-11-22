import { Elysia } from "elysia";
import { noteRouter } from "./routes/note-router";
import { swagger } from "@elysiajs/swagger";
import { authRouter } from "./routes/auth-router";

const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
      documentation: {
        tags: [
          { name: "Auth", description: "Auth endpoint" },
          { name: "Note", description: "Note endpoint" },
        ],
      },
    })
  )

  .use(noteRouter)
  .use(authRouter)

  .get(
    "/",
    () => {
      return "Hello Notes BE";
    },
    { detail: { tags: ["App"] } }
  )

  .listen(3000);

console.log("Note BE App");
