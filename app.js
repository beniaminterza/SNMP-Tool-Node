const express = require("express");
const { fstat } = require("fs");
let cors = require("cors");
const app = express();
const port = 3001;
const snmp = require("net-snmp");

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//Optionen für die SNMP sessions
const options = {
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

//API fürs überprüfen ob bei einer IP Adresse SNMP eingeschaltet ist
app.get("/checkIP/:ip", function (req, res) {
    checkSnmpApi(req.params.ip, res);
});

//API fürs überprüfen ob bei einer IP Adresse SNMP eingeschaltet ist
app.get("/scanNetwork/:ip/:mask", function (req, res) {
    checkNetwork(req.params.ip, req.params.mask, res);
});

//API für alle SNMP Informationen von einer IP Adresse
app.get("/getAll/:ip/", function (req, res) {
    allInformations(req.params.ip, res);
});

//6 OIDS mit deren values bekommen
app.get("/getBasics/:ip/", function (req, res) {
    getBasicInformations(req.params.ip, res);
});

//value von einer spezifischen oid bekommen
app.get("/get/:ip/:oid", function (req, res) {
    get(req.params.ip, req.params.oid, res);
});

app.get("/getMib", function (req, res) {
    mib(res);
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

function checkNetwork(ip, mask, res) {
    //bis jetzt nur mit einen Klasse C Netz möglich
    if (validateIPaddress(ip) && validateMask(parseInt(mask))) {
        let subnet = getSubnet(ip);

        let allSnmpIp = [];

        function checkSnmpForNetwork(ip, pos) {
            let session = snmp.createSession(ip, "public", options);

            var oid = "0.0.0.0.0.0";
            let counter = 0;

            function doneCb(error) {
                //wenn die funtion fertig ist soll es
                if (counter === 0) console.log(`IP: ${ip} false`);
                else {
                    console.log(`IP: ${ip} true`);
                    allSnmpIp.push({ ip: ip, status: true, pos: pos });
                }
            }

            function feedCb(varbinds) {
                for (let i = 0; i < varbinds.length; i++) {
                    if (snmp.isVarbindError(varbinds[i]))
                        console.error(snmp.varbindError(varbinds[i]));
                    else {
                        counter += 1;
                        return true;
                    }
                }
                return false;
            }

            let maxRepetitions = 20;
            session.walk(oid, maxRepetitions, feedCb, doneCb); //walk ausführen
        }

        for (let i = 0; i < 256; i++) {
            //hosts generiren
            let newIp = subnet + i;
            console.log(newIp);
            checkSnmpForNetwork(newIp, i);
        }
        setTimeout(() => {
            allSnmpIp.sort((a, b) =>
                a.pos > b.pos ? 1 : b.pos > a.pos ? -1 : 0
            );

            res.json(allSnmpIp);
        }, 1000);
    }
}

function allInformations(ip, res) {
    let session = snmp.createSession(ip, "public", options);
    let oid = "0.0.0.0";

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
    session.walk(oid, maxRepetitions, feedCb, doneCb);
}

function getSubnet(ip) {
    for (let i = ip.length - 1; i >= 0; i--) {
        if (ip[i] === ".") {
            console.log(ip.substring(0, i + 1));
            return ip.substring(0, i + 1);
        }
    }
}

function validateIPaddress(ipaddress) {
    if (
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            ipaddress
        )
    ) {
        return true;
    }
    return false;
}

function validateMask(mask) {
    if (mask === 0 || mask === 8 || mask === 16 || mask === 24) return true;
    return false;
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

function get(ip, oid, res) {
    let session = snmp.createSession(ip, "public", options);

    let oids = [oid];

    session.get(oids, function (error, varbinds) {
        if (error) {
            console.error(error);
            res.json({ status: "error" });
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

function mib(res) {
    console.log("Hallo");
    let store = snmp.createModuleStore();
    store.loadFromFile(
        "C:\\Users\\Beniamin\\Documents\\WebDevelopment\\SNMP2\\Mikrotik.mib"
    );

    let providers = store.getModules(false);

    let jsonData = JSON.stringify(providers);
    let fs = require("fs");
    fs.writeFile("prividers.txt", jsonData, function (err) {
        if (err) {
            console.log(err);
        }
    });

    res.json(providers);
}

app.listen(port, () => console.log(`app listening on port ${port}!`));
