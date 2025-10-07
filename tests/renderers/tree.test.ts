import { renderTree } from "../../src/renderers/tree";

describe("renderTree", () => {
  const sampleData = {
    title: "Sample Report",
    metrics: {
      users: 1280,
      active: 437,
      regions: ["us-east", "eu-west"],
    },
    flags: [
      { name: "beta", enabled: true },
      { name: "dark_mode", enabled: false },
    ],
  };

  it("renders HTML list structure", () => {
    const output = renderTree(sampleData, { format: "html", depth: Infinity });
    expect(output).toContain("<ul");
    expect(output).toContain("<span class=\"ta-key\">title:</span>");
    expect(output).toContain("Sample Report");
    expect(output).toContain("<span class=\"ta-key\">users:</span>");
    expect(output).toContain("1280");
  });

  it("renders Markdown nested list", () => {
    const output = renderTree(sampleData, { format: "markdown" });
    expect(output).toContain("- **title**: Sample Report");
    expect(output).toContain("- **users**: 1280");
    expect(output).toContain("- **regions**:");
  });

  it("renders text table for arrays", () => {
    const output = renderTree(sampleData.flags, { format: "text-table" });
    expect(output).toContain("name");
    expect(output).toContain("beta");
    expect(output).toContain("dark_mode");
  });

  it("renders JSON with indentation", () => {
    const output = renderTree(sampleData, { format: "json" });
    expect(output).toContain("\n");
    expect(output).toContain("\"title\": \"Sample Report\"");
  });

  it("respects depth limit", () => {
    const output = renderTree(sampleData, { format: "html", depth: 1 });
    expect(output).toContain("title");
    expect(output).toContain("…");
  });
});
