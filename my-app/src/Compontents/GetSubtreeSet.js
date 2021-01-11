import React, { useState, useEffect } from "react";
import ButtonLink from "./ButtonLink";
import IpIcon from "../Images/ip-icon.svg";

export default function GetSubtreeSet(props) {
    const [valid, setValid] = useState(false);
    const [input, setInput] = useState("");
    const [inputChange, setInputChange] = useState(false);

    useEffect(() => {
        if (validateIPaddress(input)) setValid(true);
        else setValid(false);
    }, [input]);

    useEffect(() => {
        props.setUrl("/getSubtreeSet");
        loadLocalStorage();
    }, []);

    function inputUpdate(e) {
        setInputChange(true);
        setInput(e.target.value);
    }

    useEffect(() => {
        if (inputChange) saveToLocalStorage();
    }, [input]);

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

    function saveToLocalStorage() {
        localStorage.setItem("IPInput", input);
    }

    function loadLocalStorage() {
        if (localStorage.getItem("IPInput") !== "undefined") {
            setInput(localStorage.getItem("IPInput"));
        }
    }

    return (
        <div className="main">
            <h1>Get, Subtree and Walk {props.text}</h1>

            <div className="exploreContent input contentContainer">
                <img src={IpIcon} alt="IP icon" />
                <div className="description">
                    <h3>IP Address</h3>
                    <input
                        type="text"
                        placeholder="ex. 127.0.0.1"
                        onChange={inputUpdate}
                        value={input}
                    />
                    <div className={valid ? "validButton" : "novalidButton"}>
                        <ButtonLink
                            title="Search"
                            link={`/getSubtreeSet/${input}`}
                            valid={valid}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
