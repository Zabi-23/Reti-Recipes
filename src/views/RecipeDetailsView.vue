
<!-- src/views/RecipeDetailsView.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRecipes } from '@/composables/useRecipes';
import type { Recipe } from '@/types';

// Hämta route och data från useRecipes
const route = useRoute();
const { recipes, fetchRecipes } = useRecipes();

// Typa recipe som Recipe eller null
const recipe = ref<Recipe | null>(null);

onMounted(async () => {
  const recipeId = route.params.id as string;

  // Kontrollera om recepten redan är laddade, annars hämta från API
  if (!recipes.value.length) {
    await fetchRecipes();
  }

  // Hitta receptet med matchande ID
  recipe.value = recipes.value.find((r: Recipe) => r.id === parseInt(recipeId, 10)) || null;
});
</script>

<template>
  <div v-if="recipe" class="recipe-details">
    <h1>{{ recipe.title }}</h1>
    <img :src="recipe.image" alt="Recipe Image" />
    <p v-html="recipe.summary"></p>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped>
.recipe-details {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.recipe-details img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.recipe-details h1 {
  margin-bottom: 20px;
}

.recipe-details p {
  font-size: 1rem;
  line-height: 1.5;
}
</style>


