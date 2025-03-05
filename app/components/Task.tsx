"use client";

import { ITasks } from '@/public/types/tasks'
import React, { useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Modal from './Modal';
import { editTodo } from '@/public/api';
import { deleteTodo } from '@/public/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

interface TaskProps {
    task: ITasks
}

const Task:React.FC<TaskProps> = ({task}) => {
      const router = useRouter();
      const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
      const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
      const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

      const handleSubmitEditTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        await editTodo({id : task.id, text: taskToEdit});
        setOpenModalEdit(false);
        router.refresh();
    }

    const handleDeleteTask = async (id: string) => {
      await deleteTodo(id);
      setOpenModalDelete(false);
      router.refresh();
    }

  return (
        <tr key={task.id}>
          <td className='w-full'>{task.text}</td>
          <td className='flex gap-5'>
          <FiEdit onClick={() => setOpenModalEdit(true)} cursor={'pointer'} className='text-blue-500' size={25}/>
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
         <form onSubmit={handleSubmitEditTodo}>
          <h3 className='font-bold text-lg'>Edit Task</h3>
          <div className='modal-action'>
          <input 
          value={taskToEdit}
          onChange={(e) => setTaskToEdit(e.target.value)}
          type="text" 
          placeholder="Type here" 
          className="input input-bordered w-full" />
          <button type='submit' className='btn btn-primary'>Submit</button>
          </div>
         </form>
        </Modal>

          <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor={'pointer'} className='text-red-500' size={25}/>
          <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >
          <h3 className='font-bold text-lg'>Are you sure, you want to delete this task?</h3>
          <div className='modal-action'>
          <button onClick={() => setOpenModalDelete(false)} type='button' className='btn btn-primary'>Cancel</button>
          <button 
          onClick={() => handleDeleteTask(task.id)}
          type='button' className='btn btn-primary'>Delete</button>
          </div>
          </Modal>
           </td>
        </tr>
    
  )
}

export default Task