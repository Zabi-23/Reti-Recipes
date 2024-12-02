

// src/composables/useTheme.ts 

import { ref } from 'vue';

const theme = ref<'light' | 'dark'>('light');

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme.value);
  document.documentElement.setAttribute('data-theme', theme.value);
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    theme.value = savedTheme;
    document.documentElement.setAttribute('data-theme', theme.value);
  }
}

export function useTheme() {
  return {
    theme,
    toggleTheme,
    loadTheme,
  };
}
