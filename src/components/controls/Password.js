import React from "react";
import { TextField } from "@material-ui/core";

export default function Password(props) {
  const { name, label, row, value, error = null, onChange, ...other } = props;
  return (
    <>
      {/* <TextField
        variant="outlined"
        label={label}
        name={name}
        multiline
        type="password"
        rows={row}
        value={value}
        onChange={onChange}
        {...other}
        {...(error && { error: true, helperText: error })}
      /> */}
      <TextField
        variant="outlined"
        label={label}
        name={name}
        type="password"
        autoComplete="current-password"
        value={value}
        onChange={onChange}
        {...other}
        {...(error && { error: true, helperText: error })}
      />
    </>
  );
}
