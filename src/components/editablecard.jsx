import React from 'react';
import supabase from "/src/config/supabaseClient.jsx";
import { useState, useEffect } from 'react';

export default function EditableCard({ cards, fetchCards }) {

const [isEditing, setIsEditing] = useState(false);
const [currentCardId, setCurrentCardId] = useState(null)
const [editQuestion, setEditQuestion] = useState("");
const [editAnswerA, setEditAnswerA] = useState("");
const [editAnswerB, setEditAnswerB] = useState("");
const [editAnswerC, setEditAnswerC] = useState("");
const [editAnswerD, setEditAnswerD] = useState("");
const [editAnswerKey, setEditAnswerKey] = useState("");

  // DELETE CARDS
  const deleteCard = async (id) => {
    const { error } = await supabase
      .from('studycards')
      .delete()
      .eq("id", id);

    if (error) console.log(error);

    fetchCards();

    console.log("correctly deleted", id);
  };

	function handleDelete(id) {
		const confirmDelete = window.confirm("Are you sure you want to delete this card?")

		if (confirmDelete) {
			deleteCard(id)

		}
	}


	// EDIT CARDS

	useEffect(() => {
		if (currentCardId) {
			const card = cards.find((card) => card.id === currentCardId)

			if (card) {
				//set edit question + answer + key values
				console.log("editing", card.id)
				setEditQuestion(card.question);
				setEditAnswerA(card.answer_A);
				setEditAnswerB(card.answer_B);
				setEditAnswerC(card.answer_C);
				setEditAnswerD(card.answer_D);
				setEditAnswerKey(card.answer_key);
			}
		}
	},[currentCardId]);

	// SAVE CARD saveCard

	async function saveCard(id) {
			event.preventDefault();
		if (!editQuestion || !editAnswerA || !editAnswerB || !editAnswerC || !editAnswerD || !editAnswerKey) return;

	
		const { error } = await supabase
			.from("studycards")
			.update({
				question: editQuestion,
        answer_key: editAnswerKey,
        answer_A: editAnswerA,
        answer_B: editAnswerB,
        answer_C: editAnswerC,
        answer_D: editAnswerD
			})
			.eq("id", id)
			.select()

			if (error) {
				console.log("Error saving card");
			} else {
				console.log("Card saved successfully")
				setIsEditing(false);
				setCurrentCardId(null)
				fetchCards();
			}
	};

	//CANCEL CARD EDIT
	function cancelEdit() {
		setIsEditing(false);
		setCurrentCardId(null)
	}




return (
  <>
    {cards.map((card) => {
      if (card.id === currentCardId && isEditing) {
        return (
          <div className="edit-form" key={card.id}>
					<form onSubmit={() => saveCard(currentCardId)}>

					<div className="form-row">
						<label htmlFor="question" className="form-label">
						Question:
						</label>
						<textarea
							className="form-input"
							maxLength="100"
							value={editQuestion}
							onChange={(e) => setEditQuestion(e.target.value)}
						/>
					</div>

            <div className="form-row">
              <label htmlFor="answer_A" className="form-label">
                A:
              </label>
              <input
                className="form-input"
                type="text"
                maxLength="65"
                value={editAnswerA}
								onChange={(e) => setEditAnswerA(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="answer_B" className="form-label">
                B:
              </label>
              <input
                className="form-input"
                type="text"
                maxLength="65"
                value={editAnswerB}
								onChange={(e) => setEditAnswerB(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="answer_C" className="form-label">
                C:
              </label>
              <input
                className="form-input"
                type="text"
                maxLength="65"
                value={editAnswerC}
								onChange={(e) => setEditAnswerC(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="answer_D" className="form-label">
                D:
              </label>
              <input
                className="form-input"
                type="text"
                maxLength="65"
                value={editAnswerD}
								onChange={(e) => setEditAnswerD(e.target.value)}
              />
            </div>

						<label className="form-label">Answer Key: </label>
          <select
            value={editAnswerKey}
            onChange={(e) => setEditAnswerKey(e.target.value)}
          >
            <option value="">Select Correct Answer</option>
            <option value="Answer A">Answer A</option>
            <option value="Answer B">Answer B</option>
            <option value="Answer C">Answer C</option>
            <option value="Answer D">Answer D</option>
          </select>

					<div className="editbtn-row">
					<button
            className="savebutton"
            type="submit"
          >Save Q Card</button>

					<button
            className="savebutton"
            type="Cancel"
						onClick={cancelEdit}
          >Cancel Edit</button>
					</div>

					</form>
          </div>
        );
      } else {
        return (
          <div key={card.id} className="cardinfo">
            
              <p><span className="pinkbold">Question: </span>{card.question}</p>
              <p><span className="pinkbold">A: </span>{card.answer_A}</p>
              <p><span className="pinkbold">B: </span>{card.answer_B}</p>
              <p><span className="pinkbold">C: </span>{card.answer_C}</p>
              <p><span className="pinkbold">D: </span>{card.answer_D}</p>
              <p>Answer Key: {card.answer_key}</p>
              <div className="editbtn-row">
                <button onClick={() => { setIsEditing(true); setCurrentCardId(card.id); }}>Edit</button>
                <button onClick={() => handleDelete(card.id)}>Delete</button>
              </div>
            </div>
        
        );
      }
    })}
  </>
);




}

      