const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 8082
const morgan = require('morgan')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(morgan())

const TweetRouter = require('./server/routers/tweet')
const UserRouter = require('./server/routers/user')
mongoose.connect("mongodb+srv://user:xtXE0mmcC7GmhZrM@cluster0.begc9.mongodb.net/<dbname>?retryWrites=true&w=majority", {
  useNewUrlParser: "true",
})
const path = require('path');
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})
const history = require('connect-history-api-fallback')

//process.env.NODE_ENV === 'production'
if(true){
  app.use(history({
    verbose: false,
    disableDotRule:false
    }));
  app.use('/', express.static(path.join(__dirname, 'dist')));
}
// Routers
app.use('/tweet',TweetRouter)
app.use('/user',UserRouter)

/////
app.listen(port,function(err){
    if(!err){
        console.log("Backend is running at port : " + port)
    }
})