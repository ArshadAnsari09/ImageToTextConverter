//express is the framework of node.js that brings more functionality 
const express = require('express');
//bodyParser is used here to read the url that a user provided to extract text from image URL
const bodyParser = require('body-parser');
//we are using tesseract.js npm package to extracting the text from any image
const Tesseract = require('tesseract.js');
//app is one of the method of express frameWork
const app = express();

//inorder to use bodyParser we need this line of code
app.use(bodyParser.urlencoded({extended:true}));

//home route
app.get('/',(req,res) => {
  //we are just sending index.js file when our server is live
  res.sendFile(__dirname + '/index.html');
});

app.post('/extractText',(req,res) => {
    //value of image url 
    const imageUrl = req.body.imageUrl;
    //tesseract npm package
    Tesseract.recognize(
        imageUrl,
        'enm',
      ).then(({ data: { text } }) => {
        res.send(text);
        console.log(text);
      }) .catch((err) => {
        console.log(err.message);
      })  
});

const PORT = process.env.PORT || 5000;
//app.listen() -> used to listen to the server
app.listen(PORT,() => {
    console.log("Server is Listening on Port 5000");
})