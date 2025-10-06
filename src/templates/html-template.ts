/**
 * HTML template utilities
 */

export interface HtmlTemplateOptions {
  title?: string;
  styles?: string;
  bodyClass?: string;
}

/**
 * Creates a basic HTML template with customizable options
 * @param content - The main content to insert
 * @param options - Template options
 * @returns Complete HTML document string
 */
export function createHtmlTemplate(content: string, options: HtmlTemplateOptions = {}): string {
  const { title = "Pretty Text Document", styles = "", bodyClass = "" } = options;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        h1, h2, h3 {
            color: #2c3e50;
        }
        .highlight {
            background-color: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #007bff;
            margin: 20px 0;
        }
        ${styles}
    </style>
</head>
<body class="${bodyClass}">
    ${content}
</body>
</html>`;
}

/**
 * Creates a styled text block with HTML formatting
 * @param text - The text content
 * @param className - CSS class name
 * @returns HTML formatted text block
 */
export function createTextBlock(text: string, className: string = "text-block"): string {
  return `<div class="${className}">${text}</div>`;
}

/**
 * Creates a highlighted quote block
 * @param quote - The quote text
 * @param author - Optional author attribution
 * @returns HTML formatted quote block
 */
export function createQuoteBlock(quote: string, author?: string): string {
  const authorHtml = author ? `<cite>— ${author}</cite>` : "";
  return `
    <blockquote class="highlight">
        <p>${quote}</p>
        ${authorHtml}
    </blockquote>
  `;
}
