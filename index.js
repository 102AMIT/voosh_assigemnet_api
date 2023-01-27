const express =require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');




app.get('/', (req, res) => res.send('Hello World!'));




app.listen(port,function(error){
    if(error){
        console.log(error);
    }
    console.log(`App running on http://localhost:${port}`);
});