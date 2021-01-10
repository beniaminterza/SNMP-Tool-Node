import React from "react";

export default function ScanNetworkTable({ tableContent, loading }) {
    return (
        <div className="contentContainer table networkTable">
            <h3>Devices</h3>
            <table>
                <thead>
                    <tr className="header">
                        <th>
                            <p>IP Address</p>
                        </th>
                        <th>
                            <p>Network</p>
                        </th>
                        <th>
                            <p>SNMP</p>
                        </th>
                    </tr>
                </thead>
                {tableContent}
            </table>
            {loading ? (
                <div className="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}
