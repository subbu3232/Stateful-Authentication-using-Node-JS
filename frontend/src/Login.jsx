
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from './Signup.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Login() {
const navigate=useNavigate();
const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
 
    const loginHandler=(e)=>{
        e.preventDefault();
axios.post('http://localhost:4500/login',{email,password}, { withCredentials: true }).then((res)=>{
    console.log(res);
    if(res.data==="success"){
navigate('/dashboard',{state:{email}})
    }
}).catch((err)=>{
    console.log(err)
    
})
    }

return (
<div className="d-flex align-items-center justify-content-center vh-100">
<div className="w-25">
<Form onSubmit={loginHandler}className={Styles.formdiv}>
<h1>Login</h1>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Email address</Form.Label>
<Form.Control type="email" placeholder="Enter email"onChange={(e)=>{setEmail(e.target.value)}} />
<Form.Text className="text-muted">
We'll never share your email with anyone else.
</Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>Password</Form.Label>
<Form.Control type="password" placeholder="Password"onChange={(e)=>{setPassword(e.target.value)}} />
</Form.Group>



<Button variant="primary" type="submit">
Login
</Button>
</Form>

<div className="mt-3">
Dont have an Account?{' '}
<Button variant="primary" type="submit" onClick={()=>{navigate("/")}}>
Signup
</Button>
</div>
</div>
</div>
);
}

export default Login;