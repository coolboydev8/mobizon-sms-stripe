
import React from 'react';
import { useTranslation } from 'react-i18next';
import { explanations } from '../config/TestConfig';

const TestExplanation = ({ step, onNext, onPrevious }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="container">
        <div className="leftPane">
          <p>{step === 0?t('game-0'):''}</p>
            {step === 1 &&(
              <div>
                <p style = {{paddingBottom: '20px'}}>{t('game-1')}</p>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div className="button-explanation">
                    <img src='./btn/down.png'width={70} height={70}></img>
                  </div>
                </div>
              </div>
            )}
            {step === 3 &&(
              <div>
                <p style = {{paddingBottom: '20px'}}>{t('game-2')}</p>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div style={{display:'flex'}}>
                    <div className="grid-item button-explanation">
                      <img src='btn/down.png'width={70} height={70}></img>
                    </div>
                    <div style={{width: '5vw'}}></div>
                    <div className="grid-item button-explanation">
                      <img src='btn/right.png'width={70} height={70}></img>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 5 &&(
              <div>
                <p style = {{paddingBottom: '20px'}}>{t('game-3')}</p>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div className="grid-itemz button-explanation">
                    <img src='btn/up.png'width={70} height={70}></img>
                  </div>
                </div>
                <div style={{height: '15vh'}}></div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div className="grid-item button-explanation">
                    <img src='btn/close.png'width={70} height={70}></img>
                  </div>
                </div>
              </div>
            )}
            {step === 7 &&(
              <div>
                <p style = {{paddingBottom: '20px'}}>{t('game-4')}</p>
                <div style={{display: 'flex', alignItems: 'center', marginLeft: '15px'}}>
                  <div className="grid-item button-explanation" >
                    <img src='btn/4_icon.png'width={70} height={70}></img>
                  </div>
                </div>
                <div style={{height: '3vh'}}></div>
                <div style={{display: 'flex', alignItems: 'center', marginLeft: '15px'}}>
                  <div className="grid-item button-explanation">
                    <img src='btn/4_1.png'width={400} height={400}></img>
                  </div>
                </div>
              </div>
            )}
            {step === 9 &&(
              <div>
                <p style = {{paddingBottom: '20px'}}>{t('game-5')}</p>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div className="button-explanation">
                    <img src='./btn/down.png'width={70} height={70}></img>
                  </div>
                </div>
              </div>
            )}

        </div>
        <div className="rightPane">
          <div className="grid-container">
            <div className="grid-item" ></div>
            <div className="grid-item button">
              <img style={{filter: 'blur(10px)'}} src='btn/up.png' width={70} height={70}></img>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item button">
              <img style={{clear: 'both'}} src='btn/left.png 'width={70} height={70}></img>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item button">
              <img style={{clear: 'both'}} src='btn/right.png 'width={70} height={70}></img>
            </div>
            <div className="grid-item"></div>
            <div className="grid-item button">
              <img style={{clear: 'both'}} src='btn/down.png 'width={70} height={70}></img>
            </div>
            <div className="grid-item"></div>
          </div>
        </div>
      </div>
      <button className='btn-bottom-next button' onClick={onNext} disabled={step === explanations.length - 1}>{t('game-next')}</button>
    </div>
  );
};

export default TestExplanation;
