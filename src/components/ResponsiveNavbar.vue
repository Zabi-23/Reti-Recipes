

<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <div class="nav-left">
          <a class="logo" href="#">
            <img class="logo-img" :src="logoImg" alt="Vue-Recept" />
          </a>
        </div>

        <!-- Hamburger Menu Toggle -->
        <button class="hamburger" @click="toggleMenu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <!-- Navigation Links -->
        <div :class="['nav-links', { open: isMenuOpen }]">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/favorites" class="nav-link">
            Favorites
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, } from 'vue';

import logoImg from '@/assets/img/logo.png';


const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style lang="scss" scoped>
.navbar {
  border-bottom: 1px solid #ff8c00;
  position: relative;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  max-width: 1120px;
  margin: 0 auto;
  height: 80px;
}

.nav-content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 50px;
  width: auto;
}

/* Hamburger Menu */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: #ff8c00;
  transition: transform 0.3s ease;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #ff8c00;
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid black;
  border-radius: 4px;
  transition: background 0.3s ease, transform 0.2s ease;
  font-weight: bold;
}

.nav-link:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.nav-links.open {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  background: white;
  border-top: 1px solid #ff8c00;
  padding: 16px 0;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    display: none;
  }

  .nav-links.open {
    display: flex;
  }
}
</style>



