
function getOrdersData(){
    sendData(url,"get","orders").then (
        data => fillOrdersTable(data));
}

function fillOrdersTable(data = []) {

    let tbody = document.querySelector("#orders");
    keys =["id","name","address","items","deliverycomment","deliverycost","grandtotal","ordered","shipped"];
    let dataid = "";

    for (let value of data){
        dataid = value["id"];
        let tr = createAnyElement("tr");
        for (let key of keys) {
            key == "items" ? td = createAnyElement("td", {name : key,style : "line-height: 2rem;"}) : td = createAnyElement("td", {name : key});
            value[key] = dataConvert(key,value[key]);
            td.innerHTML = value[key];
            tr.appendChild(td);
        }
        tr.appendChild(addSetBtn(value["shipped"]));
        let id = document.querySelector("#orders").querySelector("tr td:nth-child(1)");
        id != null ? (id.innerHTML < dataid ? tbody.insertBefore(tr,tbody.childNodes[0]) : tbody.appendChild(tr)) : tbody.appendChild(tr);
    }
}


function dataConvert(key,data) {

    (key == "deliverycost" || key == "grandtotal") ? data += " Ft" : "";
    data == false ? (key == "deliverycomment" ? data = "" : "", key == "shipped" ? data = "Nincs kiszallítva" : "") : key == "shipped" ? data = "Kiszállítva" : "";
    return data;
}

function addSetBtn(shipped) {
    let td = createAnyElement("td");
    let button = createAnyElement("button", {
        class : "btn btn-success",
        type : "submit"
    });
    shipped == "Kiszállítva" ? button.setAttribute("style","display:none;") : "";
    button.innerHTML = '<i class="far fa-check-square"></i>';
    button.addEventListener("click",setChangeStatus);
    td.appendChild(button);
    return td;
}

function setChangeStatus() {
    let id = { id: this.parentElement.parentElement.firstChild.innerHTML,
               shipped : 1};
    sendData(url,"set","orders",JSON.stringify(id)).then(response => pageReaload(response));
}