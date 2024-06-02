import RestartQuiz from "./restartquiz.jsx";

export default function CanceledQuiz ( { restart }) {

	return (
		<>
		<div class="quiz-card">
		<p>😐 Welp, you canceled the quiz</p>
		<RestartQuiz restart={restart}/>
		</div>
		</>
	)
}