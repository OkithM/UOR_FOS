var latestnews = [];

fetch("http://localhost:3000/latestnews", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    latestnews = data;
    console.log(latestnews);

    for (let i = 0; i < 3; i++) {
      const newsHTML = `<div class="notice"><img src="http://localhost:3000/images/${latestnews[i].id}.jpg"><p class="miniheading">${latestnews[i].title}<br></p><p class="description">${latestnews[i].content}</p><button type="button" class="readmore">Read More</button></div>`;
      document.body.innerHTML += newsHTML;
    }
  });
