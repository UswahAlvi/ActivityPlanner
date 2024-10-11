import React from 'react'
import SideBarTop from '../SideBarTop/SideBarTop'
import AddActivity from '../AddActivity/AddActivity'
import './SideBar.css' 

export default function SideBar({toggleOffCanvas,toggleCalendarModal, toggleActivityModal, isTimeSet}) {
  return<div className="sidebar d-none d-md-flex d-lg-flex flex-column align-items-center h-100 justify-content-between position-fixed">
        <SideBarTop toggleOffCanvas={toggleOffCanvas} toggleCalendarModal={toggleCalendarModal} isTimeSet={isTimeSet} />
        <div className='d-flex flex-column justify-content-end'>
          <AddActivity toggleActivityModal={toggleActivityModal} isTimeSet={isTimeSet}/> 
        </div>
    </div>
}