import React from 'react'

export default function TimeExceededModal({showTimeExceededModal, toggleTimeExceededModal}) {
  return<>
    {showTimeExceededModal && <div className="modal-backdrop fade show"></div>}

    <div className={`modal fade ${showTimeExceededModal ?? false ? 'show' : ''}`}
     tabIndex="-1" 
     style={{display: showTimeExceededModal ? 'block' : 'none'}} 
     aria-labelledby="TimeExceededModalLabel" 
     aria-hidden={!showTimeExceededModal}>
        <div className="modal-dialog modal-dialog-centered text-color">
            <div className="modal-content p-5 modal-bg d-flex align-items-center mb-4">
                <div className='fw-normal fs-2 pb-5 d-flex align-items-center'>
                    <img src='./Assets/danger.png' height={'30px'} />
                    <span className='ps-3'>Time Exceeded</span>
                </div>
                <div className='d-flex flex-column pb-5'>
                    <div className='pb-3'>Oops! The total time exceeds the available time. </div>
                    <span>You can adjust or delete one or more activties, or modify the start/end time</span>
                </div>
                <div className='w-100 d-flex justify-content-center'>                    
                    <div role="button" className='btn bg-transparent border-0 outline-0S fs-5' style={{color:"rgb(168 74 0 / 1)"}} onClick={toggleTimeExceededModal}>Ok</div>
                </div>
            </div>
        </div>
    </div>
</>
}
