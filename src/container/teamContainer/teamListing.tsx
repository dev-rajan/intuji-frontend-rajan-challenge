import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button, Card, Dropdown, Input, Space, Table, Tooltip } from "antd";
import { FC, ReactElement, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";

import DeleteModal from "@src/components/DeleteModal";
import { database } from "@src/context/Firebase";
import { useGetData } from "@src/hooks";
import { ActionProps } from "@src/types/types";
import { deleteDoc, doc } from "firebase/firestore";

interface DataType {
  id: string;
  key: string;
  team_name: string;
  members: string[];
  qr_details: ReactElement;
  man_hour: number | string;
}

const TableAction: FC<ActionProps> = ({ record }) => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = () => {
    setDeleteLoading(true);
    if (record?.id) {
      deleteDoc(doc(database, "teams", record.id)).then(() => {
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
      {deletingId && (
        <DeleteModal
          loading={deleteLoading}
          deletingId={deletingId}
          handleClose={handleDeleteCancel}
          handleDelete={handleDelete}
        />
      )}
      <Tooltip title="Edit">
        <MdEdit
          style={{ color: "#6c737f", cursor: "pointer", fontSize: 20 }}
          onClick={() =>
            navigate({ to: "/teams/create", search: { editingId: record?.id } })
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
    title: "Team Name",
    dataIndex: "team_name",
    key: "team_name",
  },
  {
    title: "Members",
    dataIndex: "team_members",
    key: "team_members",
    render: (team_members: string[]) => {
      let members = "";
      team_members.forEach((member: string) => {
        members += `${member}, `;
      });

      return <p>{members}</p>;
    },
  },
  {
    title: "QR Details",
    dataIndex: "qr_details",
    key: "qr_details",
  },
  {
    title: "Total Man Hours",
    dataIndex: "billable_hours",
    key: "billable_hours",
  },
  {
    title: "Action",
    key: "action",
    render: (record: DataType) => <TableAction record={record} />,
  },
];

const TeamListing = () => {
  const { data: teams } = useGetData("teams");

  return (
    <>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0.5em 0 1.5em 0",
        }}
      >
        <Space>
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="Search Item"
            style={{ borderRadius: "5px" }}
          />
          <Dropdown
            menu={{}}
            trigger={["click"]}
            dropdownRender={() => <Card></Card>}
          >
            <Button
              style={{ border: "1px solid #1E83F7", borderRadius: "5px" }}
            >
              <Space>
                <FilterFilled style={{ color: "#1E83F7" }} />
                Filter
              </Space>
            </Button>
          </Dropdown>
        </Space>

        <Link
          to="/teams/create"
          style={{
            backgroundColor: "#F7921E",
            borderRadius: "5px",
            color: "white",
            padding: "7px 12px",
          }}
        >
          <FiPlus size={20} style={{ verticalAlign: "top" }} />
          Add Team
        </Link>
      </Space>
      <Table columns={columns} dataSource={teams} />
    </>
  );
};

export default TeamListing;
