type Train = { number: 1; train: () => void } & (
    | { hallway: 'A'; pass?: 'Guest' }
    | { hallway: 'C' }
);
type Dine = { number: 2; train: () => void } & (
    | { hallway: 'A'; pass?: 'Guest' }
    | { hallway: 'C' }
);
type Sleep = { number: 3; train: () => void };

function visitFloor22(floor: simplified) {
    switch (floor.number) {
        case 1:
            floor.train();
            return;
        case 2:
            floor.dine();
            return;
        case 3:
            floor.sleep();
            return;
    }
}

visitFloor22({ train() {}, number: 1, hallway: 'A', pass: 'Guest' });
visitFloor22({ dine() {}, number: 2, hallway: 'A' });
visitFloor22({ sleep() {}, number: 3, hallway: 'C' });
visitFloor22({ train() {}, number: 1, hallway: 'C' });
visitFloor22({ train() {}, number: 1, hallway: 'A' });
visitFloor22({ dine() {}, number: 2, hallway: 'A', pass: 'Guest' });
visitFloor22({ sleep() {}, number: 3, hallway: 'A' });
visitFloor22({ dine() {}, number: 2, hallway: 'C' });
