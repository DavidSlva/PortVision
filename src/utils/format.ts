export function formatVolume(volume: number): string {
  if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(1)}M TEU`;
  }
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}K TEU`;
  }
  return `${volume} TEU`;
}