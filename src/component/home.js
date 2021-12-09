import React, { useContext } from 'react'
import { useHistory} from "react-router-dom";
import Notes from './Notes'
import noteContext from './context/notes/noteContext'

const Home = (props) => {
    
    const history = useHistory();
    const context = useContext(noteContext);
    const { addNote, passedData, setPassedData, updateNote } = context;
    if(!localStorage.getItem('Token')){history.push('/login');}

    const handleSubmit = () => {
        addNote(passedData.title, passedData.description);
        setPassedData({ title: "", description: "" })
        props.showAlert('primary', 'Succeed', 'Note successfully added.')
    }

    const handleUpdate = (e) => {
        updateNote(passedData.id, passedData.title, passedData.description, passedData.tag);
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "inline-block";
        setPassedData({ title: "", description: "" })
        props.showAlert('primary', 'Succeed', 'Note successfully updated.')
    }

    const onChange = (e) => {
        setPassedData({ ...passedData, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h1>Add Note</h1>
            <div className="form">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" id="title" value={passedData.title ? passedData.title : ""} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" name="description" id="description" rows="3" value={passedData.description ? passedData.description : ""} onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" name="tag" id="tag" value={passedData.tag ? passedData.tag : ""} onChange={onChange} />
                </div>
                <button id="updateBtn" onClick={handleUpdate} className="btn btn-success" style={{ display: "none" }}>Update Note</button>
                <button disabled={!passedData.description} id="addBtn" onClick={handleSubmit} className="btn btn-primary">Add Note</button>
            </div>
            <Notes showAlert={props.showAlert}/>
        </>
    )
}

export default Home