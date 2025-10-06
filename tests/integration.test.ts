import { formatText, capitalizeWords, truncateText, normalizeText, createHtmlTemplate, createTextBlock, createQuoteBlock } from '../src/index';

describe('Integration Tests', () => {
  describe('Module Integration', () => {
    it('should export all formatters from main index', () => {
      expect(typeof formatText).toBe('function');
      expect(typeof capitalizeWords).toBe('function');
      expect(typeof truncateText).toBe('function');
      expect(typeof normalizeText).toBe('function');
    });

    it('should export all templates from main index', () => {
      expect(typeof createHtmlTemplate).toBe('function');
      expect(typeof createTextBlock).toBe('function');
      expect(typeof createQuoteBlock).toBe('function');
    });
  });

  describe('Real-world Usage Scenarios', () => {
    it('should format a blog post title', () => {
      const title = 'hello world from typescript';
      const formatted = formatText(title, { camel: true });
      expect(formatted).toBe('helloWorldFromTypescript');
    });

    it('should create a complete HTML document', () => {
      const content = createTextBlock('Welcome to our site!', 'welcome');
      const html = createHtmlTemplate(content, { title: 'Welcome Page' });
      
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<title>Welcome Page</title>');
      expect(html).toContain('<div class="welcome">Welcome to our site!</div>');
    });

    it('should process a long text with multiple operations', () => {
      const text = '  this is a very long text that needs to be processed  ';
      const normalized = normalizeText(text);
      const capitalized = capitalizeWords(normalized);
      const truncated = truncateText(capitalized, 20);
      
      expect(normalized).toBe('this is a very long text that needs to be processed');
      expect(capitalized).toBe('This Is A Very Long Text That Needs To Be Processed');
      expect(truncated).toBe('This Is A Very Lo...');
    });

    it('should create a quote with proper formatting', () => {
      const quote = createQuoteBlock('The best way to predict the future is to create it.', 'Peter Drucker');
      const html = createHtmlTemplate(quote, { title: 'Inspirational Quotes' });
      
      expect(html).toContain('<blockquote class="highlight">');
      expect(html).toContain('<p>The best way to predict the future is to create it.</p>');
      expect(html).toContain('<cite>— Peter Drucker</cite>');
    });

    it('should handle variable name generation', () => {
      const functionName = 'get user profile data';
      const camelCase = formatText(functionName, { camel: true });
      const snakeCase = formatText(functionName, { snake: true });
      
      expect(camelCase).toBe('getUserProfileData');
      expect(snakeCase).toBe('get_user_profile_data');
    });
  });
});
