const outputList = document.getElementById("list-output");
const searchButton = document.getElementById("search");
const searchBox = document.getElementById("search-box");
const dispBooks = document.getElementById("list-group");
const bookListId = document.getElementById("book-list");
const cardRow = document.getElementById("card__row");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const detailsCard = document.querySelector(".card");
const navigation = document.getElementById("pagination");
const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const placeHolder =
  "https://voice.global/wp-content/plugins/wbb-publications/public/assets/img/placeholder.jpg";
let maxResults = 10;
let startIndex = 0;
let totalResults = 0;
const index = `&startIndex=${startIndex}`;

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

function submitSearch(e) {
  fetchResults(e);
  detailsCard.style.visibility = "hidden";
}

function fetchResults(e) {
  // dispBooks.innerHTML = "";
  detailsCard.innerHTML = "";

  url = baseUrl + searchBox.value + index;
  console.log(url);
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
  detailsCard.innerHTML = "";

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

    //CREATING CARD INFORMATION
    const bookImage = document.createElement("img");
    bookImage.classList.add("card-img-top");

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");

    const cardAuthor = document.createElement("h6");
    cardAuthor.classList.add("card-author");

    const cardBlurb = document.createElement("p");
    cardBlurb.classList.add("card-text");

    const previewBtn = document.createElement("a");
    previewBtn.classList.add("btn", "btn-primary");

    //CREATING LIST ITEMS
    const book = document.createElement("li");
    const current = bookList[i];

    book.classList.add("list-group-item");
    book.innerHTML = current.volumeInfo.title;
    dispBooks.appendChild(book);

    //TGET EACH LI ELEMENT ON CLICK
    book.onclick = function () {
      if (book.innerHTML == cardTitle.innerHTML) {
        detailsCard.innerHTML = "";

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
  }
}

// nextBtn.addEventListener("click", nextPage);
// previousBtn.addEventListener("click", previousPage);

// if (startIndex === 0) {
//   navigation.style.display = "block";
//   nextBtn.style.display = "block";
//   previousBtn.style.visibility = "hidden";
// }

// function nextPage(e) {
//   startIndex++;
//   fetchResults(e);
// }
// function previousPage() {
//   if (startIndex > 0) {
//     startIndex--;
//   } else {
//     return;
//   }
//   fetchResults(e);
// }

//CREATING ADDITIONAL CARD DIVS TO HOLD EACH CARD DETAIL....OR SHOULD I ONLY NEED ONE AND JUST CONDITIONAL RETURN?
// const additionalDivs = document.createElement("div");
// outputList.insertAdjacentElement("beforeend", additionalDivs);
// additionalDivs.classList.add("card");
// additionalDivs.style.width = "18em";

// bookList.forEach(() => {
//   cardRow.appendChild(detailsCard);
// });
// cardRow.appendChild(detailsCard);

// for (let i = 0; i < book.length; i++) {
//   book.onclick = function () {
//     console.log(book);
//   };
// }

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

// if (startIndex === 0) {
//   navigation.style.display = "block";
//   nextBtn.style.display = "block";
//   previousBtn.style.display = "none";
// } else if (startIndex > 0) {
//   previousBtn.style.display = "block";
//   nextBtn.stye.display = "block";
// } else {
//   nextBtn.style.display = "none";
//   previousBtn.style.display = "block";
//   navigation.style.display = "block";
// }
