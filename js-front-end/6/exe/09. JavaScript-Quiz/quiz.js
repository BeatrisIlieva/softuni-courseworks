document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const sectionElements = document.querySelectorAll('.question');
    const resultsElement = document.getElementById('results');
    const answerElements = document.querySelectorAll('.quiz-answer');

    sectionElements.forEach(element => element.addEventListener('click', e => clickHandler(e)));

    function clickHandler(e) {
        let rightAnswersCount = 0;

        const section = e.currentTarget;

        if (e.target.tagName === 'LI') {
            const nextSection = section.nextElementSibling;

            if (nextSection && nextSection.tagName == 'SECTION') {
                section.classList.add('hidden');

                nextSection.classList.remove('hidden');
                console.log(nextSection);
            }
        }
    }
}
