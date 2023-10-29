import React, { useState, useEffect } from 'react';
const Mcq = ({ questionsSet }) => {
  const [selectQuestion, setselectQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectOptions, setselectOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [outcome, setoutcome] = useState(false);
  const question = questionsSet[selectQuestion];
  const shuffledOptions = [...question?.incorrect_answers, question?.correct_answer].sort(() => Math.random() - 0.5);
  const isCorrect = selectedOption === question?.correct_answer;
  const stars = question?.difficulty === 'easy' ? 1 : question?.difficulty === 'medium' ? 2 : 3;
  const progress = ((selectQuestion + 1) / questionsSet.length) * 100;
 

  const handleOptionSelect = (option) => {
    if (!outcome) {
      setSelectedOption(option);
      setoutcome(true);
      if (option === question?.correct_answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setoutcome(false);
    setselectQuestion((index) => index + 1);
  };

  useEffect(() => {
    setSelectedOption(null);
    setoutcome(false);
    setselectOptions(shuffledOptions);
  }, [selectQuestion]);

  return (
    <div className="mainbox ">
      <div className="innerbox">
      
     
        {progress && <div className="progress">
          <div className="progress-bar test-progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
        </div>}

        <div className="maindiv p-3">
          <div>
            <h3>Question {selectQuestion + 1} of {questionsSet.length}</h3>
            <p className='gray_text'>{decodeURIComponent(question.category)}</p>
  
            <div className="stars">
              {Array.from({ length: stars }).map((_, index) => (
                <span key={index} className="star-icon">
                  &#9733;
                </span>
              ))}
            </div>
          </div>

          <p className="bold_class">{decodeURIComponent(question.question)}</p>
     
          <div className="container p-0">
            <div className='row w-100'>

         
            <div className="col-md-6">
              {selectOptions.slice(0, 2).map((option, index) => (
                <button
                  key={index}
                  className={`options_class ${selectedOption === option ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {decodeURIComponent(option)}
                </button>
              ))}
            </div>
            <div className="col-md-6">
              {selectOptions.slice(2, 4).map((option, index) => (
                <button
                  key={index}
                  className={`options_class ${selectedOption === option ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {decodeURIComponent(option)}
                </button>
              ))}
            </div>
          </div>
      
         </div>

        
           </div>
           <div className='col-md-12'>
         <div className='text-center'>
          {outcome && <div className='boldcls'>{isCorrect ? 'Correct!' : 'Sorry!'}</div>}
          </div>

          {selectQuestion < 19 && (
            <button className="btn btn-dark next_btn" onClick={handleNextQuestion} disabled={!outcome}>
              Next Question
            </button>
          )}
        </div>

 
        <div className="score-area">
          <div className='score-data p-5'>
            <p>Score: {((score / questionsSet.length) * 100).toFixed(0)}%</p>
            <p className='score ml-3'>Max Score 75%</p>
          </div>
          <div className='text-center'>
          <div className="progress bottombar">
            <div className="progress-bar score-bar" role="progressbar" style={{ width: `${((score / questionsSet.length) * 100).toFixed(2)}%` }} aria-valuenow={((score / questionsSet.length) * 100).toFixed(2)} aria-valuemin="0" aria-valuemax="100" />
          </div>
          </div>
         

        </div>
      </div>
    </div>
  );
};

export default Mcq;
