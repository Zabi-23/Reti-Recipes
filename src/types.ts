


//src/types.ts
export interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
}


export interface ApiResponse {
  results: Recipe[]
  offset: number
  number: number
  totalResults: number
}
export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

