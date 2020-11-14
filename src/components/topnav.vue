<template>
    <div>
  
    <b-modal v-model="tweet" has-modal-card  :destroy-on-hide="false" aria-role="dialog" aria-modal>
    <template #default="props">

               <tweetform @close="props.close" :reply="false"></tweetform> 
            </template>

    </b-modal>
       <div class="brand">

            <img class="brand-image" src="@/assets/images/logo.png" alt="" srcset="">
       </div>
       <div class="brand_items">
           <router-link class="brand_item" tag="div" to="/">
                    <div class="brand_item-icon">
                    <b-icon
                        pack="fas"
                        icon="home"
                        size="is-large"
                    >
            </b-icon>
                    </div>
                    <div class="brand_item-text">
                            Home
                    </div>
            </router-link>
            <router-link class="brand_item" tag="div" to="/recent">
                <div class="brand_item-icon">
                    <b-icon
                        pack="fas"
                        icon="history"
                        size="is-large"
                    >
            </b-icon>
                    </div>
                    <div class="brand_item-text">
                            Recent
                    </div>
            </router-link>
             <router-link class="brand_item" tag="div" to="/notifications">
                    <div class="brand_item-icon">
                    <b-icon
                        pack="fas"
                        icon="bell"
                        size="is-large"
                    >
            </b-icon>
                    </div>
                    <div class="brand_item-text">
                            Notifications
                    </div>
            </router-link>
            <div class="brand-item" >
                 <b-button  @click="tweet = true" class="new-tweet" type="is-primary shadow-sm" rounded>Tweet</b-button>
            </div>
            <div class="brand-item" >
                 <b-button  @click="logout" class="new-tweet border-p" type=" shadow-sm" rounded>Logout</b-button>
            </div>
       </div>
    </div>
</template>
<script>
import tweetform from '@/components/tweetform'
//import tweet from '@/components/tweet'
import axios from 'axios'
import firebase from 'firebase'
export default {
        components:{
                tweetform
        },
        data(){
                return {
                        tweet:false
                }
        },
        beforeMount(){
                const store = this.$store
                firebase.auth().onAuthStateChanged(async function(user) {
                if (user) {
                        console.log(user)
                        const {data} = await axios.get('/user',{
                                params:{
                                        uid:user.uid
                                }
                        })
                        console.log(data)
                        store.commit("addUser",data)
    // User is signed in.
                } else {
    // No user is signed in.
                        window.location = '/login'
                }
});
        },
        methods:{
                logout(){
                        firebase.auth().signOut().then(function() {
                                window.location = '/login'
  // Sign-out successful.
                        }).catch(function(error) {
  // An error happened.         
                                                console.log(error)
                                });
                }
        }
}
</script>>