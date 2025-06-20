import { BsTrash2 } from "react-icons/bs"
import { FiEdit } from "react-icons/fi"


export default function Item({task,handleDelete, handleUpdate}) {
    return (
        <div className="flex justify-between items-center gap-3 py-1 border-b">
            <p>{task.title}</p>
            <input type="checkbox" checked={task.status} readOnly/>
            <div className="flex items-center gap-3">
                <button className="btn btn-square" onClick={handleDelete} >
                    <BsTrash2 size={24} color="red" />
                </button>
                <button className="btn btn-square" onClick={handleUpdate} >
                    <FiEdit size={24} color="green" />
                </button>
            </div>
        </div>
    )
}
