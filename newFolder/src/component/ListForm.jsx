import { useContext, useEffect, useState } from "react";
import {context} from './Home';
import InputForm from "./InputForm";
import "./ListForm.css";

const ListForm = ({setNotes, notes}) => {
  
  const[noteIdAdd, setNoteIdAdd] = useState('');
  const[noteIdRemove, setNoteIdRemove] = useState('');
  const { notesMain } = useContext(context);
  const notesMovedId = [...notesMain];

  const deleteNote = (noteId) => {
    setNotes(
      notesMain.filter(note => note.id !== noteId)
    );
  };

  const findIndexNote = (noteId) => {
    for (let i = 0; i < notesMain.length; i++) {
      if (notesMain[i].id === noteId) {
        return i;
      };
    };
  };

  const moveNoteUp = (noteId) => {
    let indexOfId = findIndexNote(noteId);
    notesMovedId[indexOfId] = notesMain[indexOfId - 1];
    notesMovedId[indexOfId - 1] = notesMain[indexOfId];
    setNotes(notesMovedId);
  };

  const moveNoteDown = (noteId) => {
    let indexOfId = findIndexNote(noteId);
    notesMovedId[indexOfId] = notesMain[indexOfId + 1];
    notesMovedId[indexOfId + 1] = notesMain[indexOfId];
    setNotes(notesMovedId);
  }

  const showAddButton = () => {
    const newNotes = [...JSON.parse(JSON.stringify(notesMain))];
    toggleAddButton(newNotes);
    setNotes(newNotes);
  }
  
  const toggleAddButton = (listOfNotes) => {
    for (let note of listOfNotes) {
      if (note.id === noteIdAdd) {
        note.isShowAddSubButton = !note.isShowAddSubButton;
      } else {
        note.isShowAddSubButton = false;
      };
      if (note.notes.length > 0) {
        toggleAddButton(note.notes);
      };
    };
  };

  useEffect(() => {
    if(noteIdAdd) {
      showAddButton(noteIdAdd);
      setNoteIdAdd('');
    };
  }, [noteIdAdd]);

  const removeSubList = () => {
    const newNotes = [...JSON.parse(JSON.stringify(notesMain))];
    chooseSubList(newNotes);
    setNotes(newNotes);
  };
  
  const chooseSubList = (listOfNotes) => {
      for (let note of listOfNotes) {
      if (note.id === noteIdRemove) {
        note.notes = [];
      }
      if (note.notes.length > 0) {
        chooseSubList(note.notes);
      };
    };
  };

  useEffect(() => {
    if(noteIdRemove) {
      removeSubList(noteIdRemove);
      setNoteIdRemove('');
    };
  }, [noteIdRemove])

  return (
    <div className="section">
      {notes ? notes.map(note => (
        <div key={note.id} className="list">
          <div className='list__buttons'>
            <div className='list__title'>{note.title}</div>
            <div className='list__button--sub'>
              {note.notes.length !== 0
              ? <button className='.list__button--main' onClick={() => {setNoteIdRemove(note.id)}}>Remove Sublist</button>
              : <button className='.list__button--main' onClick={() => {setNoteIdAdd(note.id)}}>
                {note.isShowAddSubButton ? 'Hide add form' :'Add Sublist'}
              </button>}
            </div>
            {note.isShowFuncButton && <div className='list__button--main'>
              <button className='list__button--main-button' onClick={() => deleteNote(note.id)}>
                Remove
              </button>
            {note !== notes[0] && 
              <button className='list__button--main-button' onClick={() => moveNoteUp(note.id)}>
                up
              </button>}
            {note !== notes[notesMain.length - 1] && 
              <button  className='list__button--main-button' onClick={() => moveNoteDown(note.id)}>
                down
              </button>}
            </div>}
          </div>
          <div className='list__subnote'>
            {note.notes.length > 0 && <ListForm setNotes={setNotes} notes={note.notes}/>}
            {note.isShowAddSubButton && <InputForm setNotes={setNotes} noteId={note.id} />}
          </div>
        </div>
      )) : null
    }
    </div>
  )
};

export default ListForm;