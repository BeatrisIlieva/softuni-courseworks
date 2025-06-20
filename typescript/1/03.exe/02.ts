// class BankAccount {
//     private balance: number;

//     constructor(balance: number) {
//         this.balance = balance;
//     }

//     public deposit(amount: number): void {
//         this.balance += amount;
//     }

//     public withdraw(amount: number): void {
//         if (this.balance >= amount) {
//             this.balance -= amount;
//         }
//     }

//     public getBalance(): number {
//         return this.balance;
//     }
// }

class BankAccount {
    private _balance: number;

    constructor(balance: number) {
        this._balance = balance;
    }

    deposit(amount: number) {
        this._balance += amount;
    }

    withdraw(amount: number) {
        if (this._balance < amount) {
            throw new Error('Not enough balance');
        }

        this._balance -= amount;
    }

    getBalance(): number {
        return this._balance;
    }
}

const account = new BankAccount(100);
account.deposit(50);
account.withdraw(30);
console.log(account.getBalance());

// const account = new BankAccount(20);
// account.withdraw(30);
// console.log(account.getBalance());
