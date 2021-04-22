import React from 'react'
import {Formik,Field, Form} from 'formik'
import { FilterType } from '../redux/users-reducer'
import {TextField,FormControl, Button} from '@material-ui/core'



const UsersSearchFormValidate = (values: any) =>{
   const errors = {} 
    return errors
}

type UsersSearchFormObjectType = {
    term: string
    
}

type UserSearchType = {
  onFilterChanged: (filter: FilterType) => void
}

type FormType = {
  term: string
  friend: 'null' | 'true' | 'false'
}

export const UsersSearchForm: React.FC<UserSearchType> = React.memo((props) => {

  const submit = (values: FormType , {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
    
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ?  true: false
    }
    
    props.onFilterChanged(filter)
    setSubmitting(false)
  }



  

    return  <div>
             <Formik
       initialValues={{ term: '', friend: 'null'}}
       validate={UsersSearchFormValidate}
       onSubmit={submit}
     >
       {({ isSubmitting }) => (
         <Form>
           <TextField color='secondary' type="text" name="term" />
           <Field name="friend" as="select">
           <option value="null">All</option>
           <option value="true">Only followed</option>
           <option value="false">Only unfollowed</option>
          </Field>
          
        
           <Button type="submit"   color='secondary' disabled={isSubmitting}>
             Find
           </Button>
         </Form>
       )}
     </Formik>

        </div>
    
})