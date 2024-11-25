
<!-- src/components/Navbar-Recept.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { useRecipes } from '@/composables/useRecipes';
import logoImg from '@/assets/img/logo.png';




const { favorites } = useRecipes();
const favoritesCount = computed(() => favorites.value.length);
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <div class="nav-left">
          <a class="logo" href="#">
            <img class="logo-img" :src="logoImg" alt="Vue-Recept" />

            <span class="logo-text"></span>
          </a>
        </div>
        <div class="nav-links">

          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/favorites" class="nav-link">
            Favorites ({{ favoritesCount }})
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.navbar {
  border-bottom: 1px solid #ff8c00;
}

.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 16px;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 120px;

  img {
    mix-blend-mode: multiply; /* Blanda bakgrunden med dess förälders bakgrundsfärg */
  }
}

.nav-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  margin-right: 16px;
  text-decoration: none;
}

.logo-img {
  height: 120px;
  width: auto;
  border-radius: 50%;
}

.logo-text {
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 8px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #ff8c00; /* Orange text */
  background: transparent; /* Ingen bakgrund */
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
  border: solid 1px black; /* Svart border */
  cursor: pointer;
  text-align: center;
}

.nav-link:hover {
  transform: scale(1.05); /* Lätt förstoring vid hovring */
  background: rgba(0, 0, 0, 0.1); /* Lätt transparent svart bakgrund vid hovring */
}

.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  background: transparent; /* Ingen bakgrund */
  border: solid 0.5px black; /* Svart border */
  color: #ff8c00; /* Orange text */
}

.nav-link.router-link-active:hover,
.nav-link.router-link-exact-active:hover {
  transform: scale(1.05); /* Hovring förstoring */
  background: rgba(0, 0, 0, 0.1); /* Transparent svart bakgrund */
}
</style>




