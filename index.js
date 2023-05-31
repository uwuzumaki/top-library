let library = [];

const container = document.querySelector(".container-wrapper");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read === "read" ? true : false;
  this.info = () => {
    return `${title} by ${author} has ${pages}. Read status: ${read}`;
  };
  this.statusChange = function () {
    this.read = !this.read;
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.remove();
    });
    showBooks();
  };
}

const addBook = (title, author, pages, read) => {
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
};

const changeReadStatus = (e) => {
  const bookIndex = e.target.id.slice(-1);
  // library[bookIndex].statusChange();
  library[bookIndex].statusChange();
};

const removeBook = (e) => {
  library.splice(e.target.id.slice(-1), 1);
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.remove();
  });
  showBooks();
};

const showBooks = () => {
  for (let i = 0; i < library.length; i++) {
    const card = document.createElement("div");
    card.classList = "card";
    container.appendChild(card);
    const titleDiv = document.createElement("div");
    titleDiv.classList = "title-div card-content";
    titleDiv.innerHTML = `${library[i].title}`;
    card.appendChild(titleDiv);
    const authorDiv = document.createElement("div");
    authorDiv.classList = "author-div card-content";
    authorDiv.innerHTML = `${library[i].author}`;
    card.appendChild(authorDiv);
    const pagesDiv = document.createElement("div");
    pagesDiv.classList = "pages-div card-content";
    pagesDiv.innerHTML = `Pages: ${library[i].pages}`;
    card.appendChild(pagesDiv);
    const readDiv = document.createElement("div");
    readDiv.classList = "read-div card-content";
    readDiv.innerHTML = `${library[i].read ? "Read" : "Not Read"}`;
    card.appendChild(readDiv);
    const readButton = document.createElement("button");
    readButton.id = `readButton${i}`;
    readButton.innerHTML = `Change status`;
    readButton.classList = "read-button";
    readButton.addEventListener("click", changeReadStatus);
    card.appendChild(readButton);
    const close = document.createElement("img");
    close.id = `closeButton${[i]}`;
    close.src = "assets/images/x-solid.svg";
    close.addEventListener("click", removeBook);
    close.classList = "close-button";
    card.appendChild(close);
  }
};

showBooks();

const addBookButton = () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "block";
};

const bookButton = document.querySelector(".add-book-button");
bookButton.addEventListener("click", addBookButton);

const bookSubmitButton = (e) => {
  e.preventDefault();
  let readSelected = "";

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementsByName("read-status");

  for (let i = 0; i < read.length; i++) {
    if (read[i].checked) {
      readSelected = read[i].id;
    }
  }

  addBook(title, author, pages, readSelected);
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.remove();
  });
  showBooks();
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  const submitButton = document.getElementById("form1");
  submitButton.reset();
};

//Constraint Validation API start
//Take note: the  event listener listens for a submit on the form ID, not
//the ID of the submit button. It also listens for a submit event and not
//a click event.
const submitButton = document.getElementById("form1");
submitButton.addEventListener("submit", bookSubmitButton);

const title2 = document.getElementById("title");
title2.addEventListener("input", (e) => {
  if (title2.validity.tooShort) {
    title2.setCustomValidity("Book title must be at least 5 characters long.");
  } else {
    title2.setCustomValidity("");
  }
});

const author2 = document.getElementById("author");
author2.addEventListener("input", (e) => {
  if (author2.validity.tooShort) {
    author2.setCustomValidity("Author must be at least 5 characters long.");
  } else {
    author2.setCustomValidity("");
  }
});

const pages2 = document.getElementById("pages");
pages2.addEventListener("input", (e) => {
  console.log(pages2.validity);
  if (pages2.validity.rangeOverflow) {
    pages2.setCustomValidity("Book page length must be below 5000 pages.");
  } else {
    pages2.setCustomValidity("");
  }
});

const modalClose = document.getElementById("form-close");
modalClose.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";

  const form = document.getElementById("form1");
  form.reset();
});
