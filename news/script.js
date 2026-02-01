
fetch('./../menu.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('menu').innerHTML = data;
    activePage = document.getElementById("pagename_news");
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

var allnews = [];
const serverUrl = "http://localhost:3000";
var dots = "";

fetch(`${serverUrl}/allnews`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    allnews = data;

    for (let i = 0; i < allnews.length; i++) {
      if (allnews[i].title.length > 50) {
        dots = "...";
      } else {
        dots = "";
      }
      var news = `<div class="news"><h3 style="color: #002147;">${allnews[i].title.slice(0, 50)}${dots}</h3><div class="news-img" style="background-image: url(${serverUrl}/${allnews[i].image_path});"  ></div> <p class="description">${allnews[i].content.slice(0, 100)}...</p><button onclick="loadNewsDetails(${allnews[i].id})">Read More</button></div>`
      newsGrid.innerHTML += news;
    }
  });

function loadNewsDetails(newsId) {
  fetch("/news_view/index.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("news-view-container").innerHTML = data;
    })
    .then(() => {
      document.getElementById("news_healine").innerText = latestnews.find(n => n.id === newsId).title;
      document.getElementById("date_creadits").innerText = latestnews.find(n => n.id === newsId).date;
      document.getElementById("news_img").style.backgroundImage = `url(${serverUrl}/${latestnews.find(n => n.id === newsId).image_path})`;
      document.getElementById("news_description").innerText = latestnews.find(n => n.id === newsId).content;
      document.getElementById("news-view-container").style.display = "block";
      document.getElementById("news_close").addEventListener("click", () => {
        document.getElementById("news-view-container").style.display = "none";
      });
    })
}