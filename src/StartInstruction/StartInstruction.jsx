import React from 'react';
import './StartInstruction.css';

export default function StartInstruction({ isTimeSet, display }) {
    return (
        <div className={` ${isTimeSet ? 'd-none ' : 'd-flex '} ${display} position-absolute align-items-center drift`}>
            <img src="arrow.png" className='arrow-img-h' alt="Arrow" />
            <div className='text-nowrap ms-2' style={{ color: 'white' }}>
                Specify the Start and End
            </div>
        </div>
    );
}
