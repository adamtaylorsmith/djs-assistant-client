import React, {Component, useState, useEffect} from 'react';
import {Container, Row, Col, Table, Button, Label} from 'reactstrap';
import APIURL from '../../helpers/environment';
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
    const [itemId, setItemId] = useState(0)
    const [placeholderObject,  setPlaceholderObject] = useState({})
    const [firePut, setFirePut] = useState() 
    //const [blankState, setBlankState] = useState(false);
    const [playlistItem, setPlaylistItem] = useState([])

    useEffect(() => {
        fetchUpdatedItemList()
    }, []); 

    const fetchUpdatedItemList = () => {
        fetch(`${APIURL}/playlist/${props.activePlaylistId}`, {   
            method:'GET',                                                                                                       headers: {                                                                             
                'Content-Type': 'application/json',
                'Authorization': props.token
            },
            where: {playlist_id: props.activePlaylistId}
        }).then(response => response.json())
        .then(data => {
            setPlaylistItem(data.result);
        })
        .catch(error => console.log(error));
    }

    const fillPlaceholders = (itemId) => {
        fetch(`${APIURL}/playlist/${props.activePlaylistId}`, {  
            method:'GET',                                                                                                       headers: {                                                                          
                'Content-Type': 'application/json',
                'Authorization': props.token
            },
            where: {id: itemId,
                playlist_id: props.activePlaylistId}
        }).then(response => response.json())
        .then(data => {
            setPlaceholderObject(data.result[`${itemId}`])
            console.log(itemId)
            console.log(data.result[1])
            console.log(`${itemId}`)
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
            fetch(`${APIURL}/playlist/${props.activePlaylistId}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers ({
                    'Content-Type': 'application/json',
                    'Authorization': props.token
                }) 
            }).then(res => res.json())
            .then((body) => {console.log(body.id)
                fetchUpdatedItemList()})
            .catch((error) => console.log(error))
        }
        postNewPlaylistItem(postData)
    }

    const putNewPlaylistItem  = () => {
        let putData = {
            artist: databaseArtist,
            title: databaseTrack,
            year: trackYear,
            length: trackLength,
            bpm: trackBpm,
            video: videoSrc,
            loud: trackLoud,
            meter: trackMeter,
            image: imageSrc,
            key: trackKey,
            id: itemId,
            playlist_id: props.activePlaylistId
        }
        fetch(`${APIURL}/playlist/${props.activePlaylistId}`, {
            method: 'PUT',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            body: JSON.stringify(putData),
        }).then(() => fetchUpdatedItemList())
        .catch((error) => console.log(error))
    }

    const deletePlaylistItem = () => {
        fetch(`${APIURL}/playlist/${props.activePlaylistId}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }),
            body: JSON.stringify({id: itemId})
        }).then(() => fetchUpdatedItemList())
        .catch(error => console.log(error))       
    }
    
     return(
        <div id="body">
         <Table id="list-table">
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
             <br />
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
                    <h3>User has none</h3>
                    )
                }
                </tbody>
            </Table>
            <br />
                    {/* <Button className="form-button" onClick={() => fillPlaceholders(itemId)}>Update placeholders</Button> */}
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Col><Label style={{color: "white", fontSize: "18px"}} class="form-label-xtraspec">Complete form and add item:</Label><br /><br /><Button className="form-button" onClick={firePost}>POST</Button></Col>
                            <Col><Label style={{color: "white", fontSize: "18px"}} class="form-label-xtraspec">Choose item, complete form and update item:</Label><Button className="form-button" onClick={() => {setFirePut(itemId); putNewPlaylistItem()}}>PUT</Button></Col>
                            <Col><Label style={{color: "white", fontSize: "18px"}} class="form-label-xtraspec">Choose and delete item:</Label><br /><br /><Button className="form-button" onClick={deletePlaylistItem}>DELETE</Button></Col>
                        </Row>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>


                
            </Container>
        </div>
    )
}

export default PlaylistComponent;


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


// *******************   LEGACY   ***************************
// ***************#   Version Dec6  #***************************


// class PlaylistComponent extends React.Component {
//     constructor(props) {
//         super(props)
//             this.state = {
//                 databaseArtist: "",
//                 databaseTrack: "",
//                 trackLength: "",
//                 trackYear: "",
//                 trackBpm: "",
//                 trackLoud: "",
//                 trackMeter: "",
//                 imageSrc: "",
//                 trackKey: "",
//                 videoSrc: "",
//                 itemId: "",
//                 placeholderObject: {},
//                 placeholderArray: [],
//                 deleteButton: false,
//                 firePut: "",
//                 blankState: false,
//                 playlistItem: []
//             }
//     }

//     componentDidMount() {
//         fetch(`https://djs-assistant-b.herokuapp.com/playlist/${this.props.activePlaylistId}`, {  // or maybe props.id?? // or props.playlist_id 
//             method: 'GET',                                                                                                                 
//             headers: {                                                                             
//                 'Content-Type': 'application/json',
//                 'Authorization': this.props.token
//             },
//             where: {playlist_id: this.props.activePlaylistId}
//         }).then(response => response.json())
//         .then(data => {
//             this.setState.playlistItem(data.result);
//         })
//         .catch(error => console.log(error));
//     } 

//     get = () => {
//         fetch(`https://djs-assistant-b.herokuapp.com/playlist/${this.props.activePlaylistId}`, {  // or maybe props.id?? // or props.playlist_id 
//             method: 'GET',                                                                                                                 
//             headers: {                                                                             
//                 'Content-Type': 'application/json',
//                 'Authorization': this.props.token
//             },
//             where: {playlist_id: this.props.activePlaylistId}
//         }).then(response => response.json())
//         .then(data => {
//             this.setState.playlistItem(data.result);
//         })
//         .catch(error => console.log(error));
//     }

