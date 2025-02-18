function solve(worker) {
    if (worker.dizziness) {
        const addedHydration = worker.weight * 0.1 * worker.experience;

        worker.levelOfHydrated += addedHydration;

        worker.dizziness = false;
    }

    return worker;
}

console.log(
    solve({ weight: 120,

        experience: 20,
        
        levelOfHydrated: 200,
        
        dizziness: true })
);
