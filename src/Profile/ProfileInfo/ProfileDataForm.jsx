import React from "react";
import {useFormik} from "formik";
import {Redirect} from "react-router";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from "@material-ui/core";
import {Contact} from "./ProfileInfo";

export const  ProfileDataForm = (props) => {

    const contactsTitle = () => {
       return <div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={props.profile[key]}/>
        })}
        </div>
    }

    const formik = useFormik({
        initialValues: {
           fullName: props.profile.fullName,
            lookingForAJob: props.profile.lookingForAJob,
            lookingForAJobDescription: props.profile.lookingForAJobDescription,
            aboutMe: props.profile.aboutMe,
            // contacts: Object.keys(props.profile.contacts)

        },
        onSubmit: values => {
            alert(JSON.stringify(values));
            formik.resetForm()
            props.saveProfileTC(values)
            props.setEditMode(false)
        },
    })

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>

              <div><Button type={'submit'} variant={'contained'} color={'secondary'}>Save</Button></div>
                <FormControl>
                    <FormGroup>
                        <div>
                            <b>Full name</b>
                            <div>
                                <TextField

                                    {...formik.getFieldProps('fullName')}
                                />
                            </div>
                        </div>

                        <div>
                            <b>My professional skills</b>:
                            <div>
                                <TextField

                                    {...formik.getFieldProps('lookingForAJobDescription')}
                                />
                            </div>
                        </div>
                        <div>
                            <b>About me</b>:
                            <div>
                                <TextField
                                    {...formik.getFieldProps('aboutMe')}
                                />
                            </div>
                            <div>
                                <b>Looking for a job</b>:
                                <div>
                                    <Checkbox

                                        {...formik.getFieldProps('lookingForAJob')}
                                    />
                                </div>
                            </div>
                            {/*<div>*/}
                            {/*    <div>*/}
                            {/*        <TextField*/}
                            {/*            {...formik.getFieldProps('contacts')}*/}

                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

