import React, { useEffect, useState } from 'react';
import './ActivitiesContainer.css';
import NoActivityDisplay from '../NoActivityDisplay/NoActivityDisplay';
import SingleActivity from '../SingleActivity/SingleActivity';

export default function ActivitiesContainer({
  toggleIsActivityAdded, 
  isActivityUpdated, 
  doesActivityExists, 
  toggleEditActivityModal, 
  isActivityAdded, 
  allActivityDeleted, 
  UpdateSelectedActivityId, 
  toggleIsActivityUpdated,
  toggleIsTimeUpdated,
  isTimeUpdated
}) {
  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    updatedOrder: []
  };

  const activities = JSON.parse(localStorage.getItem('activitiesArray')) || [];

  const [list, setList] = useState(activities);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  // Re-render and update the list when `isActivityAdded` becomes true
  useEffect(() => {
    if (isActivityAdded) {
      const updatedActivities = JSON.parse(localStorage.getItem('activitiesArray')) || [];
      setList(updatedActivities);
      toggleIsActivityAdded();
    }
  }, [isActivityAdded, toggleIsActivityAdded]);

  useEffect(() => {
    if (isTimeUpdated) {
      const predefinedStartDate = localStorage.getItem('startDate'); 
      const updatedActivities = updateActivityTimes(list, predefinedStartDate);
      setList(updatedActivities);
      localStorage.setItem('activitiesArray', JSON.stringify(updatedActivities));
      toggleIsTimeUpdated(false);
    }
  }, [isTimeUpdated, list, toggleIsTimeUpdated]);

  // Re-render and update the list when `isActivityUpdated` becomes true
  useEffect(() => {
    if (isActivityUpdated) {
      const updatedActivities = JSON.parse(localStorage.getItem('activitiesArray')) || [];
      setList(updatedActivities);
      toggleIsActivityUpdated(false);
    }
  }, [isActivityUpdated, toggleIsActivityUpdated]);

  const calculateEndDate = (startDate, duration) => {
    const start = new Date(startDate);
    start.setMinutes(start.getMinutes() + duration);
    return start.toISOString();
  };

  const updateActivityTimes = (activities, initialStartDate) => {
    let currentStartDate = initialStartDate;
    return activities.map((activity) => {
      const updatedActivity = {
        ...activity,
        startDate: currentStartDate,
        endDate: calculateEndDate(currentStartDate, activity.time),
      };
      currentStartDate = updatedActivity.endDate;
      return updatedActivity;
    });
  };

  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      updatedOrder: list
    });
  };

  const onDragOver = (event) => {
    event.preventDefault();
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(event.currentTarget.dataset.position);

    if (draggedFrom === draggedTo) return;

    const newList = [...list];
    const itemDragged = newList[draggedFrom];
    newList.splice(draggedFrom, 1);
    newList.splice(draggedTo, 0, itemDragged);

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        draggedTo: draggedTo,
        updatedOrder: newList,
      });
    }
  };

  const onDrop = () => {
    const newOrder = dragAndDrop.updatedOrder;
    const predefinedStartDate = localStorage.getItem('startDate');
    const updatedActivities = updateActivityTimes(newOrder, predefinedStartDate);
    setList(updatedActivities);
    localStorage.setItem('activitiesArray', JSON.stringify(updatedActivities));
    setDragAndDrop(initialDnDState);
  };

  return (
    <>
      <NoActivityDisplay doesActivityExists={doesActivityExists} isActivityAdded={isActivityAdded} allActivityDeleted={allActivityDeleted} />
      <div style={{ height: '96vh' }} className={`${doesActivityExists ? 'd-flex' : 'd-none'} overflow-auto rounded flex-grow-1 width-activities-container bg-activities-container px-md-4 px-2 py-md-4 py-2`}>
        <div className="d-flex flex-column h-100 w-100">
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {list.map((activity, index) => (
              <li
                key={activity.id}
                data-position={index}
                draggable="true"
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
              >
                <SingleActivity activity={activity} toggleEditActivityModal={toggleEditActivityModal} UpdateSelectedActivityId={UpdateSelectedActivityId} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
