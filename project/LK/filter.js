var guidsTable = document.getElementsByClassName("tr-guid")
var routeTable = document.getElementsByClassName("tr-route")
var input2 = document.getElementById("inut-guides");
var input1 = document.getElementById("inut-route");

input2.oninput = function () {
    var choised = parseInt(document.getElementById("select").value)
    for (var i = 0; i < guidsTable.length; i++) {
        var check = guidsTable[i].getElementsByClassName("td-select")[choised].innerHTML.toLowerCase()
        if (!check.includes(this.value.toLowerCase())) {
            guidsTable[i].style.display = "none";
        } else {
            guidsTable[i].style.display = "";
        }
    }
}

input1.oninput = function () {
    var choised = parseInt(document.getElementById("select-route").value)
    for (var i = 0; i < routeTable.length; i++) {
        var check = routeTable[i].getElementsByClassName("td-select")[choised].innerHTML.toLowerCase()
        if (!check.includes(this.value.toLowerCase())) {
            routeTable[i].style.display = "none";
            routeTable[i].value = "";
        } else {
            routeTable[i].style.display = "";
        }
        document.getElementById("pg1").value = "1";
        document.getElementById("pg0-p").value = "1";
        document.getElementById("pg1").oninput();
    }
}