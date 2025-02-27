function riskyOperation() {
    if (Math.random() < 0.5) {
        throw new Error('Task failed');
    }

    return 'Task successfull';
}

try {
    const result = riskyOperation();
    console.log(result);
} catch (err) {
    // Error handling
    console.log(err.message);
}
