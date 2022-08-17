import React from 'react'
import { Link } from 'react-router-dom';

const UserNotLogin = () => {
  return (
    <>
      <h2>It seem's like You not login</h2>
      <h3>
        If you have an account, then please <Link to="/login">Login</Link>
      </h3>
      <h3>
        Don't have an account, then please do <Link to="/register">Register</Link>
      </h3>
    </>
  )
}

export default UserNotLogin