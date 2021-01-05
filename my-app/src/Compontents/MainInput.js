import React from "react";
import IconButton from "./IconButton";
import get from "../Images/get-icon.svg";
import walk from "../Images/walk2-icon.svg";
import set from "../Images/set-icon.svg";

export default function BigInput() {
    return (
        <div className="contentContainer mainInput">
            <div className="inputs">
                <div className="inputContainer">
                    <h3>OID</h3>
                    <input type="text" placeholder="ex. 1.3.6.1.2.1.1.5.0" />
                </div>

                <div className="inputContainer">
                    <h3>Value</h3>
                    <input type="text" placeholder="ex. Router 5550" />
                </div>
            </div>
            <div className="iconButtons">
                <IconButton image={get} alt="time" />
                <IconButton image={walk} alt="time" />
                <IconButton image={set} alt="time" />
            </div>
        </div>
    );
}
