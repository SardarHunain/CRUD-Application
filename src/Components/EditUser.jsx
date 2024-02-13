import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Navigate } from "react-router-dom"; // Import Navigate correctly
import { Button } from "react-bootstrap";

function EditUser() {
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    
    name: "",
    email: "",
    mobile: "",
  });

  const [submitted, setSubmitted] = useState(false); // State to track form submission

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dataToSend = { ...inputs, id }; // Include id in the request body
      await axios.put(`http://localhost/api/index.php/${id}`, JSON.stringify(dataToSend), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Data updated successfully");
      setSubmitted(true); // Set submitted state to true after successful submission
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  if (submitted) {
    return <Navigate to="/" />; // Navigate to home screen if form is submitted
  }

  return (
    <div>
      <h1>UPDATE USER</h1>
      <form onSubmit={handleSubmit}>
        <table cellSpacing="10">
          <tbody>
            <tr>
              <th>
                <label>Name:</label>
              </th>
              <td>
                <input type="text" name="name" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Email:</label>
              </th>
              <td>
                <input type="text" name="email" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>
                <label>Mobile:</label>
              </th>
              <td>
                <input type="text" name="mobile" onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="right">
                <Button type="submit">Save</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default EditUser;
