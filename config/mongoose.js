const mongoose=require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://voosh:voosh@cluster0.q369kps.mongodb.net/test");
const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error is conecting to MongoDB"));

db.once('open',function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports=db;