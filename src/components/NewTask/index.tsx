"use client";
import { useState } from "react";
import { Button } from "../Button";
import ModalWrapper from "../Modal";
import { addTaskToDB } from "@/lib/project/server/actions";
import { useTransition } from "react";
import Input from "../Input";
import { TextArea } from "../Input/TextArea";
import { Project } from "@prisma/client";
import { revalidatePath } from "next/cache";

const NewTask = ({
  refreshTag,
  projectId,
  projects,
}: {
  refreshTag: string;
  projectId?: number;
  projects?: Array<Project>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentProjectId, setCurrentProjectId] = useState<string>();
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  let [isPending, startTransition] = useTransition();

  const handleSubmit = async (e?: any) => {
    const reqProjectID: string =  (currentProjectId || projectId) as string;
    try {
      await addTaskToDB({
        taskName: name,
        projectId:  reqProjectID,
        description,
        refreshTag,
      });
    } catch (e) {
      console.log(e);
    }
    closeModal();
  };

  const onOk = () => {
    startTransition(() => handleSubmit());
  };

  return (
    <>
      <Button onClick={openModal} intent="text" className="ml-16 ">
        + Create New
      </Button>
      <ModalWrapper
        okText="Add new Task"
        cancelText="Maybe later"
        onOkClick={onOk}
        onCancelClick={closeModal}
        isOpen={isModalOpen}
      >
        <div className="my-4 text-4xl text-slate-800">Add task</div>
        {!projectId && (
          <div className="mb-4 ">
            <div className="mb-1 text-xl">Select a project</div>
            <select
              className="w-full select select-primary"
              onChange={(e) =>
                setCurrentProjectId(e.target.value)
              }
              value={currentProjectId}
            >
              {projects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <Input
          label="Task title"
          type="text"
          placeholder="Add task title here"
          role="tab"
          onChange={(e) => setName(e.target.value)}
          className="w-full input input-primary"
        />
        <TextArea
          label="Add task description"
          placeholder="Add task title here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full input input-primary"
          labelClassName="mt-8"
        />
      </ModalWrapper>
    </>
  );
};

export default NewTask;
