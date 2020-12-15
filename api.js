const outputList = document.getElementById("list-output");
const searchButton = document.getElementById("search");
const searchBox = document.getElementById("search-box");
const dispBooks = document.getElementById("list-group");
const bookListId = document.getElementById("book-list");
const cardRow = document.getElementById("card__row");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const detailsCard = document.querySelector(".card");
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

searchButton.addEventListener("keypress", function (e) {
  //why not??
  if (e.key === "Enter") {
    submitSearch;
  }
});
let pageNumber = 0;

bookListId.style.visibility = "hidden";
detailsCard.style.visibility = "hidden";
//detailsCard.style.visibility = "hidden";

function submitSearch(e) {
  fetchResults(e);
}

function fetchResults(e) {
  // dispBooks.innerHTML = "";
  detailsCard.innerHTML = "";

  url = baseUrl + searchBox.value;

  fetch(url)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      console.log(json);
      displayResults(json);
      //   createPagination(json);
    });
}

function displayResults(results) {
  //REFRESHING PAGE EACH SEARCH CLICK
  while (dispBooks.firstChild) {
    dispBooks.removeChild(dispBooks.firstChild);
  }
  const bookList = results.items;

  //CHANGING VISIBILITY OF UL ELEMENT BASED ON RETURN VALUE
  if (bookList.length != 0 || bookList.length != null) {
    bookListId.style.visibility = "visible";
  }
  if (bookList.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No results found.";
    bookList.appendChild(para);
  }

  for (let i = 0; i < bookList.length; i++) {
    const detailsCard = document.querySelector(".card");

    //CREATING ADDITIONAL CARD DIVS TO HOLD EACH CARD DETAIL....OR SHOULD I ONLY NEED ONE AND JUST CONDITIONAL RETURN?
    // const additionalDivs = document.createElement("div");
    // outputList.insertAdjacentElement("beforeend", additionalDivs);
    // additionalDivs.classList.add("card");
    // additionalDivs.style.width = "18em";

    // bookList.forEach(() => {
    //   cardRow.appendChild(detailsCard);
    // });
    // cardRow.appendChild(detailsCard);

    //CREATING AND APPENDING CARD INFORMATION
    const bookImage = document.createElement("img");
    bookImage.classList.add("card-img-top");
    // detailsCard.appendChild(bookImage);

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-body");
    // detailsCard.appendChild(cardInfo);

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");

    const cardAuthor = document.createElement("h6");
    cardAuthor.classList.add("card-author");
    // cardInfo.appendChild(cardTitle);

    const cardBlurb = document.createElement("p");
    cardBlurb.classList.add("card-text");
    // cardInfo.appendChild(cardBlurb);

    const previewBtn = document.createElement("a");
    previewBtn.classList.add("btn", "btn-primary");
    // cardInfo.appendChild(previewBtn);

    //CREATING LIST ITEMS
    const book = document.createElement("li");
    const current = bookList[i];
    //console.log(current);

    book.classList.add("list-group-item");
    book.innerHTML = current.volumeInfo.title;
    dispBooks.appendChild(book);

    //TRYING TO GET EACH LI ELEMENT ON CLICK
    for (let i = 0; i < book.length; i++) {
      book.onclick = function () {
        console.log(book);
      };
    }
    book.onclick = function () {
      if (book.innerHTML == cardTitle.innerHTML) {
        detailsCard.appendChild(bookImage);
        detailsCard.appendChild(cardInfo);
        cardInfo.appendChild(cardTitle);
        cardInfo.appendChild(cardAuthor);
        cardInfo.appendChild(cardBlurb);
        cardInfo.appendChild(previewBtn);
      }
      console.log(book);
    };

    //CHECKING IF BOOK HAS AN IMAGE, RETURNING PLACEHOLDER IF NOT
    if (current.volumeInfo.imageLinks.smallThumbnail != null) {
      bookImage.src = `${current.volumeInfo.imageLinks.smallThumbnail}`;
      bookImage.alt = placeHolder;
    } else {
      bookImage.src.innerHTML = placeHolder; //might not need the .innerHTML
      bookImage.alt.innerHTML = placeHolder;
    }
    cardTitle.innerHTML = `${current.volumeInfo.title}`;
    cardAuthor.innerHTML = `By   ${current.volumeInfo.authors}`;
    cardBlurb.innerHTML = `${current.volumeInfo.description}`;
    // previousBtn.innerText = ??
    previewBtn.href = current.volumeInfo.previewLink;
    previewBtn.setAttribute("target", "_blank");
    previewBtn.textContent = "Preview this book";
    let maxLength = 200;
    if (cardBlurb.innerHTML.length > maxLength) {
      cardBlurb.innerHTML = cardBlurb.innerHTML
        .slice(0, maxLength)
        .concat("...");
    }

    // console.log(book);
    // console.log(cardTitle);
    // console.log(cardBlurb);
    // console.log(bookImage);
    book.addEventListener("click", function () {
      if (bookList.length > 0) {
        detailsCard.style.visibility = "visible";
      } // how to add an eventListener to an element that doesn't exist yet
    });
    // book.addEventListener("mouseover", function () {
    //   if (bookList.length > 0) {
    //     detailsCard.style.visibility = "visible";
    //   }
    // });
    // book.addEventListener("mouseout", function () {
    //   if (bookList.length > 0) {
    //     detailsCard.style.visibility = "hidden";
    //   }
    // });
  }
  // let listGroupItem = dispBooks.getElementsByClassName("list-group-item");       //would like to use this to help with getting individual card

  // for (let l = 0; l < listGroupItem.length; l++) {
  //   listGroupItem[0].addEventListener("click", function () {
  //     let currentLI = document.getElementsByClassName("active");

  //     if (currentLi.length > 0) {
  //       currentLI[0].className = currentLI[0].className.replace(" active", "");
  //     }
  //     this.className += " active";
  //   });
  // }

  // const bookList = results.items;
  console.log(bookList);
}

// function createPagination(json) {
//   if (_startIndex == 0 && _totalResults > _maxResults) {
//     let _previousIndex = _startIndex;
//     _startIndex = _startIndex + _maxResults;

// for (var i = 0, len = g.children.length; i < len; i++)
// {

//     (function(index){
//         g.children[i].onclick = function(){
//               alert(index)  ;
//         }
//     })(i);
