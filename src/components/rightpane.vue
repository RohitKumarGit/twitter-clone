<template>
    <div>
        <b-field class="search-box">
            <b-input placeholder="Search..." rounded
                type="search"
                icon="magnify"
                icon-clickable
                >
            </b-input>
        </b-field>
        <div class="news">
            <div class="news-top">
                What's happening
            </div>
            <div class="news-section">
            <div class="news-text">
            Sample news headline about kamala harris and biden.
            </div>
            <div class="news-image">
            
            </div>
            </div>
            <div class="news-section">
            <div class="news-text">
            Sample news headline about kamala harris and biden.
            </div>
            <div class="news-image">
            
            </div>
            </div>
            <div class="news-section">
            <div class="news-text">
            Sample news headline about kamala harris and biden.
            </div>
            <div class="news-image">
            
            </div>
            </div>
            <div class="news-bottom">
                show more
            </div>
        </div>
        <div class="news" v-if="users.length > 0">
            <div class="news-top">
                Who to follow
            </div>
            <div class="news-section follow" v-for="user in users" :key="user.uid" >
            <div class="flex">
            <div class="follow-image" :style="'background-image:url('+ user.photo+')'" ></div>
                <span class="follow-text">{{user.name}}</span>
            </div>
                
                <div :ref="'follow-'+user._id" class="follow-btn" v-on:click="follow(user._id)">Follow</div>
            </div>
            
            <div class="news-bottom">
                Show more
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
//import firebase from 'firebase'
export default {
    async created(){
        
       
        
        
        
        
    },
    data(){
        return {
            users :[]
        }
    },
    watch:{
        async user(){
            if(this.user){
                    
                    const {data} = await axios.get('/user/notfollowed',{
                        params:{
                        user_id:this.user._id
                        
                    }
                    })
                    
                    this.users = data.users
                    console.log(data)
            }
        }
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        async follow(id){
                const {data} =await  axios.post('/user/follow',{
                    uid:this.user.uid,
                    target_id:id,
                    
                })
                console.log(data)
                console.log(this.$refs['follow-'+id][0])
                this.$refs['follow-'+id][0].classList.add('follows')
        }
    }
}
</script>>