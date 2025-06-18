// class User {
//     private _username: string;

//     constructor(username: string) {
//         this._username = username;
//     }

//     get username() {
//         return this._username;
//     }

//     set username(newUsername: string) {
//         if (newUsername.length < 3) {
//             throw new Error(
//                 'The username must consists of at least 3 characters!'
//             );
//         }

//         this._username = newUsername;
//     }
// }

class User {
    private _username: string;

    constructor(username: string) {
        this._username = username;
    }

    get username() {
        return this._username;
    }

    set username(value: string) {
        if (value.length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }

        this._username = value;
    }
}

const user = new User('Martin');
user.username = 'johnDoe';
console.log(user.username);
// const user = new User('jo');
