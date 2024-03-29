import { Link, useNavigate } from "@tanstack/react-router";
import { Input, Space, Table, Tooltip, Typography } from "antd";
import { FC, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

import { SearchOutlined } from "@ant-design/icons";
import DeleteModal from "@src/components/DeleteModal";
import EmployeeCard from "@src/container/employeeContainer/employeeCard";
import { database } from "@src/context/Firebase";
import { useGetData } from "@src/hooks";
import { ActionProps } from "@src/types/types";
import { deleteDoc, doc } from "firebase/firestore";
import { FiPlus } from "react-icons/fi";

const { Text } = Typography;

interface DataType {
  id: string;
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

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const onModalClose = () => {
    setModalOpen(modalOpen ? false : true);
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    if (record?.id) {
      deleteDoc(doc(database, "employees", record.id)).then(() => {
        setDeleteLoading(false);
        setDeletingId(null);
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeletingId(null);
  };

  return (
    <Space>
      <EmployeeCard open={modalOpen} onClose={onModalClose} record={record} />

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
          onClick={() =>
            navigate({
              to: "/employees/create",
              search: { editingId: record?.id },
            })
          }
        />
      </Tooltip>
      <Tooltip title="Delete">
        <MdDelete
          style={{ color: "#ff0b0b91", cursor: "pointer", fontSize: 20 }}
          onClick={() => setDeletingId(record?.id || null)}
        />
      </Tooltip>
    </Space>
  );
};

const columns: any = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Full Name",
    key: "name",
    render: (record: any) => {
      return (
        <Text>
          {record.name + " " + record.middle_name + " " + record.surname}
        </Text>
      );
    },
  },
  {
    title: "Current Team",
    dataIndex: "team",
    key: "team",
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
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Billable Hours",
    dataIndex: "billable_hours",
    key: "billable_hours",
  },
  {
    title: "Action",
    key: "action",
    render: (record: DataType) => <TableAction record={record} />,
  },
];

const EmployeeListing = () => {
  const { data: employees } = useGetData("employees");

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
      <Table columns={columns} dataSource={employees} />
    </>
  );
};

export default EmployeeListing;
