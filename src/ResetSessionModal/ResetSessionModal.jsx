import React from 'react'

export default function ResetSessionModal({toggleOffCanvas, showResetSessionModal, toggleSessionModal, toggleIsTimeSet, toggleDoesActivityExists}) {
  return (
    <>
    {showResetSessionModal && <div className="modal-backdrop fade show"></div>}

    <div className={`modal fade ${showResetSessionModal ?? false ? 'show' : ''}`}
     tabIndex="-1" 
     style={{display: showResetSessionModal ? 'block' : 'none'}} 
     aria-labelledby="ResetSessionModalLabel" 
     aria-hidden={!showResetSessionModal}>
        <div className="modal-dialog modal-dialog-centered text-color">
            <div className="modal-content p-5 modal-bg d-flex align-items-center mb-4">
                <div className='fw-normal fs-2 pb-5 d-flex align-items-center'>
                    <img src='./Assets/danger.png' height={'30px'} />
                    <span className='ps-3'>Reset Entire Session</span>
                </div>
                <div className='d-flex flex-column pb-5'>
                    <div className='pb-3 fs-5'>Are you sure you want to reset the Activity Planner and start over?</div>
                    <span>This action cannot be undone</span>
                </div>
                <div className='w-100 d-flex justify-content-between'>
                    <div role="button" className='btn bg-transparent border-0 outline-0 fs-5' style={{color:"rgb(181 181 181 /1)"}} onClick={()=>{toggleSessionModal(); toggleOffCanvas();}}>Cancel</div>
                    <div role="button" className='btn bg-transparent border-0 outline-0S fs-5' style={{color:"rgb(168 74 0 / 1)"}} onClick={()=>{localStorage.removeItem('startDate'); localStorage.removeItem('endDate'); localStorage.removeItem('activitiesArray'); toggleIsTimeSet(false); toggleSessionModal(); toggleOffCanvas(); toggleDoesActivityExists(false)}}>Yes</div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}
