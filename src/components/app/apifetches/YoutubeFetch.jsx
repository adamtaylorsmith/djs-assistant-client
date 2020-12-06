import React, {useState, useEffect} from 'react';
import {Input, FormGroup, Label, Button} from 'reactstrap';

const YoutubeFetchComponent = (props) => {
    // const my_key = "&key=AIzaSyCGJIYubBL1weyrP1zsA7YGfbUEQuBwgzQ";
    // const searchKey = setDatabaseArtist + " " + setDatabaseTrack;
    // let search = encodeURIComponent(searchKey.trim());
    // //const [videoSrc, setVideoSrc] = useState('');
    // const [youtubeSwitch, setYoutubeSwitch] = useState(false);
    // const [youtubeObjects, setYoutubeObjects] = useState({});
    // const [videoObject, setVideoObject] = useState([]);
    // const [fireBigForm, setFireBigForm] = useState(false)

    // useEffect(() => {
    //     //e.preventDefault();
    //     fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&q="+search+"&type=video"+my_key, {
    //         method: 'GET',
    //         headers: {
    //             "Accept": "application/json",
    //         }
    //     }).then(response => response.json())
    //     .then(data => {
    //         setYoutubeObjects(data.items);
    //     });
        
    //     return (
    //         <>
    //         Select the correct video:
    //         <Input type="select" onSelect={(e) => {
    //             setVideoObject(e.target.value)
    //             props.setVideoSrc(videoObject.id.videoId)
    //         }}>
    //             {
    //                 youtubeObjects.map(options => {
    //                     return (
    //                         <>    
    //                             <option>{options.snippet.title}</option>
    //                         </>
    //                     )   
    //                 })
    //             }
    //         </Input>
    //         </>
    //     )
    // },[youtubeSwitch])
    const hello = 'what up'
        // artist: "tom petty"
    // bpm: "90"
    // createdAt: "2020-12-04T22:53:48.576Z"
    // id: 2
    // image: "yes"
    // key: "much"
    // length: "90"
    // loud: "quiet"
    // meter: "ok"
    // owner_id: 1
    // playlist_id: "partytime"
    // title: "fallin"
    // updatedAt: "2020-12-04T22:53:48.576Z"
    // video: "yes"
    // year: "w"

    return (
                <div >
                    
                    <FormGroup>
                        <Label className="form-label" >Enter an artist: (text)</Label>
                        <Input className="form-input" placeholder={props.placeholderObject.artist} type="text" onChange={(e) => 
                            props.setDatabaseArtist(e.target.value)}></Input>            
                    </FormGroup>
                    <FormGroup>
                        <Label className="form-label" >Enter a track: (text)</Label>
                        <Input className="form-input" placeholder={props.placeholderObject.title} type="text" onChange={(e) => 
                            props.setDatabaseTrack(e.target.value)}></Input>            
                    </FormGroup>
                    <FormGroup>
                        <Label className="form-label">Enter the track Length: (text)</Label>
                        <Input className="form-input" placeholder={props.placeholderObject.length} type="text"  onChange={(e) => 
                            props.setTrackLength(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="form-label" >Enter the track Year:</Label>
                        <Input className="form-input" placeholder={props.placeholderObject.year} type="text"  onChange={(e) => 
                            props.setTrackYear(e.target.value)}></Input>            
                    </FormGroup>
                    <FormGroup>
                        <Label className="form-label">Enter the track Bpm:</Label>
                        <Input className="form-input" placeholder={props.placeholderObject.bpm} type="text" onChange={(e) => 
                            props.setTrackBpm(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="form-label" >Enter the track Loudness: (text)</Label>
                        <Input className="form-input" placeholder={props.placeholderObject.loud} type="text" onChange={(e) => 
                            props.setTrackLoud(e.target.value)}></Input>            
                    </FormGroup>
                    <FormGroup>
                        <Label className="form-label" >Enter the track Meter: (text)</Label>
                        <Input className="form-input" placeholder={props.placeholderObject.meter} type="text" onChange={(e) => 
                            props.setTrackMeter(e.target.value)}></Input>            
                    </FormGroup>
                    <FormGroup>
                        <Label className="form-label">Enter an Image Src: (text)</Label>
                        <Input className="form-input" placeholder={props.placeholderObject.image} type="text" onChange={(e) => 
                            props.setImageSrc(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className="form-label" >Enter the track Key: (text)</Label>
                        <Input className="form-input" placeholder={props.placeholderObject.key} type="text" onChange={(e) => 
                            props.setTrackKey(e.target.value)}></Input>            
                    </FormGroup>
                    
                    {/* <FormGroup>
                        <Label className="form-label">Choose your prefered Video: setVideoSrc</Label>
                        <Button className="form-button" onChange={setYoutubeSwitch(true)}>Fetch options from Youtube</Button>                      
                    </FormGroup> */}
                </div>
            )
}

export default YoutubeFetchComponent;


