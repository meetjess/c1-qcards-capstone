import { useState, useEffect } from "react";
import supabase from "/src/config/supabaseClient.jsx";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/dashboard.jsx";
import Navigation from "./components/navigation.jsx";
import NoMatch from "./components/nomatch.jsx";
import NewCard from "./pages/newcard.jsx";
import QuizPage from "./pages/quizpage.jsx";

function App() {
  return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" Component={Dashboard} />
				<Route path="*" Component={NoMatch} />
				<Route path="/create" Component={NewCard} />
				<Route path="/quiz" Component={QuizPage} />
			</Routes>
		</>
  );
}

export default App;