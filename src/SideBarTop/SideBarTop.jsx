import React from 'react'
import './SideBarTop.css'
import Seperator from '../Seperator/Seperator'
import StartInstruction from '../StartInstruction/StartInstruction'
import Calendar from '../Calendar/Calendar'

export default function SideBarTop({toggleCalendarModal,toggleOffCanvas, isTimeSet}) {

  return (
    <div className="d-flex flex-column justify-content-between align-items-center pb-4">
        <img src="logo.png" className="logo-img" alt="logo"/>
        <img src="menu.png" className="menu-img mb" alt="menu" role="button" onClick={toggleOffCanvas}/>
        
        <div className=''>
          <Calendar image={"start-calendar.png"} isTimeSet={isTimeSet} position={'position-relative'} display={''} alt={"start-calendar"} toggleCalendarModal={toggleCalendarModal} />
        </div>
        <Seperator/>
        <Calendar image={"end-calendar.png"} isTimeSet={isTimeSet} position={''} alt={"end-calendar"} display={'d-none'} toggleCalendarModal={toggleCalendarModal}/>
    </div>
  )
}
