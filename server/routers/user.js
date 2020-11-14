const express = require('express')
const User = require('../models/user');
const Tweets = require('../models/tweet');
const Users = require('../models/user');
const Router = express.Router()
Router.post('/',async function(req,res,next){
    try {
        const user = await User.post(req,res)
        res.send({user})
    } catch (error) {
        next(error)
    }
    
})
Router.get('/notifs',async function(req,res,next){
    try {
        const notifs = await Users.findById(req.query.user_id,"notifications").populate('notifications.from').sort({"notifications.time":-1})

        res.send({notifs})
    } catch (error) {
        next(error)
    }
    
})
Router.get('/tweets',async function(req,res,next){
    
    try {
        const {user_id} = req.query
       
        const tweets = await Tweets.find({
            "user_ids":{
                "$in":[user_id]
            }
        })
        ///console.log(tweets)
       
        const user =await User.findById(user_id)
        res.send({user,tweets})
    } catch (error) {
        next(error)
    }
})
Router.post('/notification',async function(req,res,next){
    try {
        const user = await User.addNotif(req,res)
        res.send(user)
    } catch (error) {
        next(error)
    }
})
Router.post('/follow',async function(req,res,next){
    try {
        const user = await User.follow(req,res)
        res.send({user})
    } catch (error) {
        next(error)
    }
})

Router.post('/verify/handle',async function(req,res,next){
    try {
        const result = await User.verifyHandle(req,res)
        res.send(result)
    } catch (error) {
        next(error)
    }
})
Router.get('/followed',async function(req,res,next){
    try {
        const data =await Users.getFollowedUsers(req.query.user_id)
        res.send(data)
    } catch (error) {
        next(error)
    }
})
Router.get('/notfollowed',async function(req,res,next){
    try {
        const data =await  Users.getUnfollowedUsers(req.query.user_id)
        res.send(data)
    } catch (error) {
        next(error)
    }
})
Router.post('/verify/uid',async function(req,res,next){
    try {
        const {user} = await User.get(req.body.uid)
        if(user){
            res.send({
                exists:true
            })
        }
        res.send({
            exists:false
        })
    } catch (error) {
        next(error)
    }
})
Router.get('/',async function(req,res,next){
    try {
        console.log(req.query)
        const user = await User.get(req.query.uid)
        res.send(user)
    } catch (error) {
        next(error)
    }
})
module.exports = Router