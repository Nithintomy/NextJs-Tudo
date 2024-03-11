"use client";

import { ITask } from "@/types/task";
import { FormEventHandler, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { DeleteTodo, EditTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const router = useRouter();
  const handleSubmitEditTudo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await EditTodo({
      id: task.id,
      text: taskToEdit,
    });

    setTaskToEdit("");
    setOpenModalEdit(false);
    router.refresh();
  };


  const handleDelete =async(id:string)=>{
    await DeleteTodo(id)
    setOpenModalDelete(false)
    router.refresh()

  }

  return (
    <tr key={task.id}>
      <td>{task.text}</td>

      <td className="flex gap-5">
        <FaEdit
          cursor="pointer"
          className="text-blue-600"
          size={25}
          onClick={() => setOpenModalEdit(true)}
        />

        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTudo}>
            <h2 className="font-bold text-lg">Edit Task</h2>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary w-full"
              />
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <MdDeleteForever cursor="pointer" className="text-red-500" size={25} onClick={()=>setOpenModalDelete(true)} />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <div role="alert" className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Are You Serious</span>
            <div>
              <button className="btn btn-sm">Deny</button>
              <button className="btn btn-sm btn-primary" onClick={()=>handleDelete(task.id)}>Accept</button>
            </div>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
