import React, { useEffect, useState } from "react";

export default function ScanNetworkTableElement({ ip, network, snmp }) {
    const [reachable, setReachable] = useState(false);

    useEffect(() => checkSnmp(), []);

    async function checkSnmp() {
        const url = `http://localhost:3001/checkIP/${ip}`;
        const response = await fetch(url);
        const data = await response.json();
        setReachable(data.snmp);
    }

    return (
        <tbody className={`${reachable}`}>
            <tr>
                <td>
                    <p>{ip}</p>
                </td>
                <td>
                    <p>{network}</p>
                </td>
                <td>
                    <p>{`${reachable}`}</p>
                </td>
            </tr>
        </tbody>
    );
}
