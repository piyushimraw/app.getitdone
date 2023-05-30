import { Prisma, TASK_STATUS } from "@prisma/client";
import Card from "../Card";
import clsx from "clsx";

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: { tasks: true },
});

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

const formatDate = (date: string) => {
  const d = new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return d;
};

const ProjectCard = ({ project }: { project: ProjectWithTasks }) => {
  const completedCount = project.tasks.map(
    (p) => p.status === TASK_STATUS.COMPLETED
  ).length;

  const tasksCount = project.tasks.length;

  const progress =
    tasksCount < 1 ? 0 : Math.ceil((completedCount / tasksCount) * 100);

  return (
    <Card className="!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200">
      <div>
        <span className="text-sm text-gray-300">
          {formatDate(project.createdAt.toISOString())}
        </span>
      </div>
      <div className="mb-6">
        <span className="text-3xl text-gray-600">{project.name}</span>
      </div>
      {tasksCount < 1 ? (
        <div>No Tasks present</div>
      ) : (
        <>
          <div className="mb-2">
            <span className="text-gray-400">
              {completedCount}/{tasksCount} completed
            </span>
          </div>
          <div>
            <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
              <div
                className={clsx(
                  "h-full text-center text-xs text-white bg-violet-600 rounded-full"
                )}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-600 font-semibold">
                {progress}%
              </span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
export default ProjectCard;
