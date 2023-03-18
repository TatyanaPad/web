var back = document.getElementById("back");
var front = document.getElementById("front");

back.onclick = function () { 
    var pg = document.getElementById("pg1")
    var pg0p = document.getElementById("pg0-p")
    pg.value--;
    pg.oninput();

    pg0p.innerHTML = pg.value
};

front.onclick = function () { 
    var pg = document.getElementById("pg1")
    var pg0p = document.getElementById("pg0-p")
    pg.value++;
    pg.oninput();

    pg0p.innerHTML = pg.value
};