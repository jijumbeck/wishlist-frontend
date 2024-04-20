import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from "react";


export const PasswordInput = (props: any) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <TextField
            {...props}
            type={isPasswordVisible ? "text" : "password"}

            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}