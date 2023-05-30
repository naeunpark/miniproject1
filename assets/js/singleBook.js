async function getData() {
    /* Check page's single book id using url search and then find the correct single book among books */
    let url = new URLSearchParams(window.location.search);
    let urlId = url.get('id');

    // Get books data from LocalStorage by BOOK ID
    let books = await JSON.parse(localStorage.getItem("books"));

    return new Promise(function(resolve, reject) {
        resolve(books.find(book => book.id == urlId));
    })
}

class Book {
    constructor(book) {
        // console.log(book)
        this.id = book.id;
        this.title = book.title;
        this.image = book['formats']['image/jpeg'];
        this.author = book['authors'][0]['name'];
        this.languages = book['languages'];
        this.subjects = book['subjects'];
        this.bookshelves = book['bookshelves'];
    }

    display() {
        console.log(this.id)
        let singleBook = document.querySelector("#single-book");
        let imageContainer = singleBook.querySelector("#book-image");
        let detailsContainer = singleBook.querySelector("#book-details");
        let preview = singleBook.querySelector("#book-preview");

        let h1 = document.createElement('h1');
        let h3 = document.createElement('h3');
        let details = document.createElement('p');

        // 1) images
        imageContainer.style.backgroundImage = `url(${this.image})`

        // 2) title
        h1.innerText = `${this.title}`;

        // 3) Author
        h3.innerText = `Author: ${this.author}`;

        // 4) languages
        details.innerText = `Languages: ${this.languages.join()}`;

        // 5) book subjects
        this.subjects.forEach(subject => {
            let p = document.createElement('p');
            p.innerText = subject;
            preview.appendChild(p);
        });

        detailsContainer.appendChild(h1).appendChild(h3).appendChild(details);

        // 6) categories
        this.bookshelves.forEach(category => {
            let a = document.createElement('a');
            a.innerText = category;
            let trim = category.split(' ').join('').toLowerCase();
            a.href = `categories.html#${trim}`;
            a.classList.add("category")
            detailsContainer.appendChild(a);
        })
    }
}

getData().then((value) => {
    let selectedBook = new Book(value);
    selectedBook.display();
})