//     fillPlaceholders = (itemId) => {
//         fetch(`https://djs-assistant-b.herokuapp.com/playlist/${this.props.activePlaylistId}`, {  // or maybe props.id?? // or props.playlist_id 
//             method: 'GET',                                                                                                                 
//             headers: {                                                                             
//                 'Content-Type': 'application/json',
//                 'Authorization': this.props.token
//             },
//             where: {id: this.state.itemId,
//                 playlist_id: this.props.activePlaylistId}
//         }).then(response => response.json())
//         .then(data => {
//             this.setState.placeholderObject(data.result[`${itemId}`])
//         })
//         .catch(error => console.log(error));  
//     }

//     firePost = () => {        
//         let postData = {
//             artist: this.state.databaseArtist,
//             title: this.state.databaseTrack,
//             year: this.state.trackYear,
//             length: this.state.trackLength,
//             bpm: this.state.trackBpm,
//             video: this.state.videoSrc,
//             loud: this.state.trackLoud,
//             meter: this.state.trackMeter,
//             image: this.state.imageSrc,
//             key: this.state.trackKey
//         }
//         const postNewPlaylistItem  = (data) => {
//             fetch(`https://djs-assistant-b.herokuapp.com/playlist/${this.props.activePlaylistId}`, {
//                 method: 'POST',
//                 body: JSON.stringify(data),
//                 headers: new Headers ({
//                     'Content-Type': 'application/json',
//                     'Authorization': this.props.token
//                 }) 
//             }).then(res => res.json())
//             .then((body) => console.log(body.id))
//             .catch((error) => console.log(error))
//         }
//         postNewPlaylistItem(postData)
//     }


//     fireInTheHole =() => {  
//         let postData = {
//             artist: this.state.databaseArtist,
//             title: this.state.databaseTrack,
//             year: this.state.trackYear,
//             length: this.state.trackLength,
//             bpm: this.state.trackBpm,
//             video: this.state.videoSrc,
//             loud: this.state.trackLoud,
//             meter: this.state.trackMeter,
//             image: this.state.imageSrc,
//             key: this.state.trackKey
//         }
//         const putNewPlaylistItem  = (postData) => {
//             fetch(`https://djs-assistant-b.herokuapp.com/playlist/${this.props.activePlaylistId}`, {
//                 method: 'PUT',
//                 body: JSON.stringify(postData),
//                 headers: new Headers ({
//                     'Content-Type': 'application/json',
//                     'Authorization': this.props.token
//                 }),
//                 where: {id: this.state.firePut}
//             }).then(() => console.log('SUCCESS PUTTED'))
//             .catch((error) => console.log(error))
//         }
//         putNewPlaylistItem(postData)
//     }

//     destoyed = () => {
//         fetch(`https://djs-assistant-b.herokuapp.com/playlist/${this.props.activePlaylistId}`, {
//             method: 'DELETE',
//             headers: new Headers ({
//                 'Content-Type': 'application/json',
//                 'Authorization': this.props.token
//             }),
//             where: {id: this.state.itemId}
//         }).then(() => (console.log('SUCCESSFULLY GONE SON')))
//         .catch(error => console.log(error))       
//     }
    
//     render() {
//         return(
//             <div>  
//             <Table>
//                 <thead>
//                     <tr>
//                         <th>Artist:</th>
//                         <th>Song Title:</th>
//                         <th>Year:</th>
//                         <th>Length:</th>
//                         <th>BPM:</th>
//                         <th>Loudness:</th>
//                         <th>Meter:</th>
//                         <th>Key:</th>
//                         <th>Image:</th>
//                         <th>Video:</th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         (this.state.playlistItem.length > 0)
//                         ? (this.state.playlistItem.map(item => {
//                             return (
//                                 <PlaylistItemComponent
//                                     id={item.id}
//                                     databaseArtist={item.artist}
//                                     databaseTrack={item.title}
//                                     trackYear={item.year}
//                                     lentrackLengthgth={item.length}
//                                     trackBpm={item.bpm}
//                                     trackLoud={item.loud}
//                                     trackMeter={item.meter}
//                                     trackKey={item.key}
//                                     imageSrc={item.image}
//                                     videoSrc={item.video}
//                                     itemId={item.id}
//                                 />
//                             )
//                         }) 
//                         ) : (
//                         <h1>User has none</h1>
//                         )
//                     }
//                     <tr>
//                         {/* <td><Button className="form-button" onClick={() => fillPlaceholders(this.state.itemId)}>Update placeholders</Button></td>
//                         <td><Button className="form-button" onClick={firePost}>POST</Button></td>
//                         <td><Button className="form-button" onClick={() => {setFirePut(this.state.itemId); fireInTheHole()}}>PUT</Button></td>
//                         <td><Button onClick={() => destoyed()}>Delete!</Button></td> */}
//                     </tr>
//                 </tbody>
//             </Table>
//             <br />

//             {/* <YoutubeFetchComponent 
//                 firePost={this.state.firePost}
//                 setDatabaseArtist={this.state.databaseArtist}
//                 setDatabaseTrack={this.state.databaseTrack}
//                 setTrackLength={this.state.trackLength}
//                 setTrackYear={this.state.trackYear}
//                 setTrackBpm={this.state.trackBpm}
//                 setTrackLoud={this.state.trackLoud}
//                 setTrackMeter={this.state.trackMeter}
//                 setImageSrc={this.state.imageSrc}
//                 setTrackKey={this.state.trackKey}
//                 setVideoSrc={this.state.videoSrc}
//                 placeholderObject={this.state.placeholderObject}
//             /> */}
        
//             </div>
//         )
//     }
// };

// export default PlaylistComponent;

    
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