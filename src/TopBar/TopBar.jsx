import React from 'react'
import './TopBar.css'

export default function TopBar({toggleOffCanvas}) {
    const now=new Date();
    const hours=now.getHours();
    let greeting;
    if (hours >= 6 && hours < 12) {
        greeting = "Good Morning!";
    } 
    else if (hours >= 12 && hours < 18) {
        greeting = "Good Afternoon!";
    } 
    else {
        greeting = "Welcome!";
    }
    return <nav className="w-100 navbar navbar-bg d-flex px-4 px-md-5 px-lg-5 py-3 py-lg-4 py-md-4 justify-content-between align-items-center position-fixed ml">
        <div className='d-flex align-items-center mb-0 p-0'>
            <img src="logo.png" height={"40px"} className='d-block d-md-none d-lg-none d-xl-none' alt="logo"/>
            <span className="ms-4 ms-md-0 ms-lg-0 fw-bold text-wrap fs-xs">
                Hi, {greeting}  
            </span>
        </div>
        <img src="menu.png" className="menu-img mb-0 p-0 d-block d-md-none d-lg-none" alt="menu" role="button" onClick={toggleOffCanvas}/>
    </nav>
}
