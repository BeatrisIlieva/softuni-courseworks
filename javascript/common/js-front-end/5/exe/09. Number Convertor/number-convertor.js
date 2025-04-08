function solve() {
    const input = Number(document.getElementById('input').value);
    const resultElement = document.getElementById('result');

    const selectedOption = document.querySelector('#selectMenuTo option:checked').value;
    console.log(selectedOption);

    const mapper = {
        binary: input => input.toString(2),
        hexadecimal: input => input.toString(16).toUpperCase()
    };

    resultElement.value = mapper[selectedOption](input);
}
