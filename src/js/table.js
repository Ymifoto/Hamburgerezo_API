const url = "https://export.avbox.hu/api/?site=hamburgerezo&key=hamburger1234";

function getArlistaData() {

    sendData(url,"get","hamburgerek").then (
        data => fillTable(data,"hamburgerek"),
        error => console.error(error));
}

function getFeltetekData() {

    sendData(url,"get","feltetek").then (
        data => fillTable(data,"feltetek"),
        error => console.error(error)
        );
}

function fillTable(data = [],table) {

    admin = window.location.pathname.slice(1).indexOf("editarlista.html");
    const tbody = document.querySelector("table#"+table+" tbody");
    (admin > 0) ? (tbody.appendChild(addNewInputRow()),setAdminArlista(table)) : ""; 
        for (let rows of data) {    
            let tr = createAnyElement("tr");
            for (let k in rows) {
                (admin > 0 ) ? fillAdminArlista(rows[k],k,tr) : fillArlista(rows[k],tr);
            }
            (admin > 0) ? tr.appendChild(addAdminButtons()) : "";
            tbody.appendChild(tr);
        }
}

function createAnyElement(tag,attributes) {
   let element =  document.createElement(tag);

   for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

function pageReaload(data) {
    
    if (JSON.parse(data).save == "ok") {
        location.reload();
    }
    else {
        console.error("Sikertelen mentés");
    }
}