import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Row,
  Space,
  Typography,
} from "antd";
import { MdEdit } from "react-icons/md";

const { Title, Text } = Typography;

type EmployeeCardProps = {
  open: boolean;
  onClose(): void;
  record: object;
};
const EmployeeCard = ({ open, onClose, record }: EmployeeCardProps) => {
  const navigate = useNavigate();

  return (
    <Drawer
      title={
        <Title level={3} style={{ fontWeight: "bold", marginBottom: "0" }}>
          Employee Information
        </Title>
      }
      onClose={onClose}
      open={open}
      closable={false}
      width={"500px"}
      extra={
        <Space>
          <Button onClick={onClose}>
            <CloseOutlined />
          </Button>
        </Space>
      }
    >
      <Avatar
        style={{ display: "flex" }}
        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        icon={<UserOutlined />}
        src={record.user_image}
      />
      <Space direction="vertical">
        <Title level={4} style={{ marginBottom: "0" }}>
          {record.name + " " + record.middle_name + " " + record.surname}
        </Title>
        <Text style={{ marginBottom: "1em" }}>{record.email}</Text>
        <Button
          style={{
            fontWeight: "bold",
            background: "#1E83F7",
            color: "white",
            borderRadius: "18px",
          }}
        >
          {record.position}
        </Button>
      </Space>

      <Divider
        style={{ borderBlockStart: "1px solid #C3C1BF", marginBottom: "1em" }}
      />

      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Title
            level={5}
            style={{ fontSize: "15px", color: "#656669", marginTop: "0.5em" }}
          >
            Designation
          </Title>
          <Text
            style={{ fontSize: "14px", fontWeight: "500", color: "#24252A" }}
          >
            {record.position}
          </Text>
        </Col>
        <Col span={12}>
          <Title
            level={5}
            style={{ fontSize: "15px", color: "#656669", marginTop: "0.5em" }}
          >
            Contact
          </Title>
          <Text
            style={{ fontSize: "14px", fontWeight: "500", color: "#24252A" }}
          >
            {record.mobile}
          </Text>
        </Col>

        <Col span={12}>
          <Title
            level={5}
            style={{ fontSize: "15px", color: "#656669", marginTop: "0.5em" }}
          >
            Address
          </Title>
          <Text
            style={{ fontSize: "14px", fontWeight: "500", color: "#24252A" }}
          >
            {record.address}
          </Text>
        </Col>
      </Row>

      <Divider
        style={{ borderBlockStart: "1px solid #C3C1BF", marginBottom: "1em" }}
      />

      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Title
            level={5}
            style={{ fontSize: "15px", color: "#656669", marginTop: "0.5em" }}
          >
            Start Date
          </Title>
          <Text
            style={{ fontSize: "14px", fontWeight: "500", color: "#24252A" }}
          >
            {record.start_time}
          </Text>
        </Col>
        <Col span={12}>
          <Title
            level={5}
            style={{ fontSize: "15px", color: "#656669", marginTop: "0.5em" }}
          >
            Role
          </Title>
          <Text
            style={{ fontSize: "14px", fontWeight: "500", color: "#24252A" }}
          >
            {record.position}
          </Text>
        </Col>

        <Col span={12}>
          <Title
            level={5}
            style={{ fontSize: "15px", color: "#656669", marginTop: "0.5em" }}
          >
            Billable Status
          </Title>
          <Text
            style={{ fontSize: "14px", fontWeight: "500", color: "#24252A" }}
          >
            {record.isBillable ? "User is Billable" : "User is not billable"}
          </Text>
        </Col>

        <Col span={12}>
          <Title
            level={5}
            style={{ fontSize: "15px", color: "#656669", marginTop: "0.5em" }}
          >
            Billable Hours
          </Title>
          <Text
            style={{ fontSize: "14px", fontWeight: "500", color: "#24252A" }}
          >
            {record.billable_hours}
          </Text>
        </Col>
      </Row>

      <Button
        style={{
          marginTop: "1em",
          backgroundColor: "#F7921E",
          borderRadius: "5px",
          color: "white",
          width: "100%",
        }}
        onClick={() =>
          navigate({
            to: "/employees/create",
            search: { editingId: record?.id },
          })
        }
      >
        <MdEdit
          size={20}
          style={{ verticalAlign: "top", marginRight: "0.5em" }}
        />
        Edit Profile
      </Button>
    </Drawer>
  );
};

export default EmployeeCard;
