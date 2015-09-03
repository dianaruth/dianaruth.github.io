var navbarHeight = 70;
var idNum = 1;
var delay = 0;
var colors = ["#00FFCC", "#FFCCFF", "#99CCFF", "#CCFF99", "#6699FF"];

$(document).ready(function() {
    $("#intro").css("height", window.innerHeight);
    $("#svg").css("height", window.innerHeight);
    $("#svg").css("width", window.innerWidth);
    animateRain();
    $("#name").css("margin-top", ((window.innerWidth) / 20));
    $("#description").css("margin-top", ((window.innerWidth) / 3.75));
});

$("#txequestrian").mouseout(function() {
    $("#txequestrian").css("opacity", "1");
});

$(document).resize(function() {
    $("#name").css("margin-top", ((window.innerWidth) / 20));
    $("#description").css("margin-top", ((window.innerWidth) / 3.75));
});

$("#navbar-intro").click(function() {
    $('html, body').animate({
        scrollTop: $("#intro").offset().top - navbarHeight
    }, 1000);
});

$("#navbar-about").click(function() {
    $('html, body').animate({
        scrollTop: $("#about").offset().top - navbarHeight
    }, 1000);
});;

$("#navbar-projects").click(function() {
    $('html, body').animate({
        scrollTop: $("#projects").offset().top - navbarHeight
    }, 1000);
});

$("#navbar-contact").click(function() {
    $('html, body').animate({
        scrollTop: $("#contact").offset().top - navbarHeight
    }, 1000);
});

function selectProject(projectId) {
    $("#" + projectId).css("opacity", "0.8");
    $("#" + projectId).css("cursor", "pointer");
}

function deselectProject(projectId) {
    $("#" + projectId).css("opacity", "1");
}

$(window).scroll(function() {
    if ($(window).scrollTop() >= $("#contact").offset().top - navbarHeight) {
        var active = document.getElementsByClassName("active");
        for (var i = 0; i < active.length; i++) {
            active[i].classList.remove("active");
        }
        $("#navbar-contact").addClass("active");
    }
    else if ($(window).scrollTop() >= $("#projects").offset().top - navbarHeight) {
        var active = document.getElementsByClassName("active");
        for (var i = 0; i < active.length; i++) {
            active[i].classList.remove("active");
        }
        $("#navbar-projects").addClass("active");
    }
    else if ($(window).scrollTop() >= $("#about").offset().top - navbarHeight) {
        var active = document.getElementsByClassName("active");
        for (var i = 0; i < active.length; i++) {
            active[i].classList.remove("active");
        }
        $("#navbar-about").addClass("active");
    }
    else {
        var active = document.getElementsByClassName("active");
        for (var i = 0; i < active.length; i++) {
            active[i].classList.remove("active");
        }
    }
});

function animateRain() {
    var svgnode = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svgnode.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgnode.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svgnode.setAttribute("height", (window.innerHeight - navbarHeight));
    svgnode.setAttribute("width", window.innerWidth);
    svgnode.setAttribute("id", "svg");
    document.getElementById("intro").appendChild(svgnode);
    for (var i = 0; i < 8; i++) {
        setTimeout(function() { addCircle(); }, delay);
        delay = delay + 1500;
    }
}

function addCircle() {
    var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    if (idNum > 50) {
        idNum = 1;
    }
    var circleId = "circle" + idNum;
    idNum++;
    var radius = getRandomNumber(20, 100);
    var speed = getRandomNumber(4000, 15000);
    var pos = getRandomNumber(radius, (window.innerWidth - radius));
    var color = colors[getRandomNumber(0, colors.length)];
    circle.setAttribute("id", circleId);
    circle.setAttribute("cx", pos);
    circle.setAttribute("cy", (radius * -1));
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", color);
    circle.setAttribute("onmouseover", "expand(this, " + radius + ");");
    circle.setAttribute("onmouseout", "contract(this, " + radius + ");");
    $("#svg").append(circle);
    $("#" + circleId).velocity({ cy: (window.innerHeight - navbarHeight) + radius}, {duration: speed, easing: "linear", queue: false, complete: function()  {$("#" + circleId).remove(); addCircle();}});
}

function expand(elem, radius) {
    $(elem).velocity({r:radius*1.2}, {duration: 400, easing: "linear", queue: false});
}

function contract(elem, radius) {
    $(elem).velocity({r:radius}, {duration: 400, easing: "linear", queue: false});
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}