const bestseller = document.querySelector('#bestseller');
const popularBook = [];

async function limitedDataFetch(books) {
    let limit = 8;
    for (i = 0; i < limit; i++) {
        let book = books[i];
        let template = document.querySelector('template').content.cloneNode(true);
        let image = template.querySelector('img');
        let link = template.querySelector('a');

        image.src = book['formats']['image/jpeg'];
        link.href = `book.html?id=${book['id']}`;
        bestseller.appendChild(template);
        popularBook.push(book);
    }
    return popularBook;
}

// CHART


function getChart(popularBook) {

    let chartDom = document.getElementById('main');
    let myChart = echarts.init(chartDom);
    let option;
    let names = popularBook.map(book => book.title);
    let downloadNum = popularBook.map(book => book.download_count);

    option = {
        title: {
            left: 'center',
            text: 'Bestseller books selected by number of downloads'
        },
        xAxis: {
            show: true,
            type: 'category',
            data: names,
            nameTextStyle: {
                fontSize: 1,
                overflow: 'break',
                ellipsis: '...'
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: downloadNum,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgb(231, 177, 10)'
            }
        }],
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0,
                color: 'rgb(76, 75, 22)' // color at 0%
            }, {
                offset: 1,
                color: 'rgb(137, 129, 33)' // color at 100%
            }],
            global: false // default is false
        }
    };
    console.log(option)
    option && myChart.setOption(option);
}

function getData() {
    if (localStorage.getItem('books')) {
        console.log('session');
        let books = JSON.parse(localStorage.getItem('books'));
        limitedDataFetch(books).then((value) => getChart(value));
    } else {
        console.log("fetch");
        fetch('https://gutendex.com/books/')
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('books', JSON.stringify(data.results))
            })
            .then(() => {
                let books = JSON.parse(localStorage.getItem('books'));
                limitedDataFetch(books)
            }).then((value) => getChart(value));
    }
}

window.addEventListener("load", getData);