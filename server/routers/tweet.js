
const express = require('express');
const Tweets = require('../models/tweet');
const Users = require('../models/user')
const Router = express.Router()
const Relation = require('../models/tweetRelation')
// get all tweets of a uid
// retweet


Router.post('/retweet',async function(req,res,next){
    try {
        console.log(req.body.tweet_id)
        const tweet = await Tweets.findById(req.body.tweet_id)
        if(!tweet.retweets.includes(req.body.user_id)){
            const user = await Users.findById(req.body.author_id)
            if(req.body.user_id !== user._id){
                user.notifications.push({
                    from:req.body.user_id,
                    not_type : 1
                    })
                    await user.save()
            }
            
            tweet.retweets.push(req.body.user_id)
        await tweet.save()
        const relation = await Relation.findOne({
            tweet:req.body.tweet_id
        })
        
        const newRelation = {
            author :relation.author,
            tweet: relation.tweet,
            retweeted_by:req.body.user_id,
            retweeted:true
        }
        await (new Relation(newRelation)).save()
        res.send({success:true})
        }
        res.send({success:false})
        

    } catch (error) {
        next(error)
    }
})
Router.post('/',async function(req,res,next){
    try {
       const tweet = await (new Tweets(req.body.tweet)).save()
       console.log(req.body.reply_to)
       const relation = new Relation({
           author:req.body.author,
           tweet:tweet._id,
            reply_to:req.body.reply_to
       })
       await relation.save()
       res.send({success:true,tweet})
    } catch (error) {
        next(error)
    }
    
})
Router.post('/like',async function(req,res,next){
    try {
        const tweet = await Tweets.like(req,res)
        // add notification
        if(tweet.success){
            const user = await Users.findById(req.body.author_id)
            console.log(req.body.user_id.toString() ,user._id.toString())
            console.log(req.body.user_id.toString() !== user._id.toString())
            if(req.body.user_id !== user._id){
                user.notifications.push({
                    from:req.body.user_id,
                    not_type : 0
                    })
                    await user.save()
            }
            
        }
        
        res.send(tweet)
     } catch (error) {
         next(error)
     }
})
Router.post('/comment',async function(req,res,next){
    try {
        const tweet = await Tweets.comment(req,res)
        res.send(tweet)
     } catch (error) {
         next(error)
     }
})
Router.get('/',async function(req,res,next){
    try {
       const tweet = await Tweets.get(req,res)
       res.send(tweet)
    } catch (error) {
        next(error)
    }
    
})
Router.get('/recent',async function(req,res,next){
    try {
       const tweets = await Relation.find().populate("tweet author retweeted_by reply_to").sort({createdAt:-1})

       res.send({tweets})
    } catch (error) {
        next(error)
    }
    
})
Router.get('/followed',async function(req,res,next){
    const user = await Users.findById(req.query.user_id)
    try {
       const tweets =await Relation.find({
           $or:[
                {
                    author:{
                        $in:user.follows
                    }
                },
                {
                    retweeted_by:{
                        $in:user.follows
                    }
                }
           ]
       }).populate('author tweet retweeted_by reply_to').sort({createdAt:-1})
       res.send({tweets})
       
    } catch (error) {
        next(error)
    }
    
})
module.exports = Router