# Text Alchemy

[![CI](https://github.com/kris-hamade/text-alchemy/workflows/CI/badge.svg)](https://github.com/kris-hamade/text-alchemy/actions)
[![npm version](https://badge.fury.io/js/text-alchemy.svg)](https://badge.fury.io/js/text-alchemy)
[![Coverage Status](https://codecov.io/gh/kris-hamade/text-alchemy/branch/main/graph/badge.svg)](https://codecov.io/gh/kris-hamade/text-alchemy)

Text Alchemy is a TypeScript toolkit for transforming raw strings, JSON, or arrays into polished HTML, Markdown, or text-table presentations. Pair it with your SMTP relay, logging pipelines, or dashboards to eliminate bespoke formatting code in every service.

## ✨ Highlights

- 🎨 **Inline formatting** – bold, italic, underline, ANSI colors, camelCase, snake_case
- 🧱 **Data renderers** – JSON/array → HTML lists, Markdown bullet trees, text tables
- 🧩 **Visual templates** – simple, beautiful, professional wrappers (web or email-ready)
- 📨 **Mail payloads** – get `{ html, text }` bodies ready for SMTP mailers (no sending)
- 🧪 **Typed + tested** – written in TypeScript with Jest coverage
- 🛠️ **CLI & API** – use from node scripts or directly from your terminal

## 📦 Installation

```bash
npm install text-alchemy
```

## 🚀 Quick Start

### Inline Formatting

```typescript
import { formatText, capitalizeWords, truncateText, normalizeText } from "text-alchemy";

const bold = formatText("Hello World", { bold: true });             // "**Hello World**"
const camel = formatText("hello world from typescript", { camel: true });
const snake = formatText("hello world from typescript", { snake: true });
const truncated = truncateText("Very long text that should be shortened", 20); // "Very long text th..."
const normalized = normalizeText("  messy   text  ");                         // "messy text"
const titleCase = capitalizeWords("hello world");                             // "Hello World"
```

### Render JSON/Arrays

```typescript
import { renderTree } from "text-alchemy";

const payload = {
  subject: "System Report",
  metrics: { users: 1280, active: 437 },
  flags: [
    { name: "beta", enabled: true },
    { name: "dark_mode", enabled: false }
  ]
};

const htmlTree = renderTree(payload, { format: "html" });        // nested HTML lists
const markdownTree = renderTree(payload, { format: "markdown" }); // bullet tree
const table = renderTree(payload.flags, { format: "text-table" }); // ascii table
```

### Apply Templates & Outputs

```typescript
import { prepareHtmlOutput, prepareMarkdownOutput, prepareTextOutput } from "text-alchemy";

const html = prepareHtmlOutput(htmlTree, { template: "professional", title: "System Report" });
const markdown = prepareMarkdownOutput(markdownTree);
const text = prepareTextOutput(table);
```

### Build Mail Payloads

```typescript
import { buildMailPayload, renderTree, prepareHtmlOutput } from "text-alchemy";

const htmlContent = renderTree(payload, { format: "html" });
const wrapped = prepareHtmlOutput(htmlContent, { template: "professional", for: "email", title: "System Report" });
const mail = buildMailPayload(wrapped);
// mail => { html: "...", text: "..." }
// Pass mail.html & mail.text to your nodemailer transport
```

## 🖥️ CLI Usage

```bash
# Inline formatting
text-alchemy format "Hello World" --bold --color blue

# Render JSON directly
text-alchemy render '{"foo": "bar"}' --format html --template simple

# Render from file, produce Markdown
text-alchemy render --file payload.json --format markdown

# Create text table
text-alchemy render '{"items":[{"name":"beta","enabled":true}]}' --format text-table

# Generate email payload JSON ({ html, text })
text-alchemy render --file event.json --template professional --email
```

### CLI Commands & Flags

| Command | Description |
|---------|-------------|
| `format <text>` | Apply inline styles (bold, camelCase, etc) |
| `render <data>` | Render JSON/array/text into HTML/Markdown/text-table |

**Formatting Flags**
- `--bold`, `--italic`, `--underline`
- `--color <color>` (red, green, blue, yellow, purple, cyan)
- `--camel`, `--snake`, `--capitalize`
- `--truncate <n>`, `--normalize`

**Rendering Flags**
- `--format <html|markdown|text-table>` (default html)
- `--template <simple|beautiful|professional>`
- `--title <title>` (included in templates)
- `--depth <n>` (limit traversal depth)
- `--file <path>` (load JSON/Markdown/text from file)
- `--email` (output `{ html, text }` JSON payload)
- `--output <html|markdown|text>` (force final output type)

## 📚 API Reference (selected)

### Formatting
- `formatText(text, options)` – inline styling + case transformations
- `capitalizeWords(text)` – title-case words
- `truncateText(text, maxLength, suffix)` – limit string length
- `normalizeText(text)` – collapse whitespace and line breaks

### Renderers
- `renderTree(data, { format, depth })` → string
  - `format`: `html`, `markdown`, `text-table`
  - `depth`: maximum traversal depth (default unlimited)

### Templates & Outputs
- `prepareHtmlOutput(content, { template, title, for })`
- `prepareMarkdownOutput(content)`
- `prepareTextOutput(content)`
- Templates: `simple`, `beautiful`, `professional`

### Mail Payloads
- `buildMailPayload(content, options)` → `{ html, text }`
  - Accepts raw HTML or uses template when not provided

## 🧪 Tests

```bash
npm test
npm run test:watch
npm run test:coverage
```

Coverage includes formatters, renderers, templates, outputs, and CLI flow.

## 📁 Project Structure

```
src/
├── cli.ts
├── index.ts
├── formatters/
│   ├── text-formatter.ts
│   └── text-utils.ts
├── renderers/
│   └── tree.ts
├── templates/
│   ├── simple.ts
│   ├── beautiful.ts
│   └── professional.ts
├── outputs/
│   ├── html.ts
│   ├── markdown.ts
│   └── text.ts
└── mailers/
    └── smtp.ts

tests/
├── formatters/
├── renderers/
├── templates/
└── outputs/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Commit: `git commit -m 'Add feature'`
6. Push: `git push origin feature-name`
7. Open a pull request

## 📄 License

MIT License – see [LICENSE](LICENSE) for details.
