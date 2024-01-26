import React from 'react'
import "./tasksideStyle.css"

const CreateTask = () => {

  return (
    <>
        <div className='createTaskShadow'>
            <div className='createTask'>
                <h3>Add New Task</h3>
                <div className='titleInput'>
                    <label>Title</label>
                    <input
                    type='text'
                    placeholder='e.g. Take coffee break'
                    />
                </div>
                <div className='DescriptionInput'>
                    <label>Description</label>
                    <textarea 
                    type='text'
                    placeholder="e.g. It's always good to take a break. This 15minutes break will recharge the batteries a little."
                    />
                </div>
                <div className='subtasksInput'>
                    <label>Subtasks</label>
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
                    <label>Status</label>
                    <select>
                        <option>Todo</option>
                        <option>Doing</option>
                        <option>Done</option>
                    </select>
                </div>

                <button className='createTaskBtn'>Create Task</button>
                
            </div>
        </div>
    </>
  )
}

export default CreateTask
