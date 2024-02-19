import { Card, Col, Row, Space, Statistic, Typography } from "antd";
import { FaUsers, FaUsersCog } from "react-icons/fa";

const { Text } = Typography;

const UserCard = ({
  teamSize,
  employeeSize,
}: {
  teamSize: number;
  employeeSize: number;
}) => {
  return (
    <Row gutter={16} style={{ marginBottom: "1em" }}>
      <Col span={4}>
        <Card
          bordered={false}
          style={{ background: "#1E83F7", borderRadius: "5px" }}
        >
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Space direction="vertical">
              <Text style={{ color: "white" }}>Teams</Text>
              <Statistic
                style={{ color: "white" }}
                value={teamSize}
                valueStyle={{ color: "white", fontWeight: "bold" }}
              />
            </Space>
            <FaUsersCog
              fontSize={34}
              color="white"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "5px",
                padding: "4px",
              }}
            />
          </Space>
        </Card>
      </Col>
      <Col span={4}>
        <Card
          bordered={false}
          style={{ background: "#FFAC1C", borderRadius: "5px" }}
        >
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Space direction="vertical">
              <Text style={{ color: "white" }}>Employees</Text>
              <Statistic
                value={employeeSize}
                valueStyle={{ color: "white", fontWeight: "bold" }}
              />
            </Space>
            <FaUsers
              fontSize={34}
              color="white"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "5px",
                padding: "4px",
              }}
            />
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default UserCard;
