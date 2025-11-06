import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem('favorites', JSON.stringify(favorites)); } catch {}
  }, [favorites]);

  function addFavorite(item){
    setFavorites(prev => {
      if(prev.find(x => x.id === item.id)) return prev;
      return [...prev, item];
    });
  }
  function removeFavorite(id){
    setFavorites(prev => prev.filter(x => x.id !== id));
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(){
  return useContext(FavoritesContext);
}
