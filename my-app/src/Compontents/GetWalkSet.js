import React, { useState, useEffect } from "react";
import ButtonLink from "./ButtonLink";
import IpIcon from "../Images/ip-icon.svg";

export default function GetWalkSet(props) {
    const [valid, setValid] = useState(false);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (validateIPaddress(input)) setValid(true);
        else setValid(false);
    }, [input]);

    useEffect(() => {
        props.setUrl("/getWalkSet")
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
        <div className="main">
            <h1>Get, Set and Walk {props.text}</h1>

            <div className="exploreContent input contentContainer">
                <img src={IpIcon} alt="IP icon" />
                <div className="description">
                    <h3>IP Address</h3>
                    <input
                        type="text"
                        placeholder="ex. 127.0.0.1"
                        onChange={inputChange}
                        value={input}
                    />
                    <div className={valid ? "validButton" : "novalidButton"}>
                        <ButtonLink
                            title="Search"
                            link={`/getWalkSet/${input}`}
                            valid={valid}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
