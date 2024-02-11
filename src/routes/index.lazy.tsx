import { createLazyFileRoute } from "@tanstack/react-router";
import { Typography } from "antd";
import React from "react";

import BaseTable from "@src/components/BaseTable/BaseTable";
import EmployeeListing from "@src/container/employeeContainer/employeeListing";
import TeamListing from "@src/container/teamContainer/teamListing";

const { Text } = Typography;

const tabItems = [
  {
    key: "0",
    label: <Text style={{ fontWeight: "600" }}>Teams</Text>,
    children: <TeamListing />,
  },
  {
    key: "1",
    label: <Text style={{ fontWeight: "600" }}>Employees</Text>,
    children: <EmployeeListing />,
  },
];

const Index: React.FC = () => {
  return <BaseTable pageTitle="Manage Users" tabItems={tabItems} />;
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
