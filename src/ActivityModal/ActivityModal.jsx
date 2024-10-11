import React, { useEffect, useState } from 'react';
import './ActivityModal.css';
import ActivityBox from '../ActivityBox/ActivityBox';
import TimeBox from '../TimeBox/TimeBox';

export default function ActivityModal({
    toggleDoesActivityExists,
    toggleIsTimeContainerUpdated,
    toggleIsActivityAdded,
    showActivityModal,
    toggleActivityModal,
}) {
    const activities = ["Lunch", "Dinner", "Drinks", "Get Ready", "Nap", "Workout", "To Home", "To Store"];
    const times = [5, 10, 15, 20, 30, 45, 60, 120];

    const [activityText, setActivityText] = useState('');
    const updateActivityText = (text) => {
        setActivityText(text);
    };

    const [specifiedTime, setTime] = useState(1);
    const updateTime = (time) => {
        setTime(time);
    };

    useEffect(() => {
        updateTime(1);
        updateActivityText('');
    }, []);

    const saveActivity = () => {
        if (activityText !== '') {
            let arr = JSON.parse(localStorage.getItem('activitiesArray')) || [];
            let sDate = new Date(localStorage.getItem('startDate'));
            let id = 0;

            // Get the last activity if it exists
            if (arr.length > 0) {
                let lastActivity = arr[arr.length - 1];
                sDate = new Date(lastActivity.endDate);
                id = lastActivity.id + 1;
            }

            // Ensure the new id is unique
            while (arr.some(activity => activity.id === id)) {
                id++;
            }

            let eDate = new Date(sDate);
            eDate.setMinutes(eDate.getMinutes() + parseInt(specifiedTime));

            let activity = {
                id: id,
                text: activityText,
                time: specifiedTime,
                startDate: sDate,
                endDate: eDate,
            };

            arr.push(activity);
            localStorage.setItem('activitiesArray', JSON.stringify(arr));
            console.log(arr);

            updateActivityText('');
            updateTime(1);
            toggleIsActivityAdded(true);
            toggleActivityModal();
        }
    };

    return (
        <>
            {showActivityModal && <div className="modal-backdrop fade show"></div>}

            <div className={`modal fade ${showActivityModal ? 'show' : ''}`}
                tabIndex="-1"
                style={{ display: showActivityModal ? 'block' : 'none' }}
                aria-labelledby="ActivityModalLabel"
                aria-hidden={!showActivityModal}>
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content modal-bg p-md-5 p-4">
                        <div className='modal-body p-0 text-color'>
                            <div className='d-flex justify-content-center mb-2 mb-md-4 mb-lg-4'>
                                <span className='custom-font'>Activity</span>
                            </div>
                            <div className='input-group'>
                                <input type="text" id="inputActivity"
                                    className="bg-transparent form-control rounded input-border"
                                    placeholder="Describe your activity"
                                    value={activityText}
                                    onChange={(e) => updateActivityText(e.target.value)}
                                    aria-label="Activity"
                                    aria-describedby="activity-input"
                                />
                            </div>
                            <div className='d-flex flex-wrap justify-content-between mb-5'>
                                {activities.map((activity, index) => (
                                    <ActivityBox key={index} name={activity} activityText={activityText} updateActivityText={updateActivityText} />
                                ))}
                            </div>
                            <div>
                                Activity Duration
                            </div>
                            <div className='d-flex flex-wrap justify-content-between mb-3'>
                                {times.map((time, index) => (
                                    <TimeBox key={index} name={time} type={time < 60 ? 'min' : 'hr'} time={specifiedTime} updateTime={updateTime} />
                                ))}
                                <div className='w-100'>
                                    <div className='input-group mt-3 d-flex align-items-center' style={{ width: "191px" }}>
                                        <input id="inputTime" type="number" className="bg-transparent form-control rounded py-2 px-3 input-time-border"
                                            min='1'
                                            value={specifiedTime}
                                            onChange={(e) => updateTime(e.target.value)}
                                            placeholder="Specify" aria-label="Specify" aria-describedby="time-input"
                                        />
                                        <span className='p-3'> min</span>
                                    </div>
                                </div>
                            </div>
                            <div className='w-100 d-flex justify-content-between'>
                                <div role="button" className={`btn bg-transparent border-0 outline-0 fs-5`} style={{ color: "#B5B5B6" }} onClick={() => { updateActivityText(''); updateTime(1); toggleActivityModal() }}>Cancel</div>
                                <div role="button" className={` ${activityText ? 'btn-color' : 'in-active'} btn bg-transparent border-0 outline-0 fs-5`} onClick={saveActivity} >Save</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
