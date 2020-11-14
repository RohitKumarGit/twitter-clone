<template>
    <div class="border">
        
            <tweet v-if="data" :tweet="data.tweet" :recent="false" :view="false"></tweet>
            <div style="margin-top:10px" :key="tweet._id" v-for="tweet in data.replies">
                <tweet :tweet="tweet" :view="false" :recent="false" v-if="data"></tweet>
            </div>

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
            data:null
        }
    }
    ,
    computed:{
        tweet_id(){
            return this.$roure.query.tweet_id
        },
        ...mapState(['user'])
    },
    async created(){
        const {data} = await axios.get('/tweet',{
            params:{
                tweet_id:this.$route.query.tweet_id,
                replies:true
            }
        })
        console.log(data)
        this.data = data
    }
}
</script>