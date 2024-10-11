import React from 'react'
import './SingleActivity.css'

export default function SingleActivity({activity, toggleEditActivityModal, UpdateSelectedActivityId}) {
    
    let options = {
        month: 'short',   // "Oct"
        day: 'numeric',   // "3"
        hour: 'numeric',  // "1"
        minute: '2-digit', // "08"
        hour12: true      // "AM/PM" format
    };
    let sDate=new Date(activity.startDate);
    let eDate=new Date(activity.endDate);
    return<div role='button' className='bg-dark rounded h-auto mb-5' onClick={()=>{UpdateSelectedActivityId(activity.id); toggleEditActivityModal();}}>
        <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between pt-3 px-4 pb-3 pb-md-2' >
                <div style={{ color: "green", fontSize: "1rem", fontWeight: "350" }}>
                    {sDate.toLocaleString('en-US', options)} 
                      - {eDate.toLocaleString('en-US', options)}
                </div>
                <div className='d-flex align-items-baseline'>
                    <img src="./Assets/time.png" height={"20px"}/>
                    <span className='ms-2'> {activity.time} min </span>
                </div>
            </div>
            <hr className='m-0'/>
            <span className='pt-2 px-4 pb-4 pb-md-3 fs-5'>
                {activity.text}
            </span>
        </div>
    </div>
}
