import React, { useState } from 'react'
import QRCode from "react-qr-code";


const GenrateQR = ({ value, handleCloseGenrateQr }) => {


    return (
        <div className='qr-code'>
            <div className="qr-code-container">
                <div className="qr-code-header">
                    <h4>QR Code</h4>
                    <button onClick={(e) => handleCloseGenrateQr()}>X</button>
                </div>
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 360, width: "100%" }}>
                    <QRCode
                        id='qr-code'
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={value}
                        viewBox={`300 0 256 256`}
                    />
                </div>
            </div>
        </div>
    )
}

export default GenrateQR