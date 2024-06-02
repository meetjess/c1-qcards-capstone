import { Link } from "react-router-dom";

export default function Navigation() {

	return (
		<>
			<nav>
			<div className="navigation-bar">
				<div className="nav-logo">
					<img className="q-logo" src="https://i.imgur.com/ZeEw02p.png" alt="qcard logo" />
				</div>
				<div className="nav-link-row">
					<Link className="nav-link" to="/">Dashboard</Link>

					<Link className="nav-link" to="/create">Create a Card</Link>

					<Link className="nav-link" to="/quiz">Quiz Time</Link>
				</div>
			</div>
			</nav>
		</>
	)
}