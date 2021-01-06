import React from "react";
import ReplyTableElement from "./ReplyTableElement";

export default function ReplyTable() {
    return (
        <div className="contentContainer table">
            <h3>Reply</h3>
            <table>
                <tr className="header">
                    <th>
                        <p>IP Address</p>
                    </th>
                    <th>
                        <p>OID</p>
                    </th>
                    <th>
                        <p>Type</p>
                    </th>
                    <th>
                        <p>Value</p>
                    </th>
                </tr>
                <ReplyTableElement
                    ip="1.1.1.3"
                    oid="1.1.1..2.2"
                    type="GET"
                    value="Ludwig"
                />
                <ReplyTableElement
                    ip="1.1.1.3"
                    oid="1.1.1..2.2"
                    type="GET"
                    value="Ludwig"
                />
                <ReplyTableElement
                    ip="1.1.1.3"
                    oid="1.1.1..2.2"
                    type="Set"
                    value="Ludwig"
                />
                <ReplyTableElement
                    ip="1.1.1.3"
                    oid="1.1.1..2.2"
                    type="Walk"
                    value="Ludwig"
                />
            </table>
        </div>
    );
}
