import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Navbar from './components/navbar.jsx'
import Card from './components/card.jsx'
import AddPost from './components/pages/addPost.jsx'
import Profile from './components/pages/profile.jsx'

function App() {
  const location = useLocation()

  console.log('Current path:', location.pathname)

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <h1>Hello World!</h1>
            <div className="scroll-container">
              <Card title="Card 1" content="This is the content of card 1." />
              <Card title="Card 2" content="This is the content of card 2." />
              <Card title="Card 3" content="This is the content of card 3." />
              <Card title="Card 4" content="This is the content of card 4." />
              <Card title="Card 5" content="This is the content of card 5." />
            </div>
          </>
        } />
        <Route path="/add_post" element={<AddPost />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
