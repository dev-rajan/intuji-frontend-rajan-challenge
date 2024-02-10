import { Modal } from "antd";
import React from "react";

interface DeleteModalProps {
  deletingId: string;
  handleClose: () => void;
  handleDelete: () => void;
  loading: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  deletingId,
  handleClose,
  handleDelete,
  loading,
}) => {
  const open = deletingId ? true : false;

  return (
    <Modal
      title="Confirm Deletion"
      open={open}
      onOk={handleDelete}
      onCancel={handleClose}
      okButtonProps={{ disabled: loading }}
      cancelButtonProps={{ disabled: loading }}
    >
      Are you sure you want to delete ?
    </Modal>
  );
};

export default DeleteModal;
