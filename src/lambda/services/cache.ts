import { ScheduleResponse } from '../types';

const CACHE_TTL = 60 * 60 * 1000; // 1時間

interface CacheEntry {
  data: ScheduleResponse[] | null;
  timestamp: number;
}

const scheduleCache = new Map<string, CacheEntry>();

export function getCachedSchedule(key: string): ScheduleResponse[] | null {
  const entry = scheduleCache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > CACHE_TTL) {
    scheduleCache.delete(key);
    return null;
  }

  return entry.data;
}

export function setCachedSchedule(
  key: string,
  data: ScheduleResponse[] | null
): void {
  scheduleCache.set(key, {
    data,
    timestamp: Date.now(),
  });
}
