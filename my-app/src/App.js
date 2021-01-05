import React, { useState, useEffect } from "react";
import SideBar from "./Compontents/Sidebar";
import Home from "./Compontents/Home";
import GetWalkSet from "./Compontents/GetWalkSet";
import GetWalkSetIp from "./Compontents/GetWalkSetIp";
import "./Style/Basic.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App({ match }) {
    const [url, setUrl] = useState(window.location.pathname); //for the navigation color

    useEffect(() => {
        if (url.includes("/getWalkSet/")) setUrl("/getWalkSet");
    }, [url]);

    return (
        <Router>
            <div className="app">
                <SideBar url={url} setUrl={setUrl} />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/getWalkSet" exact >
                        <GetWalkSet setUrl={setUrl}/>
                    </Route>
                    <Route
                        path="/getWalkSet/:ip"
                        component={GetWalkSetIp}
                    ></Route>
                </Switch>
            </div>
        </Router>
    );
}
