"use client";
import { useState } from "react";
import { Button } from "../Button";
import ModalWrapper from "../Modal";
import { addTaskToDB } from "@/lib/project/server/actions";
import { useTransition } from "react";

const NewTask = ({
  refreshTag,
  projectId,
}: {
  refreshTag: string;
  projectId?: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [currentProjectId, setProjectId] = useState(0);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  let [isPending, startTransition] = useTransition();

  const handleSubmit = async (e?: any) => {
    try {
      await addTaskToDB({
        taskName: name,
        projectId: projectId || currentProjectId,
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
        <input
          type="text"
          placeholder="Add new Task here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full input input-bordered input-secondary"
        />
      </ModalWrapper>
    </>
  );
};

export default NewTask;
