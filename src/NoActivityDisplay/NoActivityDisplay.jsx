import React from 'react'
import './NoActivityDisplay.css'

export default function NoActivityDisplay({doesActivityExists,isActivityAdded, allActivityDeleted}) {
  return (
    <div style={{height:"100vh"}} className={`${doesActivityExists ?'d-none':'d-flex'} rounded flex-grow-1 align-items-center justify-content-center width-activities-container bg-activities-container overflow-auto `}>
      <div className='text-center p-4'>
        <div className='mb-4 fs-3 fw-bold'>
          Your activities
        </div>
        <div>
          No activities added yet. Use the + icon in the sidebar to add activities
        </div>
      </div>
    </div>
  )
}
