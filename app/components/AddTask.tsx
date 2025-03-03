import React from 'react'
import { AiOutlinePlus } from "react-icons/ai";

const AddTask = () => {
  return (
    <div>
        <button className='btn btn-primary w-full'>
        Add New Task<AiOutlinePlus className='ml-2' size={10}/></button>
    </div>
  )
}

export default AddTask