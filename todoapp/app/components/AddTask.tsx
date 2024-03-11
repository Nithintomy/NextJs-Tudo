"use client"

import { FormEventHandler, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import Modal from './Modal';
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuid4} from 'uuid'

const AddTask = () => {
  const [modalOpen,setModalOpen] =useState<boolean>(false)
  const [newTaskValue,setNewTaskValue] =useState <string>('')
  const router = useRouter()

  const handleSubmitTudo:FormEventHandler<HTMLFormElement> =async(e)=>{
    e.preventDefault()
    await addTodo({
      id:uuid4(),
      text:newTaskValue
    })
    
    setNewTaskValue("")
    setModalOpen(false)
    router.refresh()
  }
  return (
    <div>
      <button onClick={()=>setModalOpen(true)} className='btn btn-warning w-full'>
        Add New Task  <FaPlus className="ml-4" fontSize={18} />
        </button>

        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
         <form onSubmit={handleSubmitTudo}>
          <h2 className='font-bold text-lg'>Add new Task</h2>
          <div className='modal-action'>
          <input value={newTaskValue} onChange={(e)=>setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered input-primary w-full" />
          <button className='btn' type='submit'>Submit</button>
          </div>
         </form>
        </Modal>
  
    </div>
  )
}

export default AddTask 
