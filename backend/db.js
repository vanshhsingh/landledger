const mongoose = require('mongoose');
const mongoURI = `mongodb://127.0.0.1:27017/LandLedger`



//Connecting to DB
mongConnect=()=>{
    mongoose.connect(mongoURI,{}).then(()=>{console.log('Connected successfully')}).catch(err=>console.log(`this is error smh smh: ${err}`))
}


module.exports = mongConnect;