
import React, { useState, useEffect, useRef } from 'react';

import Gameresult from './Gameresult';

const ForthTest = ({ step, onNext, onPrevious }) => {
  const [imageVisible, setImageVisible] = useState(false);
  const [reactionTimeStatus, setReactionTimeStatus] = useState(false);
  const [directionData, setDirectionData] = useState([]);
  const [directionCount, setDirectionCount] = useState(0);
  const [directionStatus, setDirectionStatus] = useState(false);
  const [testCount, setTestCount] = useState(0);
  const startTimeRef = useRef(null);
  useEffect(() => {
    let interval;
    if (testCount < 3) {
      interval = setInterval(() => {
        setImageVisible(true);
        startTimeRef.current = Date.now();
        setTimeout(() => {
          setImageVisible(false);
        }, 3500); // Image is visible for 500ms
        setTestCount((prevCount) => prevCount + 1);  
      }, 5000); // Image is displayed every 1 second
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [testCount]);

  const handleClick = (direction) => {
    if (imageVisible) {
      const reactionTime = (Date.now() - startTimeRef.current)<3000? 1:0;
      if(reactionTime === 0){
        setReactionTimeStatus(true);        
      }
      if(directionCount === 0 && direction !== 'down'){
        setDirectionStatus(true);
      }
      if(directionCount === 1 && direction !== 'right'){
        setDirectionStatus(true);
      }
      setImageVisible(false);
    }
    setDirectionData([...directionData, direction]);
    setDirectionCount((prevCount) => prevCount + 1);
};

  return (
    <div>
      {testCount === 3 &&(
        <div>
          {directionData.length === 2 && (
            <Gameresult  step={step} direct={directionData} />
          )}
          {reactionTimeStatus === true && (
              <p>Failed! The reaction Time is long!</p>
          )}
          {directionStatus === true && (
              <p>Failed! Wrong Clicked!</p>
          )}
          {directionData.length !== 2 && (
              <p>Failed! Not Clicked Everytimes!</p>
          )}
          {(reactionTimeStatus === true || directionStatus === true || directionData.length !== 2) && (
            <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={onPrevious}>Retry</button>
          )}          
          {reactionTimeStatus === false && directionStatus === false && directionData.length === 2 &&(
            <div>
              <p>Good!</p>
              <button onClick={onNext} style={{width: '100px', height: '35px', cursor: 'pointer'}}>Next</button>
            </div>
          )}
        </div>
      )}
      {testCount !== 3 &&(
        <div className="container">
        <div className="test-leftPane">
          {imageVisible && testCount === 1 &&(
              <div style={{display: 'flex', paddingLeft: '10px', paddingRight: '10px'}}>
              <div className="grid-item button" style={{marginBottom: '10px', border: 0, height: '1%'}}>
                <img src='btn/4_icon.png'width={100} height={100}></img>
              </div>
              <div className="grid-item button" style={{border: 0, border: '1px solid black'}}>
                <img src='btn/4_1.png'width={300} height={300}></img>
              </div>
            </div>
          )}
          {imageVisible && testCount === 2 &&(
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
              <img src='btn/up.png' width={100} height={100} onClick={() => handleClick('up')}></img>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item button">
              <img src='btn/left.png' width={100} height={100} onClick={() => handleClick('left')}></img>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item button">
              <img src='btn/right.png' width={100} height={100} onClick={() => handleClick('right')}></img>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item button">
              <img src='btn/down.png' width={100} height={100} onClick={() => handleClick('down')}></img>
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
