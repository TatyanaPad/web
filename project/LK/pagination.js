const viuewLen = 3.0;
var pgInput1 = document.getElementById("pg1");

pgInput1.oninput = function() {
    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    if (parseInt(this.value) > parseInt(this.max)) {
        this.value = this.max;
    } else if (parseInt(this.value) < parseInt(this.min)) {
        this.value = this.min;
    }
    
    if (this.value != "") {
        var trList = document.getElementsByClassName("tr-route");
        var NormalList = [];
        for (var i = 0; i < trList.length; i++) {
            if (trList[i].style.display != "none" || trList[i].value == "pg") {
                NormalList.push(trList[i])
            }
        }
        
        var pages = Math.ceil(NormalList.length/viuewLen);
        if (pages == 0) {
            pages = 1;
        }
        
        var pg = parseInt(this.value);
        if (pg > pages) {
            pg = pages;
        } else if (pg < 1) {
            pg = 1;
        }

        this.max = pages;
        document.getElementById("pg1-p").innerHTML = "из " + pages;

        for (var i = 0; i < NormalList.length; i++) {
            if (!(i >= (this.value-1)*viuewLen && i < (this.value)*(viuewLen))) {
                NormalList[i].style.display = "none";
                NormalList[i].value = "pg";
            } else {
                NormalList[i].style.display = "";
                NormalList[i].value = "";
            }
        }
    }
}