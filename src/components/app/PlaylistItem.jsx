import React from 'react'
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