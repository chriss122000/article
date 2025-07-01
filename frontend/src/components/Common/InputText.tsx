import React, { ChangeEvent } from "react";
import Grid2 from '@mui/material/Unstable_Grid2';
// import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

interface IInputTextProps {
  value: any;
  name: string;
  label: string;
  type?: string;
  helperText?: string;
  error?: boolean;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
}

export const InputText: React.FC<IInputTextProps> = ({
  onChange,
  value,
  name,
  label,
  type,
  helperText,
  error,
}) => {
  return (
    <Grid2>
      <TextField
        size="small"
        id={name}
        name={name}
        label={label}
        variant="outlined"
        onChange={onChange}
        value={value}
        type={type ?? "text"}
        helperText={helperText}
        error={error}
      />
    </Grid2>
  );
};