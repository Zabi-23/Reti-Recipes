/*

// src/composables/useRecipes.ts
import { ref, computed, watch } from 'vue';
import type { Recipe, Meal } from '@/types';

export function useRecipes() {
  const recipes = ref<Recipe[]>([]);
  const favorites = ref<Recipe[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const currentPage = ref<number>(1);
  const totalResults = ref<number>(0);

  const favoritesCount = computed(() => favorites.value.length);

  watch(favorites, () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value));
  }, { deep: true });

  async function fetchRecipes(query: string = '', page: number = 1): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();

      recipes.value = data.meals?.map((meal: Meal) => ({
        id: parseInt(meal.idMeal, 10),
        title: meal.strMeal,
        image: meal.strMealThumb,
        summary: meal.strInstructions,
      })) || [];

      totalResults.value = recipes.value.length;
      currentPage.value = page;
    } catch (err) {
      error.value = 'Error fetching recipes. Please try again.';
      console.error('Error fetching recipes:', err);
    } finally {
      loading.value = false;
    }
  }

  function addToFavorites(recipe: Recipe): void {
    if (!favorites.value.some((fav) => fav.id === recipe.id)) {
      favorites.value.push(recipe);
    }
  }

  function removeFromFavorites(recipeId: number): void {
    favorites.value = favorites.value.filter((recipe) => recipe.id !== recipeId);
  }

  function loadFavorites(): void {
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



 */


import { ref, computed, watch } from "vue";
import axios from "axios"; // Importera Axios för API-anrop
import type { Recipe } from "@/types";

export function useRecipes() {
  const recipes = ref<Recipe[]>([]);
  const favorites = ref<Recipe[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const currentPage = ref<number>(1);
  const totalResults = ref<number>(0);

  const favoritesCount = computed(() => favorites.value.length);

  // Lagra favoriter lokalt i localStorage
  watch(
    favorites,
    () => {
      localStorage.setItem("favorites", JSON.stringify(favorites.value));
    },
    { deep: true }
  );

  // Hämta recept från din server
  async function fetchRecipes(query: string = "", page: number = 1): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get("http://localhost:5001/api/recipes", {
        params: { q: query }, // Skicka frågeparametern till servern
      });

      recipes.value = response.data; // Datan returneras redan i rätt format från servern
      totalResults.value = recipes.value.length; // Uppdatera totala resultaten
      currentPage.value = page; // Uppdatera aktuell sida
    } catch (err) {
      error.value = "Error fetching recipes. Please try again.";
      console.error("Error fetching recipes:", err);
    } finally {
      loading.value = false;
    }
  }

  // Hämta favoriter från servern
  async function fetchFavorites(): Promise<void> {
    try {
      const response = await axios.get("http://localhost:5001/api/favorites");
      favorites.value = response.data;
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    }
  }

  // Lägg till recept i favoriter via servern
  async function addToFavorites(recipe: Recipe): Promise<void> {
    try {
      const response = await axios.post("http://localhost:5001/api/favorites", recipe);
      favorites.value.push(response.data); // Uppdatera favoriter med responsen
    } catch (err) {
      console.error("Failed to add to favorites:", err);
    }
  }

  // Ta bort recept från favoriter via servern
  async function removeFromFavorites(recipeId: number): Promise<void> {
    try {
      await axios.delete(`http://localhost:5001/api/favorites/${recipeId}`);
      favorites.value = favorites.value.filter((recipe) => recipe.id !== recipeId);
    } catch (err) {
      console.error("Failed to remove from favorites:", err);
    }
  }

  // Ladda lokala favoriter från localStorage (som fallback)
  function loadFavorites(): void {
    const storedFavorites = localStorage.getItem("favorites");
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
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
    loadFavorites,
  };
}
