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
    const token = localStorage.getItem("token")

    console.log("Token:", token);

    if (!title || !content || !date || !image) {
        alert("Please fill in all fields and select an image.");
        return;
    }
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("image", image);
    formData.append("token", token);

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

function toAdminConsole() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("form-container").style.display = "block";
}

function login(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var logindata = { username: username, password: password };
    console.log(logindata)
    fetch(`${serverUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logindata)
    }).then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem("token", data.token);
                toAdminConsole();
            } else {
                alert("Login failed.");
            }
        });
}

function autologin() {
    const token = localStorage.getItem("token");
    if (token) {
        fetch(`${serverUrl}/autologin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token })
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    toAdminConsole();
                    console.log("Auto-login successful.");
                }
                else {
                    document.getElementById("loginForm").style.display = "flex";
                    console.log("Auto-login failed.");
                }
            });
    }
}

autologin();

function loadfeedbacks() {
    const token = localStorage.getItem("token");
    fetch(`${serverUrl}/feedbacks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token })
    }).then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Feedbacks loaded:", data.feedbacks);
                const feedbackList = document.getElementById("feedback-list");
                feedbackList.innerHTML = "";
                data.feedbacks.forEach(feedback => {
                    if (!feedback.student_name) {
                        feedback.student_name = "-";
                    }
                    if (!feedback.student_id) {
                        feedback.student_id = "-";
                    }
                    if (!feedback.email) {
                        feedback.email = "-";
                    }
                    const feedbackDiv = document.createElement("div");
                    feedbackDiv.className = "feedback";
                    feedbackDiv.innerHTML = `
                        <p><b>Date</b> : ${new Date(feedback.submitted_at).toLocaleString()}</p>
                        <p><b>Name</b> : ${feedback.student_name}</p>
                        <p><b>StudentID</b> : ${feedback.student_id}</p>
                        <p><b>Email</b> : ${feedback.email}</p>
                        <p><b>Message</b> : ${feedback.message_body}</p>
                    `;
                    console.log("Adding feedback:", feedback);
                    feedbackList.appendChild(feedbackDiv);
                });
            } else {
                console.error("Failed to load feedbacks:", data.message);
            }
        });
}

function toFeedbacks() {
    document.getElementById("form-container").style.display = "none";
    document.getElementById("feedback-container").style.display = "block";
    loadfeedbacks();
}
function toNewsForm() {
    document.getElementById("feedback-container").style.display = "none";
    document.getElementById("form-container").style.display = "block";
}