export interface TemplateOptions {
  title?: string;
  for?: "web" | "email";
}

export function applySimpleTemplate(content: string, options: TemplateOptions = {}): string {
  const title = options.title ?? "Text Alchemy";
  const inlineStyles = options.for === "email" ? simpleEmailStyles : simpleWebStyles;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>${inlineStyles}</style>
</head>
<body>
  <main class="ta-container">
    ${content}
  </main>
</body>
</html>`;
}

const simpleWebStyles = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    margin: 0;
    padding: 24px;
    background-color: #f7f9fc;
    color: #1f2933;
  }
  .ta-container {
    max-width: 800px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
    border: 1px solid rgba(15, 23, 42, 0.05);
  }
  h1, h2, h3 {
    color: #1f2933;
  }
  ul, ol {
    padding-left: 24px;
  }
  pre {
    background: #0f172a;
    color: #f8fafc;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
  }
`;

const simpleEmailStyles = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f7f9fc;
    color: #1f2933;
  }
  .ta-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid rgba(15, 23, 42, 0.05);
  }
  h1, h2, h3 {
    color: #1f2933;
  }
  ul, ol {
    padding-left: 24px;
  }
  pre {
    background: #0f172a;
    color: #f8fafc;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
  }
`;
