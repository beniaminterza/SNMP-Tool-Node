import React, { useEffect, useState } from "react";
import InformationContent from "./InformationContent";
import MainInput from "./MainInput";
import IpInput from "./IpInput";
import computer from "../Images/codeicon.svg";
import position from "../Images/position-icon.svg";
import contact from "../Images/contact-icon.svg";
import write from "../Images/write-icon.svg";
import time from "../Images/time-icon.svg";
import finger from "../Images/finger-icon.svg";

export default function GetWalkSetIp({ match }) {
    const [valid, setValid] = useState(false);

    useEffect(() => {
        setValid(validateIPaddress(match.params.ip));
    }, []);

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
        <div className={valid ? `main` : `main error`}>
            <h1>
                {valid
                    ? `Get, Set and Walk: ${match.params.ip}`
                    : "Error: IP Address is not valid"}
            </h1>
            <div className="informationContainers">
                <InformationContent
                    src={computer}
                    name="sysName"
                    value="Tortuga - SN2-WLAN"
                    oid="1.3.6.1.2.1.1.5.0"
                />
                <InformationContent src={position} name="sysContact" />
                <InformationContent src={contact} name="sysContanct" />
                <InformationContent src={write} name="sysDescription" />
                <InformationContent src={time} name="sysUptime" />
                <InformationContent src={finger} name="sysObjectID" />
            </div>
            <div className="middleContainer">
                <MainInput />
                <IpInput buttonTitle="Change" title="Change IP Address"/>
            </div>
        </div>
    );
}
