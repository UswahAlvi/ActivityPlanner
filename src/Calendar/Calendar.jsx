import React from 'react'
import './Calendar.css'
import StartInstruction from '../StartInstruction/StartInstruction'

export default function Calendar({isTimeSet, image, alt,toggleCalendarModal, position, display}) {

  return<><div role="button" className={`d-flex calendar-transition calendar-container-h flex-column justify-content-center align-items-center`} onClick={toggleCalendarModal}>
  <img src={image} alt={alt} className={`calendar-h ${position}`}/>
  <StartInstruction display={display} isTimeSet={isTimeSet}/>
</div>
</>
}
