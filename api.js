const outputList = document.getElementById("list-output");
const searchButton = document.getElementById("search");
const searchBox = document.getElementById("search-box");
const dispBooks = document.getElementById("list-group");
const bookListId = document.getElementById("book-list");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const detailsCard = document.querySelector("card");
//const cardBody = document.querySelector("card-body");
// const listGroupItem = document.querySelector("list-group-item");

const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const placeHolder =
  "https://voice.global/wp-content/plugins/wbb-publications/public/assets/img/placeholder.jpg";
let _maxResults = 10;
let _startIndex = 0;
let _totalResults = 0;

// nextBtn.addEventListener("click", nextPage);
// previousBtn.addEventListener("click", previousPage);
searchButton.addEventListener("click", submitSearch);
//listGroupItem.addEventListener("mouseover", getDetails);          // how to add an eventListener to an element that doesn't exist yet?

searchButton.addEventListener("keypress", function (e) {
  //why not??
  if (e.key === "Enter") {
    submitSearch;
  }
});
let pageNumber = 0;

bookListId.style.visibility = "hidden";
//detailsCard.style.visibility = "hidden";

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
      //getDetails(json);
      //   createPagination(json);
    });
  // .then(function (details) {
  //   console.log(details);
  //   getDetails(details);
  // });
}

async function displayResults(results) {
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
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-body");

  const bookImage = document.createElement("img");
  bookImage.classList.add("card-img-top");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");

  const cardBlurb = document.createElement("p");
  cardBlurb.classList.add("card-text");

  const previewBtn = document.createElement("a");
  previewBtn.classList.add("btn", "btn-primary");

  for (let i = 0; i < bookList.length; i++) {
    const book = document.createElement("li");
    const current = bookList[i];
    //console.log(current);

    book.classList.add("list-group-item");
    book.innerHTML = current.volumeInfo.title;
    let listGroupItem = document.querySelector(".list-group-item");
    for (let j = 0; j < 11; j++) {
      if (current.volumeInfo.imageLinks.smallThumbnail != null) {
        bookImage.src = `${current.volumeInfo.imageLinks.smallThumbnail}`;
        bookImage.alt = placeHolder;
      } else {
        bookImage.src.innerHTML = placeHolder; //might not need the .innerHTML
        bookImage.alt.innerHTML = placeHolder;
      }

      cardTitle.innerHTML = `${current.volumeInfo.title}`;
      cardBlurb.innerHTML = `${current.volumeInfo.description}`;
      previewBtn.innerHTML = `${current.volumeInfo.previewLink}`;
      console.log(cardTitle);
      console.log(cardBlurb);
      console.log(bookImage);
    }
    console.log(book);
  }
  dispBooks.appendChild(book);
  await listGroupItem.addEventListener("mouseover", function (e) {
    if (e.target && e.target.matches("li.list-group-item")) {
      listGroupItem.style.visibility = "visible";
    } // how to add an eventListener to an element that doesn't exist yet
  });
  detailsCard.appendChild(cardInfo);
  detailsCard.appendChild(bookImage);
  cardInfo.appendChild(cardTitle);
  cardInfo.appendChild(cardBlurb);
  cardInfo.appendChild(previewBtn);

  // const bookList = results.items;
  console.log(bookList);
}

// function getDetails(results) {
//   //   const listGroupItem = document.querySelector("list-group-item");
//   //   listGroupItem.addEventListener("mouseover", getDetails); // how to add an eventListener to an element that doesn't exist yet?
// }
// function createPagination(json) {
//   if (_startIndex == 0 && _totalResults > _maxResults) {
//     let _previousIndex = _startIndex;
//     _startIndex = _startIndex + _maxResults;

//     //unfinished
//   }
// }
