import React, { useState } from 'react'
import AddQuestion from './AddQuestion'
import SingleAnswerIndex from './SingleAnswer';
import MultiAnswerIndex from './MultipleAnswer/index'
import TextAnswerIndex from './TextAnswer/index';
const SurveyCreateIndex = () => {

    const [pageName, setPageName] = useState('add question');

    console.log(pageName);
  return (
    <div className='survey-create'>
            <AddQuestion  />
{/*         
            <SingleAnswerIndex/>
           
            <MultiAnswerIndex/>
           
            <TextAnswerIndex/>
            
        
         */}
    </div>
  )
}

export default SurveyCreateIndex