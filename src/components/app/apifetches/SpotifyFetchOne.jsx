import React, {useState, useEffect} from 'react';
import {FormGroup, Label, Input, Button} from 'reactstrap';

const SpotifyFetchOneComponent = (props) => {
    // const [databaseArtist, setDatabaseArtist] = useState('');
    // const [databaseTrack, setDatabaseTrack] = useState('');
    // const [trackId, setTrackId] = useState('');
    const [userTrackInput, setUserTrackInput] = useState('');
    const [userArtistInput, setUserArtistInput] = useState('');

    const [trackYear, setTrackYear] = useState('') // "1986-06-16"  
    const [artistResults, setArtistResults] = useState([]);
    const [artistObject, setArtistObject] = useState({});
    const [trackResults, setTrackResults] = useState([]);
    const [trackObject, setTrackObject] = useState({});

    useEffect(() => {
        //e.preventDefault();
        
        const searchKey = encodeURIComponent(userArtistInput.trim());
        fetch(`https://api.spotify.com/v1/search?q=${searchKey}&type=artist&limit=15`, {
            headers: {
                'Authorization': 'Bearer '+ props.accessToken}
        }).then((response) => response.json())
        .then(data => { 
            setArtistResults(data.artists.items);
        });
        return (
            <>
            Select the correct artist:
            <Input type="select" onSelect={(e) => {
                setArtistObject(e.target.value)
                props.setDatabaseArtist(artistObject.name)
                // e => props.onChange(e.target.value)
                // <component onChange={value => setState(value)} />
            }}>
                {
                    artistResults.map(options => {
                        return (
                            <>    
                                <option>{options.name}</option>
                            </>
                        )   
                    })
                }
            </Input>
            </>
        )
    },[userArtistInput])

    useEffect(() => {
            //e.preventDefault();
            
            const searchKey = encodeURIComponent(userTrackInput.trim());
            fetch(`https://api.spotify.com/v1/search?q=${searchKey}&type=track&limit=15`, {
                headers: {
                    'Authorization': 'Bearer '+ props.accessToken}
            }).then((response) => response.json())
            .then(data => {
                setTrackResults(data.tracks.items);
            });
            return (
                <>
                Select the correct track:
                <Input type="select" onSelect={(e) => {
                    setTrackObject(e.target.value)
                    props.setDatabaseTrack(trackObject.name)
                    props.setTrackId(trackObject.id)
                    props.setTrackYear(trackObject.release_date)
                }}>
                    {
                        trackResults.map(options => {
                            return (
                                <>    
                                    <option>{options.name}</option>
                                </>
                            )   
                        })
                    }
                </Input>
                </>
            )
    },[userTrackInput])

    return (
        <>
        <FormGroup>
            <Label className="form-label">Enter an artist:</Label>
            <Input className="form-input" type="text" id="" onChange={(e) => 
                setUserArtistInput(e.target.value)}></Input>
            {/* <Button onSubmit={setUserArtistInput(userArtistInput)}>Submit artist search</Button>                   */}
        </FormGroup>
        <FormGroup>
            <Label className="form-label" >Enter an track:</Label>
            <Input className="form-input" type="text" id="" onChange={(e) => 
                setUserTrackInput(e.target.value)}></Input>
            {/*<Button onSubmit={setUserTrackInput(userTrackInput)}>Submit track search</Button>
             //then fire off functions in spotifyFetchTwo */}                 
        </FormGroup>
        </>
    )
}

export default SpotifyFetchOneComponent;