<template>
  <div class="border">
   <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
    <div class="head news-top">
      Recent Tweets
    </div>
    <div class="hero-body" v-if="tweets.length === 0">
    <div class="container">
      <h1 class="title">
        Nobody tweeted recently !
      </h1>
      <h2 class="subtitle">
        Check back later.
      </h2>
    </div>
  </div>
    <tweet class="border" :recent="true" v-for="tweet in tweets" :key="tweet._id" :tweet ="tweet"></tweet>
   
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
      tweets:[],
      isLoading:false
    }
  },
  methods: {
    async getData(){
      this.isLoading = true
      console.log(1,this.user)
      try {
      
      if(this.user){
        const {data} = await axios.get('/tweet/recent',{
          params:{
            user_id:this.user._id
          }
        })
        console.log("here")
        this.tweets = data.tweets
        console.log(data)
        this.isLoading = false
      }
      
    } catch (error) {
        this.$buefy.snackbar.open({
                    message: 'Please check your internet !',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'Retry',
                    indefinite: true,
                    onAction: () => {
                        this.$router.go('/recent')
                    }
        })
    }
    }
  },
  watch:{
    async user(){
      
      this.getData()
    }
  },
  async created(){
   

    this.getData()
      

    
  },
  computed:{
    ...mapState(['user'])
  }
}
</script>