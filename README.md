# Hamro Nepali Patro (हाम्रो नेपाली पात्रो)

A modern React component library for Nepali (Bikram Sambat, BS) and Gregorian (AD) calendar date picking, conversion, and utilities. Includes a customizable datepicker, BS/AD conversion, and Nepali date functions.

## Features

- 🗓️ **Dual Calendar Support**: Both Bikram Sambat (BS) and Gregorian (AD) calendars
- 🎨 **Highly Customizable**: Extensive theming and styling options
- 🔄 **Date Conversion**: Convert between BS and AD dates
- 📱 **Responsive Design**: Works on all device sizes
- 🌐 **Framework Agnostic**: Support for React and jQuery
- 🎯 **TypeScript Support**: Full TypeScript definitions
- 📦 **Multiple Builds**: ESM, CJS, UMD, and jQuery plugin formats

## Installation

```bash
npm install hamro-nepali-patro
# or
yarn add hamro-nepali-patro
```

## Usage

### React Usage

```tsx
import { DatePicker } from 'hamro-nepali-patro';
import 'hamro-nepali-patro/dist/styles.css';

function App() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      calendarType="BS"
      dateFormat="yyyy-mm-dd"
      placeholder="Select BS Date"
    />
  );
}
```

### jQuery Usage

#### Option 1: React-based DatePicker (requires React dependencies)

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="node_modules/hamro-nepali-patro/dist/jquery.js"></script>
    <link rel="stylesheet" href="node_modules/hamro-nepali-patro/dist/styles.css">
</head>
<body>
    <div id="datepicker"></div>
    
    <script>
        $(document).ready(function() {
            $('#datepicker').nepaliDatePicker({
                value: '2081-01-01',
                dateFormat: 'yyyy-mm-dd',
                calendarType: 'BS',
                placeholder: 'Select BS Date',
                showMonthDropdown: true,
                showYearDropdown: true,
                shouldPressOK: true,
                showExtra: true,
                onChange: function(date, adDate, bsDate) {
                    console.log('Selected date:', date);
                    console.log('AD date:', adDate);
                    console.log('BS date:', bsDate);
                }
            });
        });
    </script>
</body>
</html>
```





### Node.js Usage

```javascript
const { ad2bs, bs2ad, getTotalDaysInBsMonth } = require('hamro-nepali-patro');

// Convert AD to BS
const bsDate = ad2bs(2024, 1, 15);
console.log(bsDate); // { year: 2080, month: 10, date: 2, day: 1 }

// Convert BS to AD
const adDate = bs2ad(2081, 1, 15);
console.log(adDate); // { year: 2024, month: 4, date: 28, day: 0 }

// Get total days in BS month
const totalDays = getTotalDaysInBsMonth(2081, 1);
console.log(totalDays); // 30
```

## jQuery Plugin Methods

### Initialization

```javascript
$('#element').nepaliDatePicker(options);
```

### Methods

```javascript
// Get current value
const value = $('#element').nepaliDatePicker('getValue');

// Set value
$('#element').nepaliDatePicker('setValue', '2081-01-15');

// Destroy instance
$('#element').nepaliDatePicker('destroy');
```



## Configuration Options

### Common Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `value` | string | `''` | Initial date value |
| `dateFormat` | string | `'yyyy-mm-dd'` | Date format (yyyy-mm-dd, dd-mm-yyyy, etc.) |
| `calendarType` | string | `'BS'` | Calendar type ('BS' or 'AD') |
| `placeholder` | string | `''` | Input placeholder text |
| `size` | string | `'small'` | Input size ('small' or 'large') |
| `isClearable` | boolean | `true` | Show clear button |
| `hideOnSelect` | boolean | `true` | Hide calendar on date selection |
| `showMonthDropdown` | boolean \| 'full' \| 'short' \| 'min' | `false` | Show month dropdown |
| `showYearDropdown` | boolean \| number[] | `false` | Show year dropdown |
| `shouldPressOK` | boolean | `false` | Require OK button press |
| `showExtra` | boolean | `false` | Show extra calendar features |

## Styling & Customization

### Input Field Styling

#### `inputStyle` - Custom CSS for Input Field
```javascript
inputStyle: {
    // Border and outline
    border: '2px solid #4CAF50',
    borderRadius: '8px',
    outline: 'none',
    
    // Spacing and size
    padding: '12px 16px',
    width: '250px',
    height: '45px',
    
    // Typography
    fontSize: '16px',
    fontWeight: '500',
    color: '#4CAF50',
    
    // Background and effects
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
}
```

#### `inputClassName` - Custom CSS Class
```javascript
inputClassName: 'my-custom-input'

