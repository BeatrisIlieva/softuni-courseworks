// let counter = 0;
// let challenges = [];

// class Challenge {
//   static selectedValue = "";

//   constructor(sourceCode, selectionOptions, description, correctAnswer) {
//     this.question = "What is the result from the following function?";
//     this.sourceCode = sourceCode;
//     this.selectionOptions = selectionOptions;
//     this.description = description;
//     this.correctAnswer = correctAnswer;
//   }

//   submitSelection(e) {
//     e.preventDefault();

//     const selectedRadio = document.querySelector(
//       'input[name="selection"]:checked'
//     );

//     if (selectedRadio) {
//       Challenge.selectedValue = selectedRadio.value;

//       document.querySelector(
//         ".result"
//       ).textContent = `You selected: ${Challenge.selectedValue}`;
//     } else {
//       document.querySelector(".result").textContent =
//         "Please select an option.";
//     }
//   }
// }

// function createChallenge(challenge) {
//   const app = document.getElementById("app");

//   const section = document.createElement("section");
//   section.id = counter;

//   const challengeQuestion = document.createElement("h2");
//   challengeQuestion.textContent = challenge.question;
//   section.appendChild(challengeQuestion);

//   const challengeSourceCodePreElement = document.createElement("pre");
//   const challengeSourceCodeCodeElement = document.createElement("code");
//   challengeSourceCodeCodeElement.textContent = challenge.sourceCode;
//   challengeSourceCodePreElement.appendChild(challengeSourceCodeCodeElement);

//   section.appendChild(challengeSourceCodePreElement);

//   const form = document.createElement("form");
//   form.id = "form";

//   challenge.selectionOptions.forEach((option) => {
//     const formOptionWrapper = document.createElement("div");
//     formOptionWrapper.classList.add("option");

//     const formInput = document.createElement("input");
//     formInput.setAttribute("type", "radio");
//     formInput.setAttribute("name", "selection");
//     formInput.setAttribute("value", option);

//     const inputLabel = document.createElement("label");
//     inputLabel.textContent = option;

//     formOptionWrapper.appendChild(formInput);
//     formOptionWrapper.appendChild(inputLabel);

//     form.appendChild(formOptionWrapper);
//   });

//   const submitButton = document.createElement("button");
//   submitButton.setAttribute("type", "submit");
//   submitButton.id = "submit-button";
//   submitButton.textContent = "Submit";

//   submitButton.addEventListener("click", (e) => challenge.submitSelection(e));

//   form.appendChild(submitButton);
//   section.appendChild(form);

//   const resultContainer = document.createElement("div");
//   resultContainer.classList.add("result");
//   section.appendChild(resultContainer);

//   const nextButton = document.createElement("button");
//   nextButton.textContent = "Next";
//   nextButton.addEventListener("click", showNextTask);
//   section.appendChild(nextButton);

//   const description = document.createElement("p");
//   description.id = "description";
//   description.textContent = challenge.description;

//   const showDescriptionButton = document.createElement("button");
//   showDescriptionButton.textContent = "Show Description";
//   showDescriptionButton.id = "show-description-button";
//   showDescriptionButton.addEventListener("click", showDescription);

//   section.appendChild(showDescriptionButton);
//   section.appendChild(description);

//   app.appendChild(section);
// }

// function showDescription() {
//   const button = document.getElementById("show-description-button");

//   button.textContent =
//     button.textContent === "Show Description"
//       ? "Hide Description"
//       : "Show Description";

//   const description = document.getElementById("description");
//   description.style.display =
//     description.style.display === "block" ? "none" : "block";
// }

// async function loadChallenges() {
//   const challengeFiles = [
//     "./challenges/easy/filterMethod.js",
//     "./challenges/easy/findMethod.js",
//   ];

//   for (const filePath of challengeFiles) {
//     try {
//       const module = await import(filePath);
//       const challenge = new Challenge(
//         module.sourceCode,
//         module.selectionOptions,
//         module.description,
//         module.correctAnswer
//       );

//       challenges.push(challenge);
//     } catch (error) {
//       console.error(`Failed to load challenge from ${filePath}: `, error);
//     }
//   }

