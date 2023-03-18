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
        }())
        .catch(error => {
            alert('Error:', error);
        });
    console.log("Data is loading");
}

function loadRouts(paginfunc) {
    fetch("https://apidata.mos.ru/v1/datasets/2252/features?api_key=bdded6da8aece7b852d7308bbc82692e", {method: 'POST'}) 
    .then(response => response.json())
    .then(json => {
        const tbd = document.getElementById("tbd");
        for (i = 0; i<json.features.length; i++) {
            var start = json.features[i].geometry.coordinates
            while (typeof start[0] !== "number") {
                start = start[0]
            }

            var stop = json.features[i].geometry.coordinates
            while (typeof stop[stop.length-1] !== "number") {
                stop = stop[stop.length-1]
            }
            //console.log(start, stop);
            start = start[0]+">"+stop[1]
            stop = stop[0]+">"+stop[1]

            var RouteName = json.features[i].properties.Attributes.RouteName
            var Description = json.features[i].properties.Attributes.Description
            var MainObjects = json.features[i].properties.Attributes.MainObjects
            //console.log(RouteName, Description);

            var result = '<tr class="tr-route">'
                result += '<td class="td-select">'+RouteName+'</td>'
                result += '<td class="td-select">'+MainObjects+'</td>'
                result += '<td class="td-select">'+Description+'</td>'
                result += '<td>'
                result += '<button class="route" '
                result += 'id onclick="window.location='
                result += "'/route/?data="+start+"|"+stop+"'"
                result += '">'
                result += 'Посмотреть'
                result += '</button>'
                result += '</td>'
                result += '<td><button class="selectRou" id="'+RouteName+'">Выбрать</button></td>'
                result += '</tr>'
                tbd.innerHTML += result
        }
        paginfunc();
        document.getElementById("pg1").oninput();

        selectRou = document.getElementsByClassName("selectRou");
        routeName = document.getElementById("routeName")
        for (var i = 0; i < selectRou.length; i++) {
            selectRou[i].onclick = function() {
                routeName.innerHTML = this.id;
            }
        }
    })
    .catch(error => {
        alert('Error:', error);
    });
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
        }())
        .catch(error => {
            alert('Error:', error);
        });
}





