import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ScanNetworkTableElement({ ip, network}) {
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
                    {reachable ? (
                        <Link to={`/getSubtreeSet/${ip}`}  >
                            <p>{ip}</p>
                        </Link>
                    ) : (
                        <p>{ip}</p>
                    )}
                </td>
                <td>
                    {reachable ? (
                        <Link to={`/getSubtreeSet/${ip}`}>
                            <p>{network}</p>
                        </Link>
                    ) : (
                        <p>{network}</p>
                    )}
                </td>
                <td>
                    {reachable ? (
                        <Link to={`/getSubtreeSet/${ip}`}>
                            <p>{`${reachable}`}</p>
                        </Link>
                    ) : (
                        <p>{`${reachable}`}</p>
                    )}
                </td>
            </tr>
        </tbody>
    );
}
