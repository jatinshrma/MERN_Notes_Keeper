import NoteContext from "./noteContext";
import { useState } from 'react';

const NoteState = (props) => {

    const [notes, setNotes] = useState([])
    const host = "http://localhost:5000"

    const fetchAllNotes = async () => {
        const response = await fetch(`${host}/api/notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': localStorage.getItem('Token')
            },
        });
        const content = await response.json();
        setNotes(content);
    }

    // Add
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': localStorage.getItem('Token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const content = await response.json();
        setNotes(notes.concat(content))
    };

    // Delete
    const deleteNote = async (id) => {

        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': localStorage.getItem('Token')
            },
        });
    };
    
    const [passedData, setPassedData] = useState([])
    // Pass Note
    const passNote = (id, title, description, tag) => {
        const data= {
            id: id,
            title: title,
            description: description,
            tag: tag
        }
        setPassedData(data);
    };


    //Update
    const updateNote = async (id, title, description, tag) => {
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Auth-token': `${localStorage.getItem('Token')}`
            },
            body: JSON.stringify({ title, description, tag })
        });
    };

    return (
        <NoteContext.Provider value={{ fetchAllNotes, notes, setNotes, addNote, passedData, setPassedData, passNote, updateNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;