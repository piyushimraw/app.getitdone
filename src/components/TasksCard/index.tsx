import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Project, TASK_STATUS, Task } from "@prisma/client";
import { cookies } from "next/headers";
import { Button } from "../Button";
import Card from "../Card";
import NewTask from "../NewTask";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  if (!user) {
    return null;
  }
  const tasks = await db.task.findMany({
    where: {
      ownerId: user.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return tasks;
};
const TaskCard = async ({
  tasks,
  title = "Tasks",
  projectId,
  refreshTag,
  projects,
}: {
  tasks?: Task[];
  title?: string;
  projectId: number;
  refreshTag: string;
  projects: Array<Project>;
}) => {
  const data = tasks || (await getData());

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <NewTask
            refreshTag={refreshTag}
            projectId={projectId}
            projects={projects}
          />
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div className="py-2 " key={task.id}>
                <div>
                  <span className="text-gray-800">{task.name}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
