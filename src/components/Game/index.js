import React, { useState } from 'react';
import axios from 'axios';

import TestExplanation from './step/TestExplanation';
import FirstTest from './step/FirstTest';
import SecondTest from './step/SecondTest';
import ThirdTest from './step/ThirdTest';
import ForthTest from './step/ForthTest';

const Game = () => {

    const [step, setStep] = useState(0);

    const handleNext = () => 
    {
        setStep((prevStep) => prevStep + 1);
        
    }
    const handlePrevious = () => 
    {
        setStep((prevStep) => prevStep - 1);
    }
    return (
        <div style={{ backgroundImage: `url(1.jpg)`, backgroundSize: 'cover'}}>
            {step === 0 &&(
            <TestExplanation step={0} onNext={handleNext}/>
            )}
            {step !== 0 && step%2 === 1 &&(
            <TestExplanation step={step} onNext={handleNext}/>
            )}
            {step === 2 && (
            <FirstTest step={step} onNext={handleNext} onPrevious={handlePrevious}/>
            )}
            {step === 4 && (
            <SecondTest step={step} onNext={handleNext} onPrevious={handlePrevious}/>
            )}
            {step === 6 && (
            <ThirdTest step={step} onNext={handleNext} onPrevious={handlePrevious}/>
            )}
            {step === 8 && (
            <ForthTest step={step} onNext={handleNext} onPrevious={handlePrevious}/>
            )}
            {step === 10 && (
            <FirstTest step={step} onNext={handleNext} onPrevious={handlePrevious}/>
            )}
        </div>
    );
};

export default Game;