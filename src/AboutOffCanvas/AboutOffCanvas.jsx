import React from 'react'
import Step from '../Step/Step'
import './AboutOffCanvas.css'

export default function AboutOffCanvas({showAboutOffCanvas, toggleAboutOffCanvas}) {
  const Steps=[" Specify a start date/time",
               " Specify an end date/time",
               " Use the + button to add activities, specifying an activity description and its duration",
               " At the top of the app, you will see the available time, estimated end time and total activity time"];
  return (
    <div className={`offcanvas offcanvas-bg px-3 offcanvas-start ${showAboutOffCanvas ? 'show' : ''}`} tabIndex="-1" style={{ visibility: showAboutOffCanvas ? 'visible' : 'hidden' }}>
        <div className="offcanvas-header pt-5 d-flex align-items-center">
            <img src="./Assets/back-arrow.png" height={"20px"} role="button" onClick={toggleAboutOffCanvas} />
            <span className="offcanvas-title offcanvas-title-color ms-4 fs-3 fw-bold">About</span>
      </div>
      <div className="offcanvas-body pt-3 px-4" style={{overflowY:"scroll"}}>
        <div className='d-flex flex-column h-100 text-color'>
            <div className='fw-normal fs-4 mb-2'>
                What does this app do?
            </div>
            <div className='mb-2'>
                This app allows you to plan activities between a specified start and end date/time
            </div>
            <div className='fw-normal fs-4 mb-2'>
                How do i use this app?
            </div>
            <div>
                <Step step={Steps[0]} num={1}/>
                <Step step={Steps[1]} num={2}/>
                <Step step={Steps[2]} num={3}/>
                <Step step={Steps[2]} num={4}/>
            </div>
            <div className='rounded bg-container py-4 d-flex flex-column align-items-center'>
                <span className='fw-semibold text-center' style={{color: "var(--bs-body-color)"}}>
                    Questions?Comments?Suggestions?
                </span>
                <div className='text-center' style={{color: "black"}}>
                    Send an email to 
                    <a href="mailto:activityplanner@greenjazz.com" style={{color: "var(--bs-body-color)"}}>
                        activityplanner@greenjazz.com
                    </a>
                </div>
            </div>
            <div className='d-flex align-items-center w-100 rounded px-2 py-3'>
                <img src="./Assets/phone.png" height={"30px"}/>
                <div className='d-flex flex-column'>
                    <span className='ps-3'>Build version</span>
                    <span className='ps-3'>3.5.0</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
