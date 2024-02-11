import { Tabs, TabsProps } from "antd";

const AppTabs = ({ tabItems }: { tabItems: TabsProps["items"] }) => {
  return <Tabs defaultActiveKey="0" items={tabItems} />;
};

export default AppTabs;
