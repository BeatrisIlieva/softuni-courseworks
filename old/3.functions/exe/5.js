function solve(arrayOfNumbers) {
    arrayOfNumbers.forEach(
        checkIfNumberIsPalindrome
    );

    function checkIfNumberIsPalindrome(number) {
        console.log(
            number
                .toString()
                .split('')
                .reverse()
                .join('') === number.toString()
        );
    }
}

solve([123, 323, 421, 121]);
