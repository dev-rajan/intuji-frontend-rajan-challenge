import { TabsProps, Typography } from "antd";

import AppTabs from "@src/components/AppTabs";
import UserCard from "@src/components/UserCard";

interface IPropsData {
  pageTitle: string;
  tabItems: TabsProps["items"];
}

const { Title } = Typography;

const BaseTable = ({ pageTitle, tabItems }: IPropsData) => {
  return (
    <>
      <Title level={3} style={{ fontWeight: "bold", marginTop: "0" }}>
        {pageTitle}
      </Title>
      <UserCard />
      <AppTabs tabItems={tabItems} />
    </>
  );
};

export default BaseTable;
