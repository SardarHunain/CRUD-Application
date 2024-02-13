import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Navigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

function EditUser() {
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

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
      setSubmitted(true);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Error updating user data. Please try again later.");
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
        setInputs(response.data[0]); // Assuming data is the expected user object structure
      } catch (error) {
        setError("Error fetching user data. Please try again later.");
      }
    };
    fetchUser();
  }, [id]);

  if (submitted) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <h1>UPDATE USER</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formMobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile"
              name="mobile"
              value={inputs.mobile}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default EditUser;
