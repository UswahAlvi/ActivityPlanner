import React from 'react'
import './DeleteActivitiesModal.css';

export default function DeleteActivitiesModal({toggleDoesActivityExists,toggleOffCanvas, showDeleteModal, toggleDeleteModal, toggleIsActivityAdded}) {
    const DeleteActivities=()=>{
        localStorage.removeItem('activitiesArray');
        toggleDoesActivityExists(false);
        toggleDeleteModal();
        toggleOffCanvas();
    }
  return (<>
    {showDeleteModal && <div className="modal-backdrop fade show"></div>}

    <div className={`modal fade ${showDeleteModal ?? false ? 'show' : ''}`}
     tabIndex="-1" 
     style={{display: showDeleteModal ? 'block' : 'none'}} 
     aria-labelledby="DeleteModalLabel" 
     aria-hidden={!showDeleteModal}>
        <div className="modal-dialog modal-dialog-centered text-color">
            <div className="modal-content p-5 modal-bg d-flex align-items-center mb-4">
                <div className='fw-normal fs-2 pb-5 d-flex align-items-center'>
                    <img src='danger.png' height={'30px'} />
                    <span className='ps-4'> Delete Activity</span>
                </div>
                <div className='d-flex flex-column pb-5'>
                    <div className='pb-3 fs-5'>Are you sure you want to delete all activities in this session?</div>
                    <span>This action cannot be undone</span>
                </div>
                <div className='w-100 d-flex justify-content-between'>
                    <div role="button" className='btn bg-transparent border-0 outline-0 fs-5' style={{color:"rgb(181 181 181 /1)"}} onClick={(()=>{toggleDeleteModal(); toggleOffCanvas()})}>Cancel</div>
                    <div role="button" className='btn bg-transparent border-0 outline-0S fs-5' style={{color:"rgb(168 74 0 / 1)"}} onClick={DeleteActivities}>Yes</div>
                </div>
            </div>
        </div>
    </div>
</>
    
  )
}
