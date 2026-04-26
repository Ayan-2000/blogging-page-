import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
      <>
          <div className="navbar">
              <Link to="/" style={{ color: "white", fontSize: "16px" }}>Home</Link>
              <Link to="/add_post" style={{ color: "white" }} title="Add Post">Add Post</Link>
              <Link to="/profile" style={{ color: "white" }} title="Profile">Profile</Link>
          </div>
      </>
  )
}

export default Navbar