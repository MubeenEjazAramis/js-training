import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// 1. Create the Context for Favorites
export const FavoritesContext = createContext(null);

// 2. Provider component managing favorite recipes
export function FavoritesProvider({ children }) {
  // Store favorites in localStorage so they survive page reloads
  const [favorites, setFavorites] = useLocalStorage('recipe_app_favorites', []);
  // State to control if the Favorites slide-out panel is open
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Helper to check if a specific meal ID is already favorited
  const isFavorite = (mealId) => {
    return favorites.some((item) => String(item.idMeal) === String(mealId));
  };

  // Toggle favorite: add if missing, remove if already present
  const toggleFavorite = (meal) => {
    if (!meal || !meal.idMeal) return;

    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some(
        (item) => String(item.idMeal) === String(meal.idMeal)
      );

      if (exists) {
        // Remove from favorites
        return prevFavorites.filter(
          (item) => String(item.idMeal) !== String(meal.idMeal)
        );
      } else {
        // Add to favorites (keep clean subset of data)
        const newFav = {
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          strCategory: meal.strCategory || 'General',
          strArea: meal.strArea || 'International',
        };
        return [newFav, ...prevFavorites];
      }
    });
  };

  // Explicitly remove a recipe by its ID
  const removeFavorite = (mealId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => String(item.idMeal) !== String(mealId))
    );
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const value = {
    favorites,
    favoritesCount: favorites.length,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
    isDrawerOpen,
    setIsDrawerOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 3. Custom hook to consume FavoritesContext
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

export default FavoritesContext;
