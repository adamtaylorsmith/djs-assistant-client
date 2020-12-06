import React, {useState, useEffect} from 'react';
import {Table, Button} from 'reactstrap';
import PlaylistItemComponent from './PlaylistItem';
//import queryString from 'query-string'
//import SpotifyFetchOneComponent from './apifetches/SpotifyFetchOne';
//import SpotifyFetchTwoComponent from './apifetches/SpotifyFetchTwo';
import YoutubeFetchComponent from './apifetches/YoutubeFetch';

const PlaylistComponent = (props) => {
    const [databaseArtist, setDatabaseArtist] = useState('')
    const [databaseTrack, setDatabaseTrack] = useState('')
    const [trackLength, setTrackLength] = useState('')
    const [trackYear, setTrackYear] = useState('')
    const [trackBpm, setTrackBpm] = useState('')
    const [trackLoud, setTrackLoud] = useState('')
    const [trackMeter, setTrackMeter] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const [trackKey, setTrackKey] = useState('')   
    const [videoSrc, setVideoSrc] = useState('')
    //const [ActivePlaylistItem, setActivePlaylistItem] = useState('')
    const [itemId, setItemId] = useState(0)
    const [placeholderObject,  setPlaceholderObject] = useState({})
    const [placeholderArray, setPlaceholderArray] = useState({})
    const [deleteButton, setDeleteButton] = useState(false)
    const [firePut, setFirePut] = useState()
    // const [playlist, setPlaylist] = useState([]);
    // const [trackId, setTrackId] = useState('')
    // const [emptyState, setEmptyState] = useState(false);
     const [blankState, setBlankState] = useState(false);
    const [playlistItem, setPlaylistItem] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5435/playlist/${props.activePlaylistId}`, {  // or maybe props.id?? // or props.playlist_id 
            method: 'GET',                                                                                                                 
            headers: {                                                                             
                'Content-Type': 'application/json',
                'Authorization': props.token
            },
            where: {playlist_id: props.activePlaylistId}
        }).then(response => response.json())
        .then(data => {
            setPlaylistItem(data.result);
            // console.log(setPlaylistItem)
            // console.log(setPlaylistItem.length)
        })
        .catch(error => console.log(error));
    }, []); 

    const get = () => {
        fetch(`http://localhost:5435/playlist/${props.activePlaylistId}`, {  // or maybe props.id?? // or props.playlist_id 
            method: 'GET',                                                                                                                 
            headers: {                                                                             
                'Content-Type': 'application/json',
                'Authorization': props.token
            },
            where: {playlist_id: props.activePlaylistId}
        }).then(response => response.json())
        .then(data => {
            setPlaylistItem(data.result);
            console.log(setPlaylistItem)
            console.log(setPlaylistItem.length)
        })
        .catch(error => console.log(error));
    }

    const fillPlaceholders = (itemId) => {
        fetch(`http://localhost:5435/playlist/${props.activePlaylistId}`, {  // or maybe props.id?? // or props.playlist_id 
            method: 'GET',                                                                                                                 
            headers: {                                                                             
                'Content-Type': 'application/json',
                'Authorization': props.token
            },
            where: {id: itemId,
                playlist_id: props.activePlaylistId}
        }).then(response => response.json())
        .then(data => {
            //setPlaceholderArray(data.result);
            setPlaceholderObject(data.result[`${itemId}`])
            console.log(itemId)
            console.log(data.result[1])
            console.log(`${itemId}`)
            // console.log(setPlaylistItem.length)
        })
        .catch(error => console.log(error));  
    }

    const firePost = () => {        
        let postData = {
            artist: databaseArtist,
            title: databaseTrack,
            year: trackYear,
            length: trackLength,
            bpm: trackBpm,
            video: videoSrc,
            loud: trackLoud,
            meter: trackMeter,
            image: imageSrc,
            key: trackKey
        }

        const postNewPlaylistItem  = (data) => {
            fetch(`http://localhost:5435/playlist/${props.activePlaylistId}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': props.token
                }) 
            }).then(res => res.json())
            .then((body) => console.log(body.id))
            .catch((error) => console.log(error))
        }
        postNewPlaylistItem(postData)
    
    
        // const postNewPlaylistItem  = (data) => {
        //     fetch(`http://localhost:5435/playlist/${props.activePlaylistId}`, {
        //         method: 'POST',
        //         body: JSON.stringify(data),
        //         headers: new Headers ({
        //             'Content-Type': 'application/json',
        //             'Authorization': props.token
        //         }) 
        //     }).then(() => console.log('SUCCESS POSTED'))
        //     .catch((error) => console.log(error))
        // }
        // postNewPlaylistItem(postData)
    }

    useEffect(() => {  
        let postData = {
            artist: databaseArtist,
            title: databaseTrack,
            year: trackYear,
            length: trackLength,
            bpm: trackBpm,
            video: videoSrc,
            loud: trackLoud,
            meter: trackMeter,
            image: imageSrc,
            key: trackKey
        }
        const putNewPlaylistItem  = (postData) => {
            fetch(`http://localhost:5435/playlist/${props.activePlaylistId}`, {
                method: 'PUT',
                body: JSON.stringify(postData),
                headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': props.token
                }),
                where: {id: firePut,
                    //playlist_id: props.activePlaylistId
                }
            }).then(() => console.log('SUCCESS PUTTED'))
            .catch((error) => console.log(error))
        }
        putNewPlaylistItem(postData)
    }, [blankState]); 

    useEffect(() => {
    //const deletePlaylistItem = (itemId) => {
        fetch(`http://localhost:5435/playlist/${props.activePlaylistId}`, {
            method: 'DELETE',
            //body: JSON.stringify(itemId),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            where: {id: itemId
                }
        }).then(() => (console.log('SUCCESSFULLY GONE SON')))
        .catch(error => console.log(error))       
    //}
    //     deletePlaylistItem(xid)
    }, [deleteButton]);
    
     return(
        <div>
        
         <Table>
             <thead>
                 <tr>
                     <th>Artist:</th>
                     <th>Song Title:</th>
                     <th>Year:</th>
                     <th>Length:</th>
                     <th>BPM:</th>
                     <th>Loudness:</th>
                     <th>Meter:</th>
                     <th>Key:</th>
                     <th>Image:</th>
                     <th>Video:</th>
                     <th></th>
                 </tr>
             </thead>
             <tbody>
        {
            (playlistItem.length > 0)
            ? (playlistItem.map(item => {
                return (
                    <PlaylistItemComponent
                        id={item.id}
                        artist={item.artist}
                        title={item.title}
                        year={item.year}
                        length={item.length}
                        bpm={item.bpm}
                        loud={item.loud}
                        meter={item.meter}
                        key={item.key}
                        image={item.image}
                        video={item.video}
                        setItemId={setItemId}
                    />
                )
             }) 
            ) : (
             <h1>User has none</h1>
            )
        }
        <tr>
            <td><Button className="form-button" onClick={() => fillPlaceholders(itemId)}>Update placeholders</Button></td>
            <td><Button className="form-button" onClick={firePost}>POST</Button></td>
            <td><Button className="form-button" onClick={() => {setFirePut(itemId); setBlankState(true)}}>PUT</Button></td>
            <td><Button onClick={() => setDeleteButton(true)}>Delete!</Button></td>
            {/* <td><Button className="form-button" onClick={deletePlaylistItem(itemId)}>DELETE</Button></td> */}
        </tr>
          
        </tbody>
        </Table>
        <br />

        <YoutubeFetchComponent 
            firePost={firePost}
            setDatabaseArtist={setDatabaseArtist}
            setDatabaseTrack={setDatabaseTrack}
            setTrackLength={setTrackLength}
            setTrackYear={setTrackYear}
            setTrackBpm={setTrackBpm}
            setTrackLoud={setTrackLoud}
            setTrackMeter={setTrackMeter}
            setImageSrc={setImageSrc}
            setTrackKey={setTrackKey}
            setVideoSrc={setVideoSrc}
            placeholderObject={placeholderObject}
        />
        
    
        </div>
    )
    

    
    // return (
    //     <>
    //     <h1>Playlist name: {props.activePlaylistId}</h1>        {/*  maybe that playlist. is unnecessary or maybe include props. instead */}
    //     
    //             {
    //                 (setPlaylistItem > 0)
    //              }
    //             <tr>
    //                 <th scope="row">Add a new item to your playlist, {props.activePlaylistId}</th>
    //             </tr>
    //             <tr>
    //                 <td>
    //                   <Button onClick={() => window.location = 'https://djs-assistant-server.herokuapp.com/signin'}>1. Fetch Spotify access token</Button>    
    //                 </td>
    //                 <td></td>
    //                 <td><Button onClick={setEmptyState(true)}>2. Add new item</Button></td>
    //             </tr> 
    //         </tbody>
    //     </Table>

    //         {
    //             useEffect(() => {
    //                 let parsed = queryString.parse(window.location.search);
    //                 let accessToken = parsed.access_token;
    //                 return ( 
    //                     <>
    //                         <SpotifyFetchOneComponent 
    //                             accessToken={accessToken} 
    //                             setDatabaseArtist={setDatabaseArtist}
    //                             setDatabaseTrack={setDatabaseTrack}
    //                             setTrackId={setTrackId}
    //                             setTrackYear={setTrackYear}
    //                             // onChange={(value) => {
    //                             //     setDatabaseArtist(value)
    //                             //     setDatabaseTrack(value)
    //                             //     setTrackId(value)
    //                             //     setTrackYear(value)}}
    //                         />
    //                         <SpotifyFetchTwoComponent 
    //                             accessToken={accessToken} 
    //                             trackId={trackId}
    //                             setTrackLength={setTrackLength}
    //                             setTrackBpm={setTrackBpm}
    //                             setTrackLoud={setTrackLoud}
    //                             setTrackMeter={setTrackMeter}
    //                             setTrackKey={setTrackKey}
    //                             setImageSrc={setImageSrc}
    //                             // onChange={(value) => {
    //                             //     setTrackLength(value)
    //                             //     setTrackBpm(value)
    //                             //     setTrackLoud(value)
    //                             //     setTrackMeter(value)
    //                             //     setTrackKey(value)
    //                             //     setImageSrc(value)}}
    //                         />
    //                         <YoutubeFetchComponent 
    //                             databaseArtist={databaseArtist}
    //                             databaseTrack={databaseTrack}
    //                             setVideoSrc={setVideoSrc}
    //                             // onChange={(value) => 
    //                             //     setVideoSrc(value)} 
    //                         />
    //                     </>
    //                 )
    //             },[emptyState])
    //         }
            
    //     </>
    // )
};

export default PlaylistComponent;

 {/***********************************************************************
    * add newiTEM with SPOTIFY TOKEN / 
SPOTIFY SEARCH ARTIST, THEN TRACK, THEN TRACK ID TO GET BPM /
then search youtube for video src /
then post new info to database /
then refresh they playlist to list all items
##
the user enters artist and chooses from list of possible
then the user enters track and chooses from list of possible (stretch goal 'any')
*******************/}