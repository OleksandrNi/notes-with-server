import React, { useEffect, useState, createContext, } from 'react'
import ListForm from './ListForm';
import InputForm from './InputForm';
import axios from 'axios';
import "./ListForm.css";
import Login from './Login';

export const context = createContext();

const Home = ({userId}) => {
  const isLoginTrue = JSON.parse(localStorage.getItem("login"));
  
  const[notes, setNotes] = useState([])

   useEffect(() => {
    axios.get(`http://localhost:5000/posts/${userId}`).then(resp => {
      setNotes(resp.data.response)
    });
  },[])

  const setNotesAddDb = (notes) => {
    setNotes(notes)
    axios.post('http://localhost:5000/posts', {notes, userId})
  }

  return (
    <div>
      {isLoginTrue?.userLogin 
      ? <context.Provider value={{notesMain:notes}}>
        <div>
          <ListForm notes={notes} setNotes={setNotesAddDb} />
          <InputForm notesMain={notes} setNotes={setNotesAddDb} />
        </div>
      </context.Provider>
      : <Login />}

    </div>
  )
}

export default Home