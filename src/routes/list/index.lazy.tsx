import { createLazyFileRoute } from "@tanstack/react-router";
import { Layout } from "antd";

import BaseTable from "@src/components/BaseTable/BaseTable";

const Index = () => {
  return (
    <Layout>
      <BaseTable />
    </Layout>
  );
};

export const Route = createLazyFileRoute("/list/")({
  component: Index,
});
