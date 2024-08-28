import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Gameresult from './Gameresult';

var first_tempDirStat, second_tempDirStat;
const ThirdTest = ({ step, onNext, onPrevious }) => {
  const [imageVisible, setImageVisible] = useState(false);
  const [reactionTimeStatus, setReactionTimeStatus] = useState(false);
  const [directionData, setDirectionData] = useState([]);
  const [directionCount, setDirectionCount] = useState(0);
  const [directionStatusTop, setDirectionStatusTop] = useState([]);
  const [directionStatusBottom, setDirectionStatusBottom] = useState([]);
  const [directionStatus, setDirectionStatus] = useState(false);
  const [testCount, setTestCount] = useState(0);
  const [btnTwoTimes, setBtnTwoTimes] = useState(0);
  const startTimeRef = useRef(null);
  const directDataList = [
    'up',
    'left',
    'right',
    'up',
    'down',
    'right',
    'left',
    'down',
    'left',
    'left',
    'down',
    'left',
    'right',
    'down',
    'up',
    'right',
    'up',
    'up',
    'down',
    'up'
  ];
  const phone = localStorage.getItem('phone');
  const payload_step = step / 2;
  useEffect(() => {
    let interval;
    if (testCount < 11) {
      interval = setInterval(() => {
        setImageVisible(true);
        startTimeRef.current = Date.now();
        setDirectionCount((prevCount) => prevCount + 1);
        setBtnTwoTimes(0);
        setTimeout(() => {
          setImageVisible(false);
        }, 2500); // Image is visible for 500ms
        setTestCount((prevCount) => prevCount + 1);  
      }, 3000); // Image is displayed every 1 second
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [testCount]);

  const handleClick = (direction) => {
    if (imageVisible) {
      if(btnTwoTimes === 0){
        if(direction !== directDataList[2 * (directionCount - 1)]){
          first_tempDirStat = true;
          setDirectionStatus(true);
        }else{
          first_tempDirStat = false;
        }
        setDirectionData([...directionData, direction]);
        setBtnTwoTimes(1);
      }else if(btnTwoTimes === 1){
        if(direction !== directDataList[2 * (directionCount - 1) + 1]){
          second_tempDirStat = true;
          setDirectionStatus(true);
        }else{
          second_tempDirStat = false;
        }
        if(directionCount < 6){
          setDirectionStatusTop([...directionStatusTop, (first_tempDirStat || second_tempDirStat)]);
        }else{
          setDirectionStatusBottom([...directionStatusBottom, (first_tempDirStat || second_tempDirStat)]);
        }
        setDirectionData([...directionData, direction]);
        let reactionTime = (Date.now() - startTimeRef.current)<2300? 1:0;
        if(reactionTime === 0){
          setReactionTimeStatus(true);        
        }
        setBtnTwoTimes(3);  
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
      {testCount === 11 &&(
        <div>
          {directionData.length === 20 && (
            <Gameresult  step={step} direct={directionData} dirStatTop={directionStatusTop} dirStatBottom={directionStatusBottom}/>
          )}
          {reactionTimeStatus === true && (
            <p className='p-game-result'>Failed! The reaction Time is long!</p>
          )}
           {directionStatus === true && (
            <p className='p-game-result'>Failed! Wrong Clicked!</p>
          )}
          {directionData.length !== 20 && (
            <p className='p-game-result'>Failed! Didn't always click!</p>
          )}
          {(reactionTimeStatus === true || directionStatus === true || directionData.length !== 20) && (
            <div style={{display: 'flex', gap: 10, justifyContent: 'center', alignItems:'center'}}>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleRetry()}>Retry</button>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={() => handleIgnore()}>Ignore</button>
            </div>
          )}           
          {reactionTimeStatus === false && directionStatus === false && directionData.length === 20 &&(
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
              <div style={{display: 'flex'}}>
                <div className="button-explanation"> 
                  <img src='btn/close.png'width={70} height={70} />
                </div>
                <div style={{width: '5vw'}}></div>                
                <div className="button-explanation"> 
                  <img src='btn/up.png'width={70} height={70} />
                </div>
              </div>
            )}
          {imageVisible && testCount === 2 &&(
              <div>
                <div className="button-explanation"  style={{display:'block'}}> 
                  <img src='btn/close.png' width={70} height={70} />
                </div>
                <div style={{display:'block', height: '15vh'}}></div>
                <div className="button-explanation"> 
                  <img src='btn/right.png'width={70} height={70} />
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
                  <img src='btn/close.png'width={70} height={70} />
                </div>
              </div>
            )}
          {imageVisible && testCount === 4 &&(
              <div>
                <div className="button-explanation"  style={{display:'block'}}> 
                  <img src='btn/left.png' width={70} height={70} />
                </div>
                <div style={{display:'block', height: '15vh'}}></div>
                <div className="button-explanation"> 
                  <img src='btn/close.png'width={70} height={70} />
                </div>
              </div>
            )}
          {imageVisible && testCount === 5 &&(
              <div style={{display: 'flex'}}>
                <div className="button-explanation"> 
                  <img src='btn/close.png'width={70} height={70} />
                </div>
                <div style={{width: '5vw'}}></div>                
                <div className="button-explanation"> 
                  <img src='btn/left.png'width={70} height={70} />
                </div>
              </div>
            )}
          {imageVisible && testCount === 6 &&(
              <div style={{display: 'flex'}}>
                <div className="button-explanation"> 
                  <img src='btn/close.png'width={70} height={70} />
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
                  <img src='btn/close.png'width={70} height={70} />
                </div>
              </div>          
            )}
          {imageVisible && testCount === 8 &&(
              <div style={{display: 'flex'}}>
                <div className="button-explanation"> 
                  <img src='btn/up.png'width={70} height={70} />
                </div>
                <div style={{width: '5vw'}}></div>                
                <div className="button-explanation"> 
                  <img src='btn/close.png'width={70} height={70} />
                </div>
              </div>          
            )}
          {imageVisible && testCount === 9 &&(
              <div>
                <div className="button-explanation"  style={{display:'block'}}> 
                  <img src='btn/close.png' width={70} height={70} />
                </div>
                <div style={{display:'block', height: '15vh'}}></div>
                <div className="button-explanation"> 
                  <img src='btn/up.png'width={70} height={70} />
                </div>
              </div>          
            )}
          {imageVisible && testCount === 10 &&(
              <div>
                <div className="button-explanation"  style={{display:'block'}}> 
                  <img src='btn/close.png' width={70} height={70} />
                </div>
                <div style={{display:'block', height: '15vh'}}></div>
                <div className="button-explanation"> 
                  <img src='btn/down.png'width={70} height={70} />
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

export default ThirdTest;
