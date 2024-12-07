
<!-- src/components/ResponsiveNavbar.vue -->


<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import logoImg from '@/assets/img/logo.png';

const route = useRoute();
const router = useRouter();
const isMenuOpen = ref(false);

// Reaktiv variabel för inloggningsstatus
const isLoggedIn = ref(!!localStorage.getItem('authToken'));

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

function logout() {
  localStorage.removeItem('authToken');
  isLoggedIn.value = false; // Uppdatera inloggningsstatusen
  router.push('/');
  closeMenu();
}

// Uppdatera inloggningsstatus när komponenten laddas
onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('authToken');
});

// Stäng menyn när vi navigerar till en annan sida
watch(() => route.path, () => {
  closeMenu();
});
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <div class="nav-left">
          <a class="logo" href="#">
            <img class="logo-img" :src="logoImg" alt="Vue-Recept" />
          </a>
        </div>

        <button class="hamburger" @click="toggleMenu" aria-label="Toggle menu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <div :class="['nav-links', { 'open': isMenuOpen }]">
          <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
          <router-link to="/favorites" class="nav-link" @click="closeMenu">
            Favorites
          </router-link>
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="nav-link" @click="closeMenu">
              Sign In
            </router-link>
            <router-link to="/signup" class="nav-link" @click="closeMenu">
              Sign Up
            </router-link>
          </template>
          <button v-else @click="logout" class="nav-link">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
/* Din styling här */
</style>
