"use client";
import { useSyncExternalStore } from 'react';
const subscribe = (callback: () => void) => {
  const media = matchMedia('(min-width: 1025px)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};
/** Text entrances belong to desktop; mobile/tablet copy stays unsplit. */
export function useDesktopText() {
  return useSyncExternalStore(subscribe, () => matchMedia('(min-width: 1025px)').matches, () => false);
}
