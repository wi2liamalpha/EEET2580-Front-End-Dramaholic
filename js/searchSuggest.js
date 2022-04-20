let searchWrapper = document.querySelector(".search-box");
let inputValue = searchWrapper.querySelector("input");
const searchContent = document.querySelector(".search-content");
const mainContent = document.querySelector("main");
const logo = document.querySelector(".image-container");
const footer = document.querySelector("footer")
let titleList = [];
const isHover = (e) => e.parentElement.querySelector(":hover") === e;
const emptyPage = document.querySelector('.error-search-page')
const myDiv = document.querySelector(".icon");
const searchBar = document.querySelector(".search-bar");
function openSearch() {
  // media query to check
  var media_query = "screen and (min-width:320px) and (max-width:1023px)";

  // matched or not
  var matched = window.matchMedia(media_query).matches;
  matched && !searchBar.classList.contains("open")
    ? logo.classList.add("hidden")
    : logo.classList.remove("hidden");
  !searchBar.classList.contains("open")
    ? searchBar.classList.add("open")
    : searchBar.classList.remove("open");
}

const createMovieCard = (x) => {
  let card = document.createElement("div");
  card.className = "movie-search-card";

  // Image
  let img = document.createElement("img");
  img.className = "movie-search-image";
  img.src = x.thumbnail;
  img.onclick = function () {
    localStorage.setItem("dbid", x.dbID);
    location.href = "./pages/movie/movie_detail.html";
  };
  card.appendChild(img);

  var cardContent = document.createElement("div");
  cardContent.className = "card-content";
  card.appendChild(cardContent);

  // Title
  let title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = x.title;
  title.onclick = function () {
    localStorage.setItem("dbid", x.dbID);
    location.href = "./pages/movie/movie_detail.html";
  };
  cardContent.appendChild(title);

  //description
  let description = document.createElement("p");
  description.className = "card-body";
  description.textContent = x.originalTitle;
  cardContent.appendChild(description);

  return card;
};
function isEmpty(value) {
  return Boolean(value && typeof value === 'object') && !Object.keys(value).length;
}
async function searchSuggest(title) {
  searchContent.innerHTML = "";
  footer.style.display = "none";
  const reponse = await fetch(
    "https://dramaholic.herokuapp.com/api/movies/search?title=" + title
  );
  const { content } = await reponse.json();
  content.forEach((movie) => {
    searchContent.appendChild(createMovieCard(movie));
  });
  
  if(isEmpty(searchContent.childNodes)){
   
    emptyPage.classList.remove('hidden')
  }else{
    emptyPage.classList.add('hidden')
  }
  searchContent.style.display = "grid";
  footer.style.display = "block";
  mainContent.style.display = "none";
}

inputValue.onkeyup = (e) => {
  let current_search = e.target.value;
  if (current_search) {
    searchSuggest(current_search);
  } else {
    mainContent.style.display = "block";
    searchContent.style.display = "none";
  }
};
