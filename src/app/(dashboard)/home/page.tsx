import Greeting from "@/components/Greeting";
import { Suspense } from "react";
import GreetingsSkeleton from "@/components/Greeting/loader";
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import TaskCard from "@/components/TasksCard";
import NewProject from "@/components/NewProject";

const getData = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies());
  if (!user) {
    return null;
  }
  const projects = await db.project.findMany({
    where: {
      ownerId: user.id,
    },
    include: {
      tasks: true,
    },
  });
  return { projects };
};

export default async function Page() {
  const data = await getData();
  if (!data) {
    return null;
  }

  const { projects } = data;
  return (
    <div className="w-full h-full pr-6 overflow-y-auto">
      <div className=" h-full items-stretch justify-center  min-h-[content]">
        <div className="flex flex-1 grow">
          <Suspense fallback={<GreetingsSkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-wrap items-center mt-3 -m-3 flex-2 grow ">
          {/** projects map here */}
          {projects.map((project) => (
            <div className="w-1/3 p-3" key={project.id}>
              <Link prefetch href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="flex w-full mt-6 flex-2 grow">
          <div className="w-full">
            {/* @ts-expect-error Async Server Component */}
            <TaskCard refreshTag="/" />
          </div>
        </div>
      </div>
    </div>
  );
}
