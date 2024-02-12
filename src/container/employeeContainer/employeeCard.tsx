import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
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
};
const EmployeeCard = ({ open, onClose }: EmployeeCardProps) => {
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
      />
      <Space direction="vertical">
        <Title level={4} style={{ marginBottom: "0" }}>
          Carl Jhonson
        </Title>
        <Text style={{ marginBottom: "1em" }}>carl@gmail.com</Text>
        <Button
          style={{
            fontWeight: "bold",
            background: "#1E83F7",
            color: "white",
            borderRadius: "18px",
          }}
        >
          Employee
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
            Developer
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
            0458 126 587
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
            Paramatta, Sydney, Australia
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
            15/18/2022
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
            Staff
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
            User is Billable
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
            40 Hours/Week
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
      >
        <Link to="/employees/create">
          <MdEdit size={20} style={{ verticalAlign: "top", marginRight: '0.5em' }} />
          Edit Profile
        </Link>
      </Button>
    </Drawer>
  );
};

export default EmployeeCard;
