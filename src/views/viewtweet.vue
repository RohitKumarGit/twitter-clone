<template>
    <div class="border">
        {{user}}
            <tweet></tweet>
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
    }
}
</script>