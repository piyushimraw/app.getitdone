import { comparePassword, createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiHandler } from "next";
import { serialize } from "cookie";

const signin: NextApiHandler<{
  success: boolean;
  reason?: string;
}> = async (req, res) => {
  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401);
      res.send({
        success: false,
        reason: "no able to login",
      });
      return;
    }
    const isPasswordCorrect = comparePassword(req.body.password, user.password);
    if (!isPasswordCorrect) {
      res.status(401);
      res.send({
        success: false,
        reason: "no able to login",
      });
      return;
    }

    const jwt = await createJWT(user);
    res.setHeader(
      "Set-Cookie",
      serialize(process.env.COOKIE_NAME!, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    res.send({
      success: true,
    });
    res.end();
  } else {
    res.status(404);
    res.end();
  }
};

export default signin;
