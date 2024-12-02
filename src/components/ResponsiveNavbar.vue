
<!-- src/components/ResponsiveNavbar.vue -->

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import logoImg from '@/assets/img/logo.png';

const route = useRoute();
const router = useRouter();
const isMenuOpen = ref(false);

const isLoggedIn = computed(() => !!localStorage.getItem('authToken'));

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

function logout() {
  localStorage.removeItem('authToken');
  router.push('/');
  closeMenu();
}

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
body {
  margin: 0;
  font-family: Arial, sans-serif;
  overflow-x: hidden;
}

.navbar {
  border-bottom: 1px solid #ff8c00;
  position: relative;
  z-index: 1000;
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
  height: 80px;
}

.nav-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 60px;
  width: auto;
  border-radius: 50%;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1010;
  position: relative;
}

.hamburger-line {
  width: 30px;
  height: 3px;
  background: #ff8c00;
  transition: all 0.3s linear;
}

.nav-links {
  position: fixed;
  right: -100%;
  top: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 300px;
  max-width: 50%;
  text-align: left;
  padding: 80px 20px 20px;
  transition: right 0.3s ease-in-out, visibility 0.3s ease-in-out;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  visibility: hidden;
  z-index: 1005;
}

.nav-links.open {
  right: 0;
  visibility: visible;
}

.nav-link {
  color: #ff8c00;
  text-decoration: none;
  padding: 12px 16px;
  display: block;
  font-weight: bold;
  transition: background 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 140, 0, 0.1);
}

.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  background: rgba(255, 140, 0, 0.2);
}

@media (max-width: 768px) {
  .nav-links {
    width: 100%;
  }
}
</style>



