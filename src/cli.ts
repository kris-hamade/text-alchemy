#!/usr/bin/env node

/**
 * CLI interface for pretty-text module
 */

import { formatText, capitalizeWords, truncateText, normalizeText, createEmailTemplate, createFormattedEmailContent } from './index';

interface CliOptions {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  camel?: boolean;
  snake?: boolean;
  capitalize?: boolean;
  truncate?: number;
  normalize?: boolean;
  html?: boolean;
  title?: string;
  quote?: boolean;
  author?: string;
  // Email template options
  subject?: string;
  recipient?: string;
  sender?: string;
  template?: string;
  greeting?: string;
  closing?: string;
  signature?: string;
  format?: string;
}

function parseArgs(): { command: string; text: string; options: CliOptions } {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showHelp();
    process.exit(0);
  }

  const command = args[0];
  const options: CliOptions = {};
  
  // Parse flags first to separate them from text
  const textArgs: string[] = [];
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = args[i + 1];
      
      switch (key) {
        case 'bold':
          options.bold = true;
          break;
        case 'italic':
          options.italic = true;
          break;
        case 'underline':
          options.underline = true;
          break;
        case 'color':
          options.color = value;
          i++; // Skip the value
          break;
        case 'camel':
          options.camel = true;
          break;
        case 'snake':
          options.snake = true;
          break;
        case 'capitalize':
          options.capitalize = true;
          break;
        case 'truncate':
          options.truncate = parseInt(value);
          i++; // Skip the value
          break;
        case 'normalize':
          options.normalize = true;
          break;
        case 'html':
          options.html = true;
          break;
        case 'title':
          options.title = value;
          i++; // Skip the value
          break;
        case 'quote':
          options.quote = true;
          break;
        case 'author':
          options.author = value;
          i++; // Skip the value
          break;
        case 'subject':
          options.subject = value;
          i++; // Skip the value
          break;
        case 'recipient':
          options.recipient = value;
          i++; // Skip the value
          break;
        case 'sender':
          options.sender = value;
          i++; // Skip the value
          break;
        case 'template':
          options.template = value;
          i++; // Skip the value
          break;
        case 'greeting':
          options.greeting = value;
          i++; // Skip the value
          break;
        case 'closing':
          options.closing = value;
          i++; // Skip the value
          break;
        case 'signature':
          options.signature = value;
          i++; // Skip the value
          break;
        case 'format':
          options.format = value;
          i++; // Skip the value
          break;
      }
    } else {
      textArgs.push(arg);
    }
  }
  
  const text = textArgs.join(' ');

  return { command, text, options };
}

function showHelp() {
    console.log(`
📝 Pretty Text CLI

Usage: pretty-text <command> <text> [options]

Commands:
  format    Format text with styling options
  html      Generate HTML template
  quote     Create a quote block
  email     Create an email template

Options:
  --bold              Make text bold
  --italic            Make text italic
  --underline         Make text underlined
  --color <color>     Set text color (red, green, blue, yellow, purple, cyan)
  --camel             Convert to camelCase
  --snake             Convert to snake_case
  --capitalize        Capitalize words
  --truncate <length> Truncate text to specified length
  --normalize         Normalize whitespace
  --html              Generate HTML output
  --title <title>     Set HTML title
  --quote             Create quote block
  --author <author>   Set quote author
  
  Email Options:
  --subject <subject>     Set email subject
  --recipient <email>     Set recipient email
  --sender <email>        Set sender email
  --template <type>       Set template type (simple, pretty, professional, casual)
  --greeting <text>       Set greeting text
  --closing <text>        Set closing text
  --signature <text>      Set signature text
  --format <type>         Set output format (html, text)

Examples:
  pretty-text format "Hello World" --bold --color red
  pretty-text format "hello world" --capitalize
  pretty-text format "hello world from typescript" --camel
  pretty-text format "hello world from typescript" --snake
  pretty-text format "very long text" --truncate 20
  pretty-text html "My content" --title "My Page"
  pretty-text quote "Great quote" --author "Author Name"
  pretty-text email "Hello, this is my message" --subject "Test Email" --template pretty --greeting "Dear Friend"
`);
}

function executeCommand(command: string, text: string, options: CliOptions) {
    let result = text;

    switch (command) {
        case 'format':
            if (options.capitalize) {
                result = capitalizeWords(text);
            } else if (options.truncate) {
                result = truncateText(text, options.truncate);
            } else if (options.normalize) {
                result = normalizeText(text);
            } else {
        result = formatText(text, {
          bold: options.bold,
          italic: options.italic,
          underline: options.underline,
          color: options.color as any,
          camel: options.camel,
          snake: options.snake
        });
            }
            break;

        case 'html':
            // Use email template for HTML generation with document styling
            const htmlContent = createFormattedEmailContent(text, {
                greeting: options.quote ? undefined : 'Document',
                closing: options.quote ? options.author : undefined,
                signature: options.quote ? undefined : 'Generated with Text Alchemy',
                bold: options.bold,
                italic: options.italic,
                color: options.color
            });
            
            result = createEmailTemplate(htmlContent, {
                subject: options.title || 'Pretty Text Document',
                template: 'professional', // Use professional template for documents
                format: 'html'
            });
            break;

        case 'quote':
            // Use email template for quote generation
            const quoteContent = createFormattedEmailContent(text, {
                greeting: 'Quote',
                closing: options.author,
                signature: 'Generated with Text Alchemy'
            });
            
            result = createEmailTemplate(quoteContent, {
                subject: 'Quote',
                template: 'pretty',
                format: 'html'
            });
            break;

        case 'email':
            const emailContent = createFormattedEmailContent(text, {
                greeting: options.greeting,
                closing: options.closing,
                signature: options.signature,
                bold: options.bold,
                italic: options.italic,
                color: options.color
            });
            
            result = createEmailTemplate(emailContent, {
                subject: options.subject,
                recipient: options.recipient,
                sender: options.sender,
                template: options.template as any,
                format: options.format as any
            });
            break;

        default:
            console.error(`Unknown command: ${command}`);
            showHelp();
            process.exit(1);
    }

    console.log(result);
}

// Main execution
try {
    const { command, text, options } = parseArgs();
    executeCommand(command, text, options);
} catch (error) {
    console.error('Error:', error);
    process.exit(1);
}
