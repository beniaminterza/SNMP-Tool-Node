import React from "react";

export default function ReplyTable({ tableContent }) {
    return (
        <div className="contentContainer table">
            <h3>Reply</h3>
            <table>
                <thead>
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
                </thead>
                {tableContent}
            </table>
        </div>
    );
}
