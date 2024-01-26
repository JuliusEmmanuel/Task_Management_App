import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./component/Pages/Home"
import Login from './component/Login/Login'
import Signup from './component/SignUp/Signup'
// import Task from './component/Pages/Taskside/Task'
import { createContext } from 'react'
import Private from './component/Private'
import Loading from './component/Pages/Taskside/Loading'


export const Thecontext = createContext()



const App = () => {

  const [sidebar, setSidebar] = useState(false) 
  const [user, setUser] = useState()
  const [mode, setMode] = useState(false)
  const [showCreateBoard, setShowCreateBoard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [titleDetail, setTitleDetail] = useState()
  const [descriptionDetail, setDescriptionDetail] = useState()
  const [taskId, setTaskId] = useState()
  const [userNameFirstLetter, setUserNameFirstLetter] = useState()

  return (
    <>
    
      <Thecontext.Provider value={{
        sidebar, setSidebar, 
        user, setUser, 
        mode, setMode, 
        showCreateBoard, setShowCreateBoard,
        titleDetail, setTitleDetail,
        descriptionDetail, setDescriptionDetail,
        taskId, setTaskId,
        isLoading, setIsLoading,
        userNameFirstLetter, setUserNameFirstLetter
        }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element= { <Signup/> }/>
            <Route path='/login' element= { <Login/> }/>
            <Route path='/loading' element= { <Loading/> }/>

            <Route element={ <Private/> }>
              <Route path="/home" element={ <Home/> }/>
              {/* <Route path="/task" element={ <Task/> }/> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Thecontext.Provider>

    </>
  )
}

export default App
