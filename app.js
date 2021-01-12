const express = require("express");
let cors = require("cors");
const app = express();
const port = 3001;
const snmp = require("net-snmp");
let ping = require("ping");

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//Optionen für die SNMP sessions
let options = {
    port: 161,
    retries: 1,
    timeout: 1000,
    backoff: 1.0,
    transport: "udp4",
    trapPort: 162,
    version: snmp.Version2,
    backwardsGetNexts: true,
    idBitsSize: 32,
};

app.use(cors(corsOptions));

app.get("/check", function (req, res) {
    res.json(true);
});

//API fürs überprüfen ob bei einer IP Adresse SNMP eingeschaltet ist
app.get("/checkIP/:ip", function (req, res) {
    checkSnmpApi(req.params.ip, res);
});

//API fürs überprüfen ob bei einer IP Adresse SNMP eingeschaltet ist
app.get("/scanNetwork/:ip/:mask", function (req, res) {
    pingNetwork(req.params.ip, req.params.mask, res);
});

//6 OIDS mit deren values bekommen
app.get("/getBasics/:ip", function (req, res) {
    getBasicInformations(req.params.ip, res);
});

//value von einer spezifischen oid bekommen
app.get("/get/:ip/:oid/:community", function (req, res) {
    get(req.params.ip, req.params.oid, req.params.community, res);
});

//set
app.get("/set/:ip/:oid/:value/:community", function (req, res) {
    set(
        req.params.ip,
        req.params.oid,
        req.params.value,
        req.params.community,
        res
    );
});

app.get("/subtree/:ip/:oid/:community", function (req, res) {
    subtree(req.params.ip, req.params.oid, req.params.community, res);
});

app.get("/traps", function (req, res) {
    trap(res);
});

//timeout verändern
app.get("/setTimeout/:timeout", function (req, res) {
    console.log("asepp " + req.params);
    options = {
        port: 161,
        retries: 1,
        timeout: req.params.timeout,
        backoff: 1.0,
        transport: "udp4",
        trapPort: 162,
        version: snmp.Version2,
        backwardsGetNexts: true,
        idBitsSize: 32,
    };
    console.log("JOP SEP");
    console.log(options);
    res.json("OK");
});

function checkSnmpApi(ip, res) {
    let session = snmp.createSession(ip, "public", options);
    console.log(ip);

    var oid = "0.0.0.0.0.0";

    let counter = 0;

    function doneCb(error) {
        //wenn die funtion fertig ist soll es
        if (counter === 0) res.json({ snmp: false });
        else res.json({ snmp: true });
        if (error) console.error(error.toString());
    }

    function feedCb(varbinds) {
        for (let i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError(varbinds[i]))
                console.error(snmp.varbindError(varbinds[i]));
            else {
                counter += 1;
                console.log("true");
                return true;
            }
        }
        console.log("false");
        return false;
    }

    let maxRepetitions = 20;
    session.walk(oid, maxRepetitions, feedCb, doneCb); //walk ausführen
}

function subtree(ip, oid, comm, res) {
    let session = snmp.createSession(ip, comm, options);

    let informations = [];
    function doneCb(error) {
        res.json(informations);
        if (error) console.error(error.toString());
    }

    function feedCb(varbinds) {
        for (let i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError(varbinds[i]))
                console.error(snmp.varbindError(varbinds[i]));
            else {
                let value = varbinds[i].value;
                if (varbinds[i].value instanceof Buffer) {
                    value = varbinds[i].value.toString();
                }
                informations.push({ oid: varbinds[i].oid, value: value });
            }
        }
    }

    let maxRepetitions = 20;

    // The maxRepetitions argument is optional, and will be ignored unless using
    // SNMP verison 2c
    session.subtree(oid, maxRepetitions, feedCb, doneCb);
}

function pingNetwork(ip, mask, res) {
    let hosts = [];

    let subnet = getSubnet(ip);
    console.log("Subnet" + subnet);
    for (let i = 0; i < 256; i++) {
        hosts.push(subnet + i);
    }

    let alive = [];
    let counter = 0;

    hosts.forEach(function (host) {
        ping.sys.probe(host, function (isAlive) {
            counter++;

            if (isAlive) {
                let obj = { host: host, network: `${ip}/${mask}` };
                console.log(obj);
                alive.push(obj);
            }

            if (counter === 255) {
                //array sortieren
                alive.sort((a, b) => {
                    const num1 = Number(
                        a.host
                            .split(".")
                            .map((num) => `000${num}`.slice(-3))
                            .join("")
                    );
                    const num2 = Number(
                        b.host
                            .split(".")
                            .map((num) => `000${num}`.slice(-3))
                            .join("")
                    );
                    return num1 - num2;
                });
                console.log("ruve");
                console.log(alive);
                res.json(alive);
            }
        });
    });
}

