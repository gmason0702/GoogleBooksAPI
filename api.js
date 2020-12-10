const outputList = document.getElementById("list-output");
const searchButton = document.getElementById("search");
const searchBox = document.getElementById("search-box");
const dispBooks = document.getElementById("list-group");
const bookListId = document.getElementById("book-list");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const detailsCard = document.querySelector("card");
//const cardBody = document.querySelector("card-body");
const listGroupItem = document.querySelector("list-group-item");

const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const placeHolder =
  "https://voice.global/wp-content/plugins/wbb-publications/public/assets/img/placeholder.jpg";
let _maxResults = 10;
let _startIndex = 0;
let _totalResults = 0;

// nextBtn.addEventListener("click", nextPage);
// previousBtn.addEventListener("click", previousPage);
searchButton.addEventListener("click", submitSearch);
listGroupItem.addEventListener("mouseover", getDetails); // how to add an eventListener to an element that doesn't exist yet?

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
      console.log(json);
      displayResults(json);
      getDetails(json);
      //   createPagination(json);
    });
  // .then(function (details) {
  //   console.log(details);
  //   getDetails(details);
  // });
}

function displayResults(results) {
  const bookList = results.items;
  //console.log(bookList);

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
    //console.log(current);

    book.classList.add("list-group-item");
    book.innerHTML = current.volumeInfo.title;
    console.log(book);
    dispBooks.appendChild(book);
  }
  //   const listGroupItem = document.querySelector("list-group-item");
  //   listGroupItem.addEventListener("mouseover", getDetails); // how to add an eventListener to an element that doesn't exist yet
  //   getDetails(results);
}

function getDetails(results) {
  //   const listGroupItem = document.querySelector("list-group-item");
  //   listGroupItem.addEventListener("mouseover", getDetails); // how to add an eventListener to an element that doesn't exist yet?

  const bookList = results.items;
  console.log(bookList);

  const cardInfo = document.createElement("div");
  //   cardInfo.className.add("card-body");

  const bookImage = document.createElement("img");
  //   bookImage.className.add("card-img-top");

  const cardTitle = document.createElement("h5");
  //   cardTitle.className.add("card-title");

  const cardBlurb = document.createElement("p");
  //   cardBlurb.className.add("card-text");

  const previewBtn = document.createElement("a");
  //   previewBtn.classList.add("btn", "btn-primary");

  for (let i = 0; i < bookList.length; i++) {
    const current = bookList[i];
    cardInfo.classList.add("card-body");
    bookImage.classList.add("card-img-top");
    cardTitle.classList.add("card-title");
    cardBlurb.classList.add("card-text");
    previewBtn.classList.add("btn", "btn-primary");

    if (current.volumeInfo.imageLinks.smallThumbnail != null) {
      bookImage.src.innerHTML = `${current.volumeInfo.imageLinks.smallThumbnail}`;
      bookImage.alt.innerHTML = placeHolder;
    } else {
      bookImage.src.innerHTML = placeHolder; //might not need the .innerHTML
      bookImage.alt.innerHTML = placeHolder;
    }

    cardTitle.innerHTML = `${current.volumeInfo.title}`;
    cardBlurb.innerHTML = `${current.volumeInfo.description}`;
    previewBtn.innerHTML = `${current.volumeInfo.previewLink}`;

    // if (current.volumeInfo.imageLinks.smallThumbnail != null) {
    //   bookImage.innerHTML = `<img class="card-img-top" src="${current.volumeInfo.imageLinks.smallThumbnail}" alt="${placeHolder}">`;
    // } else {
    //   bookImage.src = placeHolder;
    //   bookImage.alt = placeHolder;
    // }

    // cardInfo.innerHTML = `<div class="card-body">`;
    // bookImage.innerHTML = `<img class="card-img-top" src="${current.volumeInfo.imageLinks.smallThumbnail}" alt="${placeHolder}">`;
    // cardTitle.innerHTML = `<h5 class="card-title">${current.volumeInfo.title}</h5>`;
    // cardBlurb.innerHTML = `<p class="card-text">${current.volumeInfo.description}</p>`;
    // previewBtn.innerHTML = ` <a href="${current.volumeInfo.previewLink}" class="btn btn-primary">Book Preview</a>`;
    console.log(cardTitle);
    console.log(cardBlurb);
    console.log(bookImage);
  }
  detailsCard.appendChild(cardInfo);
  detailsCard.appendChild(bookImage);
  cardInfo.appendChild(cardTitle);
  cardInfo.appendChild(cardBlurb);
  cardInfo.appendChild(previewBtn);
}
// function createPagination(json) {
//   if (_startIndex == 0 && _totalResults > _maxResults) {
//     let _previousIndex = _startIndex;
//     _startIndex = _startIndex + _maxResults;

//     //unfinished
//   }
// }
