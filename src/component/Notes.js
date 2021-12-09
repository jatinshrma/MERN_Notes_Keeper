import React, { useContext, useEffect } from 'react'
import NoteItem from './NoteItem'
import noteContext from './context/notes/noteContext'

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, fetchAllNotes } = context;
    useEffect(() => {
        fetchAllNotes();
        // eslint-disable-next-line
    }, [notes])

    return (
        <div className="row">
            <h1>Your Notes</h1>
            <p className="my-2 mx-1">{notes.length === 0 ? "No note is added yet." : ""}</p>
            {notes.map((note) => {
                return <NoteItem key={note._id} note={note} showAlert={props.showAlert} />
            })}
        </div>
    )
}

export default Notes
