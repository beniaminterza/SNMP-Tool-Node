import React from "react";
import { Link } from "react-router-dom";

export default function ButtonLink(props) {
    function check(e) {
        if (typeof props.valid !== "undefined") {
            if (!props.valid) {
                e.preventDefault();
            }
        }
    }

    return (
        <div>
            <Link to={props.link}>
                <button className="buttonLink" onClick={check}>
                    {props.title}{" "}
                </button>
            </Link>
        </div>
    );
}
