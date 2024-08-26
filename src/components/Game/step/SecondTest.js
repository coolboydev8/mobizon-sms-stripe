import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Gameresult from './Gameresult';

const SecondTest = ({ step, onNext, onPrevious }) => {
  const [imageVisible, setImageVisible] = useState(false);
  const [reactionTimeStatus, setReactionTimeStatus] = useState(false);
  const [directionData, setDirectionData] = useState([]);
  const [directionCount, setDirectionCount] = useState(0);
  const [directionStatus, setDirectionStatus] = useState(false);
  const [testCount, setTestCount] = useState(0);
  const startTimeRef = useRef(null);
  const phone = localStorage.getItem('phone');
  const payload_step = step / 2;

  useEffect(() => {
    let interval;
    if (testCount < 11) {
      interval = setInterval(() => {
        setImageVisible(true);
        startTimeRef.current = Date.now();
        setTimeout(() => {
          setImageVisible(false);
        }, 500); // Image is visible for 500ms
        setTestCount((prevCount) => prevCount + 1);  
      }, 1000); // Image is displayed every 1 second
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [testCount]);

  const handleClick = (direction) => {
    if (imageVisible) {
      const reactionTime = (Date.now() - startTimeRef.current)<450? 1:0;
      if(reactionTime === 0){
        setReactionTimeStatus(true);        
      }
      if(directionCount === 1 && direction !== 'down'){
        setDirectionStatus(true);
      }
      if(directionCount === 2 && direction !== 'down'){
        setDirectionStatus(true);
      }
      if(directionCount === 3 && direction !== 'down'){
        setDirectionStatus(true);
      }
      if(directionCount === 5 && direction !== 'down'){
        setDirectionStatus(true);
      }
      if(directionCount === 1 || directionCount === 2 || directionCount === 3|| directionCount === 5 ){
        setDirectionData([...directionData, direction]);
      }
      setImageVisible(false); // Hide the image when button is clicked
    }
    setDirectionCount((prevCount) => prevCount + 1);
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
      {testCount === 11 &&(
        <div>
          {directionData.length === 4 && (
            <Gameresult  step={step} direct={directionData} />
          )}
          {reactionTimeStatus === true && (
              <p className='p-game-result'>Failed! The reaction Time is long!</p>
          )}
          {directionStatus === true && (
              <p className='p-game-result'>Failed! Wrong Clicked!</p>
          )}
          {directionData.length !== 4 && (
              <p className='p-game-result'>Failed! Didn't always click!</p>
          )}

          {(reactionTimeStatus === true || directionStatus === true || directionData.length !== 4) && (
            <div style={{display: 'flex', gap: 10, justifyContent: 'center', alignItems:'center'}}>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleRetry()}>Retry</button>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleIgnore()}>Ignore</button>
            </div>
          )}          
          {reactionTimeStatus === false && directionStatus === false && directionData.length === 4 && (
            <div>
              <p  className='p-game-result'>Good!</p>
              <div style={{display: 'flex', gap: 10, justifyContent: 'center', alignItems:'center'}}>          
                <button className='btn-bottom-next button' style={{width: '100px', height: '35px', visibility: 'true', cursor: 'pointer'}} onClick={() => handleOk()}>Next</button>
              </div>
            </div>
          )}
        </div>
      )}
      {testCount !== 11 &&(
        <div className="container">
        <div className="test-leftPane">
          {imageVisible && testCount === 1 &&(
                <div>
                  <div className="button-explanation"  style={{display:'block'}}> 
                    <img src='btn/left.png' width={70} height={70} />
                  </div>
                  <div style={{display:'block', height: '15vh'}}></div>
                  <div className="button-explanation"> 
                    <img src='btn/left.png'width={70} height={70} />
                  </div>
                </div>
            )}
          {imageVisible && testCount === 2 &&(
                <div style={{display: 'flex'}}>
                  <div className="button-explanation"> 
                    <img src='btn/up.png'width={70} height={70} />
                  </div>
                  <div style={{width: '5vw'}}></div>                
                  <div className="button-explanation"> 
                    <img src='btn/down.png'width={70} height={70} />
                  </div>
                </div>
            )}
          {imageVisible && testCount === 3 &&(
              <div style={{display: 'flex'}}>
                <div className="button-explanation"> 
                  <img src='btn/down.png'width={70} height={70} />
                </div>
                <div style={{width: '5vw'}}></div>                
                <div className="button-explanation"> 
                  <img src='btn/down.png'width={70} height={70} />
                </div>
              </div>
            )}
          {imageVisible && testCount === 4 &&(
              <div style={{display: 'flex'}}>
                <div className="button-explanation"> 
                  <img src='btn/up.png'width={70} height={70} />
                </div>
                <div style={{width: '5vw'}}></div>                
                <div className="button-explanation"> 
                  <img src='btn/down.png'width={70} height={70} />
                </div>
              </div>
            )}
          {imageVisible && testCount === 5 &&(
              <div style={{display: 'flex'}}>
                <div className="button-explanation"> 
                  <img src='btn/up.png'width={70} height={70} />
                </div>
                <div style={{width: '5vw'}}></div>                
                <div className="button-explanation"> 
                  <img src='btn/up.png'width={70} height={70} />
                </div>
              </div>
            )}
          {imageVisible && testCount === 6 &&(
              <div style={{display: 'flex'}}>
                <div className="button-explanation"> 
                  <img src='btn/up.png'width={70} height={70} />
                </div>
                <div style={{width: '5vw'}}></div>                
                <div className="button-explanation"> 
                  <img src='btn/down.png'width={70} height={70} />
                </div>
              </div>
            )}
          {imageVisible && testCount === 7 &&(
              <div>
                <div className="button-explanation"  style={{display:'block'}}> 
                  <img src='btn/right.png' width={70} height={70} />
                </div>
                <div style={{display:'block', height: '15vh'}}></div>
                <div className="button-explanation"> 
                  <img src='btn/right.png'width={70} height={70} />
                </div>
              </div>
            )}
          {imageVisible && testCount === 8 &&(
              <div>
                <div className="button-explanation"  style={{display:'block'}}> 
                  <img src='btn/right.png' width={70} height={70} />
                </div>
                <div style={{display:'block', height: '15vh'}}></div>
                <div className="button-explanation"> 
                  <img src='btn/left.png'width={70} height={70} />
                </div>
              </div>
            )}
          {imageVisible && testCount === 9 &&(
              <div>
                <div className="button-explanation"  style={{display:'block'}}> 
                  <img src='btn/left.png' width={70} height={70} />
                </div>
                <div style={{display:'block', height: '15vh'}}></div>
                <div className="button-explanation"> 
                  <img src='btn/left.png'width={70} height={70} />
                </div>
              </div>
            )}
          {imageVisible && testCount === 10 &&(
              <div>
                <div className="button-explanation"  style={{display:'block'}}> 
                  <img src='btn/right.png' width={70} height={70} />
                </div>
                <div style={{display:'block', height: '15vh'}}></div>
                <div className="button-explanation"> 
                  <img src='btn/left.png'width={70} height={70} />
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

export default SecondTest;
