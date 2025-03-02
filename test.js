function log(str) {
    let a = 5;
    function inner() {
        let b = 7;
        a = 6
        console.log(a);
    }


    inner()
}

log()
