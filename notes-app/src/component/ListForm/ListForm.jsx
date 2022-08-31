import { useContext, useEffect, useState } from "react";
import {context} from '../Home/Home';
import InputForm from "../InputForm/InputForm";
import SideMenu from "../SideMenu/SideMenu";
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import TextField from "@mui/material/TextField";
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';



const ListForm = ({setNotes, notes}) => {
  const[noteIdAdd, setNoteIdAdd] = useState('');
  const[noteIdRemove, setNoteIdRemove] = useState('');
  const { notesMain } = useContext(context);
  const [newTitle, setNewTitle] = useState('');
  const [noteIdUpdate, setNoteIdUpdate] = useState('');
  const [toggleTitleUpdate, setToggleTitleUpdate] = useState(false);
  
  const deleteNote = (noteId) => {
    const notes = [...JSON.parse(JSON.stringify(notesMain))];
    searchDeleteNote(notes, noteId);
    setNotes(notes);
  };

  const searchDeleteNote = (notes, noteId) => {
    notes.forEach((note, index) => {
      if (note.id === noteId) {
        notes.splice(index, 1);
      }
      searchDeleteNote(note.notes, noteId);
    })
  }

  const moveNoteUp = (noteId) => {
    const notes = [...JSON.parse(JSON.stringify(notesMain))];
    searchMoveNoteUpper(notes, noteId);
    setNotes(notes);
  };

  const searchMoveNoteUpper = (notes, noteId) => {
    notes.forEach((note, index) => {
      if (note.id === noteId) {
        let notesTemp = [...JSON.parse(JSON.stringify(notes))];
        notes[index] = notesTemp[index - 1];
        notes[index - 1] = notesTemp[index];
      }
      searchMoveNoteUpper(note.notes, noteId);
    })
  }
  
  const moveNoteDown = (noteId) => {
    const notes = [...JSON.parse(JSON.stringify(notesMain))];
    searchMoveNoteDown(notes, noteId);
    setNotes(notes);
  };

  const searchMoveNoteDown = (notes, noteId) => {
    let find = false;
    notes.forEach((note, index) => {
      if (note.id === noteId) {
        let notesTemp = [...JSON.parse(JSON.stringify(notes))];
        if(!find){
          notes[index] = notesTemp[index + 1];
          notes[index + 1] = notesTemp[index];
        }
        find = true;
      }
      searchMoveNoteDown(note.notes, noteId);
    })
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

  const openEditTitle = (noteId, title) => {
    const oldTitle = title;
    setNewTitle(oldTitle);
    setNoteIdUpdate(noteId);
    setToggleTitleUpdate(true);
  }

  const updateTitle = (listOfNotes) => {
    for (let note of listOfNotes) {
      if (note.id === noteIdUpdate) {
        note.title = newTitle;
      }
      if (note.notes.length > 0) {
        updateTitle(note.notes);
      };
    };
  }

  const updateNoteTitle = () => {
    const newNotes = [...JSON.parse(JSON.stringify(notesMain))];
    updateTitle(newNotes);
    setNotes(newNotes);
    setNoteIdUpdate('');
    setNewTitle('');
    setToggleTitleUpdate(false);
  };

  const toggleSetIsShoSublist = (noteId) => {
    const newNotes = [...JSON.parse(JSON.stringify(notesMain))];
    updateShowSubnotes(newNotes, noteId);
    setNotes(newNotes);
  };

  const updateShowSubnotes = (listOfNotes, noteId) => {
    for (let note of listOfNotes) {
      if (note.id === noteId) {
        note.isShowSubnotes = !note.isShowSubnotes;
      } 
      if (note.notes.length > 0) {
        updateShowSubnotes(note.notes, noteId);
      };
    };
  };

  return (
      <Box sx={{ mb: 5, flexGrow: 1 }}>
        {notes.map(note => (
          <div key={note.id} style={{ marginTop: '0px' }}>
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              border: '1px solid rgba(0, 0, 255, 0.3)', 
              borderRadius: 1,
              p: 1,
              mb: 1,
              justifyContent: 'space-between',
              alignItems: 'center'
              }}
              >
              <Box sx={{display: 'flex', maxWidth: '850px'}}>
                {toggleTitleUpdate && note.id === noteIdUpdate
                ? <Button color="inherit" size="small">
                  <ClearIcon fontSize="small" onClick={() => setToggleTitleUpdate(false)}/>
                </Button>
                : <Button color="inherit" size="small">
                  <EditIcon fontSize="small" onClick={() => openEditTitle(note.id, note.title)}/>
                </Button>}

                {toggleTitleUpdate && note.id === noteIdUpdate
                ? <Box component="form" onChange={(e) => {}} onSubmit={(event) => {event.preventDefault()}}>
                  <TextField variant="standard" value={newTitle} onChange={(e) => {setNewTitle(e.target.value)}}/>
                  <Button color="inherit" size="small" onClick={() => updateNoteTitle()}><TaskAltIcon/></Button>
                </Box>
                :<Typography component="div" variant="h6" sx={{ flexGrow: 1, textAlign: 'left'}}>
                  {note.title}
                </Typography>}
              </Box>

              <Box sx={{display: 'flex'}}>
                {<Box sx={{ display: 'flex', alignItems: 'center', p: 0}}>
                  <Button 
                    sx={{minWidth: '24px'}}
                    color="inherit"
                    disabled={note === notes[0]}
                    onClick={() => moveNoteUp(note.id)}
                  >
                    <ArrowCircleUpIcon />
                  </Button>
                  <Button 
                    sx={{minWidth: '24px'}} 
                    color="inherit" 
                    disabled={note === notes[notes.length - 1]} 
                    onClick={() => moveNoteDown(note.id)}
                  >
                    <ArrowCircleDownIcon />
                  </Button>
                </Box>}

                {note.isShowSubnotes && note.notes.length
                ? <Button 
                  sx={{minWidth: '24px'}} 
                  color="inherit" 
                  size="small" 
                  onClick={() => toggleSetIsShoSublist(note.id)}
                >
                  <Badge color="primary" badgeContent={note.notes.length}>
                    <VisibilityIcon />
                  </Badge>
                </Button>
                : <Button 
                  sx={{minWidth: '24px'}} 
                  color="inherit" 
                  size="small" 
                  onClick={() => toggleSetIsShoSublist(note.id)}
                >
                  <Badge color="primary" badgeContent={0}>
                    <VisibilityIcon color="disabled"/>
                  </Badge>
                </Button>}
            
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                  {note.notes.length
                    ? <Button 
                      sx={{minWidth: '24px'}} 
                      size="small" 
                      color="inherit" 
                      onClick={() => {setNoteIdAdd(note.id)}}
                    >
                      <AddBoxIcon/>
                    </Button>
                    : <Button 
                      sx={{minWidth: '24px'}} 
                      size="small" 
                      color="inherit" 
                      onClick={() => {setNoteIdAdd(note.id)}}
                    >
                      {note.isShowAddSubButton ? <DisabledByDefaultIcon/> : <AddBoxIcon/>}
                    </Button>
                  }
                </Box>

                <SideMenu 
                  noteId={note.id}
                  deleteNote={deleteNote}
                  notesLength={note.notes.length}
                  setNoteIdRemove={setNoteIdRemove}
                  setNoteIdAdd={setNoteIdAdd}
                  isShowAddSubButton={note.isShowAddSubButton}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'block', flexGrow: 1, ml: 5}}>
              {!note.isShowSubnotes && note.notes.length > 0 && <ListForm setNotes={setNotes} notes={note.notes}/>}
              <Box sx={{ display: 'block', flexGrow: 1, transform: 'translate(-60px)'}}>
                {note.isShowAddSubButton && <InputForm setNotes={setNotes} noteId={note.id}/>}
              </Box>
            </Box>
          </div>
        ))
      }
    </Box>
  )
};

export default ListForm;