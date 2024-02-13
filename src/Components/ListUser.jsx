import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
function ListUser() {
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    const result = await axios.get("http://localhost/api/index.php");
    console.log(result.data);
    setUser(result.data);
    console.log("users are:" + user);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>LIST ALL USERS</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">EMAIL</th>
            <th scope="col">MOBILE</th>
          </tr>
        </thead>
        <tbody>
          {user.map((itm, index) => {
            return (
              <tr key={index}>
               
                <td>{itm.name}</td>
                <td>{itm.email}</td>
                <td>{itm.mobile}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListUser;
