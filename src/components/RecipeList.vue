<!-- src/components/RecipeList.vue -->


<script setup lang='ts'>
import { ref } from 'vue'
import { type Recipe } from '../types'

defineProps<{ recipes: Recipe[]
  showRemove?: boolean
 }>()

 defineEmits<{
   (event: 'add-favorite', recipe: Recipe): void
  (event: 'remove-favorite', id: number): void
 }>()

 const expanded = ref<number | null>(null)

function toggleSummary(recipeId: number) {
  expanded.value = expanded.value === recipeId ? null : recipeId
}
function truncateSummary(summary: string): string {
  const stripped = summary.replace(/<\/?[^>]+(>|$)/g, "")
  return stripped.length > 100 ? stripped.substr(0, 100) + "..." : stripped
}


</script>

<template>
  <div class='recipe-list'>
    <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
      <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
      <div class="recipe-details">
        <h2>{{recipe.title}}</h2>
        <p v-if="recipe.summary" v-html="expanded === recipe.id ? recipe.summary : truncateSummary(recipe.summary)"></p>

        <!-- Wrapper för knapparna -->
        <div class="button-group">
          <button @click="toggleSummary(recipe.id)" class="button">
              {{expanded === recipe.id ? 'Show less' : 'Read more'}}
          </button>

          <button v-if="!showRemove" @click="$emit('add-favorite', recipe)" class="button">
            Add to Favorites
          </button>
          <button v-else @click="$emit('remove-favorite', recipe.id)" class="remove-btn">
            Remove from Favorites
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.recipe-item {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s ease-in-out;
}

.recipe-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-details {
  padding: 16px;
}

.recipe-details h2 {
  margin: 0 0 8px;
  font-size: 1.25rem;
  color: #333;
}

.recipe-details p {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.4;
}

.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.button-group button {
  flex: 0 0 auto; /* Gör så att knappar inte växer */
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 1rem;
}

.favorite-btn {
  background-color: #4caf50;
  color: white;
}

.favorite-btn:hover {
  background-color: #45a049;
}

.remove-btn {
  background-color: #f44336;
  color: white;
}

.remove-btn:hover {
  background-color: #d32f2f;
}

button:hover {
  transform: translateY(-2px);
}
.read-more-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.read-more-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

</style>


