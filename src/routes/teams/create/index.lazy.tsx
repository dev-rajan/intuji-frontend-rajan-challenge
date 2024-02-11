import { createLazyFileRoute } from "@tanstack/react-router";

const Index = () => {
  return <div>index</div>;
};

export const Route = createLazyFileRoute("/teams/create/")({
  component: Index,
});