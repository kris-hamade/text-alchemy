# Text Alchemy

A simple Node.js library for JSON parsing and text formatting.

## Installation

```bash
npm install text-alchemy
```

## Usage

### Basic Usage

```javascript
const JsonParser = require('text-alchemy');

const parser = new JsonParser();

// Basic usage
const formattedJson = parser.parseJsonFromFile('path/to/file.json', 3, '  ');
console.log(formattedJson);

// With Base64 decoding
const withBase64 = parser.parseJsonFromFile('path/to/file.json', 3, '  ', true);
console.log(withBase64);

// Auto depth mode (goes as deep as possible)
const autoDepth = parser.parseJsonFromFileAuto('path/to/file.json', '  ');
console.log(autoDepth);

// Auto depth + Base64 decoding
const autoWithBase64 = parser.parseJsonFromFileAuto('path/to/file.json', '  ', true);
console.log(autoWithBase64);

// Recursive JSON formatting (decodes Base64 and formats nested JSON)
const recursive = parser.parseJsonFromFile('path/to/file.json', 3, '  ', true, true);
console.log(recursive);

// Ultimate power: Auto depth + Base64 + recursive JSON
const ultimate = parser.parseJsonFromFileAuto('path/to/file.json', '  ', true, true);
console.log(ultimate);

// HTML formatting for emails and web displays
const htmlReport = parser.parseJsonFromFileAsHtml('path/to/file.json', 3, true, true, 'Event Report');
// Ready to plug into SMTP email or web application
smtpMailer.send({ to: 'user@example.com', html: htmlReport });
```

### CLI Usage

```bash
# Run with default settings
npx text-alchemy

# Or install globally
npm install -g text-alchemy
text-alchemy
```

## API

### JsonParser

#### `parseJsonFromFile(filePath, depth, indent, decodeBase64 = false, recursiveJson = false)`
- `filePath` (string): Path to JSON file
- `depth` (number): Maximum depth to parse
- `indent` (string): Indentation string
- `decodeBase64` (boolean): Automatically detect and decode Base64 strings
- `recursiveJson` (boolean): Format decoded Base64 content as JSON if it's valid JSON
- **Returns**: Formatted string

#### `parseJsonFromFileAuto(filePath, indent, decodeBase64 = false, recursiveJson = false)`
- `filePath` (string): Path to JSON file
- `indent` (string): Indentation string
- `decodeBase64` (boolean): Automatically detect and decode Base64 strings
- `recursiveJson` (boolean): Format decoded Base64 content as JSON if it's valid JSON
- **Returns**: Formatted string (goes as deep as the JSON structure allows)

#### `formatData(data, depth, indent, decodeBase64 = false, recursiveJson = false)`
- `data` (object): JSON data to format
- `depth` (number): Maximum depth to parse  
- `indent` (string): Indentation string
- `decodeBase64` (boolean): Automatically detect and decode Base64 strings
- `recursiveJson` (boolean): Format decoded Base64 content as JSON if it's valid JSON
- **Returns**: Formatted string

#### `formatDataAuto(data, indent, decodeBase64 = false, recursiveJson = false)`
- `data` (object): JSON data to format
- `indent` (string): Indentation string
- `decodeBase64` (boolean): Automatically detect and decode Base64 strings
- `recursiveJson` (boolean): Format decoded Base64 content as JSON if it's valid JSON
- **Returns**: Formatted string (goes as deep as the JSON structure allows)

#### `formatDataAsHtml(data, depth, decodeBase64 = false, recursiveJson = false, title = 'JSON Data')`
- `data` (object): JSON data to format
- `depth` (number): Maximum depth to parse
- `decodeBase64` (boolean): Automatically detect and decode Base64 strings
- `recursiveJson` (boolean): Format decoded Base64 content as JSON if it's valid JSON
- `title` (string): Title for the HTML document
- **Returns**: Complete HTML document with beautiful styling

#### `parseJsonFromFileAsHtml(filePath, depth, decodeBase64 = false, recursiveJson = false, title = 'JSON Data')`
- `filePath` (string): Path to JSON file
- `depth` (number): Maximum depth to parse
- `decodeBase64` (boolean): Automatically detect and decode Base64 strings
- `recursiveJson` (boolean): Format decoded Base64 content as JSON if it's valid JSON
- `title` (string): Title for the HTML document
- **Returns**: Complete HTML document with beautiful styling

## Default Values

- **Default depth**: 3
- **Default indent**: "   " (3 spaces)

## Examples

```javascript
const JsonParser = require('text-alchemy');
const parser = new JsonParser();

// Basic usage
const formatted = parser.parseJsonFromFile('data.json', 3, '   ');
console.log(formatted);

// With Base64 decoding
const withBase64 = parser.parseJsonFromFile('data.json', 3, '   ', true);
console.log(withBase64);

// Auto depth mode (goes as deep as possible)
const autoDepth = parser.parseJsonFromFileAuto('data.json', '   ');
console.log(autoDepth);

// Auto depth + Base64 decoding
const autoWithBase64 = parser.parseJsonFromFileAuto('data.json', '   ', true);
console.log(autoWithBase64);

// Recursive JSON formatting (decodes Base64 and formats nested JSON)
const recursive = parser.parseJsonFromFile('data.json', 3, '   ', true, true);
console.log(recursive);

// Ultimate power: Auto depth + Base64 + recursive JSON
const ultimate = parser.parseJsonFromFileAuto('data.json', '   ', true, true);
console.log(ultimate);

// HTML formatting for emails and web displays
const htmlReport = parser.parseJsonFromFileAsHtml('data.json', 3, true, true, 'Event Report');
// Ready to plug into SMTP email or web application
smtpMailer.send({ to: 'user@example.com', html: htmlReport });
```

## Features

- **Base64 Detection**: Automatically detects and decodes Base64 strings
- **Recursive JSON**: Formats decoded Base64 content as JSON if it's valid JSON
- **Auto Depth**: Goes as deep as the JSON structure allows
- **HTML Formatting**: Beautiful HTML output perfect for emails and web displays
- **Flexible Formatting**: Customizable depth and indentation
- **File Support**: Parse JSON from files or data objects
- **Error Handling**: Robust error handling for invalid JSON
- **Smart Fallbacks**: Gracefully handles invalid Base64 or malformed JSON
- **Email Ready**: HTML output with professional styling and responsive design

## Integration Examples

### SMTP Email Integration
```javascript
const JsonParser = require('text-alchemy');
const nodemailer = require('nodemailer');

const parser = new JsonParser();
const transporter = nodemailer.createTransporter(/* your config */);

// Generate HTML report
const htmlReport = parser.parseJsonFromFileAsHtml('event-data.json', 3, true, true, 'Event Report');

// Send email
await transporter.sendMail({
  from: 'alerts@yourcompany.com',
  to: 'admin@yourcompany.com',
  subject: 'Event Report',
  html: htmlReport
});
```

### Web Application Integration
```javascript
const JsonParser = require('text-alchemy');
const express = require('express');

const parser = new JsonParser();
const app = express();

app.get('/report/:id', (req, res) => {
  const htmlReport = parser.parseJsonFromFileAsHtml(`data/${req.params.id}.json`, 3, true, true, 'Report');
  res.send(htmlReport);
});
```

### Just the Data Portion
```javascript
const JsonParser = require('text-alchemy');
const parser = new JsonParser();

// Get just the data field formatted as HTML
const fullData = parser.readFile('event.json');
const dataOnly = parser.formatDataAsHtml(
  parser.decodeBase64IfValid(fullData.message.data, true), 
  3, 
  false, 
  false, 
  'Event Details'
);

// Send just the data portion
smtpMailer.send({ to: 'user@example.com', html: dataOnly });
```

## Testing

This project uses Jest for testing. Run the following commands:

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI
npm run test:ci
```

### Test Coverage

The test suite covers:
- ✅ Basic JSON formatting functionality
- ✅ File operations and error handling
- ✅ Base64 detection and decoding
- ✅ Recursive JSON formatting
- ✅ Auto depth mode
- ✅ HTML formatting with styling
- ✅ Edge cases and error conditions
- ✅ Integration tests with real-world data

Current coverage: **90.56%** statements, **70.32%** branches, **88.88%** functions

## Development

### Prerequisites
- Node.js 14+ 
- npm

### Setup
```bash
git clone https://github.com/kris-hamade/text-alchemy.git
cd text-alchemy
npm install
```

### Running Tests
```bash
npm test
```

### Building
No build step required - this is a pure JavaScript module.

### Versioning and Publishing

This project uses semantic versioning and publishes automatically on version tags.

#### Creating a new version:
```bash
# Patch version (1.0.0 -> 1.0.1)
npm run version:patch

# Minor version (1.0.0 -> 1.1.0)
npm run version:minor

# Major version (1.0.0 -> 2.0.0)
npm run version:major

# Prerelease version (1.0.0 -> 1.0.1-0)
npm run version:prerelease
```

#### Manual versioning:
```bash
# Create a specific version
npm version 1.0.0
git push && git push --tags

# Create a prerelease version
npm version 1.0.0-alpha.5
git push && git push --tags
```

**Note**: Publishing to NPM happens automatically when you push a version tag (e.g., `v1.0.0`, `v1.0.0-alpha.5`).

## License

MIT