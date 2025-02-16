import { scientificToNumberString } from "./utils";

/**
 * Trims the decimals of a number or string to the specified number of decimal places.
 *
 * @param value - The number or string to trim.
 * @param decimals - The number of decimal places to trim to.
 * @returns The trimmed number or string.
 * @throws An error if the decimals parameter is not a non-negative integer.
 * @throws An error if the input is Infinity or NaN.
 *
 * @example
 * // 0.2161.toFixed(18) = '0.216099999999999987'
 * // 0.2161.toPrecision(18) 0.216099999999999987
 * trimWithPrecision(0.2161, 18) // '0.2161'
 */
export function trimWithPrecision(
  value: number | string,
  decimals: number
): string {
  // Validate decimals input
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error("Decimals must be a non-negative integer");
  }

  // Convert value to string and handle special cases
  const strValue = typeof value === "string" ? value.trim() : value.toString();
  let lowerStrValue = strValue.toLowerCase();

  if (lowerStrValue === "infinity") return "Infinity";
  if (lowerStrValue === "-infinity") return "-Infinity";
  if (lowerStrValue === "nan") throw new Error("Invalid number input: NaN");

  // Handle scientific notation (e.g., "1.2e3", "1e-3")
  if (lowerStrValue.includes("e")) {
    lowerStrValue = scientificToNumberString(lowerStrValue);
  }

  // Split into integer and fractional parts
  const [intPart, fracPart = ""] = lowerStrValue.split(".");
  const sign = intPart.startsWith("-") ? "-" : "";
  const cleanedIntPart = sign
    ? intPart.slice(1).replace(/^0+/, "") || "0"
    : intPart.replace(/^0+/, "") || "0";

  // Handle zero decimals or no fractional part
  if (decimals === 0 || !fracPart) {
    return `${sign}${cleanedIntPart}`;
  }

  // Trim fractional part to the specified number of decimals
  const trimmedFracPart = fracPart.slice(0, decimals).replace(/0+$/, "");

  return `${sign}${cleanedIntPart}${
    trimmedFracPart ? `.${trimmedFracPart}` : ""
  }`;
}
