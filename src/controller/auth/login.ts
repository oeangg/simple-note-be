import { Context, t } from "elysia";
import { prisma } from "../../utils/prisma";

export const authLoginSchema = t.Object({
  email: t.String(),
  password: t.String(),
});

export const authLogin = async ({ body, set }: Context) => {
  const { email, password } = body as { email: string; password: string };

  //cek email ada?
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    set.status = 404;
    return { message: "User not found" };
  }

  //verify password
  const isPasswordMatch = await Bun.password.verify(
    password,
    user.password,
    "argon2d"
  );

  if (!isPasswordMatch) {
    set.status = 401;
    return { message: "Invalid Password!" };
  }

  //create session ID
  const sessionID = await prisma.session.create({
    data: {
      userID: user.id,
    },
  });

  return {
    message: "Login Succed",
    user: { name: user.name, email: user.email, sessionID: sessionID.id },
  };
};