function getSubnet(ip) {
    for (let i = ip.length - 1; i >= 0; i--) {
        if (ip[i] === ".") {
            console.log(ip.substring(0, i + 1));
            return ip.substring(0, i + 1);
        }
    }
}

function getBasicInformations(ip, res) {
    let session = snmp.createSession(ip, "public", options);

    let oids = [
        "1.3.6.1.2.1.1.5.0",
        "1.3.6.1.2.1.1.6.0",
        "1.3.6.1.2.1.1.4.0",
        "1.3.6.1.2.1.1.1.0",
        "1.3.6.1.2.1.1.3.0",
        "1.3.6.1.2.1.1.2.0",
    ];

    let names = [
        "sysName",
        "sysLocation",
        "sysContact",
        "sysDescription",
        "sysUptime",
        "sysObjectID",
    ];

    let data = [];
    session.get(oids, function (error, varbinds) {
        let index = 0;

        if (error) {
            console.error(error);
        } else {
            for (let i = 0; i < varbinds.length; i++) {
                if (snmp.isVarbindError(varbinds[i]))
                    console.error(snmp.varbindError(varbinds[i]));
                else {
                    console.log(varbinds[i].oid + " = " + varbinds[i].value);
                    let value = varbinds[i].value;
                    if (varbinds[i].value instanceof Buffer) {
                        value = varbinds[i].value.toString();
                    }

                    data.push({
                        oid: varbinds[i].oid,
                        value: value,
                        name: names[i],
                    });
                    index++;
                }
            }
        }
        res.json(data);
        session.close();
    });

    session.trap(snmp.TrapType.LinkDown, function (error) {
        if (error) console.error(error);
    });
}

function get(ip, oid, comm, res) {
    let session = snmp.createSession(ip, comm, options);

    let oids = [oid];

    session.get(oids, function (error, varbinds) {
        if (error) {
            console.error(error);
            res.json({ status: "error", value: "Request timed out" });
        } else {
            for (var i = 0; i < varbinds.length; i++)
                if (snmp.isVarbindError(varbinds[i])) {
                    console.error(snmp.varbindError(varbinds[i]));
                    res.json({ status: "error" });
                } else {
                    let value = varbinds[i].value;
                    if (varbinds[i].value instanceof Buffer) {
                        value = varbinds[i].value.toString();
                    }
                    res.json({
                        ip: ip,
                        oid: oid,
                        value: value,
                        status: "ok",
                    });
                }
        }
        session.close();
    });
}

function set(ip, oid, value, comm, res) {
    let varbinds = [
        {
            oid: oid,
            type: snmp.ObjectType.OctetString,
            value: value,
        },
    ];

    let session = snmp.createSession(ip, comm, options);

    session.set(varbinds, function (error, varbinds) {
        if (error) {
            res.json({ status: "error", oid: oid });
            console.error(error.toString());
        } else {
            for (var i = 0; i < varbinds.length; i++) {
                // for version 1 we can assume all OIDs were successful
                console.log(varbinds[i].oid + "|" + varbinds[i].value);

                // for version 2c we must check each OID for an error condition
                if (snmp.isVarbindError(varbinds[i]))
                    console.error(snmp.varbindError(varbinds[i]));
                else console.log(varbinds[i].oid + "|" + varbinds[i].value);

                res.json({ status: "success", oid: oid });
            }
        }
    });
}

function trap(res) {
    var options = {
        port: 162,
        disableAuthorization: true,
        accessControlModelType: snmp.AccessControlModelType.None,
        engineID: "8000B98380XXXXXXXXXXXX", // where the X's are random hex digits
        address: null,
        transport: "udp4",
    };

    var callback = function (error, notification) {
        if (error) {
            console.error(error);
        } else {
            console.log(notification);

            let varbinds = notification.pdu.varbinds;

            for (let i = 0; i < varbinds.length; i++) {
                let value = varbinds[i].value;
                if (varbinds[i].value instanceof Buffer) {
                    value = varbinds[i].value.toString();
                }
                varbinds[i].value = value;
                console.log(value);
            }
            let data = { varbinds: varbinds, ip: notification.rinfo.address };
            console.log("gott it");
            res.json(data);
            receiver.close();
        }
    };

    receiver = snmp.createReceiver(options, callback);
}

app.listen(port, () => console.log(`app listening on port ${port}!`));
app.listen(3002, () => console.log(`app listening on port ${port}!`));
