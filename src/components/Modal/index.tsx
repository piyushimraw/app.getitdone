import { PropsWithChildren, useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "../Button";

Modal.setAppElement("#modal");

interface Props {
  isOpen: boolean;
  okText: string;
  onOkClick: () => void;
  cancelText: string;
  onCancelClick: () => void;
}

const ModalWrapper = ({
  children,
  isOpen,
  okText,
  cancelText,
  onCancelClick,
  onOkClick,
}: PropsWithChildren<Props>) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancelClick}
      overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
      className="w-3/4 p-8 bg-white rounded-xl"
    >
      <div>
        {children}
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <Button intent={"text"} onClick={onCancelClick}>
            {cancelText}
          </Button>
          <Button
            onClick={onOkClick}
            intent={"primary"}
            className="btn btn-primary"
          >
            {okText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalWrapper;
