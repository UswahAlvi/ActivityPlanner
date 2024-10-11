import React, { useState, useEffect } from 'react';
import './StartTimeContainer.css';

export default function StartTimeContainer({theDate,handleDate,borderColor}) {
  const [isClicked, setIsClicked] = useState(false);
  const open = () => {
    setIsClicked(true);
  };
  const close = () => {
    setIsClicked(false);
  };

  const [selectedDate, setSelectedDate] = useState(theDate);
  const [selectedHour, setSelectedHour] = useState(theDate.getHours());
  const [selectedMin, setSelectedMin] = useState(theDate.getMinutes());
  // const [amPm, setAmPm] = useState(theDate.getHours() >= 12 ? 'PM' : 'AM');
  
  useEffect(() => {
    setDateString(theDate);
    setTimeString(theDate);
  }, []);

  const handleDateChange = (event) => {
    if(event.target.value===''){
      setSelectedDate(new Date());
    }
    else{
      setSelectedDate(new Date(event.target.value));
    }
  };

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setSelectedMin(event.target.value);
  };

  // const handleAmPmChange = (event) => {
  //   setAmPm(event.target.value);
  // };

  const handleSet = () => {
    const date = new Date(selectedDate);
    
    let updatedHour = selectedHour;
    
    // if (amPm === 'PM' && selectedHour < 12) {
    //     updatedHour += 12; // Add 12 for PM if not already 12
    // }
    // if (amPm === 'AM' && selectedHour === 12) {
    //     updatedHour = 0; // Set to 0 for midnight
    // }

    date.setHours(updatedHour);
    date.setMinutes(selectedMin);

    // Set the formatted date and time
    setDateString(date);
    setTimeString(date);
    handleDate(date);
    close();  // Close the modal
};



  const [selectedDateString, setSelectedDateString] = useState('');
  const setDateString = (now) => {
    const year = now.getFullYear();
    const month = now.toLocaleString('default', { month: 'short' });
    const day = now.getDate().toString().padStart(2, '0');
    setSelectedDateString(`${month} ${day}, ${year}`);
    
  };

  const [selectedTimeString, setSelectedTimeString] = useState('');
  const setTimeString = (now) => {

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');

    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 

    setSelectedTimeString(`${hours}:${minutes} ${ampm} `);
  };

  return (
    <>
      <div
        role="button"
        onClick={open}
        className="d-flex flex-column rounded py-2 px-4 text-center"
        style={{ border: `2px solid ${borderColor}` }}
      >
        <span className="fw-normal fs-4">{selectedTimeString}</span>
        <span>{selectedDateString}</span>
      </div>
      {isClicked && <div className={`modal-backdrop fade ${isClicked ? 'show' : ''}`}></div>}
      {isClicked && (
        <div className="modal" style={{ display: isClicked ? 'block' : 'none' }}>
          <div className="modal-dialog bg-dark">
            <div className="modal-content bg-light rounded p-3 text-center">
              <h4 style={{ color: 'black' }}>Select Date and Time</h4>
              <div className='mb-2'>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={handleDateChange}
                />
              </div>
              <div className='mb-2' style={{ height: '30px' }}>
                <input className='h-100'
                  type="number"
                  value={selectedHour}
                  onChange={handleHourChange}
                  min="0"
                  max="23"
                  onKeyDown={(e) => e.preventDefault()}
                />
                :
                <input className='h-100'
                  type="number"
                  value={selectedMin}
                  onChange={handleMinuteChange}
                  min="0"
                  max="59"
                  onKeyDown={(e) => e.preventDefault()}
                />
                {/* <select className='h-100 ms-1' value={amPm} onChange={handleAmPmChange}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select> */}
              </div>
              <div className='d-flex justify-content-around'>
              <button className='rounded px-2' onClick={close}>Cancel</button>
                <button className='rounded px-2' onClick={handleSet}>Set</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
