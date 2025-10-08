const JsonParser = require('../src/parsers/json-parser');
const fs = require('fs');
const path = require('path');

describe('JsonParser', () => {
  let parser;
  let testData;
  let simpleData;
  let base64Data;

  beforeAll(() => {
    parser = new JsonParser();
    testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/test-data.json'), 'utf8'));
    simpleData = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/simple-data.json'), 'utf8'));
    base64Data = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/base64-data.json'), 'utf8'));
  });

  describe('Basic Functionality', () => {
    test('should create parser instance', () => {
      expect(parser).toBeInstanceOf(JsonParser);
    });

    test('should format simple JSON data', () => {
      const result = parser.formatData(simpleData, 3, '  ');
      expect(result).toContain('name: John Doe');
      expect(result).toContain('age: 30');
      expect(result).toContain('email: john@example.com');
    });

    test('should respect depth parameter', () => {
      const result = parser.formatData(simpleData, 1, '  ');
      expect(result).toContain('address:');
      // With depth 1, it should still show the nested content but with reduced depth
      expect(result).toContain('street: 123 Main St');
    });

    test('should use custom indentation', () => {
      const result = parser.formatData(simpleData, 2, '>>> ');
      expect(result).toContain('>>> name: John Doe');
    });
  });

  describe('File Operations', () => {
    test('should read and parse JSON file', () => {
      const filePath = path.join(__dirname, 'fixtures/simple-data.json');
      const result = parser.readFile(filePath);
      expect(result).toEqual(simpleData);
    });

    test('should parse JSON from file', () => {
      const filePath = path.join(__dirname, 'fixtures/simple-data.json');
      const result = parser.parseJsonFromFile(filePath, 3, '  ');
      expect(result).toContain('name: John Doe');
    });

    test('should throw error for non-existent file', () => {
      expect(() => {
        parser.readFile('non-existent.json');
      }).toThrow('Error reading or parsing');
    });

    test('should throw error for invalid JSON file', () => {
      const invalidJsonPath = path.join(__dirname, 'fixtures/invalid.json');
      fs.writeFileSync(invalidJsonPath, '{ invalid json }');
      
      expect(() => {
        parser.readFile(invalidJsonPath);
      }).toThrow('Error reading or parsing');
      
      fs.unlinkSync(invalidJsonPath);
    });
  });

  describe('Base64 Detection and Decoding', () => {
    test('should detect valid Base64 strings', () => {
      expect(parser.isBase64('dGVzdA==')).toBe(true);
      expect(parser.isBase64('eyJuYW1lIjogIkpvaG4ifQ==')).toBe(true);
      expect(parser.isBase64('not-base64')).toBe(false);
      expect(parser.isBase64('')).toBe(false);
      expect(parser.isBase64('abc')).toBe(false);
    });

    test('should decode Base64 strings', () => {
      const result = parser.decodeBase64IfValid('dGVzdA==');
      expect(result).toBe('test');
    });

    test('should return original string for invalid Base64', () => {
      const result = parser.decodeBase64IfValid('not-base64');
      expect(result).toBe('not-base64');
    });

    test('should format data with Base64 decoding', () => {
      const result = parser.formatData(base64Data, 2, '  ', true);
      expect(result).toContain('encoded: test');
      expect(result).toContain('normal: regular string');
    });
  });

  describe('Recursive JSON Formatting', () => {
    test('should parse and format Base64 JSON recursively', () => {
      const result = parser.formatData(base64Data, 2, '  ', true, true);
      expect(result).toContain('jsonEncoded:');
      // The Base64 "eyJuYW1lIjogIkpvaG4iLCAiYWdlIjogMzB9" decodes to {"name": "John", "age": 30}
      expect(result).toContain('age: 30');
    });

    test('should handle non-JSON Base64 content', () => {
      const result = parser.formatData(base64Data, 2, '  ', true, true);
      expect(result).toContain('encoded: test');
    });
  });

  describe('Auto Depth Mode', () => {
    test('should calculate maximum depth correctly', () => {
      const depth = parser.getMaxDepth(simpleData);
      expect(depth).toBe(2); // name, age, email, active, tags, address -> address.street, address.city, address.zip
    });

    test('should format with auto depth', () => {
      const result = parser.formatDataAuto(simpleData, '  ');
      expect(result).toContain('street: 123 Main St');
      expect(result).toContain('city: New York');
      expect(result).toContain('zip: 10001');
    });

    test('should parse file with auto depth', () => {
      const filePath = path.join(__dirname, 'fixtures/simple-data.json');
      const result = parser.parseJsonFromFileAuto(filePath, '  ');
      expect(result).toContain('street: 123 Main St');
    });
  });

  describe('HTML Formatting', () => {
    test('should format data as HTML', () => {
      const result = parser.formatDataAsHtml(simpleData, 2, false, false, 'Test Report');
      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain('<title>Test Report</title>');
      expect(result).toContain('John Doe');
      expect(result).toContain('</html>');
    });

    test('should format file as HTML', () => {
      const filePath = path.join(__dirname, 'fixtures/simple-data.json');
      const result = parser.parseJsonFromFileAsHtml(filePath, 2, false, false, 'File Report');
      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain('<title>File Report</title>');
    });

    test('should format HTML with Base64 decoding', () => {
      const result = parser.formatDataAsHtml(base64Data, 2, true, false, 'Base64 Report');
      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain('test'); // decoded Base64
    });

    test('should format HTML with recursive JSON', () => {
      const result = parser.formatDataAsHtml(base64Data, 2, true, true, 'Recursive Report');
      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain('30'); // from decoded JSON (age value)
    });

    test('should escape HTML special characters', () => {
      const dataWithHtml = { message: 'Hello <script>alert("xss")</script> world' };
      const result = parser.formatDataAsHtml(dataWithHtml, 1, false, false, 'Security Test');
      expect(result).toContain('&lt;script&gt;');
      expect(result).toContain('&quot;xss&quot;');
      expect(result).not.toContain('<script>');
    });

    test('should include timestamp in HTML', () => {
      const result = parser.formatDataAsHtml(simpleData, 1, false, false, 'Timestamp Test');
      expect(result).toContain('Generated on');
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty object', () => {
      const result = parser.formatData({}, 3, '  ');
      expect(result).toBe('');
    });

    test('should handle null values', () => {
      const data = { name: 'John', value: null };
      const result = parser.formatData(data, 2, '  ');
      expect(result).toContain('value: null');
    });

    test('should handle boolean values', () => {
      const data = { active: true, disabled: false };
      const result = parser.formatData(data, 2, '  ');
      expect(result).toContain('active: true');
      expect(result).toContain('disabled: false');
    });

    test('should handle number values', () => {
      const data = { count: 42, price: 19.99 };
      const result = parser.formatData(data, 2, '  ');
      expect(result).toContain('count: 42');
      expect(result).toContain('price: 19.99');
    });

    test('should handle arrays', () => {
      const data = { tags: ['javascript', 'node', 'testing'] };
      const result = parser.formatData(data, 2, '  ');
      expect(result).toContain('tags:');
      expect(result).toContain('0: javascript');
      expect(result).toContain('1: node');
      expect(result).toContain('2: testing');
    });

    test('should handle nested objects', () => {
      const data = { user: { profile: { name: 'John' } } };
      const result = parser.formatData(data, 3, '  ');
      expect(result).toContain('user:');
      expect(result).toContain('profile:');
      expect(result).toContain('name: John');
    });
  });

  describe('Integration Tests', () => {
    test('should handle complex real-world data', () => {
      const result = parser.formatData(testData, 3, '  ', true, true);
      expect(result).toContain('message:');
      expect(result).toContain('eventType: SECRET_VERSION_ADD');
      expect(result).toContain('resource: projects/my-project/secrets/my-secret/versions/5');
    });

    test('should generate complete HTML report', () => {
      const result = parser.formatDataAsHtml(testData, 3, true, true, 'Event Report');
      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain('<title>Event Report</title>');
      expect(result).toContain('SECRET_VERSION_ADD');
      expect(result).toContain('</html>');
    });
  });
});
