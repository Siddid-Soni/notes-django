import React, {useEffect} from 'react';
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesListPage = (props) => {

    useEffect(()=>{
        props.getNotes()
        //eslint-disable-next-line
    },[])

    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{props.notes.length}</p>
            </div>
            <div className="notes-list">
                {props.notes.map((note, index)=>{
                    return <ListItem key={index} note={note}/>
                })}
            </div>
            <AddButton />
        </div>
    );
}

export default NotesListPage;