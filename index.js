let library = [
  { title: "harry Potter", author: "jkr", pages: 420, read: "read" },
  { title: "harry Potter2", author: "jkr2", pages: 42069, read: "not read" },
];

const container = document.querySelector(".container-wrapper");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${title} by ${author} has ${pages}. Read status: ${read}`;
  };
}

const addBook = (title, author, pages, read) => {
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
};

const showBooks = () => {
  for (let i = 0; i < library.length; i++) {
    const card = document.createElement("div");
    card.classList = "card";
    container.appendChild(card);
    const titleDiv = document.createElement("div");
    titleDiv.classList = "title-div";
    titleDiv.innerHTML = `${library[i].title}`;
    card.appendChild(titleDiv);
    const authorDiv = document.createElement("div");
    authorDiv.classList = "author-div";
    authorDiv.innerHTML = `${library[i].author}`;
    card.appendChild(authorDiv);
    const pagesDiv = document.createElement("div");
    pagesDiv.classList = "pages-div";
    pagesDiv.innerHTML = `Pages: ${library[i].pages}`;
    card.appendChild(pagesDiv);
    const readDiv = document.createElement("div");
    readDiv.classList = "read-div";
    readDiv.innerHTML = `Read: ${library[i].read}`;
    card.appendChild(readDiv);
    const readButton = document.createElement("button");
    readButton.innerHTML = "Read";
    readButton.classList = "read-button";
    card.appendChild(readButton);
    const close = document.createElement("img");
    close.src = "assets/images/x-solid.svg";
    close.classList = "close-button";
    card.appendChild(close);
  }
};

showBooks();

const removeBook = (e) => {
  console.log(e);
};

const closeButton = document.querySelectorAll(".close-button");
let closeButtonArr = Array.from(closeButton);
closeButtonArr.forEach((button) => {
  button.addEventListener("click", removeBook);
});

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
};

const submitButton = document.getElementById("book-submit-button");
submitButton.addEventListener("click", bookSubmitButton);
