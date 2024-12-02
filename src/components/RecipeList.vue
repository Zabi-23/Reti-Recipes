<!-- //src/components/RecipeList.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRecipes } from '@/composables/useRecipes';
import type { Recipe } from '@/types';

interface Props {
  recipes: Recipe[];
  showRemove?: boolean; // Indikerar om vi visar "Remove" (favoritlistan)
}

const props = defineProps<Props>();

const { favorites, addToFavorites, removeFromFavorites, loadFavorites } = useRecipes();

const displayedRecipes = ref<Recipe[]>([]);

const expanded = ref<number | null>(null);
const isMobile = ref(false);

const truncateSummary = (summary: string): string => {
  const stripped = summary.replace(/<\/?[^>]+(>|$)/g, "");
  return stripped.length > 100 ? `${stripped.slice(0, 100)}...` : stripped;
};

const updateScreenSize = (): void => {
  isMobile.value = window.innerWidth <= 768;
};

const isFavorite = (recipeId: number): boolean => {
  return favorites.value.some((fav: Recipe) => fav.id === recipeId);
};

const toggleFavorite = (recipe: Recipe): void => {
  if (isFavorite(recipe.id)) {
    removeFromFavorites(recipe.id);
  } else {
    addToFavorites(recipe);
  }
};

const handleRemove = (recipeId: number): void => {
  removeFromFavorites(recipeId);
  displayedRecipes.value = displayedRecipes.value.filter(recipe => recipe.id !== recipeId);
};

watch(() => props.recipes, (newRecipes) => {
  displayedRecipes.value = newRecipes;
}, { immediate: true });

onMounted(() => {
  loadFavorites();
  updateScreenSize();
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});
</script>

<template>
  <div class="recipe-list">
    <div v-for="recipe in displayedRecipes" :key="recipe.id" class="recipe-item">
      <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
      <div class="recipe-details">
        <h2>{{ recipe.title }}</h2>
        <p v-if="recipe.summary" v-html="expanded === recipe.id ? recipe.summary : truncateSummary(recipe.summary)"></p>

        <div class="button-group">
          <router-link
            :to="`/recipe/${recipe.id}`"
            class="button"
          >
            {{ expanded === recipe.id ? 'Show less' : 'Read more' }}
          </router-link>

          <!-- Visa hjärtikonen endast om vi inte är på favoritlistan -->
          <button
            v-if="!props.showRemove"
            @click="toggleFavorite(recipe)"
            class="button"
          >
            <span :class="{ 'favorite-active': isFavorite(recipe.id), 'favorite-inactive': !isFavorite(recipe.id) }">
              ❤
            </span>
          </button>

          <!-- Visa endast "Remove"-knappen om vi är på favoritlistan -->
          <button
            v-if="props.showRemove"
            @click="handleRemove(recipe.id)"
            class="button"
          >
            Remove
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

.favorite-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
}

.favorite-btn:hover {
  transform: scale(1.2);
}

.favorite-active {
  color: red;
}

.favorite-inactive {
  color: gray;
  transition: color 0.3s ease-in-out;
}

.remove-btn {
  margin-top: 20px;
  padding: 10px;
  background-color: transparent; /* Orange bakgrund */
  color: #ff8c00; /* Vit text */
  border: solid 0.5; /* Ingen gräns */
  border-radius: 4px; /* Lätt rundade hörn */
  font-size: 18px; /* Storlek på text */
  cursor: pointer; /* Pekare vid hover */
  transition: background-color 0.3s ease; /* Mjuk övergång */
}

.remove-btn:hover {
  background-color: orange;
  color: white;
}

</style>

