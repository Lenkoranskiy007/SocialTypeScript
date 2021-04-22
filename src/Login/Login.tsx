import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {connect, useDispatch, useSelector} from "react-redux";
import {loginTC} from "../redux/auth-reducer";
import {Redirect} from "react-router";
import { AppStateType } from '../redux/redux-store';




export const Login = (props: any) => {
    const dispatch = useDispatch()
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captchaUrl: captchaUrl
        },
        validate: (values) => {
            const errors: any = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            } else if(!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 2) {
                errors.password = 'Invalid password'
            }
            return errors;
        },


        onSubmit: values => {
            // alert(JSON.stringify(values));
            // formik.resetForm()
             //@ts-ignore
             dispatch(loginTC(values.email, values.password ,values.rememberMe, values.captchaUrl))
        },
    })
    if(isAuth) {
        return <Redirect to={'/profile'}/>
    }


    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl>

                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div>: null}
                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div>: null}
                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox
                        onChange={formik.handleChange}
                        checked={formik.values.rememberMe}
                        name="rememberMe"
                        />}
                    />
                    {captchaUrl && <img src={captchaUrl}/>}
                    {captchaUrl && <TextField
                        margin="normal"
                        {...formik.getFieldProps('captchaUrl')}
                    />}

                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
}



