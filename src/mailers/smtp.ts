import { prepareHtmlOutput, HtmlOutputOptions } from "../outputs/html";
import { prepareTextOutput, TextOutputOptions } from "../outputs/text";

export interface MailPayloadOptions extends HtmlOutputOptions, TextOutputOptions {
  html?: string;
  text?: string;
}

export function buildMailPayload(content: string, options: MailPayloadOptions = {}): { html: string; text: string } {
  const html = options.html ?? prepareHtmlOutput(content, options);
  const text = options.text ?? prepareTextOutput(stripHtml(content));
  return { html, text };
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, "").replace(/\s+\n/g, "\n").trim();
}
