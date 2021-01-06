import React, { useEffect, useState } from "react";
import InformationContent from "./InformationContent";
import MainInput from "./MainInput";
import IpInput from "./IpInput";
import ReplyTable from "./ReplyTable";
import computer from "../Images/codeicon.svg";
import position from "../Images/position-icon.svg";
import contact from "../Images/contact-icon.svg";
import write from "../Images/write-icon.svg";
import time from "../Images/time-icon.svg";
import finger from "../Images/finger-icon.svg";

export default function GetWalkSetIp({ match }) {
    const [valid, setValid] = useState(false);
    const [basicValues, setBasicValues] = useState([]);
    const [basicContainers, setBasicContainers] = useState([]);

    const images = [computer, position, contact, write, time, finger];

    useEffect(() => {
        setValid(validateIPaddress(match.params.ip));
        fetchBasics();
    }, []);

    async function fetchBasics() {
        const url = `http://localhost:3001/getBasics/${match.params.ip}`;
        const response = await fetch(url);
        const data = await response.json();
        setBasicValues(data);
    }

    useEffect(() => {
        let i = -1;
        setBasicContainers(
            basicValues.map((element) => {
                i++;
                return (
                    <InformationContent
                        src={images[i]}
                        name={element.name}
                        value={element.value}
                        oid={element.oid}
                        key={element.oid}
                    />
                );
            })
        );
    }, [basicValues]);

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
            <div className="informationContainers">{basicContainers}</div>
            <div className="middleContainer">
                <MainInput />
                <IpInput
                    buttonTitle="Change"
                    title="Change IP"
                    ip={match.params.ip}
                />
            </div>

            <ReplyTable />
        </div>
    );
}
