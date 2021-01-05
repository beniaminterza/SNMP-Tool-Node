import React from "react";

export default function InformationContent(props) {
    return (
        <div className="informationsContent contentContainer">
            <img src={props.src} alt={props.alt} />
            <div className="description">
                <h3>{props.name}</h3>
                <p>{props.value}</p>
                <div className="oid">{props.oid}</div>
            </div>
        </div>
    );
}
