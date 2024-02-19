import { TabsProps, Typography } from "antd";

import AppTabs from "@src/components/AppTabs";
import UserCard from "@src/components/UserCard";
import { useGetData } from "@src/hooks";

interface IPropsData {
  pageTitle: string;
  tabItems: TabsProps["items"];
}

const { Title } = Typography;

const BaseTable = ({ pageTitle, tabItems }: IPropsData) => {
  const { dataSize: teamSize } = useGetData("teams");
  const { dataSize: employeeSize } = useGetData("employees");

  return (
    <>
      <Title level={3} style={{ fontWeight: "bold", marginTop: "0" }}>
        {pageTitle}
      </Title>
      <UserCard teamSize={teamSize} employeeSize={employeeSize} />
      <AppTabs tabItems={tabItems} />
    </>
  );
};

export default BaseTable;
