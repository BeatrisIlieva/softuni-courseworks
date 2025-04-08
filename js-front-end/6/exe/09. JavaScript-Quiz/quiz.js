document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const sectionElements = document.querySelectorAll('.question');

    sectionElements.forEach(element => element.addEventListener('click', e => clickHandler(e)));
    let correctAnswersCount = 0;

    const correctAnswers = [
        'onclick',
        'JSON.stringify()',
        'A programming API for HTML and XML documents'
    ];

    function clickHandler(e) {
        const section = e.currentTarget;

        const clickedElement = e.target;

        if (clickedElement.tagName === 'LI') {
            const selectedAnswer = clickedElement.textContent;
            const isSelectedAnswerCorrect = correctAnswers.includes(selectedAnswer);

            isSelectedAnswerCorrect && correctAnswersCount++;

            const nextSection = section.nextElementSibling;
            section.classList.add('hidden');
            nextSection.classList.remove('hidden');
            if (nextSection.tagName == 'DIV') {
                displayResult();
            }
        }
    }

    function displayResult() {
        const resultElement = document.getElementById('results');
        let resultSentence = '';

        if (correctAnswersCount === correctAnswers.length) {
            resultSentence = 'You are recognized as top JavaScript fan!';
        } else if (correctAnswersCount > 1 || correctAnswersCount === 0) {
            resultSentence = `You have ${correctAnswersCount} right answers`;
        } else {
            resultSentence = `You have ${correctAnswersCount} right answer`;
        }

        resultElement.textContent = resultSentence;
    }
}
