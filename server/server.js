// server.js
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const API_URL = "https://www.themealdb.com/api/json/v1/1";
const DEFAULT_PORT = process.env.PORT || 5000;

// Endpoint för att hämta recept
app.get("/api/recipes", async (req, res) => {
  const query = req.query.q || "";
  try {
    const response = await axios.get(`${API_URL}/search.php?s=${query}`);
    const meals = response.data.meals || [];
    const recipes = meals.map((meal) => ({
      id: parseInt(meal.idMeal, 10),
      title: meal.strMeal,
      image: meal.strMealThumb,
      summary: meal.strInstructions,
    }));
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// Endpoint för att hantera favoriter
let favorites = [];

app.get("/api/favorites", (req, res) => {
  res.json(favorites);
});

app.post("/api/favorites", (req, res) => {
  const recipe = req.body;
  if (!favorites.find((fav) => fav.id === recipe.id)) {
    favorites.push(recipe);
    res.status(201).json(recipe);
  } else {
    res.status(400).json({ error: "Recipe already in favorites" });
  }
});

app.delete("/api/favorites/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  favorites = favorites.filter((fav) => fav.id !== id);
  res.status(204).end();
});

// Starta servern och hantera portkonflikter
function startServer(port) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is in use. Trying another port...`);
      startServer(port + 1);
    } else {
      console.error("Error starting server:", err);
    }
  });
}

startServer(DEFAULT_PORT);
