"use strict";

// The Replace() method creates a new string by replacing a specified substring with another specified substring based on the original string

const sentences = "Beautiful Brazilian sky";

const newSentence = sentences.replace("Brazilian", "Bulgarian");

// expected Beautiful Bulgarian sky
console.log(newSentence);

const sentencesArray = ["Scary movie", "Scary story"];

const newSentencesArray = sentencesArray.map(function (sentence) {
  return sentence.replace("Scary", "Interesting");
});

// expected ["Interesting movie", "Interesting story"]
console.log(newSentencesArray);
