import React, { useContext, useEffect } from 'react'
import {useParams} from "react-router-dom"
import { Thecontext } from "../../../App"
import "./tasksideStyle.css"
import axios from 'axios';
import "./taskStyle.css"



export const Task = () => {


    const {
        titleDetail, setTitleDetail,
        descriptionDetail, setDescriptionDetail,
        taskId,setTaskId
        } = useContext(Thecontext)

    const {id} = useParams()
    const taskUrl = "https://othneil-todolapp.onrender.com/api/v1/task/get-task"
    const theTaskId = taskId


    useEffect(()=>{

        async function fetchStatusId(){
            try {
   
                const response = await axios.get(taskUrl, theTaskId,
                    {
                        headers: {
                            "Authorization" : `Bearer ${localStorage.getItem("myUserToken")}`
                         }
                    }
                    )
                console.log(response)
            }
            catch(err){
                console.log(err)
            }
        }

        fetchStatusId()
        
    },[id])

  return (
    <>
    
        <div className='taskDetail'>
            <div className='taskContents'>
                <div className='headerTask'>{titleDetail}</div>
                <div className='line'></div>
                <div className='bodyTask'>
                    {descriptionDetail}
                </div>
                <div className='footerTask'>

                </div>
                <button className='taskDetailCloseBtn'>Close</button>
            </div>
        </div>
    
    </>
  )
}

export default Task
