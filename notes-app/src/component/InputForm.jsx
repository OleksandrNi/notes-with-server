import { useContext, useState } from "react";
import {context} from './Home';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

const InputForm = ({ setNotes, noteId}) => {
  const [title, setTitle] = useState("");
  const { notesMain } = useContext(context);
  
  const initialNote = {
    id: new Date() * Math.random(),
    title: title,
    notes: [],
    isShowAddSubButton: false,
    isShowSubnotes: true,
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
        note.isShowSubnotes = false;
        note.notes = [
          ...note.notes,
          {
          id: new Date() * Math.random(),
          title: title,
          notes: [],
          isShowAddSubButton: false,
          isShowSubnotes: true,
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
    <Box
      component="form" sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        mb: 5,
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onChange={(e) => {setTitle(e.target.value)}}
      onSubmit={(event) => {event.preventDefault()}}
    >
      <TextField
        variant="standard"
        required
        autoFocus
        placeholder="Enter note"
        value={title}
      />

      <Button size="small" variant="outlined" color="primary" onClick={noteId ? onAddSubNote : addNoteValue}>Add</Button>
    </Box>
  )
};

export default InputForm;
