const apiUrl = "http://localhost:3000/informations/";
const loader = document.getElementById("hide-dots");

async function getData() {
    loader.setAttribute("id", "loading-dots");

    const input = document.getElementById("ipAddress");
    console.log(input.value);
    const response = await fetch(apiUrl + input.value);
    const data = await response.json();

    console.log(data);

    //if(document.getElementById("result").childNodes.length > 0)document.getElementById("result").removeChild();
    let node = document.getElementById("data");
    node.querySelectorAll("*").forEach((n) => n.remove());

    loader.setAttribute("id", "hide-dots");
    createOIDValueTable(data);
}

function createOIDValueTable(array) {
    let table = document.createElement("table");

    //Header of the table
    let header = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.innerHTML = "OID";
    header.appendChild(th1);
    let th2 = document.createElement("th");
    th2.innerHTML = "Value";
    header.appendChild(th2);
    table.appendChild(header);

    for (let i = 0; i < array.length; i++) {
        let row = document.createElement("tr");
        let th1 = document.createElement("td");
        th1.innerHTML = array[i].oid;
        row.appendChild(th1);
        let th2 = document.createElement("td");
        th2.innerHTML = array[i].value;
        row.appendChild(th2);
        table.appendChild(row);
    }
    document.getElementById("data").appendChild(table);
}

function openGithub() {
    window.open("https://github.com/beniaminterza/SNMP-Tool-Node", "_blank");
}

async function scanNetwork() {
    loader.setAttribute("id", "loading-dots");

    const ip = document.getElementById("ipAddress").value;
    const mask = document.getElementById("subnet").value;
    console.log(ip);
    console.log(mask);
    const response = await fetch(
        `http://localhost:3000/scanNetwork/${ip}/${mask}`
    );
    const data = await response.json();

    console.log(data);

    let node = document.getElementById("data");
    console.log(node);
    if (node != null) node.querySelectorAll("*").forEach((n) => n.remove());

    loader.setAttribute("id", "hide-dots");
    createAvailableDevicesTable(data);
}

function createAvailableDevicesTable(array) {
    let table = document.createElement("table");

    //Header of the table
    let header = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.innerHTML = "IP Address";
    header.appendChild(th1);
    table.appendChild(header);

    for (let i = 0; i < array.length; i++) {
        let row = document.createElement("tr");
        let th1 = document.createElement("td");
        th1.innerHTML = array[i].ip;
        row.appendChild(th1);
        table.appendChild(row);
    }
    document.getElementById("data").appendChild(table);
}
