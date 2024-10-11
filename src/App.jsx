import './App.css'
import TopBar from './TopBar/TopBar';
import SideBar from './SideBar/SideBar';
import MainPanel from './MainPanel/MainPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import CalendarModal from './CalendarModal/CalendarModal';
import ActivityModal from './ActivityModal/ActivityModal';
import BottomBar from './BottomBar/BottomBar';
import OffCanvas from './OffCanvas/OffCanvas';
import EditActivityModal from './EditActivityModal/EditActivityModal';


function App(){
  const [isTimeSet, setIsTimeSet] = useState(localStorage.getItem('startDate') || false);
  const toggleIsTimeSet=(flag)=>setIsTimeSet(flag);

  const [isTimeContainerUpdated,setIsTimeContainerUpdated]=useState(false);
  const toggleIsTimeContainerUpdated=(flag)=>setIsTimeContainerUpdated(flag);
  
  const [doesActivityExists,setActivityExists]=useState(()=>{
    console.log(JSON.parse(localStorage.getItem('activitiesArray'))||[]);
    let l=(((JSON.parse(localStorage.getItem('activitiesArray')))) || []).length;
    console.log('yea');
    console.log(l);
    return  l? true : false;
  })
  const toggleDoesActivityExists=(flag)=>(setActivityExists(flag));
  const [isTimeUpdated,setIsTimeUpdated]=useState(false);
  const toggleIsTimeUpdated=(flag)=>setIsTimeUpdated(flag);

  const [isActivityAdded, setIsActivityAdded] = useState(false);
  const toggleIsActivityAdded=(flag)=>setIsActivityAdded(flag);

  const [allActivityDeleted,setAllActivityDeleted]=useState(true);
  const toggleAllActivityDeleted=(flag)=>setAllActivityDeleted(flag);

  const [isActivityUpdated, setIsActivityUpdated] = useState(true);
  const toggleIsActivityUpdated=(flag)=>setIsActivityUpdated(flag);

  const [selectedActivityId,setSelectedActivityId]=useState(0);
  const UpdateSelectedActivityId=(id)=>setSelectedActivityId(id);

  
  const [showOffCanvas,setShowOffCanvas]=useState(false);
  const toggleOffCanvas=()=>{
    setShowOffCanvas(!showOffCanvas);
  } 
  const [showCalendarModal,setShowCalendarModal]=useState(false);
  const toggleCalendarModal=()=>{
    setShowCalendarModal(!showCalendarModal);
  }
  const [showActivityModal,setshowActivityModal]=useState(false);
  const toggleActivityModal=()=>{
    setshowActivityModal(!showActivityModal);
  }
  const [showEditActivityModal,setShowEditActivityModal]=useState(false);
  const toggleEditActivityModal=()=>{
    setShowEditActivityModal(!showEditActivityModal);
  }
  useEffect(()=>{
    const activities = JSON.parse(localStorage.getItem('activitiesArray')) || []; 
    if (activities.length === 0) {
        toggleAllActivityDeleted(true);
    } else {
        toggleAllActivityDeleted(false);
    }
  },[isActivityUpdated,isActivityAdded,doesActivityExists]);

  useEffect(()=>{
    if(isActivityUpdated){
      toggleIsTimeContainerUpdated(false);
    }
    if(isTimeUpdated){
      toggleIsTimeContainerUpdated(false);
    }
  },[isActivityUpdated,isTimeUpdated])

  
  useEffect(()=>{
    toggleDoesActivityExists((((JSON.parse(localStorage.getItem('activitiesArray')))) || []).length?true:false)
  },[isActivityAdded,isActivityUpdated])

  return<>
    <div className='d-flex vh-100'>
    <SideBar toggleOffCanvas={toggleOffCanvas} toggleCalendarModal={toggleCalendarModal} toggleActivityModal={toggleActivityModal} isTimeSet={isTimeSet} />
    <OffCanvas  toggleDoesActivityExists={toggleDoesActivityExists} doesActivityExists={doesActivityExists} showOffCanvas={showOffCanvas} 
              toggleOffCanvas={toggleOffCanvas} 
              isTimeSet={isTimeSet} toggleIsTimeSet={toggleIsTimeSet} 
              isActivityAdded={isActivityAdded} toggleIsActivityAdded={toggleIsActivityAdded}
              />  
      <CalendarModal showCalendarModal={showCalendarModal} 
                      toggleCalendarModal={toggleCalendarModal} 
                      isTimeSet={isTimeSet}
                      toggleIsTimeSet={toggleIsTimeSet} 
                      toggleIsTimeUpdated={toggleIsTimeUpdated}
                      toggleIsTimeContainerUpdated={toggleIsTimeContainerUpdated}
                      />
      <ActivityModal toggleDoesActivityExists={toggleDoesActivityExists} toggleIsActivityAdded={toggleIsActivityAdded} 
                      showActivityModal={showActivityModal} 
                      toggleActivityModal={toggleActivityModal}
                    />
      <EditActivityModal
                        toggleDoesActivityExists={toggleDoesActivityExists} 
                        toggleIsActivityUpdated={toggleIsActivityUpdated} 
                        toggleIsActivityAdded={toggleIsActivityAdded}
                        showEditActivityModal={showEditActivityModal} 
                        toggleEditActivityModal={toggleEditActivityModal} 
                        toggleIsTimeContainerUpdated={toggleIsTimeContainerUpdated}
                        selectedActivityId={selectedActivityId}
                        UpdateSelectedActivityId={UpdateSelectedActivityId}
                      />      
      <div className='w-100'>
        <TopBar toggleOffCanvas={toggleOffCanvas}/>
        <MainPanel isTimeSet={isTimeSet} 
                    toggleIsActivityAdded={toggleIsActivityAdded}
                    doesActivityExists={doesActivityExists}
                    isActivityAdded={isActivityAdded}
                    toggleEditActivityModal={toggleEditActivityModal}
                    toggleIsTimeContainerUpdated={toggleIsTimeContainerUpdated}
                    UpdateSelectedActivityId={UpdateSelectedActivityId}
                    allActivityDeleted={allActivityDeleted}
                    isActivityUpdated={isActivityUpdated}
                    toggleIsActivityUpdated={toggleIsActivityUpdated}
                    toggleIsTimeUpdated={toggleIsTimeUpdated}
                    isTimeUpdated={isTimeUpdated}
        />
        <BottomBar toggleCalendarModal={toggleCalendarModal} toggleActivityModal={toggleActivityModal} 
                    isTimeSet={isTimeSet} 
        />
      </div>
    </div>
  </>
}
export default App;

