import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "John Dow",
        email: "john@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: "jane dow",
        email: "jane@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
];

export default users;