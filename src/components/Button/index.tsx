import { Button } from "antd";

type AppButtonProps = {
  icon: React.ReactNode;
  type: "primary" | "default" | "dashed" | "link" | "text";
  size: "small" | "middle" | "large";
  label: string;
};

const AppButton = (props: AppButtonProps) => {
  const { icon, type, size, label } = props;

  return (
    <Button type={type} icon={icon} size={size}>
      {label}
    </Button>
  );
};

export default AppButton;
