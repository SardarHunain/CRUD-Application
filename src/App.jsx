import { BrowserRouter,Routes,Route,Link } from "react-router-dom"
import './App.css'
import ListUser from "./Components/ListUser"
import CreateUser from "./Components/CreateUser"
import EditUser from "./Components/EditUser"
function App() {
  

  return (
    <>
      <h5>REACT CRUD WITH CORE PHP</h5>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/" >List Users</Link>
            </li>
            <li>
              <Link to="user/create" >Create Users</Link>
            </li>
           
          </ul>
        </nav>

        <Routes>
          <Route index element={<ListUser/>}/>
          <Route path="user/create" element={<CreateUser/>}/>
          <Route path="user/edit/:id" element={<EditUser/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
