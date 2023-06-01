"use server";

import { verifyJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addProjectToDB = async ({ name }: { name: string }) => {
  const userCookie = cookies().get(process.env.COOKIE_NAME!)?.value;

  if (!userCookie) {
    throw new Error("Invalid Cookie");
  }
  const user = await verifyJWT(userCookie);
  if (!user.id) {
    throw new Error("Invalid cookie");
  }

  const newProject = await db.project.create({
    data: {
      ownerId: Number.parseInt(user.id),
      name,
    },
  });
  if (newProject) {
    revalidateTag("home");
  } else {
    throw new Error("Project can't be created");
  }
};

export const addTaskToDB = async ({
  taskName,
  projectId,
  refreshTag,
}: {
  taskName: string;
  projectId: number;
  refreshTag: string;
}) => {
  const userCookie = cookies().get(process.env.COOKIE_NAME!)?.value;

  if (!userCookie) {
    throw new Error("Invalid Cookie");
  }
  const user = await verifyJWT(userCookie);
  if (!user.id) {
    throw new Error("Invalid cookie");
  }

  const newTask = await db.task.create({
    data: {
      name: taskName,
      projectId: projectId,
      ownerId: Number.parseInt(user.id),
    },
  });

  if (!newTask) {
    throw new Error("task can not be created");
  }

  revalidatePath(refreshTag);
  return newTask;
};
