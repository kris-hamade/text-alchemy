// Test file for the pretty-text module
// Run with: node test.js

const {
  formatText,
  capitalizeWords,
  truncateText,
  normalizeText,
  createEmailTemplate,
  createFormattedEmailContent
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

console.log('\n🌐 Testing HTML Templates (using email templates):');
console.log('Creating HTML template...');

// Test HTML document generation using email template
const htmlContent = createEmailTemplate(
  createFormattedEmailContent(`
    <h1>Welcome to Pretty Text</h1>
    <p>This is a formatted text block with some content.</p>
    <blockquote>
      <p>The best way to predict the future is to create it.</p>
      <cite>— Peter Drucker</cite>
    </blockquote>
  `, {
    greeting: 'Document',
    signature: 'Generated with Text Alchemy'
  }),
  {
    subject: 'Pretty Text Demo',
    template: 'professional',
    format: 'html'
  }
);

console.log('HTML Template created successfully!');
console.log('Template length:', htmlContent.length, 'characters');

console.log('\n📧 Testing Email Templates:');
console.log('Creating email template...');

// Test basic email template
const emailContent = createFormattedEmailContent('Hello, this is a test email message!', {
  greeting: 'Dear Friend',
  closing: 'Best regards',
  signature: 'John Doe',
  bold: true,
  color: 'blue'
});

const emailTemplate = createEmailTemplate(emailContent, {
  subject: 'Test Email',
  recipient: 'friend@example.com',
  sender: 'john@example.com',
  template: 'pretty'
});

console.log('Email template created successfully!');
console.log('Email template length:', emailTemplate.length, 'characters');

// Test different email templates
console.log('\n📧 Testing different email templates:');
const templates = ['simple', 'pretty', 'professional', 'casual'];

templates.forEach(template => {
  const testEmail = createEmailTemplate(
    createFormattedEmailContent('Testing template', { greeting: 'Hi' }),
    { subject: 'Test', template: template }
  );
  // Check for template-specific CSS instead of template name
  const hasTemplateStyle = template === 'simple' ? testEmail.includes('#007bff') :
                          template === 'pretty' ? testEmail.includes('#667eea') :
                          template === 'professional' ? testEmail.includes('#2c3e50') :
                          template === 'casual' ? testEmail.includes('#ff6b6b') : false;
  console.log(`${template} template:`, hasTemplateStyle ? '✅' : '❌');
});

// Test text format email
const textEmail = createEmailTemplate(
  createFormattedEmailContent('Plain text email'),
  { subject: 'Text Email', format: 'text' }
);
console.log('Text email format:', textEmail.includes('Subject:') ? '✅' : '❌');

console.log('\n✅ All tests completed!');
