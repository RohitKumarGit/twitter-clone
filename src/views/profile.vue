<template>
    <div >
    <div class="news-top is-size-3 has-text-primary">
        Profile
    </div>
    <div class="card p-3 border is-flex section "><div class="follow-image-large" :style="'background-image:url('+ user.photo+')'"></div>
        <div class="handle is-size-5"> {{user.name}} <span>@{{user.handle}}</span></div>
        
       </div>
        
       
        <tweet :view="true" class="border mt-5" :recent="true" v-for="tweet in tweets" :key="tweet._id" :tweet ="tweet"></tweet>
    </div>

</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios'
import tweet from '@/components/tweet'
export default {
    computed:{
        ...mapState(['user'])
    },
    components:{
        tweet
    },
    data(){
        return {
            tweets:null
        }
    },
    async created(){
        const user_id = this.$route.query.user_id
        const {data} = await axios.get('/user/tweets',{
            params:{
                user_id
            }
        })
        this.tweets = data.tweets
    }
}
</script>