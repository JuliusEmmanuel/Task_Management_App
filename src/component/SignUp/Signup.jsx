import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import "./signupStyle.css"
import { Thecontext } from '../../App'
import axios from 'axios';
import Loading from '../Pages/Taskside/Loading'


const Signup = () => {

  const {setUser, isLoading, setIsLoading} = useContext(Thecontext)

  const initialValues = {
    firstName : "",
    lastName : "",
    email : "",
    phoneNumber : "",
    password : "",
    confirmPassword : "",
  }

const [formValues, setFormValues] = useState(initialValues)
const [formErrors, setFormErrors] = useState({});
const [isSubmit, setIsSubmit] = useState(false); 

const [loader, setLoading] = useState(false);


const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
    // console.log(formValues)
    setFormErrors(false)
}

// const url = "https://todo-app-1dpq.onrender.com/api/v1/user/sign-up"
const url = "https://othneil-todolapp.onrender.com/api/v1/user/sign-up"
// const url = "https://othneil-todolapp.onrender.com/api/sign-up"
 const data = {firstname:formValues.firstName, lastname:formValues.lastName, email:formValues.email, phoneNumber:formValues.phoneNumber, userPassword : formValues.password, confirmPassword:formValues.confirmPassword}
//  const data = {fullName:formValues.firstName, email:formValues.email, phoneNumber:formValues.phoneNumber, password: formValues.password}



const handleSubmit = async (e)=>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    // if (validate){
    //   setIsSubmit(false);
      
    // }else{
    //   setIsSubmit(true);

    // }

    // if (isSubmit){
    //     console.log("faulty")
    // }else{
      // Swal.fire({
      //     title: "Success!",
      //     text: "Your account has been created successfully!",
      //     icon: "success",
      //     confirmButtonText: "ok",
      //   }).then(function() {
      //     window.location.href = "/home";
      //     }) 
    // }

    try {
         setIsLoading(true)
      const response = await axios.post(url, data)
      setIsLoading(false)
      console.log(response)
      localStorage.setItem("userProfile", response.data.data.firstName.charAt(0))

       Swal.fire({
             title: "Success!",
             text: response.data.message,
             icon: "success",
             confirmButtonText: "ok",
           }).then(function() {
                  window.location.href = "/login";
               }) 

    }
    catch (err){
      setIsLoading(false);
      console.log(err);
      if (err.response.status === 500 || err.response.status === 404){
        Swal.fire({
          title: "error!",
          text: "",
          icon: "error",
          confirmButtonText: "ok",
          })
      }
    }
    
  }

  const validate = (values)=>{
    const errors = {};
    const corremail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // const correname = /^[a-z ,.'-]+$/i
    // console.log(values.confirmPassword)
    if ( !values.firstName ) {
      errors.firstName = "first name is required!"
    }
    if ( !values.lastName ) {
      errors.lastName = "last name is required!"
    }
    if ( !values.email ) {
      errors.email = "email is required!"
    } else if (!corremail.test(values.email)) {
      errors.email = "This is not a valid email format!"
    }
    if ( !values.phoneNumber ) {
      errors.phoneNumber = "phone number is required!"
    }
    if ( !values.password ) {
      errors.password = "password is required!"
    } else if ( values.password.length < 7) {
        errors.password = "password should not be less than 7 characters!"
      }
    if ( !values.confirmPassword ) {
      errors.confirmPassword = "must confirm password"
    } else if(values.confirmPassword === values.password) {
        errors.confirmPassword = ""
    }else{ 
        errors.confirmPassword = "the password must  match "
    }

    return errors;
    
  }

  

  return (
   <>
   
    <div className='signupArena'>
      <div className='form'>
        <div className='theForm'>
          <div className='theformTop'>
            <h1>Sign up</h1>
            <div className='line'></div>
          </div>

          <div className='theformBody'>
            <div className='theInput'>
              <p>First Name</p>
              <input 
              type='text'
              name='firstName' 
              placeholder='First name'
              value={ formValues.firstName }
              onChange={handleChange}
              style={formErrors.firstName ? {border: "1px solid red"} : null }
              />
              { formErrors ?<p style={{color: "red", fontSize: "13px"}}>{formErrors.firstName}</p> : null }
            </div>

            <div className='theInput'>
              <p>Last Name</p>
              <input 
              type='text' 
              placeholder='Last name'
              name='lastName'
              value={ formValues.lastName }
              onChange={handleChange}
              style={formErrors.lastName ? {border: "1px solid red"} : null }
              />
              { formErrors ?<p style={{color: "red", fontSize: "13px"}}>{formErrors.lastName}</p> : null }
            </div>

            <div className='theInput'>
              <p>Email</p>
              <input 
              type='text' 
              placeholder='Email'
              name='email'
              value={ formValues.email }
              onChange={handleChange}
              style={formErrors.email ? {border: "1px solid red"} : null }
              />
              { formErrors ?<p style={{color: "red", fontSize: "13px"}}>{formErrors.email}</p> : null }
            </div>

            <div className='theInput'>
              <p>Phone Number</p>
              <input 
              type='text' 
              placeholder='Phone Number'
              name='phoneNumber'
              value={ formValues.phoneNumber }
              onChange={handleChange}
              style={formErrors.phoneNumber ? {border: "1px solid red"} : null }
              />
              { formErrors ?<p style={{color: "red", fontSize: "13px"}}>{formErrors.phoneNumber}</p> : null }
            </div>

            <div className='theInput'>
              <p>Password</p>
              <input 
              type='text' 
              placeholder='Password'
              name='password'
              value={ formValues.password }
              onChange={handleChange}
              style={formErrors.password ? {border: "1px solid red"} : null }
              />
              { formErrors ?<p style={{color: "red", fontSize: "13px"}}>{formErrors.password}</p> : null }
            </div>

            <div className='theInput'>
              <p>confirm Password</p>
              <input 
              type='text' 
              placeholder='confirm Password'
              name='confirmPassword'
              value={ formValues.confirmPassword }
              onChange={handleChange}
              style={formErrors.confirmPassword ? {border: "1px solid red"} : null }
              />
              { formErrors ?<p style={{color: "red", fontSize: "13px"}}>{formErrors.confirmPassword}</p> : null }
            </div>

            <button className='signupBtn' onClick={handleSubmit}>Sign up</button>

            <div className='signupFooter'>Already have an Account? <Link className="Link" to= "/login">Login</Link></div>
          </div>
        </div>
      </div>
    </div>


    {isLoading ? <Loading/> : null }
   
   </>
  )
}

export default Signup
