import { useEffect, useState } from 'react';
import './CalendarModal.css';
import StartTimeContainer from '../StartTimeContainer/StartTimeContainer';

export default function CalendarModal({ isTimeSet, toggleIsTimeUpdated, showCalendarModal, toggleCalendarModal, toggleIsTimeSet, toggleIsTimeContainerUpdated }) {

    const [isEndTimeGreater, setIsEndTimeGreater] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 60 * 60 * 1000)); // Default to one hour ahead

    // Effect to initialize dates based on local storage or current time
    useEffect(() => {
        const storedStartDate = localStorage.getItem('startDate');
        const storedEndDate = localStorage.getItem('endDate');

        if (storedStartDate) {
            setStartDate(new Date(storedStartDate));
        } else {
            setStartDate(new Date());
        }

        if (storedEndDate) {
            setEndDate(new Date(storedEndDate));
        } else {
            setEndDate(new Date(new Date().getTime() + 60 * 60 * 1000)); // Set end date to one hour ahead
        }
    }, [showCalendarModal]); // Run when modal is shown

    const handleStartDate = (date) => {
        setStartDate(date);
    };

    const handleEndDate = (date) => {
        setEndDate(date);
    };

    const handleIsTimeGreater = () => {
        setIsEndTimeGreater(endDate > startDate);
    };

    useEffect(() => {
        handleIsTimeGreater();
    }, [startDate, endDate]);

    const saveTimeData = () => {
        localStorage.setItem('startDate', startDate);
        localStorage.setItem('endDate', endDate);
        if (isTimeSet) {
            toggleIsTimeUpdated(true);
        } else {
            toggleIsTimeSet(true);
        }
        toggleIsTimeContainerUpdated(false);
        toggleCalendarModal(); // Close the modal here
    };

    return (
        <>
            {showCalendarModal && <div className="modal-backdrop fade show"></div>}

            <div
                className={`modal fade ${showCalendarModal ? 'show' : ''}`}
                tabIndex="-1"
                style={{ display: showCalendarModal ? 'block' : 'none' }}
                aria-labelledby="CalendarModalLabel"
                aria-hidden={!showCalendarModal}
            >
                <div className="modal-dialog modal-dialog-centered text-color">
                    <div className="modal-content p-5 modal-bg d-flex align-items-center mb-4">
                        <div className="fw-normal fs-2 pb-5">Set Start & End</div>

                        <div className="d-flex text-color justify-content-between w-100 mb-3">
                            <StartTimeContainer theDate={startDate} handleDate={handleStartDate} borderColor='#52B788' />
                            <StartTimeContainer theDate={endDate} handleDate={handleEndDate} borderColor='#822528' />
                        </div>

                        <div className={`${isEndTimeGreater ? 'd-none' : 'd-flex my-3'}`}>
                            <img src="./Assets/danger.png" height={'20px'} alt="Warning Icon" />
                            <span className="ps-2" style={{ fontSize: '12px' }}>
                                Note: End date/time must be after the start date/time
                            </span>
                        </div>

                        <div className="w-100 d-flex justify-content-between">
                            <div
                                role="button"
                                className="btn bg-transparent border-0 fs-4"
                                style={{ color: 'rgb(181 181 181 /1)' }}
                                onClick={toggleCalendarModal}
                            >
                                Cancel
                            </div>

                            <div
                                role={isEndTimeGreater ? 'button' : ''}
                                className={`bg-transparent border-0 fs-4 ${isEndTimeGreater ? 'btn btn-color' : 'in-active'}`}
                                onClick={isEndTimeGreater ? saveTimeData : null}
                            >
                                Save
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
