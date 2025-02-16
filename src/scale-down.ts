import { scientificToNumberString } from "./utils";

/**
 * Formats a scaled number string to a number string with the specified number of decimal places.
 *
 * @param scaledValue - The scaled number string to format.
 * @param decimals - The number of decimal places to include in the formatted number string.
 * @returns The formatted number string.
 */
export function scaleDown(
  scaledValue: number | string | bigint,
  decimals: number
): string {
  if (decimals < 0) {
    throw new Error("Decimals must be a non-negative integer");
  }
  let strValue = scaledValue.toString().toLowerCase();
  if (["infinity", "-infinity", "nan"].includes(strValue)) {
    throw new Error("Invalid scaledValue value");
  }
  if (strValue.startsWith("0x")) {
    strValue = BigInt(strValue).toString();
  } else if (strValue.includes("e")) {
    strValue = scientificToNumberString(strValue);
  }

  let [integerPart, fractionalPart = ""] = strValue.split(".");
  const sign = integerPart.startsWith("-") ? "-" : "";
  integerPart = sign
    ? integerPart.slice(1).replace(/^0+/, "") || "0"
    : integerPart.replace(/^0+/, "") || "0";
  fractionalPart = fractionalPart.replace(/0+$/, "");

  if (integerPart.length <= decimals) {
    return `${sign}0.${integerPart.padStart(decimals, "0")}${fractionalPart}`;
  } else {
    const trimmedFractionalPart = `${integerPart.slice(
      integerPart.length - decimals
    )}${fractionalPart}`.replace(/0+$/, "");

    integerPart = integerPart.slice(0, integerPart.length - decimals);
    if (trimmedFractionalPart.length === 0) {
      return `${sign}${integerPart}`;
    }

    return `${sign}${integerPart}.${trimmedFractionalPart.replace(/\.$/, "")}`;
  }
}
scaleDown("555555555555555555", 18);
