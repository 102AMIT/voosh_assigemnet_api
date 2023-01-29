const express =require('express');
const port = 8000;
require('dotenv').config();
const db = require('./config/mongoose');
const app = express();

const cors = require('cors')
 
app.use(express.json());
app.use(cors())

// Routes accessible through
app.use('/api',require('./routes'));


app.listen(port,function(error){
    if(error){
        console.log(error);
    }
    console.log(`App running on http://localhost:${port}`);
});