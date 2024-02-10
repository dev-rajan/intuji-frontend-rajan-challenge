import { createLazyFileRoute } from "@tanstack/react-router";
import { Typography } from "antd";

const { Title } = Typography;

function Index() {
  return <Title>Create Page</Title>;
}

export const Route = createLazyFileRoute("/list/create/")({
  component: Index,
});