// In your CSS:
.my-custom-input {
    border: 2px solid #007bff;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}
```

#### `placeholderColor` - Placeholder Text Color
```javascript
placeholderColor: '#6c757d'
```

### Icon Styling

#### `calendarIconStyle` - Calendar Icon Customization
```javascript
calendarIconStyle: {
    // Icon appearance
    color: '#4CAF50',
    fontSize: '20px',
    
    // Size and positioning
    width: '24px',
    height: '24px',
    
    // Effects
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
}
```

#### `crossIconStyle` - Clear Button Styling
```javascript
crossIconStyle: {
    // Button appearance
    background: '#dc3545',
    color: 'white',
    borderRadius: '50%',
    
    // Size
    width: '20px',
    height: '20px',
    
    // Typography
    fontSize: '12px',
    fontWeight: 'bold',
    
    // Effects
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(220, 53, 69, 0.3)'
}
```

### Calendar Container Styling

#### `calendarStyle` - Calendar Dropdown Styling
```javascript
calendarStyle: {
    // Container appearance
    backgroundColor: 'white',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    
    // Shadow and depth
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    
    // Spacing
    padding: '16px',
    marginTop: '8px',
    
    // Size
    minWidth: '280px',
    maxWidth: '320px'
}
```

#### `calendarClassName` - Custom Calendar Class
```javascript
calendarClassName: 'my-custom-calendar'

// In your CSS:
.my-custom-calendar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
}
```

### Theme System

#### `theme` - CSS Custom Properties
The `theme` prop allows you to override the default CSS custom properties used throughout the component:

```javascript
theme: {
    // Primary colors
    'cl-primary': '#4CAF50',        // Primary color for buttons, highlights
    'cl-danger': '#f44336',         // Danger color for clear button, errors
    'cl-success': '#2196F3',        // Success color for confirmations
    'cl-warning': '#ff9800',        // Warning color for alerts
    
    // Typography
    'font-md': '1.2rem',            // Medium font size
    'font-lg': '1.5rem',            // Large font size
    'font-sm': '0.875rem',          // Small font size
    
    // Spacing
    'spacing-sm': '0.5rem',         // Small spacing
    'spacing-md': '1rem',           // Medium spacing
    'spacing-lg': '1.5rem',         // Large spacing
    
    // Borders
    'border-radius': '8px',         // Border radius
    'border-width': '2px',          // Border width
    
    // Shadows
    'shadow-sm': '0 2px 4px rgba(0,0,0,0.1)',
    'shadow-md': '0 4px 8px rgba(0,0,0,0.15)',
    'shadow-lg': '0 8px 16px rgba(0,0,0,0.2)'
}
```

### Complete Styling Example

```javascript
$('#datepicker').nepaliDatePicker({
    // Basic configuration
    value: '2081-01-01',
    dateFormat: 'yyyy-mm-dd',
    calendarType: 'BS',
    size: 'large',
    showMonthDropdown: 'full',
    showYearDropdown: [2080, 2081, 2082, 2083, 2084, 2085],
    shouldPressOK: true,
    showExtra: true,
    isClearable: true,
    hideOnSelect: false,
    
    // Input styling
    inputStyle: {
        border: '2px solid #4CAF50',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '16px',
        color: '#4CAF50',
        backgroundColor: '#f8f9fa',
        transition: 'all 0.3s ease'
    },
    inputClassName: 'custom-input',
    placeholderColor: '#4CAF50',
    
    // Icon styling
    calendarIconStyle: {
        color: '#4CAF50',
        fontSize: '20px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease'
    },
    crossIconStyle: {
        background: '#4CAF50',
        color: 'white',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        cursor: 'pointer'
    },
    
    // Calendar styling
    calendarStyle: {
        backgroundColor: 'white',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: '16px'
    },
    
    // Theme customization
    theme: {
        'cl-primary': '#4CAF50',
        'cl-danger': '#f44336',
        'font-md': '1.2rem',
        'border-radius': '8px',
        'shadow-md': '0 4px 8px rgba(0,0,0,0.15)'
    }
});
```

### CSS Customization

You can also override styles using CSS selectors:

```css
/* Custom input styles */
.rl-nepali-datepicker-input {
    border: 2px solid #007bff !important;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

/* Custom calendar icon */
.rl-nepali-datepicker-icon {
    color: #007bff !important;
    font-size: 20px !important;
}

/* Custom clear button */
.cross-icon {
    background: #007bff !important;
    border-radius: 50% !important;
}

/* Custom calendar container */
.rl-nepali-datepicker-wrapper {
    --cl-primary: #007bff;
    --cl-danger: #dc3545;
}
```

### Common Styling Patterns

#### 1. **Material Design Style**
```javascript
inputStyle: {
    border: 'none',
    borderBottom: '2px solid #2196F3',
    borderRadius: '0',
    padding: '12px 0',
    fontSize: '16px',
    transition: 'border-bottom 0.3s ease'
},
theme: {
    'cl-primary': '#2196F3',
    'cl-danger': '#f44336'
}
```

#### 2. **Bootstrap Style**
```javascript
inputStyle: {
    border: '1px solid #ced4da',
    borderRadius: '0.375rem',
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    backgroundColor: '#fff'
},
theme: {
    'cl-primary': '#0d6efd',
    'cl-danger': '#dc3545'
}
```

#### 3. **Dark Theme**
```javascript
inputStyle: {
    backgroundColor: '#2d3748',
    color: '#e2e8f0',
    border: '1px solid #4a5568',
    borderRadius: '8px'
},
calendarStyle: {
    backgroundColor: '#2d3748',
    border: '1px solid #4a5568',
    color: '#e2e8f0'
},
theme: {
    'cl-primary': '#3182ce',
    'cl-danger': '#e53e3e'
}
```

#### 4. **Gradient Style**
```javascript
inputStyle: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '15px 25px'
},
theme: {
    'cl-primary': '#667eea',
    'cl-danger': '#764ba2'
}
```

### Best Practices

1. **Use CSS Variables**: Leverage the `theme` prop for consistent colors and spacing
2. **Responsive Design**: Use relative units (rem, em) instead of fixed pixels
3. **Accessibility**: Ensure sufficient color contrast between text and background
4. **Performance**: Use `transform` and `opacity` for animations instead of layout properties
5. **Consistency**: Maintain consistent spacing and sizing across your application

### Troubleshooting Styling Issues

- **Styles not applying**: Check if your CSS has higher specificity or use `!important`
- **Theme not working**: Ensure CSS custom properties are supported in your target browsers
- **Responsive issues**: Test with different screen sizes and use relative units
- **Icon alignment**: Use `display: flex` and `align-items: center` for proper icon positioning


### Event Handlers

| Event | Parameters | Description |
|-------|------------|-------------|
| `onChange` | `(date, adDate?, bsDate?, dateString?)` | Called when date changes |
| `onSelect` | `(date, adDate?, bsDate?, dateString?)` | Called when date is selected |

### Styling Options

| Option | Type | Description |
|--------|------|-------------|
| `inputStyle` | object | CSS styles for input field |
| `inputClassName` | string | CSS class for input field |
| `placeholderColor` | string | Color for placeholder text |
| `calendarIconStyle` | object | CSS styles for calendar icon |
| `calendarIconClassName` | string | CSS class for calendar icon |
| `crossIconStyle` | object | CSS styles for clear button |
| `crossIconClassName` | string | CSS class for clear button |
| `calendarStyle` | object | CSS styles for calendar container |
| `calendarClassName` | string | CSS class for calendar container |
| `theme` | object | CSS custom properties for theming |

## Core Utilities

### Date Conversion

```javascript
import { ad2bs, bs2ad } from 'hamro-nepali-patro';

