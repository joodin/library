function Book(title, author, pages, read) {

    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        let output = `${this.title} <br> by ${this.author}<br> ${this.pages} pages<br> `;
        if (this.read) {
            output += `already read`
        } else {
            output += `not read yet`
        }
        return output
    }

}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
}



let myLibrary = [];

let hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
let lotr = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1000, false);
let got = new Book('A Game of Thrones', 'George R.R. Martin', 687, false);

myLibrary.push(hobbit);
myLibrary.push(lotr);
myLibrary.push(got);

function bookForm() {
    let title = prompt("What is the title of the book?");
    let author = prompt("Who wrote that book?");
    let pages = prompt("How many pages does it have?");
    let read = prompt("Have you read it? (yes/no)");
    let bookRead = (read.toLowerCase() == 'yes')
    addBookToLibrary(title, author, pages, bookRead);
    render();
}

function render() {
    let newBook = document.querySelector("#newBook");
    newBook.onclick = bookForm;
    let lib = document.querySelector("#library");
    lib.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        
        let newBook = document.createElement("div");
        newBook.setAttribute("id", i);
        newBook.classList.add('book')        
        
        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = book.title;

        const author = document.createElement("div");
        author.classList.add("author");
        author.textContent = book.author;

        const pages = document.createElement("div");
        pages.classList.add("pages");
        pages.textContent = book.pages + ' pages';

        const read = document.createElement("div");
        read.classList.add("read");
        read.textContent = book.read ? 'Read' : 'Not Read';

        const optionBar = document.createElement("div");
        optionBar.classList.add("optionBar")

        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("delete");
        deleteBtn.classList.add("disable-select");
        deleteBtn.textContent = "\u2715";

        const readBtn = document.createElement("div");
        readBtn.classList.add("toggleRead");
        readBtn.classList.add("disable-select");
        readBtn.textContent = "Toggle read";

        optionBar.appendChild(readBtn);
        optionBar.appendChild(deleteBtn);

        newBook.appendChild(optionBar);
        newBook.appendChild(title);
        newBook.appendChild(author);
        newBook.appendChild(pages);
        newBook.appendChild(read);


        lib.appendChild(newBook);
    }
    let toggleReadBtns = document.querySelectorAll(".toggleRead");
    for (btn of toggleReadBtns) {
        btn.addEventListener('click', function(e) {
            let libraryIndex = e.target.parentNode.parentNode.id;
            myLibrary[libraryIndex].read = !myLibrary[libraryIndex].read;
            render();
        });
    }

    let deleteBtns = document.querySelectorAll(".delete");
    for (btn of deleteBtns) {
        btn.addEventListener('click', function(e) {
            let libraryIndex = e.target.parentNode.parentNode.id;
            myLibrary.splice(libraryIndex, 1);
            render();
        });
    }
}

render();
console.log(hobbit.info());