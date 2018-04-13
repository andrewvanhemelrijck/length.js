<div align="center">
  <h1>Length.js</h1>
  <p>
    <em> JavaScript library for length units conversion</em>
  </p>
  <p>
    <a href="https://github.com/appalaszynski/length.js/blob/master/package.json">
      <img src="https://img.shields.io/github/package-json/v/appalaszynski/length.js.svg" />
    </a>
    <a href="https://github.com/appalaszynski/length.js/commits/master">
      <img src="https://img.shields.io/github/last-commit/appalaszynski/length.js.svg" />
    </a>
  </p>
  <br>
  <br>
</div>

---

## Installation

**Length** was designed to work both in the browser and in Node.js.

### Browser

```html
<script src="length.js"></script>
```

**Length** is available on **unpgk CDN** in [compressed](https://unpkg.com/length.js/min/length.min.js) and [uncompressed](https://unpkg.com/length.js) version.

### Node.js

```shell
npm install length.js
```

```javascript
var length = require('length.js');
// or using ES6 import
import length from 'length.js';
```

---

## Usage

**Length** creates an object which contains **value**, **unit**, and **conversion** methods.  
To get this object, simply call [**``length()``**](#lengthvalue-unit) with two supported arguments. Then you can convert passed value by calling one of available [method](#methods).  
  
The **Length** prototype is exposed through **``length.fn``** (if you want to add your own functions).

<hr />

### ``length(value, unit)``

Creates an object which contains value, unit, and conversion methods.

#### Arguments
* **value** _**``(Number)``**_: Number of units.
* **unit** _**``(String)``**_: Unit type.  
  
  Available unit types: 
  * **``cm``**: centimeter,
  * **``dm``**: decimeter,
  * **``m``**: meter,
  * **``km``**: kilometer,
  * **``ft``**: foot,
  * **``in``**: inch,
  * **``yd``**: yard,
  * **``mi``**: mile.

#### Returns
* _**``(Object)``**_: Returns new **Length** object.

#### Example
```javascript
length(12, 'cm');
```

---

## Methods

### ``.to(unit)``

#### Arguments
* **unit** _**``(String)``**_: Unit type. [Available unit types](#arguments).

#### Returns
* _**``(Object)``**_: **Length** object with value converted to passed unit.

#### Example
```javascript
length(100, 'cm').to('m');
// => { value: 1, unit: 'm' }
```
 
---

### ``.getValue()``

#### Returns
* _**``(Number)``**_: Current value.

#### Example
```javascript
length(100, 'cm').getValue();
// => 100
```

---

### ``.getUnit()``

#### Returns
* _**``(String)``**_: Current unit type.

#### Example
```javascript
length(100, 'cm').getUnit();
// => cm
```

---

### ``.getString(digits)``

#### Arguments
* **digits** _**``(Number)``**_: The number of digits to appear after the decimal point.

#### Returns
* _**``(String)``**_: String containing value and unit type.

#### Example
```javascript
length(100, 'cm').getString();
// => 100cm
length(100, 'cm').getString(2);
// => 100.00cm
length(30, 'cm').to('ft').getString();
// => 0.984251968503937ft
length(30, 'cm').to('ft').getString(2);
// => 0.98ft
```

---

### ``.add(value)``

#### Arguments
* **value** _**``(Number)``**_: The number to increment value.

#### Returns
* _**``(Object)``**_: **Length** object with incremented value.

#### Example
```javascript
length(100, 'cm').add(2);
// => { value: 102, unit: 'cm' }
```
