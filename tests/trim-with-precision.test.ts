import { trimWithPrecision } from "../src/index";

describe("trimWithPrecision", () => {
  test("should trim regular floating-point numbers", () => {
    expect(trimWithPrecision("0.1", 2)).toBe("0.1");
    expect(trimWithPrecision("-0.1", 2)).toBe("-0.1");
    expect(trimWithPrecision("3.14159", 3)).toBe("3.141");
    expect(trimWithPrecision("-3.14159", 4)).toBe("-3.1415");
    expect(trimWithPrecision("1234567890.987654321", 6)).toBe(
      "1234567890.987654"
    );
    expect(trimWithPrecision("-9876543210.123456789", 5)).toBe(
      "-9876543210.12345"
    );
    expect(trimWithPrecision("0.2161", 18)).toBe("0.2161");
    expect(trimWithPrecision("1", 18)).toBe("1");

    expect(trimWithPrecision(0.1, 2)).toBe("0.1");
    expect(trimWithPrecision(-0.1, 2)).toBe("-0.1");
    expect(trimWithPrecision(3.14159, 3)).toBe("3.141");
    expect(trimWithPrecision(-3.14159, 4)).toBe("-3.1415");
    expect(trimWithPrecision(1234567890.987654321, 6)).toBe(
      "1234567890.987654"
    );
    expect(trimWithPrecision(-9876543210.123456789, 5)).toBe(
      "-9876543210.12345"
    );
    expect(trimWithPrecision(0.2161, 18)).toBe("0.2161");
    expect(trimWithPrecision(1, 18)).toBe("1");
  });

  test("should trim scientific notation numbers", () => {
    expect(trimWithPrecision("1e3", 0)).toBe("1000");
    expect(trimWithPrecision("1e18", 0)).toBe("1" + "0".repeat(18));
    expect(trimWithPrecision("1E3", 1)).toBe("1000");
    expect(trimWithPrecision("-1e3", 2)).toBe("-1000");
    expect(trimWithPrecision("1.23e4", 2)).toBe("12300");
    expect(trimWithPrecision("-1.23E4", 3)).toBe("-12300");
    expect(trimWithPrecision("1.2e-3", 5)).toBe("0.0012");
    expect(trimWithPrecision("-1.2E-3", 4)).toBe("-0.0012");
    expect(trimWithPrecision("1e0", 2)).toBe("1");
    expect(trimWithPrecision("1.2e0", 3)).toBe("1.2");
    expect(trimWithPrecision("1e-18", 20)).toBe("0.000000000000000001");
    expect(trimWithPrecision("-1e-18", 19)).toBe("-0.000000000000000001");
    expect(trimWithPrecision("1868.564646E2", 3)).toBe("186856.464");
    expect(trimWithPrecision("1.7976931348623157e+308", 308)).toBe(
      "17976931348623157" + "0".repeat(292)
    );
    expect(trimWithPrecision("5e-1", 10)).toBe("0.5");
    expect(trimWithPrecision("5e-324", 324)).toBe(
      "0." + "5".padStart(324, "0")
    ); // Underflow case

    expect(trimWithPrecision(1e3, 0)).toBe("1000");
    expect(trimWithPrecision(1e18, 0)).toBe("1" + "0".repeat(18));
    expect(trimWithPrecision(1e3, 1)).toBe("1000");
    expect(trimWithPrecision(-1e3, 2)).toBe("-1000");
    expect(trimWithPrecision(1.23e4, 2)).toBe("12300");
    expect(trimWithPrecision(-1.23e4, 3)).toBe("-12300");
    expect(trimWithPrecision(1.2e-3, 5)).toBe("0.0012");
    expect(trimWithPrecision(-1.2e-3, 4)).toBe("-0.0012");
    expect(trimWithPrecision(-1.2465667e-3, 5)).toBe("-0.00124");
    expect(trimWithPrecision(1, 2)).toBe("1");
    expect(trimWithPrecision(1.2, 3)).toBe("1.2");
    expect(trimWithPrecision(1e-18, 20)).toBe("0.000000000000000001");
    expect(trimWithPrecision(-1e-18, 19)).toBe("-0.000000000000000001");
    expect(trimWithPrecision(1868.564646e2, 3)).toBe("186856.464");
    expect(trimWithPrecision(1.7976931348623157e308, 309)).toBe(
      "17976931348623157" + "0".repeat(292)
    );
    expect(trimWithPrecision(5e-1, 10)).toBe("0.5");
    expect(trimWithPrecision(5e-324, 324)).toBe("0." + "5".padStart(324, "0"));
  });

  test("should handle Infinity & NaN", () => {
    expect(trimWithPrecision("Infinity", 2)).toBe("Infinity");
    expect(trimWithPrecision("-Infinity", 3)).toBe("-Infinity");
    expect(() => trimWithPrecision("NaN", 2)).toThrow("Invalid number input");
  });

  test("should handle whole numbers", () => {
    expect(trimWithPrecision("42", 2)).toBe("42");
    expect(trimWithPrecision("-42", 1)).toBe("-42");
    expect(trimWithPrecision("999999999999999999999", 5)).toBe(
      "999999999999999999999"
    );
  });

  test("should handle numbers with leading/trailing spaces", () => {
    expect(trimWithPrecision("  42", 2)).toBe("42");
    expect(trimWithPrecision("42  ", 2)).toBe("42");
    expect(trimWithPrecision("  0.5  ", 1)).toBe("0.5");
    expect(trimWithPrecision("000123", 2)).toBe("123");
    expect(trimWithPrecision("-0000123.4500", 3)).toBe("-123.45");
  });

  test("should handle BigInt-like string numbers", () => {
    expect(trimWithPrecision("123456789012345678901234567890", 10)).toBe(
      "123456789012345678901234567890"
    );
    expect(
      trimWithPrecision(
        "999999999999999999999999999999999999999999999999999999",
        5
      )
    ).toBe("999999999999999999999999999999999999999999999999999999");
    expect(trimWithPrecision("-987654321098765432109876543210", 3)).toBe(
      "-987654321098765432109876543210"
    );
  });

  test("should validate decimals parameter", () => {
    expect(() => trimWithPrecision("1.23", -1)).toThrow(
      "Decimals must be a non-negative integer"
    );
    expect(() => trimWithPrecision("1.23", 2.5)).toThrow(
      "Decimals must be a non-negative integer"
    );
  });
});
