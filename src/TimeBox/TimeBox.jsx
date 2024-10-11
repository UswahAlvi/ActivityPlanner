import React from 'react'
import './TimeBox.css';

export default function TimeBox(props) {
  return (
    <div className={`${props.time==props.name?'green-border':'activity-box-border '} py-2 px-3 mt-3 text-nowrap rounded activity-box-width align-items-center`} 
      role="button" onClick={()=>props.updateTime(props.name)}>
        {`${props.type=='hr'?props.name/60:props.name} ${props.type}`}
    </div>
  )
}
