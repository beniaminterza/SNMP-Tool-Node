import React from "react";
import ButtonLink from "./ButtonLink";

export default function ExploreContent(props) {
    return (
        <div className="exploreContent contentContainer">
            <img src={props.src} alt={props.alt} />
            <div className="description">
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
            <ButtonLink title="See more" link={props.link}/>
        </div>
    );
}
