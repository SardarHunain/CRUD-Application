import { useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";

function CreateUser() {
    const [submitted, setSubmitted] = useState(false); // State to track form submission
    const [inputs,setInputs] = useState({
        name:"",
        email:"",
        mobile:"",
    });
    const [error, setError] = useState(""); // State to handle errors
    const [validationErrors, setValidationErrors] = useState({}); // State to store validation errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({...inputs,[name]:value});
        setValidationErrors({...validationErrors, [name]: ''}); // Clear validation error when user starts typing again
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Client-side validation
        const errors = {};
        if (!inputs.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!inputs.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
            errors.email = 'Email is invalid';
        }
        if (!inputs.mobile.trim()) {
            errors.mobile = 'Mobile is required';
        }
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            await axios.post("http://localhost/api/index.php", JSON.stringify(inputs), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSubmitted(true); // Set submitted state to true after successful submission
        } catch (error) {
            setError("Error saving data. Please try again later.");
        }
    };

    if (submitted) {
        return <Navigate to="/" />; // Navigate to home screen if form is submitted
    }

    return (
        <Container>
            <h2>Create User</h2>
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
                            isInvalid={validationErrors.name}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.name}</Form.Control.Feedback>
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
                            isInvalid={validationErrors.email}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
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
                            isInvalid={validationErrors.mobile}
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.mobile}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </Container>
    );
}

export default CreateUser;
