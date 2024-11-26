


 <!-- src/components/RecipeList.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRecipes } from '@/composables/useRecipes';
import type { Recipe } from '@/types';

interface Props {
  recipes: Recipe[];
  showRemove?: boolean;
}

const props = defineProps<Props>();

const { favorites, addToFavorites, removeFromFavorites, loadFavorites } = useRecipes();

const displayedRecipes = ref<Recipe[]>([]);

const expanded = ref<number | null>(null);
const isMobile = ref(false);

const toggleSummary = (recipeId: number): void => {
  expanded.value = expanded.value === recipeId ? null : recipeId;
};

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

const handleAddToFavorites = (recipe: Recipe): void => {
  addToFavorites(recipe);
};

const handleRemoveFromFavorites = (recipeId: number): void => {
  removeFromFavorites(recipeId);
  if (props.showRemove) {
    displayedRecipes.value = displayedRecipes.value.filter(recipe => recipe.id !== recipeId);
  }
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
          <button @click="toggleSummary(recipe.id)" class="button read-more-btn">
            {{ expanded === recipe.id ? (isMobile ? 'Less' : 'Show less') : (isMobile ? 'More' : 'Read more') }}
          </button>

          <button
            v-if="!props.showRemove"
            @click="handleAddToFavorites(recipe)"
            class="button favorite-btn"
          >
            <span v-if="!isMobile">Favorites</span>
            <span v-else>⭐</span>
            <span v-if="isFavorite(recipe.id)" class="favorite-icon">❤️</span>
          </button>

          <button
            v-else
            @click="handleRemoveFromFavorites(recipe.id)"
            class="button remove-btn"
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

.button-group button {
  flex: 0 0 auto;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 1rem;
}

.favorite-icon {
  margin-left: 8px;
  font-size: 1.2rem;
  color: #ff0000;
}
</style>
