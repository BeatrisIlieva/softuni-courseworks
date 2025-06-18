// type User22 = {
//     id: number | string;
//     username: string;
//     passwordHash: string | string[];
//     status: 'Locked' | 'Unlocked' | 'Deleted';
//     email?: string;
// };

// function isUser2(user: User22) {
//     return (
//         ((typeof user.id === 'number' && user.id > 100) ||
//             (typeof user.id === 'string' && user.id.length === 14)) &&
//         typeof user.username === 'string' &&
//         user.username.length >= 5 &&
//         user.username.length <= 10 &&
//         ((typeof user.passwordHash === 'string' && user.passwordHash.length === 20) ||
//             (Array.isArray(user.passwordHash) &&
//                 user.passwordHash.length === 4 &&
//                 user.passwordHash.every((x) => x.length === 8))) &&
//         ['Locked', 'Unlocked'].includes(user.status)
//     );
// }

// let user111 = {
//     id: 120,
//     username: 'testing',
//     passwordHash: '123456-123456-123456',
//     status: 'Deleted',
//     email: 'something'
// };
// let user222 = {
//     id: '1234-abcd-5678',
//     username: 'testing',
//     passwordHash: '123456-123456-123456',
//     status: 'Unlocked'
// };
// let user333 = {
//     id: '20',
//     username: 'testing',
//     passwordHash: '123456-123456-123456',
//     status: 'Deleted',
//     email: 'something'
// };
// let user444 = {
//     id: 255,
//     username: 'Pesho',
//     passwordHash: ['asdf1245', 'qrqweggw', '123-4567', '98765432'],
//     status: 'Locked',
//     email: 'something'
// };
// let user555 = {
//     id: 'qwwe-azfg-ey38',
//     username: 'Someone',
//     passwordHash: ['qwezz8jg', 'asdg-444', '12-34-56'],
//     status: 'Unlocked'
// };
// let user666 = {
//     id: 1344,
//     username: 'wow123',
//     passwordHash: '123456-123456-1234567',
//     status: 'Locked',
//     email: 'something@abv.bg'
// };

// const users222 = [user111, user222, user333, user444, user555, user666];

// for (let user222222 of users222) {
//     console.log(isUser2(user222222));
// }
