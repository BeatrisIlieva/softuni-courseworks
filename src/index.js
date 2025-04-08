import { Challenge } from "./Challenge.js";
import { updateCorrectAnswersCount } from "./updateCorrectAnswersCount.js";
import { updateIncorrectAnswersCount } from "./updateIncorrectAnswersCount.js";
import { submitSelection } from "./submitSelections.js";

let counter = 0;
let challenges = []; // To store dynamically loaded challenges
let currentChallengeIndex = 1; // Start from challenge file '1.js'
let challengeFolder = ""; // This will hold the folder based on the difficulty level

// Function to create the challenge UI
function createChallenge(challenge) {
  const app = document.getElementById("app");
  app.innerHTML = ""; // Clear previous challenge

  const section = document.createElement("section");
  section.id = counter;

  const challengeQuestion = document.createElement("h2");
  challengeQuestion.textContent = challenge.question;
  section.appendChild(challengeQuestion);

  const challengeSourceCodePreElement = document.createElement("pre");
  const challengeSourceCodeCodeElement = document.createElement("code");
  challengeSourceCodeCodeElement.textContent = challenge.sourceCode;
  challengeSourceCodePreElement.appendChild(challengeSourceCodeCodeElement);

  section.appendChild(challengeSourceCodePreElement);

  const form = document.createElement("form");
  form.id = "form";

  challenge.selectionOptions.forEach((option) => {
    const formOptionWrapper = document.createElement("div");
    formOptionWrapper.classList.add("option");

    const formInput = document.createElement("input");
    formInput.setAttribute("type", "radio");
    formInput.setAttribute("name", "selection");
    formInput.setAttribute("value", option);

    const inputLabel = document.createElement("label");
    inputLabel.textContent = option;

    formOptionWrapper.appendChild(formInput);
    formOptionWrapper.appendChild(inputLabel);

    form.appendChild(formOptionWrapper);
  });

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.id = "submit-button";
  submitButton.textContent = "Submit";
  submitButton.disabled = true;

  submitButton.addEventListener("click", (e) => submitSelection(e, challenge));

  form.appendChild(submitButton);
  section.appendChild(form);

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result");
  section.appendChild(resultContainer);

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", showNextTask);
  nextButton.id = "next-button";
  section.appendChild(nextButton);
  nextButton.disabled = true;

  const description = document.createElement("p");
  description.id = "description";
  description.textContent = challenge.description;

  const showDescriptionButton = document.createElement("button");
  showDescriptionButton.textContent = "Show Description";
  showDescriptionButton.id = "show-description-button";
  showDescriptionButton.addEventListener("click", showDescription);

  section.appendChild(showDescriptionButton);
  section.appendChild(description);

  app.appendChild(section);

  const formInputs = document.querySelectorAll("input");

  formInputs.forEach((input) => {
    input.addEventListener("change", () => {
      submitButton.disabled = !form.querySelector(
        'input[name="selection"]:checked'
      );
    });
  });
}

// Show the description toggle functionality
function showDescription() {
  const button = document.getElementById("show-description-button");

  button.textContent =
    button.textContent === "Show Description"
      ? "Hide Description"
      : "Show Description";

  const description = document.getElementById("description");
  description.style.display =
    description.style.display === "block" ? "none" : "block";
}

// Function to load challenges dynamically based on user selection
async function loadChallengeByNumber(number) {
  const filePath = `${challengeFolder}/${number}.js`; // Construct file path based on the selected difficulty

  try {
    const module = await import(filePath);

    // Create a new challenge instance
    const challenge = new Challenge(
      module.sourceCode,
      module.selectionOptions,
      module.description,
      module.correctAnswer
    );

    challenges.push(challenge);
    createChallenge(challenge); // Render the challenge
  } catch (error) {
    console.error(`Failed to load challenge from ${filePath}: `, error);
    if (number > 1) {
      const endContainer = document.createElement("section");

      const heading = document.createElement("h3");

      heading.textContent = "No more challenges";

      const resultContainer = document.createElement("div");

      const correctAnswerContainer = document.createElement("div");
      const incorrectAnswerContainer = document.createElement("div");

      let correctAnswersCount = updateCorrectAnswersCount();
      let incorrectAnswersCount = updateIncorrectAnswersCount();

      correctAnswerContainer.textContent = `Correct Answers ${correctAnswersCount}`;
      incorrectAnswerContainer.textContent = `Incorrect Answers ${incorrectAnswersCount}`;

      resultContainer.append(correctAnswerContainer, incorrectAnswerContainer);

      endContainer.append(heading, resultContainer);

      app.appendChild(endContainer);
    }
  }
}

// Show the next task when the "Next" button is clicked
const showNextTask = () => {
  counter += 1;
  currentChallengeIndex += 1;

  if (counter >= challenges.length) {
    loadChallengeByNumber(currentChallengeIndex);
  } else {
    createChallenge(challenges[counter]);
  }
};

// Function to handle difficulty selection
function handleDifficultySelection(difficulty) {
  // Set the folder path based on the selected difficulty level
  if (difficulty === "beginner") {
    challengeFolder = "./challenges/beginner";
  } else if (difficulty === "intermediate") {
    challengeFolder = "./challenges/intermediate";
  } else if (difficulty === "advanced") {
    challengeFolder = "./challenges/advanced";
  }

  loadChallengeByNumber(currentChallengeIndex); // Start from challenge '1.js'
}

// Create popup modal in JavaScript
function createPopup() {
  const modal = document.createElement("div");
  modal.id = "level-selection-modal";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";

  const modalContent = document.createElement("div");
  modalContent.style.backgroundColor = "#fff";
  modalContent.style.padding = "20px";
  modalContent.style.borderRadius = "5px";
  modalContent.style.textAlign = "center";

  const modalHeading = document.createElement("h2");
  modalHeading.textContent = "Select Difficulty";
  modalContent.appendChild(modalHeading);

  const levels = ["Beginner", "Intermediate", "Advanced"];

  levels.forEach((level) => {
    const button = document.createElement("button");
    button.textContent = level;
    button.style.margin = "10px";
    button.style.padding = "10px 20px";
    button.addEventListener("click", () => {
      document.body.removeChild(modal); // Remove the popup when a level is selected
      handleDifficultySelection(level.toLowerCase());
    });
    modalContent.appendChild(button);
  });

  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// Initialize the popup and show it
window.onload = () => {
  createPopup();
};
