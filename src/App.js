import Form from 'react-bootstrap/Form'
import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // validation 
  const [validated, setValidated] = useState(false);
  // register change state
  const [registered, setRegistered] = useState(false);
  const handaleRegisteredChange = e => {
    setRegistered(e.target.checked);
  }

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
    // submit email and password
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    // registered already
    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => { console.error(error) })
    }
    else {
      // create new users
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = (result.user);
          console.log(user)
          setEmail('');
          setPassword('');
        })
        .catch(error => {
          const errorMessage = error.message;
          console.error(errorMessage)
        })
    }

    e.preventDefault();
    console.log(email, password)
  }
  return (
    <div>
      <div className='w-50 mx-auto my-3' >
        <h2 className='text-primary my-4'>Please {registered ? 'Log in' : 'Register'}!</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className='mx-auto' >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} required type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} required type="password" placeholder="Password" />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handaleRegisteredChange} type="checkbox" label="already registared ? " />
          </Form.Group>
          <Button variant="primary" type="submit">
            {registered ? 'Log in' : 'Register'}
          </Button>
        </Form>
      </div>

    </div>
  );
}

export default App;
