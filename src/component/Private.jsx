import React, { useContext, useEffect } from 'react'
import{ Outlet, Navigate } from "react-router-dom"
import { Thecontext } from '../App'

const Private = () => {

    const {user, setUser} = useContext(Thecontext)

      const Token = (localStorage.getItem("myToken"))
      console.log(user)

    
  return (
   <>
   
    {Token ?  <Outlet/> : <Navigate to = "/login"/>}

   </>
  )
}

export default Private
