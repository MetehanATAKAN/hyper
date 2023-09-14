import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Webcam from "react-webcam";
import { useTranslation } from 'react-i18next';

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 450,
    height: 450,
    facingMode: "user"
};

const WebcamCapture = ({image,setImage}) => {
    const { t } = useTranslation();
    console.log(image,setImage);
    const webcamRef = React.useRef(null);

    console.log(image);
    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc)
        });


    return (
        <div className="webcam-container">
            <div className="webcam-img">

                {image === '' ? <Webcam
                    audio={false}
                    height={400}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={400}
                    videoConstraints={videoConstraints}
                /> : <img src={image} />}
            </div>
            <div>
                {image != '' ?
                    <Button variant="primary" onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        Retake Image</Button> :
                    <Button variant="primary" onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">{t('Capture')}</Button>
                }
            </div>
        </div>
    );
};

export default WebcamCapture