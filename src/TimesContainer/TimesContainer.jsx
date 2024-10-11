import React, { useEffect, useState } from 'react'
import './TimesContainer.css';
import TimeExceededModal from '../TimeExceededModal/TimeExceededModal';

export default function TimesContainer({doesActivityExists, isActivityAdded,toggleIsTimeContainerUpdated}) {
    const [showTimeExceededModal, setShowTimeExceededModal]=useState(false);
    const toggleTimeExceededModal=()=>{
        setShowTimeExceededModal(!showTimeExceededModal);
    }
    const [availableHour,setAvailableHours]=useState(()=>{
        let startDate=null;
        let endDate=new Date(localStorage.getItem('endDate'));
        let length=(JSON.parse(localStorage.getItem('activitiesArray')) || []).length;
        if(length>0){
            let activities=JSON.parse(localStorage.getItem('activitiesArray'));
            startDate=new Date(activities[length-1].endDate);
        }
        else{
            startDate=new Date(localStorage.getItem('startDate'));
        }
        if(endDate && startDate){
            const diffInMilliseconds = endDate.getTime()- startDate.getTime();
            const totalMinutes = Math.floor(diffInMilliseconds / 1000 / 60);

            const hours = Math.floor(totalMinutes / 60);

            return hours;
        }
        else{
            return 0;
        }
    });
    const [availableMinute, setAvailableMinutes]=useState(()=>{
        let startDate=null;
        let endDate=new Date(localStorage.getItem('endDate'));
        let length=(JSON.parse(localStorage.getItem('activitiesArray')) || []).length;
        if(length>0){
            let activities=JSON.parse(localStorage.getItem('activitiesArray'));
            startDate=new Date(activities[length-1].endDate);
        }
        else{
            startDate=new Date(localStorage.getItem('startDate'));
        }
        if(endDate && startDate){
            const diffInMilliseconds = endDate.getTime()- startDate.getTime();
            const totalMinutes = Math.floor(diffInMilliseconds / 1000 / 60);

            const minutes = totalMinutes % 60;

            return minutes;
        }
        else{
            return 0;
        }
    });

    const [totalHours,setTotalHours]=useState(0);
    const [totalMinutes,setTotalMinutes]=useState(0);
        
    const [EstimatedEndTime,setEstimatedEndTime]=useState(0);

    useEffect(()=>{
        calculateAvailableTime();
        calculateTotalTime();
        calculateEstimatedEndTime();
        toggleIsTimeContainerUpdated(true);
    },[toggleIsTimeContainerUpdated]);

    const calculateAvailableTime=()=>{
        let startDate=new Date(localStorage.getItem('startDate'));
        let endDate=new Date(localStorage.getItem('endDate'));
        let length=(JSON.parse(localStorage.getItem('activitiesArray')) || []).length;
        if(length>0){
            let activities=JSON.parse(localStorage.getItem('activitiesArray'));
            startDate=new Date(activities[length-1].endDate);
        }
        else{
            startDate=new Date(localStorage.getItem('startDate'));
        }
        if(endDate && startDate){
            
            const diffInMilliseconds =endDate.getTime()- startDate.getTime();
            const totalMinutes = Math.floor(diffInMilliseconds / 1000 / 60);

            let hours = Math.floor(totalMinutes / 60);
            let minutes = totalMinutes % 60;
            
            if((totalMinutes < 0) && (totalMinutes>-60)){
                hours=0;
                const minutes = (-totalMinutes) % 60;
            }
            else if(totalMinutes < 0){
                hours = Math.floor((-totalMinutes) / 60);
                minutes = (-totalMinutes) % 60;
                hours=-hours
            }
            setAvailableHours(hours);
            setAvailableMinutes(minutes);
        }
        else{
            setAvailableHours(0);
            setAvailableMinutes(0);
        }
    }
    const calculateTotalTime=()=>{
        let activities=JSON.parse(localStorage.getItem('activitiesArray')) || [];
        let hrs=0;
        let min=0;
        if(activities.length>0){
            for(let i=0;i<(activities.length);i++){
                min = min + parseInt(activities[i].time);
            }
            hrs = Math.floor(min / 60);
            min=min%60;
        }
        setTotalHours(hrs);
        setTotalMinutes(min);
    }
    let options = {
            month: 'short',   // "Oct"
            day: 'numeric',   // "3"
            hour: 'numeric',  // "1"
            minute: '2-digit', // "08"
            hour12: true      // "AM/PM" format
        };

    const calculateEstimatedEndTime=()=>{
        let arr=JSON.parse(localStorage.getItem('activitiesArray')) || [];
        
        if(arr.length>0){
            let eDate=new Date(arr[arr.length-1].endDate);
            setEstimatedEndTime(eDate);
        }
    }
  return (
        <div className='width-times-container bg-time-container rounded rounded px-md-5 px-2 py-md-5 py-2 align-self-end'>
            <TimeExceededModal showTimeExceededModal={showTimeExceededModal} toggleTimeExceededModal={toggleTimeExceededModal}/>
            <div className='rounded bg-available-time d-flex flex-column align-items-center'>
            <img src='./Assets/danger.png' height={'25px'} role='button' onClick={toggleTimeExceededModal} className={`${(availableHour<0 || availableMinute<0)?'d-block':'d-none'}`}/>
                <span style={{fontWeight:'450', fontSize:'28px'}}> {availableHour}h:{availableMinute}m </span>
                <span style={{fontWeight:'300', fontSize:'22px'}}> Available Time</span>
            </div>
            <div>
                <div className={`${doesActivityExists?'d-flex':'d-none'} align-items-center p-3`}>
                    <div className='d-flex align-items-center pe-3'>
                        <img src="./Assets/watch.png" height={"30px"}/>
                    </div>
                    <div className={`d-flex flex-column`}>
                        <span style={{fontWeight:'450', fontSize:'22px'}}>{EstimatedEndTime.toLocaleString('en-US', options)}</span>
                        <span style={{fontWeight:'300', fontSize:'22px'}}>Estimated End Time</span>
                    </div>
                </div>
                <div className='d-flex align-items-center p-3'>
                    <div className='d-flex align-items-center pe-3'>
                        <img src="./Assets/stopwatch.png" height={"30px"}/>
                    </div>
                    <div className='d-flex flex-column'>
                        <span style={{fontWeight:'450', fontSize:'22px'}}>{totalHours}h:{totalMinutes}m</span>
                        <span style={{fontWeight:'300', fontSize:'22px'}}>Total Time</span>
                    </div>
                </div>
            </div>
        </div>
  )
}
