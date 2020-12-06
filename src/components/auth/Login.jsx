import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
//import './App.css';

const LoginComponent = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const usernameChange = (e) => setUsername(e.target.value);
    const passwordChange = (e) => setPassword(e.target.value);
    

    const loginUser = (e) => {
        e.preventDefault();
        if (username && password) {
            fetch('http://localhost:5435/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(res => res.json())
            .then(body => {props.authenticateUser(body.token)
                props.setActiveUsername(username)
                props.setActiveId(body.message)
                console.log(body.message)
               // props.setActiveId(user.id)
                console.log('YOU ARE LOGGED IN SON')})
            .catch(error => console.log(error));
        } 
    };

    return (
      <>
      <h1>Login</h1>
        <Form onSubmit={loginUser} id='login-form'>
            <FormGroup>
                <Label className="form-label" htmlFor='username'>Username:</Label>
                <Input className="form-input" onChange={usernameChange} value={username} id='username' type='text' name='username'></Input>
                {/* {username.length < 4 ? <span>Must be 4 characters or more</span> : null} */}
            </FormGroup>
            <FormGroup>
                <Label className="form-label" htmlFor='password'>Password:</Label>
                <Input className="form-input" onChange={passwordChange} value={password} id='password' type='text' name='password'></Input>
                {/* {password.length < 4 ? <span>Must be 4 characters or more</span> : null} */}
            </FormGroup>
            <Button className="form-button">SUBMIT</Button>
        </Form>
      </>
    );
}

export default LoginComponent;