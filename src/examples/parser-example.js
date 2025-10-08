const JsonParser = require('../parsers/json-parser');
const path = require('path');

/**
 * Example demonstrating the JavaScript JSON parser
 */
function runExample() {
  console.log('=== Text Alchemy Parser Example ===\n');

  // Create a parser instance
  const parser = new JsonParser();

  console.log('Parsing existing JSON file:');
  console.log('Configuration:', { depth: 3, indent: '   ' });
  console.log('---');

  try {
    const jsonFilePath = path.join(__dirname, '..', '..', 'jsonObj.json');
    // Pass depth, indent, and file path as parameters
    const formattedJson = parser.parseJsonFromFile(jsonFilePath, 3, '   ');
    console.log(formattedJson);
  } catch (error) {
    console.error('Error parsing file:', error);
  }

  console.log('\n---\n');
  console.log('Example with Base64 decoding enabled:');
  console.log('Configuration:', { depth: 3, indent: '   ', decodeBase64: true });
  console.log('---');

  try {
    const jsonFilePath = path.join(__dirname, '..', '..', 'jsonObj.json');
    // With Base64 decoding
    const formattedJson = parser.parseJsonFromFile(jsonFilePath, 3, '   ', true);
    console.log(formattedJson);
  } catch (error) {
    console.error('Error parsing file:', error);
  }

  console.log('\n---\n');
  console.log('Example with recursive JSON formatting:');
  console.log('Configuration:', { depth: 3, indent: '   ', decodeBase64: true, recursiveJson: true });
  console.log('---');

  try {
    const jsonFilePath = path.join(__dirname, '..', '..', 'jsonObj.json');
    // With Base64 decoding + recursive JSON formatting
    const formattedJson = parser.parseJsonFromFile(jsonFilePath, 3, '   ', true, true);
    console.log(formattedJson);
  } catch (error) {
    console.error('Error parsing file:', error);
  }

  console.log('\n---\n');
  console.log('Example with auto depth + recursive JSON:');
  console.log('Configuration:', { auto: true, indent: '   ', decodeBase64: true, recursiveJson: true });
  console.log('---');

  try {
    const jsonFilePath = path.join(__dirname, '..', '..', 'jsonObj.json');
    // Auto depth with Base64 decoding + recursive JSON formatting
    const formattedJson = parser.parseJsonFromFileAuto(jsonFilePath, '   ', true, true);
    console.log(formattedJson);
  } catch (error) {
    console.error('Error parsing file:', error);
  }

  try {
    // Get just the data portion formatted
    const dataOnly = parser.formatData(
      parser.decodeBase64IfValid(
        parser.readFile('./jsonObj.json').message.data,
        true
      ),
      3,
      '  '
    );
    console.log(dataOnly);
  } catch (error) {
    console.error('Error parsing file:', error);
  }
}

// Run the example
if (require.main === module) {
  runExample();
}
