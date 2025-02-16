/**
 * Converts a number in scientific notation to a standard number string.
 * @param sciNotation - The number in scientific notation (e.g., "1.2e3").
 * @returns The number as a standard string (e.g., "1200").
 */
export function scientificToNumberString(sciNotation: string): string {
  const [base, exponent] = sciNotation.split("e");
  const exponentNumber = parseInt(exponent, 10);

  // Split base into integer and fractional parts
  const [baseIntPart, baseFracPart = ""] = base.split(".");
  const sign = baseIntPart.startsWith("-") ? "-" : "";
  const cleanedBaseIntPart = sign
    ? baseIntPart.slice(1).replace(/^0+/, "") || "0"
    : baseIntPart.replace(/^0+/, "") || "0";

  if (exponentNumber === 0) {
    // e0 means no change (e.g., 1.2e0 = 1.2)
    return `${sign}${cleanedBaseIntPart}${
      baseFracPart ? `.${baseFracPart}` : ""
    }`;
  }

  if (exponentNumber > 0) {
    // Positive exponent (e.g., 1.2e3 = 1200)
    const totalDigits = cleanedBaseIntPart.length + baseFracPart.length;
    const shift = exponentNumber - baseFracPart.length;

    if (shift >= 0) {
      // No fractional part left (e.g., 1.2e3 = 1200)
      const integerPart = `${cleanedBaseIntPart}${baseFracPart}${"0".repeat(
        shift
      )}`;
      return `${sign}${integerPart}`;
    } else {
      // Fractional part remains (e.g., 1.23e1 = 12.3)
      const integerPart = `${cleanedBaseIntPart}${baseFracPart.slice(
        0,
        exponentNumber
      )}`;
      const fractionalPart = baseFracPart.slice(exponentNumber);
      return `${sign}${integerPart}${
        fractionalPart ? `.${fractionalPart}` : ""
      }`;
    }
  } else {
    // Negative exponent (e.g., 1.2e-3 = 0.0012)
    const leadingZeros = Math.abs(exponentNumber) - 1;
    const fractionalZeros = "0".repeat(leadingZeros);
    const fractionalDigits = `${cleanedBaseIntPart}${baseFracPart}`;
    return `${sign}0.${fractionalZeros}${fractionalDigits}`;
  }
}
