import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, RefreshCw, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Asset } from '@/lib/types';
import { useLiveMarketData } from '@/hooks/useLiveMarketData';
interface LiveDataToggleProps { asset: Asset | null; onLiveDataReceived?: (price: number, isProvider: boolean) => void }
export function LiveDataToggle({ asset, onLiveDataReceived }: LiveDataToggleProps) {
  const [enabled, setEnabled] = useState(true);
  const { liveData, isLoading, error, refetch } = useLiveMarketData(asset, { enabled });
  const callback = useRef(onLiveDataReceived); callback.current = onLiveDataReceived;
  const provider = enabled && liveData?.source === 'live';
  const status = liveData?.provenance?.status;
  useEffect(() => { if (liveData && enabled) callback.current?.(liveData.price, liveData.source === 'live'); }, [liveData, enabled]);
  const label = !enabled ? 'Quote updates paused' : isLoading && !liveData ? 'Loading quote…' : provider ? (status === 'delayed' ? 'Cached provider quote' : 'Provider snapshot') : liveData ? 'Fixed simulation quote' : 'Quote unavailable';
  return <div className="flex flex-wrap items-center gap-3">
    <Button variant="outline" size="sm" onClick={() => setEnabled(v => !v)} aria-pressed={enabled}
      className={cn('gap-2', provider ? 'border-primary/40 bg-primary/10 text-primary' : 'text-muted-foreground')}>
      {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : provider ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}{label}
    </Button>
    {enabled && liveData && <Badge variant="outline" className="text-xs text-muted-foreground">{provider ? liveData.provenance?.provider : 'SIMULATION'}</Badge>}
    {enabled && provider && liveData?.lastUpdated && <span className="hidden sm:inline-flex gap-1.5 items-center text-xs text-muted-foreground"><Clock className="w-3 h-3" />Observed {new Date(liveData.lastUpdated).toLocaleTimeString()}</span>}
    {enabled && <Button variant="ghost" size="icon" onClick={() => void refetch()} disabled={isLoading} aria-label="Refresh quote" className="h-8 w-8"><RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} /></Button>}
    {enabled && error && <span role="status" className="text-xs text-muted-foreground">{error}{provider && ' Showing the last provider snapshot.'}</span>}
  </div>;
}
