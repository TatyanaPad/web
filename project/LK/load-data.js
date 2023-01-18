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