const fs = require('fs');
const path = require('path');

class JsonParser {
    /**
     * Checks if a string is valid Base64
     */
    isBase64(str) {
        if (typeof str !== 'string') return false;
        if (str.length < 4) return false;

        // Base64 regex pattern
        const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
        if (!base64Regex.test(str)) return false;

        // Must be multiple of 4 characters
        if (str.length % 4 !== 0) return false;

        try {
            // Try to decode and re-encode to verify it's valid Base64
            const decoded = Buffer.from(str, 'base64').toString('base64');
            return decoded === str;
        } catch (error) {
            return false;
        }
    }

  /**
   * Tries to parse a string as JSON, returns original if it fails
   */
  tryParseJson(str) {
    try {
      return JSON.parse(str);
    } catch (error) {
      return str; // Return original if parsing fails
    }
  }

  /**
   * Decodes Base64 and optionally parses as JSON
   */
  decodeBase64IfValid(str, recursiveJson = false) {
    if (this.isBase64(str)) {
      try {
        const decoded = Buffer.from(str, 'base64').toString('utf8');
        if (recursiveJson) {
          return this.tryParseJson(decoded);
        }
        return decoded;
      } catch (error) {
        return str; // Return original if decoding fails
      }
    }
    return str;
  }

    /**
     * Calculates the maximum depth of a JSON object
     */
    getMaxDepth(obj, currentDepth = 0) {
        if (typeof obj !== 'object' || obj === null) {
            return currentDepth;
        }

        let maxDepth = currentDepth;
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const depth = this.getMaxDepth(obj[key], currentDepth + 1);
                maxDepth = Math.max(maxDepth, depth);
            }
        }
        return maxDepth;
    }

  /**
   * Formats a JSON object with specified depth and indentation
   */
  formatJson(obj, depth, indent, decodeBase64 = false, recursiveJson = false) {
    if (depth < 0) return '';

    let result = '';
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        if (typeof value === "object" && value !== null) {
          result += `${indent}${key}:\n`;
          // Recurse into children with reduced depth
          result += this.formatJson(value, depth - 1, indent + "  ", decodeBase64, recursiveJson);
        } else {
          let displayValue = value;
          if (decodeBase64 && typeof value === 'string') {
            const decoded = this.decodeBase64IfValid(value, recursiveJson);
            if (recursiveJson && typeof decoded === 'object' && decoded !== null) {
              // If it's a parsed JSON object, format it recursively
              result += `${indent}${key}:\n`;
              result += this.formatJson(decoded, depth - 1, indent + "  ", decodeBase64, recursiveJson);
            } else {
              result += `${indent}${key}: ${decoded}\n`;
            }
          } else {
            result += `${indent}${key}: ${displayValue}\n`;
          }
        }
      }
    }
    return result;
  }

    /**
     * Reads and parses a JSON file from the specified path
     */
    readFile(filePath) {
        try {
            const fullPath = path.resolve(filePath);
            const jsonData = fs.readFileSync(fullPath, 'utf8');
            const data = JSON.parse(jsonData);
            return data;
        } catch (error) {
            throw new Error(`Error reading or parsing ${filePath}: ${error.message}`);
        }
    }

    /**
     * Parses and formats JSON from a file with specified parameters
     */
    parseJsonFromFile(filePath, depth, indent, decodeBase64 = false, recursiveJson = false) {
        const data = this.readFile(filePath);
        return this.formatJson(data, depth, indent, decodeBase64, recursiveJson);
    }

    /**
     * Formats JSON data directly with specified parameters
     */
    formatData(data, depth, indent, decodeBase64 = false, recursiveJson = false) {
        return this.formatJson(data, depth, indent, decodeBase64, recursiveJson);
    }

    /**
     * Auto mode - goes as deep as the JSON structure allows
     */
    formatDataAuto(data, indent, decodeBase64 = false, recursiveJson = false) {
        const maxDepth = this.getMaxDepth(data);
        return this.formatJson(data, maxDepth, indent, decodeBase64, recursiveJson);
    }

    /**
     * Auto mode for files - goes as deep as the JSON structure allows
     */
    parseJsonFromFileAuto(filePath, indent, decodeBase64 = false, recursiveJson = false) {
        const data = this.readFile(filePath);
        return this.formatDataAuto(data, indent, decodeBase64, recursiveJson);
    }
}

module.exports = JsonParser;
