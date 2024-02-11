import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "uppercase",
        background: "#fff",
        boxShadow:
          "0 2px 6px -1px rgba(0,0,0, 0.07),0 6px 18px -1px rgba(0,0,0, 0.04)",
      }}
    >
      <Title
        level={3}
        style={{
          color: "#00000066",
          margin: "12px 0"
        }}
      >
        Navigation Bar
      </Title>
    </Header>
  );
};

export default Navbar;
