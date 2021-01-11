import React, { useState, useEffect } from "react";

export default function Setting({ timeout, setTimeouts }) {
    const [isNumber, setIsNumber] = useState(true);

    useEffect(() => {
        if (isNaN(timeout) || timeout === "") setIsNumber(false);
        else setIsNumber(true);
    }, [timeout]);

    function timeoutChange(e) {
        setTimeouts(e.target.value);
    }

    async function patchTimeout() {
        if (isNumber) {
            fetch(`http://localhost:3001/setTimeout/${timeout}`);
        }
    }

    return (
        <div className="main">
            <h1>Settings</h1>

            <div className="exploreContent contentContainer input timeout">
                <h3>SNMP Timeout</h3>
                <p>Number of milliseconds to wait for a response before re-trying or failing</p>
                <div className="timeoutInput">
                    <input
                        type="text"
                        value={timeout}
                        onChange={timeoutChange}
                    />
                    <h3>ms</h3>
                </div>
                <div className={isNumber ? "validButton" : "novalidButton"}>
                    <button className="buttonLink" onClick={patchTimeout}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
