
import React from 'react';
import { explanations } from '../config/TestConfig';

const TestExplanation = ({ step, onNext, onPrevious }) => {
  return (
    <div style={{width: '100vw', height: '100vh', backgroundColor:'rgb(100 192 255 / 40%)'}}>
      <div className="container">
        <div className="leftPane">
          <p>{step === 0? explanations[0].description:''}</p>
            {step === 1 &&(
              <div style={{display: 'blcok'}}>
                <p>{explanations[1].description}</p>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div className="button-explanation" style={{width: '15%'}}>
                    <img src='./btn/down.png'width={70} height={70}></img>
                  </div>
                </div>
              </div>
            )}
            {step === 3 &&(
              <div style={{display:'flex', gap: 10}}>
                <div className="grid-item button">
                  <img src='btn/down.png'width={70} height={70}></img>
                </div>
                <div className="grid-item button">
                  <img src='btn/right.png'width={70} height={70}></img>
                </div>
              </div>
            )}
            {step === 5 &&(
              <div>
                <div className="grid-item button" style={{marginBottom: '10px'}}>
                  <img src='btn/down.png'width={70} height={70}></img>
                </div>
                <div className="grid-item button">
                  <img src='btn/close.png'width={70} height={70}></img>
                </div>
              </div>
            )}
            {step === 7 &&(
              <div style={{display: 'flex', paddingLeft: '10px', paddingRight: '10px'}}>
                <div className="grid-item button" style={{marginBottom: '10px', border: 0, height: '1%'}}>
                  <img src='btn/4_icon.png'width={70} height={70}></img>
                </div>
                <div className="grid-item button" style={{border: 0}}>
                  <img src='btn/4_1.png'width={300} height={300}></img>
                </div>
              </div>
            )}
            {step === 9 &&(
              <div className="grid-item button">
                <img src='btn/down.png'width={70} height={70}></img>
              </div>
            )}
        </div>
        <div className="rightPane">
          <div className="grid-container">
            <div className="grid-item" ></div>
            <div className="grid-item button">
              <img src='btn/up.png'width={70} height={70}></img>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item button">
              <img src='btn/left.png'width={70} height={70}></img>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item button">
              <img src='btn/right.png'width={70} height={70}></img>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item button">
              <img src='btn/down.png'width={70} height={70}></img>
            </div>
            <div className="grid-item"></div>
          </div>
        </div>
      </div>
      <button style={{position: "fixed", right: 20, bottom: 10, width: '100px', height: '35px', cursor: 'pointer'}} onClick={onNext} disabled={step === explanations.length - 1}>Next</button>
    </div>
  );
};

export default TestExplanation;
