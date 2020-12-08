import React, {Component, useState, useEffect} from 'react';
import {Form, Input, FormGroup, Label, Button} from 'reactstrap';
import YoutubeComponent from './YoutubeComponent';

const YoutubeFetchComponent = (props) => {

    //const setItemsArray = [];
    const [itemsArray, setItemsArray] = useState([])
    const [videoObject, setVideoObject] = useState({})
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [titleName, setTitleName] = useState('')
    const fetchYoutube = async () => {
        const my_key = "&key=AIzaSyCGJIYubBL1weyrP1zsA7YGfbUEQuBwgzQ";
        const search = "rosalia";
        const artistBlob = await 
        fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&q="+search+"&type=video"+my_key, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                // "Authorization": "Bearer "
            }
        });
        const blob = await artistBlob.json();
        setItemsArray(blob.items);
        console.log(blob.items[0].snippet.thumbnails.default.url);
        console.log(blob.items[0].id.videoId);
        //console.log(itemsArray);
        // https://www.youtube.com/watch?v=
    }
    return (
        <div >
            {/* <Button onClick={fetchYoutube}>YOUTUBE</Button>
            <div>
                { itemsArray.length > 0 ? 
                <YoutubeComponent setVideoObject={setVideoObject} setVideo={setVideo} setImage={setImage} videoObject={videoObject} itemsArray={itemsArray} setTitleName={setTitleName} />
                : null }
            </div>
            <Button onClick={() => console.log(itemsArray)}>LOG</Button> */}
            <FormGroup className="form-group">
                <Label className="form-label" >Enter an artist:</Label>
                <Input className="form-input" placeholder={props.placeholderObject.artist} type="text" onChange={(e) => 
                    props.setDatabaseArtist(e.target.value)}></Input>            
            </FormGroup>
            <FormGroup>
                <Label className="form-label" >Enter a track:</Label>
                <Input className="form-input" placeholder={props.placeholderObject.title} type="text" onChange={(e) => 
                    props.setDatabaseTrack(e.target.value)}></Input>            
            </FormGroup>
            <FormGroup>
                <Label className="form-label">Enter the track Length:</Label>
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
                <Label className="form-label" >Enter the track Loudness:</Label>
                <Input className="form-input" placeholder={props.placeholderObject.loud} type="text" onChange={(e) => 
                    props.setTrackLoud(e.target.value)}></Input>            
            </FormGroup>
            <FormGroup>
                <Label className="form-label" >Enter the track Meter:</Label>
                <Input className="form-input" placeholder={props.placeholderObject.meter} type="text" onChange={(e) => 
                    props.setTrackMeter(e.target.value)}></Input>            
            </FormGroup>
            <FormGroup>
                <Label className="form-label">Enter an Image Src:</Label>
                <Input className="form-input" placeholder={props.placeholderObject.image} type="text" onChange={(e) => 
                    props.setImageSrc(e.target.value)}></Input>
            </FormGroup>
            <FormGroup>
                <Label className="form-label" >Enter the track Key:</Label>
                <Input className="form-input" placeholder={props.placeholderObject.key} type="text" onChange={(e) => 
                    props.setTrackKey(e.target.value)}></Input>            
            </FormGroup> 
        </div>
    )
}

export default YoutubeFetchComponent;


// *******************   LEGACY   ***************************
// ***************#   Version Dec6  #***************************

// class YoutubeFetchComponent extends React.Component {
 
//     render() {
//         return (
//             <div >  
//                 <FormGroup>
//                     <Label className="form-label" >Enter an artist: (text)</Label>
//                     <Input className="form-input" placeholder={this.props.placeholderObject.artist} type="text" onChange={(e) => 
//                         this.props.databaseArtist(e.target.value)}></Input>            
//                 </FormGroup>
//                 <FormGroup>
//                     <Label className="form-label" >Enter a track: (text)</Label>
//                     <Input className="form-input" placeholder={this.props.placeholderObject.title} type="text" onChange={(e) => 
//                         this.props.databaseTrack(e.target.value)}></Input>            
//                 </FormGroup>
//                 <FormGroup>
//                     <Label className="form-label">Enter the track Length: (text)</Label>
//                     <Input className="form-input" placeholder={this.props.placeholderObject.length} type="text"  onChange={(e) => 
//                         this.props.trackLength(e.target.value)}></Input>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label className="form-label" >Enter the track Year:</Label>
//                     <Input className="form-input" placeholder={this.props.placeholderObject.year} type="text"  onChange={(e) => 
//                         this.props.trackYear(e.target.value)}></Input>            
//                 </FormGroup>
//                 <FormGroup>
//                     <Label className="form-label">Enter the track Bpm:</Label>
//                     <Input className="form-input" placeholder={this.props.placeholderObject.bpm} type="text" onChange={(e) => 
//                         this.props.trackBpm(e.target.value)}></Input>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label className="form-label" >Enter the track Loudness: (text)</Label>
//                     <Input className="form-input" placeholder={this.props.placeholderObject.loud} type="text" onChange={(e) => 
//                         this.props.trackLoud(e.target.value)}></Input>            
//                 </FormGroup>
//                 <FormGroup>
//                     <Label className="form-label" >Enter the track Meter: (text)</Label>
//                     <Input className="form-input" placeholder={this.props.placeholderObject.meter} type="text" onChange={(e) => 
//                         this.props.trackMeter(e.target.value)}></Input>            
//                 </FormGroup>
//                 <FormGroup>
//                     <Label className="form-label">Enter an Image Src: (text)</Label>
//                     <Input className="form-input" placeholder={this.props.placeholderObject.image} type="text" onChange={(e) => 
//                         this.props.imageSrc(e.target.value)}></Input>
//                 </FormGroup>
//                 <FormGroup>
//                     <Label className="form-label" >Enter the track Key: (text)</Label>
//                     <Input className="form-input" placeholder={this.props.placeholderObject.key} type="text" onChange={(e) => 
//                         this.props.trackKey(e.target.value)}></Input>            
//                 </FormGroup>
//             </div>
//         )

//     }
// }

// export default YoutubeFetchComponent;


// ************************************************************************************************
// ************************ youtube api fetch ***************************************************

   // const my_key = "&key=AIzaSyCGJIYubBL1weyrP1zsA7YGfbUEQuBwgzQ";
    // const searchKey = setDatabaseArtist + " " + setDatabaseTrack;
    // let search = encodeURIComponent(searchKey.trim());
    // //const [videoSrc, setVideoSrc] = useState('');
    // const [youtubeSwitch, setYoutubeSwitch] = useState(false);
    // const [youtubeObjects, setYoutubeObjects] = useState({});
    // const [videoObject, setVideoObject] = useState([]);
    // const [fireBigForm, setFireBigForm] = useState(false)

    // useEffect(() => {

    // const fetchYoutube = async () => {
    //     const my_key = "&key=AIzaSyCGJIYubBL1weyrP1zsA7YGfbUEQuBwgzQ";
    //     const search = "rosalia";
    //     const artistBlob = await 
    //     fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&q="+search+"&type=video"+my_key, {
    //         method: 'GET',
    //         headers: {
    //             "Accept": "application/json",
    //             // "Authorization": "Bearer "
    //         }
    //     });
    //     const blob = await artistBlob.json();
    //     console.log(blob.items[0].snippet.thumbnails.default.url);
    //     console.log(blob.items[0].id.videoId);
    //     console.log(blob.items[1].snippet.thumbnails.default.url);
    //     console.log(blob.items[1].id.videoId);
    //     console.log(blob);
    
    //     // https://www.youtube.com/watch?v=
    // }

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
    //const hello = 'what up'
      