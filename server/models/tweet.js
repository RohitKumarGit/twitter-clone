const mongoose = require('mongoose');
const Relation = require('../models/tweetRelation')
const Schema = new mongoose.Schema({
    body:{
        type:String,
        trim:true,
    },
    
    retweets:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }],
    
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tweets'
    }]
},{timestamps:true})
// methods
Schema.statics.like = async function(req,res){
    try {
        const tweet =await  Tweets.findById(req.body.tweet_id);
        if(!tweet.likes.includes(req.body.user_id)){
            tweet.likes.push(req.body.user_id)
            await tweet.save()
            return ({tweet,success:true})
        }
        return ({success:false})
    } catch (error) {
        throw new Error(error)
    }
    
    
}
Schema.statics.comment = async function(req,res){
    try {
        const tweet =await  Tweets.findById(req.body.tweet_id);
        tweet.comments.push(req.body.comment_id)
        await tweet.save()
        return {tweet}
    } catch (error) {
        throw new Error(error)
    }
    
    
}


Schema.statics.get = async function(req,res){
    try {
        var replies = false
        if(req.query.replies){
            replies = await Relation.find({
                reply_to:req.query.tweet_id
            }).populate('reply_to author tweet').sort({'createdAt':-1})
        }
        const tweet = await Relation.findOne({
            tweet:req.query.tweet_id
        }).populate('author tweet')
       
        
        return {
           tweet:tweet,
            replies
        }
    } catch (error) {
        throw new Error(error)
    }
    
    
}

const Tweets =  mongoose.model('Tweets',Schema);
module.exports = Tweets