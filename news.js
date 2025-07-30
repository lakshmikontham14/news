let apiKey = "92f3e05b842c40368d35d140a93b33ad";
let url = "https://newsapi.org/v2/everything";
let searchInput = document.getElementById("searchInput");
let newsContainer = document.getElementById("news-container");
let loading = document.getElementById("loading");
let languageSelect = document.getElementById("languageSelect");
let selectedLanguage = "en"; // default

// Display individual news card
function displayNewsData(data) {
  let div = document.createElement("div");
  div.classList.add("cart");

  let image = document.createElement("img");
  image.src = data.urlToImage;
  image.onerror = () => {
    image.src = "https://via.placeholder.com/400x200.png?text=No+Image";
  };
  div.appendChild(image);

  let h3 = document.createElement("h3");
  h3.innerText = data.author || "Unknown Author";
  h3.classList.add("author");
  div.appendChild(h3);

  let p = document.createElement("p");
  p.innerText = data.content ? data.content.slice(0, 150) + "..." : "No content available.";
  p.classList.add("content");
  div.appendChild(p);

  let date = document.createElement("p");
  date.innerText = "Published At: " + new Date(data.publishedAt).toLocaleString();
  date.style.fontStyle = "italic";
  date.style.padding = "0 10px";
  div.appendChild(date);

  let a = document.createElement("a");
  a.innerText = "View More";
  a.href = data.url;
  a.target = "_blank";
  div.appendChild(a);

  newsContainer.appendChild(div);
}

// Display all news
function allNewsData(data) {
  if (data.length === 0) {
    let noData = document.createElement("h1");
    noData.innerText = "NO DATA FOUND";
    newsContainer.appendChild(noData);
  } else {
    data.forEach(displayNewsData);
  }
}

// Fetch news data
async function fetchdata(search) {
  try {
    loading.style.display = "block";
    let response = await fetch(`${url}?q=${search}&language=${selectedLanguage}&apiKey=${apiKey}`);
    let jsonData = await response.json();
    loading.style.display = "none";

    jsonData.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    allNewsData(jsonData.articles);
  } catch (err) {
    console.log("Error:", err);
    loading.style.display = "none";
  }
}

// On page load
window.onload = () => {
  fetchdata("cinema");
};

// Search by Enter key
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    newsContainer.innerHTML = "";
    fetchdata(searchInput.value);
    searchInput.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// Fetch by category button
function fetchCategory(category) {
  newsContainer.innerHTML = "";
  fetchdata(category);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Dark mode toggle
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Language change event
languageSelect.addEventListener("change", () => {
  selectedLanguage = languageSelect.value;
  newsContainer.innerHTML = "";
  fetchdata("cinema"); // Default topic refresh
  window.scrollTo({ top: 0, behavior: "smooth" });
});
