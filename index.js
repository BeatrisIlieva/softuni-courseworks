let counter = 0;
let challenges = [];

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
      document.querySelector(".result").textContent =
        "Please select an option.";
    }
  }
}

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

async function loadChallenges() {
  const challengeFiles = [
    "./challenges/easy/filterMethod.js",
    "./challenges/easy/findMethod.js",
  ];

  for (const filePath of challengeFiles) {
    try {
      const module = await import(filePath);
      const challenge = new Challenge(
        module.sourceCode,
        module.selectionOptions,
        module.description,
        module.correctAnswer
      );

      challenges.push(challenge);
    } catch (error) {
      console.error(`Failed to load challenge from ${filePath}: `, error);
    }
  }

  showTask();
}

const showTask = () => {
  if (challenges[counter]) {
    createChallenge(challenges[counter]);
  }
};

const showNextTask = () => {
  counter += 1;

  const app = document.getElementById("app");
  app.innerHTML = "";

  if (counter >= challenges.length) {
    counter = 0;
  }

  showTask();
};

window.onload = loadChallenges;
