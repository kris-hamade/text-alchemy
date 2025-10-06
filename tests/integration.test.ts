import { formatText, capitalizeWords, truncateText, normalizeText, createEmailTemplate, createFormattedEmailContent } from '../src/index';

describe('Integration Tests', () => {
  describe('Module Integration', () => {
    it('should export all formatters from main index', () => {
      expect(typeof formatText).toBe('function');
      expect(typeof capitalizeWords).toBe('function');
      expect(typeof truncateText).toBe('function');
      expect(typeof normalizeText).toBe('function');
    });

    it('should export all templates from main index', () => {
      expect(typeof createEmailTemplate).toBe('function');
      expect(typeof createFormattedEmailContent).toBe('function');
    });
  });

  describe('Real-world Usage Scenarios', () => {
    it('should format a blog post title', () => {
      const title = 'hello world from typescript';
      const formatted = formatText(title, { camel: true });
      expect(formatted).toBe('helloWorldFromTypescript');
    });

    it('should create a complete HTML document using email template', () => {
      const content = createFormattedEmailContent('Welcome to our site!', {
        greeting: 'Welcome',
        signature: 'Site Team'
      });
      const html = createEmailTemplate(content, { 
        subject: 'Welcome Page',
        template: 'professional'
      });
      
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<title>Welcome Page</title>');
      expect(html).toContain('Welcome to our site!');
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

    it('should create a quote with proper formatting using email template', () => {
      const quoteContent = createFormattedEmailContent('The best way to predict the future is to create it.', {
        greeting: 'Quote',
        closing: 'Peter Drucker',
        signature: 'Inspirational Quotes'
      });
      const html = createEmailTemplate(quoteContent, { 
        subject: 'Inspirational Quotes',
        template: 'pretty'
      });
      
      expect(html).toContain('The best way to predict the future is to create it.');
      expect(html).toContain('Peter Drucker');
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
