fetch('./../menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu').innerHTML = data;
        activePage = document.getElementById("pagename_programs");
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

function showdetails(program) {
    var modal = document.getElementById("modal-" + program);
    modal.style.display = "block";
}

function closeModal() {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function (modal) {
        modal.style.display = "none";
    });
}