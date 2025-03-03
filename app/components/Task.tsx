import { ITasks } from '@/public/types/tasks'
import React from 'react'

interface TaskProps {
    task: ITasks
}

const Task:React.FC<TaskProps> = ({task}) => {
  return (
        <tr key={task.id}>
          <td>{task.text}</td>
        </tr>
    
  )
}

export default Task