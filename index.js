const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
const upload=multer();
const jsonParser = bodyParser.json();

app.use(express.static("public"));

app.use(express.static("css"));

app.get("/", (request, response) => { 
  console.log(__dirname);
response.sendFile(`${__dirname}/views/index.html`);
});

app.get("/ex1.html", (request, response) => { 
 response.sendFile(`${__dirname}/views/ex1.html`);
});

app.post("/ex1.html", upload.array(), (request, response) => {
  console.log(request.body)
  const name = request.body.customername;
  const email = request.body.email;
  response.send(`${name}, Thank you for your order. We will keep you posted on delivery status at ${email}.`);
});




//get ex2.html
app.get("/ex2.html", (request, response) => { 
  response.sendFile(`${__dirname}/views/ex2.html`);
 });

//Handle ex2.html
 app.post("/ex2.html", jsonParser, (request, response) => {

  const name = request.body.name;
  const numberofCountries = request.body.countries.length;
  response.send(`Your name is ${name} and you visited ${numberofCountries} countries. Keep travelling!`)
}
);

 app.get("/ex3.html", (request, response) => { 
  response.sendFile(`${__dirname}/views/ex3.html`);
 });

articleArray = [];

app.post("/ex3", upload.array(), (request, response) => {
  contents = request.body;
  console.log(contents);

  articleArray.push(contents);
  articleID = articleArray.length;

  console.log(articleArray);

  const title = request.body.title;
  const content = request.body.content;
  response.send(`New article added successfully with title "${title}" and ID ${articleID}.`);

});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});