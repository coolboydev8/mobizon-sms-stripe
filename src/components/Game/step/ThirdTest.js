
import React, { useState, useEffect, useRef } from 'react';

import Gameresult from './Gameresult';

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
  let tempDirStat = false;
      
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
        }, 1500); // Image is visible for 500ms
        setTestCount((prevCount) => prevCount + 1);  
      }, 2000); // Image is displayed every 1 second
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [testCount]);

  const handleClick = (direction) => {
    if (imageVisible) {
      if(btnTwoTimes === 0){
        if(direction !== directDataList[2 * (directionCount - 1)]){
          tempDirStat = true;
          setDirectionStatus(true);
        }
        setDirectionData([...directionData, direction]);
        setBtnTwoTimes(1);
      }else if(btnTwoTimes === 1){
        if(direction !== directDataList[2 * (directionCount - 1) + 1]){
          tempDirStat = true;
          setDirectionStatus(true);
        }
        if(directionCount < 6){
          setDirectionStatusTop([...directionStatusTop, tempDirStat]);
        }else{
          setDirectionStatusBottom([...directionStatusBottom, tempDirStat]);
        }
        setDirectionData([...directionData, direction]);
        let reactionTime = (Date.now() - startTimeRef.current)<1300? 1:0;
        if(reactionTime === 0){
          setReactionTimeStatus(true);        
        }
        setBtnTwoTimes(3);  
      }
    }
};

  return (
    <div>
      {testCount === 11 &&(
        <div>
          {directionData.length === 20 && (
            <Gameresult  step={step} direct={directionData} dirStatTop={directionStatusTop} dirStatBottom={directionStatusBottom}/>
          )}
          {reactionTimeStatus === true && (
              <p>Failed! The reaction Time is long!</p>
          )}
           {directionStatus === true && (
              <p>Failed! Wrong Clicked!</p>
          )}
          {directionData.length !== 20 && (
              <p>Failed! Not Clicked Everytimes!</p>
          )}
          {(reactionTimeStatus === true || directionStatus === true || directionData.length !== 20) && (
            <button style={{width: '100px', height: '35px', cursor: 'pointer'}} onClick={onPrevious}>Retry</button>
          )}           
          {reactionTimeStatus === false && directionStatus === false && directionData.length === 20 &&(
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
                <img src='btn/close.png'width={100} height={100} />
                <img src='btn/up.png'width={100} height={100} />
            </div>
            )}
          {imageVisible && testCount === 2 &&(
            <div>
                <img style={{display:'block', marginTop: '-100px'}} src='btn/close.png'width={100} height={100} />
                <img src='btn/right.png'width={100} height={100} />
            </div>
             )}
          {imageVisible && testCount === 3 &&(
                <div>
                    <img src='btn/down.png'width={100} height={100} />
                    <img src='btn/close.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 4 &&(
                <div>
                    <img style={{display:'block'}} src='btn/left.png'width={100} height={100} />
                    <img src='btn/close.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 5 &&(
                <div>
                    <img src='btn/close.png'width={100} height={100} />
                    <img src='btn/left.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 6 &&(
                <div>
                    <img src='btn/close.png'width={100} height={100} />
                    <img src='btn/down.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 7 &&(
                <div>
                    <img style={{display:'block'}} src='btn/right.png'width={100} height={100} />
                    <img src='btn/close.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 8 &&(
                <div>
                    <img src='btn/up.png'width={100} height={100} />
                    <img src='btn/close.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 9 &&(
                <div>
                    <img style={{display:'block', marginTop: '-100px'}} src='btn/close.png'width={100} height={100} />
                    <img src='btn/up.png'width={100} height={100} />
                </div>
            )}
          {imageVisible && testCount === 10 &&(
                <div>
                    <img style={{display:'block', marginTop: '-100px'}} src='btn/close.png'width={100} height={100} />
                    <img src='btn/down.png'width={100} height={100} />
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

export default ThirdTest;
