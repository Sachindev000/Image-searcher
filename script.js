const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResult = document.querySelector(".search-result");
const showMoreBtn = document.getElementById("show-more-btn");

const accessKey = "1DkruOFo6Tt4lcPxSGiLIqP1syLdVrXakf1DfDx6MvE";

let keyword = "";
let page = "";

async function searchImage() {
  keyword = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if(page===1){
    searchResult.innerHTML=""
  }

  const results = data.results;

  results.forEach((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);

    searchResult.appendChild(imageLink);
  });
  showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImage();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImage();
});
