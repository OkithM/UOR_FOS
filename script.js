
fetch('./../menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu').innerHTML = data;
        activePage = document.getElementById("pagename_home");
        activePage.style.color = "#003366";
        activePage.style.fontWeight = "bold";
    });
fetch('./../footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

function showpagename() {
    document.getElementById("pageslist").style.display = "flex";
}


const newsGrid = document.getElementById("news-grid");

var latestnews = [];
const serverUrl = "http://localhost:3000";
var dots = "";

fetch(`${serverUrl}/latestnews`, {
    method: "GET",
})
    .then((response) => response.json())
    .then((data) => {
        latestnews = data;
        console.log(latestnews);

        for (let i = 0; i < 3; i++) {
            if (latestnews[i].title.length > 50) {
                dots = "...";
            } else {
                dots = "";
            }
            var news = `<div class="news"><h3 style="color: #002147;">${latestnews[i].title.slice(0, 50)}${dots}</h3><div class="news-img" style="background-image: url(${serverUrl}/${latestnews[i].image_path});"  ></div> <p class="description">${latestnews[i].content.slice(0, 100)}...</p><button> <a href="https://www.ruh.ac.lk/index.php/en/news/895-the-32nd-convocation-2025" target="_blank">Read More</a> </button></div>`
            newsGrid.innerHTML += news;
        }
    });

const counters = document.querySelectorAll(".counter");

function count(counter) {
    let target = parseInt(counter.getAttribute("value"));
    let current = parseInt(counter.innerHTML);

    var increment = target / 48;

    function countUp() {
        if (current < target) {
            counter.innerHTML = current;
            current = parseInt(parseInt(current) + increment);
        }
        else {
            counter.innerHTML = target;
            return;
        }
        setTimeout(countUp, 30);
    }

    countUp();
};
function resetCounter(counter) {
    counter.innerHTML = "0";
}

// 2. Define what happens when the visibility changes
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("Element is visible!");
            count(entry.target);
            // You can stop observing if you only need to trigger this once:
            // observer.unobserve(entry.target);
        } else {
            console.log("Element is hidden.");
            resetCounter(entry.target);
        }
    });
}, {
    threshold: 1 // Triggers when 50% of the element is visible
});

// 3. Start watching
for (let i = 0; i < counters.length; i++) {
    observer.observe(counters[i]);
}