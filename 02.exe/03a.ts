type CarBody2 = { material: string; state: string };
type CatTires2 = { airPressure: number; condition: string };
type CarEngine2 = { horsepower: number; oilDensity: number };
type CarComponents2 = { partName: string; runDiagnostics2(): string };

type FullCar2 =
    | (CarBody2 & CarComponents2)
    | (CatTires2 & CarComponents2)
    | (CarEngine2 & CarComponents2);

function carDiagnostics2(car: FullCar2) {
    console.log(car.runDiagnostics2());
}

const cars = [
    {
        material: 'aluminum',
        state: 'scratched',
        partName: 'Car Body',
        runDiagnostics2() {
            return this.partName;
        }
    },
    {
        airPressure: 30,
        condition: 'needs change',
        partName: 'Tires',
        runDiagnostics2() {
            return this.partName;
        }
    },
    {
        horsepower: 300,
        oilDensity: 780,
        partName: 'Engine',
        runDiagnostics2() {
            return this.partName;
        }
    }
];

for (let car of cars) {
    carDiagnostics2(car);
}
