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

  item.appendChild(createDeleteButton());

  document.getElementById("items-list").appendChild(item);
}

function deleteByEmail() {
  const email = document.querySelector('input[name="email"]').value;

  const emailBoxes = Array.from(
    document.querySelectorAll("td:nth-child(even)")
  );

  const userBox = emailBoxes.find((box) => box.textContent === email);

  const result = document.getElementById("result-email");

  if (userBox) {
    userBox.parentElement.remove();

    result.textContent = "deleted";
  } else {
    result.textContent = "not found";
  }
}

function createDeleteButton() {
  const deleteButton = document.createElement("a");

  deleteButton.href = "#";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", (e) => {
    e.target.parentElement.remove();
  });

  return deleteButton;
}
