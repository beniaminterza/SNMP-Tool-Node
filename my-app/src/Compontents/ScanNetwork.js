import React, { useState } from "react";
import NetworkInput from "./NetworkInput";
import ScanNetworkTable from "./ScanNetworkTable";
import ScanNetworkTableElement from "./ScanNetworkTableElement";

export default function ScanNetwork() {
    const [tableContent, setTableContent] = useState([]);
    const [input, setInput] = useState("");
    const [key, setKey] = useState(-1);
    const [loading, setLoading] = useState(false);

    async function fetchData() {
        const url = `http://localhost:3001/scanNetwork/${input}/24`;
        const response = await fetch(url);
        const data = await response.json();

        setTableContent(
            data.map((element) => {
                setKey(key + 1);
                return (
                    <ScanNetworkTableElement
                        ip={element.host}
                        network={element.network}
                        snmp="true"
                        key={key}
                    />
                );
            })
        );
        setLoading(false);
    }

    return (
        <div className="main">
            <h1>Scan Network</h1>
            <NetworkInput
                input={input}
                setInput={setInput}
                fetchData={fetchData}
                setLoading={setLoading}
            />
            <ScanNetworkTable tableContent={tableContent} loading={loading} />
        </div>
    );
}
