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

function showdetails() {
    var modal = document.getElementById("degreeModal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("degreeModal");
    modal.style.display = "none";
}