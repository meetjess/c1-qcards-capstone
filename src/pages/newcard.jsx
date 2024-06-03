import React, { useState, useEffect } from 'react';
import supabase from "/src/config/supabaseClient.jsx";
import EditableCard from "../components/editablecard.jsx";

export default function NewCard() {
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswerA, setNewAnswerA] = useState("");
  const [newAnswerB, setNewAnswerB] = useState("");
  const [newAnswerC, setNewAnswerC] = useState("");
  const [newAnswerD, setNewAnswerD] = useState("");
  const [newAnswerKey, setNewAnswerKey] = useState("");
  const [cards, setCards] = useState([]);
  const [fetchErrors, setFetchErrors] = useState("");

  // CREATE CARDS
  async function handleCreateCard() {
    if (!newQuestion || !newAnswerA || !newAnswerB || !newAnswerC || !newAnswerD || !newAnswerKey) return;
    const { error } = await supabase
      .from("studycards")
      .insert({
        question: newQuestion,
        answer_key: newAnswerKey,
        answer_A: newAnswerA,
        answer_B: newAnswerB,
        answer_C: newAnswerC,
        answer_D: newAnswerD,
      });

    if (error) {
      console.error("Error creating card:", error);
    } else {
      console.log("Card created successfully");
      console.log(newQuestion, "added");
      fetchCards();

			setNewQuestion("");
			setNewAnswerKey("");
			setNewAnswerA("");
			setNewAnswerB("");
			setNewAnswerC("");
			setNewAnswerD("");

    }
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    handleCreateCard();
  };

  // FETCH CARDS
  const fetchCards = async () => {
    try {
      const { data: studycards, error } = await supabase
        .from('studycards')
        .select('*')
				.order('id', {ascending: false})

      if (error) {
        console.log("Error fetching Cards");
        setFetchErrors("Error fetching Cards");
      } else {
        setCards(studycards);
      }
    } catch (error) {
      console.error("Error fetching Cards:", error.message);
      setFetchErrors(error.message);
    }
  }

  useEffect(() => {
    fetchCards();
  }, []);



return (
  <>
    <div className="form-container">
      <form onSubmit={handleFormSubmit}>
        <div className="form-elements">
          <div className="form-row">
						<label className="form-label" htmlFor="question">Question: </label>
						<textarea
							id="question"
							className="form-input"
							maxLength="65"
							rows="2"
							value={newQuestion}
							onChange={(e) => setNewQuestion(e.target.value)}
						/>
					</div>

          <div className="form-row">
            <label className="form-label">Answer A: </label>
            <input
              id="answer-1"
              className="form-input"
              type="text"
              maxLength="50"
              value={newAnswerA}
              onChange={(e) => setNewAnswerA(e.target.value)}
            /><br />
          </div>

          <div className="form-row">
            <label className="form-label">Answer B: </label>
            <input
              id="answer-2"
              className="form-input"
              type="text"
              maxLength="50"
              value={newAnswerB}
              onChange={(e) => setNewAnswerB(e.target.value)}
            /><br />
          </div>

          <div className="form-row">
            <label className="form-label">Answer C: </label>
            <input
              id="answer-3"
              className="form-input"
              type="text"
              maxLength="50"
              value={newAnswerC}
              onChange={(e) => setNewAnswerC(e.target.value)}
            /><br />
          </div>

          <div className="form-row">
            <label className="form-label">Answer D: </label>
            <input
              id="answer-4"
              className="form-input"
              type="text"
              maxLength="50"
              value={newAnswerD}
              onChange={(e) => setNewAnswerD(e.target.value)}
            /><br />
          </div>

          <label className="form-label">Answer Key: </label>
          <select
            value={newAnswerKey}
            onChange={(e) => setNewAnswerKey(e.target.value)}
          >
            <option value="">Select Correct Answer</option>
            <option value="Answer A">Answer A</option>
            <option value="Answer B">Answer B</option>
            <option value="Answer C">Answer C</option>
            <option value="Answer D">Answer D</option>
          </select>

          <button
            className="savebutton"
            type="submit"
          >Create Q Card</button>
        </div>
      </form>
    </div>
		<div className="gallery-container">
    <div className="card-gallery">
      <EditableCard cards={cards} fetchCards={fetchCards} />
    </div>
		</div>
  </>
);
}
