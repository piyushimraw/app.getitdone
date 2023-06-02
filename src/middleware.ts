import { NextResponse, NextMiddleware } from "next/server";
import { jwtVerify } from "jose";

const verifyJWT = async (jwt: string) => {
  // verify the jwt
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET!)
  );

  return payload;
};

const PUBLIC_FILE = /\.(.*)$/;
const PUBLIC_PATHS = ["/_next", "/api", "/static", "/signin", "/register"];
const middleware: NextMiddleware = async (req, event) => {
  const { pathname } = req.nextUrl;
  if (
    PUBLIC_PATHS.some((path) => pathname.startsWith(path)) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME!);
  console.log(jwt, { COOKIE_NAME: process.env.COOKIE_NAME });
  if (!jwt?.value) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    const payload = await verifyJWT(jwt?.value);
    if (!payload) {
      console.log("JWT payload not present ", payload);
      req.nextUrl.pathname = "/signin";
      return NextResponse.redirect(req.nextUrl);
    }
    return NextResponse.next();
  } catch (error: any) {
    console.log("JWT verification failed error", error);
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
};

export default middleware;
