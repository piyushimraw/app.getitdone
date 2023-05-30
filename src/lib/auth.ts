import { User } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { TextEncoder } from "util";
import { db } from "./db";

export const hashPassword = async (password: string) => {
  return await hash(password, 10);
};

export const comparePassword = async (
  password: string,
  encryptedPassword: string
) => {
  return await compare(password, encryptedPassword);
};

export const createJWT = (user: User) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;
  return new SignJWT({
    user: {
      id: user.id,
      email: user.email,
    },
  })
    .setProtectedHeader({
      alg: "HS256",
      type: "JWT",
    })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const verifyJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  return payload.user as {
    id: string;
  };
};

export const getUserFromCookie = async (cookies: ReadonlyRequestCookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME!);
  if (!jwt?.value) {
    throw new Error("Cookie not found");
  }
  const { id } = await verifyJWT(jwt?.value);

  return await db.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};
