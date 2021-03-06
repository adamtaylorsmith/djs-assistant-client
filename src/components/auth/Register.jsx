import React, {Component, useState} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
//import '../App.css';
import APIURL from '../../helpers/environment';

const RegisterComponent = (props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const triggerEmailChange = (e) => setEmail(e.target.value);
    const triggerUsernameChange = (e) => setUsername(e.target.value);
    const triggerPasswordChange = (e) => setPassword(e.target.value);

    const registerUser = (e) => {
        e.preventDefault();
        if (email && username && password) {
            fetch(`${APIURL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password
                })
            }).then(res => res.json())
            .then(body => { // props.authenticateUser(body.token)
                props.setActiveId(body.message)
                console.log(body.message)
                props.setActiveUsername(username)
                alert('YOU ARE REGISTERED SON')})
            .catch(error => console.log(error));
        } 
    };

    return (
      <>
      <h1>Register New User</h1>
        <Form onSubmit={registerUser} id='register-form'>       
        <FormGroup>
                <Label className="form-label" htmlFor='registerEmail'>Email:</Label>
                <Input className="form-input" onChange={triggerEmailChange} value={email} id='registerEmail' type='email' name='registerEmail'></Input>
            </FormGroup>
            <FormGroup>
                <Label className="form-label" htmlFor='registerUsername'>Username:</Label>
                <Input className="form-input" onChange={triggerUsernameChange} value={username} id='registerUsername' type='text' name='registerUsername'></Input>
                {/* {username.length < 4 ? <span>Must be 4 characters or more</span> : null} */}
            </FormGroup>
            <FormGroup>
                <Label className="form-label" htmlFor='registerPassword'>Password:</Label>
                <Input className="form-input" onChange={triggerPasswordChange} value={password} id='registerPassword' type='text' name='registerPassword'></Input>
                {/* {password.length < 4 ? <span>Must be 4 characters or more</span> : null} */}
            </FormGroup>
            <Button className="form-button">SUBMIT</Button>
        </Form>
      </>
    );
}

export default RegisterComponent;


// *******************   LEGACY   ***************************
// ***************#   Version Dec6  #***************************

// class RegisterComponent extends React.Component {
//     constructor(props) {
//         super(props)
//             this.state = {
//                 email: "",
//                 username: "",
//                 password: "",
//             }
//     }

//     triggerEmailChange = (e) => this.setState({email: e.target.value});
//     triggerUsernameChange = (e) => this.setState({username: e.target.value});
//     triggerPasswordChange = (e) => this.setState({password: e.target.value});

//     registerUser = (e) => {
//         e.preventDefault();
//         if (this.state.email && this.state.username && this.state.password) {
//             fetch('https://djs-assistant-b.herokuapp.com/user/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'},
//                 body: JSON.stringify({
//                     email: this.state.email,
//                     username: this.state.username,
//                     password: this.state.password
//                 })
//             }).then(res => res.json())
//             .then(body => {
//                 this.props.authenticateUser(body.token)
//                 this.props.activeId(body.message)
//                 console.log(body.message)
//                 this.props.activeUsername(this.state.username)
//                 console.log('YOU ARE REGISTERED SON')})
//             .catch(error => console.log(error));
//         } 
//     };

//     render() {
//         return (
//         <>
//         <h1>Register New User</h1>
//             <Form onSubmit={this.registerUser} id='register-form'>       
//             <FormGroup>
//                     <Label className="form-label" htmlFor='registerEmail'>Email:</Label>
//                     <Input className="form-input" onChange={this.triggerEmailChange} value={email} id='registerEmail' type='email' name='registerEmail'></Input>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label className="form-label" htmlFor='registerUsername'>Username:</Label>
//                     <Input className="form-input" onChange={this.triggerUsernameChange} value={username} id='registerUsername' type='text' name='registerUsername'></Input>
//                     {/* {username.length < 4 ? <span>Must be 4 characters or more</span> : null} */}
//                 </FormGroup>
//                 <FormGroup>
//                     <Label className="form-label" htmlFor='registerPassword'>Password:</Label>
//                     <Input className="form-input" onChange={this.triggerPasswordChange} value={password} id='registerPassword' type='text' name='registerPassword'></Input>
//                     {/* {password.length < 4 ? <span>Must be 4 characters or more</span> : null} */}
//                 </FormGroup>
//                 <Button className="form-button">SUBMIT</Button>
//             </Form>
//         </>
//         );
//     }
// }

// export default RegisterComponent;