<template>
<div v-if="login">

<router-view></router-view>
</div>
      <div class="container" v-else>
      <div class="columns">
          <div class="column is-2">
            <topnav></topnav>
          </div>
          <div class="column is-7">
            <router-view></router-view>
          </div>
          <div class="column is-3">
            <rightpane></rightpane>
          </div>
      
   </div>
      </div>
      
</template>
<script>
import topnav from '@/components/topnav'
import rightpane from '@/components/rightpane'
export default {
  components:{
    topnav,
    rightpane
  },
  computed:{
    login(){
      
      return this.$route.name === "Login"
    }
  },
  created(){
    console.log(this.$route)
  }
}
</script>