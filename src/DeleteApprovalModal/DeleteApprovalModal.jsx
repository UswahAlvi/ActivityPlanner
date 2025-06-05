import React from 'react'

export default function DeleteApprovalModal({toggleDoesActivityExists, toggleIsActivityAdded, showDeleteApprovalModal, toggleDeleteApprovalModal, toggleIsActivityUpdated, toggleIsTimeContainerUpdated, toggleEditActivityModal, selectedActivityId}) {
    const deleteActivity=()=>{
        let activities=JSON.parse(localStorage.getItem('activitiesArray'));
        activities=activities.filter(activity=>activity.id!=selectedActivityId);
        if(activities.length===0){
            localStorage.removeItem('activitiesArray');
        }
        else{
            localStorage.setItem('activitiesArray', JSON.stringify(activities));
            for(let i=0;i<(activities.length);i++){
                let sDate=(i==0)?new Date(localStorage.getItem('startDate')):new Date(activities[i-1].endDate);
                let eDate=new Date(sDate);
                eDate.setMinutes(eDate.getMinutes()+parseInt((activities[i].time)));
                activities[i].startDate=sDate;
                activities[i].endDate=eDate;
            }
            localStorage.setItem('activitiesArray', JSON.stringify(activities));
        }
        toggleIsActivityUpdated(true);
        toggleIsTimeContainerUpdated(false);
        toggleEditActivityModal();
        toggleDeleteApprovalModal();

    }
  return (
    <>
    {showDeleteApprovalModal && <div className="modal-backdrop fade show"></div>}

    <div className={`modal fade ${showDeleteApprovalModal ?? false ? 'show' : ''}`}
     tabIndex="-1" 
     style={{display: showDeleteApprovalModal ? 'block' : 'none'}} 
     aria-labelledby="DeleteApprovalModalLabel" 
     aria-hidden={!showDeleteApprovalModal}>
        <div className="modal-dialog modal-dialog-centered text-color">
            <div className="modal-content p-5 modal-bg d-flex align-items-center mb-4">
                <div className='fw-normal fs-2 pb-5 d-flex align-items-center'>
                    <img src='danger.png' height={'30px'} />
                    <span className='ps-3'>Delete Activity</span>
                </div>
                <div className='d-flex flex-column pb-5'>
                    <div className='pb-3 fs-5'>Are you sure you want to delete this Activity?</div>
                    <span>This action cannot be undone</span>
                </div>
                <div className='w-100 d-flex justify-content-between'>                    
                    <div role="button" className='btn bg-transparent border-0 outline-0S fs-5' style={{color:"rgb(168 74 0 / 1)"}} onClick={deleteActivity}>Yes</div>
                    <div role="button" className='btn bg-transparent border-0 outline-0 fs-5' style={{color:"rgb(181 181 181 /1)"}} onClick={toggleDeleteApprovalModal}>Cancel</div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}
