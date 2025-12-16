import React from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'

function NoteCard({note, onEdit, deleteNote}) {
  return (
    <div className='bg-white p-4 rounded shadow'>
        <label className='block text-sm/6 font-semibold text-label text-Scolor'>Category</label>
        <div className="mt-2.5 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
                                {note.title}
                            </div>
        <p className='mt-4 w-full rounded border p-3'>{note.description}</p>
        <div className='flex flex-col justify-end '>
            <button className='mt-2 block w-full  bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                Note Saved
            </button>
        </div>  
        <div className='flex justify-between'>
                <button className="mt-4 text-black-500" onClick={() => onEdit(note)} >Edit</button>
                <div>
                    <button className="mt-4 text-red-500 " onClick={() => deleteNote(note.id)} >Delete</button>
                </div>
            </div>
    </div>
  )
}

export default NoteCard