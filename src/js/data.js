const url = "https://export.avbox.hu/api/?site=hamburgerezo&key=hamburger1234";

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
