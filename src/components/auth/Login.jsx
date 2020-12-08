import React, {Component, useState} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import APIURL from '../../helpers/environment';

const LoginComponent = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const usernameChange = (e) => setUsername(e.target.value);
    const passwordChange = (e) => setPassword(e.target.value);
    
    const loginUser = (e) => {
        e.preventDefault();
        if (username && password) {
            fetch(`${APIURL}/user/login`, {
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
            </FormGroup>
            <FormGroup>
                <Label className="form-label" htmlFor='password'>Password:</Label>
                <Input className="form-input" onChange={passwordChange} value={password} id='password' type='text' name='password'></Input>
            </FormGroup>
            <Button className="form-button">SUBMIT</Button>
        </Form>
      </>
    );
}

export default LoginComponent;


// *******************   LEGACY   ***************************
// ***************#   Version Dec6  #***************************

// export default class LoginComponent extends React.Component {
//     constructor(props) {
//         super(props)
//             this.state = {
//                 username: "",
//                 password: "",
//             }
//     }

//     usernameChange = (e) => this.setState({username: e.target.value});
//     passwordChange = (e) => this.setState({password: e.target.value});
    

//     loginUser = (e) => {
//         e.preventDefault();
//         if (this.state.username && this.state.password) {
//             fetch('https://djs-assistant-b.herokuapp.com/user/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'},
//                 body: JSON.stringify({
//                     username: this.state.username,
//                     password: this.state.password
//                 })
//             }).then(res => res.json())
//             .then(body => {this.props.authenticateUser(body.token)
//                 this.props.activeUsername(this.state.username)
//                 this.props.activeId(body.message)
//                 console.log(body.message)
//                 console.log('YOU ARE LOGGED IN SON')})
//             .catch(error => console.log(error));
//         } 
//     };

//     render() {
//         return (
//         <>
//         <h1>Login</h1>
//             <Form onSubmit={this.loginUser} id='login-form'>
//                 <FormGroup>
//                     <Label className="form-label" htmlFor='username'>Username:</Label>
//                     <Input className="form-input" onChange={this.usernameChange} id='username' type='text' name='username'></Input>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label className="form-label" htmlFor='password'>Password:</Label>
//                     <Input className="form-input" onChange={this.passwordChange} id='password' type='text' name='password'></Input>
//                 </FormGroup>
//                 <Button className="form-button">SUBMIT</Button>
//             </Form>
//         </>
//         );
//     }
// }

