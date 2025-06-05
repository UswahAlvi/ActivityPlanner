import React, { useState } from 'react';
import './OffCanvas.css';
import DeleteActivitiesModal from '../DeleteActivitiesModal/DeleteActivitiesModal';
import ResetSessionModal from '../ResetSessionModal/ResetSessionModal';
import AboutOffCanvas from '../AboutOffCanvas/AboutOffCanvas';

export default function OffCanvas({ toggleDoesActivityExists, doesActivityExists, showOffCanvas, toggleOffCanvas, isTimeSet, toggleIsTimeSet,isActivityAdded, toggleIsActivityAdded}) {
  
  const [showDeleteModal,setShowDeleteModal]=useState(false);
  const toggleDeleteModal=()=>{
    setShowDeleteModal(!showDeleteModal);
  }
  const [showResetSessionModal,setShowResetSessionModal]=useState(false);
  const toggleSessionModal=()=>{
    setShowResetSessionModal(!showResetSessionModal);
  }
  
  const [showAboutOffCanvas,setShowAboutOffCanvas]=useState(false);
  const toggleAboutOffCanvas=()=>{
      setShowAboutOffCanvas(!showAboutOffCanvas); 
  }

  const handleShare = async () => {
    await navigator.share({
      title: 'Check this out!',
      text: 'This is a cool link.',
      url: 'https://developers.google.com/web',
    });
  };
  
  return (
    <div className={`offcanvas offcanvas-bg px-3 offcanvas-start ${showOffCanvas?? false ? 'show' : ''}`} tabIndex="-1">
      <div className="offcanvas-header pt-5 d-flex align-items-center justify-content-between">
        <div className='d-flex'>
            <img src="logo.png" height={"39px"}/>
            <span className="offcanvas-title offcanvas-title-color ms-4 fs-3 fw-bold">Activity Planner</span>
        </div>
        <img src="cancel.png" height={"20px"} role="button" onClick={toggleOffCanvas} />
      </div>
      <div className="offcanvas-body pt-5 px-4" style={{overflowY:"hidden"}}>
        <div className='d-flex flex-column justify-content-between h-100 text-color'>
            <div className='about-div-hover d-flex align-items-center w-100 rounded px-2 py-3' role="button" onClick={toggleAboutOffCanvas} >      
                <img src="about.png" height={"30px"}/>
                <span className='fw-normal fs-5 ps-3'> About </span>
            </div>
            <AboutOffCanvas showAboutOffCanvas={showAboutOffCanvas} toggleAboutOffCanvas={toggleAboutOffCanvas}/>
            <hr className='text-light'/>
            <div className={`${doesActivityExists?'about-div-hover':'in-active'} d-flex align-items-center w-100 rounded px-2 py-3`} role={`${isActivityAdded?'button':''}`} onClick={toggleDeleteModal} >
                <img src="bin.png" height={"30px"}/>
                <span className='fw-normal fs-5 ps-3'>Delete all activities</span>
            </div>
            <DeleteActivitiesModal toggleDoesActivityExists={toggleDoesActivityExists} toggleOffCanvas={toggleOffCanvas} showDeleteModal={showDeleteModal} toggleDeleteModal={toggleDeleteModal} toggleIsActivityAdded={toggleIsActivityAdded}/>
            <div className={`${isTimeSet?'about-div-hover':'in-active'} d-flex align-items-center w-100 rounded px-2 py-3`} role={`${isTimeSet?'button':''}`} onClick={toggleSessionModal} >
                <img src="reset.png" height={"30px"}/>
                <span className='fw-normal fs-5 ps-3'>Reset session</span>
            </div>
            <ResetSessionModal toggleDoesActivityExists={toggleDoesActivityExists} toggleOffCanvas={toggleOffCanvas} showResetSessionModal={showResetSessionModal} toggleSessionModal={toggleSessionModal} toggleIsTimeSet={toggleIsTimeSet} toggleIsActivityAdded={toggleIsActivityAdded}/>
            <hr className='text-light'/>
            <div className='about-div-hover d-flex align-items-center w-100 rounded px-2 py-3' role="button" onClick={handleShare} >
                <img src="share.png" height={"30px"}/>
                <span className='fw-normal fs-5 ps-3'>Share this App</span>
            </div>
            <div className='d-flex align-items-center w-100 rounded px-2 py-3'>
                <img src="phone.png" height={"30px"}/>
                <div className='d-flex flex-column'>
                    <span className='ps-3'>Build version</span>
                    <span className='ps-3'>3.5.0</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

