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
      const newsHTML = `<div class="notice"><img src="${serverUrl}/${latestnews[i].image_path}"><p class="miniheading">${latestnews[i].title.slice(0, 50)}${dots}<br></p><p class="description">${latestnews[i].content.slice(0, 100)}...</p><button type="button" class="readmore">Read More</button></div>`;
      document.body.innerHTML += newsHTML;
    }
  });

// 1. Apply formatting commands
function execCmd(command) {
  document.execCommand(command, false, null);
}

// 2. Capture the HTML on submit
const form = document.getElementById('editorForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get the innerHTML from the div
  const richText = document.getElementById('editor').innerHTML;

  // Assign it to the hidden input
  document.getElementById('htmlOutput').value = richText;

  console.log("Saved HTML Code:", richText);
  alert("HTML Saved! check console.");
});