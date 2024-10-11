import React from 'react'
import './ActivityBox.css';

export default function ActivityBox(props) {
  return (
    <div className={`${props.activityText===props.name?'green-border':'activity-box-border '} py-2 px-3 mt-3 text-nowrap rounded activity-box-width align-items-center`} 
      role="button" onClick={()=>props.updateActivityText(props.name)}>
        {props.name}
    </div>
  )
}
