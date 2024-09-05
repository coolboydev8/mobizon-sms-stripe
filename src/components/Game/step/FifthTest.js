import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import axios from 'axios';

import Gameresult from './Gameresult';

const FifthTest = ({ step, onNext, onPrevious }) => {
  const navigate = useNavigate();
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
  const [directionStauts, setDirectionStatus] = useState(false);
  const [testCount, setTestCount] = useState(0);
  const startTimeRef = useRef(null);
  const [retryTimes, setRetryTimes] = useState(0);
  const [retryTimesImgVisible, setRetryTimesImgVisible] = useState(false);

  const phone = localStorage.getItem('phone');
  const role_option = localStorage.getItem('role_option');
  const date = localStorage.getItem('date');
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
    if (testCount < 21) {
      window.addEventListener('keydown', handleKeyDown);
      interval = setInterval(() => {
        setImageVisible(true);
        startTimeRef.current = Date.now();
        setTimeout(() => {
          setImageVisible(false);
        }, 700); // Image is visible for 500ms
        setTestCount(testCount + 1);  
      }, 2000 * (Math.random() + 1)); // Image is displayed every 1 second
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
      const reactionTime = (Date.now() - startTimeRef.current)<700? 1:0;
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
      setDirectionData([...directionData, direction]);
      setImageVisible(false); // Hide the image when button is clicked
    }
  };

  const handleOk = async() => {
    let report = 'success';
    const payload = {
      phone,
      report,
      payload_step
    }
    const payload_confirm = {
      phone,
      role_option,
      date
    }
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/user/update_game_status`, {
            payload
        });
        const paystatus = await axios.post(`${process.env.REACT_APP_API_URL}/user/update_game_status`, {
          payload
        });
        if(paystatus === '1'){
          await axios.post(`${process.env.REACT_APP_API_URL}/user/confirm_appointment`, {
            payload_confirm
          });
          navigate('/success');
        }else{
          alert(`You didn't pay!`);
          navigate('/oops');
        }
    } catch (err) {
      navigate('/oops');
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
    let report = 'ignore';
    const payload = {
      phone,
      report,
      payload_step
    }
    const payload_confirm = {
      phone,
      role_option,
      date
    }
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/user/update_game_status`, {
            payload
        });    
        await axios.post(`${process.env.REACT_APP_API_URL}/user/confirm_appointment`, {
            payload_confirm
        });
        navigate('/success');
    } catch (err) {
        navigate('/oops');
    }  
  }

  return (
    <div>
      { retryTimesImgVisible === true &&( 
        <div className='wrong-click'>Wrong</div>
      )}

      {testCount === 21 &&(
        <div style={{height:'100vh' }}>
          {directionData.length === 20 && (
            <Gameresult  step={step} direct={directionData} />
          )}
          {reactionTimeStatus === true && (
              <p className='p-game-result'>{t('game-failed-reaction')}</p>
          )}
          {directionStauts === true && (
              <p className='p-game-result'>{t('game-failed-click')}</p>
          )}
          {directionData.length !== 20 && (
              <p className='p-game-result'>{t('game-failed-always')}</p>
          )}
          {(reactionTimeStatus === true || directionStauts === true || directionData.length !== 20) && (
            <div style={{display: 'flex', gap: 10, justifyContent: 'center', alignItems:'center'}}>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleRetry()}>{t('game-retry')}</button>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleIgnore()}>{t('game-ignore')}</button>
            </div>
          )}          
          {reactionTimeStatus === false && directionStauts === false && directionData.length === 20 && (
            <div>
              <p  className='p-game-result'>{t('game-good')}</p>
              <div style={{display: 'flex', gap: 10, justifyContent: 'center', alignItems:'center'}}>          
                <button className='btn-bottom-next button' style={{width: '100px', height: '35px', visibility: 'true', cursor: 'pointer'}} onClick={() => handleOk()}>{t('game-next')}</button>
              </div>
              </div>
          )}
        </div>
      )}
      {testCount !== 21 &&(
        <div className="container">
        <div className="test-leftPane">
            {imageVisible &&<div className="button-explanation">
            <img src='btn/down.png'width={70} height={70} /></div>}
          
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

export default FifthTest;
