import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Gameresult from './Gameresult';

const FirstTest = ({ step, onNext, onPrevious }) => {
  const [imageVisible, setImageVisible] = useState(false);
  const [reactionTimeStatus, setReactionTimeStatus] = useState(false);
  const [directionData, setDirectionData] = useState([]);
  const [directionStauts, setDirectionStatus] = useState(false);
  const [testCount, setTestCount] = useState(0);
  const startTimeRef = useRef(null);
  const phone = localStorage.getItem('phone');
  useEffect(() => {
    let interval;
    if (testCount < 6) {
      interval = setInterval(() => {
        setImageVisible(true);
        startTimeRef.current = Date.now();
        setTimeout(() => {
          setImageVisible(false);
        }, 500); // Image is visible for 500ms
        setTestCount(testCount + 1);  
      }, 1000); // Image is displayed every 1 second
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [testCount]);

  const handleClick = (direction) => {
    if (imageVisible) {
      const reactionTime = (Date.now() - startTimeRef.current)<500? 1:0;
      if(reactionTime === 0){
        setReactionTimeStatus(true);        
      }
      if(direction !== 'down'){
        setDirectionStatus(true);
      }
      setDirectionData([...directionData, direction]);
      setImageVisible(false); // Hide the image when button is clicked
    }
  };

  const handleOk = async() => {
    onNext();
    let report = 'success';
    let step = 1;
    const payload = {
      phone,
      report,
      step
    }
    try {
      await axios.post('http://localhost:3000/user/update_game_status', {
        payload
      });
    } catch (err) {
      console.log("error");
    }
  }
  const handleRetry = async() => {
    onPrevious();    
    let report = 'retry';
    let step = 1;
    const payload = {
      phone,
      report,
      step
    }
    try {
      await axios.post('http://localhost:3000/user/update_game_status', {
        payload
      });
    } catch (err) {
      console.log("error");
    }
  }
  const handleIgnore = async() => {
    onNext();
    let report = 'ignore';
    let step = 1;
    const payload = {
      phone,
      report,
      step
    }
    try {
      await axios.post('http://localhost:3000/user/update_game_status', {
        payload
      });
    } catch (err) {
      console.log("error");
    }    
  }

  return (
    <div style={{width: '100vw', height: '100vh', backgroundColor:'rgb(100 192 255 / 40%)'}}>
      {testCount === 6 &&(
        <div style={{height:'100vh'}}>
          {directionData.length === 5 && (
            <Gameresult  step={step} direct={directionData} />
          )}
          {reactionTimeStatus === true && (
              <p style={{marginTop: 0}}>Failed! The reaction Time is long!</p>
          )}
          {directionStauts === true && (
              <p style={{marginTop: 0}}>Failed! Wrong Clicked!</p>
          )}
          {directionData.length !== 5 && (
              <p style={{marginTop: 0}}>Failed! Not Clicked Everytimes!</p>
          )}
          {(reactionTimeStatus === true || directionStauts === true || directionData.length !== 5) && (
            <div style={{display: 'flex', gap: 10, justifyContent: 'center', alignItems:'center'}}>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleRetry()}>Retry</button>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleIgnore()}>Ignore</button>
            </div>
          )}          
          {reactionTimeStatus === false && directionStauts === false && directionData.length === 5 && (
            <div>
              <p>Good!</p>
              {step !== 10&& (
                <button style={{width: '100px', height: '35px', visibility: 'true', cursor: 'pointer'}} onClick={() => handleOk()}>Next</button>
              )}
              </div>
          )}
        </div>
      )}
      {testCount !== 6 &&(
        <div className="container">
        <div className="test-leftPane">
            {imageVisible &&<div className="button-explanation" style={{width: '15%'}}>
            <img src='btn/down.png'width={70} height={70} /></div>}
          
        </div>
        <div className="rightPane">
          <div className="grid-container">
            <div className="grid-item" ></div>
            <div className="grid-item button">
              <img src='btn/up.png' width={70} height={70} onClick={() => handleClick('up')}></img>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item button">
              <img src='btn/left.png' width={70} height={70} onClick={() => handleClick('left')}></img>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item button">
              <img src='btn/right.png' width={70} height={70} onClick={() => handleClick('right')}></img>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item button">
              <img src='btn/down.png' width={70} height={70} onClick={() => handleClick('down')}></img>
            </div>
            <div className="grid-item"></div>            
          </div>
        </div>
      </div>      
      )}
    </div>
  );
};

export default FirstTest;
