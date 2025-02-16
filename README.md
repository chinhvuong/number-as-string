# Number as String Package

This package provides precise number scaling and formatting without the common floating-point precision issues found in JavaScript.

## Why Use This Package?

JavaScript's native handling of floating-point arithmetic can lead to unexpected results, especially with large or small numbers. `number-as-string` ensures precise number manipulation without these issues.

### Common JavaScript Errors

To illustrate why this package is useful, here are some common JavaScript floating-point issues:

- **Multiplication with Small Numbers:**

  ```javascript
  console.log(0.000000001 * 10 ** 18); // Expected: 1000000000, Result: 1000000000.0000001
  ```

- **Using toFixed:**

  ```javascript
  console.log((0.2161).toFixed(18)); // Expected: '0.2161', Result: '0.216099999999999987'
  ```

- **Division of Large Numbers:**

  ```javascript
  console.log(100000000000000000000000 / 10 ** 18); // Expected: 100000, Result: 99999.99999999999
  ```

`number-as-string` solves these issues elegantly.

Key capabilities include:

- **scaleUp**: Converts a number as a string into a larger scaled format, preserving precision.
- **scaleDown**: Converts a scaled number back to its original format with precision.
- **trimWithPrecision**: Trims a number string to a specified decimal precision without unexpected rounding errors.

## Installation

To install the package, run:

```bash
npm install number-as-string
```

## Usage

Import the required functions from the package:

```javascript
const { scaleUp, scaleDown, trimWithPrecision } = require("number-as-string");
```

## Examples

- **Scaling Up**:

  ```javascript
  scaleUp("0.000000001", 18); // Returns '1000000000'
  scaleUp("1.23", 3); // Returns '1230'
  ```

- **Scaling Down**:

  ```javascript
  scaleDown("1000000000", 18); // Returns '0.000000001'
  scaleDown("1230", 3); // Returns '1.23'
  ```

- **Trimming with Precision**:

  ```javascript
  trimWithPrecision("0.2161", 18); // Returns '0.2161'
  trimWithPrecision("1234567890.987654321", 5); // Returns '1234567890.98765'
  ```

## Tested Cases

The following cases have been tested to ensure precision:

- **Large number scaling:**

  ```javascript
  scaleUp("9876543210.123456789", 9); // Returns '9876543210123456789'
  scaleDown("9876543210123456789", 9); // Returns '9876543210.123456789'
  ```

- **Small number scaling:**

  ```javascript
  scaleUp("0.00000000123456789", 18); // Returns '1234567890'
  scaleDown("1234567890", 18); // Returns '0.00000000123456789'
  ```

- **Scientific notation scaling:**

  ```javascript
  scaleDown("1.2e3", 2); // Returns '12'
  scaleDown("1.2e-3", 5); // Returns '0.000000012'
  scaleDown(1.23e18, 18); // Returns '1.23'
  scaleDown(1.234e18, 18); // Returns '1.234'
  scaleUp("1.2e-3", 5); // Returns '120'
  scaleUp("1.245576e-3", 5); // Returns '124'
  scaleUp("1.23e4", 2); // Returns '1230000'
  scaleUp("1e-18", 20); // Returns '100'
  ```

- **Mixed precision trimming:**

  ```javascript
  trimWithPrecision("0.00000000123456789", 10); // Returns '0.0000000012'
  trimWithPrecision("0.2161", 18); // Returns '0.2161'
  trimWithPrecision("1", 18); // Returns '1'
  ```

- **Trimming scientific notation numbers:**

  ```javascript
  trimWithPrecision(1e3, 0); // Returns '1000'
  trimWithPrecision("1e18", 0); // Returns '1' + '0'.repeat(18)
  trimWithPrecision("1E3", 1); // Returns '1000'
  trimWithPrecision("-1e3", 2); // Returns '-1000'
  ```

- **Extreme edge cases:**

  ```javascript
  scaleUp("0", 18); // Returns '0'
  scaleDown("0", 18); // Returns '0'
  scaleUp("1", 0); // Returns '1'
  scaleDown("1", 0); // Returns '1'
  trimWithPrecision("1.9999999999999999", 18); // Returns '1.9999999999999999'
  trimWithPrecision("0.0000000000000001", 18); // Returns '0.0000000000000001'
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements.

## License

This project is licensed under the MIT License.

---

I adjusted the flow to highlight the package’s precision advantages and made the usage examples more compact and clear! Let me know if you'd like more enhancements. 🚀
