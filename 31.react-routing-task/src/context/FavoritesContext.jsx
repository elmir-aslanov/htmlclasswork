import { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (book) => {
    const exists = favorites.find((f) => f.id === book.id);
    if (exists) {
      toast.error('Book is already in favorites!');
      return;
    }
    setFavorites([...favorites, book]);
    toast.success('Added to favorites!');
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((f) => f.id !== id));
    toast.success('Removed from favorites!');
  };

  const clearFavorites = () => {
    if (favorites.length === 0) {
      toast('Favorites list is already empty.', { icon: 'ℹ️' });
      return;
    }
    setFavorites([]);
    toast.success('All favorites cleared!');
  };

  const isFavorite = (id) => {
    return favorites.some((f) => f.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, clearFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
