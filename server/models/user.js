

const mongoose = require('mongoose');


const id = mongoose.Schema.Types.ObjectId

const Schema = new mongoose.Schema({
        uid:String,
        name:String,
        photo:String,
        handle:{
            type:String,
            unique:true
        },
        follows:[{
            type:id,
            ref:"Users"
        }],
        notifications:[{
            from:{
                type:id,
                ref:"Users"
            },
            not_type:{
                type:Number
            },
            time:{
                type:Date,
                default:Date.now
            }
        }]
},{timestamps:true})
Schema.statics.post = async function(req,res){
    try {
        const user = new Users(req.body)
         await user.save()
        
         return {user}
    } catch (error) {
        throw new Error(error)
    }
}

Schema.statics.get = async function(uid){
    try {
        console.log(uid)
        const user = await Users.findOne({

            uid
        })
         
         return {user}
    } catch (error) {
        throw new Error(error)
    }
}

Schema.statics.addNotif = async function(req,res){
    try {
        const user =await Users.findById(req.body.notif)
        user.notifications.push(req.body.notif)
        await user.save()
        return {user}
    } catch (error) {
        throw new Error(error)
    }
}
Schema.statics.follow = async function(req,res){
    try {
        const user = await Users.findOne({uid:req.body.uid})
        if(!user.follows.includes(req.body.target_id)){
            user.follows.push(req.body.target_id)
            await user.save()
        }
        
         return {user}
    } catch (error) {
        throw new Error(error)
    }
}
Schema.statics.verifyHandle = async function(req,res){
    try {
        const user = await Users.find({
            handle:req.body.handle
        })
        console.log(user)
        if(!user.length){
            return {valid:true}
        }
        return {valid:false}
         
    } catch (error) {
        throw new Error(error)
    }
}
Schema.statics.getFollowedUsers = async function(user_id){
    try {
        const main_user = await Users.findById(user_id)
       
        
        const users = await Users.find({
            follows:{
                $in:main_user.follows
            }
        })
    } catch (error) {
        throw new Error(error)
    }
}
Schema.statics.getUnfollowedUsers = async function(user_id){
    try {
        const main_user = await Users.findById(user_id)
        main_user.follows.push(user_id)
        console.log(main_user.follows)
        const users = await Users.find({
            _id:{
                $nin:main_user.follows
            }
        })
        return {users}
    } catch (error) {
        throw new Error(error)
    }
}
const Users = mongoose.model("Users",Schema)
module.exports = Users