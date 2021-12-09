import React, { useContext }  from 'react'
import noteContext from './context/notes/noteContext'
const NoteItem = (props) => {

    const context = useContext(noteContext)
    const { passNote, deleteNote } = context;
    const {note}= props;
    let time = new Date(note.date).toString().slice(0, 21)
    return (

        <>
            <div className="card my-4 mx-2" style={{width: "30%"}}>
                <div className="card-header" style={{margin: "0 -13px"}}>
                    {time}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <button to="#" className="btn btn-primary my-2" onClick={(e)=>{
                        e.preventDefault();
                        passNote(note._id, note.title, note.description, note.tag)
                        document.getElementById('addBtn').style.display='none';
                        document.getElementById('updateBtn').style.display='block';
                        }}>Edit</button>
                    <button to="#" className="btn btn-danger mx-1" onClick={(e)=>{e.preventDefault(); deleteNote(note._id); props.showAlert('primary', 'Succeed', 'Note successfully Deleted.')}}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default NoteItem
