import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import "./loginStyle.css"
import Swal from 'sweetalert2'
import axios from 'axios';
import Loading from '../Pages/Taskside/Loading';
import { Thecontext } from '../../App';


const Login = () => {


  const {sidebar, setSidebar, 
    mode, setMode,
    showCreateBoard, setShowCreateBoard,
    titleDetail, setTitleDetail,
    descriptionDetail, setDescriptionDetail,
    setTaskId,
    isLoading, setIsLoading,
    userNameFirstLetter, setUserNameFirstLetter
    } = useContext(Thecontext)


  const initialValues = {
    email : "",
    password : "",
  }

  const [loginValues, setLoginValues] = useState(initialValues) 
  const [loginErrors, setLoginErrors] = useState() 



  const handleChange = (e)=>{
    const { name, value } = e.target;
    setLoginValues({...loginValues, [name]: value });
    // console.log(loginValues)
    // setLoginErrors(false)
}


const url = "https://othneil-todolapp.onrender.com/api/v1/user/sign-in"
const usersUrl = "https://othneil-todolapp.onrender.com/api/v1/user/get-users"
const data = {email: loginValues.email, password: loginValues.password}

const handleLogin = async (e)=>{
    e.preventDefault();
    // setLoginErrors(validate(loginValues));

    try {
        setIsLoading(true)
        const response = await axios.post(url, data)
        setIsLoading(false)
        console.log(response)
        console.log(response.data.message)
        localStorage.setItem("myToken", response.data.data)
        setUserNameFirstLetter(localStorage.getItem("userProfile"))
        Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "ok",
            }).then(function() {
            window.location.href = "/home";
            }) 
    }
    catch(err){
      setIsLoading(false)
      Swal.fire({
        title: "error!",
        text: err.response.data.message,
        icon: "error",
        confirmButtonText: "ok",
        }) 
      console.log(err);
    }

    try {
        // setIsLoading(true)
        const response = await axios.get(usersUrl)
        // setIsLoading(false)
        console.log(response)
        console.log(response.data.data.email)
        // localStorage.setItem("myToken", response.data.data)
        // Swal.fire({
        //     title: "Success!",
        //     text: response.data.message,
        //     icon: "success",
        //     confirmButtonText: "ok",
        //     }).then(function() {
        //     window.location.href = "/home";
        //     }) 
    }
    catch(err){
      // setIsLoading(false)
      console.log(err);
    }
}



// const validate = (values)=>{
//   const errors = {};
//   const corremail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//   // const correname = /^[a-z ,.'-]+$/i
//   // console.log(values.confirmPassword)
//   if ( !values.email ) {
//     errors.email = "email is required!"
//   } else if (!corremail.test(values.email)) {
//     errors.email = "This is not a valid email format!"
//   }
//   if ( !values.password ) {
//     errors.password = "password is required!"
//   } else if ( values.password.length < 7) {
//       errors.password = "password should not be less than 7 characters!"
//     }

//   return errors;
  
// }

  return (
    <>
    
    <div className='loginArena'>
      <div className='form'>
        <div className='theForm'>
          <div className='theformTop'>
            <h1>Login</h1>
            <div className='line'></div>
          </div>

          <div className='theformBody'>
            <div className='theInput'>
              <p>Email</p>
              <input 
              type='text'
              name='email' 
              placeholder='Email'
              value={ loginValues.email }
              onChange={handleChange}
              // style={loginErrors.email ? {border: "1px solid red"} : null }
              />
              {/* { loginErrors ?<p style={{color: "red", fontSize: "13px"}}>{loginErrors.email}</p> : null } */}
            </div>

            <div className='theInput'>
              <p>Password</p>
              <input 
              type='text' 
              name='password'
              placeholder='Password'
              value={ loginValues.password }
              onChange={handleChange}
              // style={ loginErrors.password ? { border: "1px solid red" } : null}
              />
              {/* { loginErrors ?<p style={{color: "red", fontSize: "13px"}}>{loginErrors.password}</p> : null } */}
            </div>

            <button className='signupBtn' onClick={ handleLogin }>Login</button>

            <p>Don't have an Account? <Link className="Link" to= "/">Sign up</Link></p>
          </div>
        </div>
      </div>

      {
          isLoading ? <Loading/> : null
        }
    </div>
    
    </>
  )
}

export default Login
