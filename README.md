# Hamro Nepali Patro (React BS/AD Datepicker & Utilities)

A modern React component library for Nepali (Bikram Sambat, BS) and Gregorian (AD) calendar date picking, conversion, and utilities.  
Includes a customizable datepicker, calendar component, and robust BS/AD conversion functions.

[![npm version](https://img.shields.io/npm/v/hamro-nepali-patro.svg)](https://www.npmjs.com/package/hamro-nepali-patro)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## Features

- 📅 **React Nepali Datepicker** (BS/AD)
- 🔄 **BS ↔ AD Date Conversion** utilities
- 🗓️ **Nepali Calendar** component
- 🏷️ Customizable, themeable, and accessible
- 🌐 Localization support (Nepali/English)
- 🧩 TypeScript support

---

## Installation

```bash
yarn add hamro-nepali-patro
# or
npm install hamro-nepali-patro
```

---

## Usage

### 1. DatePicker Component

```tsx
import React from 'react';
import { DatePicker } from 'hamro-nepali-patro';
import 'hamro-nepali-patro/dist/styles.css';

function App() {
  return (
    <DatePicker
      value={''}
      onChange={(val) => console.log(val)}
      calendarType="BS" // or "AD"
      dateFormat="YYYY-MM-DD"
      showMonthDropdown
      showYearDropdown
      isClearable
      // ...other props
    />
  );
}
```

#### **DatePicker Props**
- `value`: string (selected date)
- `onChange`: (val) => void (callback when date changes)
- `calendarType`: "BS" | "AD"
- `dateFormat`: string (e.g. "YYYY-MM-DD")
- `showMonthDropdown`, `showYearDropdown`: boolean
- `isClearable`: boolean
- `inputStyle`, `inputClassName`, `calendarIconStyle`, `calendarIconClassName`, `crossIconStyle`, `crossIconClassName`, `theme`, `calendarStyle`, `calendarClassName`, etc.

---

### 2. NepaliCalendar Component

```tsx
import { NepaliCalendar } from 'hamro-nepali-patro';

<NepaliCalendar
  value="2081-01-01"
  calendarType="BS"
  dateFormat="YYYY-MM-DD"
  onSelect={(date, adDate, bsDate, dateString) => { /* ... */ }}
  showMonthDropdown
  showYearDropdown
  // ...other props
/>
```

---

### 3. Date Conversion Utilities

```ts
import { ad2bs, bs2ad } from 'hamro-nepali-patro';

// Convert AD to BS
const bsDate = ad2bs(2024, 5, 1); // { year: 2081, month: 1, date: 19 }

// Convert BS to AD
const adDate = bs2ad(2081, 1, 19); // { year: 2024, month: 5, date: 1 }
```

---

## API Reference

### Components

- **DatePicker**: Main datepicker component (see above for props)
- **NepaliCalendar**: Calendar panel component (see above for props)

### Utilities

- **ad2bs(year: number, month: number, date: number): { year, month, date }**  
  Convert AD (Gregorian) date to BS (Bikram Sambat).
- **bs2ad(year: number, month: number, date: number): { year, month, date }**  
  Convert BS (Bikram Sambat) date to AD (Gregorian).


## Advanced Usage

### Custom Themes & Styles

You can override styles using the `theme` prop or by customizing the CSS.  
For advanced theming, use the `theme` prop to pass CSS variables.

### Localization

- Supports Nepali and English month/day names.
- Use `calendarType="BS"` for Nepali (Bikram Sambat), `"AD"` for Gregorian.

---

## Demo

See the [demo app](demo/my-react18-app) for a full working example.

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Run `yarn` and `yarn dev` to start local development
4. Submit a PR!

---

## License

MIT © [Tilak Khatri](https://github.com/TilakKhatri)

---

## Links

- [GitHub Repo](https://github.com/TilakKhatri/nepali-calendar)
- [NPM Package](https://www.npmjs.com/package/hamro-nepali-patro) 