let categories = [];
let categoriesContainer = document.querySelector("#categoriesContainer");
let booksContainer = document.querySelector("#book-container");
let books;

function dataFetchByCategory() {
    categories.forEach(category => {
        let template = document.querySelector("template").content.cloneNode(true);
        let categoryBookContainer = template.querySelector('.books');
        let div = template.querySelector("div");
        let h1 = template.querySelector("h1");

        div.id = category.split(' ').join('').toLowerCase();
        h1.innerText = category;
        let categorizedBooks = books.filter(book => book['bookshelves'].includes(category));

        categorizedBooks.forEach(book => {
            let div = document.createElement('div');
            let a = document.createElement('a');
            let image = new Image();

            a.href = `/book.html?id=${book.id}`;
            image.src = book['formats']['image/jpeg'];

            div.classList.add("mb-5", "book");
            a.classList.add("w-100", "h-100");
            a.appendChild(image);
            div.appendChild(a);
            categoryBookContainer.appendChild(div)
        })
        booksContainer.appendChild(template);
    })
}

async function getData() {
    books = await JSON.parse(localStorage.getItem("books"));

    return new Promise(function(resolve, reject) {
        resolve(books);
    })
}

function findCategory(cat) {
    if (!categories.includes(cat))
        categories.push(cat);
}

function getCategory(datas) {
    datas.forEach(book => {
        let categories = book.bookshelves;
        categories.forEach(category => findCategory(category))

    });
    categories.forEach(category => {
        let a = document.createElement('a');
        a.innerText = category;
        let trim = category.split(' ').join('').toLowerCase();
        a.href = `#${trim}`;
        categoriesContainer.appendChild(a);
    })
}

getData()
    .then((datas) => getCategory(datas))
    .then(() => dataFetchByCategory())