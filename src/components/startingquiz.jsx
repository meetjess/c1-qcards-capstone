export default function StartingQuiz({ handleStart, quizSetList }) {
  return (
    <>
			<div className="quiz-card">
			<h2>Total Q Cards: {quizSetList.length}</h2>
      <button onClick={handleStart}>START QUIZ</button>
			</div>
    </>
  );
}
