const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
var bodyParser = require('body-parser');

const app = express();

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res){
    fs.readFile('myFile.txt',
    // callback function that is called when reading file is done
    function(err, data) {       
        if (err) throw err;
        res.render('forms', {my_text: data});
});
  
});

app.post('/', function(req, res){
    const data1 = req.body.your_name;
    const now = Date.now();
    const date = new Date(now);
    const data = data1 +"\t\t\t"+ date+"\n";
    fs.appendFile(path.join(__dirname, 'myFile.txt'), data,(err)=> {
        if (err) {throw err};
    });

    res.redirect('/');

});


app.listen(3000, () => {console.log("Listening on port 3000")})