import React from "react";

export default function Button(props) {
    function check(e) {
        console.log(props.valid);
        if (typeof props.valid !== "undefined") {
            if (!props.valid) {
                e.preventDefault();
            }
        }
    }

    return (
        <div>
            <a className="buttonLink" href={props.link} onClick={check}>
                {props.title}{" "}
            </a>
        </div>
    );
}
