"use client";
import { useState } from "react";
import { Button } from "../Button";
import ModalWrapper from "../Modal";
import { addTaskToDB } from "@/lib/project/server/actions";
import { useTransition } from "react";
import Input from "../Input";
import { TextArea } from "../Input/TextArea";

const NewTask = ({
  refreshTag,
  projectId,
}: {
  refreshTag: string;
  projectId?: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentProjectId, setProjectId] = useState(0);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  let [isPending, startTransition] = useTransition();

  const handleSubmit = async (e?: any) => {
    try {
      await addTaskToDB({
        taskName: name,
        projectId: projectId || currentProjectId,
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
