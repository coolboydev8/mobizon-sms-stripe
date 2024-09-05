import React from 'react';
import { CardItem4, CardDoubleItem} from '../CardItem';

const Gameresult = ({ step, direct, dirStatTop, dirStatBottom}) => {
  const dirList = [];
  if(step === 10){
    for (let i = 0; i < direct.length; i += 5) {
      const tmp = direct.slice(i, i + 5);
      dirList.push(tmp);
    }
  }
  return (
    <div>
      {step === 2 &&(
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
          <div className="grid-item button-explanation" style={{display: 'block'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src='btn/left.png' width={24} height={24}></img>
            </div>
            <div style={{height: '3vh'}}></div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src='btn/left.png' width={24} height={24}></img>
            </div>
          </div>
          <div className="grid-item button-explanation">
            <img src='btn/up.png' width={24} height={24}></img>
            <div style={{width: '3vw'}}>
            </div>
            <img src='btn/down.png' width={24} height={24}></img>
          </div>
          <div className="grid-item button-explanation">
            <img src='btn/down.png' width={24} height={24}></img>
            <div style={{width: '3vw'}}>
            </div>
            <img src='btn/down.png' width={24} height={24}></img>
          </div>
          <div className="grid-item button-explanation">
            <img src='btn/up.png' width={24} height={24}></img>
            <div style={{width: '3vw'}}>
            </div>
            <img src='btn/down.png' width={24} height={24}></img>
          </div>
          <div className="grid-item button-explanation">
            <img src='btn/up.png' width={24} height={24}></img>
            <div style={{width: '3vw'}}>
            </div>
            <img src='btn/up.png' width={24} height={24}></img>
          </div>
          <div className="grid-item button-explanation" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px', padding: '3px', border: 0}}>
          </div>        
          <div className="grid-item button-explanation" style={direct[0] === 'down'?{backgroundColor: 'rgb(117, 201, 117)', height: '24px', padding: '3px', border: 0}:{backgroundColor: '#fb544e', height: '24px', padding: '3px', border: 0}}>
            <img src={`btn_res/${direct[0]}_res.png`} width={24} height={24}></img>
          </div>          
          <div className="grid-item button-explanation" style={direct[1] === 'down'?{backgroundColor: 'rgb(117, 201, 117)', height: '24px', padding: '3px', border: 0}:{backgroundColor: '#fb544e', height: '24px', padding: '3px', border: 0}}>
            <img src={`btn_res/${direct[1]}_res.png`} width={24} height={24}></img>  
          </div>        
          <div className="grid-item button-explanation" style={direct[2] === 'down'?{backgroundColor: 'rgb(117, 201, 117)', height: '24px', padding: '3px', border: 0}:{backgroundColor: '#fb544e', height: '24px', padding: '3px', border: 0}}>
            <img src={`btn_res/${direct[2]}_res.png`} width={24} height={24}></img>
          </div>        
          <div className="grid-item button-explanation" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px', padding: '3px', border: 0}}>
          </div>        
          
          <div className="grid-item button-explanation">
            <img src='btn/up.png' width={24} height={24}></img>
            <div style={{width: '3vw'}}>
            </div>
            <img src='btn/down.png' width={24} height={24}></img>
          </div>
          <div className="grid-item button-explanation" style={{display: 'block'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src='btn/right.png' width={24} height={24}></img>
            </div>
            <div style={{height: '3vh'}}></div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src='btn/right.png' width={24} height={24}></img>
            </div>
          </div>
          <div className="grid-item button-explanation" style={{display: 'block'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src='btn/right.png' width={24} height={24}></img>
            </div>
            <div style={{height: '3vh'}}></div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src='btn/left.png' width={24} height={24}></img>
            </div>
          </div>
          <div className="grid-item button-explanation" style={{display: 'block'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src='btn/left.png' width={24} height={24}></img>
            </div>
            <div style={{height: '3vh'}}></div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src='btn/left.png' width={24} height={24}></img>
            </div>
          </div>
          <div className="grid-item button-explanation" style={{display: 'block'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src='btn/right.png' width={24} height={24}></img>
            </div>
            <div style={{height: '3vh'}}></div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src='btn/left.png' width={24} height={24}></img>
            </div>
          </div>
          <div className="grid-item button-explanation" style={direct[3] === 'down'?{backgroundColor: 'rgb(117, 201, 117)', height: '24px', padding: '3px', border: 0}:{backgroundColor: '#fb544e', height: '24px', padding: '3px', border: 0}}>
            <img src={`btn_res/${direct[3]}_res.png`} width={24} height={24}></img>
          </div>          
          <div className="grid-item button-explanation" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px', padding: '3px', border: 0}}>
          </div>          
          <div className="grid-item button-explanation" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px', padding: '3px', border: 0}}>
          </div>          
          <div className="grid-item button-explanation" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px', padding: '3px', border: 0}}>
          </div>          
          <div className="grid-item button-explanation" style={{backgroundColor: 'rgb(117, 201, 117)', height: '24px', padding: '3px', border: 0}}>
          </div>          
          </div>
        )} 
      {step === 6 &&(
        <div className="res2-grid-container">
          <CardDoubleItem 
            dir='row'
            mainfirstSrc="btn/close.png"
            mainsecondSrc="btn/up.png"
            leftSrc="btn_res/up_res.png"
            rightSrc="btn_res/left_res.png"
          />
          <CardDoubleItem 
            dir='col'
            mainfirstSrc="btn/close.png"
            mainsecondSrc="btn/right.png"
            leftSrc="btn_res/right_res.png"
            rightSrc="btn_res/up_res.png"
          />
          <CardDoubleItem 
            dir='row'
            mainfirstSrc="btn/down.png"
            mainsecondSrc="btn/close.png"
            leftSrc="btn_res/down_res.png"
            rightSrc="btn_res/right_res.png"
          />
          <CardDoubleItem 
            dir='col'
            mainfirstSrc="btn/left.png"
            mainsecondSrc="btn/close.png"
            leftSrc="btn_res/left_res.png"
            rightSrc="btn_res/down_res.png"
          />
          <CardDoubleItem 
            dir='row'
            mainfirstSrc="btn/close.png"
            mainsecondSrc="btn/left.png"
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
          <CardDoubleItem 
            dir='row'
            mainfirstSrc="btn/close.png"
            mainsecondSrc="btn/down.png"
            leftSrc="btn_res/down_res.png"
            rightSrc="btn_res/left_res.png"
          />
          <CardDoubleItem 
            dir='col'
            mainfirstSrc="btn/right.png"
            mainsecondSrc="btn/close.png"
            leftSrc="btn_res/right_res.png"
            rightSrc="btn_res/down_res.png"
          />
          <CardDoubleItem 
            dir='row'
            mainfirstSrc="btn/up.png"
            mainsecondSrc="btn/close.png"
            leftSrc="btn_res/up_res.png"
            rightSrc="btn_res/right_res.png"
          />
          <CardDoubleItem 
            dir='col'
            mainfirstSrc="btn/close.png"
            mainsecondSrc="btn/up.png"
            leftSrc="btn_res/up_res.png"
            rightSrc="btn_res/up_res.png"
          />
          <CardDoubleItem 
            dir='col'
            mainfirstSrc="btn/close.png"
            mainsecondSrc="btn/down.png"
            leftSrc="btn_res/down_res.png"
            rightSrc="btn_res/up_res.png"
          />
          {dirStatBottom.map((item, index) => (
            
            item === true ? (
              <div key={index} className="res3-true-button" style={{backgroundColor: '#fb544e'}}>
                <div className="res-leftbtn">
                  <img src={`btn_res/${direct[index * 2 + 10]}_res.png`} width={24} height={24} alt='left'/>  
                </div>
                <div className="res-rightbtn">
                  <img src={`btn_res/${direct[index * 2 + 11]}_res.png`} width={24} height={24} alt='left'/>  
                </div>
              </div>          
            ):(
              <div key={index} className="res3-true-button">
                <div className="res-leftbtn">
                  <img src={`btn_res/${direct[index * 2 + 10]}_res.png`} width={24} height={24} alt='left'/>  
                </div>
                <div className="res-rightbtn">
                  <img src={`btn_res/${direct[index * 2 + 11]}_res.png`} width={24} height={24} alt='left'/>  
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
      {step === 10 &&(
        <div className="res2-grid-container">
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
        {dirList[0].map((item, index) => (
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
        {dirList[1].map((item, index) => (
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
        {dirList[2].map((item, index) => (
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
        {dirList[3].map((item, index) => (
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
    </div>
)}


export default Gameresult;
