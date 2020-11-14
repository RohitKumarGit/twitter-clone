<template>
    <div class="tweetform card">
    <span v-if="reply" class="has-text-primary is-bold mb-2 is-inline-block" > Replying to {{author.name}}'s tweet</span>
        <div @click="$emit('close')" class="pointer">
        <b-icon class="is-pulled-right" 
                pack="fas"
                icon="times"
             ></b-icon>
        </div>
        <div class="crossbox">

        <div class="follow handle">
             <div class="follow-image-large" :style="'background-image:url('+ user.photo+')'"></div>
             {{user.name}} <span>{{' @'+user.handle}}</span>
        </div>
            
        </div>
        <div class="tweetform_wrap">
           
             <b-field >
            <b-input maxlength="200" type="textarea" v-model="body"></b-input>
        </b-field>
        <b-button  type="is-primary shadow-sm" rounded v-on:click="tweet">Tweet</b-button>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    props:['reply',"author","fromtweet"],
    data(){
        return {
            
            body:""
        }
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        async tweet(){
            if(this.body === ""){
                alert("Can't tweet empty")
                return 
            }
            else {
                if(this.reply){
                    console.log(this.fromtweet._id)
                     await axios.post('/tweet',{
                    tweet:{
                        body:this.body,
                        
                    },
                    author:this.user._id,
                    reply_to:this.fromtweet._id
                    })
                    await axios.post('/tweet/comment',{
                        tweet_id:this.fromtweet._id,
                        comment_id:this.user._id
                    })
                }
                else {
                   await axios.post('/tweet',{
                    tweet:{
                        body:this.body,
                        
                    },
                    author:this.user._id
                    })
                }
                
                
                this.$buefy.toast.open({
                    message: 'Posted !',
                    type: 'is-success'
                })
                this.body = ""
                this.$emit('close')
            }
        },
        
    }
}
</script>>