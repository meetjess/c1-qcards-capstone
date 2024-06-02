export default function MissedQuestions({ missedQuestions }) {

	
  return (
    <div className="missed-questions-container">
      {missedQuestions.map((card, index) => (
        <div key={index} className="missed-card">
              <p><span className="bold">Question: </span>{card.question}</p>
<p className={"Answer A" === card.answer_key ? 'correct-answer' : ''}><span className="bold">A: </span>{card.answer_A}</p>
<p className={"Answer B" === card.answer_key ? 'correct-answer' : ''}><span className="bold">B: </span>{card.answer_B}</p>
<p className={"Answer C" === card.answer_key ? 'correct-answer' : ''}><span className="bold">C: </span>{card.answer_C}</p>
<p className={"Answer D" === card.answer_key ? 'correct-answer' : ''}><span className="bold">D: </span>{card.answer_D}</p>
        </div>
      ))}
    </div>
  );
}
