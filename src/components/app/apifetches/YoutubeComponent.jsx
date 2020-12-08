// import React, {useState, onEffect} from 'react';
// import {Input} from 'reactstrap'

// const YoutubeComponent = (props) => {

//     const [choice, setChoice] = useState('')
    
//     const saveProps = () => {
//         props.setImage(choice)
//     }

//     // use title choice to find object
//     // props.setVideoObject
//     return (
//         <>
//             Select the correct video:
//             <Input type="select" onSelect={(e) => {
//                 props.setVideo(e.target.value)
//                 // props.setVideo(props.videoObject.id.videoId)
//                 // props.setImage(props.videoObject.snippet.thumbnails.default.url)
//                 //props.setVideoObject(e.target.value)
//                 }} >
//                 {
//                     props.itemsArray.map(options => {
//                         return (
//                             <>    
//                                 <option>{options.snippet.title}</option>
//                             </>
//                         )   
//                     })
//                 }
//             </Input>
            
//         </>
//     )
// }

// export default YoutubeComponent