import TaskCard from "@/components/TasksCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import NewTask from "../../../../components/NewTask/index";

const getData = async (id: number) => {
  const user = await getUserFromCookie(cookies());
  if (!user) {
    return null;
  }

  return await db.project.findUnique({
    where: {
      id: id,
    },
    include: {
      tasks: true,
    },
  });
};

const ProjectPage = async ({ params }: any) => {
  const data = await getData(Number.parseInt(params.id));
  const onNewTaskAdded = () => {};
  return (
    <div>
      {/* @ts-expect-error Async Server Component */}
      <TaskCard
        title={data?.name}
        tasks={data?.tasks}
        refreshTag={`/project/${params.id}`}
        projectId={Number.parseInt(params.id)}
      />
    </div>
  );
};

export default ProjectPage;
