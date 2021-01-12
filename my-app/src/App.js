import React, { useState, useEffect } from "react";
import SideBar from "./Compontents/Sidebar";
import Home from "./Compontents/Home";
import Setting from "./Compontents/Setting";
import GetSubtreeSet from "./Compontents/GetSubtreeSet";
import GetSubtreeSetIp from "./Compontents/GetSubtreeSetIp";
import ScanNetwork from "./Compontents/ScanNetwork";
import ErrorLeiste from "./Compontents/ErrorLeiste";
import Traps from "./Compontents/Traps";
import "./Style/Basic.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App({ match }) {
    const [url, setUrl] = useState(window.location.pathname); //for the navigation color
    const [tableContent, setTableContent] = useState([]);
    const [available, setAvailable] = useState(false);
    const [timeout, setTimeouts] = useState("1000");

    useEffect(() => {
        if (url.includes("/getSubtreeSet/")) setUrl("/getSubtreeSet");
    }, [url]);

    return (
        <Router>
            <div className="app">
                <ErrorLeiste
                    available={available}
                    setAvailable={setAvailable}
                />
                <SideBar
                    url={url}
                    setUrl={setUrl}
                    available={available}
                    setAvailable={setAvailable}
                />
                <Switch>
                    <Route path="/SNMP-REACT-Client" exact component={Home} />
                    <Route path="/getSubtreeSet" exact>
                        <GetSubtreeSet setUrl={setUrl} />
                    </Route>
                    <Route
                        path="/getSubtreeSet/:ip"
                        component={GetSubtreeSetIp}
                    />
                    <Route path="/scanNetwork">
                        <ScanNetwork
                            tableContent={tableContent}
                            setTableContent={setTableContent}
                        />
                    </Route>
                    <Route path="/settings">
                        <Setting timeout={timeout} setTimeouts={setTimeouts} />
                    </Route>
                    <Route path="/traps">
                        <Traps available={available} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
