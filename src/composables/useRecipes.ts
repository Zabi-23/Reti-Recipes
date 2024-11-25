
/* src/composables/useRecipes.ts */

import { ref, computed, watch } from 'vue';
import type { Recipe, Meal } from '@/types';

export function useRecipes() {
  const recipes = ref<Recipe[]>([]);
  const favorites = ref<Recipe[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const totalResults = ref(0);

  const favoritesCount = computed(() => favorites.value.length);


  watch(favorites, () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value));
  }, { deep: true });

  async function fetchRecipes(query: string = '', page: number = 1) {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();

      recipes.value = data.meals
        ? data.meals.map((meal: Meal) => ({
            id: parseInt(meal.idMeal, 10),
            title: meal.strMeal,
            image: meal.strMealThumb,
            summary: meal.strInstructions,
          }))
        : [];

      totalResults.value = recipes.value.length;
      currentPage.value = page;
    } catch (err) {
      error.value = 'Error fetching recipes. Please try again.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  function addToFavorites(recipe: Recipe) {
    if (!favorites.value.some((fav: Recipe) => fav.id === recipe.id)) {
      favorites.value.push(recipe);
    }
  }

  function removeFromFavorites(recipeId: number) {
    favorites.value = favorites.value.filter((recipe: Recipe) => recipe.id !== recipeId);
  }

  function loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    favorites.value = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  return {
    recipes,
    favorites,
    loading,
    error,
    currentPage,
    totalResults,
    favoritesCount,
    fetchRecipes,
    addToFavorites,
    removeFromFavorites,
    loadFavorites,
  };
}



