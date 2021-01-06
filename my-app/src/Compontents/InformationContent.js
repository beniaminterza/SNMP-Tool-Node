import React, { useEffect, useState } from "react";

export default function InformationContent(props) {
    const [value, setValue] = useState();

    useEffect(() => {
        if (props.name === "sysUptime") {
            setValue(msToTime(props.value * 10));
        } else {
            setValue(props.value);
        }
    }, []);

    function msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return `${hrs}h ${mins}m ${secs}s ${ms}ms`
    }

    return (
        <div className="informationsContent contentContainer">
            <img src={props.src} alt={props.alt} />
            <div className="description">
                <h3>{props.name}</h3>
                <p>{value}</p>
                <div className="oid">{props.oid}</div>
            </div>
        </div>
    );
}
