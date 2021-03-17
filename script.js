const getBooks = ()=> {
    let name = [];
    let authors = [];
    let numberOfPages = [];
    let country = [];
    let released = [];
    $('.container').empty();
    fetch(`https://www.anapioficeandfire.com/api/books`, {
        method: 'GET',
        pageSize: '30'
    }).then(response => {
        if(response.status !== 200) {
            console.log(`We have some errors ${response.status}`);
            return;
        }
        response.json().then(books => {
            books.map(book => {
                name.push(book.name);
                authors.push(book.authors[0]);
                numberOfPages.push(book.numberOfPages);
                country.push(book.country);
                let d = new Date(book.released);
                let date = d.toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                released.push(date);
                
            })
            console.log(name,authors,numberOfPages,country,released);
            for (let i = 0; i<books.length; i++){
                $('.container').append(`<div class='card'><div id='card${i}'></div><h1>${name[i]}</h1><p>${authors[i]}</p><p># of Pages: ${numberOfPages[i]}</p><p>Country of release: ${country[i]}</p><p>Published on: ${released[i]}</p></div>`)
            }
            
        }).catch(err => {
            console.log(`We have some error ${err}`)
        })
    })
}
