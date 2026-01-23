document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.value = today;
    }

    const imageInput = document.getElementById("image");
    const preview = document.getElementById("preview");
    if (imageInput && preview) {
        imageInput.addEventListener("change", function (e) {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                preview.src = url;
                preview.style.display = "block";
            } else {
                preview.src = "";
                preview.style.display = "none";
            }
        });
    }
});


const serverUrl = "http://localhost:3000";

function createnews(event) {

    event.preventDefault();
    const formData = new FormData();
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const date = document.getElementById("date").value;
    const image = document.getElementById("image").files[0];

    if (!title || !content || !date || !image) {
        alert("Please fill in all fields and select an image.");
        return;
    }
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("image", image);

    console.log(...formData.entries());
    fetch(`${serverUrl}/createNews`, {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("News item published successfully!");
                document.querySelector("form").reset();
                document.getElementById("preview").style.display = "none";
            } else {
                alert("Error: " + (data.message || "Failed to publish news."));
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while publishing the news.");
        });
}

function login(event){
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var logindata = {username : username,password:password};
    console.log(logindata)
    fetch(`${serverUrl}/login`,{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(logindata)
    })
}