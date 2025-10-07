import { applySimpleTemplate } from "../../src/templates/simple";

describe("applySimpleTemplate", () => {
  it("wraps content with default title", () => {
    const result = applySimpleTemplate("<p>Hello</p>");
    expect(result).toContain("Text Alchemy");
    expect(result).toContain("<p>Hello</p>");
  });

  it("applies custom title", () => {
    const result = applySimpleTemplate("<p>Hello</p>", { title: "Custom" });
    expect(result).toContain("<title>Custom</title>");
  });

  it("uses email styles when for=email", () => {
    const result = applySimpleTemplate("<p>Hello</p>", { for: "email" });
    expect(result).toContain("max-width: 600px");
  });
});
