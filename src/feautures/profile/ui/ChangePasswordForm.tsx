import { LoadingButton } from "@mui/lab"
import { useFormik } from "formik"
import { PasswordInput } from "../../../shared/ui/PasswordInput"
import * as Yup from 'yup';
import { useChangePassword } from "../profileAPI";


const initialValues = {
    password: '',
    passwordCheck: '',
}

const validationSchema = Yup.object({
    password: Yup.string()
        .required()
        .min(6, 'Пароль должен быть не менее 6 символов.')
        .test('DoesPasswordHaveUppercase',
            "Пароль должен содержать заглавную букву",
            password => password !== password.toLocaleLowerCase())
        .test('DoesPasswordHaveLowercase',
            'Пароль должен содержать строчную букву',
            password => password !== password.toUpperCase())
        .matches(/\d+/, 'Пароль должен содержать цифру.'),
    confirmPassword: Yup.string().required()
})

export function ChangePassword() {
    const [changePassword, metadata] = useChangePassword();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async values => {
            console.log(values.password);
            changePassword(values.password);
        }
    })
    
    console.log(formik.values);

    return (
        <>
            <h2>Изменить пароль</h2>
            <form
                onSubmit={formik.handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}
            >
                <PasswordInput
                    id='password'
                    name='password'
                    placeholder="Новый пароль"
                    label="Новый пароль"

                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={formik.touched.password ? formik.errors.password : null}

                />
                <PasswordInput
                    id='passwordCheck'
                    name='passwordCheck'
                    placeholder="Подтверждение пароля"
                    label="Подтверждение пароля"

                    value={formik.values.passwordCheck}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.passwordCheck && formik.values.passwordCheck !== formik.values.password}
                    helperText={!!formik.touched.passwordCheck && formik.values.password !== formik.values.passwordCheck
                        ? 'Пароли не совпадают.' : null}
                />
                <LoadingButton
                    type='submit'
                    loading={metadata.isLoading}
                    variant='outlined'
                    sx={{ alignSelf: 'flex-end' }}
                    onClick={() => {
                        console.log('AAAAAAa');
                        changePassword(formik.values.password);
                    }}
                >
                    Изменить
                </LoadingButton>

            </form>
        </>
    )
}