import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/chevron-left.svg"

const NotePage = (props) => {
    let noteId = useParams()
    const [note, setNote] = useState(null)
    const history = useNavigate()

    useEffect(()=>{
        getNote()
        //eslint-disable-next-line
    },[])

    const getNote = async () => {
        if (noteId.id !== 'new') {
            props.setProgress(20)
            let response = await fetch(`/api/note/${noteId.id}/`)
            props.setProgress(60)
            let json = await response.json()
            props.setProgress(100)
            if (json.error && json.error === 'notFound') {
                setNote({body:"Note not found"})
            }
            else{
                setNote(json)
            }

        }
    }

    const onChange = (e) => {
        setNote({...note, 'body': e.target.value})
    }

    const handleClick = async () => {

        let body = document.getElementById('area').value

        if (noteId.id !== 'new') {
            if(note) {
                if (body === ''){
                    await deleteNote()
                    history("/")
                }
                else {
                    await updateNote()
                    history("/")
                }
            }
            else{await deleteNote()}
        }
        else if (noteId.id === 'new' && note!==null) {
            if (body!==''){await createNote()}
            else{history("/")}
        }
        else{
            history("/")
        }

    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const updateNote = async () => {

        await fetch(`/api/note/${noteId.id}/`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({body: note.body}),
            mode: 'same-origin'
        })

        await props.getNotes()
    }

    const createNote = async () => {
        props.setProgress(33)
        await fetch(`/api/notes/`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({body: note.body}),
            mode: 'same-origin'
        })
        props.setProgress(66)
        await props.getNotes()
        props.setProgress(100)

        history("/")
    }

    const deleteNote = async () => {
        props.setProgress(33)
         await fetch(`/api/note/${noteId.id}/`, {
            method: "DELETE",
            headers: {
                'Content-type':'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
             mode: 'same-origin'
        })
        props.setProgress(66)
        await props.getNotes()
        props.setProgress(100)
        history("/")
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3><ArrowLeft onClick={handleClick} /></h3>
                {noteId.id !== 'new' ? (
                <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={createNote}>Done</button>
                )}
            </div>
            <textarea id="area" onChange={onChange} value={note?.body}/>
        </div>
    );
}

export default NotePage;