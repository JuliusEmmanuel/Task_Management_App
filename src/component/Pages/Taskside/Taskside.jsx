import React, { useState, useContext, useEffect } from 'react'
import "./tasksideStyle.css"
import { Thecontext } from "../../../App"
import 'animate.css';
import axios from 'axios';
import { Link, Navigate, useParams } from 'react-router-dom';
import Loading from './Loading';


const Taskside = () => {

  const {sidebar, setSidebar, 
        mode, setMode,
        showCreateBoard, setShowCreateBoard,
        titleDetail, setTitleDetail,
        descriptionDetail, setDescriptionDetail,
        setTaskId,
        isLoading, setIsLoading,
        userNameFirstLetter,setUserNameFirstLetter
        } = useContext(Thecontext)



  const [createTask, setCreateTask] = useState(false)
  const [theTask, setTheTask] = useState(JSON.parse(localStorage.getItem("theTask"))||[])
  const [theTask2, setTheTask2] = useState(JSON.parse(localStorage.getItem("theTask2"))||[])
  const [theTask3, setTheTask3] = useState(JSON.parse(localStorage.getItem("theTask3"))||[])
  const [status, setStatus] = useState()
  const [tasks, setTasks] = useState(
    {
      title : "",
      description : ""
    }
  )

  const [tasks2, setTasks2] = useState(
    {
      title : "",
      description : ""
    }
  )

  const [tasks3, setTasks3] = useState(
    {
      title : "",
      description : ""
    }
  )

  const [tasks4, setTasks4] = useState(
    {
      title : "",
      description : "",
    }
  )



  

  const handleAddNewTask =  (e)=>{
    e.preventDefault()
    setCreateTask(true)
  }

  const handleTitleChange = (e)=>{
    const newTitle = e.target.value
    setTasks( {...tasks, title: newTitle } )
    setTasks2( {...tasks2, title: newTitle } )
    setTasks3( {...tasks3, title: newTitle } )
    setTasks4( {...tasks4, title: newTitle } )
  }
  const handleDescriptionChange = (e)=>{
    const newDescription = e.target.value
    setTasks( {...tasks, description: newDescription } )
    setTasks2( {...tasks2, description: newDescription } )
    setTasks3( {...tasks3, description: newDescription } )
    setTasks4( {...tasks4, description: newDescription } )
    // console.log(tasks4)
  }

  // const handleStatusChange = (e)=>{
  //   const newStatus = e.target.value
  //   setStatus(newStatus)
  //   console.log(status)
  // }

  const [theTodo, setTheTodo] = useState(false)
  const [theDoing, setTheDoing] = useState(false)
  const [theDone, setTheDone] = useState(false)

  const addNewTaskUrl = "https://othneil-todolapp.onrender.com/api/v1/task/create-task"
  const getAllStatusUrl = "https://othneil-todolapp.onrender.com/api/v1/status/get-Status"
  const tastData = {title: tasks4.title, desc: tasks4.description, statusId : "65a380d1532aefad0cbcaecb"}


  const [todoStatus, setTodoStatus] = useState()
  const [doingStatus, setDoingStatus] = useState()
  const [doneStatus, setDoneStatus] = useState()

  const statusIdUrl = "https://othneil-todolapp.onrender.com/api/v1/status/get-astatus/"
  // const todoIds = todoStatus[0]._id
  // const doingIds = doingStatus[0]._id
  // const doneIds = doneStatus[0]._id
  // const statusIds = {todoIds, doingIds, doneIds}


 

  const handleStatusChange = async (e)=>{
  
      const theStatus= e.target.value
       setStatus(theStatus)
      console.log(theStatus)
    try {
      const response = await axios.get(statusIdUrl, {id : "65a380d1532aefad0cbcaecb"})
        console.log(response)
      }
      catch(err){
        console.log(err)
      }
  }

  const [todoId, setTodoId] = useState()
  const [doingId, setDoingId] = useState()
  const [doneId, setDoneId] = useState()

  const [todoTasks, setTodoTasks] = useState()
  const [doingTasks, setDoingTasks] = useState()
  const [doneTasks, setDoneTasks] = useState()


  useEffect(()=>{

    async function fetchStatus(){
        try {
              const response = await axios.get(getAllStatusUrl)
              console.log(response.data.data[0].Tasks)
              setTodoTasks(response.data.data[0].Tasks)
              setTodoId(response.data.data[0]._id)
              console.log(response.data.data)
              setTodoStatus(response.data.data[0].statusDesc)
              setDoingStatus(response.data.data[1].statusDesc)
              setDoneStatus(response.data.data[2].statusDesc)
          }
          catch(err){
            console.log(err)
          }      
    }
    fetchStatus()
    
  },[])


  const [tasksTitle, setTasksTitle] = useState()
  const [tasksDesc, setTasksDesc] = useState()


    
  const handleCreateTask = async()=>{

    setTodoTasks([...todoTasks, tasks])
    console.log(todoTasks)

    try {
      const response = await axios.post(addNewTaskUrl, tastData, 
        {
        headers: {
           "Authorization" : `Bearer ${localStorage.getItem("myToken")}`
        }
      })
      localStorage.setItem("myUserToken", response.data.data.userId)
      console.log(response.data)
      setTaskId(response.data.data._id)
      setTitleDetail(response.data.data.title)
      setDescriptionDetail(response.data.data.desc)
      setTasksDesc(response.data.data.desc)
      setTasksTitle(response.data.data.title)
      
    }
    catch(err){
      console.log(err)
    }
    
    setTasks({...tasks, title: tasksTitle, description: tasksDesc})
    setCreateTask(false)
    console.log(status)
    if (status === "TODO"){
      setTheTodo(true)
      setTheTask( [...theTask, tasks ])
      console.log(theTask)
    }else if (status === "DOING"){
      setTheDoing(true)
      setTheTask2( [...theTask2, tasks2 ])
    }else if (status === "DONE"){
      setTheDone(true)
      setTheTask3( [...theTask3, tasks3 ])

    }

  }

  localStorage.setItem("theTask", JSON.stringify(theTask))
  localStorage.setItem("theTask2", JSON.stringify(theTask2))
  localStorage.setItem("theTask3", JSON.stringify(theTask3))
  
  


  const [showLogout, setShowLogout] = useState(false)

  // const logoutUrl =  "https://othneil-todolapp.onrender.com/api/v1/user/sign-out"

  const handleShowLogout = ()=>{
   
    if (showLogout){
      setShowLogout(false)
    }else{
      setShowLogout(true)
    }

  }


 const [removeToken, setRemoveToken] = useState(false)

  // const handleLogout = ()=>{
  //   // const getToken = (localStorage.getItem("myToken"))
  //   const removeTheToken = 
    
      
  // }


  const [showTodoTask, setShowTodoTask] = useState(true)
  const [showDoingTask, setShowDoingTask] = useState(true)
  const [showDoneTask, setShowDoneTask] = useState(true)

  const [userProfile, setUserProfile] = useState()

  useEffect(()=>{
    setUserProfile(userNameFirstLetter || localStorage.getItem("userProfile"))
    
  },[])


  const removeTask1 = (todoId)=>{
    const removeTask1 = theTask.filter((l) => l.todoId !== todoId)
    setTheTask(removeTask1)
  }
  const removeTask2 = (doingId)=>{
    const removeTask2 = theTask2.filter((l) => l.doingId !== doingId)
    setTheTask2(removeTask2)
  }
  const removeTask3 = (doneId)=>{
    const removeTask3 = theTask3.filter((l) => l.doneId !== doneId)
    setTheTask3(removeTask3)
  }


  return (
    <>
    
      <div className='taskSide'style={mode ? { backgroundColor: "white"} : null }>
        <div className='taskHeader'>
          <div className='taskHeaderLeft'>Platform Launch</div>
          <div className='taskHeaderRight'>
            <button className='taskHeaderRightBtn' onClick={ handleAddNewTask }>+ Add New Task</button>
            <div className='taskHeaderRightProfile'>
              <div className='profilecircle' onClick={ handleShowLogout}> {userProfile || userNameFirstLetter} </div>
              {
                showLogout ? <Link  to = "/login" className='profileLogout' onClick={()=>localStorage.removeItem("myToken")}>Log out</Link> : null
              }
            </div>
           {
            sidebar ?  <div className='revealSidebar' onClick={()=>setSidebar(false)}>Show sidebar</div>: null
           }
          </div>
        </div>
        <div className='taskBody'>
          <div className='todoPart'>
            <div className='todoPartTop'>
              <div className='todoPartcircle'></div>
              <p>{todoStatus} ({theTask.length})</p>
            </div>
            <div className='theTaskPart'>
              {
                theTodo ? theTask.map((e)=>(
                      <div key={todoId} className='theTask'>
                        <div className='task'>
                          <h3>{e.title}</h3>
                          <p>{e.description}</p>
                        </div>
                        <div className='deleteTask' onClick={()=> removeTask1(todoId)}>x</div>
                      </div>
                )) : showTodoTask ? theTask.map((e)=>(
                  <div key={todoId} className='theTask'>
                    <div className='task'>
                      <h3>{e.title}</h3>
                      <p>{e.description}</p>
                    </div>
                    <div className='deleteTask' onClick={()=> removeTask1(todoId)}>x</div>
                  </div>
                )) : null
              }
            </div>
          </div>

          <div className='doingPart'>
            <div className='doingPartTop'>
              <div className='doingPartcircle'></div>
              <p>{doingStatus} ({theTask2.length})</p>
            </div>
            <div className='theTaskPart'>
              {
                theDoing ? theTask2.map((e)=>(
                  
                  <div className='theTask'>
                    <div key={doingId} className='task'>
                      <h3>{e.title}</h3>
                      <p>{e.description}</p>
                    </div>
                    <div className='deleteTask' onClick={()=> removeTask2(doingId)}>x</div>
                  </div>
                 
                )) : showDoingTask ? theTask2.map((e)=>(
                  <div className='theTask'>
                    <div key={doingId} className='task'>
                      <h3>{e.title}</h3>
                      <p>{e.description}</p>
                    </div>
                    <div className='deleteTask' onClick={()=> removeTask2(doingId)}>x</div>
                  </div>
                  
                )) : null
              }
            </div>
          </div>

          <div className='donePart'>
            <div className='donePartTop'>
              <div className='donePartCircleircle'></div>
              <p>{doneStatus} ({theTask3.length})</p>
            </div>
            <div className='theTaskPart'>
              {
                theDone ? theTask3.map((e)=>(
                 
                  <div key={doneId} className='theTask'>
                    <div className='task'>
                      <h3>{e.title}</h3>
                      <p>{e.description}</p>
                    </div>
                    <div className='deleteTask' onClick={()=> removeTask3(doneId)}>x</div>
                  </div>
                 
                )) : showDoneTask ? theTask3.map((e)=>(
                
                  <div key={doneId} className='theTask'>
                    <div className='task'>
                      <h3>{e.title}</h3>
                      <p>{e.description}</p>
                    </div>
                    <div className='deleteTask' onClick={()=> removeTask3(doneId)}>x</div>
                  </div>
                
                )) : null
              }
            </div>
          </div>
        </div>

        {
          createTask ? 
          <div className='createTaskShadow'>
            <div className='createTask'>
                <div className='createTaskTop'>
                  <h3>Add New Task</h3>
                  <button onClick={((e)=>setCreateTask(e.true))}>close</button>
                </div>
                <div className='titleInput'>
                    <div className='label'>Title</div>
                    <textarea
                    type='text'
                    placeholder='e.g. Take coffee break'
                    onChange={ handleTitleChange }
                    />
                </div>
                <div className='DescriptionInput'>
                    <div className='label'>Description</div>
                    <textarea 
                    type='text'
                    placeholder="e.g. It's always good to take a break. This 15minutes break will recharge the batteries a little."
                    onChange={ handleDescriptionChange }
                    />
                </div>
                <div className='subtasksInput'>
                    <div className='label'>Subtasks</div>
                    <div className='subtasksInputDiv'>
                        <input
                        type='text'
                        placeholder='e.g. Make coffee'
                        />
                        <div className='deleteSubtask'>X</div>
                    </div>
                    <div className='subtasksInputDiv'>
                        <input
                        type='text'
                        placeholder='e.g. Drink coffee and smile'
                        />
                        <div className='deleteSubtask'>X</div>
                    </div>
                </div>

                <button className='addNewSubtaskBtn'>+ Add New Subtask</button>

                <div className='statusInput'>
                    <div className='label'>Status</div>
                    <select onChange={ handleStatusChange }>
                        <option value="select status">select status</option>
                        <option value={todoStatus}>{todoId}</option>
                        <option> {doingStatus}</option>
                        <option>{doneStatus}</option>
                    </select>
                </div>

                <button className='createTaskBtn' onClick={ handleCreateTask }>Create Task</button>
            </div>
        </div> : null
        }

        {
          showCreateBoard ? 
          <div className='confirmNewBoard'>
            <div className='confirmBoardtop'>
              <div className='confirmBoardText'>Input Name of Board</div>
              <button className='confirmBoardTopBtn' onClick={()=>setShowCreateBoard(false)}>Back</button>
            </div>
            <input type='text' placeholder='create board'/>
            <button className='confirmNewBoardBtn'>Create New Board</button>
          </div> : null
        }


        {
          isLoading ? <Loading/> : null
        }
        

      </div>
    
    </>
  )
}

export default Taskside
