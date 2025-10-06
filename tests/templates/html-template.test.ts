import { createHtmlTemplate, createTextBlock, createQuoteBlock } from '../../src/templates/html-template';

describe('HTML Template', () => {
  describe('createHtmlTemplate', () => {
    it('should create basic HTML template', () => {
      const result = createHtmlTemplate('<h1>Hello World</h1>');
      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain('<html lang="en">');
      expect(result).toContain('<title>Pretty Text Document</title>');
      expect(result).toContain('<h1>Hello World</h1>');
    });

    it('should use custom title', () => {
      const result = createHtmlTemplate('<h1>Hello</h1>', { title: 'Custom Title' });
      expect(result).toContain('<title>Custom Title</title>');
    });

    it('should use custom body class', () => {
      const result = createHtmlTemplate('<h1>Hello</h1>', { bodyClass: 'custom-class' });
      expect(result).toContain('<body class="custom-class">');
    });

    it('should include custom styles', () => {
      const result = createHtmlTemplate('<h1>Hello</h1>', { styles: '.custom { color: red; }' });
      expect(result).toContain('.custom { color: red; }');
    });

    it('should handle all options together', () => {
      const result = createHtmlTemplate('<h1>Hello</h1>', {
        title: 'My Page',
        bodyClass: 'my-page',
        styles: '.my-page { background: blue; }'
      });
      expect(result).toContain('<title>My Page</title>');
      expect(result).toContain('<body class="my-page">');
      expect(result).toContain('.my-page { background: blue; }');
    });
  });

  describe('createTextBlock', () => {
    it('should create text block with default class', () => {
      const result = createTextBlock('Hello World');
      expect(result).toBe('<div class="text-block">Hello World</div>');
    });

    it('should create text block with custom class', () => {
      const result = createTextBlock('Hello World', 'highlight');
      expect(result).toBe('<div class="highlight">Hello World</div>');
    });

    it('should handle empty content', () => {
      const result = createTextBlock('');
      expect(result).toBe('<div class="text-block"></div>');
    });
  });

  describe('createQuoteBlock', () => {
    it('should create quote block without author', () => {
      const result = createQuoteBlock('Great quote here');
      expect(result).toContain('<blockquote class="highlight">');
      expect(result).toContain('<p>Great quote here</p>');
      expect(result).not.toContain('<cite>');
    });

    it('should create quote block with author', () => {
      const result = createQuoteBlock('Great quote here', 'Author Name');
      expect(result).toContain('<blockquote class="highlight">');
      expect(result).toContain('<p>Great quote here</p>');
      expect(result).toContain('<cite>— Author Name</cite>');
    });

    it('should handle empty quote', () => {
      const result = createQuoteBlock('');
      expect(result).toContain('<p></p>');
    });

    it('should handle empty author', () => {
      const result = createQuoteBlock('Quote', '');
      expect(result).toContain('<p>Quote</p>');
      expect(result).not.toContain('<cite>');
    });
  });
});
