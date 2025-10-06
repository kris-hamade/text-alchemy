import { formatText, TextOptions } from '../../src/formatters/text-formatter';

describe('Text Formatter', () => {
  describe('formatText', () => {
    it('should return original text when no options provided', () => {
      const result = formatText('Hello World');
      expect(result).toBe('Hello World');
    });

    it('should make text bold', () => {
      const result = formatText('Hello World', { bold: true });
      expect(result).toBe('**Hello World**');
    });

    it('should make text italic', () => {
      const result = formatText('Hello World', { italic: true });
      expect(result).toBe('*Hello World*');
    });

    it('should make text underlined', () => {
      const result = formatText('Hello World', { underline: true });
      expect(result).toBe('__Hello World__');
    });

    it('should apply multiple styles', () => {
      const result = formatText('Hello World', { bold: true, italic: true });
      expect(result).toBe('***Hello World***');
    });

    it('should apply color', () => {
      const result = formatText('Hello World', { color: 'red' });
      expect(result).toBe('\x1b[31mHello World\x1b[0m');
    });

    it('should convert to camelCase', () => {
      const result = formatText('hello world from typescript', { camel: true });
      expect(result).toBe('helloWorldFromTypescript');
    });

    it('should convert to snake_case', () => {
      const result = formatText('hello world from typescript', { snake: true });
      expect(result).toBe('hello_world_from_typescript');
    });

    it('should handle camelCase with mixed separators', () => {
      const result = formatText('hello-world from_typescript', { camel: true });
      expect(result).toBe('helloWorldFromTypescript');
    });

    it('should handle snake_case with mixed separators', () => {
      const result = formatText('Hello-World From_TypeScript', { snake: true });
      expect(result).toBe('hello_world_from_typescript');
    });

    it('should handle camelCase with underscores', () => {
      const result = formatText('hello_world_from_typescript', { camel: true });
      expect(result).toBe('helloWorldFromTypescript');
    });

    it('should handle snake_case with hyphens', () => {
      const result = formatText('hello-world-from-typescript', { snake: true });
      expect(result).toBe('hello_world_from_typescript');
    });

    it('should combine camelCase with other styles', () => {
      const result = formatText('hello world', { camel: true, bold: true });
      expect(result).toBe('**helloWorld**');
    });

    it('should combine snake_case with other styles', () => {
      const result = formatText('hello world', { snake: true, italic: true });
      expect(result).toBe('*hello_world*');
    });

    it('should handle empty string', () => {
      const result = formatText('', { bold: true });
      expect(result).toBe('****');
    });

    it('should handle single word', () => {
      const result = formatText('hello', { camel: true });
      expect(result).toBe('hello');
    });

    it('should handle single word snake_case', () => {
      const result = formatText('hello', { snake: true });
      expect(result).toBe('hello');
    });
  });
});
