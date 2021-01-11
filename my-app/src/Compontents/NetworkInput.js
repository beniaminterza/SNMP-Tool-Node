import React, { useState, useEffect } from "react";
import IpIcon from "../Images/scan-radar-icon.svg";

export default function NetworkInput({
    input,
    setInput,
    fetchData,
    setLoading,
}) {
    const [valid, setValid] = useState(false);
    const [changeInput, setChangeInput] = useState(false);

    useEffect(() => {
        if (changeInput) saveToLocalStorage();
        if (validateIPaddress(input)) setValid(true);
        else setValid(false);
    }, [input]);

    useEffect(() => {
        loadLocalStorage();
    }, []);

    function inputChange(e) {
        setChangeInput(true);
        setInput(e.target.value);
    }

    function saveToLocalStorage() {
        localStorage.setItem("IPInput", input);
    }

    function loadLocalStorage() {
        if (localStorage.getItem("IPInput") !== "undefined") {
            setInput(localStorage.getItem("IPInput"));
        }
    }

    function validateIPaddress(ipaddress) {
        if (
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.([0])$/.test(
                ipaddress
            )
        ) {
            return true;
        }
        return false;
    }

    function callApi() {
        setLoading(true);
        if (valid) {
            fetchData();
        }
    }

    return (
        <div className="exploreContent input contentContainer">
            <img  className="ScanIP" src={IpIcon} alt="scane" />
            <div className="description">
                <div className="inputsNetwork">
                    <div>
                        <h3>Network</h3>
                        <input
                            type="text"
                            placeholder="ex. 10.10.30.0"
                            onChange={inputChange}
                            value={input}
                        />
                    </div>
                    <div>
                        <h3>Mask</h3>
                        <select id="mask">
                            <option value="24">24</option>
                        </select>
                    </div>
                </div>

                <div
                    className={valid ? "validButton" : "novalidButton"}
                    onClick={callApi}
                >
                    <button className="buttonLink">Scan</button>
                </div>
            </div>
        </div>
    );
}
