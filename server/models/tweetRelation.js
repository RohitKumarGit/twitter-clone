const mongoose = require('mongoose')
const id = mongoose.Schema.Types.ObjectId
const Schema = new mongoose.Schema({
    author:{
        type:id,
        ref:"Users",
        required:true
    },
    reply_to :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweets"
    },
    tweet:{
        type:id,
        ref:"Tweets",
        required:true
    },
    retweeted_by:{
        type:id,
        ref:"Users",
        default:null
    }
},{timestamps:true})
module.exports = mongoose.model('Relation',Schema)