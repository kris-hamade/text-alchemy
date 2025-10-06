/**
 * Text formatting utilities
 */

export interface TextOptions {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'cyan';
  camel?: boolean;
  snake?: boolean;
}

/**
 * Formats text with various styling options
 * @param text - The text to format
 * @param options - Formatting options
 * @returns Formatted text string
 */
export function formatText(text: string, options: TextOptions = {}): string {
  let result = text;

  // Apply case conversion first (before styling)
  if (options.camel) {
    result = result
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, letter) => letter.toUpperCase())
      .replace(/^[A-Z]/, (letter) => letter.toLowerCase());
  }

  if (options.snake) {
    result = result
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, ''); // Remove leading/trailing underscores
  }
  
  // Apply styling after case conversion
  if (options.bold) {
    result = `**${result}**`;
  }
  
  if (options.italic) {
    result = `*${result}*`;
  }
  
  if (options.underline) {
    result = `__${result}__`;
  }
  
  if (options.color) {
    const colorMap = {
      red: '\x1b[31m',
      green: '\x1b[32m',
      blue: '\x1b[34m',
      yellow: '\x1b[33m',
      purple: '\x1b[35m',
      cyan: '\x1b[36m'
    };
    result = `${colorMap[options.color]}${result}\x1b[0m`;
  }
  
  return result;
}
