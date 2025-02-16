import { scaleDown } from "../src/index";

describe("scaleDown", () => {
  test("should format scaled numbers from hex strings", () => {
    expect(scaleDown("0xde0b6b3a7640000", 18)).toBe("1");
    expect(scaleDown("0x1bc16d674ec80000", 18)).toBe("2");
    expect(scaleDown("0x8ac7230489e80000", 18)).toBe("10");
    expect(scaleDown("0x56bc75e2d63100000", 18)).toBe("100");
    expect(scaleDown("0x3635c9adc5dea00000", 18)).toBe("1000");
    expect(scaleDown("0x21e19e0c9bab2400000", 18)).toBe("10000");
  });

  test("should handle BigInt inputs", () => {
    expect(scaleDown(BigInt(1000000000000000000), 18)).toBe("1");
    expect(scaleDown(BigInt(2000000000000000000), 18)).toBe("2");
    expect(scaleDown(BigInt(10000000000000000000), 18)).toBe("10");
  });

  test("should handle number inputs", () => {
    expect(scaleDown(1e18, 18)).toBe("1");
    expect(scaleDown(2e18, 18)).toBe("2");
    expect(scaleDown(10e18, 18)).toBe("10");
    expect(scaleDown(1.2e18, 18)).toBe("1.2");
    expect(scaleDown(1.23e18, 18)).toBe("1.23");
    expect(scaleDown(1.234e18, 18)).toBe("1.234");
    expect(scaleDown("1" + "0".repeat(18), 18)).toBe("1");
    expect(scaleDown("12" + "0".repeat(18), 18)).toBe("12");
    expect(scaleDown(123, 18)).toBe("0." + "123".padStart(18, "0"));
    expect(scaleDown(123.4, 18)).toBe("0." + "1234".padStart(19, "0"));
  });

  test("should handle scientific notation", () => {
    expect(scaleDown("1.2e3", 2)).toBe("12");
    expect(scaleDown("1.2e-3", 5)).toBe("0.000000012");
  });

  test("should handle edge cases", () => {
    expect(() => scaleDown("Infinity", 2)).toThrow("Invalid scaledValue value");
    expect(() => scaleDown("NaN", 2)).toThrow("Invalid scaledValue value");
    expect(() => scaleDown("1.23", -1)).toThrow(
      "Decimals must be a non-negative integer"
    );
  });
});
