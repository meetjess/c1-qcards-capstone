import QuizCard from "../components/quizcard.jsx";
import StartingQuiz from "../components/startingquiz.jsx";
import { useState, useEffect } from 'react';
import supabase from "/src/config/supabaseClient.jsx";
import CanceledQuiz from "../components/canceledquiz.jsx";
import CompletedQuiz from "../components/completedquiz.jsx"
import NoCards from "../components/nocards.jsx";
import IncorrectAnswer from "../components/incorrectanswer.jsx";
import CorrectAnswer from "../components/correctanswer.jsx";
import MissedQuestions from "../components/missedquestions.jsx";


export default function QuizPage() {
  const [quizSetList, setQuizSetList] = useState([]);
  const [started, setStarted] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isCorrect, setIsCorrect] = useState(false);
	const [isIncorrect, setIsIncorrect] = useState(false);
	const [missedQuestions, setMissedQuestions] = useState([]);

  const fetchQuiz = async () => {
    try {
      const { data: studycards, error } = await supabase.from('studycards').select('*');
      if (error) {
        console.log("Error fetching cards for quiz:", error.message);
      } else {
        setQuizSetList(studycards);
        console.log("Quiz cards fetched! Quiz Time!");
        console.log(studycards);
        setCurrentCardIndex(0);
				setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching cards for quiz:", error.message);
    }
  };

	useEffect(() => {
		fetchQuiz();
	}, [])

  const handleStart = () => {
    fetchQuiz();
    if (quizSetList.length > 0) {
      setStarted(true);
    } else {
      console.log("quiz set list not rendered ");
    }
  };

  const handleSelectedAnswer = (event) => {
    const selectedValue = event.target.value;
    setSelectedAnswer(selectedValue);
    console.log("Answer Selected:", selectedValue);
  };

  // useEffect to log missedQuestions whenever it changes
  useEffect(() => {
    console.log('Missed Questions:', missedQuestions);
  }, [missedQuestions]);

  // Function to handle missed questions
  const handleMissed = (missedQuestion) => {
    setMissedQuestions(prevMissedQuestions => [...prevMissedQuestions, missedQuestion]);
  };

// setTimeout version
	  const handleSubmitAnswer = (event) => {
    event.preventDefault();
    if (!selectedAnswer) return;

    if (quizSetList[currentCardIndex].answer_key === selectedAnswer) {
      setScore(score + 1);
			setIsCorrect(true);
			setIsIncorrect(false);
    } else {
			setIsIncorrect(true);
			setIsCorrect(false);
			console.log("You missed a question", quizSetList[currentCardIndex])
			handleMissed(quizSetList[currentCardIndex])
		}
    // setTimeout(handleMissed, 500);
		setTimeout(handleNext, 2200);
		console.log("attemping to move to next...")

  };


	function handleNext() {
		if (currentCardIndex < quizSetList.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setSelectedAnswer("");
    } else {
      console.log("Quiz successfully completed with score of", score);
      setCompleted(true);
      setStarted(false);
    }

		setIsCorrect(false);
		setIsIncorrect(false);
	}


  const cancelQuiz = () => {
		const confirmCancel = window.confirm("Are you sure you want to quit now?");

		if (confirmCancel) {
		setStarted(false);
    setCanceled(true);
		}
    
  };

  const restart = () => {
    setStarted(false);
    setCanceled(false);
    setCompleted(false);
    setCurrentCardIndex(0);
    setScore(0);
    setSelectedAnswer("");
		setMissedQuestions([]);
  };

  return (
    <>
		
		<div className="quiz-container">
			{isCorrect && <CorrectAnswer />}
			{isIncorrect && <IncorrectAnswer />}
			{isLoading && <p>Loading...</p>}
			{!isLoading && quizSetList.length === 0 && <NoCards />}
      {!started && !canceled && !completed && quizSetList.length > 0  && <StartingQuiz handleStart={handleStart} quizSetList={quizSetList}/>}
      
      {started && !canceled && !completed && !isCorrect && !isIncorrect && (
        <QuizCard
          question={quizSetList[currentCardIndex]}
          handleSelectedAnswer={handleSelectedAnswer}
          handleSubmitAnswer={handleSubmitAnswer}
          cancelQuiz={cancelQuiz}
          selectedAnswer={selectedAnswer}
        />
  
      )}

      {canceled && <CanceledQuiz restart={restart} />}

      {completed && !canceled && !started && !isCorrect && !isIncorrect && <CompletedQuiz score={score} restart={restart} quizSetList={quizSetList} />}
			</div>
			{completed && <MissedQuestions missedQuestions={missedQuestions}/>}
    </>
  );
}
