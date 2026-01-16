import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Notepad from './components/NotePad';
import Sidebar from './components/Sidebar';
import React, { useState, useEffect } from "react";
import NoteCard from './components/NoteCard';
import NotesModal from './components/NotesModal';

import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null)

  const closeModal = () => setModalOpen(false);

  const onEdit = (note) => {
    setCurrentNote(note)
    setModalOpen(true)
  }

  const editNote = async (id, title, description) => {
  try {
    await axios.put(
       `${API_URL}/notes/${id}`,
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setCurrentNote(null); // reset edit state
    fetchNotes();
    closeModal();
  } catch (error) {
    console.error("Edit note error:", error);
  }
};

  const deleteNote = async (id) => {
  try {
    await axios.delete(
      `${API_URL}/notes/${id}`,
      
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    fetchNotes();
  } catch (error) {
    console.error("Edit note error:", error);
  }
};


  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetchNotes();
  }
}, []);


  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.error("Fetch notes error:", error);
    }
  };

  const addNote = async (title, description) => {
    try {
      await axios.post(
        `${API_URL}/notes`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchNotes();
      closeModal();
    } catch (error) {
      console.error("Add note error:", error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/notepad"
          element={
            <div className="flex h-screen">
              <Sidebar  />

              <div className="bg-black w-full relative">

                <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {notes.map((note) => (
                    <NoteCard key={note.id} note={note} onEdit={onEdit} deleteNote={deleteNote} />
                  ))}
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="fixed right-4 bottom-4 text-2xl bg-white text-black font-bold p-4 rounded shadow "
                >
                  +
                </button>

                {isModalOpen && (
                  <NotesModal
                    closeModal={closeModal}
                    addNote={addNote}
                    currentNote={currentNote}
                    editNote={editNote}
                  />
                )}
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
