import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../datepicker/index';
import { IDatePicker } from '../types/main';

// Export core utilities for jQuery usage
export { ad2bs, bs2ad, getTotalDaysInBsMonth } from '../core/conversionMethods';
export { formatBsDate, parseBsDate } from '../core/conversionMethods';
export { isDateValidWithFormat } from '../core/validator';
export { changeDateFromOneFormatToAnother, dateFormatter, parseDate, getDateObj } from '../date-fns';

interface JQueryDatePickerOptions extends Partial<IDatePicker> {
  onChange?: (formattedDate: string, adDate?: any, bsDate?: any, dateString?: Date) => void;
  onSelect?: (formattedDate: string, adDate?: any, bsDate?: any, dateString?: Date) => void;
}

declare global {
  interface JQuery {
    nepaliDatePicker(options?: JQueryDatePickerOptions): JQuery;
    nepaliDatePicker(method: 'destroy'): JQuery;
    nepaliDatePicker(method: 'getValue'): string;
    nepaliDatePicker(method: 'setValue', value: string): JQuery;
  }
}

// Store React component instances
const instances = new Map<HTMLElement, any>();

// jQuery plugin definition
function jQueryNepaliDatePicker(this: any, optionsOrMethod?: JQueryDatePickerOptions | string, value?: string): any {
  console.log('jQuery plugin called with:', optionsOrMethod);
  return this.each(function(this: any) {
    const element = this as HTMLElement;
    
    if (typeof optionsOrMethod === 'string') {
      // Method call
      const method = optionsOrMethod;
      const instance = instances.get(element);
      
      if (!instance) {
        console.warn('Nepali DatePicker not initialized on this element');
        return;
      }
      
      switch (method) {
        case 'destroy':
          if (instance.container) {
            ReactDOM.unmountComponentAtNode(instance.container);
            instance.container.remove();
            instances.delete(element);
          }
          break;
        case 'getValue':
          return instance.getValue();
        case 'setValue':
          if (instance.setValue) {
            instance.setValue(value);
          }
          break;
        default:
          console.warn(`Unknown method: ${method}`);
      }
    } else {
      // Initialize plugin
      const options = optionsOrMethod || {};
      

      
      // Create container for React component
      const container = document.createElement('div');
      container.style.position = 'relative';
      container.style.display = 'inline-block';
      element.appendChild(container);
      
      // Create wrapper component to handle state
      const WrapperComponent = () => {
        const [selectedDate, setSelectedDate] = React.useState(options.value || '');
        
        const handleChange = (formattedDate: string, adDate?: any, bsDate?: any, dateString?: Date) => {
          setSelectedDate(formattedDate);
          if (options.onChange) {
            options.onChange(formattedDate, adDate, bsDate, dateString);
          }
        };
        
        const handleSelect = (formattedDate: string, adDate?: any, bsDate?: any, dateString?: Date) => {
          setSelectedDate(formattedDate);
          if (options.onSelect) {
            options.onSelect(formattedDate, adDate, bsDate, dateString);
          }
        };
        
        // Store methods for external access
        React.useEffect(() => {
          instances.set(element, {
            container,
            getValue: () => selectedDate,
            setValue: (newValue: string) => setSelectedDate(newValue)
          });
        }, [selectedDate]);
        
        return React.createElement(DatePicker, {
          // Required props with defaults
          size: options.size || 'small',
          isClearable: options.isClearable ?? true,
          dateFormat: options.dateFormat || 'yyyy-mm-dd',
          hideOnSelect: options.hideOnSelect ?? true,
          calendarType: options.calendarType || 'BS',
          onChange: handleChange,
          onSelect: handleSelect,
          value: selectedDate,
          
          // Pass through all other props from options
          ...options
        });
      };
      
      // Render React component
      try {
        ReactDOM.render(React.createElement(WrapperComponent), container);
        console.log('React component rendered successfully');
      } catch (error) {
        console.error('Error rendering React component:', error);
      }
    }
  });
}

// Attach to jQuery
if (typeof window !== 'undefined' && (window as any).jQuery) {
  (window as any).jQuery.fn.nepaliDatePicker = jQueryNepaliDatePicker;
}

// Export for module usage
export default jQueryNepaliDatePicker;
