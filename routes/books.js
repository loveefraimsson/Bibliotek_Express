var express = require('express');
var router = express.Router();

let books = [
  {title: "De vilda djurens flykt", author: "Kalle Pettersson", pages: 341, rented: false},
  {title: "Facklan", author: "John Nilsson", pages: 203, rented: false},
  {title: "Skoldpaddan som rymde", author: "Per Svensson", pages: 125, rented: false},
  {title: "Molnen pa himlen", author: "Peter Holmgren", pages: 521, rented: true}
];

/* GET users listing. */

//PRINTAR UT ALLA BÖCKER I ARRAYEN + LÄNK TILL ATT LÄGGA TILL NY BOK I /BOOKS
router.get('/', function(req, res, next) {
  let printBooks = `<section><h2>Böcker i biblioteket</h2><ul>`;

  for(book in books) {
    printBooks += `<li><a href="/books/book/${books[book].title}">${books[book].title}</a>  -  ${ (books[book].rented) ? "Utlånad" : "Finns att låna" }</li>`;
  }
  printBooks += `</ul><a href="/books/add">Klicka här för att lägga till en ny bok i biblioteket</a></section>`;

  res.send(printBooks);
});

router.get("/book/:title", function(req, res){

  let showBookTitle = req.params.title;
  console.log("Visa bok", showBookTitle);
  let showBook = books.find( ({title}) => title == showBookTitle);
  console.log(showBook);

  let printInfo = `<h3>${showBook.title}</h3>
                    <p>Författare: ${showBook.author}</p>
                    <p>Antal sidor: ${showBook.pages}</p>
                    <p>${ (showBook.rented) ? "Utlånad" : "<a href='/books/rent/" + req.params.title + "'><button>Finns att låna</button></a>" }</p>`;

  res.send(printInfo);
  
});

router.get("/rent/:title", function(req, res) {
  let rentTitle = req.params.title;
  let findBook = books.find( ({title}) => title == rentTitle);

  findBook.rented = true;

  res.redirect("/books");
})



//PRINTAR UT FORMULÄR FÖR ATT LÄGGA TILL NY BOK I /BOOKS/ADD
router.get("/add", function(req, res) {
  let addForm = `<section><h2>Lägg till en ny bok</h2>
                <form action="/books/add" method="post">
                Namn på boken: <input type="text" name="title"><br>
                Författare: <input type="text" name="author"><br>
                Antal sidor: <input type="text" name="pages"><br>
                <button type="submit">Spara</button>
                `
                res.send(addForm);
});


//LÄGGER TILL NY BOK FRÅN FORMULÄRET, IN I ARRAYEN OCH TAR EN SEDAN TILLBAKA TILL BOK-SIDAN
router.post("/add", function(req, res) {
  console.log(req.body);

  let newBook = {title: req.body.title, author: req.body.author, pages: req.body.pages, rented: false}
  
  books.push(newBook);

  res.redirect("/books");
})




module.exports = router;
