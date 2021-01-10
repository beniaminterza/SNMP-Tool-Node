import React, { useState, useEffect } from "react";
import SideBar from "./Compontents/Sidebar";
import Home from "./Compontents/Home";
import GetWalkSet from "./Compontents/GetWalkSet";
import GetWalkSetIp from "./Compontents/GetWalkSetIp";
import ScanNetwork from "./Compontents/ScanNetwork";
import ErrorLeiste from "./Compontents/ErrorLeiste";
import "./Style/Basic.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App({ match }) {
    const [url, setUrl] = useState(window.location.pathname); //for the navigation color
    const [tableContent, setTableContent] = useState([]);
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        if (url.includes("/getWalkSet/")) setUrl("/getWalkSet");
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
                    <Route path="/" exact component={Home} />
                    <Route path="/getWalkSet" exact>
                        <GetWalkSet setUrl={setUrl} />
                    </Route>
                    <Route path="/getWalkSet/:ip" component={GetWalkSetIp} />
                    <Route path="/scanNetwork">
                        <ScanNetwork
                            tableContent={tableContent}
                            setTableContent={setTableContent}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
