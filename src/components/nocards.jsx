import { Link } from "react-router-dom";

export default function NoCards () {

	return (
		<>
		<div className="quiz-card">
			<p>Sorry, you don't seem to have any Q Cards to quiz yourself. Please create some cards and try again later!</p>
			<Link className="quiz-create" to="/create">Create a Card</Link>
		</div>
		</>
	)
}