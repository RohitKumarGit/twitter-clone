<template>
    <div class="card tweetform">
         <b-field label="Enter twitter handle" :message="validation.message" :type="validation.type" >
            <b-input v-model="handle"></b-input>
            
        </b-field>
        <div class="twiter-btn">
         <b-button :loading="loading" size="is-medium" v-on:click="handler"  class="login_btn" type="is-primary shadow-sm" rounded>
                        <b-icon v-if="!loading"
                pack="fas"
                icon="at"
                size="is-small">
            </b-icon>
                     <span class="is-block">{{text}}</span></b-button>
                </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios'
import firebase from 'firebase'
export default {
  
    data(){
        return {
            handle:"",
            loading:false,
            validation:{
                message:"",
                type:''
            },
            text:"Verify"
        }
    },
    created(){
        console.log(this.user)
        console.log(this.handles)
    },
    computed:{
        ...mapState(['user'])
    },
    methods:{
        async handler(){
            try {
                const {data} = await axios.post('/user/verify/handle',{
                    handle:this.handle
                })
                console.log(data)
                if(data.valid){
                    this.validation.message = "This is valid !"
                    this.validation.type="is-success"
                    this.text="Proceed"
                     const p = this
                   firebase.auth().onAuthStateChanged(async function(user) {
                        if (user) {
                            console.log("logged in user ",user)
                           
                            const {data} = await axios.post('/user',{
                            name:user.displayName,
                            uid:user.uid,
                            photo:user.photoURL,
                            handle:p.handle,

                            })
                            console.log(data)
                            p.$store.commit("addUser",data)
                            window.location = '/'

                        } else {
                                console.log("please sign in !")
                        }
                    });
                    
                    
                    
                    
                    
                }
                else {
                    this.validation.message = "Enter another"
                    this.validation.type="is-danger"
                    this.text = "Verify"
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>>