export class Challenge {
  static selectedValue = "";

  constructor(sourceCode, selectionOptions, description, correctAnswer) {
    this.question = "What is the result from the following function?";
    this.sourceCode = sourceCode;
    this.selectionOptions = selectionOptions;
    this.description = description;
    this.correctAnswer = correctAnswer;
  }
}
