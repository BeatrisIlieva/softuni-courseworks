class Challenge {
  constructor(sourceCode, selectionOptions, description) {
    this.question = "What is the result from the following function ?";
  }
}

// factory function
function createChallenge(sourceCode, selectionOptions, description) {
  const challenge = {
    sourceCode,
    selectionOptions,
    description,
    submitSelection: function() {}
  };
}
