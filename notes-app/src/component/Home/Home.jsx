import React, { useEffect, useState, createContext, } from 'react';
import axios from 'axios';
import Login from '../Login/Login';
import ListForm from '../ListForm/ListForm';
import InputForm from '../InputForm/InputForm';
import Box from '@mui/material/Box';

export const context = createContext();

const Home = ({userId, setUserId, setLogoutUser}) => {
  const isLoginTrue = JSON.parse(localStorage.getItem("login"));
  
  const[notes, setNotes] = useState([]);

   useEffect(() => {
    axios.get(`http://localhost:5000/posts/${userId}`).then(resp => {
      const newNotes = [...JSON.parse(JSON.stringify(resp.data.response))];
      resartShowSubnotes(newNotes);
      setNotes(newNotes);
    });
  },[userId]);

  const resartShowSubnotes = (newNotes) => {
    for (let note of newNotes) {
      note.isShowSubnotes = true;
      if (note.notes.length > 0) {
        resartShowSubnotes(note.notes);
      }
    }
  };

  const setNotesAddDb = (notes) => {
    setNotes(notes);
    axios.post('http://localhost:5000/posts', {notes, userId});
  };

  return (
    <div>
      {isLoginTrue?.userLogin 
      ? <context.Provider value={{notesMain:notes}}>
        <Box sx={{ display: 'block', flexGrow: 1, p: 5}}>
          <InputForm notesMain={notes} setNotes={setNotesAddDb} />
          <ListForm notes={notes} setNotes={setNotesAddDb} />
        </Box>
      </context.Provider>
      : <Login userId={userId} setUserId={setUserId} setLogoutUser={setLogoutUser}/>}
    </div>
  )
};

export default Home;