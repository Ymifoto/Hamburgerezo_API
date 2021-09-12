function getHamburgers() {

   return sendData(url,"get","hamburgerek").then(
       data => setHamburgersSelect(data),
       error => console.error(error)
       );

}

function getFeltetek() {

    return sendData(url,"get","feltetek").then(
        data => setFeltetSelect(data),
        error => console.error(error)
    );
 
}

 function getDeliveryCost() {

    return sendData(url,"get","szallitas").then(
        data => setGrandTotal(data),
        error => console.error(error)
        );
}

function setFeltetSelect(data) {
    
    let oszlopszam = 1;
    let feltetek = document.querySelector("div#feltetek");
    
    for (let rows of data) {    

        let oszlop = feltetek.querySelector(`div.col-4:nth-child(${oszlopszam})`);
        
        let div = createAnyElement("div", {
            class : "form-check"
        });

        let input = createAnyElement("input", {
            class: "form-check-input",
            type: "checkbox",
            value: rows["price"],
            id: rows["id"],
            name: rows["name"]
        });
        div.appendChild(input);

        let label = createAnyElement("label", {
            class: "form-check-label",
            id: rows["id"]
        });
        label.innerHTML = rows["name"];
        div.appendChild(label);
        oszlop.appendChild(div);

        oszlopszam == 3 ? oszlopszam = 1 : oszlopszam += 1;

    }
}

function setHamburgersSelect(data) {

    let select = document.querySelector("select");
    for (let rows of data) {    
             let option = createAnyElement("option", {
                value : rows["id"],
                name : rows["name"],
                price: rows["price"]
            });
            option.innerHTML = rows["name"] + " - " + rows["price"] + " Ft";
            select.appendChild(option); 
    }
}

function getSelectedHamburger() {

    let hamburger = document.querySelector("select.form-select").value;

    hamburger == "Válassz hamburgert" ? alert("Válasszon hamburget") : 
    sendData(url,'get','hamburgerek','{"id":"'+hamburger+'"}').then(data => getHamburgerData(data));
}

function getSelectedFeltetek() {

    let feltet = document.querySelectorAll("div#feltetek .form-check-input:checked");
    return feltet;
}

function getSelectedAmount() {

    let amount = document.querySelector("input[name=amount]").value;
    amount < 0 ? alert("Nem lehet negatív") : "";
    return amount;
}

function getHamburgerData(data) {

    let amount = getSelectedAmount();
    let feltetek = getSelectedFeltetek();
    let price = parseInt(data[0]["price"]);

    for (let v of feltetek) {
        data[0]["name"] += " + " + v.getAttribute("name");
        price += parseInt(v.value);
    }
    price = price * amount;

    let osszesites = {amount : amount, name: data[0]["name"], price : price};

    fillOrderTable(osszesites);
    getDeliveryCost();
    setOrderBtn();
}

function setHamburgerComment(){

    document.querySelector("#comment").value = "";
    document.querySelector(".form-select").value = "Válassz hamburgert"
}

function setUncheck() {
    for (let v of document.querySelectorAll("#feltetek .form-check-input")) {
        v.checked = false;
       }
    document.querySelector("#amountnumber").value = 1
}

function makeVisibleOrderTable() {
    let table = document.getElementById("rendelestabla");
    table.setAttribute("style", "display:table;")
}

function fillOrderTable(data) {

    makeVisibleOrderTable();
    let tbody = document.getElementById("osszesito");
    let tr = createAnyElement("tr");
 
    for (let v in data) {
        let td =  createAnyElement("td",{
            name : v
        });
        v == "price" ? (td.innerHTML = data[v] + " Ft", tr.appendChild(getHamburgerComment())) : td.innerHTML = data[v];
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
    setHamburgerComment();
    setUncheck();
}

function getGrandTotal() {

    let prices = document.getElementById("osszesito").querySelectorAll("td[name=price]");
    let total = 0;

    for (let v of prices) {
        total += parseInt(v.innerHTML);
    }
    return total;
}

function setGrandTotal(data) {

    total = getGrandTotal();
    
    let grandtotal = document.getElementById("ertek");
    let deliverycost = document.getElementById("deliverycost");
    total >= data[0]["treshold"] ? data[0]["cost"] = 0 : "";

    total = total + parseInt(data[0]["cost"]);

    deliverycost.innerHTML = data[0]["cost"] + " Ft";
    grandtotal.innerHTML = total + " Ft";
}

function getHamburgerComment() {

    let tdcomment = createAnyElement("td",{name : "comment"});
    tdcomment.innerHTML = document.querySelector("#comment").value;
    return tdcomment;
}

function setOrderBtn() {
    let orderbtn = document.querySelector("#orderbtn");
    orderbtn.setAttribute("style","display:block;text-align:center;");
}

function saveOrderData() {

    data = JSON.stringify(fullOrderData());
    sendData(url,"add","orders",data).then(response => pageReaload(response));
}

function getOrdererData() {

    let orderer = document.querySelectorAll("#orderer input");
    return orderer;
}

function getOrdererComment() {

    let orderercomment = document.querySelector("#orderer textarea").value;
    return orderercomment;
}

function getOrdererFullData() {

    let orderer = getOrdererData();
    let ordererdata = {};
    let keys = ["name","address","email"];
    let i = 0;

    for (let v of orderer) {
            ordererdata[keys[i]] = v.value;
            i++
    }
    return ordererdata;
}

function getOrderData() {

    let orderpieces = document.querySelectorAll("#osszesito tr");
    let orderdata = [];
    let i = 0;

    for (let v of orderpieces) {
        let row = v.querySelectorAll("td");
        let rowdata = {};
        for (let values of row) {
            rowdata[values.getAttribute("name")] = values.innerHTML;
        }
        orderdata.push(rowdata);
    }
    return orderdata;
}

function fullOrderData() {

    fulldata = getOrdererFullData();  
    fulldata["items"] = getOrderData();
    fulldata["deliverycost"] = parseInt(document.querySelector("#deliverycost").innerHTML);
    fulldata["grandtotal"] = parseInt(document.querySelector("#ertek").innerHTML);
    fulldata["deliverycomment"] = getOrdererComment();
    fulldata["shipped"] = 0;
    return fulldata;
}

