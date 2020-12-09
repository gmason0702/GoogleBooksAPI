const outputList = document.getElementById("list-output");
const searchButton = document.getElementById("search");
const searchBox = document.getElementById("search-box");
const dispBooks = document.getElementById("list-group");
const bookListId = document.getElementById("book-list");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const listGroupItem = document.querySelector("list-group-item");
const detailsCard = document.querySelector("card");
// const cardBody = document.querySelector("card-body");
const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const placeHolder =
  "https://voice.global/wp-content/plugins/wbb-publications/public/assets/img/placeholder.jpg";
let _maxResults = 10;
let _startIndex = 0;
let _totalResults = 0;

// nextBtn.addEventListener("click", nextPage);
// previousBtn.addEventListener("click", previousPage);
searchButton.addEventListener("click", submitSearch);
listGroupItem.addEventListener("mouseover", getDetails); // how to add an eventListener to an element that doesn't exist yet

// searchButton.addEventListener("keypress", function (e) {             //why not??
//   if (e.key === "Enter") {
//     submitSearch;
//   }
// });
let pageNumber = 0;

bookListId.style.visibility = "hidden";
detailsCard.style.visibility = "hidden";

function submitSearch(e) {
  fetchResults(e);
}

function fetchResults(e) {
  dispBooks.innerHTML = "";

  url = baseUrl + searchBox.value;
  console.log(url);

  fetch(url)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      //   console.log(json);
      displayResults(json);
      getDetails(json);
      //   createPagination(json);
    });
}

function displayResults(results) {
  const bookList = results.items;
  //   console.log(bookList);

  if (bookList.length != 0 || bookList.length != null) {
    bookListId.style.visibility = "visible";
  }
  if (bookList.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No results found.";
    bookList.appendChild(para);
  }

  for (let i = 0; i < bookList.length; i++) {
    const book = document.createElement("li");

    const current = bookList[i];
    console.log(current);
    book.innerHTML = `<li class = "list-group-item"> ${current.volumeInfo.title}</li>`;
    console.log(book);
    dispBooks.appendChild(book);
  }
}

function getDetails(results) {
  const bookList = results.items;
  const cardInfo = document.createElement("div");
  const bookImage = document.createElement("img");
  const cardTitle = document.createElement("h5");
  const cardBlurb = document.createElement("p");
  const previewBtn = document.createElement("a");

  for (let i = 0; i < bookList.length; i++) {
    const current = bookList[i];

    if (current.volumeInfo.imageLinks.smallThumbnail != null) {
      bookImage.innerHTML = `<img class="card-img-top" src="${current.volumeInfo.imageLinks.smallThumbnail}" alt="${placeHolder}">`;
    } else {
      bookImage.src = placeHolder;
      bookImage.alt = placeHolder;
    }

    cardInfo.innerHTML = `<div class="card-body">`;
    bookImage.innerHTML = `<img class="card-img-top" src="${current.volumeInfo.imageLinks.smallThumbnail}" alt="${placeHolder}">`;
    cardTitle.innerHTML = `<h5 class="card-title">${current.volumeInfo.title}</h5>`;
    cardBlurb.innerHTML = `<p class="card-text">${current.volumeInfo.description}</p>`;
    previewBtn.innerHTML = ` <a href="${current.volumeInfo.previewLink}" class="btn btn-primary">Book Preview</a>`;
    console.log(cardTitle);
    console.log(cardBlurb);
    console.log(bookImage);
    detailsCard.appendChild(cardInfo);
    detailsCard.appendChild(bookImage);
    cardInfo.appendChild(cardTitle);
    cardInfo.appendChild(cardBlurb);
    cardInfo.appendChild(previewBtn);
  }
}
// function createPagination(json) {
//   if (_startIndex == 0 && _totalResults > _maxResults) {
//     let _previousIndex = _startIndex;
//     _startIndex = _startIndex + _maxResults;

//     //unfinished
//   }
// }
