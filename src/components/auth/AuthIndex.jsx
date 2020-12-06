// import React, {useState} from 'react';
// //import {} from 'reactstrap';
// import {BrowserRouter} from 'react-router-dom';
// import RegisterComponent from './Register';
// import LoginComponent from './Login';

// const AuthIndex = (props) => {
//     const [isLoggingIn, setIsLoggingIn] = useState(true)
//     const switchAuth = () => {setIsLoggingIn(!isLoggingIn)};

//     if (isLoggingIn) {
//         return (
//             <BrowserRouter>
//                 <div>
//                     <LoginComponent authenticateUser={props.authenticateUser} switchAuth={switchAuth} />
//                 </div>
//             </BrowserRouter>
//         )
//     } else {
//         return (
//             <BrowserRouter>
//                 <div>
//                     <RegisterComponent authenticateUser={props.authenticateUser} switchAuth={switchAuth} />
//                 </div>
//             </BrowserRouter>
//         )
//     }
// };

// export default AuthIndex;