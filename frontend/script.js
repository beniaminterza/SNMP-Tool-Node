const loader = document.getElementById("hide-dots");

async function getApiData(apiUrl) {
    loader.setAttribute("id", "loading-dots"); //add laoding anim

    const response = await fetch(apiUrl);
    const data = await response.json();

    let node = document.getElementById("data");
    node.querySelectorAll("*").forEach((n) => n.remove()); //remove old data

    loader.setAttribute("id", "hide-dots"); //remove laoding anim
    console.log(data);
    return data;
}

async function getBasics() {
    const ip = document.getElementById("ipAddress").value;
    let data = await getApiData(`http://localhost:3000/getBasics/${ip}`);
    createOIDValueTable(data);
}

async function getAll() {
    const ip = document.getElementById("ipAddress").value;
    let data = await getApiData(`http://localhost:3000/getAll/${ip}`);
    createOIDValueTable(data);
}

async function get() {
    const ip = document.getElementById("ipAddress").value;
    const oid = document.getElementById("oid").value;
    let data = await getApiData(`http://localhost:3000/get/${ip}/${oid}`);
    createOIDValueTableWithoutArray(data);
}

function createOIDValueTableWithoutArray(data) {
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

    //insert the data
    let row = document.createElement("tr");
    let th3 = document.createElement("td");
    th3.innerHTML = data.oid;
    row.appendChild(th3);
    let th4 = document.createElement("td");
    th4.innerHTML = data.value;
    row.appendChild(th4);
    table.appendChild(row);

    document.getElementById("data").appendChild(table);
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

    //insert all the data
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
    const ip = document.getElementById("ipAddress").value;
    const mask = document.getElementById("subnet").value;

    let data = await getApiData(
        `http://localhost:3000/scanNetwork/${ip}/${mask}`
    );

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
