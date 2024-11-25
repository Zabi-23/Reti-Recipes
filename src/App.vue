
<script setup lang='ts'>
import Navbar from '@/components/Navbar-Recept.vue';
import { onMounted } from 'vue';
import { useRecipes } from '@/composables/useRecipes';


const { loadFavorites } = useRecipes();

onMounted(() => {
  loadFavorites();
});
</script>

<template>
  <div class="app-container">

    <Navbar />


    <router-view></router-view>
  </div>
</template>

<style scoped>
/* App container styling */
.app-container {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}
</style>



