import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function EditUser() {
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dataToSend = { ...inputs, id };
      await axios.put(
        `http://localhost/api/index.php/${id}`,
        JSON.stringify(dataToSend),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Data updated successfully");
      setSubmitted(true);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost/api/index.php/${id}`
        );
        console.log("Fetched user data:", response.data);
        setInputs(response.data[0]); // Assuming data is the expected user object structure
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  if (submitted) {
    return <Navigate to="/" />;
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
                <input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Email:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Mobile:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="mobile"
                  value={inputs.mobile}
                  onChange={handleChange}
                />
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
