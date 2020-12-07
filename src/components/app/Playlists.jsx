import React, {Component, useState, useEffect} from 'react';
import {Form, Button, FormGroup, Label, Input} from 'reactstrap';
import {Link, Route} from 'react-router-dom'
import APIURL from '../../helpers/environment';

const PlaylistsComponent = (props) => {
    const [playlistsList, setPlaylistsList] = useState({});
    const [blankState, setBlankState] = useState(false);
    const [putPlaylistName, setPutPlaylistName] = useState('')
    const [postPlaylistName, setPostPlaylistName] = useState('')
    //const [value, setValue] = useState('')
    const [playlistNew, setPlaylistNew] = useState('')
    const [playlistUpdate, setPlaylistUpdate] = useState('')
    const [idName, setIdName] = useState('')
    const [idNumber, setIdNumber] = useState(0)
    const updateNewPlaylistName = (e) => setPutPlaylistName(e.target.value)
    //const addNewPlaylist = (e) => setPostPlaylistName(e.target.value)
    //const postNewPlaylistsName
    const addNewPlaylistName = (e) => {setPlaylistNew(e.target.event);} 

    const fetchUpdatedPlaylistsList = () => {
        fetch(`${APIURL}/playlists/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.token
            },
            where: {owner_id: props.activeId}
        }).then(response => response.json())
        .then(data => {
            setPlaylistsList(data.result)
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchUpdatedPlaylistsList()
    }, []);  
    
    const postNewPlaylistsName = (e) => { 
        e.preventDefault();
        if (playlistNew) {
            fetch(`${APIURL}/playlists`, {
                method: 'POST',
                headers: {  //  ?
                    'Content-Type': 'application/json',
                    'Authorization': props.token
                },
                body: JSON.stringify({ // BETTER BODY? 
                    playlist_id: playlistNew
                })
            }).then(res => res.json())
            .then((body) => {console.log('Added new list son!'); 
                setBlankState(true)
                console.log(body)
                fetchUpdatedPlaylistsList()})
            .catch(error => console.log(error));
        }
    }

    const putNewPlaylistsName = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/playlists`, {
            method: 'PUT',
            headers: new Headers ({  
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            body: JSON.stringify({
                playlist_id: playlistUpdate,
                id: idNumber
            })     
        }).then(() => {fetchUpdatedPlaylistsList()
            props.setActivePlaylistId(playlistUpdate)})  // fetchUpdatedPlaylistsList()
    }

    const deletePlaylist = () => {
        fetch(`${APIURL}/playlists`, { //props.activePlaylistId
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            body: JSON.stringify({id: idNumber})
        }).then(() => fetchUpdatedPlaylistsList())
        .catch(error => console.log(error))       
    }
    
     

    // const setPlaylistId = () => {
    //     props.setActivePlaylistId()
    //     console.log(playlist.playlist_id)
    //     console.log(props.setActivePlaylistId)
    // }
    // const [playlistId, setPlaylistId] = useState('')
    // console.log(playlistId)


    return (
        <>
            <h1>Your Playlists:</h1><br />
            <div id="plural">
            {
                (playlistsList.length > 0) ? (
                    playlistsList.map(playlist => {
                        return (
                        <>
                            <tr id="floats">
                                <td>PLAYLIST NAME:</td>
                                <td id="playtitle">{playlist.playlist_id}</td>
                                    {/* <td>PLAYLIST LENGTH:</td>
                                    <td id="playtitle">{playlist.playlist_id} tracks</td> */}
                                    {/* <td>Tracks length: {playlist.length}</td> */}
                                <td><Input type="checkbox" value="playlist_id" onClick={function runFunc() {
                                        props.setActivePlaylistId(playlist.playlist_id);
                                        setIdName(playlist.playlist_id)
                                        setIdNumber(playlist.id)}} /> 
                                    {/* <Button id="detailsbutton" onClick={props.setActivePlaylistId(playlist.playlist_id)}>PLAYLIST DETAILS</Button> setPlaylistId(playlist.playlist_id) */}
                                </td>
                            </tr>
                            <hr />
                            {/* <Form onSubmit={changePlaylistsName(putPlaylistName)} id="">
                                    <Label htmlFor="updatePlaylistForm">Update the playlist's name:</Label>
                                    <Input type="text" name="updatePlaylistForm" id="updatePlaylistForm" onChange={updateNewPlaylistName}></Input>
                                    <Button>Submit</Button>                  
                            </Form> */}
                        </>
                        ) 
                    })
                ):(
                    <h3>User has no playlists</h3>
                )
            }

            {console.log(playlistsList)}
            <tr>
            <td><Button className="form-button" onClick={deletePlaylist}>DELETE</Button></td>
            </tr>
            <Form onSubmit={putNewPlaylistsName} id="">
                    <Label id="form-label-spec" htmlFor="updatePlaylistForm">Update a playlist's name:</Label>
                    <Input type="text" name="updatePlaylistForm" id="updatePlaylistForm" onChange={(e) => setPlaylistUpdate(e.target.value)}></Input>
                    <Button className="form-button" type="submit">PUT</Button>                  
            </Form>
            <Form onSubmit={postNewPlaylistsName} id="">
                    <Label id="form-label-spec" htmlFor="newPlaylistForm">Add a new playlist:</Label>
                    <Input type="text" name="newPlaylistForm" id="newPlaylistForm" onChange={(e) => setPlaylistNew(e.target.value)}></Input>
                    <Button className="form-button" type="submit">POST</Button>                  
            </Form>
            </div>
        </>
    )
};

export default PlaylistsComponent;


// *******************   LEGACY   ***************************
// ***************#   Version Dec6  #***************************

// class PlaylistsComponent extends React.Component {
//     constructor(props) {
//         super(props)
//             this.state = {
//                 playlistsList: {},
//                 blankState: false,
//                 putPlaylistName: "",
//                 playlistNew: "",
//                 idName: "",
//                 idNumber: 0
//             }
//     }

//     updateNewPlaylistName = (e) => this.setState({putPlaylistName: e.target.value});
//     addNewPlaylistName = (e) => this.setState({playlistNew: e.target.value});

//     componentDidMount() {
//         fetch('https://djs-assistant-b.herokuapp.com/playlists/', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': this.props.token
//             },
//             where: {owner_id: this.props.activeId}
//         }).then(response => response.json())
//         .then(data => {
//             this.setState.playlistsList(data.result)
//         })
//         .catch(error => console.log(error));
//     }
    
//     postNewPlaylistsName = (e) => { 
//         e.preventDefault();
//         if (playlistNew) {
//             fetch('https://djs-assistant-b.herokuapp.com/playlists', {
//                 method: 'POST',
//                 headers: {  //  ?
//                     'Content-Type': 'application/json',
//                     'Authorization': this.props.token
//                 },
//                 body: JSON.stringify({ // BETTER BODY? 
//                     playlist_id: this.state.playlistNew
//                 })
//             }).then(res => res.json())
//             .then((body) => {console.log('Added new list son!'); 
//                 this.setState.blankState(true)})
//             .catch(error => console.log(error));
//         }
//     }

//     deletePlaylist = (data) => {
//         fetch(`https://djs-assistant-b.herokuapp.com/playlist/${this.state.idName}`, { 
//             //or is that this.props.activePlaylistId
//             method: 'DELETE',
//             headers: new Headers ({
//                 'Content-Type': 'application/json',
//                 'Authorization': props.token
//             }),
//             body: JSON.stringify({playlist_id: data})
//             //where: {playlist_id: this.state.idName}
//         }).then(() => (console.log('SUCCESSFULLY GONE SON')))
//         // .catch(error => console.log(error))       
//     }

//     handleButton = () => {
//         this.props.activePlaylistId(playlist.playlist_id);
//         this.props.dName(playlist.playlist_id)
//         this.props.setIdNumber(playlist.id)
//     }

//     render() {
//         return (
//             <>
//                 <h1>Your Playlists:</h1><br />
//                 <div id="plural">
//                 {
//                     (this.state.playlistsList.length > 0) ? (
//                         this.state.playlistsList.map(playlist => {
//                             return (
//                             <>
//                                 <tr id="floats">
//                                     <td>PLAYLIST NAME:</td>
//                                     <td id="playtitle">{playlist.playlist_id}</td>
//                                     <td><Input type="checkbox" value="playlist_id" onClick={handleButton} /> 
//                                     </td>
//                                 </tr>
//                                 <hr />
//                             </>
//                             ) 
//                         })
//                     ):(
//                         <h3>User has no playlists</h3>
//                     )
//                 }

//                 {console.log(this.state.playlistsList)}
//                 <tr>
                
//                 <td><Button className="form-button">PUT</Button></td>
//                 <td><Button className="form-button" onClick={() => deletePlaylist(this.state.idName)}>DELETE</Button></td>
//                 </tr>
//                 <Form onSubmit={this.postNewPlaylistsName} id="">
//                     <Label id="form-label-spec" htmlFor="newPlaylistForm">Add a new playlist:</Label>
//                     <Input type="text" name="newPlaylistForm" id="newPlaylistForm" onChange={(e) => 
//                          this.setState.playlistNew(e.target.value)}></Input>
//                     <Button className="form-button" type="submit">POST</Button>                  
//                 </Form>
//                 </div>
//             </>
//         )
//     }
// };

// export default PlaylistsComponent;