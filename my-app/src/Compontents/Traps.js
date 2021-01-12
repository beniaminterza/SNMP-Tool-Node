import React, { useEffect, useState } from "react";
import TrapsTable from "../Compontents/TrapsTable";
import TrapsTableElement from "../Compontents/TrapsTableElement";

export default function Traps({ available }) {
    const [tableContent, setTableContent] = useState([]);

    useEffect(() => {
        fetchData();
    }, [tableContent]);

    useEffect(() => {
        if (available) {
            fetchData();
        }
    }, [available]);

    async function fetchData() {
        console.log("waiting");
        const url = `http://localhost:3002/traps`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.varbinds);
        setTableContent([
            data.varbinds.map((element) => {
                return (
                    <TrapsTableElement
                        ip={data.ip}
                        oid={element.oid}
                        value={element.value}
                        key={Math.random() * 1000}
                    />
                );
            }),
            ...tableContent,
        ]);
    }

    return (
        <div className="main">
            <h1>Traps</h1>
            <TrapsTable tableContent={tableContent} />
        </div>
    );
}
