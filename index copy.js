// function calc() {
//   const firstInput = document.getElementById("firstInput");
//   const secondInput = document.getElementById("secondInput");

//   const sum = firstInput.value + secondInput.value;

//   const resultField = document.getElementById("result");

//   resultField.value = sum;
// }

// function extractText() {
//   const listItems = Array.from(document.querySelectorAll("li"));

//   const text = listItems.map((item) => item.textContent).join("\n");

//   document.querySelector("textarea").value = text;
// }

// function addItem() {
//   const value = document.getElementById("newItem").value;

//   const item = document.createElement("li");
//   item.textContent = value;

//   item.appendChild(createDeleteButton());

//   document.getElementById("items-list").appendChild(item);
// }

// function deleteByEmail() {
//   const email = document.querySelector('input[name="email"]').value;

//   const emailBoxes = Array.from(
//     document.querySelectorAll("td:nth-child(even)")
//   );

//   const userBox = emailBoxes.find((box) => box.textContent === email);

//   const result = document.getElementById("result-email");

//   if (userBox) {
//     userBox.parentElement.remove();

//     result.textContent = "deleted";
//   } else {
//     result.textContent = "not found";
//   }
// }

// function createDeleteButton() {
//   const deleteButton = document.createElement("a");

//   deleteButton.href = "#";
//   deleteButton.textContent = "Delete";
//   deleteButton.addEventListener("click", (e) => {
//     e.target.parentElement.remove();
//   });

//   return deleteButton;
// }

// function sumTable() {
//   const prices = Array.from(document.querySelectorAll("td:nth-child(2)"));

//   const total = prices.reduce((acc, curr) => {
//     return acc + Number(curr.textContent);
//   }, 0);

//   document.getElementById("sum").textContent = total;
// }

// function subtract() {
//   const firstNumberInput = document.querySelector("#firstNumber");
//   const secondNumberInput = document.querySelector("#secondNumber");

//   firstNumberInput.addEventListener("keydown", handler);
//   secondNumberInput.addEventListener("keydown", handler);
// }

// function handler() {
//   const firstNumber = Number(document.querySelector("#firstNumber").value);
//   const secondNumber = Number(document.querySelector("#secondNumber").value);

//   const sum = firstNumber - secondNumber;

//   const result = document.querySelector("#result");

//   result.textContent = sum;
// }

// function create() {
//   const container = document.getElementById("container");

//   const words = ["banana", "sun", "cat", "dog"];

//   words.forEach((word) => {
//     const span = document.createElement("span");

//     span.textContent = word;

//     container.appendChild(span);
//   });
// }

function showDescription() {
  const descriptions = Array.from(document.querySelectorAll(".description"));

  const buttons = Array.from(
    document.querySelectorAll(".show-description-button")
  );

  buttons.forEach((button) => {
    button.textContent =
      button.textContent === "Show Description"
        ? "Hide Description"
        : "Show Description";
  });

  descriptions.forEach((description) => {
    description.style.display =
      description.style.display === "block" ? "none" : "block";
  });
}

const buttons = Array.from(
  document.querySelectorAll(".show-description-button")
);

buttons.forEach((button) => {
  button.addEventListener("click", showDescription);
});

const nextButtons = Array.from(document.querySelectorAll(".button-next"));

let currentTask = 1;
let selectedValue = "";

const showNextTask = () => {
  document.querySelector(".result").textContent = "";

  const allRadios = document.querySelectorAll('input[name="selection"]');
  allRadios.forEach((radio) => {
    radio.checked = false; // Uncheck each radio button
  });

  currentTask += 1;

  let previousIndex = currentTask - 1;

  const previousTask = document.getElementById(String(previousIndex));

  previousTask.style.display = "none";

  const task = document.getElementById(String(currentTask));

  if (task) {
    console.log("true");
    task.style.display = "flex";
  } else {
    const noMoreChallenges = document.querySelector(".no-more-challenges");

    noMoreChallenges.style.display = "block";
  }
};

nextButtons.forEach((button) => {
  button.addEventListener("click", showNextTask);
});

const showTask = () => {
  const task = document.getElementById(String(currentTask));

  task.style.display = "flex";
};

const submitSelection = (formId) => {
  const form = document.getElementById(formId);

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
};
