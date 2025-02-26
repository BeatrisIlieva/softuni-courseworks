function solve(input) {
    input.forEach(element => {
        element = element.toString().split('');
        const middle = Math.floor(element.length / 2);
        let isPalindrome = true;

        for (let i = 0; i < middle; i++) {
            if (element[i] !== element[element.length - 1 - i]) {
                isPalindrome = false;
                break;
            }
        }

        console.log(isPalindrome);
    });
}

solve([123, 323, 421, 121]);
