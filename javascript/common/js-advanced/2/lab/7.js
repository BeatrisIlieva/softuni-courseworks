function solve(array, first, second){
    const firstIndex = array.indexOf(first);
    const secondIndex = array.indexOf(second);
    const result = array.slice(firstIndex, secondIndex + 1);

    return result;
}

console.log(
    solve(
        ['Pumpkin Pie', 'Key Lime Pie', 'Cherry Pie', 'Lemon Meringue Pie', 'Sugar Cream Pie'],

        'Key Lime Pie',

        'Lemon Meringue Pie'
    )
);
