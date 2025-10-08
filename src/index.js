const JsonParser = require('./parsers/json-parser');
const path = require('path');

// Default configuration
const DEFAULT_DEPTH = 3;
const DEFAULT_INDENT = "   ";

// Create parser instance
const parser = new JsonParser();

// Main execution
function main() {
  try {
    // Path to the JSON file (relative to project root)
    const jsonFilePath = path.join(__dirname, '..', 'jsonObj.json');
    
    console.log('Parsing JSON file:', jsonFilePath);
    console.log('Configuration:', { depth: DEFAULT_DEPTH, indent: DEFAULT_INDENT });
    console.log('---');
    
    // Parse and format the JSON data with default parameters
    const formattedJson = parser.parseJsonFromFile(jsonFilePath, DEFAULT_DEPTH, DEFAULT_INDENT);
    console.log(formattedJson);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Export the parser for use in other modules
module.exports = JsonParser;

// Run main function if this file is executed directly
if (require.main === module) {
  main();
}
