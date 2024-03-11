import { ITask } from '@/types/task'
import React from 'react'
import Task from './Task'

interface TodoListProps{
  tasks:ITask[]
}

const TodoList:React.FC<TodoListProps>=({tasks}) => {
  return (
    <div className="overflow-x-auto">
    <table className="table">
  
      <thead>
        <tr>
       
          <th>Tasks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {tasks.map((task)=>(
        <Task task={task}/>
       
      ))}
       
      </tbody>
    </table>
  </div>
  )
}

export default TodoList
