



document.getElementById("reset-logo").addEventListener("click", function() {
    document.getElementById("loading").className = "animated jackInTheBox";
    document.getElementById("loading").style.display = "block";
    document.getElementById("app").style.display = "none";
    restart();
});

function restart() {
    setTimeout(function() {
        document.getElementById("loading").className += "animated zoomOutDown";

        setTimeout(function() {
            document.getElementById("loading").style.display = "none";
            document.getElementById("app").style.display = "block";
        }, 1000);
    }, 2000);
}

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

restart();