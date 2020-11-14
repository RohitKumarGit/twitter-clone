<template>
  <div class="border">
   <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false"></b-loading>
    <div class="head news-top">
     Notifications
    </div>
    <div class="card p-2 border">
    <section class="hero">
  <div class="hero-body" v-if="notifs.length === 0">
    <div class="container">
      <h1 class="title">
        No notifications
      </h1>
      <h2 class="subtitle">
        your are up to date
      </h2>
    </div>
  </div>
</section>
    <div class="handle" v-for="notif in notifs" :key="notif._id">
    <div v-if="notif.not_type === 0">{{notif.from.name}}
    <span>Liked a tweet of yours</span></div>
    <div v-else-if="notif.not_type === 1">{{notif.from.name}}
    <span>Retweeted one of your tweets</span></div>
    
    </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['user']),
    
  },
  data(){
    return {
      notifs:[],
       isLoading:false
    }
  },
  methods: {
    async getData(){
      this.isLoading = true
      const {data} = await axios.get('/user/notifs',{
      params:{
        user_id:this.user._id
      }
    })
    console.log(data)
    this.notifs = data.notifs.notifications
     this.isLoading = false
    }
  },
  async created() {
    this.getData()
  },
  watch:{
    user(){
      this.getData()
    }
  }
}
</script>>