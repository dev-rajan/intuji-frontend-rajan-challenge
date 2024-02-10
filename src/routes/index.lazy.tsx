import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { Typography } from "antd";

const { Title } = Typography;

const Index = () => {
  return (
    <Typography>
      <Title>Welcome</Title>
      <Link to="/list" style={{ fontSize: 28 }}>
        List
      </Link>
    </Typography>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
