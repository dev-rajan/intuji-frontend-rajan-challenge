import { Layout, Typography } from "antd";

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar = () => {
  return (
    <Sider
      style={{
        background: "#24252A",
        textTransform: "uppercase",
        overflow: "auto",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      width={280}
    >
      <Title
        level={3}
        style={{
          color: "#FCFCFC66",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Sidebar
      </Title>
    </Sider>
  );
};

export default Sidebar;
