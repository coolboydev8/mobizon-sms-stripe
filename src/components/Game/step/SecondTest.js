
import React, { useState, useEffect, useRef } from 'react';

import Gameresult from './Gameresult';

const SecondTest = ({ step, onNext, onPrevious }) => {
  const [imageVisible, setImageVisible] = useState(false);
  const [reactionTimeStatus, setReactionTimeStatus] = useState(false);
  const [directionData, setDirectionData] = useState([]);
  const [directionCount, setDirectionCount] = useState(0);
  const [directionStatus, setDirectionStatus] = useState(false);
  const [testCount, setTestCount] = useState(0);
  const startTimeRef = useRef(null);
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

  return (
    <div>
      {testCount === 11 &&(
        <div>
          {directionData.length === 4 && (
            <Gameresult  step={step} direct={directionData} />
          )}
          {reactionTimeStatus === true && (
              <p>Failed! The reaction Time is long!</p>
          )}
          {directionStatus === true && (
              <p>Failed! Wrong Clicked!</p>
          )}
          {directionData.length !== 4 && (
              <p>Failed! Not Clicked Everytimes!</p>
          )}

          {(reactionTimeStatus === true || directionStatus === true || directionData.length !== 4) && (
            <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={onPrevious}>Retry</button>
          )}          
          {reactionTimeStatus === false && directionStatus === false && directionData.length === 4 && (
            <div>
              <p>Good!</p>
              <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={onNext}>Next</button>
            </div>
          )}
        </div>
      )}
      {testCount !== 11 &&(
        <div className="container">
        <div className="test-leftPane">
          {imageVisible && testCount === 1 &&(
                <div>
                    <img style={{display:'block', marginTop: '-100px'}} src='btn/left.png' width={100} height={100} />
                    <img src='btn/left.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 2 &&(
                <div>
                    <img src='btn/up.png'width={100} height={100} />
                    <img src='btn/down.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 3 &&(
                <div>
                    <img src='btn/down.png'width={100} height={100} />
                    <img src='btn/down.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 4 &&(
                <div>
                    <img src='btn/up.png'width={100} height={100} />
                    <img src='btn/down.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 5 &&(
                <div>
                    <img src='btn/up.png'width={100} height={100} />
                    <img src='btn/up.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 6 &&(
                <div>
                    <img src='btn/up.png'width={100} height={100} />
                    <img src='btn/down.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 7 &&(
                <div>
                    <img style={{display:'block'}} src='btn/right.png'width={100} height={100} />
                    <img src='btn/right.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 8 &&(
                <div>
                    <img style={{display:'block', marginTop: '-100px'}} src='btn/right.png'width={100} height={100} />
                    <img src='btn/left.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 9 &&(
                <div>
                    <img style={{display:'block', marginTop: '-100px'}} src='btn/left.png'width={100} height={100} />
                    <img src='btn/left.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 10 &&(
                <div>
                    <img style={{display:'block'}} src='btn/right.png'width={100} height={100} />
                    <img src='btn/left.png'width={100} height={100} />
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

export default SecondTest;
