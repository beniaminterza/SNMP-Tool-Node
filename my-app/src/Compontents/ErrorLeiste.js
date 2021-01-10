import React from "react";
import Button from "../Compontents/ButtonA"

export default function ErrorLeiste({available}) {
    return (
        <div className={available ? "fadeOut errorLeiste" : "fadeIn errorLeiste"}>
            <h1>Please start the SERVER to use the functionalities</h1>
            <div className="downloadArea">
                <p>Download the "SNMP WEB Server" here</p>
                <Button
                    title="Download"
                    link="https://github.com/beniaminterza/SNMP-Tool-Node"
                />
            </div>
        </div>
    );
}
