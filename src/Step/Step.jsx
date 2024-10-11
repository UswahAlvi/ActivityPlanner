import React from 'react'
import './Step.css'

export default function Step({step,num}) {
  return <ul className='mb-3'>
            <li className='fw-normal'>
                <span>
                     Step {num}:
                </span>
                {step}
            </li>
        </ul>
}
