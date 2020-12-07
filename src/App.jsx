import React, { Component, useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import NavigationComponent from './components/app/Navbar';
import LoginComponent from './components/auth/Login';
import RegisterComponent from './components/auth/Register';
import PlaylistsComponent from './components/app/Playlists';
import PlaylistComponent from './components/app/Playlist';

function App() {

  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeUsername, setActiveUsername] = useState("");
  const [activeId, setActiveId] = useState(0);
  const [activePlaylistId, setActivePlaylistId] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem('authToken')) {
      setToken(window.localStorage.getItem('authToken'));
      setIsLoggedIn(true);
    }
  }, []);

  const authenticateUser = (token) => {
    window.localStorage.getItem('authToken', token);
    setToken(token);
    setIsLoggedIn(true);
  }

  const clickLogout = () => {
    localStorage.clear()
    setToken('')
    setIsLoggedIn(false)
  } 

      return (
      <>
      <BrowserRouter>
        <NavigationComponent isLoggedIn={isLoggedIn} activeUsername={activeUsername} activePlaylistId={activePlaylistId} clickLogout={clickLogout} />
        <Switch>
          <Route exact path='/user/login'>
            <LoginComponent authenticateUser={authenticateUser} setActiveUsername={setActiveUsername} setActiveId={setActiveId} />
          </Route>
          <Route exact path='/user/register'>
             <RegisterComponent setActiveUsername={setActiveUsername} setActiveId={setActiveId}/>
          </Route>
          <Route exact path='/playlists'>
            <PlaylistsComponent activeUsername={activeUsername} activeId={activeId} setActivePlaylistId={setActivePlaylistId} activePlaylistId={activePlaylistId} token={token}/>
          </Route>
         <Route exact path={`/playist/${activePlaylistId}`}> 
            <PlaylistComponent activePlaylistId={activePlaylistId} token={token}/>
          </Route> 
        </Switch>
      </BrowserRouter>
      </>
    );

}

export default App;


// *******************   LEGACY   ***************************
// ***************#   Version Dec6  #***************************

// class App extends React.Component {
//   constructor() {
//     super()
//       this.state = {
//         token: "",
//         isLoggedIn: false,
//         activeUsername: "",
//         activeId: 0,
//         activePlaylistId: null
//       }
//   }

//   componentDidMount() {
//     if (window.localStorage.getItem('authToken')) {
//       this.setState({token: window.localStorage.getItem('authToken')})
//       this.setState({isLoggedIn: true})
//     }
//   }

//   authenticateUser(token) {
//     window.localStorage.getItem('authToken', token);
//     this.setState({token: token})
//     this.setState({isLoggedIn: true})
//   }

//   clickLogout() {
//     localStorage.clear()
//     this.setState({token: ""})
//     this.setState({isLoggedIn: false})
//   }

//   render() {
//     return (
//       <>
//       <BrowserRouter>
//         <NavigationComponent isLoggedIn={this.state.isLoggedIn} activeUsername={this.state.activeUsername} activePlaylistId={this.state.activePlaylistId} clickLogout={this.state.clickLogout} />
//         <Switch>
//           <Route exact path='/user/login'>
//             <LoginComponent authenticateUser={this.state.authenticateUser} activeUsername={this.state.activeUsername} activeId={this.state.activeId} />
//           </Route>
//           <Route exact path='/user/register'>
//              <RegisterComponent authenticateUser={this.state.authenticateUser} activeUsername={this.state.activeUsername} activeId={this.state.activeId}/>
//           </Route>
//           <Route exact path='/playlists'>
//             <PlaylistsComponent activeUsername={this.state.activeUsername} activeId={this.state.activeId} activePlaylistId={this.state.activePlaylistId} token={this.state.token}/>
//           </Route>
//          <Route exact path={`/playist/${this.state.activePlaylistId}`}> 
//             <PlaylistComponent activePlaylistId={this.state.activePlaylistId} token={this.state.token}/>
//           </Route> 
//         </Switch>
//       </BrowserRouter>
//       </>
//     );
//   };
// }

// export default App;