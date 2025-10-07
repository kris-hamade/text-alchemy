import { TemplateOptions } from "./simple";

export function applyProfessionalTemplate(content: string, options: TemplateOptions = {}): string {
  const title = options.title ?? "Text Alchemy";
  const inlineStyles = options.for === "email" ? professionalEmailStyles : professionalWebStyles;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>${inlineStyles}</style>
</head>
<body>
  <main class="ta-pro">
    <header class="ta-pro__header">
      <h1>${title}</h1>
    </header>
    <section class="ta-pro__content">
      ${content}
    </section>
  </main>
</body>
</html>`;
}

const sharedStyles = `
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: #f5f7fa;
    color: #1f2937;
  }
  .ta-pro {
    max-width: 720px;
    margin: 0 auto;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 18px 36px rgba(15, 23, 42, 0.1);
  }
  .ta-pro__header {
    background: linear-gradient(135deg, #0f172a, #1d4ed8);
    padding: 32px 36px;
    color: #f8fafc;
  }
  .ta-pro__header h1 {
    margin: 0;
    font-size: 28px;
    letter-spacing: 0.02em;
  }
  .ta-pro__content {
    padding: 36px;
  }
  h2, h3 {
    color: #1f2937;
  }
  ul, ol {
    padding-left: 22px;
  }
  pre {
    background: #111827;
    color: #f9fafb;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  ul.ta-array, ul.ta-object {
    list-style: none;
    padding-left: 18px;
  }
  .ta-key {
    color: #2563eb;
    font-weight: 600;
  }
`;

const professionalWebStyles = `${sharedStyles}`;

const professionalEmailStyles = `${sharedStyles}
  .ta-pro {
    width: 100%;
    max-width: 640px;
  }
  .ta-pro__content {
    padding: 28px;
  }
`;
