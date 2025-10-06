# Pretty Text

[![CI](https://github.com/yourusername/pretty-text/workflows/CI/badge.svg)](https://github.com/yourusername/pretty-text/actions)
[![npm version](https://badge.fury.io/js/pretty-text.svg)](https://badge.fury.io/js/pretty-text)
[![Coverage Status](https://codecov.io/gh/yourusername/pretty-text/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/pretty-text)

A comprehensive TypeScript library for text formatting, manipulation, and HTML template generation. Perfect for CLI tools, web applications, and any project that needs advanced text processing capabilities.

## ✨ Features

- 🎨 **Text Formatting**: Bold, italic, underline, and colored text
- 🔄 **Case Conversion**: camelCase, snake_case, and proper capitalization
- ✂️ **Text Manipulation**: Truncation, normalization, and whitespace handling
- 🌐 **HTML Templates**: Generate complete HTML documents with custom styling
- 🖥️ **CLI Interface**: Command-line tool for quick text processing
- 📦 **TypeScript**: Full type safety and IntelliSense support
- 🧪 **Well Tested**: Comprehensive test suite with Jest

## 📦 Installation

```bash
npm install pretty-text
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { formatText, capitalizeWords, truncateText, normalizeText } from 'pretty-text';

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

### HTML Templates

```typescript
import { createHtmlTemplate, createTextBlock, createQuoteBlock } from 'pretty-text';

// Create a complete HTML document
const html = createHtmlTemplate(`
  <h1>Welcome to My Site</h1>
  ${createTextBlock('This is a formatted text block.', 'highlight')}
  ${createQuoteBlock('The best way to predict the future is to create it.', 'Peter Drucker')}
`, {
  title: 'My Website',
  bodyClass: 'homepage'
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

# Generate HTML template
node dist/cli.js html "My content" --title "My Page"

# Create quote block
node dist/cli.js quote "Great quote" --author "Author Name"
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

### HTML Templates

#### `createHtmlTemplate(content: string, options?: HtmlTemplateOptions): string`
Creates a complete HTML document with custom styling.

#### `createTextBlock(text: string, className?: string): string`
Creates a styled text block with CSS class.

#### `createQuoteBlock(quote: string, author?: string): string`
Creates a highlighted quote block with optional author attribution.

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/pretty-text.git
cd pretty-text

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
- `html` - Generate HTML template
- `quote` - Create quote block

### Options

- `--bold` - Make text bold
- `--italic` - Make text italic
- `--underline` - Make text underlined
- `--color <color>` - Set text color
- `--camel` - Convert to camelCase
- `--snake` - Convert to snake_case
- `--capitalize` - Capitalize words
- `--truncate <length>` - Truncate text
- `--normalize` - Normalize whitespace
- `--title <title>` - Set HTML title
- `--author <author>` - Set quote author

### Examples

```bash
# Text formatting
node dist/cli.js format "Hello World" --bold --color red
node dist/cli.js format "hello world" --capitalize
node dist/cli.js format "hello world from typescript" --camel
node dist/cli.js format "hello world from typescript" --snake

# HTML generation
node dist/cli.js html "My content" --title "My Page"
node dist/cli.js quote "Great quote" --author "Author Name"
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
    └── html-template.ts    # HTML template functions

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
