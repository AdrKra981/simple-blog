import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextFieldVariants,
} from "@mui/material";
import { FunctionComponent } from "react";

type FormSelectOptions = {
  label: string;
  value: string | number;
};

interface FormSelectProps {
  handleChange: () => void;
  value: string | number;
  label: string;
  variant?: TextFieldVariants | undefined;
  required?: boolean;
  id: string;
  options: FormSelectOptions[];
  fullWidth?: boolean;
  margin?: "dense" | "none" | undefined;
  error: boolean;
  helperText?: string | false | undefined;
  name?: string;
}

const FormSelect: FunctionComponent<FormSelectProps> = ({
  handleChange,
  value,
  label,
  id,
  options,
  fullWidth,
  error,
  margin,
  helperText,
  required,
  variant,
}) => {
  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      required={required}
      variant={variant ?? "outlined"}
    >
      <InputLabel id="form-select">{label}</InputLabel>
      <Select
        labelId="form-select"
        id={id}
        value={value}
        label={label}
        margin={margin}
        onChange={handleChange}
      >
        {options.map((option) => {
          return (
            <MenuItem
              key={`select-option-${option.value}`}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default FormSelect;
