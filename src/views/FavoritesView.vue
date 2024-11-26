
<!-- src/views/FavoritesView.vue -->

<script setup lang='ts'>
import {onMounted,  watch} from 'vue'
import RecipeList from '@/components/RecipeList.vue'
import {useRecipes} from '@/composables/useRecipes'

const {favorites, removeFromFavorites, loadFavorites} = useRecipes()

onMounted(() => {
  loadFavorites()
})

watch(favorites, (newFavorites) => {
  localStorage.setItem('favorites', JSON.stringify(newFavorites))
  console.log('Favorites updated:', newFavorites)
})
</script>

<template>
  <div class="favorites">
    <h1>Favorite Recipes</h1>
    <div v-if="favorites.length === 0">You haven't added any favorite recipes yet.</div>
    <RecipeList
      v-else
      :recipes="favorites"
      :showRemove="true"
      @remove-favorite="removeFromFavorites"
    ></RecipeList>
  </div>
</template>

<style scoped>
.favorites {
  max-width: 800px;
  margin: 0 auto;

}

h1 {
  text-align: center;
  margin-bottom: 20px;
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem; /* Öka storleken för att matcha Allura-fontens stil */
  font-family: 'Allura', cursive; /* Ändra font till Allura */
  background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #333; 
}
</style>


