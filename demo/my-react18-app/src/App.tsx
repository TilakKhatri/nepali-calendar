import './App.css';
import { useState } from 'react';
import DatePicker from '../../../src/datepicker';

function App() {
  const [dateBS, setDateBS] = useState<string | null>(null);
  return (
    <div className="app">
      <div>
        <h1>BS Date Picker</h1> 
        <p>Selected Date: {JSON.stringify(dateBS)}</p>
        New Date Picker
        <div style={{ marginBottom: 150 }}>
          <div style={{ width: 250 }}>
            <DatePicker
              size="small"
              value={dateBS ?? ''}
              dateFormat={'YYYY-MM-DD'}
              placehoder={'Select Date'}
              hideOnSelect={false}
              onSelect={(val) => {
                console.log('val', val);
                setDateBS(val);
              }}
              onChange={(val) => {
                console.log('val', val);
                setDateBS(val);
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
