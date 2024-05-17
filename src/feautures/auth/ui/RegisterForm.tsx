import { useFormik } from "formik";
import { RegisterCredentials } from "../auth.dto"
import * as Yup from 'yup';
import { useAppDispatch } from "../../../app/store";
import { register } from "../auth.slice";
import { TextField } from "@mui/material";
import { PasswordInput } from "../../../shared/ui/PasswordInput";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";


const initialValues: RegisterCredentials = {
    email: '',
    login: '',
    password: ''
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Введите валидный email.')
        .required('Введите email.'),
    login: Yup.string()
        .required('Введите логин.'),
    password: Yup.string()
        .required('Введите пароль.')
        .min(6, "Пароль должен содержать минимум 6 символов.")
        .matches(/\d+/, "Пароль должен содержать цифру.")
        .matches(/[a-zа-я]/, "Пароль должен содержать строчные буквы.")
        .matches(/[A-ZА-Я]/, "Пароль должен содержать заглавные буквы.")
})


export function RegisterForm() {
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async values => {
            setError('');
            setIsLoading(true);
            const response = await dispatch(register(values));
            setIsLoading(false);
            if (response.meta.requestStatus === 'rejected') {
                setError(response.payload?.message);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Зарегистрироваться</h2>
            <TextField
                id="email"
                name="email"
                placeholder="Email"
                label="Email"

                fullWidth
                required
                margin='normal'

                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email ? formik.errors.email : null}
            />

            <TextField
                id="login"
                name="login"
                placeholder="Логин"
                label="Логин"

                fullWidth
                required
                margin='normal'

                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.login && !!formik.errors.login}
                helperText={formik.touched.login ? formik.errors.login : null}
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
                Зарегистрироваться
            </LoadingButton>

            <p style={{ color: '#9a0000' }}>{error}</p>
        </form>
    )
}