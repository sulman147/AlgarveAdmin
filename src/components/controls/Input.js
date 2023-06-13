import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, row, value, error = null, onChange, ...other } = props;
    return (
        <>
            <TextField
                variant="outlined"
                label={label}
                name={name}
                multiline
                rows={row}
                value={value}
                onChange={onChange}
                {...other}
                {...(error && { error: true, helperText: error })}
            />
        </>
    )
}
