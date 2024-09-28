function calc() {
  const firstInput = document.getElementById("firstInput");
  const secondInput = document.getElementById("secondInput");

  const sum = firstInput.value + secondInput.value;

  const resultField = document.getElementById("result");

  resultField.value = sum;
}

function extractText() {
  const listItems = Array.from(document.querySelectorAll("li"));

  const text = listItems.map((item) => item.textContent).join("\n");

  document.querySelector("textarea").value = text;
}

function addItem() {
  const value = document.getElementById("newItem").value;

  const item = document.createElement("li");
  item.textContent = value;

  document.getElementById("items-list").appendChild(item)

}