#!/usr/bin/env node

import { readFileSync } from "fs";
import { resolve } from "path";

import { formatText, capitalizeWords, truncateText, normalizeText } from "./formatters";
import { renderTree, RenderOptions } from "./renderers/tree";
import { prepareHtmlOutput, HtmlOutputOptions, TemplateType } from "./outputs/html";
import { prepareMarkdownOutput } from "./outputs/markdown";
import { prepareTextOutput } from "./outputs/text";
import { buildMailPayload } from "./mailers/smtp";

interface CliOptions {
  // Formatting
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  camel?: boolean;
  snake?: boolean;
  capitalize?: boolean;
  truncate?: number;
  normalize?: boolean;

  // Rendering
  format?: string;
  template?: string;
  title?: string;
  depth?: number;
  file?: string;
  email?: boolean;
  output?: string;
}

interface ParsedArgs {
  command: string;
  input: string;
  options: CliOptions;
}

function parseArgs(): ParsedArgs {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    showHelp();
    process.exit(0);
  }

  const command = args[0];
  const options: CliOptions = {};
  const textArgs: string[] = [];

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = args[i + 1];

      switch (key) {
        // Formatting flags
        case "bold":
          options.bold = true;
          break;
        case "italic":
          options.italic = true;
          break;
        case "underline":
          options.underline = true;
          break;
        case "color":
          options.color = value;
          i++;
          break;
        case "camel":
          options.camel = true;
          break;
        case "snake":
          options.snake = true;
          break;
        case "capitalize":
          options.capitalize = true;
          break;
        case "truncate":
          options.truncate = parseInt(value, 10);
          i++;
          break;
        case "normalize":
          options.normalize = true;
          break;

        // Rendering
        case "format":
          options.format = value;
          i++;
          break;
        case "template":
          options.template = value;
          i++;
          break;
        case "title":
          options.title = value;
          i++;
          break;
        case "depth":
          options.depth = parseInt(value, 10);
          i++;
          break;
        case "file":
          options.file = value;
          i++;
          break;
        case "email":
          options.email = true;
          break;
        case "output":
          options.output = value;
          i++;
          break;
        default:
          // Unknown flag - ignore or handle later
          break;
      }
    } else {
      textArgs.push(arg);
    }
  }

  const input = textArgs.join(" ");
  return { command, input, options };
}

function showHelp() {
  console.log(`
🧪 Text Alchemy CLI

Usage: text-alchemy <command> [input] [options]

Commands:
  format <text>             Apply inline text formatting (bold, camel, etc)
  render <data>             Render JSON/arrays/text into HTML/Markdown/tables

Formatting Options:
  --bold                    Make text bold
  --italic                  Make text italic
  --underline               Make text underlined
  --color <color>           Set text color (red, green, blue, yellow, purple, cyan)
  --camel                   Convert to camelCase
  --snake                   Convert to snake_case
  --capitalize              Capitalize words
  --truncate <length>       Truncate text to specified length
  --normalize               Normalize whitespace

Rendering Options:
  --format <type>           Output type: html | markdown | text-table (default html)
  --template <name>         Template: simple | beautiful | professional
  --title <title>           Title to include in templated output
  --depth <level>           Maximum depth to traverse nested data (default unlimited)
  --file <path>             Load input data from a file (JSON/Markdown/Text)
  --email                   Output email payload JSON ({ html, text })
  --output <type>           Force final output type: html | markdown | text

Examples:
  text-alchemy format "Hello World" --bold --color blue
  text-alchemy render '{"foo": "bar"}' --format html --template professional
  text-alchemy render data.json --file data.json --format markdown
  text-alchemy render '{"items": [1,2,3]}' --format text-table
  text-alchemy render event.json --file event.json --email --template professional
`);
}

function executeCommand({ command, input, options }: ParsedArgs) {
  switch (command) {
    case "format":
      return executeFormat(input, options);
    case "render":
      return executeRender(input, options);
    case "help":
      showHelp();
      return;
    default:
      console.error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

function executeFormat(input: string, options: CliOptions) {
  if (!input) {
    console.error("No text provided for format command.");
    process.exit(1);
  }

  let result = input;

  if (options.capitalize) {
    result = capitalizeWords(result);
  } else if (options.truncate) {
    result = truncateText(result, options.truncate);
  } else if (options.normalize) {
    result = normalizeText(result);
  } else {
    result = formatText(result, {
      bold: options.bold,
      italic: options.italic,
      underline: options.underline,
      color: options.color as any,
      camel: options.camel,
      snake: options.snake,
    });
  }

  console.log(result);
}

function executeRender(input: string, options: CliOptions) {
  const rawData = loadInputData(input, options.file);
  const depth = typeof options.depth === "number" && !isNaN(options.depth) ? options.depth : Infinity;
  const renderFormat = (options.format ?? "html") as RenderOptions["format"];

  const rendered = renderTree(rawData, {
    format: renderFormat,
    depth,
  });

  const template = options.template === "none" ? null : (options.template as TemplateType | undefined);
  const title = options.title;

  if (options.email) {
    const htmlContent = buildHtmlBase(renderFormat, rendered, rawData, depth, template === null);
    const wrappedHtml = prepareHtmlOutput(htmlContent, {
      template: template === null ? null : template ?? "professional",
      title,
      for: "email",
    } as HtmlOutputOptions);
    const textContent = prepareTextOutput(
      renderTree(rawData, {
        format: "text-table",
        depth,
      })
    );
    const payload = buildMailPayload(wrappedHtml, { html: wrappedHtml, text: textContent });
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  let output: string = rendered;
  const desiredOutput = options.output ?? renderFormat;

  switch (desiredOutput) {
    case "html": {
      const htmlBase = buildHtmlBase(renderFormat, rendered, rawData, depth, template === null);
      output = prepareHtmlOutput(htmlBase, {
        template,
        title,
        for: "web",
      } as HtmlOutputOptions);
      break;
    }
    case "markdown":
      output = renderFormat === "markdown" ? rendered : renderTree(rawData, { format: "markdown", depth });
      output = prepareMarkdownOutput(output);
      break;
    case "text":
    case "text-table":
      output = renderFormat === "text-table" ? rendered : renderTree(rawData, { format: "text-table", depth });
      output = prepareTextOutput(output);
      break;
    default:
      if (desiredOutput === "json") {
        output = renderFormat === "json" ? rendered : renderTree(rawData, { format: "json", depth });
      }
      break;
  }

  console.log(output);
}

function loadInputData(input: string, file?: string): unknown {
  if (file) {
    const absolute = resolve(process.cwd(), file);
    const contents = readFileSync(absolute, "utf-8");
    return parseData(contents);
  }

  if (!input) {
    console.error("No input provided for render command. Provide JSON string or --file path.");
    process.exit(1);
  }

  return parseData(input);
}

function parseData(value: string): unknown {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}

function buildHtmlBase(
  format: RenderOptions["format"],
  rendered: string,
  rawData: unknown,
  depth: number,
  templateIsNull: boolean
): string {
  if (templateIsNull) {
    if (format === "json") {
      return wrapJsonHtml(rendered);
    }
    return rendered;
  }

  if (format === "html") {
    return rendered;
  }

  if (format === "json") {
    return wrapJsonHtml(rendered);
  }

  return renderTree(rawData, { format: "html", depth });
}

function wrapJsonHtml(content: string): string {
  return `<pre class="ta-json">${escapeHtml(content)}</pre>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

try {
  const parsed = parseArgs();
  executeCommand(parsed);
} catch (error) {
  console.error("Error:", error);
  process.exit(1);
}
