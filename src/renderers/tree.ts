export type RenderFormat = "html" | "markdown" | "text-table" | "json";

export interface RenderOptions {
  format?: RenderFormat;
  depth?: number;
  indentSize?: number;
  keyLabel?: string;
  valueLabel?: string;
}

const DEFAULT_INDENT = 2;

export function renderTree(
  data: unknown,
  options: RenderOptions = {}
): string {
  const format = options.format ?? "html";
  const depth = options.depth ?? Infinity;

  switch (format) {
    case "html":
      return renderHtmlTree(data, depth);
    case "markdown":
      return renderMarkdownTree(data, depth, 0);
    case "text-table":
      return renderTextTable(data, depth);
    case "json":
      return renderJson(data, depth);
    default:
      return renderHtmlTree(data, depth);
  }
}

function renderHtmlTree(data: unknown, depth: number): string {
  if (depth < 0) return "<span>…</span>";

  if (data === null || data === undefined) {
    return `<span class="ta-null">${String(data)}</span>`;
  }

  if (typeof data === "string") {
    return `<span class="ta-string">${escapeHtml(data)}</span>`;
  }

  if (typeof data === "number" || typeof data === "boolean") {
    return `<span class="ta-primitive">${escapeHtml(String(data))}</span>`;
  }

  if (Array.isArray(data)) {
    if (depth === 0) return `<span>…</span>`;
    const items = data
      .map((item) => `<li>${renderHtmlTree(item, depth - 1)}</li>`)
      .join("");
    return `<ul class="ta-array">${items}</ul>`;
  }

  const entries = Object.entries(data as Record<string, unknown>);
  if (!entries.length) {
    return `<span class="ta-empty">{ }</span>`;
  }

  if (depth === 0) return `<span>…</span>`;

  const items = entries
    .map(
      ([key, value]) =>
        `<li><span class="ta-key">${escapeHtml(key)}:</span> ${renderHtmlTree(
          value,
          depth - 1
        )}</li>`
    )
    .join("");
  return `<ul class="ta-object">${items}</ul>`;
}

function renderMarkdownTree(data: unknown, depth: number, indent: number): string {
  const padding = " ".repeat(indent);
  if (depth < 0) return `${padding}- …`;

  if (data === null || data === undefined) {
    return `${padding}- ${String(data)}`;
  }

  if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    return `${padding}- ${String(data)}`;
  }

  if (Array.isArray(data)) {
    if (!data.length) return `${padding}- (empty array)`;
    if (depth === 0) return `${padding}- …`;
    return data
      .map((item) => renderMarkdownTree(item, depth - 1, indent + DEFAULT_INDENT))
      .join("\n");
  }

  const entries = Object.entries(data as Record<string, unknown>);
  if (!entries.length) return `${padding}- (empty object)`;
  if (depth === 0) return `${padding}- …`;

  return entries
    .map((entry) => {
      const [key, value] = entry;
      const header = `${padding}- **${key}**:`;
      if (
        value === null ||
        value === undefined ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return `${header} ${String(value)}`;
      }
      const nested = renderMarkdownTree(value, depth - 1, indent + DEFAULT_INDENT);
      return `${header}\n${nested}`;
    })
    .join("\n");
}

function renderTextTable(data: unknown, depth: number): string {
  if (Array.isArray(data) && data.every((item) => typeof item === "object" && item !== null)) {
    return renderArrayTable(data as Record<string, unknown>[], depth);
  }

  if (data && typeof data === "object") {
    const rows = Object.entries(data as Record<string, unknown>).map(([key, value]) => ({
      Key: key,
      Value:
        depth > 0 && typeof value === "object" && value !== null
          ? summarizeValue(value)
          : String(value),
    }));
    return renderArrayTable(rows, depth);
  }

  return String(data ?? "");
}

function renderArrayTable(data: Record<string, unknown>[], depth: number): string {
  const columns = Array.from(
    data.reduce((set, row) => {
      Object.keys(row).forEach((key) => set.add(key));
      return set;
    }, new Set<string>())
  );

  if (!columns.length) return "(empty)";

  const widths = columns.map((column) => {
    const headerWidth = column.length;
    const cellWidth = data.reduce((max, row) => {
      const value = row[column];
      const cell =
        depth > 0 && typeof value === "object" && value !== null
          ? summarizeValue(value)
          : String(value ?? "");
      return Math.max(max, cell.length);
    }, 0);
    return Math.max(headerWidth, cellWidth);
  });

  const header = columns
    .map((column, index) => padCell(column, widths[index]))
    .join(" | ");
  const separator = widths.map((width) => "-".repeat(width)).join("-|-");
  const rows = data
    .map((row) =>
      columns
        .map((column, index) => {
          const value = row[column];
          const cell =
            depth > 0 && typeof value === "object" && value !== null
              ? summarizeValue(value)
              : String(value ?? "");
          return padCell(cell, widths[index]);
        })
        .join(" | ")
    )
    .join("\n");

  return `${header}\n${separator}\n${rows}`;
}

function renderJson(data: unknown, depth: number): string {
  const pruned = pruneDepth(data, depth);
  if (typeof pruned === "string") {
    return pruned;
  }
  try {
    return JSON.stringify(pruned, null, 2);
  } catch {
    return String(pruned ?? "");
  }
}

function pruneDepth(value: unknown, depth: number): unknown {
  if (depth < 0) {
    return Array.isArray(value) ? `[Array(${value.length})]` : typeof value === "object" && value !== null ? "{…}" : value;
  }
  if (value === null || typeof value !== "object") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => pruneDepth(item, depth - 1));
  }
  const entries = Object.entries(value as Record<string, unknown>);
  const result: Record<string, unknown> = {};
  for (const [key, val] of entries) {
    result[key] = pruneDepth(val, depth - 1);
  }
  return result;
}

function summarizeValue(value: unknown): string {
  if (Array.isArray(value)) {
    return `[Array(${value.length})]`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value as Record<string, unknown>).slice(0, 3);
    const suffix = Object.keys(value as Record<string, unknown>).length > 3 ? ", …" : "";
    return `{ ${keys.join(", ")}${suffix} }`;
  }
  return String(value ?? "");
}

function padCell(value: string, width: number): string {
  if (value.length >= width) return value;
  return value + " ".repeat(width - value.length);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
