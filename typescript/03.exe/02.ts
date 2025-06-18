class BankAccount {
    private balance: number;

    constructor(amount: number) {
        this.balance = amount;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (amount > this.balance) {
            throw new Error('Insufficient balance');
        }

        this.balance -= amount;
    }

    getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount(100);
account.deposit(50);
account.withdraw(30);
console.log(account.getBalance());
