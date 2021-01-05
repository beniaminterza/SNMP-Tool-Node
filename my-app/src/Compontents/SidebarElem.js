import React from "react";
import { Link } from "react-router-dom";

export default function SidebarElem(props) {
    function clickLink(e) {
        console.log(props.link);
        props.setUrl(props.link);
    }

    return (
        <Link
            to={props.link}
            className={
                props.url === props.link
                    ? "sidebarElement selected"
                    : "sidebarElement"
            }
            onClick={clickLink}
        >
            <div className="imgContainer">
                <img src={props.img} alt={props.alt} />
            </div>
            <h4>{props.title}</h4>
            <div className="marker"></div>
        </Link>
    );
}
