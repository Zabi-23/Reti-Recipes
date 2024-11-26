
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '@/components/Navbar-Recept.vue';
import ResponsiveNavbar from '@/components/ResponsiveNavbar.vue';
import { useRecipes } from '@/composables/useRecipes';

const isMobile = ref(false); // Håll reda på om det är mobilvy eller inte
const { loadFavorites } = useRecipes();

function updateScreenSize() {
  isMobile.value = window.innerWidth <= 768; // Definiera en mobil vy för bredd <= 768px
}

onMounted(() => {
  loadFavorites();
  updateScreenSize(); // Uppdatera storlek vid mount
  window.addEventListener('resize', updateScreenSize); // Lyssna på ändring i storlek
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize); // Ta bort lyssnaren vid unmount
});
</script>

<template>
  <div class="app-container">

    <!-- Visa bara Navbar om det inte är mobilvy -->
    <Navbar v-if="!isMobile" />

    <!-- Visa bara ResponsiveNavbar om det är mobilvy -->
    <ResponsiveNavbar v-else />
    <router-view>

    </router-view>
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
