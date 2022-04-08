import Form from 'react-bootstrap/Form'
import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Button } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // validation 
  const [validated, setValidated] = useState(false);
  const auth = getAuth(app);
  // email
  const handleEmail = e => {
    setEmail(e.target.value);
  }
  // password
  const handlePassword = e => {
    setPassword(e.target.value);
  }
  // form submit
  const handleSubmit = e => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result =>
        console.log(result.user)
      )
      .catch(error => console.error(error))
    e.preventDefault();
    console.log(email, password)
    // submit email and password
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    setValidated(true);
  }
  return (
    <div>
      <div className='w-50 mx-auto my-3' >
        <h2 className='text-primary my-4'>Please Register!</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className='mx-auto' >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} required type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} required type="password" placeholder="Password" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

    </div>
  );
}

export default App;
