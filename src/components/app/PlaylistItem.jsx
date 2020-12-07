import React, {Component} from 'react'
import {Input, Button} from 'reactstrap'


const PlaylistItemComponent = (props) => {
    return (
        <>
            <tr>
                <td>{props.artist}</td>
                <td>{props.title}</td>
                <td>{props.year}</td>
                <td>{props.length}</td>
                <td>{props.bpm}</td>
                <td>{props.loud}</td>
                <td>{props.meter}</td>
                <td>{props.key}</td>
                <td>{props.image}</td>
                <td>{props.video}</td>
                <Input type="checkbox" value="xid" onChange={function runFunc() {props.setItemId(props.id)}} />
            </tr>

        </>
    )
}

export default PlaylistItemComponent;


{/* <td><Button onClick={() => props.deletePlaylistItem(props.id)}>DELETE</Button></td> */}

// *******************   LEGACY   ***************************
// ***************#   Version Dec6  #***************************

// class PlaylistItemComponent extends React.Component {

//     handleInput() {
//         this.props.itemId(this.props.id)
//     }

//     render() {
//         return (
//             <>
//                 <tr>
//                     <td>{this.props.artist}</td>
//                     <td>{this.props.title}</td>
//                     <td>{this.props.year}</td>
//                     <td>{this.props.length}</td>
//                     <td>{this.props.bpm}</td>
//                     <td>{this.props.loud}</td>
//                     <td>{this.props.meter}</td>
//                     <td>{this.props.key}</td>
//                     <td>{this.props.image}</td>
//                     <td>{this.props.video}</td>
//                     <Input type="checkbox" value="itemId" onChange={this.handleInput} />
//                 </tr>
//             </>
//         )
//     }
// }

// export default PlaylistItemComponent;