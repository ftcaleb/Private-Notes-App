import React, { useState } from "react";
import { useEffect } from "react";


function NotesModal({closeModal, addNote, currentNote, editNote}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    

    const handleSubmit = (e) => {
    e.preventDefault();
    if (currentNote) {
        editNote(currentNote.id, title, description)
    } else {
        addNote(title, description)
    }
    
  };

  useEffect(() => {
    if (currentNote) {
        setTitle(currentNote.title)
        setDescription(currentNote.description)
    }
  }, [currentNote])

  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-8 rounded">
            <h2 className="text-xl font-bold mb-4">{currentNote ? "Edit Note" : "Add New Note"}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="border p-2 w-full mb-4"
                />
                <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Note Description"
                className="border p-2 w-full mb-4"
                ></textarea>
                <button
                type="submit"
                className="block w-full  bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {currentNote ?"Update Note" : "Add Note"}
                </button>
            </form>
            <button className="mt-4 text-red-500" onClick={closeModal}>Cancel</button>

        </div>
        
    </div>
  )
}

export default NotesModal