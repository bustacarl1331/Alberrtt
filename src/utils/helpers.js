/**
 * Linear interpolation between two values.
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number}
 */
export function lerp(start, end, t) {
  return start + (end - start) * t
}

/**
 * Format a Date object as HH:MM:SS string.
 * @param {Date} date
 * @returns {string}
 */
export function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

/**
 * Detect if the current device is mobile based on viewport width or touch support.
 * @returns {boolean}
 */
export function isMobileDevice() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 || 'ontouchstart' in window
}

/**
 * Check if the user prefers reduced motion via OS/browser settings.
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Clamp a value between a minimum and maximum.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
