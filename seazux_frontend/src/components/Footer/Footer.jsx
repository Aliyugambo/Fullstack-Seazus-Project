import React from 'react'
import './Footer.css'
import heart from '../../images/heart.png'

const Footer = () => {
  return (
    <div className='footer'>
        {/* <div className="footer-top">
            <a href="">Report a problem</a>
            <a href="">Follow on LinkedIn</a>
            <a href="">Source Code</a>
            <a href="/credits" target={'_blank'}>Credits</a>
        </div> */}
        <div className="footer-bottom">
            <p>Made with <span><img src={heart} alt="" srcSet="" /></span> By <a href="https://mafuztechsolution.live/">Aliyu Gambo Aliyu</a></p>
            <p id='cpr'>Copyright © 2023 - 2024 Aliyu Gambo. All rights reserved.</p>
        </div>
    </div>
  )
}



export default Footer