// Convert AD to BS
const bsDate = ad2bs(2024, 1, 15);
// Returns: { year: 2080, month: 10, date: 2, day: 1 }

// Convert BS to AD
const adDate = bs2ad(2081, 1, 15);
// Returns: { year: 2024, month: 4, date: 28, day: 0 }
```

### Date Validation

```javascript
import { isDateValidWithFormat } from 'hamro-nepali-patro';

const isValid = isDateValidWithFormat('2081-01-15', 'yyyy-mm-dd');
// Returns: true
```

### Date Formatting

```javascript
import { formatBsDate, parseBsDate } from 'hamro-nepali-patro';

// Format BS date
const formatted = formatBsDate({ year: 2081, month: 1, date: 15 }, 'yyyy-mm-dd');
// Returns: '2081-01-15'

// Parse BS date
const parsed = parseBsDate('2081-01-15', 'yyyy-mm-dd');
// Returns: { year: 2081, month: 1, date: 15 }
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Internet Explorer 11+ (with polyfills)

## Dependencies

### React Version
- React 16.8+
- React DOM 16.8+

### jQuery Version
- jQuery 1.7+
- React 16.8+ (for React-based version)
- React DOM 16.8+ (for React-based version)



## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## Support

If you encounter any issues or have questions, please:

1. Check the [documentation](https://github.com/TilakKhatri/nepali-calendar)
2. Search [existing issues](https://github.com/TilakKhatri/nepali-calendar/issues)
3. Create a [new issue](https://github.com/TilakKhatri/nepali-calendar/issues/new)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history. 