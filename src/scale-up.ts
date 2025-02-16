import { trimWithPrecision } from "./trim-with-precision";

/**
 * Converts a number or string to a scaled number string with the specified number of decimal places.
 *
 * @param value - The number or string to convert.
 * @param decimals - The number of decimal places to include in the scaled number string.
 * @returns The scaled number string.
 *
 * @example
 * scaleUp("0.000000001", 18) // "1000000000"
 * // 0.000000001 * 10 ** 18 = 1000000000.0000001
 * scaleUp(1.23456789, 2) // "123"
 * scaleUp(1, 18) // "1" + "0".repeat(18)
 * scaleUp(0.000000001, 18) // "1"
 */
export function scaleUp(value: number | string, decimals: number): string {
  const trimmedValue = trimWithPrecision(value, decimals);

  const [intPart, fracPart = ""] = trimmedValue.split(".");
  const sign = intPart.startsWith("-") ? "-" : "";
  const cleanedIntPart = sign
    ? intPart.slice(1).replace(/^0+/, "") || "0"
    : intPart.replace(/^0+/, "") || "0";

  if (decimals === 0) {
    return `${sign}${cleanedIntPart}`;
  }

  const combinedDigits = `${cleanedIntPart}${fracPart
    .padEnd(decimals, "0")
    .slice(0, decimals)}`;
  const trimmedCombinedDigits = combinedDigits.replace(/^0+/, "") || "0"; // Remove leading zeros
  return `${sign}${trimmedCombinedDigits}`;
}
