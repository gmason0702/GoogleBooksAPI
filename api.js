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
  if (searchBox.value == "" || searchBox.value == null) {
    console.log(searchBox.value);
    alert("Oops! Please enter a valid search.");
  }
  startIndex = 0;
  fetchResults(e);
  detailsCard.style.visibility = "hidden";
}

function fetchResults(e) {
  detailsCard.innerHTML = "";
  const index = `&startIndex=${startIndex}`;
  console.log(index);
  url = baseUrl + searchBox.value + index;
  console.log(url);
  fetch(url)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      console.log(json);
      displayResults(json);
    });
}
nextBtn.addEventListener("click", nextPage);
previousBtn.addEventListener("click", previousPage);

function displayResults(results) {
  //REFRESHING PAGE EACH SEARCH CLICK
  while (dispBooks.firstChild) {
    dispBooks.removeChild(dispBooks.firstChild);
  }
  const bookList = results.items;
  detailsCard.innerHTML = "";

  if (startIndex === 0) {
    navigation.style.display = "inline-block";
    nextBtn.style.display = "inline-block";
    previousBtn.style.visibility = "hidden";
  } else if (startIndex > 0) {
    nextBtn.style.display = "inline-block";
    previousBtn.style.display = "inline-block";
    previousBtn.style.visibility = "visible";
  } else {
    navigation.style.display = "inline-block";
    nextBtn.style.visibility = "hidden";
    previousBtn.style.display = "inline-block";
  }
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
    previewBtn.id = "cardButton";

    //CREATING LIST ITEMS
    const book = document.createElement("li");
    const current = bookList[i];

    book.classList.add("list-group-item");
    book.innerHTML = current.volumeInfo.title;
    dispBooks.appendChild(book);

    //GET EACH LI ELEMENT ON CLICK
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
      bookImage.src.innerHTML = placeHolder;
      bookImage.alt.innerHTML = placeHolder;
    }
    cardTitle.innerHTML = `${current.volumeInfo.title}`;
    cardAuthor.innerHTML = `By   ${current.volumeInfo.authors}`;
    // cardBlurb.innerHTML = `${current.volumeInfo.description}`;

    if (current.volumeInfo.description == undefined) {
      cardBlurb.innerHTML = "No description available...";
      cardBlurb.style.marginTop = "3rem";
    } else {
      cardBlurb.innerHTML = `${current.volumeInfo.description}`;
    }
    previewBtn.href = current.volumeInfo.previewLink;
    previewBtn.setAttribute("target", "_blank");
    previewBtn.textContent = "Preview this book";

    let maxLength = 200;
    if (cardBlurb.innerHTML.length > maxLength) {
      cardBlurb.innerHTML = cardBlurb.innerHTML
        .slice(0, maxLength)
        .concat("...");
    }

    book.addEventListener("click", function () {
      if (bookList.length > 0) {
        detailsCard.style.visibility = "visible";
      }
    });
  }
}

function nextPage(e) {
  detailsCard.style.visibility = "hidden";
  startIndex++;
  fetchResults(e);
}
function previousPage(e) {
  detailsCard.style.visibility = "hidden";
  if (startIndex > 0) {
    startIndex--;
    // console.log(startIndex);
  } else {
  }
  fetchResults(e);
}

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
