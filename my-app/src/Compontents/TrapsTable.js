import React from "react";

export default function TrapsTable({ tableContent }) {
    return (
        <div className="contentContainer table networkTable">
            <h3>Traps</h3>
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
                            <p>Value</p>
                        </th>
                    </tr>
                </thead>
                {tableContent}
            </table>
        </div>
    );
}
