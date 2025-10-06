/**
 * Text utility functions
 */

/**
 * Capitalizes the first letter of each word in a string
 * @param text - The text to capitalize
 * @returns Capitalized text
 */
export function capitalizeWords(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Truncates text to a specified length with an optional suffix
 * @param text - The text to truncate
 * @param maxLength - Maximum length of the result
 * @param suffix - Optional suffix to add (default: '...')
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Removes extra whitespace and normalizes line breaks
 * @param text - The text to normalize
 * @returns Normalized text
 */
export function normalizeText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .trim();
}
