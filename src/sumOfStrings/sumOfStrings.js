function calc() {
  const firstInput = document.getElementById("firstInput");
  const secondInput = document.getElementById("secondInput");

  const sum = firstInput.value + secondInput.value;

  const resultField = document.getElementById("result");

  resultField.value = sum;
}

function showText() {
  document.getElementById("text").style.display = "block";
}
