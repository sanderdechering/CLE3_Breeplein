var tried = 0;



document.getElementById("reset-logo").addEventListener("click", function() {
    restart();
});

// Restart window
function restart() {
    document.getElementById("loading").className = "animated jackInTheBox";
    document.getElementById("loading").style.display = "block";
    document.getElementById("app").style.display = "none";
    document.querySelector(".lds-facebook").style.display = 'inline-block';

    loadStatistics();
}

// Load data
function loadStatistics() {
    tried++;

    reqwest({
        url: 'https://cle3.hr.vriends.co/index.php?type=list',
        type: 'json',
        success: function (data) {
            tried = 0;

            calculateResponse(data);

            setTimeout(function() {
                document.getElementById("loading").className += "animated zoomOutDown";

                setTimeout(function() {
                    document.getElementById("loading").style.display = "none";
                    document.getElementById("app").style.display = "block";
                }, 1000);
            }, 1000);
        },
        error: function() {
            document.querySelector(".lds-facebook").style.display = 'none';

            if(tried < 3) {
                restart();
            }else {
                alert("Could not receive data from our site!");
            }
        }
    });
}

restart();

/* Calculate the data */
function calculateResponse(data) {
    var currentHour = new Date().getHours();

    // Hours
    var currentCars = 0;
    var carsHourAgo = 0;
    var carsTwoHoursAgo = 0;

    for(var i = 0; i < data.length; i++) {
        var currentData = data[i];

        // Amount of cars two hours ago
        if(currentData.hour == (currentHour - 2)) {
            carsTwoHoursAgo = currentData.cars;
        }

        // Amount of cars hour ago
        if(currentData.hour == (currentHour - 1)) {
            carsHourAgo = currentData.cars;
        }

        // Amount of cars right now
        if(currentData.hour == currentHour) {
            currentCars = currentData.cars;
        }
    }

    // Check if it's currently bussy
    if(currentCars > 150) {
        document.getElementById("currently-bussy").style.display = "block";
    }else{
        document.getElementById("currently-bussy").style.display = "none";
    }

    console.log(carsHourAgo);
    console.log(carsTwoHoursAgo);

    var procents = Math.round((currentCars / carsHourAgo) * 100);
    var procentsHourAgo = Math.round((carsHourAgo / carsTwoHoursAgo) * 100) - 100;

    if(procents >= 100) {
        procents -= 100;
    }


    // Verschil met 1 uur geleden
    document.getElementById("current-cars-bar").style.width = procents + "%";
    document.getElementById("current-cars-text").innerHTML = procents + "% " + (procents > 100 ? 'meer' : 'minder') + " auto's";

    // Verschil met 2 uur geleden
    document.getElementById("previous-cars-bar").style.width = procentsHourAgo + "%";

    document.getElementById("previous-cars-text").innerHTML = procentsHourAgo + "% <small>" + (procentsHourAgo > 0 ? 'meer' : 'minder') + " auto's (1u geleden)</small>";
}

/* Tabs */
var menuLinks = document.querySelectorAll(".menu-bottom a");

for(var i = 0; i < menuLinks.length; i++) {
    var currentMenuLink = menuLinks[i];

    currentMenuLink.addEventListener("click", function () {

        var tabId = this.getAttribute("data-tab");

        activeMenu(tabId);
        activeTab(tabId);
    });
}

function activeMenu(id) {
    var menuLinks = document.querySelectorAll(".menu-bottom a");

    for(var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].className = "";
    }

    document.querySelector(".menu-bottom a[data-tab=\""+ id +"\"]").className = "selected";
}

function activeTab(id) {
    var menuLinks = document.querySelectorAll("#app .is-tab");

    for(var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].style.display = "none";
    }

    document.querySelector("#app #tab-" + id).style.display = "block";
}