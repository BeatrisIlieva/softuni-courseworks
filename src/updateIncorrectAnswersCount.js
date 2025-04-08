export function updateIncorrectAnswersCount() {
  let incorrectAnswersCount = 0;

  function plus() {
    incorrectAnswersCount += 1;
  }

  plus();

  return incorrectAnswersCount;
}
