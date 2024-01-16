import { FunctionComponent } from "react";

interface ButtonProps {
  children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({ children }) => {
  return (
    <button className="bg-[#739072] text-white p-2 mt-2 w-full">
      {children}
    </button>
  );
};

export default Button;
