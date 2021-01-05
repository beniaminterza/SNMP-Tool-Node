import React from "react";
import SidebarElem from "./SidebarElem";
import "../Style/SideBar.css";

import logo from "../Images/LOGO.png";
import home from "../Images/home-solid.svg";
import walk from "../Images/walking-solid.svg";
import radar from "../Images/radar.svg";
import upload from "../Images/file-upload-solid.svg";
import cog from "../Images/cog-solid.svg";

export default function Sidebar({ url, setUrl }) {
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
                link={"/getWalkSet"}
                img={walk}
                title="Get, Set, Walk"
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
        </div>
    );
}
