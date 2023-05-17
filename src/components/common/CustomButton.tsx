import { Button } from "@mui/material";
import { CustomButtonProps } from "interfaces/common";

const CustomButton = ({
  type,
  title,
  backgroundColor,
  color,
  fullWidth,
  icon,
  handleClick,
}: CustomButtonProps) => {
  return (
    <Button>
      {icon}
      {title}
    </Button>
  );
};

export default CustomButton;
