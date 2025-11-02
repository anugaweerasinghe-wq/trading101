const FAVORITES_KEY = 'tradesandbox_favorites';

export function getFavorites(): string[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addFavorite(assetId: string): string[] {
  const favorites = getFavorites();
  if (!favorites.includes(assetId)) {
    favorites.push(assetId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
  return favorites;
}

export function removeFavorite(assetId: string): string[] {
  const favorites = getFavorites();
  const updated = favorites.filter(id => id !== assetId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

export function toggleFavorite(assetId: string): boolean {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(assetId);
  
  if (isFavorite) {
    removeFavorite(assetId);
  } else {
    addFavorite(assetId);
  }
  
  return !isFavorite;
}
