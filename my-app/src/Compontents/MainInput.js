import React, { useState, useEffect } from "react";
import ReplyTableElement from "./ReplyTableElement";
import getIcon from "../Images/get-icon.svg";
import treeIcon from "../Images/tree-icon.svg";
import setIcon from "../Images/set-icon.svg";

export default function MainInput({
    ip,
    tableContent,
    setTableContent,
    fetchBasics,
}) {
    const [oidInput, setOidInput] = useState("");
    const [oidChange, setOidChange] = useState(false);
    const [valueInput, setValueInput] = useState("");
    const [valueChange, setValueChange] = useState(false);
    const [communityInput, setCommunityInput] = useState("public");

    function oidInputHandler(e) {
        setOidChange(true);
        setOidInput(e.target.value);
    }

    useEffect(() => {
        if (oidChange) saveOIDToLocalStorage();
    }, [oidInput]);

    function valueInputHandler(e) {
        setValueChange(true);
        setValueInput(e.target.value);
    }

    useEffect(() => {
        if (valueChange) saveValueToLocalStorage();
    }, [valueInput]);

    function communityInputHandler(e) {
        setCommunityInput(e.target.value);
    }

    async function get() {
        const url = `http://localhost:3001/get/${ip}/${oidInput}/${communityInput}`;
        const response = await fetch(url);
        const data = await response.json();
        setTableContent([
            <ReplyTableElement
                ip={ip}
                oid={data.oid}
                type="GET"
                value={data.value}
                key={Math.random() * 10000}
            />,
            ...tableContent,
        ]);
        console.log(data);
    }

    async function subtree() {
        const url = `http://localhost:3001/subtree/${ip}/${oidInput}/${communityInput}`;
        const response = await fetch(url);
        const data = await response.json();
        setTableContent([
            data.map((element) => {
                return (
                    <ReplyTableElement
                        ip={ip}
                        oid={element.oid}
                        type="SUBTREE"
                        value={element.value}
                        key={Math.random() * 10000}
                    />
                );
            }),
            ...tableContent,
        ]);
        console.log(data);
    }

    async function set() {
        const url = `http://localhost:3001/set/${ip}/${oidInput}/${valueInput}/${communityInput}`;
        const response = await fetch(url);
        const data = await response.json();
        setTableContent([
            <ReplyTableElement
                ip={ip}
                oid={data.oid}
                type="SET"
                value={`Status: ${data.status}`}
                key={Math.random() * 10000}
            />,
            ...tableContent,
        ]);
        console.log(data);
        fetchBasics();
    }

    useEffect(() => {
        loadLocalStorage();
    }, []);

    function saveOIDToLocalStorage() {
        localStorage.setItem("OID", oidInput);
    }

    function saveValueToLocalStorage() {
        localStorage.setItem("Value", valueInput);
    }

    function loadLocalStorage() {
        if (localStorage.getItem("OID") !== "undefined") {
            setOidInput(localStorage.getItem("OID"));
        }
        if (localStorage.getItem("Value") !== "undefined") {
            setValueInput(localStorage.getItem("Value"));
        }
    }

    return (
        <div className="contentContainer mainInput">
            <div className="inputs">
                <div className="inputContainer">
                    <h3>OID</h3>
                    <input
                        type="text"
                        value={oidInput}
                        onChange={oidInputHandler}
                        placeholder="ex. 1.3.6.1.2.1.1.5.0"
                    />
                </div>

                <div className="inputContainer">
                    <h3>Value</h3>
                    <input
                        type="text"
                        value={valueInput}
                        onChange={valueInputHandler}
                        placeholder="ex. Router 5550"
                    />
                </div>

                <div className="inputContainer community">
                    <h3>Community</h3>
                    <input
                        type={communityInput === "public" ? "text" : "password"}
                        value={communityInput}
                        onChange={communityInputHandler}
                    />
                </div>
            </div>
            <div className="iconButtons">
                <div className="iconButton">
                    <img src={getIcon} alt="get" onClick={get} />
                </div>
                <div className="iconButton">
                    <img src={treeIcon} alt="walk" onClick={subtree} />
                </div>
                <div className="iconButton">
                    <img src={setIcon} alt="set" onClick={set} />
                </div>
            </div>
        </div>
    );
}
