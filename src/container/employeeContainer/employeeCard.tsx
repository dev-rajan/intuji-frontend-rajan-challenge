import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space } from "antd";

type EmployeeCardProps = {
  open: boolean;
  onClose(): void;
};
const EmployeeCard = ({ open, onClose }: EmployeeCardProps) => {
  return (
    <Drawer
      title="Employee Information"
      onClose={onClose}
      open={open}
      closable={false}
      extra={
        <Space>
          <Button onClick={onClose}>
            <CloseOutlined />
          </Button>
        </Space>
      }
    >
      content
    </Drawer>
  );
};

export default EmployeeCard;
