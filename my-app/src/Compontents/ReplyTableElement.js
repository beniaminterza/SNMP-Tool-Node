import React from "react";

export default function ReplyTableElement({ ip, oid, type, value }) {
    return (
        <tbody className={type.toLowerCase()}>
            <tr >
                <td>
                    <p>{ip}</p>
                </td>
                <td>
                    <p>{oid}</p>
                </td>
                <td>
                    <p>{type}</p>
                </td>
                <td>
                    <p>{value}</p>
                </td>
            </tr>
        </tbody>
    );
}
