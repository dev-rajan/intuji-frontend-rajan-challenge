import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Button,
  Card,
  Dropdown,
  Input,
  QRCode,
  Space,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { FC, ReactElement, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

import DeleteModal from "@src/components/DeleteModal";
import { useDeleteData } from "@src/services/listing.services";
import { ActionProps } from "@src/types/types";

interface DataType {
  key: string;
  team_name: string;
  members: string[];
  qr_details: ReactElement;
  man_hour: number | string;
}

const TableAction: FC<ActionProps> = ({ record }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

export const columns: TableProps<DataType>["columns"] = [
  {
    title: "Team Name",
    dataIndex: "team_name",
    key: "team_name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Members",
    dataIndex: "members",
    key: "members",
  },
  {
    title: "QR Details",
    dataIndex: "qr_details",
    key: "qr_details",
  },
  {
    title: "Total Man Hours",
    dataIndex: "man_hour",
    key: "man_hour",
  },
  {
    title: "Action",
    key: "action",
    render: () => <TableAction />,
  },
];

export const data: DataType[] = [
  {
    key: "1",
    team_name: "Team 1",
    members: ["Rajan", "Rajesh", "Rajeev", "Rajendra", "Rajat", "Rajnish"],
    qr_details: (
      <QRCode
        size={70}
        bordered={false}
        errorLevel="H"
        value="https://google.com/"
      />
    ),
    man_hour: "27,000",
  },
  {
    key: "2",
    team_name: "Team 2",
    members: ["Rajan", "Rajesh", "Rajeev", "Rajendra", "Rajat", "Rajnish"],
    qr_details: (
      <QRCode
        size={70}
        bordered={false}
        errorLevel="H"
        value="https://google.com/"
      />
    ),
    man_hour: "20,000",
  },
  {
    key: "3",
    team_name: "Team 3",
    members: ["Rajan", "Rajesh", "Rajeev", "Rajendra", "Rajat", "Rajnish"],
    qr_details: (
      <QRCode
        size={70}
        bordered={false}
        errorLevel="H"
        value="https://google.com/"
      />
    ),
    man_hour: "27,000",
  },
];

const TeamListing = () => {
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
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TeamListing;
