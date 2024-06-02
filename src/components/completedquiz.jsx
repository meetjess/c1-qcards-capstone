import RestartQuiz from "./restartquiz.jsx";

export default function CompletedQuiz ({ score, restart, quizSetList }) {

	const percentageCorrect = (score / quizSetList.length) * 100;

	return (
		<>
			<div className="quiz-card">
				<div className="quiz-message">
					<h3>Final Score:</h3>
					<h2>{score} out of {quizSetList.length}</h2>
					{percentageCorrect < 25 && <h4>You participated!</h4>}
					{percentageCorrect >= 25 && percentageCorrect < 50 && <h4>Not bad!</h4>}
					{percentageCorrect >= 50 && percentageCorrect < 75 && <h4>Good job!</h4>}
					{percentageCorrect >= 75 && percentageCorrect < 100 && <h4>Great job!</h4>}
					{percentageCorrect === 100 && <h4>Perfect score! Congratulations!</h4>}
					{quizSetList.length === 1 && score === 1 && <p>Technically, there was only one card, but still...perfect!</p>}
				</div>
				<RestartQuiz restart={restart} />
			</div>

		</>
	)
}