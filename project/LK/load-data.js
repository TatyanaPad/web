function lodData() {
    fetch("/api/guides/", {method: 'GET'})
        .then(response => response.json())
        .then(json => function() {
            guides = document.getElementsByClassName('tr-guid')
            for (var i = 0; i < json.length; i++) {
                if (guides.length != json.length) {
                    alert("Incorrect length of data arrays")
                } else {
                    var tdList = guides[i].getElementsByClassName("td-select")
                    tdList[0].innerHTML = json[i].name
                    tdList[1].innerHTML = json[i].language
                    tdList[2].innerHTML = json[i].workExperience
                    tdList[3].innerHTML = json[i].pricePerHour
                }
            } 
        }());
    console.log("Data is loading");
}

function loadRouts(paginfunc) {
    fetch("/api/routes/", {method: 'GET'}) 
        .then(response => response.json())
        .then(json => function() {
            json = json.Arr
            const tbd = document.getElementById("tbd");

            for (i = 0; i < json.length; i++) {
                var result = '<tr class="tr-route">'
                result += '<td class="td-select">'+json[i][1]+'</td>'
                result += '<td class="td-select">'+json[i][2]+'</td>'
                result += '<td class="td-select">'+json[i][3]+'</td>'
                result += '<td>'
                result += '<button class="route" '
                result += 'id onclick="window.location='
                result += "'/route/?data="+json[i][4]+"|"+json[i][5]+"'"
                result += '">'
                result += 'Посмотреть'
                result += '</button>'
                result += '</td>'
                result += '</tr>'
                tbd.innerHTML += result
            }

            paginfunc();
            document.getElementById("pg1").oninput();
        }());
} 

function loadGuids(bindFunc) {
    fetch("/api/routes/", {method: 'GET'}) 
        .then(response => response.json())
        .then(json => function() {
            json = json.Guids
            const tbd = document.getElementById("guides");

            for (i = 0; i < json.length; i++) {
                var result = '<tr class="tr-guid">'
                result += '<td><img src="https://www.santarelli.com/wp-content/uploads/2015/11/PROFILE_685x685-02-H-02.png"></td>'
                result += '<td class="td-select">'+json[i][0]+'</td>'
                result += '<td class="td-select">'+json[i][1]+'</td>'
                result += '<td class="td-select">'+json[i][2]+'</td>'
                result += '<td><p class="price-hour td-select" id="pricePerHour">'+json[i][3]+'</p></td>'
                result += '<td><button class="bron" value="'+json[i][0]+'|'+json[i][4]+'">Бронировать</button></td>'
                result += '</tr>'
                tbd.innerHTML += result
            }

            bindFunc();
        }());
}