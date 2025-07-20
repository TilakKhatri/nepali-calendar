import './App.css';
import { useState } from 'react';
import DatePicker from '../../../src/datepicker';
import '../../../src/styles.css';
import { ad2bs, bs2ad } from '../../../src/core/conversionMethods';
import { getDateObj } from '../../../src/date-fns';

function App() {
  const [dateBS, setDateBS] = useState<string | null>(null);
  const [dateAD, setDateAD] = useState<string | null>(null);

  // Function to convert AD date to BS date
  const convertADtoBS = (adDate: string): string | null => {
    if (!adDate) return null;
    
    try {
      const dateObj = getDateObj(adDate, 'YYYY-MM-DD');
      if (dateObj) {
        const bsDate = ad2bs(dateObj.year, dateObj.month, dateObj.date);
        return `${bsDate.year}-${String(bsDate.month).padStart(2, '0')}-${String(bsDate.date).padStart(2, '0')}`;
      }
    } catch (error) {
      console.error('Error converting AD to BS:', error);
    }
    return null;
  };

  // Function to convert BS date to AD date
  const convertBStoAD = (bsDate: string): string | null => {
    if (!bsDate) return null;
    
    try {
      const dateObj = getDateObj(bsDate, 'YYYY-MM-DD');
      if (dateObj) {
        const adDate = bs2ad(dateObj.year, dateObj.month, dateObj.date);
        return `${adDate.year}-${String(adDate.month).padStart(2, '0')}-${String(adDate.date).padStart(2, '0')}`;
      }
    } catch (error) {
      console.error('Error converting BS to AD:', error);
    }
    return null;
  };

  // Handle BS date picker change
  const handleBSDateChange = (val: string) => {
    console.log('BS Date selected:', val);
    setDateBS(val);
    
    // Convert BS to AD and update AD date picker
    const convertedAD = convertBStoAD(val);
    setDateAD(convertedAD);
  };

  // Handle AD date picker change
  const handleADDateChange = (val: string) => {
    console.log('AD Date selected:', val);
    setDateAD(val);
    
    // Convert AD to BS and update BS date picker
    const convertedBS = convertADtoBS(val);
    setDateBS(convertedBS);
  };

  return (
    <div className="app">
      <div>
        <h1>BS Date Picker</h1> 
        <p>Selected BS Date: {JSON.stringify(dateBS)}</p>
        <p>Selected AD Date: {JSON.stringify(dateAD)}</p>
        
        <h2>BS Date Picker</h2>
        <div style={{ marginBottom: 150 }}>
          <div style={{ width: 250 }}>
            <DatePicker
              showMonthDropdown={true}
              showYearDropdown={true}
              size="small"
              value={dateBS ?? ''}
              dateFormat={'YYYY-MM-DD'}
              placehoder={'Select BS Date'}
              hideOnSelect={false}
              onSelect={(val) => {
                console.log('BS onSelect val', val);
                handleBSDateChange(val);
              }}
              onChange={(val) => {
                console.log('BS onChange val', val);
                handleBSDateChange(val);
              }}
              isClearable={true}
              calendarType={'BS'}
            />
          </div>
        </div>

        <h2>AD Date Picker</h2>
        <div style={{ marginBottom: 150 }}>
          <div style={{ width: 250 }}>
            <DatePicker
              showMonthDropdown={true}
              showYearDropdown={true}
              size="small"
              value={dateAD ?? ''}
              dateFormat={'YYYY-MM-DD'}
              placehoder={'Select AD Date'}
              hideOnSelect={false}
              onSelect={(val) => {
                console.log('AD onSelect val', val);
                handleADDateChange(val);
              }}
              onChange={(val) => {
                console.log('AD onChange val', val);
                handleADDateChange(val);
              }}
              isClearable={true}
              calendarType={'AD'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
