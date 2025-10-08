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
   * Formats a JSON object as HTML with nice styling
   */
  formatJsonAsHtml(obj, depth, decodeBase64 = false, recursiveJson = false, title = 'JSON Data') {
    if (depth < 0) return '';

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 30px;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        .json-item {
            margin: 8px 0;
            padding: 8px 12px;
            border-left: 3px solid #3498db;
            background-color: #f8f9fa;
            border-radius: 4px;
        }
        .json-key {
            font-weight: bold;
            color: #e74c3c;
            margin-right: 8px;
        }
        .json-value {
            color: #27ae60;
        }
        .json-object {
            margin-left: 20px;
            border-left: 2px solid #bdc3c7;
            padding-left: 15px;
        }
        .json-string {
            color: #8e44ad;
        }
        .json-number {
            color: #f39c12;
        }
        .json-boolean {
            color: #e67e22;
        }
        .json-null {
            color: #95a5a6;
            font-style: italic;
        }
        .timestamp {
            color: #7f8c8d;
            font-size: 0.9em;
            text-align: right;
            margin-top: 30px;
            border-top: 1px solid #ecf0f1;
            padding-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${title}</h1>
        <div class="json-content">
            ${this.formatJsonAsHtmlContent(obj, depth, decodeBase64, recursiveJson)}
        </div>
        <div class="timestamp">
            Generated on ${new Date().toLocaleString()}
        </div>
    </div>
</body>
</html>`;

    return html;
  }

  /**
   * Formats JSON content as HTML (internal method)
   */
  formatJsonAsHtmlContent(obj, depth, decodeBase64 = false, recursiveJson = false) {
    if (depth < 0) return '';

    let html = '';
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        if (typeof value === "object" && value !== null) {
          html += `<div class="json-item">
            <span class="json-key">${this.escapeHtml(key)}:</span>
            <div class="json-object">
              ${this.formatJsonAsHtmlContent(value, depth - 1, decodeBase64, recursiveJson)}
            </div>
          </div>`;
        } else {
          let displayValue = value;
          let valueClass = 'json-value';
          
          if (decodeBase64 && typeof value === 'string') {
            const decoded = this.decodeBase64IfValid(value, recursiveJson);
            if (recursiveJson && typeof decoded === 'object' && decoded !== null) {
              // If it's a parsed JSON object, format it recursively
              html += `<div class="json-item">
                <span class="json-key">${this.escapeHtml(key)}:</span>
                <div class="json-object">
                  ${this.formatJsonAsHtmlContent(decoded, depth - 1, decodeBase64, recursiveJson)}
                </div>
              </div>`;
              continue;
            } else {
              displayValue = decoded;
            }
          }

          // Determine CSS class based on value type
          if (typeof displayValue === 'string') {
            valueClass = 'json-string';
          } else if (typeof displayValue === 'number') {
            valueClass = 'json-number';
          } else if (typeof displayValue === 'boolean') {
            valueClass = 'json-boolean';
          } else if (displayValue === null) {
            valueClass = 'json-null';
          }

          html += `<div class="json-item">
            <span class="json-key">${this.escapeHtml(key)}:</span>
            <span class="${valueClass}">${this.escapeHtml(String(displayValue))}</span>
          </div>`;
        }
      }
    }
    return html;
  }

  /**
   * Escapes HTML special characters
   */
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
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

    /**
     * Formats JSON data as HTML with nice styling
     */
    formatDataAsHtml(data, depth, decodeBase64 = false, recursiveJson = false, title = 'JSON Data') {
        return this.formatJsonAsHtml(data, depth, decodeBase64, recursiveJson, title);
    }

    /**
     * Parses JSON from file and formats as HTML
     */
    parseJsonFromFileAsHtml(filePath, depth, decodeBase64 = false, recursiveJson = false, title = 'JSON Data') {
        const data = this.readFile(filePath);
        return this.formatJsonAsHtml(data, depth, decodeBase64, recursiveJson, title);
    }

    /**
     * Auto depth mode for HTML formatting
     */
    formatDataAsHtmlAuto(data, decodeBase64 = false, recursiveJson = false, title = 'JSON Data') {
        const maxDepth = this.getMaxDepth(data);
        return this.formatJsonAsHtml(data, maxDepth, decodeBase64, recursiveJson, title);
    }

    /**
     * Auto depth mode for files as HTML
     */
    parseJsonFromFileAsHtmlAuto(filePath, decodeBase64 = false, recursiveJson = false, title = 'JSON Data') {
        const data = this.readFile(filePath);
        return this.formatDataAsHtmlAuto(data, decodeBase64, recursiveJson, title);
    }
}

module.exports = JsonParser;
