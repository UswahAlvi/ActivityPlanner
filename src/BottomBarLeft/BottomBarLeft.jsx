import React from 'react'
import './BottomBarLeft.css'
import Calendar from '../Calendar/Calendar'

export default function BottomBarLeft({toggleCalendarModal, isTimeSet}) {
  return (<div className='d-flex ms-3'>
        <Calendar image={"start-calendar.png"} position={'position-relative'}  isTimeSet={isTimeSet} alt={"start-calendar"} display={'d-block'} toggleCalendarModal={toggleCalendarModal} />
        <div className="text-center mx-4" style={{color:"#fff"}}>
        |
        </div>
        <Calendar image={"end-calendar.png"} position={''}  isTimeSet={isTimeSet} alt={"end-calendar"} display={'d-none'} toggleCalendarModal={toggleCalendarModal} />
        </div>
  )
}
