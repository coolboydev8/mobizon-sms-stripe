import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Gameresult from './Gameresult';

const ForthTest = ({ step, onNext, onPrevious }) => {
  const [imageVisible, setImageVisible] = useState(false);
  const [reactionTimeStatus, setReactionTimeStatus] = useState(false);
  const [directionData, setDirectionData] = useState([]);
  const [directionStatus, setDirectionStatus] = useState(false);
  const [testCount, setTestCount] = useState(0);
  const startTimeRef = useRef(null);
  const phone = localStorage.getItem('phone');
  const payload_step = step / 2;

  useEffect(() => {
    let interval;
    if (testCount < 2) {
      setImageVisible(true);
      startTimeRef.current = Date.now();
      interval = setInterval(() => {
        setTestCount((prevCount) => prevCount + 1);
      }, 5000); // Image is displayed every 1 second
      setTimeout(() => {
        setImageVisible(false);
      }, 3500); // Image is visible for 500ms

    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [testCount]);

  const handleClick = (direction) => {
    if (imageVisible) {
      if(testCount === 0 && directionData.length === 0){
        setDirectionData([...directionData, direction]);
        const reactionTime = (Date.now() - startTimeRef.current)<3300? 1:0;
        if(reactionTime === 0){
          setReactionTimeStatus(true);        
        }  
        if(direction !== 'down'){
          setDirectionStatus(true);
        }  
      }
      if(testCount === 1 && directionData.length === 1){
        setDirectionData([...directionData, direction]);
        const reactionTime = (Date.now() - startTimeRef.current)<3300? 1:0;
        if(reactionTime === 0){
          setReactionTimeStatus(true);        
        }  
        if(testCount === 1 && direction !== 'right'){
          setDirectionStatus(true);
        }  
      }
    }
  };
  const handleOk = async() => {
    onNext();
    let report = 'success';
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
    onNext();
    let report = 'ignore';
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

  return (
    <div>
      {testCount === 2 &&(
        <div>
          {directionData.length === 2 && (
            <Gameresult  step={step} direct={directionData} />
          )}
          {reactionTimeStatus === true && (
            <p className='p-game-result'>Failed! The reaction Time is long!</p>
          )}
          {directionStatus === true && (
            <p className='p-game-result'>Failed! Wrong Clicked!</p>
          )}
          {directionData.length !== 2 && (
            <p className='p-game-result'>Failed! Didn't always click!</p>
          )}
          {(reactionTimeStatus === true || directionStatus === true || directionData.length !== 2) && (
            <div style={{display: 'flex', gap: 10, justifyContent: 'center', alignItems:'center'}}>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleRetry()}>Retry</button>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleIgnore()}>Ignore</button>
            </div>
          )}          
          {reactionTimeStatus === false && directionStatus === false && directionData.length === 2 &&(
            <div>
              <p  className='p-game-result'>Good!</p>
              <div style={{display: 'flex', gap: 10, justifyContent: 'center', alignItems:'center'}}>          
                <button className='btn-bottom-next button' style={{width: '100px', height: '35px', visibility: 'true', cursor: 'pointer'}} onClick={() => handleOk()}>Next</button>
              </div>
            </div>
          )}
        </div>
      )}
      {testCount !== 2 &&(
        <div className="container">
        <div className="test-leftPane">
          {imageVisible && testCount === 0 &&(
              <div style={{display: 'flex', paddingLeft: '10px', paddingRight: '10px'}}>
              <div className="grid-item button" style={{marginBottom: '10px', border: 0, height: '1%'}}>
                <img src='btn/4_icon.png'width={100} height={100}></img>
              </div>
              <div className="grid-item button" style={{border: 0, border: '1px solid black'}}>
                <img src='btn/4_1.png'width={300} height={300}></img>
              </div>
            </div>
          )}
          {imageVisible && testCount === 1 &&(
              <div style={{display: 'flex', paddingLeft: '10px', paddingRight: '10px'}}>
              <div className="grid-item button" style={{marginBottom: '10px', border: 0, height: '1%'}}>
                <img src='btn/4_icon.png'width={100} height={100}></img>
              </div>
              <div className="grid-item button" style={{border: 0, border: '1px solid black'}}>
                <img src='btn/4_2.png'width={300} height={300}></img>
              </div>
            </div>
          )}

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

export default ForthTest;
