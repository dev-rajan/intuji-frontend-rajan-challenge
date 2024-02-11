import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Input, Space, Table, TableProps, Tooltip } from "antd";
import { FC, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

import { SearchOutlined } from "@ant-design/icons";
import DeleteModal from "@src/components/DeleteModal";
import EmployeeCard from "@src/container/employeeContainer/employeeCard";
import { useDeleteData } from "@src/services/listing.services";
import { ActionProps } from "@src/types/types";
import { FiPlus } from "react-icons/fi";

interface DataType {
  key: string;
  full_name: string;
  current_team: string;
  mobile: string;
  email: string;
  designation: string;
  billable_hour: string;
}

const TableAction: FC<ActionProps> = ({ record }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const onModalClose = () => {
    setModalOpen(modalOpen ? false : true);
  };

  const { mutate } = useDeleteData({ url: `/users/${deletingId}` });

  const handleDelete = () => {
    setDeleteLoading(true);
    mutate(
      {},
      {
        onSuccess: () => {
          toast("Deleted Successfully", { type: "success" });
          setDeletingId(null);
          queryClient.invalidateQueries({ queryKey: ["listing-data"] });
        },
        onError: () => {
          toast("Unable to delete data", { type: "error" });
        },
        onSettled: () => {
          setDeleteLoading(false);
        },
      }
    );
  };

  const handleDeleteCancel = () => {
    setDeletingId(null);
  };

  return (
    <Space>
      <EmployeeCard open={modalOpen} onClose={onModalClose} />

      {deletingId && (
        <DeleteModal
          loading={deleteLoading}
          deletingId={deletingId}
          handleClose={handleDeleteCancel}
          handleDelete={handleDelete}
        />
      )}
      <Tooltip title="View">
        <FaEye
          style={{ color: "gray", cursor: "pointer", fontSize: 20 }}
          onClick={onModalClose}
        />
      </Tooltip>
      <Tooltip title="Edit">
        <MdEdit
          style={{ color: "#6c737f", cursor: "pointer", fontSize: 20 }}
          onClick={() => {}}
        />
      </Tooltip>
      <Tooltip title="Delete">
        <MdDelete
          style={{ color: "#ff0b0b91", cursor: "pointer", fontSize: 20 }}
          onClick={() => setDeletingId(record.id || null)}
        />
      </Tooltip>
    </Space>
  );
};

const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Full Name",
    dataIndex: "full_name",
    key: "full_name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Current Team",
    dataIndex: "current_team",
    key: "current_team",
  },
  {
    title: "Mobile Number",
    dataIndex: "mobile",
    key: "mobile",
  },
  {
    title: "Email Address",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
  },
  {
    title: "Billable Hours",
    dataIndex: "billable_hour",
    key: "billable_hour",
  },
  {
    title: "Action",
    key: "action",
    render: () => <TableAction />,
  },
];

const data: DataType[] = [
  {
    key: "1",
    full_name: "Rajan Shrestha",
    current_team: "Tech Team",
    mobile: "+61 8386 3482",
    email: "abc@mail.com",
    designation: "Developer",
    billable_hour: "40 hours/week",
  },
  {
    key: "2",
    full_name: "Rajan Shrestha",
    current_team: "Tech Team",
    mobile: "+61 8386 3482",
    email: "abc@mail.com",
    designation: "Developer",
    billable_hour: "40 hours/week",
  },
  {
    key: "3",
    full_name: "Rajan Shrestha",
    current_team: "Tech Team",
    mobile: "+61 8386 3482",
    email: "abc@mail.com",
    designation: "Developer",
    billable_hour: "40 hours/week",
  },
];
const EmployeeListing = () => {
  return (
    <>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0.5em 0 1.5em 0",
        }}
      >
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search Item"
          style={{ borderRadius: "5px" }}
        />

        <Link
          to="/employees/create"
          style={{
            backgroundColor: "#F7921E",
            borderRadius: "5px",
            color: "white",
            padding: "7px 12px",
          }}
        >
          <FiPlus size={20} style={{ verticalAlign: "top" }} />
          Add Employee
        </Link>
      </Space>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default EmployeeListing;
