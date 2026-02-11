// src/lib/stagger.ts
export function stagger(i: number, base = 0.04, step = 0.03) {
  return base + i * step;
}

/**
 * Adaptive stagger for mobile vs desktop:
 * - mobile: slightly faster + fewer ms between items
 * - desktop: a touch slower + more breathing space
 */
export function staggerAdaptive(i: number, isMobile: boolean) {
  return isMobile ? stagger(i, 0.03, 0.022) : stagger(i, 0.05, 0.032);
}
