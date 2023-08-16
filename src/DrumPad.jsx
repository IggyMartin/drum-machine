import React from "react";
import './DrumPad.css'

function DrumPad(props) {
    return (
        <button id={props.sound} className="drum-pad" onClick={() => {props.handleSound(props.letter); props.handleDisplay(props.sound)}}>
            <span>{props.letter}</span>
            <audio src={props.url} className="clip" id={props.letter}></audio>
        </button>
    )
}

export default DrumPad