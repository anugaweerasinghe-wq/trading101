import { useState, useMemo, useRef, useEffect } from "react";
import { Asset } from "@/lib/types";
import { Search, ChevronDown, Star, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetSearchDropdownProps {
  assets: Asset[];
  selectedAsset: Asset | null;
  favorites: string[];
  onSelectAsset: (asset: Asset) => void;
  onToggleFavorite: (assetId: string) => void;
}

type FilterType = 'all' | 'crypto' | 'stock' | 'etf' | 'forex' | 'commodity';

export function AssetSearchDropdown({
  assets,
  selectedAsset,
  favorites,
  onSelectAsset,
  onToggleFavorite,
}: AssetSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredAssets = useMemo(() => {
    let result = assets;
    
    // Apply type filter
    if (filter !== 'all') {
      result = result.filter(a => a.type === filter);
    }
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(a => 
        a.symbol.toLowerCase().includes(searchLower) ||
        a.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort favorites first
    result.sort((a, b) => {
      const aFav = favorites.includes(a.id);
      const bFav = favorites.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
    
    return result;
  }, [assets, search, filter, favorites]);

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'stock', label: 'Stocks' },
    { value: 'etf', label: 'ETFs' },
    { value: 'forex', label: 'Forex' },
    { value: 'commodity', label: 'Commodities' },
  ];

  return (
    <div ref={dropdownRef} className="relative w-full max-w-md">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl glass-panel border border-white/10 hover:border-primary/30 transition-all"
      >
        {selectedAsset ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">{selectedAsset.symbol.charAt(0)}</span>
            </div>
            <div className="text-left">
              <p className="font-semibold">{selectedAsset.symbol}</p>
              <p className="text-xs text-muted-foreground">{selectedAsset.name}</p>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground">Select an asset...</span>
        )}
        <ChevronDown className={cn(
          "w-5 h-5 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
          {/* Search Input */}
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search 150+ assets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                autoFocus
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1 p-3 border-b border-white/5 overflow-x-auto scrollbar-hide">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                  filter === f.value
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Asset List */}
          <div className="max-h-80 overflow-y-auto scrollbar-thin">
            {filteredAssets.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <p className="text-sm">No assets found</p>
              </div>
            ) : (
              filteredAssets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => {
                    onSelectAsset(asset);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-white/5 transition-colors",
                    selectedAsset?.id === asset.id && "bg-primary/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(asset.id);
                      }}
                      className="p-1 -m-1"
                    >
                      <Star className={cn(
                        "w-4 h-4 transition-colors",
                        favorites.includes(asset.id)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground hover:text-yellow-500"
                      )} />
                    </button>
                    <div className="text-left">
                      <p className="font-medium">{asset.symbol}</p>
                      <p className="text-xs text-muted-foreground">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium tabular-nums">
                      ${typeof asset.price === 'number' ? asset.price.toLocaleString() : '—'}
                    </p>
                    <p className={cn(
                      "text-xs tabular-nums flex items-center gap-1 justify-end",
                      (asset.changePercent ?? 0) >= 0 ? "text-profit" : "text-loss"
                    )}>
                      {(asset.changePercent ?? 0) >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {(asset.changePercent ?? 0) >= 0 ? '+' : ''}{(asset.changePercent ?? 0).toFixed(2)}%
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
