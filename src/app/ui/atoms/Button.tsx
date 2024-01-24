import { FunctionComponent } from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      className="bg-[#739072] text-white p-2 mt-2 w-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
