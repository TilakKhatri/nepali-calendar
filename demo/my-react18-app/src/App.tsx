import './App.css';
import { DatePicker } from 'nepali-calendar';
import '../../../src/styles.css';

function App() {


  return (
    <div className="app-container">
        <div style={{ marginBottom: 150 }}>
          <div style={{ width: 250 }}>
            <DatePicker
              showMonthDropdown={true}
              showYearDropdown={true}
              size="small"
              value={ ''}
              dateFormat={'YYYY-MM-DD'}
              placehoder={'Select BS Date'}
              hideOnSelect={false}
              onChange={(val) => {
                console.log('BS onChange val', val);
              }}
              isClearable={true}
              calendarType={'BS'}
              inputStyle={{
                border: 'none',
                borderBottom: '2px dotted rgb(166, 63, 63)',
                color: '#ff9800',
                borderRadius: 0,
              }}
              inputClassName="custom-input-bs"
              placeholderColor="#ff9800"
              calendarIconStyle={{ color: 'rgb(166, 63, 63)' }}
              calendarIconClassName="custom-calendar-icon-bs"
              crossIconStyle={{ background: '#ff9800', color: '#fff', width: 18, height: 18, fontSize: 16 }}
              crossIconClassName="custom-cross-icon-bs"
              theme={{
                'cl-primary': '#2e8b57', // override primary color
                'cl-danger': '#ff9800', // override danger color
                'font-md': '1.1rem',
                'gray90': '#222',
              }}
              calendarStyle={{ boxShadow: '0 0 12px #2e8b57' }}
              calendarClassName="custom-calendar-bs"
            />
          </div>
        </div>

        <div style={{ marginBottom: 150 }}>
          <div style={{ width: 250 }}>
            <DatePicker
              showMonthDropdown={true}
              showYearDropdown={true}
              size="small"
              value={''}
              dateFormat={'YYYY-MM-DD'}
              placehoder={'Select AD Date'}
              hideOnSelect={false}
              onChange={(val) => {
                console.log('AD onChange val', val);
              }}
              isClearable={true}
              calendarType={'AD'}
              inputStyle={{
                borderBottom: '2px dotted #4e00a8',
                color: '#4e00a8',
              }}
              inputClassName="custom-input-bs"
              placeholderColor="#4e00a8"
              calendarIconStyle={{ color: '#4e00a8' }} 
              calendarIconClassName="custom-calendar-icon-ad"
              crossIconStyle={{ background: '#4e00a8', color: '#fff', width: 12, height: 12, fontSize: 10 }}
              crossIconClassName="custom-cross-icon-ad"
              theme={{
                'cl-primary': '#4e00a8', // override primary color
                'cl-danger': '#ff9800', // override danger color
                'font-md': '1.1rem',
                'gray90': '#222',
              }}
              calendarStyle={{ boxShadow: 'none' }}
              calendarClassName="custom-calendar-ad"
            />
          </div>
        </div>
      </div>
  );
}

export default App;
