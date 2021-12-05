const mongoose = require('mongoose');
require('dotenv').config();
const connectionURL = process.env.MONGODB_URL

mongoose.connect(connectionURL,{ useUnifiedTopology: true, useCreateIndex: true,useNewUrlParser: true, useFindAndModify:false}, () => {
    console.log(`Database is connected`)
})
