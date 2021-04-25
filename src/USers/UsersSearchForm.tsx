import React from 'react'
import {Formik,Field, Form} from 'formik'
import { FilterType } from '../redux/users-reducer'
import {  useSelector } from 'react-redux';
import {getUsersFilter }from "../redux/users-selector";




const UsersSearchFormValidate = (values: any) =>{
   const errors = {} 
    return errors
}

type UserSearchType = {
  onFilterChanged: (filter: FilterType) => void
}


type FriendType = "true" | "false" | "null"


type FormType = {
  term: string
  friend: FriendType
}





export const UsersSearchForm: React.FC<UserSearchType> = React.memo((props) => {

  const filter = useSelector(getUsersFilter)

  const submit = (values: FormType , {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
   
    const filter: FilterType = {
      
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true" ?  true : false
    }
  
    props.onFilterChanged(filter)

     setSubmitting(false)
    } 


    
    return  <div>
      
             <Formik
             enableReinitialize
       initialValues={{ term: filter.term, friend: String(filter.friend) as FriendType }} 
       validate={UsersSearchFormValidate}
       onSubmit={submit}
     >
       
       {({ isSubmitting }) => (
      
       <Form>

           <Field  type="text" name="term" />
           <Field name="friend" as="select">
           <option value="null">All</option>
           <option value="true">Only followed</option>
           <option value="false">Only unfollowed</option>
          </Field>
          
        
           <button type="submit"  disabled={isSubmitting}>
             
             Find
           </button>
         </Form>
       )}
     </Formik>

        </div>
    
})