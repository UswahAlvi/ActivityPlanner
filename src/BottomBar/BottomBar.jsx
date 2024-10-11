import React from 'react'
import './BottomBar.css'
import BottomBarLeft from '../BottomBarLeft/BottomBarLeft'
import AddActivity from '../AddActivity/AddActivity'

export default function BottomBar({toggleCalendarModal, toggleActivityModal,isTimeSet}) {
  return <div id='bottombar' className='bg-dark position-fixed d-flex d-md-none px-3 py-1 align-items-center justify-content-between w-100 bottom-0'>
        <BottomBarLeft toggleCalendarModal={toggleCalendarModal} isTimeSet={isTimeSet} />
        <AddActivity toggleActivityModal={toggleActivityModal} isTimeSet={isTimeSet}/> 
  </div>
}
