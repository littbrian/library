const myLibrary = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.printBook = function() {
        return (name + " by " + author + ", " + pages + " pages, " + read);
    }
    this.toggleReadStatus = function() {
        this.read = this.read === "Read" ? "Not read yet" : "Read";
    }
}

function addBookToLibrary(name, author, pages, read) {
    const newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook);
}

function removeBook(index) {
    myLibrary.splice(index, 1);
}

function displayBooks() {
    const bookTableBody = document.getElementById("bookTableBody");
    bookTableBody.innerHTML = ""; // Clear the existing content

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const row = document.createElement("tr");

        const titleCell = document.createElement("td");
        titleCell.textContent = book.name;
        row.appendChild(titleCell);

        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;
        row.appendChild(authorCell);

        const pagesCell = document.createElement("td");
        pagesCell.textContent = book.pages;
        row.appendChild(pagesCell);

        const readCell = document.createElement("td");
        readCell.textContent = book.read;
        row.appendChild(readCell);

        const actionsCell = document.createElement("td");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            removeBook(i);
            displayBooks();
        });
        actionsCell.appendChild(removeButton);

        const toggleButton = document.createElement("button");
        toggleButton.textContent = "Toggle Read";
        toggleButton.addEventListener("click", () => {
            book.toggleReadStatus();
            displayBooks();
        });
        actionsCell.appendChild(toggleButton);

        row.appendChild(actionsCell);

        bookTableBody.appendChild(row);
    }
}

const newBookButton = document.getElementById("newBookButton");
const newBookForm = document.getElementById("newBookForm");
const addBookButton = document.getElementById("addBookButton");

newBookButton.addEventListener("click", () => {
    newBookForm.style.display = "block";
});

addBookButton.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").checked ? "Read" : "Not read";

    addBookToLibrary(title, author, pages, read);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
    newBookForm.style.display = "none";

    displayBooks();
});

displayBooks();
