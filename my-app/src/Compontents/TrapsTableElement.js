import React from "react";

export default function TrapsTableElement({ ip, oid, value }) {
    return (
        <tbody className="trap">
            <tr>
                <td>
                    <p>{ip}</p>
                </td>
                <td>
                    <p>{oid}</p>
                </td>
                <td>
                    <p>{value}</p>
                </td>
            </tr>
        </tbody>
    );
}
