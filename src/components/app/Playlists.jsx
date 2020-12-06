import React, {useState, useEffect} from 'react';
import {Form, Button, FormGroup, Label, Input} from 'reactstrap';
import {Link, Route} from 'react-router-dom'

const PlaylistsComponent = (props) => {
    const [playlistsList, setPlaylistsList] = useState({});
    const [blankState, setBlankState] = useState(false);
    const [putPlaylistName, setPutPlaylistName] = useState('')
    const [postPlaylistName, setPostPlaylistName] = useState('')
    //const [value, setValue] = useState('')
    const [playlistNew, setPlaylistNew] = useState('')
    const [idName, setIdName] = useState('')
    const [idNumber, setIdNumber] = useState(0)
    const updateNewPlaylistName = (e) => setPutPlaylistName(e.target.value)
    //const addNewPlaylist = (e) => setPostPlaylistName(e.target.value)
    //const postNewPlaylistsName
    const addNewPlaylistName = (e) => {setPlaylistNew(e.target.event);}

    useEffect(() => {
        // console.log(props.activeId)
        fetch('http://localhost:5435/playlists/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.token
            },
            where: {owner_id: props.activeId}
        }).then(response => response.json())
        .then(data => {
            setPlaylistsList(data.result)
            // console.log(playlistsList)
            // console.log(playlistsList.result)
        })
        .catch(error => console.log(error));
    }, []); // [blankState]
    
    //const [newName, setNewName] = useState('');
    const postNewPlaylistsName = (e) => { 
        // console.log(props.token)
        // console.log(playlistNew)
        e.preventDefault();
        if (playlistNew) {
            fetch('http://localhost:5435/playlists', {
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
                console.log(body)})
            .catch(error => console.log(error));
        }
    }

    const deletePlaylist = (idName) => {
        fetch(`http://localhost:5435/playlist/${idName}`, { //props.activePlaylistId
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            body: JSON.stringify({playlist_id: idName})
            //where: {playlist_id: idName}
        }).then(() => (console.log('SUCCESSFULLY GONE SON')))
        // .catch(error => console.log(error))       
    }
    
    //const [changeName, setChangeName] = useState('');
    // const changePlaylistsName = (data) => {
    //     fetch('http://localhost:5435/playlists', { //   /${or props.id}??????????????????
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             playlist_id: data
    //         }),  // BETTER BODY? &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    //         headers: new Headers ({     // why new headers ?????????????????????????????????????????? 
    //             'Content-Type': 'application/json',
    //             'Authorization': props.token
    //         })
    //     }).then(() => {setBlankState(true)}) 
        
    // } 

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
            
            <td><Button className="form-button">PUT</Button></td>
            <td><Button className="form-button" onClick={() => deletePlaylist(idName)}>DELETE</Button></td>
            </tr>
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

// 