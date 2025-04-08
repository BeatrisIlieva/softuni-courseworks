import { updateCorrectAnswersCount } from "./updateCorrectAnswersCount.js";
import { updateIncorrectAnswersCount } from "./updateIncorrectAnswersCount.js";

export function submitSelection(e, challenge) {
  e.preventDefault();

  const selectedRadio = document.querySelector(
    'input[name="selection"]:checked'
  );

  if (selectedRadio) {
    const answerIsCorrect = selectedRadio.value === challenge.correctAnswer;

    if (answerIsCorrect) {
      updateCorrectAnswersCount();
    } else {
      updateIncorrectAnswersCount();
    }

    document.querySelector(".result").textContent = answerIsCorrect
      ? "Correct"
      : "Incorrect";
    const submitButton = document.getElementById("submit-button");
    submitButton.disabled = true;

    const nextButton = document.getElementById("next-button");
    nextButton.disabled = false;
  } else {
    document.querySelector(".result").textContent = "Please select an option.";
  }
}
