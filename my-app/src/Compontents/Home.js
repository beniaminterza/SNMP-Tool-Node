import React from "react";
import "../Style/Home.css";
import Button from "./ButtonA";
import ExploreContent from "./ExploreContent";
import globe from "../Images/globe-solid.svg";
import walk from "../Images/walking-icon.svg";
import radar from "../Images/radar-icon.svg";
import upload from "../Images/upload-icon.svg";
import cog from "../Images/cog-icon.svg";


export default function Home() {
    return (
        <div className="main">
            <h1>Home</h1>
            <div className="container">
                <div className="presentation contentContainer">
                    <h3>SNMP Web</h3>
                    <p>a simple and free monitoring tool</p>
                    <div className="left">
                        <img src={globe} alt="Globe" />
                        <div className="downloadContainer">
                            <p>Download the "SNMP WEB Server" here</p>
                            <Button title="Download" link="https://github.com/beniaminterza/SNMP-Tool-Node" />
                        </div>
                    </div>
                </div>
                <h2>Functionality</h2>
                <div className="exploreContainers">
                    <ExploreContent
                        src={walk}
                        title="Get, Set and Walk"
                        description="Do a subtree or a get or a set with any IP Address and 
                        any OID "
                        index="e1"
                        link="/getSubtreeSet"
                    />
                    <ExploreContent
                        src={radar}
                        title="Scan Network"
                        description="Scan a network to see all the devices that use SNMP"
                        index="e2"
                        link=""
                    />
                    <ExploreContent
                        src={upload}
                        title="Load MIB"
                        description="Upload a MIB and choose the OIDs that you would
                        like to get"
                        index="e3"
                        link=""
                    />
                    <ExploreContent
                        src={cog}
                        title="Settings"
                        description="Change settings so that they fit to your preferences"
                        index="e4"
                        link=""
                    />
                </div>
            </div>
        </div>
    );
}
