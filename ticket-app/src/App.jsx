
import './App.css'
import { BrowserRouter as Router,Routes,Route,Link, Navigate } from 'react-router-dom'
import Register from './pages/registerPage'
import Login from './pages/loginPage'
import MyTickets from './pages/myTickets'
import AllTickets from './pages/allTickets'

function App() {

 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/tickets" element={<MyTickets/>}/>
        <Route path="/all" element={<AllTickets/>}/>
       {/* <Route
  path="/all"
  element={
    localStorage.getItem("role") === "Admin" ? <AllTickets /> : <Navigate to="/login" />
  }
/>
<Route
  path="/tickets"
  element={
    localStorage.getItem("role") === "User" ? <MyTickets /> : <Navigate to="/login" />
  }
/> */}



      </Routes>
    </Router>
  
  )
}

export default App
