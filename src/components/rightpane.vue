<template>
    <div>
        <b-field class="search-box">
            <v-select  @input="setSelected" @search="fetchUsers" :filterable="false" label="name" :options="allusers">
            <template slot="no-options">
      Start typing the name
    </template>
    <template slot="option" slot-scope="option">
      <div class="is-center">
       <div class="follow-image" :style="'background-image:url('+ option.photo+')'"></div>
        {{ option.name }} @ {{option.handle}}
        </div>
    </template>
    
            </v-select>
        </b-field>
        <div class="news">
            <div class="news-top">
                What's happening
            </div>
            <div class="news-section">
            <div class="news-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            </div>
            <div class="news-image">
            
            </div>
            </div>
            <div class="news-section">
            <div class="news-text">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
            </div>
            <div class="news-image">
            
            </div>
            </div>
            <div class="news-section">
            <div class="news-text">
           The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for
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
            users :[],
            allusers:[]
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
        },
        async fetchUsers(search,loading){
            loading(true)
            const {data} = await axios.get('/user/all',{
                params:{
                    search
                }
            })
            this.allusers = data.users
            loading(false)
        },
        async setSelected(selected){
            try {
                window.location = ('/view/profile?profile_id='+selected._id)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>>