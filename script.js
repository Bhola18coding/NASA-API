const api_key = "x3zpvcvyAt9wxglhbsQKnv7V2SzjCrTYwYvevaoV";
var heading = document.getElementById("heading");
var image = document.getElementById("current-image-container");
var title = document.getElementById("title");
var description = document.getElementById("description");
const form = document.getElementById("search-form");
var input_date = document.getElementById("search-input");
var previous_history = document.getElementById("search-history");

function getCurrentImageOfTheDay() {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            image.src = data.url;
            title.innerHTML = data.title;
            description.innerHTML = data.explanation;
        })
        .catch((error) => {
            alert(`Got Some Error from api side!, Error: ${error}`);
        });
}

function getImageOfTheDay() {
    var date = new Date(input_date.value);
    var month = (date.getMonth() < 10) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();

    var newDate = `${date.getFullYear()}-${month}-${day}`;

    let url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${newDate}`
    
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            heading.innerHTML = `Picture on ${newDate}`;
            image.src = data.url;
            title.innerHTML = data.title;
            description.innerHTML = data.explanation;
        })
        .catch((error) => {
            alert(`Got Some Error from api side!, Error: ${error}`);
        });

    saveSearch(newDate);
    addSearchToHistory(newDate);
}

function saveSearch(date) {
    var searches = JSON.parse(localStorage.getItem("searches")) || [];

    var newEntry = { 'date': date };
    searches.push(newEntry);

    localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory(date) {
    var li = document.createElement("li");
    li.innerHTML = `<a onclick="searchDate(this)">${date}</a>`;
    previous_history.appendChild(li);
}

function searchDate(date) {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date.innerHTML}`
    console.log(url);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            heading.innerHTML = `Picture on ${date.innerHTML}`;
            image.src = data.hdurl;
            title.innerHTML = data.title;
            description.innerHTML = data.explanation;
        })
        .catch((error) => {
            alert(`Got Some Error from api side!, Error: ${error}`);
        });
}

window.onload = () => {
    getCurrentImageOfTheDay();
    localStorage.removeItem("searches");
};

form.addEventListener("submit", function (event) {
    event.preventDefault();
    getImageOfTheDay();
});