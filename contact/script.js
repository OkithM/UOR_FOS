fetch('./../menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu').innerHTML = data;
        activePage = document.getElementById("pagename_contact");
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

// document.getElementById("contact-Form").addEventListener("submit", function (e) {

//     e.preventDefault();

//     alert("Your message has been successfully received.Thank You.")
// });

function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const studentId = document.getElementById("student-id").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    fetch('http://localhost:3000/submitFeedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            student_name: name,
            student_id: studentId,
            email: email,
            message_body: message
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Your message has been successfully received. Thank You.");
            } else {
                alert("Failed to submit your message.");
            }
        })
        .catch(error => {
            console.error("Error submitting feedback:", error);
            alert("An error occurred while submitting your message.");
        });
}