const express =require('express');
const port = 8000;
const db = require('./config/mongoose');
const app = express();

app.use(express.json());


app.use('/api',require('./routes'));


app.listen(port,function(error){
    if(error){
        console.log(error);
    }
    console.log(`App running on http://localhost:${port}`);
});