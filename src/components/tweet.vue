<template>
    
    <div class="card" v-if="show" >

    <b-modal v-model="reply" has-modal-card  :destroy-on-hide="false" aria-role="dialog" aria-modal>
    <template #default="props">

               <tweetform @close="props.close" :reply="true" :fromtweet="tweet.tweet" :author="tweet.author"></tweetform> 
            </template>

    </b-modal>
        <div v-if="view">
        <span class="retweet-label" v-if="tweet.retweeted_by">{{tweet.retweeted_by.name}} Retweeted  <b>{{tweet.author.name}}'s Tweet</b></span>
        <span class="retweet-label" v-if="author">{{tweet.author.name}} Replied to   <b>{{author.name}}'s Tweet</b></span>
        </div>
        <div class="card-content">
       
           <div class="columns">
           
           <div class="column is-1">
           <router-link :to="'/view/profile?user_id=' + user._id" tag="div" class="follow-image-large" :style="'background-image:url('+ tweet.author.photo+')'"></router-link>
           </div>
           <div class="column is-11" v-on:click="viewTweet(tweet.tweet._id)">
           <div class="handle">
           {{tweet.author.name}} <span>@{{tweet.author.handle}}</span>
           </div>
           {{tweet.tweet.body}}
           </div>
           </div>
      </div>
      <footer class="card-footer">
    <div href="#" :class="{'card-footer-item':true,'pressed':tweet.tweet.likes.includes(user._id)}" @click="like(tweet.tweet._id,tweet.author._id)">
        {{tweet.tweet.likes.length}}<b-icon
                pack="fas"
                icon="heart"
                size="is-small">
            </b-icon>
    </div>
    <div href="#" :class="{'card-footer-item':true,'pressed':tweet.tweet.retweets.includes(user._id)}" @click="retweet(tweet.tweet._id,tweet.author._id)" >{{tweet.tweet.retweets.length }}<b-icon
                pack="fas"
                icon="retweet"
                size="is-small">
            </b-icon></div>
    <div href="#" :class="{'card-footer-item':true,'pressed':tweet.tweet.comments.includes(user._id)}" @click="reply = true">{{tweet.tweet.comments.length}}<b-icon
                pack="fas"
                icon="comment"
                size="is-small">
            </b-icon></div>
  </footer>

        </div>
    
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
import tweetform from '@/components/tweetform'
export default {
    props:['tweet','recent','view'],
    data(){
        return {
            reply:false,
            author:false
        }
    },
    components:{
        tweetform
    },
    methods:{
        async viewTweet(id){
            try {
                window.location = '/view/tweet?tweet_id=' + id
            } catch (error) {
                console.log(error)
            }
        },
        async like(id,author_id){
            const {data} = await axios.post('/tweet/like',{
                tweet_id:id,
                user_id:this.user._id,
                author_id
            })
            console.log(data)

            if(data.success){
                this.tweet.tweet.likes.push(this.user._id)

            }
        },
        async retweet(id,author_id){
            console.log("clicking")
            const {data} =await axios.post('/tweet/retweet',{
                user_id:this.user._id,
                tweet_id:id,
                author_id
            })
            if(data.success){
                this.tweet.tweet.retweets.push(this.user._id)
                this.$buefy.toast.open({
                    message: 'Retweeted',
                    type: 'is-success'
                })
            }
        }
    },
   
    computed:{
        ...mapState(['user']),
        show(){
            if(this.recent){
                return true
            }
            if(this.tweet.retweeted_by){
                if(this.tweet.retweeted_by._id !== this.user._id){
                    return true
                }
                else {
                    return  false
                }
            }
            else {
                return true
            }
        },
       
    },
    async created(){
        console.log(this.tweet)
        if(this.tweet.reply_to){
                const {data} = await axios.get('/user',{
                    params:{
                        uid:this.user.uid
                    }
                })
                console.log("real auhtor",data)
                this.author = data.user
        }
        
    }
}
</script>>