import { useContext, useState } from "react";
import {context} from './Home';

const InputForm = ({ setNotes, noteId}) => {
  const [title, setTitle] = useState("");
  const { notesMain } = useContext(context);
  
  const initialNote = {
    id: new Date() * Math.random(),
    title: title,
    notes: [],
    isShowAddSubButton: false,
    isShowFuncButton: true,
  }

  const addNoteValue = () => {
    if (notesMain.length) {
      setNotes([
        ...JSON.parse(JSON.stringify(notesMain)),
        initialNote,
      ]);
      setTitle('');
    } else {
      setNotes([initialNote]);
      setTitle('');
    };
  };

  const onAddSubNote = () => {
    const newNotes = [...JSON.parse(JSON.stringify(notesMain))];
    addSubNotes(newNotes);
    setNotes(newNotes);
  }

  const addSubNotes = (listOfNotes) => {
    for (let note of listOfNotes) {
      if (note.id === noteId) {
        note.isShowAddSubButton = false;
        note.notes = [
          ...note.notes,
          {
          id: new Date() * Math.random(),
          title: title,
          notes: [],
          isShowAddSubButton: false,
          isShowFuncButton: false,
          }
        ];
        setTitle('');
        return;
      };
      if (note.notes.length > 0) {
        addSubNotes(note.notes);
      };
    };
  };

  return (
    <form onSubmit={(event) => {event.preventDefault()}}>
      <label htmlFor="note-input">Enter new note</label>

      <input
        autoComplete="off"
        placeholder="Write here"
        value={title}
        onChange={(e) => {setTitle(e.target.value)}}
      />

      <button type="submit" onClick={noteId ? onAddSubNote : addNoteValue}>
        Add
      </button>
    </form>
  )
}

export default InputForm;
