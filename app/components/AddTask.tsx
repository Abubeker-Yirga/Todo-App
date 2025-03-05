'use client'
import React, { useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import Modal from './Modal';
import { addTodo } from '@/public/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');

  const handleSubmitNewTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      text: newTaskValue});
    setNewTaskValue('');
    setModalOpen(false);
    router.refresh();
};

  return (
    <div>
        <button onClick={() => setModalOpen(true)}
         className='btn btn-primary w-full'>
        Add New Task<AiOutlinePlus className='ml-2' size={18}/></button>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
         <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Add New Task</h3>
          <div className='modal-action'>
          <input 
          value={newTaskValue}
          onChange={(e) => setNewTaskValue(e.target.value)}
          type="text" 
          placeholder="Type here" 
          className="input input-bordered w-full w-full" />
          <button type='submit' className='btn btn-primary'>Submit</button>
          </div>
         </form>
        </Modal>
    </div>
  )
}

export default AddTask