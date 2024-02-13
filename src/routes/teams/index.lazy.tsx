import { createLazyFileRoute } from "@tanstack/react-router";

const Index = () => {
  return <></>;
};

export const Route = createLazyFileRoute("/teams/")({
  component: Index,
});
