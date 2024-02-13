import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function ListUser() {
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    const result = await axios.get("http://localhost/api/index.php");
    setUser(result.data);

  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost/api/index.php", {
        data: { id } // Sending id in the request body
      });
      alert("User deleted successfully");
      getUsers(); // Refresh the user list after deletion
    } catch (error) {
      alert("Error deleting user: " + error);
    }
  };

  useEffect(() => {
    getUsers();
  },[]);

  

  return (
    <div>
      <h1>LIST ALL USERS</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">EMAIL</th>
            <th scope="col">MOBILE</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {user.map((itm, index) => {
            return (
              <tr key={index}>
                <td>{itm.name}</td>
                <td>{itm.email}</td>
                <td>{itm.mobile}</td>
                <td>
                  <Link to={`/user/edit/${itm.id}`}>
                    <FaEdit />
                  </Link>
                  <FaTrashAlt
                    onClick={() => handleDelete(itm.id)}
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListUser;