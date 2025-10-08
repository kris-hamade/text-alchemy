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
```

## Features

- **Base64 Detection**: Automatically detects and decodes Base64 strings
- **Recursive JSON**: Formats decoded Base64 content as JSON if it's valid JSON
- **Auto Depth**: Goes as deep as the JSON structure allows
- **Flexible Formatting**: Customizable depth and indentation
- **File Support**: Parse JSON from files or data objects
- **Error Handling**: Robust error handling for invalid JSON
- **Smart Fallbacks**: Gracefully handles invalid Base64 or malformed JSON

## License

MIT