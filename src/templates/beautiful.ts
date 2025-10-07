import { TemplateOptions } from "./simple";

export function applyBeautifulTemplate(content: string, options: TemplateOptions = {}): string {
  const title = options.title ?? "Text Alchemy";
  const inlineStyles = options.for === "email" ? beautifulEmailStyles : beautifulWebStyles;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>${inlineStyles}</style>
</head>
<body>
  <main class="ta-beautiful">
    <section class="ta-card">
      ${content}
    </section>
  </main>
</body>
</html>`;
}

const sharedStyles = `
  body {
    font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #17153b, #2e236c 50%, #433d8b);
    color: #eef2ff;
  }
  .ta-beautiful {
    max-width: 760px;
    margin: 0 auto;
    padding: 48px 24px;
  }
  .ta-card {
    background: rgba(17, 24, 39, 0.75);
    backdrop-filter: blur(12px);
    border-radius: 18px;
    padding: 36px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    box-shadow: 0 24px 48px rgba(15, 23, 42, 0.25);
  }
  h1, h2, h3 {
    color: #c8d8ff;
    letter-spacing: 0.02em;
  }
  p {
    line-height: 1.7;
  }
  ul, ol {
    padding-left: 24px;
  }
  pre {
    background: rgba(15, 23, 42, 0.7);
    color: #f8fafc;
    padding: 18px;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    overflow-x: auto;
  }
  .ta-array, .ta-object {
    list-style: none;
    padding-left: 16px;
  }
  .ta-key {
    color: #7dd3fc;
    font-weight: 600;
  }
  .ta-string {
    color: #f9a8d4;
  }
  .ta-primitive {
    color: #facc15;
  }
`;

const beautifulWebStyles = `${sharedStyles}`;

const beautifulEmailStyles = `${sharedStyles}
  body {
    padding: 0;
  }
  .ta-beautiful {
    padding: 24px 12px;
  }
  .ta-card {
    padding: 24px;
  }
`;
