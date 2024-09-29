import { sourceCode } from "./src/arrayMethods/filterMethod/filterMethod.js";

class Challenge {
  static sectionId = 1;

  static counter = 1;

  static formId = `form-${Challenge.counter}`;

  static selectedValue = "";

  constructor(sourceCode, selectionOptions, description) {
    this.question = "What is the result from the following function?";
    this.sourceCode = sourceCode;
    this.selectionOptions = selectionOptions;
    this.description = description;
    this.formId = Challenge.formId;
    this.sectionId = Challenge.sectionId;

    Challenge.sectionId += 1;
    Challenge.counter += 1;
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
    // });
  }
}

function createChallenge(input) {
  input.forEach((element) => {
    const [sourceCode, selectionOptions, firstChallengeDescription] = element;

    const challenge = new Challenge(
      sourceCode,
      selectionOptions,
      firstChallengeDescription
    );

    const app = document.getElementById("app");

    const section = document.createElement("section");
    section.id = challenge.sectionId;
    section.classList.add("challenge")

    const challengeQuestion = document.createElement("h2");
    challengeQuestion.textContent = challenge.question;
    section.appendChild(challengeQuestion);

    const challengeSourceCodePreElement = document.createElement("pre");
    const challengeSourceCodeCodeElement = document.createElement("code");

    challengeSourceCodePreElement.appendChild(challengeSourceCodeCodeElement);

    challengeSourceCodeCodeElement.textContent = challenge.sourceCode;

    section.appendChild(challengeSourceCodePreElement);

    const form = document.createElement("form");
    form.id = challenge.formId;
    form.classList.add("form");

    challenge.selectionOptions.forEach((option) => {
      const formOptionWrapper = document.createElement("div");
      formOptionWrapper.classList.add("option");

      const formInput = document.createElement("input");

      formInput.setAttribute("type", "radio");
      formInput.setAttribute("id", "firstLabel");
      formInput.setAttribute("name", "selection");
      formInput.setAttribute("value", option);

      const inputLabel = document.createElement("label");
      inputLabel.setAttribute("for", "firstLabel");
      inputLabel.textContent = option;

      formOptionWrapper.appendChild(inputLabel);
      formOptionWrapper.appendChild(formInput);

      form.appendChild(formOptionWrapper);
    });

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");

    submitButton.addEventListener("click", challenge.submitSelection);

    form.appendChild(submitButton);

    section.appendChild(form);

    const resultContainer = document.createElement("div");
    resultContainer.classList.add("result");

    section.appendChild(resultContainer)

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next"

    section.appendChild(nextButton);

    app.appendChild(section)
  });
}

const selectionOptions = [
  [6, 2],
  [1, 2],
  [6, 13],
];

const firstChallengeDescription =
  "The filter() method creates a new array with filtered elements";

const challenges = [
  [sourceCode, selectionOptions, firstChallengeDescription],
  [sourceCode, selectionOptions, firstChallengeDescription],
];

const initiate = () => {
  createChallenge(challenges);
};

let currentTask = 1;

const showTask = () => {

  initiate();

    const task = document.getElementById(String(currentTask));

  task.style.display = "flex";
};

window.onload = showTask;


