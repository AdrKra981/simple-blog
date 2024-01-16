"use client";
import { TextField, TextFieldVariants } from "@mui/material";
import { FunctionComponent } from "react";

interface FormInputProps {
  label?: string;
  variant?: TextFieldVariants | undefined;
  required?: boolean;
  type?: string;
  id?: string;
  fullWidth?: boolean;
  margin?: "dense" | "none" | "normal" | undefined;
  error: boolean;
  helperText?: string;
}

const FormInput: FunctionComponent<FormInputProps> = ({
  label,
  variant,
  required,
  type,
  id,
  fullWidth,
  margin,
  error,
  helperText,
}) => {
  return (
    <TextField
      autoComplete="off"
      label={label}
      variant={variant ?? "outlined"}
      required={required}
      type={type ?? "text"}
      id={id}
      fullWidth={fullWidth}
      margin={margin}
      error={error}
      helperText={helperText}
    />
  );
};

export default FormInput;
