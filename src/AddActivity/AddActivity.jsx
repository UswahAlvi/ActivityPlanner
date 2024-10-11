import React from 'react'
import './AddActivity.css'

export default function AddActivity({toggleActivityModal, isTimeSet}) {
  return(
    <div className={`${isTimeSet??false?'d-flex':'d-none'} justify-content-center align-items-center add-button`} role="button" onClick={toggleActivityModal}>
       <img src="./Assets/add.png" alt="add-icon" className='add-icon-h'/>
    </div>
  )
}
