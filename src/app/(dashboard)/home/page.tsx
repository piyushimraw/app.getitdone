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
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className=" h-full items-stretch justify-center  min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
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
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            {/* @ts-expect-error Async Server Component */}
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
}
