import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import Gameresult from './Gameresult';

const ForthTest = ({ step, onNext, onPrevious }) => {
  const { t } = useTranslation();
  // Create refs for each button
  const leftButtonRef = useRef(null);
  const upButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const downButtonRef = useRef(null);
  const [active, setActive] = useState({ left: false, up: false, right: false, down: false });

  const [imageVisible, setImageVisible] = useState(false);
  const [reactionTimeStatus, setReactionTimeStatus] = useState(false);
  const [directionData, setDirectionData] = useState([]);
  const [directionStatus, setDirectionStatus] = useState(false);
  const [testCount, setTestCount] = useState(0);
  const startTimeRef = useRef(null);
  const [retryTimes, setRetryTimes] = useState(0);
  const [retryTimesImgVisible, setRetryTimesImgVisible] = useState(false);

  const phone = localStorage.getItem('phone');
  const payload_step = step / 2;
  
  useEffect(() => {
    const phone = localStorage.getItem('phone');
    const  payload = {
      phone,
      payload_step
    }
    const fetchData = async() => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/get_one_user`, {
          payload
        });
        setRetryTimes(response.data.data);
      } catch (err) {
        alert(err);
      }  
    }
    fetchData();
  }, []);

  useEffect(() => {
    let interval;
    const handleKeyDown = (event) => {
      let key = null;
      switch (event.keyCode) {
        case 37: // Left arrow
          key = 'left';
          leftButtonRef.current.click();
          break;
        case 38: // Up arrow
          key = 'up';
          upButtonRef.current.click();
          break;
        case 39: // Right arrow
          key = 'right';
          rightButtonRef.current.click();
          break;
        case 40: // Down arrow
          key = 'down';
          downButtonRef.current.click();
          break;
        default:
          break;
      }
      if (key) {
        setActive(prev => ({ ...prev, [key]: true }));
        setTimeout(() => {
          setActive(prev => ({ ...prev, [key]: false }));
        }, 150); // Duration to show the effect, adjust as needed
      }
    };
    if (testCount < 2) {
      setImageVisible(true);
      window.addEventListener('keydown', handleKeyDown);
      startTimeRef.current = Date.now();
      interval = setInterval(() => {
        setTestCount((prevCount) => prevCount + 1);
      }, 6000 ); 
    } else {
      clearInterval(interval);
    }
    // Cleanup function to remove the event listener
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [testCount]);

  const handleClick = (direction) => {
    if (imageVisible) {
      if(testCount === 0 && directionData.length === 0){
        setDirectionData([...directionData, direction]);
        const reactionTime = (Date.now() - startTimeRef.current)<4000? 1:0;
        if(reactionTime === 0){
          setReactionTimeStatus(true);        
        }  
        if(direction !== 'down'){
          setDirectionStatus(true);
          if(retryTimes > 3){
            setRetryTimesImgVisible(true);
            setTimeout(() => {
              setRetryTimesImgVisible(false);
            }, 100); // Image will disappear after 1000 milliseconds
            const audio = new Audio('audio/wrong.mp3');
            audio.play().catch(error => console.error('Error playing the sound:', error)); 
          }  
        }  
      }
      if(testCount === 1 && directionData.length === 1){
        setDirectionData([...directionData, direction]);
        const reactionTime = (Date.now() - startTimeRef.current)<4500? 1:0;
        if(reactionTime === 0){
          setReactionTimeStatus(true);        
        }  
        if(testCount === 1 && direction !== 'right'){
          setDirectionStatus(true);
          if(retryTimes > 3){
            setRetryTimesImgVisible(true);
            setTimeout(() => {
              setRetryTimesImgVisible(false);
            }, 100); // Image will disappear after 1000 milliseconds
            const audio = new Audio('audio/wrong.mp3');
            audio.play().catch(error => console.error('Error playing the sound:', error)); 
          }  
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
      { retryTimesImgVisible === true &&( 
        <div className='wrong-click'>Wrong</div>
      )}
      {testCount === 2 &&(
        <div>
          {directionData.length === 2 && (
            <Gameresult  step={step} direct={directionData} />
          )}
          {reactionTimeStatus === true && (
            <p className='p-game-result'>{t('game-failed-reaction')}</p>
          )}
          {directionStatus === true && (
            <p className='p-game-result'>{t('game-failed-click')}</p>
          )}
          {directionData.length !== 2 && (
            <p className='p-game-result'>{t('game-failed-always')}</p>
          )}
          {(reactionTimeStatus === true || directionStatus === true || directionData.length !== 2) && (
            <div style={{display: 'flex', gap: 10, justifyContent: 'center', alignItems:'center'}}>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleRetry()}>{t('game-retry')}</button>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleIgnore()}>{t('game-ignore')}</button>
            </div>
          )}          
          {reactionTimeStatus === false && directionStatus === false && directionData.length === 2 &&(
            <div>
              <p  className='p-game-result'>{t('game-good')}</p>
              <div style={{display: 'flex', gap: 10, justifyContent: 'center', alignItems:'center'}}>          
                <button className='btn-bottom-next button' style={{width: '100px', height: '35px', visibility: 'true', cursor: 'pointer'}} onClick={() => handleOk()}>{t('game-next')}</button>
              </div>
            </div>
          )}
        </div>
      )}
      {testCount !== 2 &&(
        <div className="container">
        <div className="test-leftPane">
          {imageVisible && testCount === 0 &&(
              <div>
                <div className="button-explanation" style={{display: 'block', width: 'fit-content'}}>
                  <img src='btn/4_icon.png'width={100} height={100}></img>
                </div>
                <div style={{height: '3vh'}}></div>
                <div className="button-explanation">
                  <img src='btn/4_1.png'width={400} height={400}></img>
                </div>
            </div>
          )}
          {imageVisible && testCount === 1 &&(
            <div>
              <div className="button-explanation" style={{display: 'block', width: 'fit-content'}}>                
                <img src='btn/4_icon.png'width={100} height={100}></img>
              </div>
              <div style={{height: '3vh'}}></div>
              <div className="button-explanation">
                <img src='btn/4_2.png'width={400} height={400}></img>
              </div>
            </div>
          )}

        </div>
        <div className="rightPane">
          <div className="grid-container">
            <div className="grid-item" ></div>
            <div className={`grid-item button ${active.up ? 'active' : ''}`} ref={upButtonRef} onClick={() => handleClick('up')}>
              <img src='btn/up.png' width={70} height={70}></img>
            </div>
            <div className="grid-item"></div>
            <div className={`grid-item button ${active.left ? 'active' : ''}`} ref={leftButtonRef} onClick={() => handleClick('left')}>
              <img src='btn/left.png' width={70} height={70}></img>
            </div>
            <div className="grid-item"></div>
            <div className={`grid-item button ${active.right ? 'active' : ''}`} ref={rightButtonRef} onClick={() => handleClick('right')}>
              <img src='btn/right.png' width={70} height={70}></img>
            </div>
            <div className="grid-item"></div>
            <div className={`grid-item button ${active.down ? 'active' : ''}`} ref={downButtonRef} onClick={() => handleClick('down')}>
              <img src='btn/down.png' width={70} height={70}></img>
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
