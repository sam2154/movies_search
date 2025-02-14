// https://www.omdbapi.com/?apikey=87267107&s=${input.value}&page=10
const moviesContainer = document.getElementById("moviesContainer");
const loading = document.getElementById("loading");
async function searchMovies() {
    let page = localStorage.getItem("pageCount");
  const searchInput = document.getElementById("searchInput").value || "Dil";
  const apiKey = "ae3b83ef";
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  loading.style.display = "block"; //loading
  // moviesContainer.innerHTML = "";
  data.Search.forEach((element) => {
    console.log(element.Title);
    let imdbUrl = "https://www.imdb.com/title/" + element.imdbID;
    console.log(imdbUrl);
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie-card");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const a = document.createElement("a");
    a.href = imdbUrl;
    a.target = "_blank";
    img.src = element.Poster;
    img.alt = "Movie Image";
    p.textContent = element.Title;
    // movieDiv.append(img, p);
    a.append(img);
    // a.append(p); // its way also working i tested this.
    movieDiv.append(a, p);
    moviesContainer.appendChild(movieDiv);
  });
}

function infiniteScroll() {
  const observer = new IntersectionObserver((entities) => {
    if (entities[0].isIntersecting) {
        let currentPageCount = JSON.parse(localStorage.getItem('pageCount'));
        localStorage.setItem('pageCount', currentPageCount + 1);
      searchMovies();
    }
  });
  observer.observe(document.getElementById("loading"));
}

document.getElementById("search").addEventListener("click", () => {
localStorage.setItem("pageCount", 1);  
  searchMovies();
  infiniteScroll();
});
