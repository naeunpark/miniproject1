let input = document.querySelector('input');
let url = new URLSearchParams(window.location.search);
let keyword = url.get('search');
let searchResults = document.querySelector("#searchResults");

input.value = keyword

function dataFetch(books) {
    if (typeof(books) !== 'string') {
        books.forEach(book => {
            let template = document.querySelector('template').content.cloneNode(true);
            let image = template.querySelector('img');
            let link = template.querySelector('a');

            image.src = book['formats']['image/jpeg'];
            link.href = `book.html?id=${book['id']}`;
            searchResults.appendChild(template);
        })
    }
}

async function getData() {
    let books = await JSON.parse(localStorage.getItem("books"));

    return new Promise(function(resolve, reject) {
        resolve(books);
    })
}

function getBooksByKeyword(datas) {
    if (keyword == '' || keyword == null) {
        return searchResults.innerText = "Please type the keyword."
    }
    let results = datas.filter(book => {
        if (book.title.includes(keyword) || book['authors'][0]['name'].includes(keyword)) {
            return book;
        }
    })
    return results;
}

let books = getData();
books.then((data) => getBooksByKeyword(data)).then((value) => dataFetch(value))