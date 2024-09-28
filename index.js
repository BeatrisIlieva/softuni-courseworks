function calc() {
  const firstInput = document.getElementById("firstInput");
  const secondInput = document.getElementById("secondInput");

  const sum = firstInput.value + secondInput.value;

  const resultField = document.getElementById("result");

  resultField.value = sum;
}

function showText() {
  document.getElementById("text").style.display = "block";
  setTimeout(() => {
    document.getElementById("more").style.display = "none";
  }, 1000);
}

function showMoreText() {
  const element = document.querySelector("#more-text");

  element.innerHTML += "<span>which means that it can change</span>";
}
