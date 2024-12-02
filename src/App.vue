<!-- src/App.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '@/components/Navbar-Recept.vue';
import ResponsiveNavbar from '@/components/ResponsiveNavbar.vue';
import { useRecipes } from '@/composables/useRecipes';
import { useTheme } from '@/composables/useTheme';

const isMobile = ref(false);
const { loadFavorites } = useRecipes();
const { theme, toggleTheme, loadTheme } = useTheme();

function updateScreenSize() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
  loadFavorites();
  loadTheme();
  updateScreenSize();
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});
</script>

<template>
  <div class="app-container">
    <Navbar v-if="!isMobile" />
    <ResponsiveNavbar v-else />
    <router-view :key="$route.fullPath"></router-view>
    <button @click="toggleTheme" class="theme-toggle">
      Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
    </button>
  </div>
</template>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.theme-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background: var(--button-bg);
  color: var(--button-text);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
}

.theme-toggle:hover {
  background: var(--button-border);
  color: var(--button-bg);
}
</style>
