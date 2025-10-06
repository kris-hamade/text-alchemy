# Text Alchemy

[![CI](https://github.com/kris-hamade/text-alchemy/workflows/CI/badge.svg)](https://github.com/kris-hamade/text-alchemy/actions)
[![npm version](https://badge.fury.io/js/text-alchemy.svg)](https://badge.fury.io/js/text-alchemy)
[![Coverage Status](https://codecov.io/gh/kris-hamade/text-alchemy/branch/main/graph/badge.svg)](https://codecov.io/gh/kris-hamade/text-alchemy)

A comprehensive TypeScript library for text formatting, manipulation, and email template generation. Perfect for CLI tools, web applications, and any project that needs advanced text processing capabilities with beautiful email templates.

## ✨ Features

- 🎨 **Text Formatting**: Bold, italic, underline, and colored text
- 🔄 **Case Conversion**: camelCase, snake_case, and proper capitalization
- ✂️ **Text Manipulation**: Truncation, normalization, and whitespace handling
- 📧 **Email Templates**: Generate beautiful HTML emails with multiple template styles
- 🌐 **HTML Documents**: Create professional HTML documents using email templates
- 🖥️ **CLI Interface**: Command-line tool for quick text processing
- 📦 **TypeScript**: Full type safety and IntelliSense support
- 🧪 **Well Tested**: Comprehensive test suite with Jest

## 📦 Installation

```bash
npm install text-alchemy
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { formatText, capitalizeWords, truncateText, normalizeText } from 'text-alchemy';

// Text formatting
const boldText = formatText('Hello World', { bold: true });
// Result: "**Hello World**"

const coloredText = formatText('Hello World', { color: 'red' });
// Result: "\x1b[31mHello World\x1b[0m"

// Case conversion
const camelCase = formatText('hello world from typescript', { camel: true });
// Result: "helloWorldFromTypescript"

const snakeCase = formatText('hello world from typescript', { snake: true });
// Result: "hello_world_from_typescript"

// Text utilities
const capitalized = capitalizeWords('hello world');
// Result: "Hello World"

const truncated = truncateText('Very long text that should be shortened', 20);
// Result: "Very long text th..."

const normalized = normalizeText('  messy   text  ');
// Result: "messy text"
```

### Email Templates

```typescript
import { createEmailTemplate, createFormattedEmailContent } from 'text-alchemy';

// Create a beautiful email template
const emailContent = createFormattedEmailContent('Hello, this is my message!', {
  greeting: 'Dear Friend',
  closing: 'Best regards',
  signature: 'John Doe',
  bold: true,
  color: 'blue'
});

const email = createEmailTemplate(emailContent, {
  subject: 'Test Email',
  recipient: 'friend@example.com',
  sender: 'john@example.com',
  template: 'pretty' // simple, pretty, professional, casual
});
```

### HTML Documents (using email templates)

```typescript
import { createEmailTemplate, createFormattedEmailContent } from 'text-alchemy';

// Create HTML documents using email templates
const documentContent = createFormattedEmailContent(`
  <h1>Welcome to My Site</h1>
  <p>This is a formatted document with professional styling.</p>
`, {
  greeting: 'Document',
  signature: 'Generated with Text Alchemy'
});

const html = createEmailTemplate(documentContent, {
  subject: 'My Website',
  template: 'professional'
});
```

### CLI Usage

```bash
# Format text with styling
node dist/cli.js format "Hello World" --bold --color red

# Convert to camelCase
node dist/cli.js format "hello world from typescript" --camel

# Convert to snake_case
node dist/cli.js format "hello world from typescript" --snake

# Generate HTML document (using email templates)
node dist/cli.js html "My content" --title "My Page" --bold

# Create quote (using email templates)
node dist/cli.js quote "Great quote" --author "Author Name" --italic

# Create email templates
node dist/cli.js email "Hello, this is my message" --subject "Test Email" --template pretty --greeting "Dear Friend" --closing "Best regards" --signature "John Doe"

# Professional email
node dist/cli.js email "Project update" --subject "Project Status" --template professional --greeting "Dear Team" --closing "Best regards" --signature "Project Manager" --bold

# Casual email with formatting
node dist/cli.js email "Hey there!" --subject "Quick Update" --template casual --greeting "Hi Friend!" --closing "Talk soon!" --bold --color blue

# Text format email
node dist/cli.js email "Simple message" --subject "Text Email" --format text --greeting "Hi" --closing "Bye"
```

## 📚 API Reference

### Text Formatting

#### `formatText(text: string, options?: TextOptions): string`

Formats text with various styling options.

**Options:**
- `bold?: boolean` - Make text bold
- `italic?: boolean` - Make text italic  
- `underline?: boolean` - Make text underlined
- `color?: 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'cyan'` - Set text color
- `camel?: boolean` - Convert to camelCase
- `snake?: boolean` - Convert to snake_case

### Text Utilities

#### `capitalizeWords(text: string): string`
Capitalizes the first letter of each word.

#### `truncateText(text: string, maxLength: number, suffix?: string): string`
Truncates text to specified length with optional suffix.

#### `normalizeText(text: string): string`
Removes extra whitespace and normalizes line breaks.

### Email Templates

#### `createEmailTemplate(content: EmailContent, options?: EmailTemplateOptions): string`
Creates a beautiful HTML email template with multiple styling options.

**Template Options:**
- `subject?: string` - Email subject line
- `recipient?: string` - Recipient email address
- `sender?: string` - Sender email address
- `template?: 'simple' | 'pretty' | 'professional' | 'casual'` - Template style
- `format?: 'html' | 'text'` - Output format

#### `createFormattedEmailContent(text: string, options?: FormattingOptions): EmailContent`
Creates formatted email content with styling options.

**Content Options:**
- `greeting?: string` - Opening greeting
- `closing?: string` - Closing message
- `signature?: string` - Signature text
- `bold?: boolean` - Make text bold
- `italic?: boolean` - Make text italic
- `color?: string` - Set text color

### Available Templates

- **`simple`** - Clean blue header, minimal styling
- **`pretty`** - Gradient purple header (default), elegant design
- **`professional`** - Dark professional look, business-ready
- **`casual`** - Colorful gradient header, friendly design

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/kris-hamade/text-alchemy.git
cd text-alchemy

# Install dependencies
npm install

# Build the project
npm run build
```

### Scripts

```bash
# Development
npm run dev          # Watch mode for development
npm run build        # Build TypeScript to JavaScript
npm run test         # Run tests with Jest
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:manual  # Run manual test file

# CLI
npm run cli          # Run CLI tool
npm run pretty       # Alternative CLI command
```

### Testing

The project includes comprehensive tests covering:

- ✅ Text formatting with all options
- ✅ Case conversion (camelCase, snake_case)
- ✅ Text utilities (capitalize, truncate, normalize)
- ✅ HTML template generation
- ✅ CLI functionality
- ✅ Integration scenarios

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🔧 CLI Reference

### Commands

- `format` - Format text with styling options
- `html` - Generate HTML document (using email templates)
- `quote` - Create quote (using email templates)
- `email` - Create email templates

### Options

**Text Formatting:**
- `--bold` - Make text bold
- `--italic` - Make text italic
- `--underline` - Make text underlined
- `--color <color>` - Set text color (red, green, blue, yellow, purple, cyan)
- `--camel` - Convert to camelCase
- `--snake` - Convert to snake_case
- `--capitalize` - Capitalize words
- `--truncate <length>` - Truncate text
- `--normalize` - Normalize whitespace

**Email Options:**
- `--subject <subject>` - Set email subject
- `--recipient <email>` - Set recipient email
- `--sender <email>` - Set sender email
- `--template <type>` - Set template (simple, pretty, professional, casual)
- `--greeting <text>` - Set greeting text
- `--closing <text>` - Set closing text
- `--signature <text>` - Set signature text
- `--format <type>` - Set output format (html, text)

**Document Options:**
- `--title <title>` - Set HTML title
- `--author <author>` - Set quote author

### Examples

```bash
# Text formatting
node dist/cli.js format "Hello World" --bold --color red
node dist/cli.js format "hello world" --capitalize
node dist/cli.js format "hello world from typescript" --camel
node dist/cli.js format "hello world from typescript" --snake

# HTML documents (using email templates)
node dist/cli.js html "My content" --title "My Page" --bold
node dist/cli.js quote "Great quote" --author "Author Name" --italic

# Email templates
node dist/cli.js email "Hello, this is my message" --subject "Test Email" --template pretty --greeting "Dear Friend" --closing "Best regards" --signature "John Doe"
node dist/cli.js email "Project update" --subject "Project Status" --template professional --greeting "Dear Team" --closing "Best regards" --signature "Project Manager" --bold
node dist/cli.js email "Hey there!" --subject "Quick Update" --template casual --greeting "Hi Friend!" --closing "Talk soon!" --bold --color blue
node dist/cli.js email "Simple message" --subject "Text Email" --format text --greeting "Hi" --closing "Bye"
```

## 📁 Project Structure

```
src/
├── index.ts                 # Main entry point
├── cli.ts                   # CLI interface
├── formatters/
│   ├── index.ts            # Formatters exports
│   ├── text-formatter.ts   # Text formatting functions
│   └── text-utils.ts       # Text utility functions
└── templates/
    ├── index.ts            # Templates exports
    └── email-template.ts   # Email template functions

tests/
├── formatters/             # Formatter tests
├── templates/              # Template tests
├── integration.test.ts     # Integration tests
└── setup.ts               # Test setup
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with TypeScript for type safety
- Tested with Jest for reliability
- CI/CD with GitHub Actions
- Inspired by the need for better text processing tools
