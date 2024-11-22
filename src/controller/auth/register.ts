import { Context, t } from "elysia";
import { prisma } from "../../utils/prisma";

export const authRegisterSchema = t.Object({
  name: t.String(),
  email: t.String(),
  password: t.String(),
});

export const authRegister = async ({ body, set }: Context) => {
  //ceck email sudah ada?
  const { name, email, password } = body as {
    name: string;
    email: string;
    password: string;
  };

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    set.status = 401;
    return "Email exist!";
  }

  //hash password
  const hashPassword = await Bun.password.hash(password, "argon2d");
  //input to DB
  const newuser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  set.status = 201;
  return {
    message: "Register succes!",
    user: { id: newuser.id, email: newuser.email },
  };
};
