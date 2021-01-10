import React, { useEffect, useState } from "react";
import SidebarElem from "./SidebarElem";
import "../Style/SideBar.css";

import logo from "../Images/LOGO.png";
import home from "../Images/home-solid.svg";
import walk from "../Images/walking-solid.svg";
import radar from "../Images/radar.svg";
import upload from "../Images/file-upload-solid.svg";
import cog from "../Images/cog-solid.svg";
import check from "../Images/check-solid.svg";
import wrong from "../Images/wrong-solid.svg";

export default function Sidebar({ url, setUrl, available, setAvailable, match }) {

    useEffect(() => {
        fetchData();

        setInterval(() => {
            fetchData();
        }, 1000);
    }, []);

    function fetchData() {
        fetch(`http://localhost:3001/check`)
            .then((response) => response.json())
            .then((data) => {
                if (data) setAvailable(true);
            })
            .catch((err) => {
                setAvailable(false);
                console.log(err);
            });
    }

    return (
        <div className="sidebar">
            <div className="logoContainer">
                <img src={logo} alt="snmp web logo" className="logo" />
            </div>
            <SidebarElem
                link={"/"}
                img={home}
                title="Home"
                alt="home"
                url={url}
                setUrl={setUrl}
            />
            <SidebarElem
                link={"/getSubtreeSet"}
                img={walk}
                title="Get, Set, Subtree"
                alt="Person"
                url={url}
                setUrl={setUrl}
            />
            <SidebarElem
                link={"/scanNetwork"}
                img={radar}
                title="Scan Network"
                alt="Radar"
                url={url}
                setUrl={setUrl}
            />
            <SidebarElem
                link={"/loadMib"}
                img={upload}
                title="Load MIB"
                alt="Upload"
                url={url}
                setUrl={setUrl}
            />
            <SidebarElem
                link={"/settings"}
                img={cog}
                title="Setting"
                alt="Cog"
                url={url}
                setUrl={setUrl}
            />

            <div className="connection sidebarElement">
                <h4>Connection</h4>
                <div className="imgContainer">
                    {available ? (
                        <img src={check} alt="ok" />
                    ) : (
                        <img src={wrong} alt="ok" />
                    )}
                </div>
            </div>
        </div>
    );
}
