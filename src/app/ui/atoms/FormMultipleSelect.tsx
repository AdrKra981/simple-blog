import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextFieldVariants,
} from "@mui/material";
import { useField } from "formik";
import { FunctionComponent } from "react";

type FormSelectOptions = {
  label: string;
  value: string | number;
};

interface FormMultipleSelectProps {
  handleChange: (event: SelectChangeEvent<string[] | number[]>) => void;
  values: string[] | number[];
  label: string;
  variant?: TextFieldVariants | undefined;
  required?: boolean;
  id: string;
  options: FormSelectOptions[];
  fullWidth?: boolean;
  margin?: "dense" | "none" | undefined;
  error: boolean;
  helperText?: string | string[] | never[] | undefined;
  name?: string;
}

const FormMultipleSelect: FunctionComponent<FormMultipleSelectProps> = ({
  handleChange,
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
  const [field] = useField({ name: id });

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      required={required}
      variant={variant ?? "outlined"}
      sx={{ my: 1 }}
    >
      <InputLabel id="form-select">{label}</InputLabel>
      <Select
        labelId="form-select"
        id={id}
        // value={values}
        renderValue={(value) => value.join(",")}
        multiple
        label={label}
        margin={margin}
        {...field}
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

export default FormMultipleSelect;
