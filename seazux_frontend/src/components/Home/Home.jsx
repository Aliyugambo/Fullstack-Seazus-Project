import React,{ useState } from "react";

import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from "../../utils/util";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import graph from '../../images/graph.png';
import qrcode from '../../images/qrcode.jpg';
import url from '../../images/url.png';

import './Home.css';
const angleDown = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>

const angleUp = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" /></svg>

const Home = ()=>{

    const [full, setfull] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [copyBtnValue, setCopyBtnValue] = useState('Copy')
    const [copied, setCopied] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();

        const postOriginalUrl = async () => {


            const { data } = await axios.post(`${backendUrl}/api/v1/url/anony-short`, { full }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setShortUrl(window.location.href + data.urlId);
            // console.log(setShortUrl(data.urlId))
        }
        postOriginalUrl();

    }

    function copyText() {
        navigator.clipboard.writeText(shortUrl);

        setCopyBtnValue('Copied');
        setCopied(true);

        setInterval(() => {
            setCopyBtnValue('Copy');
            setCopied(false);
        }, 3000)
    }

    const [showId, setShowId] = useState(0);

    function expand(id) {
        console.log(id);
        if (showId === id) {
            setShowId(0);
            return;
        }
        setShowId(id);
    }
    return <div className='home'>
        <Navbar />
    <div className="header">
        <h2>Seazus.com</h2>
        <p id='title'>Shorten Your Long Seazus URL 🤪</p>

        <form className="url-form" onSubmit={handleSubmit}>
                    <input type="text" label="Enter URL" onChange={(e) => { setfull(e.target.value) }} />
                    <button>Shorten</button>
                </form>

                {
                    shortUrl && shortUrl.length > 0 ? (
                        <div className="showUrl">

                            <h3>{shortUrl}</h3>
                            <button className='copyBtn' style={{ color: copied ? "#fff" : "", background: copied ? "blue" : "#03031f", border: copied ? "none" : "" }} onClick={copyText}>{copyBtnValue}</button>
                        </div>
                    ) : null
                }
    </div>
            
    <div className="login-section">
                <p id='title'>Login Now to access all features <Link to="/v/login">Login</Link></p>
            </div>

            <div id={"features"} className="features-section">
                <h3>Features</h3>

                <div className="features-div">
                    <div className="feature-box">
                        <h4>Analytics</h4>
                        <p className='feature-description'>Get URLs click count and genrate report.</p>
                        <div className="feature-image">
                            <img src={graph} alt="" srcset="" />

                        </div>
                    </div>
                    <div className="feature-box">
                        <h4>QR Code</h4>
                        <p className='feature-description'>Generate QR code for your URLs.</p>
                        <div className="feature-image">
                            <img src={qrcode} alt="qrcode" />

                        </div>
                    </div>
                    <div className="feature-box">
                        <h4>See your URLs</h4>
                        <p className='feature-description'>See all your URLs in one place.</p>
                        <div className="feature-image">
                        <img src={url} alt="qrcode" />
                        </div>
                    </div>
                </div>
            </div>

            <section className='faq-section' id={"Fqr"}>
                <h3>Frequently asked questions</h3>
                <div className="faq-div">
                    <div onClick={() => expand(1)} className={showId===1?'faq-collapse faq-collapse-selected':'faq-collapse'}>
                        <div className="collapse-header">
                            {
                                showId === 1 ? angleUp : angleDown
                            }
                            <h2>What is URL shortening?</h2>
                        </div>
                        {
                            showId === 1 ? (
                                <div className="show" id='collapse-1'>
                                    <p>URL shortening is a technique to convert long URLs to shoter one or can be given a customizable name.</p>
                                </div>
                            ) : null
                        }
                    </div>
                    <div onClick={() => expand(2)} className={showId===2?'faq-collapse faq-collapse-selected':'faq-collapse'}>
                        <div className="collapse-header">
                            {
                                showId === 2 ? angleUp : angleDown
                            }
                            <h2>Why should I use URL shortening?</h2>
                        </div>
                        {
                            showId === 2 ? (
                                <div className="show" id='collapse-2'>
                                    <p> Their are many reasons to use URL shortening, for example, if you have to share some website url and it is very long, so it may looks wierd, for this reason you can use URL shortner
                                        Also if you want to track your URLs click count, then you can use URL shortner.
                                        If you want to give a custom name to your URL, then you can use URL shortner.
                                        If you want to generate QR code for your URL, then you can use URL shortner.
                                        And many more...
                                    </p>
                                </div>
                            ) : null
                        }

                    </div>
                    <div onClick={() => expand(3)} className={showId===3?'faq-collapse faq-collapse-selected':'faq-collapse'}>
                        <div className="collapse-header">
                            {
                                showId === 3 ? angleUp : angleDown
                            }
                            <h2>How to use URL shortner?</h2>
                        </div>
                        {
                            showId === 3 ? (

                                <div className="show" id='collapse-3'>
                                    <p>It is very easy to use URL shortner, just enter your long URL and click on shorten button, it will generate a short URL for you.</p>
                                </div>
                            ) : null
                        }
                    </div>
                    <div onClick={() => expand(4)} className={showId===4?'faq-collapse faq-collapse-selected':'faq-collapse'}>
                        <div className="collapse-header">
                            {
                                showId === 4 ? angleUp : angleDown
                            }
                            <h2>What is QR code? And will I genrate it?</h2>
                        </div>
                        {
                            showId === 4 ? (

                                <div className="show" id='collapse-4'>
                                    <p>QR code is a two-dimensional barcode that can be read by a camera. QR code is used to store information like URL, text, phone number, email address, etc. Yes, you can generate QR code for your URL by just clicking 'Genrate QR code' on URL, You have to be loggedin for using this functionality</p>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </section>
            <Footer/>
    </div>
}

export default Home