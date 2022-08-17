import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ logoutUser, setLogoutUser }) => {
  const [login, setLogin] = useState("");
  const [userName, setUserName] = useState("")

  useEffect(() => {
    hydrateStateWithLocalStorage();
  },[logoutUser]);

  const logout = () => {
    localStorage.removeItem("login");
    setLogoutUser(true)
    console.log("logout", login)
  }

  const hydrateStateWithLocalStorage = () => {
    if (localStorage.hasOwnProperty("login")) {
      let value = localStorage.getItem("login");
      setUserName(JSON.parse(localStorage.getItem('login')).userName)
      try {
        value = JSON.parse(value);
        setLogin(value);
      } catch(e) {
        setLogin("");
      }
    }
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {!logoutUser && login?.userLogin 
          ? <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello, {userName}!
          </Typography>
          : <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello, welcome to Notes List App. Please <Link to='/login' style={{color: "#fff", textDecoration: "none"}}
            >Login</Link> or <Link to='/register' style={{color: "#fff", textDecoration: "none"}}
            >Register</Link>!
          </Typography>
          }
          {!logoutUser && login?.userLogin && <Button color="inherit" onClick={logout}><LogoutIcon /></Button>}
        </Toolbar>
      </AppBar>
    </Box>
      {/* <header>
        {!logoutUser && login?.userLogin ? (
          <Button style={{width: "100px"}} color="secondary" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button style={{width: "100px"}} color="primary">Login</Button>
          </Link>
        )}
      </header> */}
    </div>
  )
}

export default Header