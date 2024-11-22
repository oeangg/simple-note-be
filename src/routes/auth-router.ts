import { Elysia } from "elysia";

import { authRegister, authRegisterSchema } from "../controller/auth/register";
import { authLogin, authLoginSchema } from "../controller/auth/login";

export const authRouter = new Elysia({ prefix: "/api/v1/auth" })

  .post("/register", authRegister, {
    body: authRegisterSchema,
    detail: { tags: ["Auth"] },
  })

  .post("/login", authLogin, {
    body: authLoginSchema,
    detail: { tags: ["Auth"] },
  });
