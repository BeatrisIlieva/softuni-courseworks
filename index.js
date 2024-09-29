import { sourceCode } from "./src/arrayMethods/filterMethod/filterMethod.js";

class Challenge {
  static counter = 0;

  static formId = `form-${Challenge.counter}`;

  constructor(sourceCode, selectionOptions, description) {
    this.question = "What is the result from the following function?";
    this.sourceCode = sourceCode;
    this.formId = this.formId;
    this.selectionOptions = selectionOptions;
    this.description = description;

    Challenge.counter += 1;
  }
  submitSelection() {
    const form = document.getElementById(this.formId);

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const selectedRadio = document.querySelector(
        'input[name="selection"]:checked'
      );

      if (selectedRadio) {
        selectedValue = selectedRadio.value;

        document.querySelector(
          ".result"
        ).textContent = `You selected: ${selectedValue}`;
      } else {
        document.querySelector(".result").textContent =
          "Please select an option.";
      }
    });
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

    const challengeQuestion = document.createElement("h2");
    challengeQuestion.textContent = challenge.question;
    app.appendChild(challengeQuestion);

    const challengeSourceCodePreElement = document.createElement("pre");
    const challengeSourceCodeCodeElement = document.createElement("code");

    challengeSourceCodePreElement.appendChild(challengeSourceCodeCodeElement);

    challengeSourceCodeCodeElement.textContent = challenge.sourceCode;

    app.appendChild(challengeSourceCodePreElement);

    const form = document.createElement("form");
    form.id = challenge.formId;
    form.classList.add("form");

    const formOptionWrapper = document.createElement("div");
    formOptionWrapper.classList.add("option");

    const formInput = document.createElement("input");

    formInput.setAttribute("type", "radio");
    formInput.setAttribute("id", "firstLabel");
    formInput.setAttribute("name", "selection");
    formInput.setAttribute("value", challenge.selectionOptions[0]);

    const inputLabel = document.createElement("label");
    inputLabel.setAttribute("for", "firstLabel");
    inputLabel.textContent = challenge.selectionOptions[0];

    formOptionWrapper.appendChild(inputLabel);
    formOptionWrapper.appendChild(formInput);

    form.appendChild(formOptionWrapper)

    app.appendChild(form)


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

window.onload = initiate;
