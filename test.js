// Test file for the pretty-text module
// Run with: node test.js

const {
  formatText,
  capitalizeWords,
  truncateText,
  normalizeText,
  createHtmlTemplate,
  createTextBlock,
  createQuoteBlock
} = require('./dist/index.js');

console.log('🧪 Testing pretty-text module...\n');

// Test formatText function
console.log('📝 Testing formatText:');
console.log('Bold text:', formatText('Hello World', { bold: true }));
console.log('Italic text:', formatText('Hello World', { italic: true }));
console.log('Underlined text:', formatText('Hello World', { underline: true }));
console.log('Colored text:', formatText('Hello World', { color: 'red' }));
console.log('Combined styles:', formatText('Hello World', { bold: true, italic: true, color: 'blue' }));
console.log('Camel case:', formatText('hello world from typescript', { camel: true }));
console.log('Camel case with underscores:', formatText('hello_world_from_typescript', { camel: true }));
console.log('Camel case with mixed separators:', formatText('hello-world from_typescript', { camel: true }));
console.log('Snake case:', formatText('hello world from typescript', { snake: true }));
console.log('Snake case with hyphens:', formatText('hello-world from_typescript', { snake: true }));
console.log('Snake case with mixed separators:', formatText('Hello World From TypeScript', { snake: true }));

console.log('\n📝 Testing capitalizeWords:');
console.log('Original:', 'hello world from typescript');
console.log('Capitalized:', capitalizeWords('hello world from typescript'));

console.log('\n📝 Testing truncateText:');
const longText = 'This is a very long text that should be truncated to fit in a smaller space';
console.log('Original:', longText);
console.log('Truncated (30 chars):', truncateText(longText, 30));
console.log('Truncated (50 chars):', truncateText(longText, 50));

console.log('\n📝 Testing normalizeText:');
const messyText = '  This   text   has   \n  \n  extra   spaces   \n  and   \n  line   breaks  ';
console.log('Original:', JSON.stringify(messyText));
console.log('Normalized:', JSON.stringify(normalizeText(messyText)));

console.log('\n🌐 Testing HTML Templates:');
console.log('Creating HTML template...');
const htmlContent = createHtmlTemplate(`
  <h1>Welcome to Pretty Text</h1>
  ${createTextBlock('This is a formatted text block with some content.', 'highlight')}
  ${createQuoteBlock('The best way to predict the future is to create it.', 'Peter Drucker')}
`, {
  title: 'Pretty Text Demo',
  bodyClass: 'demo-page'
});

console.log('HTML Template created successfully!');
console.log('Template length:', htmlContent.length, 'characters');

console.log('\n✅ All tests completed!');
