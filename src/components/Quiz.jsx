import React, { useState, useEffect, useRef } from "react";

function Quiz({questions, restartQuiz}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(150);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeOver, setTimeOver] = useState(false);

  const tickingSoundRef = useRef(new Audio("/sounds/tickingbuzzer.mp3"));
  const correctAnswerSoundRef = useRef(new Audio("/sounds/correctanswer.mp3"));
  const wrongAnswerSoundRef = useRef(new Audio("/sounds/wronganswer.mp3"));
  
  const stopTickingSound = () => {
    const tickingSound = tickingSoundRef.current;
    tickingSound.pause();
    tickingSound.currentTime = 0;
  };

  useEffect(() => {
    const tickingSound = tickingSoundRef.current;
    const wrongAnswerSound = wrongAnswerSoundRef.current;
    tickingSound.loop = true;
    
    if(timerRunning && timer > 0) {
      const countdown = setInterval(() => setTimer(prev => prev - 1), 100);
      tickingSound.play();
      return () => clearInterval(countdown);
    } else if (timer === 0 && !showResult) {
      stopTickingSound();
      setTimeOver(true);
      setShowResult(true);
      wrongAnswerSound.play();
    }
  }, [timer, timerRunning, showResult]);

  useEffect(() => {
    if(questions.length > 0) {
      setTimer(150);
      setTimerRunning(true);
      setShowResult(false);
      setTimeOver(false);
    }
  }, [currentIndex, questions]);
  
  const handleAnswer = (isCorrect) => {
    const correctAnswerSound = correctAnswerSoundRef.current;
    const wrongAnswerSound = wrongAnswerSoundRef.current;
    
    setTimerRunning(false);
    setShowResult(true);
    setSelectedAnswer(isCorrect);
    stopTickingSound();
    setTimeOver(false);
    if(isCorrect) {
      correctAnswerSound.play();
      setScore(prev => prev + 1);
    } else {
      wrongAnswerSound.play();
    }
  };

const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setTimer(150);
    setTimerRunning(true);
    if(currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const currentQuestion = questions[currentIndex];

  const getResultMessage = () => {
    const totalQuestions = questions.length;
    const rightAnswersRate = (score / totalQuestions) * 100;

    if (rightAnswersRate === 100) {
      return "Minden válasz helyes! Te egy zseni vagy!";
    } else if (rightAnswersRate >= 50) {
      return "Ne add fel, megy ez neked!";
    } else {
      return "Még van mit gyakorolnod...";
    }
  };

    return(
        <>
        <div id="questionDiv" className="col-xs-11 col-12 mx-auto my-2 rounded">
            <div id="questionNoDiv" className="col-8 col-sm-6 col-md-4 mx-auto px-3 mb-1 fs-3 border rounded">Kérdések száma:
                <span id="noOfQuestUpper"> {questions.length}</span>/<span id="questionNo">{currentIndex + 1}</span>
                <div id="countdownDiv" className="col-xs-4 col-1 text-light text-center position-absolute end-0 me-1 border rounded">
                  <h4 className="fs-2" style={{color: timer / 10 <= 5.0 ? "red" : "white"}}>
                  {(timer/10).toFixed(1)}
                  </h4>
                </div> 
            </div>
            <div id="categoryDiv" className="col-10 col-sm-8 mx-auto mt-3 pt-1 px-3 bg-warning text-center rounded shadow fs-2" >
                <p id="categoryText">{currentQuestion.category}</p>
            </div>

            <div id="questionTextDiv" className="row col-12 mx-auto my-3 py-0 pt-3 bg-warning text-center rounded shadow fs-4">
                <p id="questionText">{currentQuestion.question}</p>
            </div>

            <div id="answerBtns" className="row col-xs-11 col-sm-11 mx-auto d-flex flex-wrap text-center rounded">
                {currentQuestion.answers.map((answer, index) => {
                  const buttonClass = showResult
                          ? answer.isCorrect
                            ? "btn-success"
                            : timeOver && !answer.isCorrect
                            ? "btn-danger"
                            : selectedAnswer === answer.isCorrect && !answer.isCorrect
                            ? "btn-danger"
                            : "btn-primary"
                          : "btn-primary";

                  return (
                    <button
                      key={index}
                      className={`answBtn btn col-xs-11 col-sm-11 col-md-5 my-1 mx-auto border border-warning fs-2 ${buttonClass}`}
                      onClick={() => handleAnswer(answer.isCorrect)}
                      disabled={showResult}
                    >
                      {answer.text}
                    </button>
                    );
                  })}
            </div>
        </div>

        {showResult && (
          <>
          {timeOver ? (
            <div id="timeIsOverDiv" className="col-4 mx-auto mb-3 text-center bg-danger text-light rounded shadow py-2 fs-3">
                Nem válaszoltál időben!
            </div>
          ) : selectedAnswer ? (
              <div id="rightAnswerDiv" className="col-4 mx-auto mb-3 text-center bg-success text-light rounded shadow py-2 fs-3">
                Helyes válasz!
              </div>
            ) : (
              <div id="wrongAnswerDiv" className="col-4 mx-auto mb-3 text-center bg-danger text-light rounded shadow py-2 fs-3">
                Helytelen válasz!
              </div>
            )}

              <div
               id="pointsDiv"
               className="col-2 mx-auto mb-3 bg-info text-center rounded shadow fs-4">
                  <span id="noOfQuestFooter">{questions.length}</span>/<span id="points">{score}</span> pont
              </div>
              
              {currentIndex + 1 === questions.length && (
                <div id="resultMessageDiv" className="col-4 mx-auto text-center bg-success fs-3 text-ligth my-3">
                  <p>{getResultMessage()}</p>
                </div>
              )}

              <div id="nextBtnDiv" className="col-7 mx-auto text-center fs-4">
                {currentIndex + 1 === questions.length ? (
                  <button
                    id="nextBtn"
                    type="submit"
                    className="btn btn-primary btn-lg fs-4"
                    onClick={restartQuiz}
                  >
                    Új játék!
                  </button>
                ) : (
                  <button
                    id="nextBtn"
                    type="submit"
                    className="btn btn-primary btn-lg fs-4"
                    onClick={nextQuestion}
                  >
                    Kérem a következő kérdést!
                  </button>
                )} 
              </div>
          </>
        )}
      </>
  );
}

export default Quiz;