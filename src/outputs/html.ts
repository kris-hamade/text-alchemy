import { applySimpleTemplate, applyBeautifulTemplate, applyProfessionalTemplate, TemplateOptions } from "../templates";

export type TemplateType = "simple" | "beautiful" | "professional";

export interface HtmlOutputOptions extends TemplateOptions {
  template?: TemplateType | null;
}

export function prepareHtmlOutput(content: string, options: HtmlOutputOptions = {}): string {
  const template = options.template ?? "simple";

  if (template === null) {
    return content;
  }

  switch (template) {
    case "beautiful":
      return applyBeautifulTemplate(content, options);
    case "professional":
      return applyProfessionalTemplate(content, options);
    case "simple":
    default:
      return applySimpleTemplate(content, options);
  }
}
