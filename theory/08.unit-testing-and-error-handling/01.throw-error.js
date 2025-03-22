function riskyOperations() {
    if (Math.random() < 0.5) {
        throw new Error('Failed'); // here we create an error object and throw it
    }

    return 'Succeeded';
}

// try-catch block
try {
    const result = riskyOperations();
    console.log(result); // Succeeded
} catch (err) {
    // Error handling
    // Here we decide how to proceed if an error occurred in the try statement
    console.log(err.message); // Failed
}
