import React, { useEffect } from 'react';
import {CardItem, CardItem4} from '../CardItem';

const Gameresult = ({ step, direct, dirStatTop, dirStatBottom}) => {
  return (
    <div>
      {(step === 2 || step == 10) &&(
        <div className="res-grid-container">
        <div className="grid-item button-explanation">
          <img src='btn/down.png' width={24} height={24}></img>
        </div>
        <div className="grid-item button-explanation">
          <img src='btn/down.png' width={24} height={24}></img>
        </div>
        <div className="grid-item button-explanation">
          <img src='btn/down.png' width={24} height={24}></img>
        </div>
        <div className="grid-item button-explanation">
          <img src='btn/down.png' width={24} height={24}></img>
        </div>
        <div className="grid-item button-explanation">
          <img src='btn/down.png' width={24} height={24}></img>
        </div>
        {direct.map((item, index) => (
          item === 'down'? (
            <div key={index} className="grid-item button-explanation" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px', padding: '3px', border: 0}}>
              <img src={`btn_res/${item}_res.png`} width={24} height={24}></img>
            </div>          
          ):(
            <div key={index} className="grid-item button-explanation" style={{backgroundColor: '#fb544e', height: '24px', padding: '3px', border: 0}}>
            <img src={`btn_res/${item}_res.png`} width={24} height={24}></img>
          </div>          
          )
        ))}

        </div>
      )}

      {step === 4 &&(
        <div className="res2-grid-container">
          <div className="grid-item button">
          </div>
          <div className="grid-item button">
            <img src='btn/down.png' width={24} height={24}></img>
          </div>
          <div className="grid-item button">
            <img src='btn/down.png' width={24} height={24}></img>
          </div>
          <div className="grid-item button">
            <img src='btn/down.png' width={24} height={24}></img>
          </div>
          <div className="grid-item button">
          </div>
          <div className="grid-item button" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px'}}>
          </div>        
          <div className="grid-item button" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px'}}>
            {direct[0] === 'down' &&(
                <img src='btn_res/down_res.png' width={24} height={24}></img>
              )}
          </div>          
          <div className="grid-item button" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px'}}>
            {direct[1] === 'down' &&(
                <img src='btn_res/down_res.png' width={24} height={24}></img>
              )}  
          </div>        
          <div className="grid-item button" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px'}}>
            {direct[2] === 'down' &&(
                <img src='btn_res/down_res.png' width={24} height={24}></img>
              )}
          </div>        
          <div className="grid-item button" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px'}}>
          </div>        
          
          <div className="grid-item button">
            <img src='btn/down.png' width={24} height={24}></img>
          </div>
          <div className="grid-item button">
          </div>
          <div className="grid-item button">
          </div>
          <div className="grid-item button">
          </div>
          <div className="grid-item button">
          </div>
          <div className="grid-item button" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px'}}>
            {direct[3] === 'down' &&(
              <img src='btn_res/down_res.png' width={24} height={24}></img>
            )}
          </div>          
          <div className="grid-item button" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px'}}>
          </div>          
          <div className="grid-item button" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px'}}>
          </div>          
          <div className="grid-item button" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px'}}>
          </div>          
          <div className="grid-item button" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px'}}>
          </div>          
          </div>
        )} 
      {step === 6 &&(
        <div className="res2-grid-container">
          <CardItem 
            mainSrc="btn/down.png"
            leftSrc="btn_res/up_res.png"
            rightSrc="btn_res/left_res.png"
          />
          <CardItem 
            mainSrc="btn/down.png"
            leftSrc="btn_res/right_res.png"
            rightSrc="btn_res/up_res.png"
          />
          <CardItem 
            mainSrc="btn/down.png"
            leftSrc="btn_res/down_res.png"
            rightSrc="btn_res/right_res.png"
          />
          <CardItem 
            mainSrc="btn/down.png"
            leftSrc="btn_res/left_res.png"
            rightSrc="btn_res/down_res.png"
          />
          <CardItem 
            mainSrc="btn/down.png"
            leftSrc="btn_res/left_res.png"
            rightSrc="btn_res/left_res.png"
          />
          {dirStatTop.map((item, index) => (
            item === true ? (
              <div key={index} className="res3-true-button" style={{backgroundColor: '#fb544e'}}>
                <div className="res-leftbtn">
                  <img src={`btn_res/${direct[index * 2]}_res.png`} style = {{widht: '24px', height: '24px'}} alt='left'/>  
                </div>
                <div className="res-rightbtn">
                  <img src={`btn_res/${direct[index * 2 + 1]}_res.png`} style = {{widht: '24px', height: '24px'}} alt='left'/>  
                </div>
              </div>          
            ):(
              <div key={index} className="res3-true-button">
                <div className="res-leftbtn">
                  <img src={`btn_res/${direct[index * 2]}_res.png`} style = {{widht: '24px', height: '24px'}} alt='left'/>  
                </div>
                <div className="res-rightbtn">
                  <img src={`btn_res/${direct[index * 2 + 1]}_res.png`} style = {{widht: '24px', height: '24px'}} alt='left'/>  
                </div>
              </div>          
            )
          ))}
          <CardItem 
            mainSrc="btn/down.png"
            leftSrc="btn_res/down_res.png"
            rightSrc="btn_res/left_res.png"
          />
          <CardItem 
            mainSrc="btn/down.png"
            leftSrc="btn_res/right_res.png"
            rightSrc="btn_res/down_res.png"
          />
          <CardItem 
            mainSrc="btn/down.png"
            leftSrc="btn_res/up_res.png"
            rightSrc="btn_res/right_res.png"
          />
          <CardItem 
            mainSrc="btn/down.png"
            leftSrc="btn_res/up_res.png"
            rightSrc="btn_res/up_res.png"
          />
          <CardItem 
            mainSrc="btn/down.png"
            leftSrc="btn_res/down_res.png"
            rightSrc="btn_res/up_res.png"
          />
          {dirStatBottom.map((item, index) => (
            item === true ? (
              <div key={index} className="res3-true-button" style={{backgroundColor: '#fb544e'}}>
                <div className="res-leftbtn">
                  <img src={`btn_res/${direct[index * 2]}_res.png`} width={24} height={24} alt='left'/>  
                </div>
                <div className="res-rightbtn">
                  <img src={`btn_res/${direct[index * 2 + 1]}_res.png`} width={24} height={24} alt='left'/>  
                </div>
              </div>          
            ):(
              <div key={index} className="res3-true-button">
                <div className="res-leftbtn">
                  <img src={`btn_res/${direct[index * 2]}_res.png`} width={24} height={24} alt='left'/>  
                </div>
                <div className="res-rightbtn">
                  <img src={`btn_res/${direct[index * 2 + 1]}_res.png`} width={24} height={24} alt='left'/>  
                </div>
              </div>          
            )
          ))} 


        </div>
      )}
      {step === 8 &&(
        <div className="res4-grid-container" >
          <CardItem4
            mainSrc="btn/4_1.png"
            leftSrc="btn_res/down_res.png"
          />
          <CardItem4 
            mainSrc="btn/4_2.png"
            leftSrc="btn_res/right_res.png"
          />
          <div className="grid-item" ></div>
          <div className="grid-item" ></div>
          <div className="res-true-button" style={direct[0] !== 'down'?{ backgroundColor: '#fb544e'}: { backgroundColor: 'rgb(117, 201, 117)'}}>
              <img src={`btn_res/${direct[0]}_res.png`} width={24} height={24} alt='left'/>  
          </div>          
          <div className="res-true-button" style={direct[1] !== 'right'?{ backgroundColor: '#fb544e'}: { backgroundColor: 'rgb(117, 201, 117)'}}>
              <img src={`btn_res/${direct[1]}_res.png`} width={24} height={24} alt='left'/>  
          </div>          
          <div className="grid-item" ></div>
          <div className="grid-item" ></div>
        </div>
      )} 

      </div>
)}


export default Gameresult;
