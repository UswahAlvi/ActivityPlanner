import React, { useEffect } from 'react'
import './EditActivityModal.css'
import ActivityBox from '../ActivityBox/ActivityBox';
import TimeBox from '../TimeBox/TimeBox';
import { useState } from 'react';
import DeleteApprovalModal from '../DeleteApprovalModal/DeleteApprovalModal';

export default function EditActivityModal({toggleDoesActivityExists,toggleIsActivityAdded, toggleIsActivityUpdated, showEditActivityModal, toggleEditActivityModal,toggleIsTimeContainerUpdated, selectedActivityId, UpdateSelectedActivityId}) {
    const [showDeleteApprovalModal,setShowDeleteApprovalModal]=useState(false);
    const toggleDeleteApprovalModal=()=>setShowDeleteApprovalModal(!showDeleteApprovalModal);

    const activities=["Lunch","Dinner","Drinks","Get Ready","Nap","Workout","To Home","To Store"];
    const times=[5,10,15,20,30,45,60,120];

    const [activityText,setActivityText]=useState(()=>{
        const activitiesArray = JSON.parse(localStorage.getItem('activitiesArray')) || [];
        const selectedActivity = activitiesArray.find(activity => activity.id === selectedActivityId) || {};
        return selectedActivity.text || '';
    });

    const updateActivityText=(text)=>{
        setActivityText(text);
    }
    
    const [specifiedTime,setTime]=useState(()=>{
        const activitiesArray = JSON.parse(localStorage.getItem('activitiesArray')) || [];
        const selectedActivity = activitiesArray.find(activity => activity.id === selectedActivityId) || {};
        return selectedActivity.time || 1;
    });
    const updateTime=(time)=>{
        setTime(time);
    }

    useEffect(()=>{
        const activitiesArray = JSON.parse(localStorage.getItem('activitiesArray')) || [];
        const selectedActivity = activitiesArray.find(activity => activity.id === selectedActivityId) || {};
        updateActivityText(selectedActivity.text);
        updateTime(selectedActivity.time);
    },[selectedActivityId])

    const updateActivity = () => {
        let activitiesArray = JSON.parse(localStorage.getItem('activitiesArray')) || [];
        const selectedActivity = activitiesArray.find(activity => activity.id === selectedActivityId);
        // Update activity text if changed
        if (selectedActivity.text !== activityText && activityText!=='') {
            selectedActivity.text = activityText;
            localStorage.setItem('activitiesArray', JSON.stringify(activitiesArray));
        }
    
        if (selectedActivity.time !== specifiedTime) {
            selectedActivity.time = parseInt(specifiedTime);
    
            for (let i = 0; i < activitiesArray.length; i++) {
                const sDate = (i === 0) ? new Date(localStorage.getItem('startDate')) : new Date(activitiesArray[i - 1].endDate);
                const eDate = new Date(sDate);
                eDate.setMinutes(eDate.getMinutes() + parseInt(activitiesArray[i].time));
    
                activitiesArray[i].startDate = sDate.toISOString();
                activitiesArray[i].endDate = eDate.toISOString();
            }
                
            localStorage.setItem('activitiesArray', JSON.stringify(activitiesArray));
        }
        UpdateSelectedActivityId(-1);
        toggleIsTimeContainerUpdated(false);
        toggleIsActivityUpdated(true);
        toggleEditActivityModal(); 
    };
    
  return (
    <>
    {showEditActivityModal && <div className="modal-backdrop fade show"></div>}

    <div className={`modal fade ${showEditActivityModal ? 'show' : ''}`}
     tabIndex="-1" 
     style={{display: showEditActivityModal ? 'block' : 'none'}} 
     aria-labelledby="EditActivityModalLabel" 
     aria-hidden={!showEditActivityModal}>
        <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content modal-bg p-md-5 p-4">
                <div className='modal-body p-0 text-color'>
                    <div className='d-flex justify-content-center mb-2 mb-md-4 mb-lg-4'>
                        <span className='custom-font'>Edit Activity</span>
                    </div>
                    <div className='input-group'>
                        <input type="text" id="inputActivity" 
                                className=" bg-transparent form-control rounded input-border"
                                value={`${activityText}`} 
                                onChange={(e) => updateActivityText(e.target.value)}
                                aria-label="Activity" 
                                aria-describedby="activity-input"
                        />
                    </div>
                    <div className='d-flex flex-wrap justify-content-between mb-5'>
                        <ActivityBox name={activities[0]} activityText={activityText} updateActivityText={updateActivityText}/>
                        <ActivityBox name={activities[1]} activityText={activityText} updateActivityText={updateActivityText}/>
                        <ActivityBox name={activities[2]} activityText={activityText} updateActivityText={updateActivityText}/>
                        <ActivityBox name={activities[3]} activityText={activityText} updateActivityText={updateActivityText}/>
                        <ActivityBox name={activities[4]} activityText={activityText} updateActivityText={updateActivityText}/>
                        <ActivityBox name={activities[5]} activityText={activityText} updateActivityText={updateActivityText}/>
                        <ActivityBox name={activities[6]} activityText={activityText} updateActivityText={updateActivityText}/>
                        <ActivityBox name={activities[7]} activityText={activityText} updateActivityText={updateActivityText}/>
                    </div>
                    <div>
                        Activity Duration
                    </div>
                    <div className='d-flex flex-wrap justify-content-between mb-3'>
                        <TimeBox name={times[0]} type={'min'} time={specifiedTime} updateTime={updateTime}/>
                        <TimeBox name={times[1]} type={'min'} time={specifiedTime} updateTime={updateTime}/>
                        <TimeBox name={times[2]} type={'min'} time={specifiedTime} updateTime={updateTime}/>
                        <TimeBox name={times[3]} type={'min'} time={specifiedTime} updateTime={updateTime}/>
                        <TimeBox name={times[4]} type={'min'} time={specifiedTime} updateTime={updateTime}/>
                        <TimeBox name={times[5]} type={'min'} time={specifiedTime} updateTime={updateTime}/>
                        <TimeBox name={times[6]} type={'hr'} time={specifiedTime} updateTime={updateTime}/>
                        <TimeBox name={times[7]} type={'hr'} time={specifiedTime} updateTime={updateTime}/>
                        <div className='w-100'>
                            <div className='input-group mt-3 d-flex align-items-center' style={{width:"191px"}}>
                                <input id="inputTime" type="number" className=" bg-transparent form-control rounded py-2 px-3 input-time-border" 
                                min='1'
                                value={`${specifiedTime}`} 
                                onChange={(e) => updateTime(e.target.value)}
                                placeholder="Specify" aria-label="Specify" aria-describedby="time-input"
                                />
                                <span className='p-3'> min</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-100 d-flex justify-content-between'>
                        <div role="button" className='btn bg-transparent border-0 outline-0 fs-5' style={{color:"rgb(181 181 181 /1)"}} onClick={toggleDeleteApprovalModal}>Delete</div>
                        <div role="button" className='btn bg-transparent border-0 outline-0 fs-5' style={{color:"rgb(181 181 181 /1)"}} onClick={()=>{UpdateSelectedActivityId(-1); toggleEditActivityModal(); updateTime(1); updateActivityText('')}}>Cancel</div>
                        <div role="button" className={`${activityText?'btn-color':'in-active'} btn bg-transparent border-0 outline-0 fs-5`} onClick={updateActivity} >Update</div>
                        <DeleteApprovalModal toggleDoesActivityExists={toggleDoesActivityExists} toggleIsActivityAdded={toggleIsActivityAdded} showDeleteApprovalModal={showDeleteApprovalModal} toggleDeleteApprovalModal={toggleDeleteApprovalModal} toggleIsActivityUpdated={toggleIsActivityUpdated} toggleIsTimeContainerUpdated={toggleIsTimeContainerUpdated} toggleEditActivityModal={toggleEditActivityModal} selectedActivityId={selectedActivityId}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
