import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from './Signup.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerror, setEmailerror] = useState(false);
  const [passworderror, setPassworderror] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    setEmailerror(false);

    if (email.length < 6) {
      setEmailerror(true);
      return;
    }
    if(password.length<5){
        setPassworderror(true);
        return
    }

    axios.post('http://localhost:4500/', { email, password }, { withCredentials: true })
      .then((res) => {
        console.log(res);

        navigate('/login');

      })
      .catch((err) => {
        console.log(err);
      });
  }

  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="w-25">
        <Form onSubmit={submitHandler} className={Styles.formdiv}>
          <h1>SignUp</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
            {emailerror && <Form.Text className="text-danger">Email Incorrect</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            {passworderror && <Form.Text className="text-danger">Password should be more than 4 charachters</Form.Text>}

          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <div className="mt-3">
          Already have an Account?{' '}
          <Button variant="primary" type="submit" onClick={() => { navigate('/login') }}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
