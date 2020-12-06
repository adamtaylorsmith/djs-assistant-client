import React, { useState, useEffect } from 'react';
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

  // const clickLogout = () => {
  //   postgres://jxsobpjdbgmnbs:71dae2becab7d526c6cf8170bae09863d1c9095f33c272250793f3ba99e4a9fd@ec2-54-161-150-170.compute-1.amazonaws.com:5432/d7s20ihefu27vv // 1150dj
  // }

      return (
      <>
      <BrowserRouter>
        <NavigationComponent isLoggedIn={isLoggedIn} activeUsername={activeUsername} activePlaylistId={activePlaylistId} clickLogout={clickLogout} />
        <Switch>
          <Route exact path='/user/login'>
            <LoginComponent authenticateUser={authenticateUser} setActiveUsername={setActiveUsername} setActiveId={setActiveId} />
          </Route>
          <Route exact path='/user/register'>
             <RegisterComponent authenticateUser={authenticateUser} setActiveUsername={setActiveUsername} setActiveId={setActiveId}/>
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
