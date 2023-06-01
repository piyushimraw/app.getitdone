import { db } from "@/lib/db";
import { NextApiHandler } from "next";
import { getUserFromCookie, verifyJWT } from "../../lib/auth";
import { cookies } from "next/headers";

const newProject: NextApiHandler<{
  success: boolean;
  reason?: string;
}> = async (req, res) => {
  if (req.method === "POST") {
    const cookie = req.cookies[process.env.COOKIE_NAME!];
    if (!cookie) {
      res.status(401);
      res.send({
        success: false,
      });
      return res.end();
    }
    const user = await verifyJWT(cookie);
    if (!user.id) {
      res.status(200);
      res.send({
        success: false,
      });
      return res.end();
    }
    const newProject = await db.project.create({
      data: {
        ownerId: user.id,
        name: req.body.name,
      },
    });
    if (newProject) {
      res.status(200);
      res.send({
        success: true,
      });
      return res.end();
    } else {
      res.status(500);
      res.end();
    }
  } else {
    res.status(404);
    res.end();
  }
};

export default newProject;
