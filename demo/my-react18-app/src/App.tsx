import { useState } from 'react';
import Header from '../../../src/calendar/Header';
import './App.css'

function App() {
  const [year, setYear] = useState(2081);
  const [month, setMonth] = useState(11);
  const [isAD, setIsAD] = useState(false);

  return (
    <>
      <div className='app'>
        <Header
          year={year}
          month={month}
          changeYear={(offset: number) => setYear((y) => y + offset)}
          changeMonth={(offset: number) => setMonth((m) => m + offset)}
          isAD={isAD}
          showMonthDropdown={false}
          showYearDropdown={false}
          showExtra={true}
        />
        <button onClick={() => setIsAD((prev) => !prev)}>Toggle Calendar Type (AD/BS)</button>
      </div>
    </>
  );
}

export default App;
