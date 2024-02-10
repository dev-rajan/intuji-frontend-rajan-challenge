import { createLazyFileRoute } from "@tanstack/react-router";
import { Typography } from "antd";

const { Title } = Typography;

function Index() {
  return <Title>Detail Page</Title>;
}

export const Route = createLazyFileRoute("/list/$id/")({
  component: Index,
});
