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
  const description = document.getElementById("description");

  const button = document.getElementById("show-description-button");

  description.style.display =
    description.style.display === "block" ? "none" : "block";

  button.textContent =
    button.textContent === "Show Description"
      ? "Hide Description"
      : "Show Description";
}

const button = document.getElementById("show-description-button");

button.addEventListener("click", showDescription)