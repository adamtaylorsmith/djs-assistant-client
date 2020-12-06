import React, {useState, useEffect} from 'react';
import {FormGroup, Button} from 'reactstrap';

const SpotifyFetchTwoComponent = (props) => {
    const [trackLength, setTrackLength] = useState('')
    const [trackBpm, setTrackBpm] = useState('')
    const [trackLoud, setTrackLoud] = useState('')
    const [trackMeter, setTrackMeter] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const [trackKey, setTrackKey] = useState('')
    const [stateChange, setStateChange] = useState(false)

    useEffect (() => {

        fetch(`https://api.spotify.com/v1/tracks/${props.trackId}`, {
            headers: {
                'Authorization': 'Bearer '+ props.accessToken}
        }).then((response) => response.json())
        .then(data => {
            props.setTrackLength(data.duration_ms); //.value?
            props.setImageSrc(data.album.images[0].url)
        });
    
        fetch(`https://api.spotify.com/v1/audio-features/${props.trackId}`, {
            headers: {
                'Authorization': 'Bearer '+ props.accessToken}
        }).then((response) => response.json())
        .then(data => {
            props.setTrackBpm(data.tempo);
            props.setTrackLoud(data.loudness);
            props.setTrackMeter(data.time_signature)
            props.setTrackKey(data.key)
        });
    }, [stateChange])

    return (
        <FormGroup>
            <Button className="form-button" onSubmit={setStateChange(true)}>Second fetch from Spotify</Button>                  
        </FormGroup>
    )
}

export default SpotifyFetchTwoComponent;