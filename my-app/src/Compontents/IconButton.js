import React from 'react'

export default function IconButton(props) {
    return (
        <div className="iconButton">
            <img src={props.image} alt={props.alt}/>
        </div>
    )
}
