function sendData(url,method,dataType,data) {

    typeof(data) == 'undefined' ? data = '""' : "";

    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers : {
            "Content-Type" : "application/json"
        },
        body: '[{"data_type":"'+dataType+'","method":"'+method+'","data":'+data+'}]'
    };
    
    return fetch(url,fetchOptions).then(
        response => response.json(),
        error => console.error("Nincs kapcsolat az adatbázissal")
    );
}

function deleteData(url) {

    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"
    };
    
    return fetch(url,fetchOptions).then(
        response => response.json(),
        error => console.error("Nincs kapcsolat az adatbázissal")
    );
}

function rewriteData(url,data) {

    let fetchOptions = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    };
    
    return fetch(url,fetchOptions).then(
        response => response.json(),
        error => console.error("Nincs kapcsolat az adatbázissal")
    );
}

function addData(url,method,dataType,data) {

    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers : {
            "Content-Type" : "application/json"
        },
        body: '[{"data_type":"'+dataType+'","method":"'+method+'","data":'+data+'}]'
    };

    return fetch(url,fetchOptions).then(
        response => console.log(response.json()),
        error => console.error("Nincs kapcsolat az adatbázissal")
    );
}