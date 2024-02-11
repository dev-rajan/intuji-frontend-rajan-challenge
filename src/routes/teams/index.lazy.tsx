import { createLazyFileRoute } from "@tanstack/react-router";

const Index = () => {
  return <div>index.lazy</div>;
};

export const Route = createLazyFileRoute("/teams/")({
  component: Index,
});
