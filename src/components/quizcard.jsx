

export default function QuizCard({ selectedAnswer, cancelQuiz, handleSelectedAnswer, handleSubmitAnswer, question }) {
  return (
    <>
      <form 
			className="quiz-card" 
			onSubmit={handleSubmitAnswer}>
        <div className="quiz-row">
          <p><span className="pinkbold">Question: </span>{question.question}</p>
        </div>

        <div className="quiz-row">
          <input 
            type="radio"
            id="answer_A"
            name="quiz"
            value="Answer A"
            checked={selectedAnswer === "Answer A"}
            onChange={handleSelectedAnswer}
          />
          <p><span className="pinkbold">A: </span>{question.answer_A}</p>
        </div>

        <div className="quiz-row">
          <input 
            type="radio"
            id="answer_B"
            name="quiz"
            value="Answer B"
            checked={selectedAnswer === "Answer B"}
            onChange={handleSelectedAnswer}
          />
          <p><span className="pinkbold">B: </span>{question.answer_B}</p>
        </div>

        <div className="quiz-row">
          <input 
            type="radio"
            id="answer_C"
            name="quiz"
            value="Answer C"
            checked={selectedAnswer === "Answer C"}
            onChange={handleSelectedAnswer}
          />
          <p><span className="pinkbold">C: </span>{question.answer_C}</p>
        </div>

        <div className="quiz-row">
          <input 
            type="radio"
            id="answer_D"
            name="quiz"
            value="Answer D"
            checked={selectedAnswer === "Answer D"}
            onChange={handleSelectedAnswer}
          />
          <p><span className="pinkbold">D: </span>{question.answer_D}</p>
        </div>

        <button type="submit">Submit Answer</button>
      </form>
			<div className="cancel-btn-container">
      <button id="cancel-btn" onClick={cancelQuiz}>Stop Quiz</button>
			</div>
    </>
  );
}
