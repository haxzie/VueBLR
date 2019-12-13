<template>
  <div class="hello">
    <h1>Deck.gl Visualisations</h1>
    <router-link to="/path">Paths</router-link>
    <router-link to="/Garbage">Garbage</router-link>
    <router-link to="/heat">HeatMap</router-link>
    <router-link to="/hex">H3 Grids</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 10px;
}
a {
  color: #42b983;
  font-size: 2em;
  margin: 10px;
  display: block;
}
</style>
