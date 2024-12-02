
<!-- src/components/Navbar-Recept.vue -->

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import logoImg from '@/assets/img/logo.png';

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
        <button class="hamburger" @click="toggleMenu" aria-label="Toggle menu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
        <div :class="['nav-links', { 'open': isMenuOpen }]">
          <router-link to="/" class="nav-link" @click="closeMenu">
            Home
          </router-link>
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

.logo-text {
  color: #ff8c00;
  font-size: 1.25rem;
  font-weight: bold;
  margin-left: 8px;
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
  z-index: 10;
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
  height: 30vh;
  flex-direction: column;
  background-color: transparent;
  width: 200px;
  text-align: left;
  padding: 80px 20px 20px;
  transition: right 0.3s ease-in-out;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

.nav-links.open {
  right: 0;
}

.nav-link {
  color: #ff8c00;
  background: transparent;
  padding: 12px 16px;
  text-decoration: none;
  font-weight: bold;
  display: block;
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


