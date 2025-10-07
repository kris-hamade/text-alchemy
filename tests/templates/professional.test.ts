import { applyProfessionalTemplate } from "../../src/templates/professional";

describe("applyProfessionalTemplate", () => {
  it("wraps content with header", () => {
    const result = applyProfessionalTemplate("<section>Body</section>", { title: "Report" });
    expect(result).toContain("Report");
    expect(result).toContain("ta-pro__header");
  });

  it("supports email mode", () => {
    const result = applyProfessionalTemplate("<section>Body</section>", { for: "email" });
    expect(result).toContain("max-width: 640px");
  });
});
