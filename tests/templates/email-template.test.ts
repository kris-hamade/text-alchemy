/**
 * Tests for email template functionality
 */

import { createEmailTemplate, createFormattedEmailContent, EmailContent, EmailTemplateOptions } from '../../src/templates/email-template';

describe('Email Template', () => {
  describe('createFormattedEmailContent', () => {
    it('should create basic email content', () => {
      const content = createFormattedEmailContent('Hello world');
      
      expect(content).toEqual({
        greeting: undefined,
        body: 'Hello world',
        closing: undefined,
        signature: undefined
      });
    });

    it('should create email content with all options', () => {
      const content = createFormattedEmailContent('Hello world', {
        greeting: 'Dear Friend',
        closing: 'Best regards',
        signature: 'John Doe',
        bold: true,
        italic: true,
        color: 'blue'
      });
      
      expect(content.greeting).toBe('Dear Friend');
      expect(content.body).toBe('<span style="color: blue;"><em><strong>Hello world</strong></em></span>');
      expect(content.closing).toBe('Best regards');
      expect(content.signature).toBe('John Doe');
    });

    it('should apply bold formatting', () => {
      const content = createFormattedEmailContent('Test', { bold: true });
      expect(content.body).toBe('<strong>Test</strong>');
    });

    it('should apply italic formatting', () => {
      const content = createFormattedEmailContent('Test', { italic: true });
      expect(content.body).toBe('<em>Test</em>');
    });

    it('should apply color formatting', () => {
      const content = createFormattedEmailContent('Test', { color: 'red' });
      expect(content.body).toBe('<span style="color: red;">Test</span>');
    });

    it('should apply multiple formatting options', () => {
      const content = createFormattedEmailContent('Test', { 
        bold: true, 
        italic: true, 
        color: 'green' 
      });
      expect(content.body).toBe('<span style="color: green;"><em><strong>Test</strong></em></span>');
    });
  });

  describe('createEmailTemplate', () => {
    const mockContent: EmailContent = {
      greeting: 'Dear Friend',
      body: 'Hello, this is a test message.',
      closing: 'Best regards',
      signature: 'John Doe'
    };

    it('should create HTML email template with default options', () => {
      const template = createEmailTemplate(mockContent);
      
      expect(template).toContain('<!DOCTYPE html>');
      expect(template).toContain('<html lang="en">');
      expect(template).toContain('Email from Text Alchemy');
      expect(template).toContain('Dear Friend');
      expect(template).toContain('Hello, this is a test message.');
      expect(template).toContain('Best regards');
      expect(template).toContain('John Doe');
    });

    it('should create email template with custom options', () => {
      const options: EmailTemplateOptions = {
        subject: 'Custom Subject',
        recipient: 'recipient@example.com',
        sender: 'sender@example.com',
        template: 'professional'
      };
      
      const template = createEmailTemplate(mockContent, options);
      
      expect(template).toContain('Custom Subject');
      expect(template).toContain('recipient@example.com');
      expect(template).toContain('sender@example.com');
    });

    it('should create text format email', () => {
      const template = createEmailTemplate(mockContent, { format: 'text' });
      
      expect(template).toContain('Subject: Email from Text Alchemy');
      expect(template).toContain('To: Recipient');
      expect(template).toContain('From: Sender');
      expect(template).toContain('Dear Friend');
      expect(template).toContain('Hello, this is a test message.');
      expect(template).toContain('Best regards');
      expect(template).toContain('John Doe');
      expect(template).toContain('Generated with Text Alchemy');
    });

    it('should create email with simple template', () => {
      const template = createEmailTemplate(mockContent, { template: 'simple' });
      expect(template).toContain('background: #007bff');
    });

    it('should create email with pretty template', () => {
      const template = createEmailTemplate(mockContent, { template: 'pretty' });
      expect(template).toContain('linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
    });

    it('should create email with professional template', () => {
      const template = createEmailTemplate(mockContent, { template: 'professional' });
      expect(template).toContain('linear-gradient(135deg, #2c3e50 0%, #34495e 100%)');
    });

    it('should create email with casual template', () => {
      const template = createEmailTemplate(mockContent, { template: 'casual' });
      expect(template).toContain('linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)');
    });

    it('should handle missing optional content', () => {
      const minimalContent: EmailContent = {
        body: 'Just the message'
      };
      
      const template = createEmailTemplate(minimalContent);
      
      expect(template).toContain('Just the message');
      expect(template).not.toContain('greeting');
      expect(template).not.toContain('closing');
      expect(template).not.toContain('signature');
    });

    it('should include proper CSS styling', () => {
      const template = createEmailTemplate(mockContent);
      
      expect(template).toContain('font-family: -apple-system');
      expect(template).toContain('.email-container');
      expect(template).toContain('.email-header');
      expect(template).toContain('.email-body');
      expect(template).toContain('.email-footer');
    });

    it('should be responsive with viewport meta tag', () => {
      const template = createEmailTemplate(mockContent);
      
      expect(template).toContain('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    });
  });
});
