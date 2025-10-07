import { applyBeautifulTemplate } from "../../src/templates/beautiful";

describe("applyBeautifulTemplate", () => {
  it("wraps content with glassmorphism card", () => {
    const result = applyBeautifulTemplate("<div>Content</div>");
    expect(result).toContain("ta-card");
    expect(result).toContain("Content");
  });

  it("respects email option", () => {
    const result = applyBeautifulTemplate("<div>Content</div>", { for: "email" });
    expect(result).toContain("padding: 24px");
  });
});
