import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {connect} from "react-redux";
import {loginTC} from "../redux/auth-reducer";
import {Redirect} from "react-router";




export const Login = (props) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captchaUrl: props.captchaUrl
        },
        validate: (values) => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            } else if(!values.password) {
                errors.password = 'Required'
            } else if (values.password < 2) {
                errors.password = 'Invalid password'
            }
            return errors;
        },


        onSubmit: values => {
            alert(JSON.stringify(values));
            // formik.resetForm()

             props.login(values.email, values.password ,values.rememberMe, values.captchaUrl)
        },
    })
    if(props.isAuth) {
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
                    {props.captchaUrl && <img src={props.captchaUrl}/>}
                    {props.captchaUrl && <TextField
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


let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

const LoginContainer =  connect(mapStateToProps , {login: loginTC})(Login)
export default LoginContainer

