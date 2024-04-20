import { useFormik } from "formik";
import { LoginCredentials } from "../auth.dto"
import * as Yup from 'yup';
import { useAppDispatch } from "../../../app/store";
import { login } from "../auth.slice";
import { TextField } from "@mui/material";
import { PasswordInput } from "../../../shared/ui/PasswordInput";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";


const initialValues: LoginCredentials = {
    emailOrLogin: '',
    password: ''
}

const validationSchema = Yup.object({
    emailOrLogin: Yup.string()
        .required('Введите логин или email.'),
    password: Yup.string()
        .required('Введите пароль.')
})


export function LoginForm() {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async values => {
            setError('');
            setIsLoading(true);
            const response = await dispatch(login(values));
            setIsLoading(false);
            if (response.meta.requestStatus === 'rejected') {
                setError(response.payload?.message);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Войти</h2>
            <TextField
                id="emailOrLogin"
                name="emailOrLogin"
                placeholder="Email или логин"
                label="Email или логин"

                fullWidth
                required
                margin='normal'

                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emailOrLogin && !!formik.errors.emailOrLogin}
                helperText={formik.touched.emailOrLogin ? formik.errors.emailOrLogin : null}
            />

            <PasswordInput
                id="password"
                name="password"
                placeholder="Пароль"
                label="Пароль"

                fullWidth
                required
                margin='normal'

                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password ? formik.errors.password : null}
            />

            <LoadingButton
                type='submit'
                loading={formik.isSubmitting}
                variant="contained"
                fullWidth
                sx={{
                    margin: '16px 0 8px 0',
                    backgroundColor: '#bd68c5'
                }}
            >
                Войти
            </LoadingButton>

            <p style={{ color: '#9a0000' }}>{error}</p>
        </form>
    )
}