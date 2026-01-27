import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wifi, WifiOff, RefreshCw, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Asset } from "@/lib/types";

interface LiveDataToggleProps {
  asset: Asset | null;
  onLiveDataReceived?: (livePrice: number, isLive: boolean) => void;
}

export function LiveDataToggle({ asset, onLiveDataReceived }: LiveDataToggleProps) {
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveData = useCallback(async () => {
    if (!asset || !isLiveMode) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/live-market-data?assetId=${asset.id}&type=${asset.type}&basePrice=${asset.price}&dataType=quote`,
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        const isLive = result.data.source === 'live';
        setIsConnected(isLive);
        setLastUpdate(new Date());
        
        if (onLiveDataReceived) {
          onLiveDataReceived(result.data.price, isLive);
        }
      } else {
        setIsConnected(false);
      }
    } catch (err) {
      console.error('Live data fetch error:', err);
      setError(err instanceof Error ? err.message : 'Connection failed');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [asset, isLiveMode, onLiveDataReceived]);

  // Fetch on mount and when asset changes
  useEffect(() => {
    if (isLiveMode && asset) {
      fetchLiveData();
      
      // Refresh every 30 seconds when in live mode
      const interval = setInterval(fetchLiveData, 30000);
      return () => clearInterval(interval);
    }
  }, [asset?.id, isLiveMode, fetchLiveData]);

  const toggleLiveMode = () => {
    setIsLiveMode(prev => !prev);
    if (!isLiveMode) {
      // Turning on - trigger immediate fetch
      setTimeout(fetchLiveData, 100);
    } else {
      // Turning off
      setIsConnected(false);
    }
  };

  const formatLastUpdate = () => {
    if (!lastUpdate) return 'Never';
    const seconds = Math.floor((Date.now() - lastUpdate.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  return (
    <div className="flex items-center gap-3">
      {/* Live Mode Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLiveMode}
        className={cn(
          "gap-2 transition-all duration-300",
          isLiveMode && isConnected && "border-green-500/50 bg-green-500/10 text-green-500",
          isLiveMode && !isConnected && "border-yellow-500/50 bg-yellow-500/10 text-yellow-500",
          !isLiveMode && "border-muted-foreground/30 text-muted-foreground"
        )}
      >
        {isLoading ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : isLiveMode ? (
          isConnected ? (
            <Wifi className="w-4 h-4" />
          ) : (
            <WifiOff className="w-4 h-4" />
          )
        ) : (
          <WifiOff className="w-4 h-4" />
        )}
        {isLiveMode ? (isConnected ? 'Live' : 'Connecting...') : 'Simulated'}
      </Button>

      {/* Status Badge */}
      <Badge 
        variant="outline" 
        className={cn(
          "text-xs gap-1.5 transition-all duration-300",
          isConnected && isLiveMode 
            ? "bg-green-500/10 border-green-500/30 text-green-500" 
            : "bg-muted/50 border-muted-foreground/20 text-muted-foreground"
        )}
      >
        <span 
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            isConnected && isLiveMode ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
          )} 
        />
        {isConnected && isLiveMode ? 'LIVE FEED' : 'OFFLINE'}
      </Badge>

      {/* Last Update Time */}
      {lastUpdate && isLiveMode && (
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {formatLastUpdate()}
        </div>
      )}

      {/* Manual Refresh */}
      {isLiveMode && (
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchLiveData}
          disabled={isLoading}
          className="h-8 w-8"
        >
          <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
        </Button>
      )}

      {/* Error indicator */}
      {error && (
        <span className="text-xs text-destructive hidden sm:inline">
          {error}
        </span>
      )}
    </div>
  );
}
