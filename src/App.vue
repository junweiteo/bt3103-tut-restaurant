<template>
  <div>
    <h1 id="StoreName">Jun Wei's Shop</h1>
    <router-view></router-view>
  </div>
</template>

<script>
//import PageContent from './components/PageContent.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    //PageContent,
  }
}
</script>

<style scoped>
#StoreName {
  text-align: center;
}
</style>
