import { scaleUp } from "../src/index";
import { scientificToNumberString } from "../src/utils";

describe("scientificToNumberString", () => {
  test("should convert scientific notation to standard notation", () => {
    expect(scientificToNumberString("1.2e3")).toBe("1200");
    expect(scientificToNumberString("1.2e-3")).toBe("0.0012");
    expect(scientificToNumberString("-1.23e4")).toBe("-12300");
    expect(scientificToNumberString("1e0")).toBe("1");
    expect(scientificToNumberString("1.7976931348623157e+308")).toBe(
      "17976931348623157" + "0".repeat(292)
    );
  });
});

describe("scaleUp with scientific notation", () => {
  test("should handle scientific notation", () => {
    expect(scaleUp("1.2e3", 0)).toBe("1200");
    expect(scaleUp("1.2e-3", 5)).toBe("120");
    expect(scaleUp("1.23e4", 2)).toBe("1230000");
    expect(scaleUp("1e-18", 20)).toBe("100");
  });
  test("should handle scientific notation with negative exponent", () => {
    expect(scaleUp("1.2e-3", 5)).toBe("120");
    expect(scaleUp("1.245576e-3", 5)).toBe("124");
  });
  test("should handle scientific notation with positive exponent", () => {
    expect(scaleUp("1.2e3", 0)).toBe("1200");
    expect(scaleUp("1.2e3", 5)).toBe("120000000");
    expect(scaleUp("1", 18)).toBe("1" + "0".repeat(18));
    expect(scaleUp("0.000000001", 18)).toBe("1000000000");
    expect(scaleUp("0.000000000000000001", 18)).toBe("1");
  });
});
