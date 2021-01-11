import React, { useEffect, useState } from "react";
import ButtonLink from "./ButtonLink";
import IpIcon from "../Images/ip-icon.svg";

export default function IpInput(props) {
    const [valid, setValid] = useState(false);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (validateIPaddress(input)) setValid(true);
        else setValid(false);
    }, [input]);

    useEffect(() => {
        setInput(props.ip);
    }, []);

    function inputChange(e) {
        setInput(e.target.value);
    }

    function validateIPaddress(ipaddress) {
        if (
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                ipaddress
            )
        ) {
            return true;
        }
        return false;
    }


    return (
        <div className="exploreContent inputLeft contentContainer">
            <div className="description">
                <h3>{props.title}</h3>
                <input
                    type="text"
                    placeholder="ex. 127.0.0.1"
                    onChange={inputChange}
                    value={input}
                />
                <div className={valid ? "validButton" : "novalidButton"}>
                    <ButtonLink
                        title={props.buttonTitle}
                        link={`/getSubtreeSet/${input}`}
                        valid={valid}
                    />
                </div>
            </div>
            <img src={IpIcon} alt="ip icon" />
        </div>
    );
}
