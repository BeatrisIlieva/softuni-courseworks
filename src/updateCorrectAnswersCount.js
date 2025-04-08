export function updateCorrectAnswersCount() {
  let correctAnswersCount = 0;

  function plus() {
    correctAnswersCount += 1;
  }

  plus();

  return correctAnswersCount;
}
