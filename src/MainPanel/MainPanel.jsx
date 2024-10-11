import React from 'react'
import './MainPanel.css'
import ActivitiesContainer from '../ActivitiesContainer/ActivitiesContainer';
import TimesContainer from '../TimesContainer/TimesContainer';

export default function MainPanel({isTimeUpdated,toggleIsTimeUpdated, toggleIsActivityUpdated,toggleIsActivityAdded,isActivityUpdated, isTimeSet,doesActivityExists, isActivityAdded, toggleEditActivityModal, toggleIsTimeContainerUpdated,allActivityDeleted, UpdateSelectedActivityId}) {

  return (
  <>
    <div id='mainpanel' className={`${isTimeSet ? 'd-none' : 'd-flex'} main-panel align-items-center justify-content-center ml mt`} style={{height:'100%'}} >
      <img src="logo.png" alt="logo" className='h-logo'/>
    </div>
    <div className={`${isTimeSet ? '' : 'd-none'} main-panel ml mt`}>
      <div className='d-flex gap flex-row flex-wrap-reverse text-color p-3 p-md-5 overflow-auto'>
        <ActivitiesContainer isTimeUpdated={isTimeUpdated} toggleIsTimeUpdated={toggleIsTimeUpdated} toggleIsActivityUpdated={toggleIsActivityUpdated} toggleIsActivityAdded={toggleIsActivityAdded} isActivityUpdated={isActivityUpdated} toggleEditActivityModal={toggleEditActivityModal} doesActivityExists={doesActivityExists} isActivityAdded={isActivityAdded} allActivityDeleted={allActivityDeleted} UpdateSelectedActivityId={UpdateSelectedActivityId}/>
        <TimesContainer doesActivityExists={doesActivityExists} toggleIsTimeContainerUpdated={toggleIsTimeContainerUpdated} isActivityAdded={isActivityAdded} />
      </div>
    </div>
  </>
);

}