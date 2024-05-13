import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { ChangeUserInfoDTO, UserInfo } from "../profile.dto";
import { useChangeUserInfo } from "../profileAPI";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { ImageUpload } from "./ImageUpload";




const initialValues = (user: UserInfo) => {
    return {
        id: user.id,
        name: user.name ? user.name : '',
        lastName: user.lastName ? user.lastName : '',
        login: user.login,
        email: user.email
    } as ChangeUserInfoDTO;
}

const validationSchema = Yup.object({
    login: Yup.string().required('Логин должен содержать хотя бы один символ.'),
    email: Yup.string().required('Email не может быть пустым').email('Введите валидный email.')
})



export function ChangeProfileForm({ user }: { user: UserInfo }) {
    const [changeUserInfo, metadata] = useChangeUserInfo();

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema,
        onSubmit: async (values) => {
            changeUserInfo(values);
        }
    });

    return (
        <>
            <h2>Личные данные</h2>
            <form
                onSubmit={formik.handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}
            >
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Email"

                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email ? formik.errors.email : null}
                />

                <TextField
                    id="login"
                    name="login"
                    label="Логин"
                    placeholder="Логин"

                    value={formik.values.login}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.login && !!formik.errors.login}
                    helperText={formik.touched.login ? formik.errors.login : null}
                />

                <TextField
                    id="name"
                    name="name"
                    label="Имя"
                    placeholder="Имя"

                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && !!formik.errors.name}
                    helperText={formik.touched.name ? formik.errors.name : null}
                />

                <TextField
                    id="lastName"
                    name="lastName"
                    label="Фамилия"
                    placeholder="Фамилия"

                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && !!formik.errors.lastName}
                    helperText={formik.touched.lastName ? formik.errors.lastName : null}
                />

                <LoadingButton
                    type='submit'
                    loading={metadata.isLoading}
                    variant='outlined'
                    sx={{ alignSelf: 'flex-end' }}
                >
                    Поменять
                </LoadingButton>

                {metadata.error ? <p>{metadata.error.toString()}</p> : null}
            </form>
        </>
    )
}