//   showTask();
// }

// const showTask = () => {
//   if (challenges[counter]) {
//     createChallenge(challenges[counter]);
//   }
// };

// const showNextTask = () => {
//   counter += 1;

//   const app = document.getElementById("app");
//   app.innerHTML = "";

//   if (counter >= challenges.length) {
//     counter = 0;
//   }

//   showTask();
// };

// window.onload = loadChallenges;


let counter = 0;
let challenges = []; // To store dynamically loaded challenges

class Challenge {
  static selectedValue = "";

  constructor(sourceCode, selectionOptions, description, correctAnswer) {
    this.question = "What is the result from the following function?";
    this.sourceCode = sourceCode;
    this.selectionOptions = selectionOptions;
    this.description = description;
    this.correctAnswer = correctAnswer;
  }

  submitSelection(e) {
    e.preventDefault();

    const selectedRadio = document.querySelector(
      'input[name="selection"]:checked'
    );

    if (selectedRadio) {
      Challenge.selectedValue = selectedRadio.value;

      document.querySelector(
        ".result"
      ).textContent = `You selected: ${Challenge.selectedValue}`;
    } else {
      document.querySelector(".result").textContent = "Please select an option.";
    }
  }
}

// Function to create the challenge UI
function createChallenge(challenge) {
  const app = document.getElementById("app");

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

  submitButton.addEventListener("click", (e) => challenge.submitSelection(e));

  form.appendChild(submitButton);
  section.appendChild(form);

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result");
  section.appendChild(resultContainer);

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", showNextTask);
  section.appendChild(nextButton);

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
}

// Show the description toggle functionality
function showDescription() {
  const button = document.getElementById("show-description-button");

  button.textContent =
    button.textContent === "Show Description" ? "Hide Description" : "Show Description";

  const description = document.getElementById("description");
  description.style.display =
    description.style.display === "block" ? "none" : "block";
}

// Function to load challenges dynamically based on user selection
async function loadChallenges(difficulty) {
  // Map difficulty to folder path
  let challengeFolder = '';
  switch (difficulty) {
    case 'beginner':
      challengeFolder = './challenges/easy/';
      break;
    case 'intermediate':
      challengeFolder = './challenges/intermediate/';
      break;
    case 'advanced':
      challengeFolder = './challenges/advanced/';
      break;
    default:
      return;
  }

  // Array of challenge files based on the selected difficulty
  const challengeFiles = [
    `${challengeFolder}1.js`,
    `${challengeFolder}2.js`,
    // Add more files as needed
  ];

  // Iterate over each challenge file and import it
  for (const filePath of challengeFiles) {
    try {
      const module = await import(filePath);
      const challenge = new Challenge(
        module.sourceCode,
        module.selectionOptions,
        module.description,
        module.correctAnswer
      );

      // Add the challenge to the challenges array
      challenges.push(challenge);
    } catch (error) {
      console.error(`Failed to load challenge from ${filePath}: `, error);
    }
  }

  // Hide the modal and show the first challenge
  document.getElementById("level-selection-modal").style.display = "none";
  showTask();
}

// Show the current task
const showTask = () => {
  if (challenges[counter]) {
    createChallenge(challenges[counter]);
  }
};

// Show the next task when the "Next" button is clicked
const showNextTask = () => {
  counter += 1;

  // Clear the previous challenge
  const app = document.getElementById("app");
  app.innerHTML = "";

  // Cycle back to the first challenge if we reach the end
  if (counter >= challenges.length) {
    counter = 0;
  }

  // Show the next challenge
  showTask();
};

// Function to handle difficulty selection
function handleDifficultySelection(difficulty) {
  loadChallenges(difficulty);

  // Hide the popup/modal
  document.getElementById("level-selection-modal").style.display = "none";
}

// Event listeners for level selection buttons
document.getElementById("beginner-button").addEventListener("click", () => handleDifficultySelection('beginner'));
document.getElementById("intermediate-button").addEventListener("click", () => handleDifficultySelection('intermediate'));
document.getElementById("advanced-button").addEventListener("click", () => handleDifficultySelection('advanced'));
