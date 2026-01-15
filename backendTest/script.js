var latestnews = [];
const serverUrl = "http://localhost:3000";

fetch(`${serverUrl}/latestnews`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    latestnews = data;
    console.log(latestnews);

    for (let i = 0; i < 3; i++) {
      const newsHTML = `<div class="notice"><img src="${serverUrl}/images/${latestnews[i].id}.jpg"><p class="miniheading">${latestnews[i].title}<br></p><p class="description">${latestnews[i].content}</p><button type="button" class="readmore">Read More</button></div>`;
      document.body.innerHTML += newsHTML;
    }
  });
