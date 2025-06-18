type User = {
    id: number | string;
    username: string;
    passwordHash: string | string[];
    status: 'Locked' | 'Unlocked' | 'Deleted';
    email?: string;
};

function isUser(user: unknown): user is User {
    if (typeof user === 'object' && !Array.isArray(user) && user !== null) {
        const idIsValid =
            'id' in user &&
            (typeof user.id === 'string' || typeof user.id === 'number') &&
            isIdValid(user.id);
        const usernameIsValid =
            'username' in user &&
            typeof user.username === 'string' &&
            isUsernameValid(user.username);
        const passwordIsValid =
            'passwordHash' in user &&
            (typeof user.passwordHash === 'string' ||
                (Array.isArray(user.passwordHash) &&
                    user.passwordHash.every((x) => typeof x === 'string'))) &&
            isPasswordValid(user.passwordHash);
        const isStatuesValid =
            'status' in user &&
            typeof user.status === 'string' &&
            isStatusValid(user.status);
        return idIsValid && usernameIsValid && passwordIsValid && isStatuesValid;
    }
    return false;
}

function isIdValid(id: string | number): boolean {
    if (typeof id === 'number') {
        return id > 100;
    }

    return id.length === 14;
}

function isUsernameValid(username: string): boolean {
    return username.length >= 5 && username.length <= 10;
}

function isPasswordValid(password: string | string[]): boolean {
    if (Array.isArray(password)) {
        return password.length === 4 && password.every((x) => x.length === 8);
    }

    return password.length === 20;
}

function isStatusValid(status: string): boolean {
    return ['Locked', 'Unlocked'].includes(status);
}

let user1 = {
    id: 120,
    username: 'testing',
    passwordHash: '123456-123456-123456',
    status: 'Deleted',
    email: 'something'
};
let user2 = {
    id: '1234-abcd-5678',
    username: 'testing',
    passwordHash: '123456-123456-123456',
    status: 'Unlocked'
};
let user3 = {
    id: '20',
    username: 'testing',
    passwordHash: '123456-123456-123456',
    status: 'Deleted',
    email: 'something'
};
let user4 = {
    id: 255,
    username: 'Pesho',
    passwordHash: ['asdf1245', 'qrqweggw', '123-4567', '98765432'],
    status: 'Locked',
    email: 'something'
};
let user5 = {
    id: 'qwwe-azfg-ey38',
    username: 'Someone',
    passwordHash: ['qwezz8jg', 'asdg-444', '12-34-56'],
    status: 'Unlocked'
};
let user6 = {
    id: 1344,
    username: 'wow123',
    passwordHash: '123456-123456-1234567',
    status: 'Locked',
    email: 'something@abv.bg'
};

let user7 = {};

const users = [user1, user2, user3, user4, user5, user6, user7];

for (let user of users) {
    console.log(isUser(user));
}
