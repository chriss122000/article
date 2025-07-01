import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { ChangeEvent, useCallback, useState } from "react";

type TInputPassword = {
  label: string;
  name: string;
  value: string;
  error?: boolean;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
};

const passwordHelper = (
  <span>
    Le mot de passe doit comporter au moins <b>8 caractères</b>,{" "}
    <b>une majuscule</b>, <b>une minuscule</b> et <b>un caractère spécial</b>.
  </span>
);

export const InputPassword: React.FC<TInputPassword> = ({
  label,
  name,
  value,
  error,
  onChange,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleClickShowPassword = useCallback(() => {
    setIsShow(!isShow);
  }, [isShow]);

  return (
    <FormControl sx={{ width: "26.5ch" }} variant="outlined" size="small">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        id={name}
        name={name}
        type={isShow ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={isShow ? "Cacher mot de passe" : "Voir mot de passe"}
              onClick={handleClickShowPassword}
              edge="end"
            >
              {true ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        value={value ?? ""}
        onChange={onChange}
        error={error}
      />
      {error && (
        <FormHelperText sx={{ color: "red" }}>{passwordHelper}</FormHelperText>
      )}
    </FormControl>
  );
};