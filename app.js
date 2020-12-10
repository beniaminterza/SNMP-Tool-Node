const express = require("express");
const { fstat } = require("fs");
const app = express();
const port = 3000;
const snmp = require("net-snmp");

//API fürs überprüfen ob bei einer IP Adresse SNMP eingeschaltet ist
app.get("/checkIP/:ip", function (req, res) {
    checkSnmpApi(req.params.ip, res);
});

//API fürs überprüfen ob bei einer IP Adresse SNMP eingeschaltet ist
app.get("/scanNetwork/:ip/:mask", function (req, res) {
    checkNetwork(req.params.ip, req.params.mask, res);
});

//API für alle SNMP Informationen von einer IP Adresse
app.get("/allInformations/:ip/", function (req, res) {
    allInformations(req.params.ip, res);
});

//6 OIDS mit Werten bekommen
app.get("/informations/:ip/", function (req, res) {
    getBasicInformations(req.params.ip, res);
});

function checkSnmpApi(ip, res) {
    let session = snmp.createSession(ip, "public");
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

        function checkSnmpForNetwork(ip, res) {
            let session = snmp.createSession(ip, "public");

            var oid = "0.0.0.0.0.0";
            let counter = 0;

            function doneCb(error) {
                //wenn die funtion fertig ist soll es
                if (counter === 0) console.log(`IP: ${ip} false`);
                else {
                    console.log(`IP: ${ip} true`);
                    allSnmpIp.push({ ip: ip, status: true });
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
            checkSnmpForNetwork(newIp);
        }
        setTimeout(() => {
            res.json(allSnmpIp);
        }, 1000);
    }
}

function allInformations(ip, res) {
    let session = snmp.createSession(ip, "public");
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

function containsNonLatinCodepoints(s) {
    return /[^\u0000-\u00ff]/.test(s);
}

function getAllInformation(ip) {
    let session = snmp.createSession(ip, "public");

    var oid = "0.0.0.0.0.0";

    function doneCb(error) {
        if (error) console.error(error.toString());
    }

    function feedCb(varbinds) {
        for (var i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError(varbinds[i])) {
                console.error(snmp.varbindError(varbinds[i]));
            } else if (
                !containsNonLatinCodepoints(varbinds[i].value) &&
                varbinds[i].value.length > 5
            ) {
                console.log(varbinds[i].oid + "|" + varbinds[i].value);
            }
        }
    }

    var maxRepetitions = 20;

    // The maxRepetitions argument is optional, and will be ignored unless using
    // SNMP verison 2c
    session.walk(oid, maxRepetitions, feedCb, doneCb);
}

function getBasicInformations(ip, res) {
    let session = snmp.createSession(ip, "public");

    let oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0", "1.3.6.1.2.1.1.4.0", "1.3.6.1.2.1.1.1.0", "1.3.6.1.2.1.1.3.0", "1.3.6.1.2.1.2.2.1.2.1"];

    let data = [];
    session.get(oids, function (error, varbinds) {
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
                    data.push({ oid: varbinds[i].oid, value: value });
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

//getAllInformation("127.0.0.1");

app.listen(port, () => console.log(`app listening on port ${port}!`));

// const fs = require("fs");
// const http = require("http");

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     fs.readFile("frontend/index.html", (error, data) => {
//         if (error) {
//             res.writeHead(404);
//             res.write("Error: File Not Found");
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// });

// server.listen(3001, () => console.log(`app listening on port ${port}!`));
