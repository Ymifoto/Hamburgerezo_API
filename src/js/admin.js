function setAdminArlista(table) {
    let head = document.querySelector("table#"+table+" thead tr");
    let th = createAnyElement("th", {style : "width:10%;"});
    th.innerHTML = "Action";
    head.appendChild(th);   
}

function fillAdminArlista(row,value,tr) {
    let td = createAnyElement("td");
    let input = createAnyElement("input", {
        class : "form-control",
        value : row,
        name  : value
        }
    )
    value == "id" ? input.setAttribute("readonly",true) : "";
    value == "price" ? input.setAttribute("type","number") : "";
    td.appendChild(input);
    tr.appendChild(td);
}

function addAdminButtons() {
    let td = createAnyElement("td");
    let div = createAnyElement("div", {
        class : "btn-group"})

    div.appendChild(rewriteButton());
    div.appendChild(deleteButton());
    td.appendChild(div)
    return td;
}


function rewriteButton() {
    let buttonRewrite = createAnyElement("button", {
        class : "btn btn-primary",
        name : "rewrite",
        type : "submit"
    })
    buttonRewrite.innerHTML = '<i class="fas fa-sync-alt"></i>';
    buttonRewrite.addEventListener("click",rewriteRow);
    return buttonRewrite;

}

function deleteButton() {
    let buttonDelete = createAnyElement("button", {
        class : "btn btn-danger",
        name : "delete"
    })
    buttonDelete.innerHTML = '<i class="far fa-trash-alt"></i>';
    buttonDelete.addEventListener("click",deleteRow);
    return buttonDelete;
}

function addNewInputRow() {
    keys = ["id","name","leiras","price"];
    let tr = createAnyElement("tr");
    for (let i = 0; i < keys.length; i++) {
        let td = createAnyElement("td");
        let input = createAnyElement("input", {
            class : "form-control",
            name: keys[i]
        })
        keys[i] == "id" ? (input.setAttribute("type", "number"),input.setAttribute("readonly", "true")) : keys[i] == "price" ? input.setAttribute("type", "number") : "";
        td.appendChild(input);
        tr.appendChild(td);
        }
    tr.appendChild(addButton());
    return tr;
}

function getTableID(table,tagname) {
    while (table && table.parentElement) {
        table = table.parentElement;
        if (table.tagName.toLowerCase() == tagname) {
            return table.id;
        }
    }
}

function deleteRow() {
    let id = { id: this.parentElement.parentElement.parentElement.firstChild.querySelector("input").value};
    let table = getTableID(this,"table");
        
    confirm("Biztosan törli?") ? sendData(url,"delete",table,JSON.stringify(id)).then(response => pageReaload(response)) : "";
}

function getRowData(inputs) {
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    return data;
}

function rewriteRow() {
    let row = this.parentElement.parentElement.parentElement;
    let table = getTableID(this,"table");
    let inputs = row.querySelectorAll("td input.form-control");
    let data = getRowData(inputs);
    confirm("Biztosan megváltoztataja?") ? sendData(url,"set",table,JSON.stringify(data)).then(response => console.log(response)) : "";
}

function addButton() {

    let td = createAnyElement("td");
    let button = createAnyElement("button", {
        class : "btn btn-success",
        type : "submit"
    });
    button.innerHTML = '<i class="far fa-plus-square"></i>';
    button.addEventListener("click",addNewRowData);
    td.appendChild(button);
    return td;
}

function addNewRowData() {
    let row = this.parentElement.parentElement;
    let table = getTableID(this,"table");
    let inputs = row.querySelectorAll("td input.form-control");
    let data = getRowData(inputs);
    console.log(data);
    console.log(table);
    sendData(url,"add",table,JSON.stringify(data)).then(response => pageReaload(response));
}

function getDeliveryData() {
    sendData(url,"get","szallitas").then (
    data => makeDeliverySection(data)
    )
}

function makeDeliverySection(data) {

    let delivery = document.getElementById("delivery");
        for (let adat in data[0]) {
                let label = createAnyElement("label", {
                   for : adat,
                   class : "form-label"
            });
            label.innerHTML = adat == "treshold" ? "Ingyenességi küszöb" : "Szállítási díj";

            let input = createAnyElement("input", {
                class : "form-control",
                name : adat,
                value : data[0][adat],
                id : 1
            });
            adat == "id" ? input.setAttribute("type","hidden") : (delivery.appendChild(label),input.setAttribute("type","number")); 
            delivery.appendChild(input);   
       }
    delivery.appendChild(rewriteDeliverySaveBtn());
}

function rewriteDeliverySaveBtn() {

    let buttonSave = createAnyElement("button", {
        class : "btn btn-primary",
        name : "save",
        type : "submit",
        style: "margin-top:5px"
    });
    buttonSave.innerHTML = 'Mentés';
    buttonSave.addEventListener("click",saveDeliveryCost);
    return buttonSave;
}

function saveDeliveryCost() {
    let fees = getRowData(document.getElementById("delivery").querySelectorAll("input"));
    sendData(url,"set","szallitas",JSON.stringify(fees)).then(response => console.log(response));
}