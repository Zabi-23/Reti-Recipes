
<!-- src/views/HomeView.vue -->

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import RecipeList from '@/components/RecipeList.vue'
import SearchForm from '@/components/SearchForm.vue'
import { useRecipes } from '@/composables/useRecipes'

const { recipes, loading, error, currentPage, totalResults, fetchRecipes, addToFavorites } = useRecipes()

const searchQuery = ref('')

const totalPages = computed(() => Math.ceil(totalResults.value / 10))

function searchRecipes(query: string) {
  searchQuery.value = query
  fetchRecipes(query)
}

function changePage(delta: number) {
  const newPage = currentPage.value + delta
  if (newPage >= 1 && newPage <= totalPages.value) {
    fetchRecipes(searchQuery.value, newPage)
  }
}

onMounted(() => {
  fetchRecipes()
})
</script>

<template>
  <div class="home">
    <h1>Reti Recipes</h1>
    <SearchForm :loading="loading" @search="searchRecipes" />
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="loading">Loading...</div>
    <RecipeList v-else :recipes="recipes" @add-favorite="addToFavorites" />
    <div class="pagination" v-if="totalPages > 1">
      <button @click="changePage(-1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="changePage(1)" :disabled="currentPage === totalPages" >Next</button>
    </div>
  </div>
</template>


<style scoped>
/* Importera Allura font från Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');

/* General layout and container */
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* Header styling */
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem; /* Öka storleken för att matcha Allura-fontens stil */
  font-family: 'Allura', cursive; /* Ändra font till Allura */
  background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #333; /* Fallback för unsupported browsers */
}

/* Error message styling */
.error-message {
  color: #f44336;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1rem;
}

/* Pagination styling */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

/* Pagination buttons */
.pagination button {
  padding: 8px 15px;
  background-color: transparent;
  color: #ff8c00;
  border: solid 0.5px black;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.pagination button:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0, .1);
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

/* Pagination info text */
.pagination span {
  font-size: 0.95rem;
  color: #555;
}
</style>




