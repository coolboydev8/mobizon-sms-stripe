import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Gameresult from './Gameresult';

const FirstTest = ({ step, onNext, onPrevious }) => {
  const navigate = useNavigate();

  const [imageVisible, setImageVisible] = useState(false);
  const [reactionTimeStatus, setReactionTimeStatus] = useState(false);
  const [directionData, setDirectionData] = useState([]);
  const [directionStauts, setDirectionStatus] = useState(false);
  const [testCount, setTestCount] = useState(0);
  const startTimeRef = useRef(null);
  const phone = localStorage.getItem('phone');
  const option = localStorage.getItem('option');
  const date = localStorage.getItem('date');
  const payload_step = step / 2;

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
    if(step !== 10){
      onNext();
    }
    let report = 'success';
    const payload = {
      phone,
      report,
      payload_step
    }
    const payload_confirm = {
      phone,
      option,
      date
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/update_game_status`, {
        payload
      });
    } catch (err) {
      console.log("error");
    }
    if(step === 10){
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/user/confirm_appointment`, {
          payload_confirm
        });
        navigate('/success');
      } catch (err) {
        navigate('/oops');
        console.log("error");
      }  
    }
  }
  const handleRetry = async() => {
    onPrevious();    
    let report = 'retry';
    const payload = {
      phone,
      report,
      payload_step
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/update_game_status`, {
        payload
      });
    } catch (err) {
      console.log("error");
    }
  }
  const handleIgnore = async() => {
    if(step !== 10){
      onNext();
    }
    let report = 'ignore';
    const payload = {
      phone,
      report,
      payload_step
    }
    const payload_confirm = {
      phone,
      option,
      date
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/update_game_status`, {
        payload
      });
    } catch (err) {
        console.log("error");
    }    
    if(step === 10){
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/user/confirm_appointment`, {
          payload_confirm
        });
        navigate('/success');
      } catch (err) {
        navigate('/oops');
        console.log("error");
      }  
    }

  }

  return (
    <div>
      {testCount === 6 &&(
        <div style={{height:'100vh' }}>
          {directionData.length === 5 && (
            <Gameresult  step={step} direct={directionData} />
          )}
          {reactionTimeStatus === true && (
              <p className='p-game-result'>Failed! The reaction Time is long!</p>
          )}
          {directionStauts === true && (
              <p className='p-game-result'>Failed! Wrong Clicked!</p>
          )}
          {directionData.length !== 5 && (
              <p className='p-game-result'>Failed! Didn't always click!</p>
          )}
          {(reactionTimeStatus === true || directionStauts === true || directionData.length !== 5) && (
            <div style={{display: 'flex', gap: 10, justifyContent: 'center', alignItems:'center'}}>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleRetry()}>Retry</button>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleIgnore()}>Ignore</button>
            </div>
          )}          
          {reactionTimeStatus === false && directionStauts === false && directionData.length === 5 && (
            <div>
              <p  className='p-game-result'>Good!</p>
              <div style={{display: 'flex', gap: 10, justifyContent: 'center', alignItems:'center'}}>          
                <button className='btn-bottom-next button' style={{width: '100px', height: '35px', visibility: 'true', cursor: 'pointer'}} onClick={() => handleOk()}>Next</button>
              </div>
              </div>
          )}
        </div>
      )}
      {testCount !== 6 &&(
        <div className="container">
        <div className="test-leftPane">
            {imageVisible &&<div className="button-explanation">
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
