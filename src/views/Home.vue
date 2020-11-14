<template>
  <div class="border">
    <div class="head news-top">
      Home 
    </div>
    <div class="hero-body" v-if="tweets.length === 0">
    <div class="container">
      <h1 class="title">
        No Tweets
      </h1>
      <h2 class="subtitle">
        Check back later.
      </h2>
    </div>
  </div>
    <tweet :view="true" class="border" v-for="tweet in tweets" :key="tweet._id" :tweet ="tweet"></tweet>
   
  </div>
</template>
<script>
import tweet from '@/components/tweet'
import {mapState} from 'vuex'
import axios from 'axios'
export default {
  components:{
    tweet
  },
  data(){
    return {
      tweets:[]
    }
  },
 
    async created(){
      try {
        if(this.user){
        const {data} = await axios.get('/tweet/followed',{
          params:{
            user_id:this.user._id
          }
        })
        this.tweets = data.tweets
        console.log(data)
        }
      } catch (error) {
        this.$buefy.snackbar.open({
                    message: 'Please check your internet !',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true,
                    onAction: () => {
                         this.$router.go('/')
                    }
                })
      }
      

    
  },
  computed:{
    ...mapState(['user'])
  }
}
</script>